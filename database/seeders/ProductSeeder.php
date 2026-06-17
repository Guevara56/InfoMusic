<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Artist;
use App\Models\ProductCategory;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Taylor Swift
            ['name' => 'Vinilo Midnights', 'price' => 29.99, 'description' => 'Edición limitada en vinilo.', 'artist' => 'Taylor Swift', 'category' => 'vinyl'],
            ['name' => 'Camiseta Eras Tour', 'price' => 35.00, 'description' => 'Camiseta oficial de la gira Eras Tour.', 'artist' => 'Taylor Swift', 'category' => 't-shirt'],
            // The Weeknd
            ['name' => 'CD The Highlights', 'price' => 12.99, 'description' => 'Recopilatorio de grandes éxitos.', 'artist' => 'The Weeknd', 'category' => 'cd'],
            ['name' => 'Sudadera Starboy', 'price' => 59.99, 'description' => 'Merchandising de la era Starboy.', 'artist' => 'The Weeknd', 'category' => 'hoodie'],
            // Dua Lipa
            ['name' => 'Vinilo Future Nostalgia', 'price' => 24.99, 'description' => 'Vinilo de la era disco.', 'artist' => 'Dua Lipa', 'category' => 'vinyl'],
            ['name' => 'Camiseta Houdini', 'price' => 30.00, 'description' => 'Camiseta oficial de Houdini.', 'artist' => 'Dua Lipa', 'category' => 't-shirt'],
            // Bad Bunny
            ['name' => 'Vinilo Un Verano Sin Ti', 'price' => 31.99, 'description' => 'Vinilo del verano.', 'artist' => 'Bad Bunny', 'category' => 'vinyl'],
            ['name' => 'Camiseta Bad Bunny', 'price' => 30.00, 'description' => 'Camiseta El Conejo Malo.', 'artist' => 'Bad Bunny', 'category' => 't-shirt'],
            // Rosalía
            ['name' => 'Vinilo MOTOMAMI', 'price' => 26.99, 'description' => 'Álbum art-pop de Rosalía.', 'artist' => 'Rosalía', 'category' => 'vinyl'],
            ['name' => 'Póster Rosalía', 'price' => 14.99, 'description' => 'Póster oficial de la gira.', 'artist' => 'Rosalía', 'category' => 'poster'],
            // Harry Styles
            ['name' => "Vinilo Harry's House", 'price' => 27.99, 'description' => 'Vinilo indie-pop acogedor.', 'artist' => 'Harry Styles', 'category' => 'vinyl'],
            ['name' => 'Póster Harry Styles', 'price' => 13.99, 'description' => 'Póster Love on Tour.', 'artist' => 'Harry Styles', 'category' => 'poster'],
            // Billie Eilish
            ['name' => 'Vinilo Happier Than Ever', 'price' => 27.99, 'description' => 'Edición en vinilo azul.', 'artist' => 'Billie Eilish', 'category' => 'vinyl'],
            ['name' => 'Sudadera Billie Eilish', 'price' => 55.00, 'description' => 'Sudadera oficial de la gira.', 'artist' => 'Billie Eilish', 'category' => 'hoodie'],
            // Kendrick Lamar
            ['name' => 'Vinilo DAMN.', 'price' => 28.99, 'description' => 'Álbum ganador del Pulitzer.', 'artist' => 'Kendrick Lamar', 'category' => 'vinyl'],
            ['name' => 'Camiseta Kendrick Lamar', 'price' => 28.00, 'description' => 'Camiseta oficial de la gira.', 'artist' => 'Kendrick Lamar', 'category' => 't-shirt'],
        ];

        foreach ($products as $item) {
            $artist = Artist::where('name', $item['artist'])->first();
            $category = ProductCategory::where('slug', $item['category'])->first();
            if (!$artist || !$category) continue;

            Product::create([
                'name' => $item['name'],
                'price' => $item['price'],
                'description' => $item['description'],
                'artist_id' => $artist->id,
                'product_category_id' => $category->id,
                'stock' => 100,
                'image' => null,
            ]);
        }
    }
}
    