<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            ['name' => 'Rock', 'slug' => 'rock', 'description' => 'Rock music genre'],
            ['name' => 'Pop', 'slug' => 'pop', 'description' => 'Pop music genre'],
            ['name' => 'Jazz', 'slug' => 'jazz', 'description' => 'Jazz music genre'],
            ['name' => 'Hip Hop', 'slug' => 'hip-hop', 'description' => 'Hip Hop music genre'],
            ['name' => 'Electronic', 'slug' => 'electronic', 'description' => 'Electronic music genre'],
            ['name' => 'Classical', 'slug' => 'classical', 'description' => 'Classical music genre'],
            ['name' => 'Country', 'slug' => 'country', 'description' => 'Country music genre'],
            ['name' => 'Reggae', 'slug' => 'reggae', 'description' => 'Reggae music genre'],
            ['name' => 'Blues', 'slug' => 'blues', 'description' => 'Blues music genre'],
            ['name' => 'Metal', 'slug' => 'metal', 'description' => 'Metal music genre'],
        ];

        foreach ($genres as $genre) {
            Genre::create($genre);
        }
    }
}