<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Vinilo',
                'slug' => 'vinyl',
                'icon' => '💿',
                'description' => 'Discos de vinilo y LPs',
            ],
            [
                'name' => 'CD',
                'slug' => 'cd',
                'icon' => '💽',
                'description' => 'Discos compactos',
            ],
            [
                'name' => 'Camiseta',
                'slug' => 't-shirt',
                'icon' => '👕',
                'description' => 'Camisetas de grupos y artistas',
            ],
            [
                'name' => 'Sudadera',
                'slug' => 'hoodie',
                'icon' => '🧥',
                'description' => 'Sudaderas con capucha',
            ],
            [
                'name' => 'Póster',
                'slug' => 'poster',
                'icon' => '🖼️',
                'description' => 'Pósters y láminas decorativas',
            ],
            [
                'name' => 'Gorra',
                'slug' => 'hat',
                'icon' => '🧢',
                'description' => 'Gorras y gorros',
            ],
            [
                'name' => 'Accesorio',
                'slug' => 'accessory',
                'icon' => '💍',
                'description' => 'Accesorios varios',
            ],
            [
                'name' => 'Entrada',
                'slug' => 'ticket',
                'icon' => '🎟️',
                'description' => 'Entradas para eventos',
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}
