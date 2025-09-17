<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    // 获取指定项目名的所有 Unit
    public function level()
    {
        return $this->belongsTo(Level::class);
    }
}

