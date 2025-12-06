<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    protected $table = 'social_media';

    protected $fillable = ['artist_id', 'platform', 'url'];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
