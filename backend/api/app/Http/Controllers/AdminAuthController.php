<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(Request $req)
    {
        $data = $req->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $admin = Admin::where('email', $data['email'])
            ->where('status', 'active')
            ->first();

        if (!$admin || !Hash::check($data['password'], $admin->password)) {
            return response()->json(['ok' => false, 'error' => 'Invalid credentials'], 401);
        }

        // 可选：限制能力（abilities）
        $token = $admin->createToken('admin-api', ['admin'])->plainTextToken;

        return response()->json([
            'ok' => true,
            'token' => $token,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'status' => $admin->status,
            ],
        ]);
    }

    public function logout(Request $req)
    {
        // 只注销当前 token
        $req->user()->currentAccessToken()->delete();
        return response()->json(['ok' => true]);
    }
}
