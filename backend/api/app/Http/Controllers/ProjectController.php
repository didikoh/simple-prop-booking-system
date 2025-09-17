<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * GET /api/projects/{project}?unit_status=available
     *
     * 路由模型绑定会把 {project} 解析为 Project 模型（按 name）
     */
    public function showByName(Project $project, Request $request)
    {
        // 可选的 units 状态过滤（available / locked / blocked / sold）
        $status = $request->query('unit_status');

        // 预加载 developer、levels、以及 levels 下的 units（带可选过滤）
        $project->load([
            'developer',
            'levels.units' => function ($q) use ($status) {
                if ($status) {
                    $q->where('status', $status);
                }
                // 也可以加排序，比如 $q->orderBy('unit_number');
            }
        ]);

        // 统计整体数量 & 可售数量（不受列表筛选影响）
        $project->loadCount([
            'units',
            'units as units_available' => fn($q) => $q->where('status', 'available'),
        ]);

        $unitsTotal = $project->units_count;
        $unitsAvailable = $project->units_available;

        // 自定义一个干净的 JSON 结构返回
        $payload = [
            'id' => $project->id,
            'name' => $project->name,
            'completion_year' => $project->estimate_complete_year,
            'address' => $project->address,
            'units_total' => $unitsTotal,      // 例如 500
            'units_available' => $unitsAvailable,  // 例如 420
            'developer' => $project->developer ? [
                'id' => $project->developer->id,
                'name' => $project->developer->name,
                'email' => $project->developer->email,
                'phone' => $project->developer->phone,
                'website' => $project->developer->website,
            ] : null,
            'levels' => $project->levels->map(function ($level) {
                return [
                    'id' => $level->id,
                    'level_number' => $level->level_number,
                    'units' => $level->units->map(function ($unit) {
                        return [
                            'id' => $unit->id,
                            'unit_number' => $unit->unit_number,
                            'size_sqft' => $unit->size_sqft,
                            'price' => $unit->price,
                            'status' => $unit->status, // available/locked/blocked/sold
                            'buyer_id' => $unit->buyer_id,
                        ];
                    })->values(),
                ];
            })->values(),
        ];

        return response()->json($payload);
    }
}
