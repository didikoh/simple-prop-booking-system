<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // 继承它，而不是普通 Model
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Agent extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['name', 'email', 'phone', 'password', 'status'];
    protected $hidden = ['password']; // 避免返回给前端
}
