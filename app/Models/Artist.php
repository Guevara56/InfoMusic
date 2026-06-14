<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'bio',
        'avatar',
        'country',
        'formed_year',
        'spotify_url',
        'apple_music_url',
        'youtube_url',
        'label_id',
    ];

    public function label()
    {
        return $this->belongsTo(Label::class);
    }

    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
    
    public function socialMedia()
    {
        return $this->hasMany(SocialMedia::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
}
