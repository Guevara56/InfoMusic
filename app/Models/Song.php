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

    /**
     * Una canción pertenece a un artista
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Una canción tiene muchos géneros (M:M)
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_song')
                    ->withTimestamps();
    }
}