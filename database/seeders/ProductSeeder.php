<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Artist;
use App\Models\ProductCategory;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Midnights Vinyl', 'price' => 29.99, 'description' => 'Limited edition vinyl.', 'artist' => 'Taylor Swift', 'category' => 'vinyl'],
            ['name' => 'Eras Tour T-Shirt', 'price' => 35.00, 'description' => 'Official Eras Tour tee.', 'artist' => 'Taylor Swift', 'category' => 't-shirt'],

            ['name' => 'The Highlights CD', 'price' => 12.99, 'description' => 'Greatest hits compilation.', 'artist' => 'The Weeknd', 'category' => 'cd'],
            ['name' => 'Starboy Hoodie', 'price' => 59.99, 'description' => 'Starboy era merch.', 'artist' => 'The Weeknd', 'category' => 'hoodie'],

            ['name' => 'Happier Than Ever Vinyl', 'price' => 27.99, 'description' => 'Blue vinyl edition.', 'artist' => 'Billie Eilish', 'category' => 'vinyl'],
            ['name' => 'Billie Eilish Poster', 'price' => 14.99, 'description' => 'Happier Than Ever artwork.', 'artist' => 'Billie Eilish', 'category' => 'poster'],

            ['name' => 'Future Nostalgia Vinyl', 'price' => 24.99, 'description' => 'Disco-era vinyl.', 'artist' => 'Dua Lipa', 'category' => 'vinyl'],
            ['name' => 'Dua Lipa Cap', 'price' => 22.00, 'description' => 'Official DL cap.', 'artist' => 'Dua Lipa', 'category' => 'cap'],

            ['name' => 'Un Verano Sin Ti Vinyl', 'price' => 31.99, 'description' => 'Summer vibes vinyl.', 'artist' => 'Bad Bunny', 'category' => 'vinyl'],
            ['name' => 'Bad Bunny T-Shirt', 'price' => 30.00, 'description' => 'El Conejo Malo tee.', 'artist' => 'Bad Bunny', 'category' => 't-shirt'],

            ['name' => 'DAMN. Vinyl', 'price' => 28.99, 'description' => 'Pulitzer-winning album.', 'artist' => 'Kendrick Lamar', 'category' => 'vinyl'],

            ['name' => '30 CD', 'price' => 11.99, 'description' => 'Adele\'s comeback album.', 'artist' => 'Adele', 'category' => 'cd'],
            ['name' => 'Adele Poster', 'price' => 15.99, 'description' => 'Iconic portrait poster.', 'artist' => 'Adele', 'category' => 'poster'],

            ['name' => 'Certified Lover Boy Cassette', 'price' => 9.99, 'description' => 'Retro CLB tape.', 'artist' => 'Drake', 'category' => 'cassette'],

            ['name' => 'Renaissance Vinyl', 'price' => 33.99, 'description' => 'Dance music evolution.', 'artist' => 'Beyoncé', 'category' => 'vinyl'],
            ['name' => 'Beyoncé Hoodie', 'price' => 65.00, 'description' => 'Renaissance tour hoodie.', 'artist' => 'Beyoncé', 'category' => 'hoodie'],

            ['name' => 'AM Vinyl', 'price' => 25.99, 'description' => 'Arctic Monkeys classic.', 'artist' => 'Arctic Monkeys', 'category' => 'vinyl'],
            ['name' => 'Arctic Monkeys T-Shirt', 'price' => 28.00, 'description' => 'AM era tee.', 'artist' => 'Arctic Monkeys', 'category' => 't-shirt'],

            ['name' => 'MOTOMAMI Vinyl', 'price' => 26.99, 'description' => 'Rosalía\'s art-pop album.', 'artist' => 'Rosalía', 'category' => 'vinyl'],

            ['name' => 'Harry\'s House Vinyl', 'price' => 27.99, 'description' => 'Cozy indie-pop vinyl.', 'artist' => 'Harry Styles', 'category' => 'vinyl'],
            ['name' => 'Harry Styles Poster', 'price' => 13.99, 'description' => 'Love on Tour poster.', 'artist' => 'Harry Styles', 'category' => 'poster'],

            ['name' => 'SOUR Vinyl', 'price' => 22.99, 'description' => 'Olivia\'s debut album.', 'artist' => 'Olivia Rodrigo', 'category' => 'vinyl'],

            ['name' => 'Hollywood\'s Bleeding CD', 'price' => 10.99, 'description' => 'Post Malone hits.', 'artist' => 'Post Malone', 'category' => 'cd'],

            ['name' => 'Planet Her Vinyl', 'price' => 24.99, 'description' => 'Doja Cat\'s third album.', 'artist' => 'Doja Cat', 'category' => 'vinyl'],

            ['name' => '÷ (Divide) Vinyl', 'price' => 23.99, 'description' => 'Ed\'s third studio album.', 'artist' => 'Ed Sheeran', 'category' => 'vinyl'],
            ['name' => 'Ed Sheeran Cap', 'price' => 20.00, 'description' => 'Mathematics tour cap.', 'artist' => 'Ed Sheeran', 'category' => 'cap'],

            ['name' => 'SOS Vinyl', 'price' => 28.99, 'description' => 'SZA\'s second studio album.', 'artist' => 'SZA', 'category' => 'vinyl'],

            ['name' => 'Music of the Spheres CD', 'price' => 12.99, 'description' => 'Coldplay\'s 9th album.', 'artist' => 'Coldplay', 'category' => 'cd'],
            ['name' => 'Coldplay Hoodie', 'price' => 55.00, 'description' => 'Music of Spheres tour.', 'artist' => 'Coldplay', 'category' => 'hoodie'],

            ['name' => 'Positions Vinyl', 'price' => 21.99, 'description' => 'Ariana\'s 6th album.', 'artist' => 'Ariana Grande', 'category' => 'vinyl'],
            ['name' => 'Ariana Grande Poster', 'price' => 14.99, 'description' => 'Sweetener era poster.', 'artist' => 'Ariana Grande', 'category' => 'poster'],

            ['name' => 'Mañana Será Bonito Vinyl', 'price' => 29.99, 'description' => 'Karol G\'s chart-topper.', 'artist' => 'Karol G', 'category' => 'vinyl'],
            ['name' => 'Karol G T-Shirt', 'price' => 27.00, 'description' => 'Bichota season tee.', 'artist' => 'Karol G', 'category' => 't-shirt'],
        ];

        foreach ($products as $item) {
            $artist = Artist::where('name', $item['artist'])->first();
            $category = ProductCategory::where('slug', $item['category'])->first();

            if (!$artist || !$category) {
                continue; // evita que pete todo
            }

            Product::create([
                'name' => $item['name'],
                'price' => $item['price'],
                'description' => $item['description'],
                'artist_id' => $artist->id,
                'product_category_id' => $category->id,
            ]);
        }
    }
}