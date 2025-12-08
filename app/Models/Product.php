<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'artist_id',
        'product_category_id'
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }

    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'cart_products')->withPivot('quantity')->withTimestamps();
    }

    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }
}
