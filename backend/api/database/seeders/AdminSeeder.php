<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->updateOrInsert(
            ['email' => 'admin@goprop.ai'],
            [
                'name'       => 'Super Admin',
                'password'   => Hash::make('gpadmin@2727'),
                'status'     => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
