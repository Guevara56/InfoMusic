<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LabelSeeder extends Seeder
{
    public function run(): void
    {
        $labels = [
            ['name' => 'Universal Music Group',  'country' => 'Estados Unidos', 'description' => 'La mayor empresa musical del mundo.',                        'logo' => null, 'website' => 'https://www.universalmusic.com'],
            ['name' => 'Sony Music Entertainment', 'country' => 'Estados Unidos', 'description' => 'Una de las tres grandes discográficas del sector.',          'logo' => null, 'website' => 'https://www.sonymusic.com'],
            ['name' => 'Warner Music Group',      'country' => 'Estados Unidos', 'description' => 'Hogar de artistas legendarios de todo el mundo.',            'logo' => null, 'website' => 'https://www.wmg.com'],
            ['name' => 'Atlantic Records',        'country' => 'Estados Unidos', 'description' => 'Sello icónico fundado en 1947.',                             'logo' => null, 'website' => 'https://www.atlanticrecords.com'],
            ['name' => 'Interscope Records',      'country' => 'Estados Unidos', 'description' => 'Conocida por sus artistas de hip-hop y música alternativa.', 'logo' => null, 'website' => 'https://www.interscope.com'],
            ['name' => 'Columbia Records',        'country' => 'Estados Unidos', 'description' => 'Uno de los sellos discográficos más antiguos del mundo.',    'logo' => null, 'website' => 'https://www.columbiarecords.com'],
            ['name' => 'Republic Records',        'country' => 'Estados Unidos', 'description' => 'Sello de Taylor Swift y grandes estrellas del pop.',         'logo' => null, 'website' => 'https://www.republicrecords.com'],
            ['name' => 'XL Recordings',           'country' => 'Reino Unido',   'description' => 'Sello independiente conocido por Adele y Radiohead.',        'logo' => null, 'website' => 'https://www.xlrecordings.com'],
        ];

        foreach ($labels as $label) {
            DB::table('labels')->insert(array_merge($label, ['created_at' => now(), 'updated_at' => now()]));
        }
    }
}
