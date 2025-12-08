<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Genre extends Model
{
    protected $fillable = ['name', 'description', 'slug'];

       protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($genre) {
            if (empty($genre->slug)) {
                $genre->slug = Str::slug($genre->name);
            }
        });
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'genre_song');
    }

    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'artist_genre');
    }
}
