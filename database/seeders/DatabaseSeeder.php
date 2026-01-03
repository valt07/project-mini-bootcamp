<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::create([
            'nama' => 'Admin User',
            'email' => 'admin@example.com',
            'kata_sandi' => Hash::make('password'),
            'peran' => 'admin',
        ]);

        // Editor
        User::create([
            'nama' => 'Editor User',
            'email' => 'editor@example.com',
            'kata_sandi' => Hash::make('password'),
            'peran' => 'editor',
        ]);

        // Author
        User::create([
            'nama' => 'Author User',
            'email' => 'author@example.com',
            'kata_sandi' => Hash::make('password'),
            'peran' => 'author',
        ]);
    }
}
