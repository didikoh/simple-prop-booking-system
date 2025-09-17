<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class BookingController extends Controller
{
    /**
     * 创建预订（买家提交表单）
     * POST /api/bookings
     *
     * 请求体（JSON）示例：
     * {
     *   "unit_id": 123,
     *   "agent_id": 45,
     *   "amount": 1000.00,              // 可选
     *   "notes": "remark",               // 可选
     *   "buyer": {                       // 二选一：传 buyer_id 或 buyer 对象
     *     "name": "Alice",
     *     "email": "alice@example.com",  // buyers.email 唯一，可用来幂等创建
     *     "phone": "0123456789"
     *   }
     *   // 或者直接 "buyer_id": 9
     * }
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'unit_id' => 'required|integer|exists:units,id',
            'agent_id' => 'required|integer|exists:agents,id',
            'amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:5000',
            // 二选一校验：buyer 或 buyer_id
            'buyer_id' => 'nullable|integer|exists:buyers,id',
            'buyer.name' => 'required_without:buyer_id|string|max:255',
            'buyer.email' => 'nullable|email|max:255',
            'buyer.phone' => 'nullable|string|max:50',
        ]);

        // 预订保留时长（分钟），缺省 30
        $holdMinutes = (int) env('BOOKING_HOLD_MINUTES', 30);

        try {
            $result = DB::transaction(function () use ($data, $holdMinutes) {

                // -----------------------------
                // 1) 权限校验：agent 是否可订该 unit
                // -----------------------------
                $now = now();
                $hasPermission = DB::table('agent_unit_permissions')
                    ->where('agent_id', $data['agent_id'])
                    ->where('unit_id', $data['unit_id'])
                    ->where('access', 'book')
                    ->where('is_allowed', 1)
                    ->where(function ($q) use ($now) {
                        // start_at / end_at 任一为空视为不限制
                        $q->whereNull('start_at')->orWhere('start_at', '<=', $now);
                    })
                    ->where(function ($q) use ($now) {
                        $q->whereNull('end_at')->orWhere('end_at', '>=', $now);
                    })
                    ->exists();

                if (!$hasPermission) {
                    throw ValidationException::withMessages(['agent_id' => 'Agent 无该单位的预订权限']);
                }

                // -----------------------------
                // 2) 锁定 unit 行，检查状态
                // -----------------------------
                $unit = DB::table('units')
                    ->where('id', $data['unit_id'])
                    ->lockForUpdate()
                    ->first();

                if (!$unit) {
                    throw ValidationException::withMessages(['unit_id' => '单位不存在']);
                }
                if ($unit->status !== 'available') {
                    throw ValidationException::withMessages(['unit_id' => '该单位不可预订（非 available）']);
                }

                // -----------------------------
                // 3) 创建/获取 buyer
                // -----------------------------
                $buyerId = $data['buyer_id'] ?? null;
                if (!$buyerId) {
                    // 用 email 幂等创建（buyers.email 唯一）
                    if (!empty($data['buyer']['email'])) {
                        $existing = DB::table('buyers')->where('email', $data['buyer']['email'])->first();
                        if ($existing) {
                            $buyerId = $existing->id;
                            // 可选：更新姓名/电话
                            DB::table('buyers')->where('id', $buyerId)->update([
                                'name' => $data['buyer']['name'] ?? $existing->name,
                                'phone' => $data['buyer']['phone'] ?? $existing->phone,
                                'updated_at' => now(),
                            ]);
                        }
                    }
                    if (!$buyerId) {
                        $buyerId = DB::table('buyers')->insertGetId([
                            'name' => $data['buyer']['name'],
                            'email' => $data['buyer']['email'] ?? null,
                            'phone' => $data['buyer']['phone'] ?? null,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                }

                // -----------------------------
                // 4) 将 unit 标记为 locked（占位）
                // -----------------------------
                DB::table('units')->where('id', $unit->id)->update([
                    'status' => 'locked',
                    // 是否在 units 表写 buyer_id 取决于你的业务，这里不强制：
                    // 'buyer_id' => $buyerId,
                    'updated_at' => now(),
                ]);

                // -----------------------------
                // 5) 写 bookings（唯一约束：unit_id + is_active）
                // -----------------------------
                $bookingId = DB::table('bookings')->insertGetId([
                    'unit_id' => $unit->id,
                    'buyer_id' => $buyerId,
                    'agent_id' => $data['agent_id'],
                    'status' => 'reserved',        // 初始：reserved
                    'amount' => $data['amount'] ?? null,
                    'reserved_at' => now(),
                    'paid_at' => null,
                    'cancelled_at' => null,
                    'expires_at' => $holdMinutes > 0 ? now()->addMinutes($holdMinutes) : null,
                    'is_active' => 1,
                    'notes' => $data['notes'] ?? null,
                ]);

                return [
                    'booking_id' => $bookingId,
                    'unit_id' => $unit->id,
                    'buyer_id' => $buyerId,
                    'agent_id' => $data['agent_id'],
                    'status' => 'reserved',
                    'expires_at' => $holdMinutes > 0 ? now()->addMinutes($holdMinutes)->toISOString() : null,
                ];
            });

            return response()->json(['ok' => true, 'data' => $result], 201);

        } catch (QueryException $e) {
            // 处理唯一约束冲突（同一个 unit 已有 active 预订）
            // SQLSTATE 23000 = integrity constraint violation
            if ((string) $e->getCode() === '23000') {
                return response()->json([
                    'ok' => false,
                    'error' => '该单位已存在有效预订',
                    'code' => 'UNIT_ALREADY_BOOKED'
                ], 409);
            }
            throw $e;
        }
    }
}