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
        'label_id',
    ];

    // Un artista pertenece a una discográfica
    public function label()
    {
        return $this->belongsTo(Label::class);
    }

    // Un artista tiene muchos productos
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Un artista tiene muchas canciones
    public function songs()
    {
        return $this->hasMany(Song::class);
    }

    // Un artista tiene muchas redes sociales
    public function socialMedias()
    {
        return $this->hasMany(SocialMedia::class);
    }

    // Un artista pertenece a muchos géneros y géneros tienen muchos artistas
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'artist_genre');
    
    }
}