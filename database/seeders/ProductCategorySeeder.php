<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Vinyl',
                'slug' => 'vinyl',
                'icon' => '💿',
                'description' => 'Vinyl records and LPs',
            ],
            [
                'name' => 'CD',
                'slug' => 'cd',
                'icon' => '💽',
                'description' => 'Compact discs',
            ],
            [
                'name' => 'T-Shirt',
                'slug' => 't-shirt',
                'icon' => '👕',
                'description' => 'Band and artist t-shirts',
            ],
            [
                'name' => 'Hoodie',
                'slug' => 'hoodie',
                'icon' => '🧥',
                'description' => 'Hooded sweatshirts',
            ],
            [
                'name' => 'Poster',
                'slug' => 'poster',
                'icon' => '🖼️',
                'description' => 'Wall posters and prints',
            ],
            [
                'name' => 'Hat',
                'slug' => 'hat',
                'icon' => '🧢',
                'description' => 'Caps and beanies',
            ],
            [
                'name' => 'Accessory',
                'slug' => 'accessory',
                'icon' => '💍',
                'description' => 'Miscellaneous accessories',
            ],
            [
                'name' => 'Ticket',
                'slug' => 'ticket',
                'icon' => '🎟️',
                'description' => 'Event tickets',
            ]
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}