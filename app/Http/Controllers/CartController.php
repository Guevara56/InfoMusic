<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    // Obtiene o crea el carrito activo del usuario
    private function getOrCreateCart(): Cart
    {
        return Cart::firstOrCreate(
            ['user_id' => Auth::id(), 'status' => 'active'],
        );
    }

    // ── MOSTRAR CARRITO ───────────────────────────────────────────
    public function index()
    {
        $cart = $this->getOrCreateCart();
        $cart->load('products.category');

        return Inertia::render('Cart/Index', [
            'cart'  => $cart,
            'items' => $cart->products->map(fn($p) => [
                'id'           => $p->id,
                'name'         => $p->name,
                'price'        => $p->price,
                'quantity'     => $p->pivot->quantity,
                'subtotal'     => $p->price * $p->pivot->quantity,
                'category'     => $p->category?->name,
                'artist'       => $p->artist?->name ?? null,
            ]),
            'total' => $cart->products->sum(fn($p) => $p->price * $p->pivot->quantity),
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

        // Si ya existe, suma la cantidad; si no, lo añade
        if ($cart->products()->where('product_id', $request->product_id)->exists()) {
            $cart->products()->updateExistingPivot($request->product_id, [
                'quantity' => \DB::raw("quantity + {$quantity}"),
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