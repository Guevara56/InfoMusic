<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SongSeeder extends Seeder
{
    public function run(): void
    {
        // genre IDs: Pop=1, Rock=2, Hip-Hop=3, R&B=4, Electronic=5,
        //            Jazz=6, Classical=7, Metal=8, Indie=9, Country=10,
        //            Reggae=11, Soul=12, Folk=13, Punk=14, Latin=15
        $songs = [
            // Taylor Swift (1)
            ['title' => 'Anti-Hero',                            'duration' => '3:20', 'release_year' => '2022', 'artist_id' => 1,  'genres' => [1, 10]],
            ['title' => 'Shake It Off',                         'duration' => '3:39', 'release_year' => '2014', 'artist_id' => 1,  'genres' => [1]],
            ['title' => 'Love Story',                           'duration' => '3:55', 'release_year' => '2008', 'artist_id' => 1,  'genres' => [1, 10]],
            ['title' => 'Blank Space',                          'duration' => '3:51', 'release_year' => '2014', 'artist_id' => 1,  'genres' => [1]],
            ['title' => 'Cruel Summer',                         'duration' => '2:58', 'release_year' => '2019', 'artist_id' => 1,  'genres' => [1]],
            // The Weeknd (2)
            ['title' => 'Blinding Lights',                      'duration' => '3:20', 'release_year' => '2019', 'artist_id' => 2,  'genres' => [4, 1]],
            ['title' => 'Save Your Tears',                      'duration' => '3:36', 'release_year' => '2020', 'artist_id' => 2,  'genres' => [4]],
            ['title' => 'Starboy',                              'duration' => '3:50', 'release_year' => '2016', 'artist_id' => 2,  'genres' => [4, 5]],
            ['title' => 'The Hills',                            'duration' => '4:02', 'release_year' => '2015', 'artist_id' => 2,  'genres' => [4]],
            // Billie Eilish (3)
            ['title' => 'Bad Guy',                              'duration' => '3:14', 'release_year' => '2019', 'artist_id' => 3,  'genres' => [1, 9]],
            ['title' => 'Happier Than Ever',                    'duration' => '4:58', 'release_year' => '2021', 'artist_id' => 3,  'genres' => [1]],
            ['title' => 'Ocean Eyes',                           'duration' => '3:21', 'release_year' => '2015', 'artist_id' => 3,  'genres' => [1, 9]],
            // Dua Lipa (4)
            ['title' => 'Levitating',                           'duration' => '3:23', 'release_year' => '2020', 'artist_id' => 4,  'genres' => [1, 5]],
            ['title' => "Don't Start Now",                      'duration' => '3:03', 'release_year' => '2019', 'artist_id' => 4,  'genres' => [1]],
            ['title' => 'New Rules',                            'duration' => '3:29', 'release_year' => '2017', 'artist_id' => 4,  'genres' => [1]],
            // Bad Bunny (5)
            ['title' => 'Dakiti',                               'duration' => '3:45', 'release_year' => '2020', 'artist_id' => 5,  'genres' => [15, 11]],
            ['title' => 'Me Porto Bonito',                      'duration' => '3:15', 'release_year' => '2022', 'artist_id' => 5,  'genres' => [15]],
            ['title' => 'Tití Me Preguntó',                     'duration' => '4:04', 'release_year' => '2022', 'artist_id' => 5,  'genres' => [15]],
            // Kendrick Lamar (6)
            ['title' => 'HUMBLE.',                              'duration' => '2:57', 'release_year' => '2017', 'artist_id' => 6,  'genres' => [3]],
            ['title' => 'DNA.',                                 'duration' => '3:05', 'release_year' => '2017', 'artist_id' => 6,  'genres' => [3]],
            ['title' => 'Alright',                              'duration' => '3:39', 'release_year' => '2015', 'artist_id' => 6,  'genres' => [3]],
            // Adele (7)
            ['title' => 'Hello',                                'duration' => '4:55', 'release_year' => '2015', 'artist_id' => 7,  'genres' => [12, 1]],
            ['title' => 'Rolling in the Deep',                  'duration' => '3:48', 'release_year' => '2010', 'artist_id' => 7,  'genres' => [12]],
            ['title' => 'Someone Like You',                     'duration' => '4:45', 'release_year' => '2011', 'artist_id' => 7,  'genres' => [12, 1]],
            // Drake (8)
            ['title' => "God's Plan",                           'duration' => '3:18', 'release_year' => '2018', 'artist_id' => 8,  'genres' => [3, 4]],
            ['title' => 'One Dance',                            'duration' => '2:54', 'release_year' => '2016', 'artist_id' => 8,  'genres' => [3]],
            ['title' => 'Hotline Bling',                        'duration' => '4:27', 'release_year' => '2015', 'artist_id' => 8,  'genres' => [3, 4]],
            // Beyoncé (9)
            ['title' => 'Crazy in Love',                        'duration' => '3:56', 'release_year' => '2003', 'artist_id' => 9,  'genres' => [4, 1]],
            ['title' => 'Halo',                                 'duration' => '4:21', 'release_year' => '2008', 'artist_id' => 9,  'genres' => [1]],
            ['title' => 'Formation',                            'duration' => '3:26', 'release_year' => '2016', 'artist_id' => 9,  'genres' => [4, 3]],
            // Arctic Monkeys (10)
            ['title' => 'Do I Wanna Know?',                     'duration' => '4:32', 'release_year' => '2013', 'artist_id' => 10, 'genres' => [2, 9]],
            ['title' => 'R U Mine?',                            'duration' => '3:21', 'release_year' => '2013', 'artist_id' => 10, 'genres' => [2, 9]],
            ['title' => "Why'd You Only Call Me When You're High?", 'duration' => '2:42', 'release_year' => '2013', 'artist_id' => 10, 'genres' => [2]],
            // Rosalía (11)
            ['title' => 'MALAMENTE',                            'duration' => '3:34', 'release_year' => '2017', 'artist_id' => 11, 'genres' => [15, 1]],
            ['title' => 'Con Altura',                           'duration' => '3:08', 'release_year' => '2019', 'artist_id' => 11, 'genres' => [15]],
            ['title' => 'MOTOMAMI',                             'duration' => '1:41', 'release_year' => '2022', 'artist_id' => 11, 'genres' => [15, 1]],
            // Harry Styles (12)
            ['title' => 'As It Was',                            'duration' => '2:37', 'release_year' => '2022', 'artist_id' => 12, 'genres' => [1, 2]],
            ['title' => 'Watermelon Sugar',                     'duration' => '2:54', 'release_year' => '2019', 'artist_id' => 12, 'genres' => [1]],
            ['title' => 'Adore You',                            'duration' => '3:27', 'release_year' => '2019', 'artist_id' => 12, 'genres' => [1]],
            // Olivia Rodrigo (13)
            ['title' => 'drivers license',                      'duration' => '4:02', 'release_year' => '2021', 'artist_id' => 13, 'genres' => [1]],
            ['title' => 'good 4 u',                             'duration' => '2:58', 'release_year' => '2021', 'artist_id' => 13, 'genres' => [1, 2]],
            ['title' => 'vampire',                              'duration' => '3:39', 'release_year' => '2023', 'artist_id' => 13, 'genres' => [1]],
            // Post Malone (14)
            ['title' => 'Circles',                              'duration' => '3:35', 'release_year' => '2019', 'artist_id' => 14, 'genres' => [1, 3]],
            ['title' => 'Rockstar',                             'duration' => '3:39', 'release_year' => '2017', 'artist_id' => 14, 'genres' => [3, 2]],
            ['title' => 'Sunflower',                            'duration' => '2:38', 'release_year' => '2018', 'artist_id' => 14, 'genres' => [1, 3]],
            // Doja Cat (15)
            ['title' => 'Say So',                               'duration' => '3:57', 'release_year' => '2019', 'artist_id' => 15, 'genres' => [1, 3]],
            ['title' => 'Kiss Me More',                         'duration' => '3:28', 'release_year' => '2021', 'artist_id' => 15, 'genres' => [1]],
            ['title' => 'Need to Know',                         'duration' => '3:34', 'release_year' => '2021', 'artist_id' => 15, 'genres' => [3]],
            // Ed Sheeran (16)
            ['title' => 'Shape of You',                         'duration' => '3:54', 'release_year' => '2017', 'artist_id' => 16, 'genres' => [1]],
            ['title' => 'Perfect',                              'duration' => '4:23', 'release_year' => '2017', 'artist_id' => 16, 'genres' => [1, 13]],
            ['title' => 'Thinking Out Loud',                    'duration' => '4:41', 'release_year' => '2014', 'artist_id' => 16, 'genres' => [1, 12]],
            // SZA (17)
            ['title' => 'Kill Bill',                            'duration' => '2:33', 'release_year' => '2022', 'artist_id' => 17, 'genres' => [4]],
            ['title' => 'Good Days',                            'duration' => '4:39', 'release_year' => '2020', 'artist_id' => 17, 'genres' => [4, 12]],
            // Coldplay (18)
            ['title' => 'Yellow',                               'duration' => '4:29', 'release_year' => '2000', 'artist_id' => 18, 'genres' => [2, 1]],
            ['title' => 'The Scientist',                        'duration' => '5:09', 'release_year' => '2002', 'artist_id' => 18, 'genres' => [2]],
            ['title' => 'Fix You',                              'duration' => '4:55', 'release_year' => '2005', 'artist_id' => 18, 'genres' => [2, 1]],
            ['title' => 'A Sky Full of Stars',                  'duration' => '4:28', 'release_year' => '2014', 'artist_id' => 18, 'genres' => [1, 5]],
            // Ariana Grande (19)
            ['title' => 'thank u, next',                        'duration' => '3:27', 'release_year' => '2018', 'artist_id' => 19, 'genres' => [1]],
            ['title' => '7 rings',                              'duration' => '2:58', 'release_year' => '2019', 'artist_id' => 19, 'genres' => [1, 3]],
            ['title' => 'positions',                            'duration' => '2:52', 'release_year' => '2020', 'artist_id' => 19, 'genres' => [1, 4]],
            // Karol G (20)
            ['title' => 'BICHOTA',                              'duration' => '3:01', 'release_year' => '2020', 'artist_id' => 20, 'genres' => [15]],
            ['title' => 'Tusa',                                 'duration' => '3:15', 'release_year' => '2019', 'artist_id' => 20, 'genres' => [15, 1]],
            ['title' => 'Provenza',                             'duration' => '3:28', 'release_year' => '2022', 'artist_id' => 20, 'genres' => [15]],
        ];

        foreach ($songs as $songData) {
            $genreIds = $songData['genres'];
            unset($songData['genres']);

            $songId = DB::table('songs')->insertGetId(array_merge($songData, ['created_at' => now(), 'updated_at' => now()]));

            foreach ($genreIds as $genreId) {
                DB::table('genre_song')->insert([
                    'genre_id'   => $genreId,
                    'song_id'    => $songId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}