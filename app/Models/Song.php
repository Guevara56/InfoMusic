<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'artist_song');
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_song');
    }
}
