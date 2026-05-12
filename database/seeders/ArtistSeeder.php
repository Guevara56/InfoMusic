<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArtistSeeder extends Seeder
{
    public function run(): void
    {
        $artists = [
            ['name' => 'Taylor Swift',    'country' => 'USA',          'formed_year' => '2004', 'label_id' => 7, 'bio' => 'Global pop superstar and songwriter.'],
            ['name' => 'The Weeknd',      'country' => 'Canada',        'formed_year' => '2009', 'label_id' => 2, 'bio' => 'Dark R&B pioneer from Toronto.'],
            ['name' => 'Billie Eilish',   'country' => 'USA',          'formed_year' => '2015', 'label_id' => 5, 'bio' => 'Gen Z icon known for whisper-pop.'],
            ['name' => 'Dua Lipa',        'country' => 'UK',           'formed_year' => '2012', 'label_id' => 3, 'bio' => 'British-Albanian pop powerhouse.'],
            ['name' => 'Bad Bunny',       'country' => 'Puerto Rico',   'formed_year' => '2013', 'label_id' => 2, 'bio' => 'Latin trap and reggaeton king.'],
            ['name' => 'Kendrick Lamar',  'country' => 'USA',          'formed_year' => '2004', 'label_id' => 5, 'bio' => 'Pulitzer Prize-winning rapper.'],
            ['name' => 'Adele',           'country' => 'UK',           'formed_year' => '2004', 'label_id' => 8, 'bio' => 'Soulful balladeer with record-breaking albums.'],
            ['name' => 'Drake',           'country' => 'Canada',        'formed_year' => '2006', 'label_id' => 1, 'bio' => 'Certified Lover Boy from Toronto.'],
            ['name' => 'Beyoncé',         'country' => 'USA',          'formed_year' => '1997', 'label_id' => 6, 'bio' => 'Queen Bey, icon of pop and R&B.'],
            ['name' => 'Arctic Monkeys',  'country' => 'UK',           'formed_year' => '2002', 'label_id' => 3, 'bio' => 'Sheffield indie rock legends.'],
            ['name' => 'Rosalía',         'country' => 'Spain',         'formed_year' => '2015', 'label_id' => 6, 'bio' => 'Flamenco-pop fusion artist.'],
            ['name' => 'Harry Styles',    'country' => 'UK',           'formed_year' => '2010', 'label_id' => 6, 'bio' => 'Former One Direction member turned solo icon.'],
            ['name' => 'Olivia Rodrigo',  'country' => 'USA',          'formed_year' => '2019', 'label_id' => 1, 'bio' => 'Pop-punk princess and teen heartbreak poet.'],
            ['name' => 'Post Malone',     'country' => 'USA',          'formed_year' => '2013', 'label_id' => 7, 'bio' => 'Eclectic rapper and rock crossover star.'],
            ['name' => 'Doja Cat',        'country' => 'USA',          'formed_year' => '2013', 'label_id' => 7, 'bio' => 'Genre-bending pop and rap artist.'],
            ['name' => 'Ed Sheeran',      'country' => 'UK',           'formed_year' => '2005', 'label_id' => 3, 'bio' => 'Acoustic pop hitmaker and record breaker.'],
            ['name' => 'SZA',             'country' => 'USA',          'formed_year' => '2012', 'label_id' => 7, 'bio' => 'Alt-R&B queen of vulnerability.'],
            ['name' => 'Coldplay',        'country' => 'UK',           'formed_year' => '1996', 'label_id' => 3, 'bio' => 'Stadium alternative rock band.'],
            ['name' => 'Ariana Grande',   'country' => 'USA',          'formed_year' => '2008', 'label_id' => 1, 'bio' => 'High-octave pop diva.'],
            ['name' => 'Karol G',         'country' => 'Colombia',      'formed_year' => '2006', 'label_id' => 1, 'bio' => 'La Bichota, queen of reggaeton.'],
        ];

        foreach ($artists as $artist) {
            DB::table('artists')->insert(array_merge($artist, ['avatar' => null, 'created_at' => now(), 'updated_at' => now()]));
        }
    }
}