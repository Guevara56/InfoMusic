<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    protected $fillable = [
        'name',
        'country',
        'description',
        'logo',
        'website',
    ];

    /**
     * Una discográfica tiene muchos artistas
     */
    public function artists()
    {
        return $this->hasMany(Artist::class);
    }
}