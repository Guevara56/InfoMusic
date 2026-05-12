<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'title',
        'duration',
        'release_year',
        'artist_id',
    ];

    // Un artista por canción (belongsTo)
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_song')
                    ->withTimestamps();
    }
}