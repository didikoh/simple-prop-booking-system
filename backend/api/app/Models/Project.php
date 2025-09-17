<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // 让 {project} 路由参数按 name 绑定（而不是 id）
    public function getRouteKeyName()
    {
        return 'name';
    }

    public function developer()
    {
        return $this->belongsTo(Developer::class);
    }

    public function levels()
    {
        return $this->hasMany(Level::class);
    }

    // 可选：直接跨层拿 units
    public function units()
    {
        return $this->hasManyThrough(Unit::class, Level::class, 'project_id', 'level_id');
    }
}
