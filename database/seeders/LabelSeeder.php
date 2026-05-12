<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LabelSeeder extends Seeder
{
    public function run(): void
    {
        $labels = [
            ['name' => 'Universal Music Group',  'country' => 'USA', 'description' => 'The largest music company in the world.',          'logo' => null, 'website' => 'https://www.universalmusic.com'],
            ['name' => 'Sony Music Entertainment','country' => 'USA', 'description' => 'One of the Big Three record labels.',              'logo' => null, 'website' => 'https://www.sonymusic.com'],
            ['name' => 'Warner Music Group',      'country' => 'USA', 'description' => 'Home to legendary artists worldwide.',             'logo' => null, 'website' => 'https://www.wmg.com'],
            ['name' => 'Atlantic Records',        'country' => 'USA', 'description' => 'Iconic label founded in 1947.',                    'logo' => null, 'website' => 'https://www.atlanticrecords.com'],
            ['name' => 'Interscope Records',      'country' => 'USA', 'description' => 'Known for hip-hop and alternative artists.',       'logo' => null, 'website' => 'https://www.interscope.com'],
            ['name' => 'Columbia Records',        'country' => 'USA', 'description' => 'One of the oldest record labels in existence.',    'logo' => null, 'website' => 'https://www.columbiarecords.com'],
            ['name' => 'Republic Records',        'country' => 'USA', 'description' => 'Home to Taylor Swift and many pop giants.',        'logo' => null, 'website' => 'https://www.republicrecords.com'],
            ['name' => 'XL Recordings',           'country' => 'UK',  'description' => 'Independent label behind Adele and Radiohead.',    'logo' => null, 'website' => 'https://www.xlrecordings.com'],
        ];

        foreach ($labels as $label) {
            DB::table('labels')->insert(array_merge($label, ['created_at' => now(), 'updated_at' => now()]));
        }
    }
}