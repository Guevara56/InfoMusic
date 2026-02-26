<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = 'social_media';

    protected $fillable = [
        'platform',
        'url',
        'followers',
        'artist_id',
    ];

    public function artist()
    {
        return $this->belongsToMany(Artist::class, 'artist_social_media');
    }
}
