<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        // genre IDs: Pop=1, Rock=2, Hip-Hop=3, R&B=4, Electronic=5,
        //            Jazz=6, Classical=7, Metal=8, Indie=9, Country=10,
        //            Reggae=11, Soul=12, Folk=13, Punk=14, Latin=15
        $songs = [
            [
                'title' => 'Anti-Hero',
                'duration' => '3:20',
                'release_year' => '2022',
                'artist_id' => 1,
                'spotify_url' => 'https://open.spotify.com/track/0V3wPSX9ygBnCm8psDIegu',
                'apple_music_url' => 'https://music.apple.com/us/song/anti-hero/1649434004',
                'youtube_url' => 'https://www.youtube.com/watch?v=b1kbLwvqugk',
                'genres' => [1, 10],
            ],
            [
                'title' => 'Shake It Off',
                'duration' => '3:39',
                'release_year' => '2014',
                'artist_id' => 1,
                'spotify_url' => 'https://open.spotify.com/track/5xTtaWoae3wi06K5WfVUUH',
                'apple_music_url' => 'https://music.apple.com/us/song/shake-it-off/907242701',
                'youtube_url' => 'https://www.youtube.com/watch?v=nfWlot6h_JM',
                'genres' => [1],
            ],
        ];


        foreach ($songs as $songData) {
            $genreIds = $songData['genres'];
            unset($songData['genres']);

            $songId = DB::table('songs')->insertGetId(array_merge($songData, ['created_at' => now(), 'updated_at' => now()]));

            foreach ($genreIds as $genreId) {
                DB::table('genre_song')->insert([
                    'genre_id'   => $genreId,
                    'song_id'    => $songId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
