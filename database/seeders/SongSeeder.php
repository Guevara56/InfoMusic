<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        // IDs de géneros: Pop=1, Rock=2, Hip-Hop=3, R&B=4, Electronic=5,
        // Jazz=6, Classical=7, Metal=8, Indie=9, Country=10,
        // Reggae=11, Soul=12, Folk=13, Punk=14, Latin=15

        // IDs de artistas tras el seeder:
        // Taylor Swift=1, The Weeknd=2, Dua Lipa=3, Bad Bunny=4
        // Rosalía=5, Harry Styles=6, Billie Eilish=7, Kendrick Lamar=8

        $songs = [
            // Taylor Swift
            [
                'title' => 'Anti-Hero',
                'duration' => '3:20',
                'release_year' => '2022',
                'artist_id' => 1,
                'image' => null,
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
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/5xTtaWoae3wi06K5WfVUUH',
                'apple_music_url' => 'https://music.apple.com/us/song/shake-it-off/907242701',
                'youtube_url' => 'https://www.youtube.com/watch?v=nfWlot6h_JM',
                'genres' => [1],
            ],
            // The Weeknd
            [
                'title' => 'Blinding Lights',
                'duration' => '3:20',
                'release_year' => '2019',
                'artist_id' => 2,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b',
                'apple_music_url' => 'https://music.apple.com/us/song/blinding-lights/1488408568',
                'youtube_url' => 'https://www.youtube.com/watch?v=4NRXx6U8ABQ',
                'genres' => [4, 1],
            ],
            [
                'title' => 'Starboy',
                'duration' => '3:50',
                'release_year' => '2016',
                'artist_id' => 2,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/5aAx2yezTd8zXrkmtKl66Z',
                'apple_music_url' => 'https://music.apple.com/us/song/starboy/1156794715',
                'youtube_url' => 'https://www.youtube.com/watch?v=34Na4j8AVgA',
                'genres' => [4, 1],
            ],
            // Dua Lipa
            [
                'title' => 'Houdini',
                'duration' => '3:05',
                'release_year' => '2023',
                'artist_id' => 3,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/1IHWl5LamUGEuP4ozKQSXZ',
                'apple_music_url' => 'https://music.apple.com/us/song/houdini/1713845958',
                'youtube_url' => 'https://www.youtube.com/watch?v=H-0oFSBhbB0',
                'genres' => [1, 5],
            ],
            [
                'title' => 'Levitating',
                'duration' => '3:23',
                'release_year' => '2020',
                'artist_id' => 3,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/463CkQjx2Zk1yXoBuierM9',
                'apple_music_url' => 'https://music.apple.com/us/song/levitating/1521889004',
                'youtube_url' => 'https://www.youtube.com/watch?v=TUVcZfQe-Kw',
                'genres' => [1, 5],
            ],
            // Bad Bunny
            [
                'title' => 'Tití Me Preguntó',
                'duration' => '4:08',
                'release_year' => '2022',
                'artist_id' => 4,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/1IHWl5LamUGEuP4ozKQSXZ',
                'apple_music_url' => 'https://music.apple.com/us/song/tití-me-preguntó/1632847780',
                'youtube_url' => 'https://www.youtube.com/watch?v=efG-ZNjSdds',
                'genres' => [15, 1],
            ],
            [
                'title' => 'Me Porto Bonito',
                'duration' => '2:59',
                'release_year' => '2022',
                'artist_id' => 4,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/6AQbmUe0Qwf5PZnt4HmTXv',
                'apple_music_url' => 'https://music.apple.com/us/song/me-porto-bonito/1632847782',
                'youtube_url' => 'https://www.youtube.com/watch?v=OdHKBWBkHgk',
                'genres' => [15],
            ],
            // Rosalía
            [
                'title' => 'BIZCOCHITO',
                'duration' => '2:21',
                'release_year' => '2021',
                'artist_id' => 5,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/1R0a2iXumgCiFb7HEZ9bNH',
                'apple_music_url' => 'https://music.apple.com/us/song/bizcochito/1598809188',
                'youtube_url' => 'https://www.youtube.com/watch?v=KqsQfvFqZWU',
                'genres' => [15, 1],
            ],
            // Harry Styles
            [
                'title' => 'As It Was',
                'duration' => '2:37',
                'release_year' => '2022',
                'artist_id' => 6,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/4Dvkj6JhhA12EX05fT7y2e',
                'apple_music_url' => 'https://music.apple.com/us/song/as-it-was/1615585008',
                'youtube_url' => 'https://www.youtube.com/watch?v=H5v3kku4y6Q',
                'genres' => [1, 9],
            ],
            // Billie Eilish
            [
                'title' => 'Bad Guy',
                'duration' => '3:14',
                'release_year' => '2019',
                'artist_id' => 7,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m',
                'apple_music_url' => 'https://music.apple.com/us/song/bad-guy/1450695739',
                'youtube_url' => 'https://www.youtube.com/watch?v=DyDfgMOUjCI',
                'genres' => [1, 5],
            ],
            // Kendrick Lamar
            [
                'title' => 'HUMBLE.',
                'duration' => '2:57',
                'release_year' => '2017',
                'artist_id' => 8,
                'image' => null,
                'spotify_url' => 'https://open.spotify.com/track/7KXjTSCq5nL1LoYtL7XAwS',
                'apple_music_url' => 'https://music.apple.com/us/song/humble/1223592280',
                'youtube_url' => 'https://www.youtube.com/watch?v=tvTRZJ-4EyI',
                'genres' => [3],
            ],
        ];

        foreach ($songs as $songData) {
            $genreIds = $songData['genres'];
            unset($songData['genres']);

            $songId = DB::table('songs')->insertGetId(array_merge($songData, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));

            foreach ($genreIds as $genreId) {
                DB::table('genre_song')->insert([
                    'genre_id' => $genreId,
                    'song_id' => $songId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}