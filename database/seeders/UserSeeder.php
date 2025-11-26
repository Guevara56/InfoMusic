<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Moi Corbacho',
            'email' => 'Moi@test.com',
            'password' => bcrypt('12345678')
        ]);

            User::factory(1)->create();
    }
}