<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtistSeeder extends Seeder
{
    public function run(): void
    {
        $artists = [
            [
                'name' => 'Taylor Swift',
                'country' => 'USA',
                'formed_year' => '2004',
                'label_id' => 7,
                'bio' => 'Global pop superstar and songwriter.',
                'avatar' => '...',
                'spotify_url' => 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02',
                'apple_music_url' => 'https://music.apple.com/us/artist/taylor-swift/159260351',
                'youtube_url' => 'https://www.youtube.com/@TaylorSwift',
            ],
            [
                'name' => 'The Weeknd',
                'country' => 'Canada',
                'formed_year' => '2009',
                'label_id' => 2,
                'bio' => 'Dark R&B pioneer from Toronto.',
                'avatar' => '...',
                'spotify_url' => 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
                'apple_music_url' => 'https://music.apple.com/us/artist/the-weeknd/479756766',
                'youtube_url' => 'https://www.youtube.com/@TheWeeknd',
            ],
            [
                'name' => 'Dua Lipa',
                'country' => 'UK',
                'formed_year' => '2012',
                'label_id' => 3,
                'bio' => 'British-Albanian pop powerhouse.',
                'avatar' => '...',
                'spotify_url' => 'https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we',
                'apple_music_url' => 'https://music.apple.com/us/artist/dua-lipa/1031397873',
                'youtube_url' => 'https://www.youtube.com/@dualipa',
            ],
        ];

        foreach ($artists as $artist) {
            DB::table('artists')->insert(array_merge($artist, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }
}
