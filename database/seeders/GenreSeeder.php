<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            ['name' => 'Pop', 'slug' => 'pop', 'description' => 'Pop music genre'],
            ['name' => 'Rock', 'slug' => 'rock', 'description' => 'Rock music genre'],
            ['name' => 'Hip-Hop', 'slug' => 'hip-hop', 'description' => 'Hip Hop music genre'],
            ['name' => 'R&B', 'slug' => 'rnb', 'description' => 'R&B music genre'],
            ['name' => 'Electronic', 'slug' => 'electronic', 'description' => 'Electronic music genre'],
            ['name' => 'Jazz', 'slug' => 'jazz', 'description' => 'Jazz music genre'],
            ['name' => 'Classical', 'slug' => 'classical', 'description' => 'Classical music genre'],
            ['name' => 'Metal', 'slug' => 'metal', 'description' => 'Metal music genre'],
            ['name' => 'Indie', 'slug' => 'indie', 'description' => 'Indie music genre'],
            ['name' => 'Country', 'slug' => 'country', 'description' => 'Country music genre'],
            ['name' => 'Reggae', 'slug' => 'reggae', 'description' => 'Reggae music genre'],
            ['name' => 'Soul', 'slug' => 'soul', 'description' => 'Soul music genre'],
            ['name' => 'Folk', 'slug' => 'folk', 'description' => 'Folk music genre'],
            ['name' => 'Punk', 'slug' => 'punk', 'description' => 'Punk music genre'],
            ['name' => 'Latin', 'slug' => 'latin', 'description' => 'Latin music genre'],
        ];

        foreach ($genres as $genre) {
            Genre::create($genre);
        }
    }
}