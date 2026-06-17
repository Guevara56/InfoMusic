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
                'country' => 'Estados Unidos',
                'formed_year' => '2004',
                'label_id' => 7,
                'bio' => 'Superestrella del pop mundial y compositora.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02',
                'apple_music_url' => 'https://music.apple.com/us/artist/taylor-swift/159260351',
                'youtube_url' => 'https://www.youtube.com/@TaylorSwift',
            ],
            [
                'name' => 'The Weeknd',
                'country' => 'Canadá',
                'formed_year' => '2009',
                'label_id' => 2,
                'bio' => 'Pionero del R&B oscuro procedente de Toronto.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
                'apple_music_url' => 'https://music.apple.com/us/artist/the-weeknd/479756766',
                'youtube_url' => 'https://www.youtube.com/@TheWeeknd',
            ],
            [
                'name' => 'Dua Lipa',
                'country' => 'Reino Unido',
                'formed_year' => '2012',
                'label_id' => 3,
                'bio' => 'Potencia del pop británico-albanés.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we',
                'apple_music_url' => 'https://music.apple.com/us/artist/dua-lipa/1031397873',
                'youtube_url' => 'https://www.youtube.com/@dualipa',
            ],
            [
                'name' => 'Bad Bunny',
                'country' => 'Puerto Rico',
                'formed_year' => '2013',
                'label_id' => 2,
                'bio' => 'Rey del trap latino y el reggaeton moderno.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X',
                'apple_music_url' => 'https://music.apple.com/us/artist/bad-bunny/1126808565',
                'youtube_url' => 'https://www.youtube.com/@badbunnypr',
            ],
            [
                'name' => 'Rosalía',
                'country' => 'España',
                'formed_year' => '2017',
                'label_id' => 2,
                'bio' => 'Artista española que fusiona el flamenco con el pop y el urbano.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/7jVv8c5Fj3E9VhNjxT4snq',
                'apple_music_url' => 'https://music.apple.com/us/artist/rosal%C3%ADa/1090893801',
                'youtube_url' => 'https://www.youtube.com/@rosalia',
            ],
            [
                'name' => 'Harry Styles',
                'country' => 'Reino Unido',
                'formed_year' => '2017',
                'label_id' => 3,
                'bio' => 'Exintegrante de One Direction convertido en icono del pop indie.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/6KImCVD70vtIoJWnq6nGn3',
                'apple_music_url' => 'https://music.apple.com/us/artist/harry-styles/471260289',
                'youtube_url' => 'https://www.youtube.com/@HarryStyles',
            ],
            [
                'name' => 'Billie Eilish',
                'country' => 'Estados Unidos',
                'formed_year' => '2015',
                'label_id' => 1,
                'bio' => 'Prodigio del pop alternativo conocida por su estética oscura y letras íntimas.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH',
                'apple_music_url' => 'https://music.apple.com/us/artist/billie-eilish/1065981054',
                'youtube_url' => 'https://www.youtube.com/@BillieEilish',
            ],
            [
                'name' => 'Kendrick Lamar',
                'country' => 'Estados Unidos',
                'formed_year' => '2003',
                'label_id' => 5,
                'bio' => 'Uno de los raperos más influyentes de su generación, ganador del Premio Pulitzer.',
                'avatar' => null,
                'spotify_url' => 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg',
                'apple_music_url' => 'https://music.apple.com/us/artist/kendrick-lamar/368183298',
                'youtube_url' => 'https://www.youtube.com/@kendricklamar',
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