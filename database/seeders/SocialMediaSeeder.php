<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialMediaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // Taylor Swift
            ['artist_name' => 'Taylor Swift', 'platform' => 'Instagram', 'url' => 'https://instagram.com/taylorswift', 'followers' => '272M'],
            ['artist_name' => 'Taylor Swift', 'platform' => 'TikTok', 'url' => 'https://tiktok.com/@taylorswift', 'followers' => '23M'],
            // The Weeknd
            ['artist_name' => 'The Weeknd', 'platform' => 'Instagram', 'url' => 'https://instagram.com/theweeknd', 'followers' => '35M'],
            ['artist_name' => 'The Weeknd', 'platform' => 'Twitter', 'url' => 'https://twitter.com/theweeknd', 'followers' => '12M'],
            // Dua Lipa
            ['artist_name' => 'Dua Lipa', 'platform' => 'Instagram', 'url' => 'https://instagram.com/dualipa', 'followers' => '88M'],
            ['artist_name' => 'Dua Lipa', 'platform' => 'TikTok', 'url' => 'https://tiktok.com/@dualipa', 'followers' => '15M'],
            // Bad Bunny
            ['artist_name' => 'Bad Bunny', 'platform' => 'Instagram', 'url' => 'https://instagram.com/badbunnypr', 'followers' => '45M'],
            ['artist_name' => 'Bad Bunny', 'platform' => 'Twitter', 'url' => 'https://twitter.com/sanbenito', 'followers' => '10M'],
            // Rosalía
            ['artist_name' => 'Rosalía', 'platform' => 'Instagram', 'url' => 'https://instagram.com/rosalia.vt', 'followers' => '24M'],
            ['artist_name' => 'Rosalía', 'platform' => 'TikTok', 'url' => 'https://tiktok.com/@rosalia', 'followers' => '8M'],
            // Harry Styles
            ['artist_name' => 'Harry Styles', 'platform' => 'Instagram', 'url' => 'https://instagram.com/harrystyles', 'followers' => '47M'],
            ['artist_name' => 'Harry Styles', 'platform' => 'Twitter', 'url' => 'https://twitter.com/Harry_Styles', 'followers' => '35M'],
            // Billie Eilish
            ['artist_name' => 'Billie Eilish', 'platform' => 'Instagram', 'url' => 'https://instagram.com/billieeilish', 'followers' => '110M'],
            ['artist_name' => 'Billie Eilish', 'platform' => 'TikTok', 'url' => 'https://tiktok.com/@billieeilish', 'followers' => '9M'],
            // Kendrick Lamar
            ['artist_name' => 'Kendrick Lamar', 'platform' => 'Instagram', 'url' => 'https://instagram.com/kendricklamar', 'followers' => '13M'],
            ['artist_name' => 'Kendrick Lamar', 'platform' => 'Twitter', 'url' => 'https://twitter.com/kendricklamar', 'followers' => '11M'],
        ];

        foreach ($data as $social) {
            $artistId = DB::table('artists')->where('name', $social['artist_name'])->value('id');
            if (!$artistId) continue;

            DB::table('social_media')->insert([
                'artist_id' => $artistId,
                'platform' => $social['platform'],
                'url' => $social['url'],
                'followers' => $social['followers'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}