<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialMediaSeeder extends Seeder
{
    public function run(): void
    {
        // artist_id => [ [platform, url, followers], ... ]
        $data = [
            1  => [['Instagram', 'https://instagram.com/taylorswift',    '280M'], ['Twitter', 'https://twitter.com/taylorswift13',   '95M']],
            2  => [['Instagram', 'https://instagram.com/theweeknd',      '35M'],  ['Spotify', 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ', '110M']],
            3  => [['Instagram', 'https://instagram.com/billieeilish',   '105M'], ['YouTube', 'https://youtube.com/billieeilish',    '51M']],
            4  => [['Instagram', 'https://instagram.com/dualipa',        '88M'],  ['Twitter', 'https://twitter.com/dualipa',         '22M']],
            5  => [['Instagram', 'https://instagram.com/badbunnypr',     '45M'],  ['YouTube', 'https://youtube.com/badbunny',        '38M']],
            6  => [['Instagram', 'https://instagram.com/kendricklamar',  '12M'],  ['Twitter', 'https://twitter.com/kendricklamar',   '14M']],
            7  => [['Instagram', 'https://instagram.com/adele',          '52M'],  ['Facebook','https://facebook.com/adele',          '70M']],
            8  => [['Instagram', 'https://instagram.com/champagnepapi',  '145M'], ['Twitter', 'https://twitter.com/drake',           '54M']],
            9  => [['Instagram', 'https://instagram.com/beyonce',        '305M'], ['Facebook','https://facebook.com/beyonce',        '65M']],
            10 => [['Instagram', 'https://instagram.com/arcticmonkeys',  '4M'],   ['Twitter', 'https://twitter.com/arcticmonkeys',   '2M']],
            11 => [['Instagram', 'https://instagram.com/rosalia.vt',     '15M'],  ['YouTube', 'https://youtube.com/rosalia',         '9M']],
            12 => [['Instagram', 'https://instagram.com/harrystyles',    '45M'],  ['Twitter', 'https://twitter.com/harrystyles',     '38M']],
            13 => [['Instagram', 'https://instagram.com/oliviarodrigo',  '33M'],  ['TikTok',  'https://tiktok.com/@oliviarodrigo',   '14M']],
            14 => [['Instagram', 'https://instagram.com/postmalone',     '24M'],  ['Twitter', 'https://twitter.com/postmalone',      '12M']],
            15 => [['Instagram', 'https://instagram.com/dojacat',        '25M'],  ['TikTok',  'https://tiktok.com/@dojacat',         '23M']],
            16 => [['Instagram', 'https://instagram.com/teddysphotos',   '38M'],  ['Twitter', 'https://twitter.com/edsheeran',       '29M']],
            17 => [['Instagram', 'https://instagram.com/sza',            '11M'],  ['Twitter', 'https://twitter.com/sza',             '8M']],
            18 => [['Instagram', 'https://instagram.com/coldplay',       '12M'],  ['YouTube', 'https://youtube.com/coldplay',        '27M']],
            19 => [['Instagram', 'https://instagram.com/arianagrande',   '380M'], ['Twitter', 'https://twitter.com/arianagrande',    '80M']],
            20 => [['Instagram', 'https://instagram.com/karolg',         '60M'],  ['TikTok',  'https://tiktok.com/@karolg',          '25M']],
        ];

        foreach ($data as $artistId => $platforms) {
            foreach ($platforms as [$platform, $url, $followers]) {
                $smId = DB::table('social_media')->insertGetId([
                    'platform'   => $platform,
                    'url'        => $url,
                    'followers'  => $followers,
                    'artist_id'  => $artistId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                DB::table('artist_social_media')->insert([
                    'artist_id'       => $artistId,
                    'social_media_id' => $smId,
                    'created_at'      => now(),
                    'updated_at'      => now(),
                ]);
            }
        }
    }
}