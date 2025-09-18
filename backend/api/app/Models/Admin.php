<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Admin extends Model
{
    use HasApiTokens, Notifiable;

    protected $fillable = ['name', 'email', 'password', 'status'];
    protected $hidden = ['password'];
    protected $casts = ['email_verified_at' => 'datetime'];
}
