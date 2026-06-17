<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CartController extends Controller
{
    private function getOrCreateCart(): Cart
    {
        return Cart::firstOrCreate(
            ['user_id' => Auth::id(), 'status' => 'active'],
        );
    }

    // ── PÁGINA COMPLETA DEL CARRITO ───────────────────────────────
    public function index()
    {
        $cart = $this->getOrCreateCart();
        $cart->load('products.category', 'products.artist.label');

        $items = $cart->products->map(fn($p) => [
            'id'       => $p->id,
            'name'     => $p->name,
            'price'    => $p->price,
            'quantity' => $p->pivot->quantity,
            'subtotal' => $p->price * $p->pivot->quantity,
            'image'    => $p->image,    
            'category' => $p->category?->name,
            'artist'   => $p->artist ? ['id' => $p->artist->id, 'name' => $p->artist->name] : null,

        ]);

        $total = $items->sum('subtotal');

        // ── RECOMENDACIONES POR ARTISTAS SIMILARES ────────────────
        // 1. Artistas que hay en el carrito
        $cartArtistIds = $cart->products
            ->pluck('artist_id')
            ->filter()
            ->unique()
            ->values();

        // 2. IDs de productos ya en el carrito
        $cartProductIds = $cart->products->pluck('id');

        // 3. Artistas que comparten discográfica o género con los del carrito
        $similarArtistIds = collect();

        if ($cartArtistIds->isNotEmpty()) {
            // Por discográfica
            $labelIds = \App\Models\Artist::whereIn('id', $cartArtistIds)
                ->whereNotNull('label_id')
                ->pluck('label_id');

            if ($labelIds->isNotEmpty()) {
                $byLabel = \App\Models\Artist::whereIn('label_id', $labelIds)
                    ->whereNotIn('id', $cartArtistIds)
                    ->pluck('id');
                $similarArtistIds = $similarArtistIds->merge($byLabel);
            }

            // Por género (a través de canciones)
            $genreIds = \App\Models\Song::whereIn('artist_id', $cartArtistIds)
                ->join('genre_song', 'songs.id', '=', 'genre_song.song_id')
                ->pluck('genre_song.genre_id')
                ->unique();

            if ($genreIds->isNotEmpty()) {
                $byGenre = \App\Models\Song::join('genre_song', 'songs.id', '=', 'genre_song.song_id')
                    ->whereIn('genre_song.genre_id', $genreIds)
                    ->whereNotIn('songs.artist_id', $cartArtistIds)
                    ->pluck('songs.artist_id')
                    ->unique();
                $similarArtistIds = $similarArtistIds->merge($byGenre);
            }
        }

        // 4. Productos de artistas similares, excluir los que ya están en el carrito
        $recommendations = Product::with(['artist', 'category'])
            ->when(
                $similarArtistIds->isNotEmpty(),
                fn($q) =>
                $q->whereIn('artist_id', $similarArtistIds->unique())
            )
            ->whereNotIn('id', $cartProductIds)
            ->inRandomOrder()
            ->take(6)
            ->get()
            ->map(fn($p) => [
                'id'       => $p->id,
                'name'     => $p->name,
                'price'    => $p->price,
                'category' => $p->category?->name,
                'artist'   => $p->artist?->name,
                'image'    => $p->image
            ]);

        return Inertia::render('Cart/Index', [
            'items'           => $items,
            'total'           => $total,
            'recommendations' => $recommendations,
        ]);
    }

    // ── AÑADIR PRODUCTO ───────────────────────────────────────────
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'integer|min:1|max:99',
        ]);

        $cart     = $this->getOrCreateCart();
        $quantity = $request->input('quantity', 1);

        if ($cart->products()->where('product_id', $request->product_id)->exists()) {
            $cart->products()->updateExistingPivot($request->product_id, [
                'quantity' => DB::raw("quantity + {$quantity}"),
            ]);
        } else {
            $cart->products()->attach($request->product_id, ['quantity' => $quantity]);
        }

        return back()->with('message', 'Producto añadido al carrito.');
    }

    // ── ACTUALIZAR CANTIDAD ───────────────────────────────────────
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $cart = $this->getOrCreateCart();
        $cart->products()->updateExistingPivot($product->id, [
            'quantity' => $request->quantity,
        ]);

        return back()->with('message', 'Cantidad actualizada.');
    }

    // ── ELIMINAR PRODUCTO ─────────────────────────────────────────
    public function remove(Product $product)
    {
        $cart = $this->getOrCreateCart();
        $cart->products()->detach($product->id);

        return back()->with('message', 'Producto eliminado del carrito.');
    }

    // ── VACIAR CARRITO ────────────────────────────────────────────
    public function clear()
    {
        $cart = $this->getOrCreateCart();
        $cart->products()->detach();

        return back()->with('message', 'Carrito vaciado.');
    }
}
