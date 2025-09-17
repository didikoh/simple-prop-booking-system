<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AgentAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/projects/{project}', [ProjectController::class, 'showByName']);
Route::post('/bookings', [BookingController::class, 'store']);

Route::post('/agent/login',  [AgentAuthController::class, 'login']);
Route::post('/agent/logout', [AgentAuthController::class, 'logout'])->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->get('/me', function (\Illuminate\Http\Request $r) {
    return $r->user(); // 当前登录的 Agent
});