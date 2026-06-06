<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $cartItems = [];
        $cartTotal = 0;

        if (Auth::check()) {
            $cart = Cart::where('user_id', Auth::id())
                        ->where('status', 'active')
                        ->with('products.category', 'products.artist')
                        ->first();

            if ($cart) {
                $cartItems = $cart->products->map(fn($p) => [
                    'id'       => $p->id,
                    'name'     => $p->name,
                    'price'    => $p->price,
                    'quantity' => $p->pivot->quantity,
                    'subtotal' => $p->price * $p->pivot->quantity,
                    'image'    => $p->image,
                    'category' => $p->category?->name,
                    'artist'   => $p->artist?->name,
                ])->values()->toArray();

                $cartTotal = collect($cartItems)->sum('subtotal');
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user() ? [
                    'id'   => $request->user()->id,
                    'name' => $request->user()->name,
                    'email'=> $request->user()->email,
                    'role' => $request->user()->role,
                ] : null,
            ],
            'flash' => [
                'message' => $request->session()->get('message'),
            ],
            'cart' => [
                'items' => $cartItems,
                'total' => $cartTotal,
                'count' => collect($cartItems)->sum('quantity'),
            ],
        ]);
    }
}