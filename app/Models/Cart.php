<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $table = 'carts';

    protected $fillable = ['user_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_product')
                    ->withPivot('quantity')
                    ->withTimestamps();
    }

    public function getTotalAttribute(): float
    {
        return $this->products->sum(fn($p) => $p->price * $p->pivot->quantity);
    }

    public function getItemsCountAttribute(): int
    {
        return $this->products->sum(fn($p) => $p->pivot->quantity);
    }
}