<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artist;
use App\Models\Song;
use App\Models\Product;
use App\Models\SocialMedia;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $artist = Artist::create([
            'name'         => 'Bad Bunny',
            'bio'          => 'Cantante y rapero puertorriqueño, uno de los artistas latinos más influyentes del mundo.',
            'country'      => 'Puerto Rico',
            'formed_year'  => '2013',
            'label_id'     => 2, // Sony Music, comprueba que existe en tu BD
            'avatar'       => 'artists/badbunny.jpg', // pon la imagen aquí
            'spotify_url'  => 'https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X',
            'apple_music_url' => 'https://music.apple.com/us/artist/bad-bunny/1126808565',
            'youtube_url'  => 'https://www.youtube.com/@badbunnypr',
        ]);

        Song::create([
            'title'        => 'Tití Me Preguntó',
            'artist_id'    => $artist->id,
            'duration'     => '4:08',
            'release_year' => '2022',
            'image'        => 'songs/titi.jpg', // pon la imagen aquí
            'spotify_url'  => 'https://open.spotify.com/track/1IHWl5LamUGEuP4ozKQSXZ',
            'apple_music_url' => 'https://music.apple.com/us/album/tití-me-preguntó/1632847780',
            'youtube_url'  => 'https://www.youtube.com/watch?v=efG-ZNjSdds',
        ]);

        Product::create([
            'name'        => 'Camiseta World\'s Hottest Tour',
            'artist_id'   => $artist->id,
            'price'       => 39.99,
            'stock'       => 500,
            'description' => 'Camiseta oficial de la gira World\'s Hottest Tour de Bad Bunny.',
            'image'       => 'products/badbunny_camiseta.jpg', // pon la imagen aquí
            'product_category_id' => 1, // comprueba que existe T-Shirt en tu BD
        ]);

        SocialMedia::create([
            'artist_id' => $artist->id,
            'platform'  => 'Instagram',
            'url'       => 'https://www.instagram.com/badbunnypr',
            'followers' => '45000000',
        ]);

        SocialMedia::create([
            'artist_id' => $artist->id,
            'platform'  => 'Twitter',
            'url'       => 'https://www.twitter.com/sanbenito',
            'followers' => '10000000',
        ]);
    }
}