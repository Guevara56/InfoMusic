<?php

namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* // Create an admin user
        $admin = User::create([
            'name' => 'Moi Corbacho',
            'email' => 'Moi@test.com',
            'password' => bcrypt('12345678')
        ]); */
        
         User::create([
            'name'              => 'Admin',
            'email'             => 'admin@infomusic.com',
            'password'          => Hash::make('password'),
            'role'              => 'admin',
            'email_verified_at' => now(),
        ]);
 
        // Usuario normal (no puede acceder al dashboard)
        User::create([
            'name'              => 'Usuario Demo',
            'email'             => 'user@infomusic.com',
            'password'          => Hash::make('password'),
            'role'              => 'user',
            'email_verified_at' => now(),
        ]);

        
    }
}