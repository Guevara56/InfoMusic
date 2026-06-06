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
                'country' => 'USA', 'formed_year' => '2004', 'label_id' => 7,
                'bio' => 'Global pop superstar and songwriter.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png/440px-191125_Taylor_Swift_at_the_2019_American_Music_Awards_%28cropped%29.png',
            ],
            [
                'name' => 'The Weeknd',
                'country' => 'Canada', 'formed_year' => '2009', 'label_id' => 2,
                'bio' => 'Dark R&B pioneer from Toronto.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Weeknd_-_Openair_Frauenfeld_2018.jpg/440px-The_Weeknd_-_Openair_Frauenfeld_2018.jpg',
            ],
            [
                'name' => 'Billie Eilish',
                'country' => 'USA', 'formed_year' => '2015', 'label_id' => 5,
                'bio' => 'Gen Z icon known for whisper-pop.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/nineBillie_Eilish_-_Rock_Werchter_2023_%28cropped%29.jpg/440px-Billie_Eilish_-_Rock_Werchter_2023_%28cropped%29.jpg',
            ],
            [
                'name' => 'Dua Lipa',
                'country' => 'UK', 'formed_year' => '2012', 'label_id' => 3,
                'bio' => 'British-Albanian pop powerhouse.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Dua_Lipa_in_2021_%28cropped%29.jpg/440px-Dua_Lipa_in_2021_%28cropped%29.jpg',
            ],
            [
                'name' => 'Bad Bunny',
                'country' => 'Puerto Rico', 'formed_year' => '2013', 'label_id' => 2,
                'bio' => 'Latin trap and reggaeton king.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Bad_Bunny_2019_%28cropped%29.jpg/440px-Bad_Bunny_2019_%28cropped%29.jpg',
            ],
            [
                'name' => 'Kendrick Lamar',
                'country' => 'USA', 'formed_year' => '2004', 'label_id' => 5,
                'bio' => 'Pulitzer Prize-winning rapper.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Kendrick_Lamar_-_Coachella_2023.jpg/440px-Kendrick_Lamar_-_Coachella_2023.jpg',
            ],
            [
                'name' => 'Adele',
                'country' => 'UK', 'formed_year' => '2004', 'label_id' => 8,
                'bio' => 'Soulful balladeer with record-breaking albums.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Adele_2016.jpg/440px-Adele_2016.jpg',
            ],
            [
                'name' => 'Drake',
                'country' => 'Canada', 'formed_year' => '2006', 'label_id' => 1,
                'bio' => 'Certified Lover Boy from Toronto.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Drake_July_2016.jpg/440px-Drake_July_2016.jpg',
            ],
            [
                'name' => 'Beyoncé',
                'country' => 'USA', 'formed_year' => '1997', 'label_id' => 6,
                'bio' => 'Queen Bey, icon of pop and R&B.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png/440px-Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png',
            ],
            [
                'name' => 'Arctic Monkeys',
                'country' => 'UK', 'formed_year' => '2002', 'label_id' => 3,
                'bio' => 'Sheffield indie rock legends.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Arctic_Monkeys_-_Rock_Werchter_2023_%28cropped%29.jpg/440px-Arctic_Monkeys_-_Rock_Werchter_2023_%28cropped%29.jpg',
            ],
            [
                'name' => 'Rosalía',
                'country' => 'Spain', 'formed_year' => '2015', 'label_id' => 6,
                'bio' => 'Flamenco-pop fusion artist.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Rosal%C3%ADa_-_Lollapalooza_Chile_2022_%28cropped%29.jpg/440px-Rosal%C3%ADa_-_Lollapalooza_Chile_2022_%28cropped%29.jpg',
            ],
            [
                'name' => 'Harry Styles',
                'country' => 'UK', 'formed_year' => '2010', 'label_id' => 6,
                'bio' => 'Former One Direction member turned solo icon.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Harry_Styles_2022_%28cropped%29.jpg/440px-Harry_Styles_2022_%28cropped%29.jpg',
            ],
            [
                'name' => 'Olivia Rodrigo',
                'country' => 'USA', 'formed_year' => '2019', 'label_id' => 1,
                'bio' => 'Pop-punk princess and teen heartbreak poet.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Olivia_Rodrigo_-_Good_4_U_-_2021_%28cropped%29.png/440px-Olivia_Rodrigo_-_Good_4_U_-_2021_%28cropped%29.png',
            ],
            [
                'name' => 'Post Malone',
                'country' => 'USA', 'formed_year' => '2013', 'label_id' => 7,
                'bio' => 'Eclectic rapper and rock crossover star.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Post_Malone_2019_by_Glenn_Francis.jpg/440px-Post_Malone_2019_by_Glenn_Francis.jpg',
            ],
            [
                'name' => 'Doja Cat',
                'country' => 'USA', 'formed_year' => '2013', 'label_id' => 7,
                'bio' => 'Genre-bending pop and rap artist.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Doja_Cat_2023_%28cropped%29.jpg/440px-Doja_Cat_2023_%28cropped%29.jpg',
            ],
            [
                'name' => 'Ed Sheeran',
                'country' => 'UK', 'formed_year' => '2005', 'label_id' => 3,
                'bio' => 'Acoustic pop hitmaker and record breaker.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ed_Sheeran_-_Multiply_Tour%2C_Hong_Kong_%28cropped%29.jpg/440px-Ed_Sheeran_-_Multiply_Tour%2C_Hong_Kong_%28cropped%29.jpg',
            ],
            [
                'name' => 'SZA',
                'country' => 'USA', 'formed_year' => '2012', 'label_id' => 7,
                'bio' => 'Alt-R&B queen of vulnerability.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/SZA_2017_crop.jpg/440px-SZA_2017_crop.jpg',
            ],
            [
                'name' => 'Coldplay',
                'country' => 'UK', 'formed_year' => '1996', 'label_id' => 3,
                'bio' => 'Stadium alternative rock band.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Coldplay_-_Rock_Werchter_2024_%28cropped%29.jpg/440px-Coldplay_-_Rock_Werchter_2024_%28cropped%29.jpg',
            ],
            [
                'name' => 'Ariana Grande',
                'country' => 'USA', 'formed_year' => '2008', 'label_id' => 1,
                'bio' => 'High-octave pop diva.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Ariana_Grande_-_Dangerous_Woman_Tour%2C_Los_Angeles_%28cropped%29.jpg/440px-Ariana_Grande_-_Dangerous_Woman_Tour%2C_Los_Angeles_%28cropped%29.jpg',
            ],
            [
                'name' => 'Karol G',
                'country' => 'Colombia', 'formed_year' => '2006', 'label_id' => 1,
                'bio' => 'La Bichota, queen of reggaeton.',
                'avatar' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Karol_G_2022_%28cropped%29.jpg/440px-Karol_G_2022_%28cropped%29.jpg',
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