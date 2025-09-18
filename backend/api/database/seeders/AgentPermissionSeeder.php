<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AgentPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $agentId = 1;
        $start = Carbon::now();
        $end = Carbon::now()->addYear();

        // 查出 1–30 楼的所有 unit_id
        $unitIds = DB::table('units')
            ->join('levels', 'units.level_id', '=', 'levels.id')
            ->whereBetween('levels.level_number', [1, 30])
            ->pluck('units.id')
            ->toArray();

        $rows = [];
        foreach ($unitIds as $unitId) {
            $rows[] = [
                'agent_id' => $agentId,
                'unit_id' => $unitId,
                'access' => 'book',
                'is_allowed' => 1,
                'start_at' => $start,
                'end_at' => $end,
                'notes' => 'Seeder: Agent#1 30层楼权限',
                'created_at' => now()->subDay(),
                'updated_at' => now(),
            ];
        }

        // upsert 防止重复插入（利用唯一键 agent_id+unit_id+access）
        DB::table('agent_unit_permissions')->upsert(
            $rows,
            ['agent_id', 'unit_id', 'access'],
            ['is_allowed', 'start_at', 'end_at', 'notes', 'updated_at']
        );
    }
}
