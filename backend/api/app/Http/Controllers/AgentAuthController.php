<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AgentAuthController extends Controller
{
    // 支持 email 或 phone 登录，传一个即可
    public function login(Request $req)
    {
        $data = $req->validate([
            'email'    => 'nullable|email',
            'phone'    => 'nullable|string',
            'password' => 'required|string|min:6',
        ]);

        if (empty($data['email']) && empty($data['phone'])) {
            return response()->json(['ok'=>false,'error'=>'Provide email or phone'], 422);
        }

        $agent = Agent::when($data['email'] ?? null, fn($q,$email)=>$q->where('email',$email))
                      ->when($data['phone'] ?? null, fn($q,$phone)=>$q->where('phone',$phone))
                      ->where('status','active')
                      ->first();

        if (!$agent || !Hash::check($data['password'], $agent->password)) {
            return response()->json(['ok'=>false,'error'=>'Invalid credentials'], 401);
        }

        // 签发 API Token（前端保存到 Authorization: Bearer <token>）
        $token = $agent->createToken('agent-api')->plainTextToken;

        return response()->json([
            'ok'    => true,
            'token' => $token,
            'agent' => ['id'=>$agent->id, 'name'=>$agent->name, 'email'=>$agent->email, 'phone'=>$agent->phone],
        ]);
    }

    public function logout(Request $req)
    {
        // 只注销当前 token
        $req->user()->currentAccessToken()->delete();
        return response()->json(['ok'=>true]);
    }
}
