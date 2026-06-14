<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialMediaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'artist_name' => 'Dua Lipa',
                'platform' => 'Instagram',
                'url' => 'https://instagram.com/dualipa',
                'followers' => '88M',
            ],
            [
                'artist_name' => 'Dua Lipa',
                'platform' => 'TikTok',
                'url' => 'https://tiktok.com/@dualipa',
                'followers' => '15M',
            ],
        ];

        foreach ($data as $social) {

            $artistId = DB::table('artists')
                ->where('name', $social['artist_name'])
                ->value('id');

            if (!$artistId) {
                continue;
            }

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