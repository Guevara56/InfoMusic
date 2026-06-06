<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class CheckoutController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    // ── MOSTRAR FORMULARIO ────────────────────────────────────────
    public function index()
    {
        $cart = Cart::where('user_id', Auth::id())
            ->where('status', 'active')
            ->with('products.category', 'products.artist')
            ->first();

        if (!$cart || $cart->products->isEmpty()) {
            return redirect()->route('cart.index')->with('message', 'Tu carrito está vacío.');
        }

        $items = $cart->products->map(fn($p) => [
            'id'       => $p->id,
            'name'     => $p->name,
            'price'    => $p->price,
            'quantity' => $p->pivot->quantity,
            'subtotal' => $p->price * $p->pivot->quantity,
            'category' => $p->category?->name,
            'artist'   => $p->artist?->name,
        ]);

        $total = $items->sum('subtotal');

        // Crear PaymentIntent en Stripe (importe en céntimos)
        $paymentIntent = PaymentIntent::create([
            'amount'   => (int) round($total * 100),
            'currency' => 'eur',
            'metadata' => ['user_id' => Auth::id()],
        ]);

        $user = Auth::user();

        return Inertia::render('Checkout/Index', [
            'items'         => $items,
            'total'         => $total,
            'prefill'       => ['name' => $user->name, 'email' => $user->email],
            'clientSecret'  => $paymentIntent->client_secret,
            'stripeKey'     => config('services.stripe.key'),
        ]);
    }

    // ── GUARDAR PEDIDO (llamado tras pago exitoso) ─────────────────
    public function store(Request $request)
    {
        $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|max:255',
            'phone'            => 'nullable|string|max:20',
            'address'          => 'required|string|max:255',
            'city'             => 'required|string|max:100',
            'postal_code'      => 'required|string|max:10',
            'country'          => 'required|string|max:100',
            'payment_intent_id'=> 'required|string',
        ]);

        // Verificar que el PaymentIntent está pagado en Stripe
        $paymentIntent = PaymentIntent::retrieve($request->payment_intent_id);

        if ($paymentIntent->status !== 'succeeded') {
            return back()->withErrors(['payment' => 'El pago no se ha completado correctamente.']);
        }

        $cart = Cart::where('user_id', Auth::id())
            ->where('status', 'active')
            ->with('products')
            ->first();

        if (!$cart || $cart->products->isEmpty()) {
            return redirect()->route('cart.index')->with('message', 'Tu carrito está vacío.');
        }

        $total = $cart->products->sum(fn($p) => $p->price * $p->pivot->quantity);

        DB::transaction(function () use ($request, $cart, $total, $paymentIntent) {
            $order = Order::create([
                'user_id'               => Auth::id(),
                'status'                => 'paid',
                'total'                 => $total,
                'name'                  => $request->name,
                'email'                 => $request->email,
                'phone'                 => $request->phone,
                'address'               => $request->address,
                'city'                  => $request->city,
                'postal_code'           => $request->postal_code,
                'country'               => $request->country,
                'stripe_payment_id'     => $paymentIntent->id,
                'stripe_payment_status' => $paymentIntent->status,
            ]);

            foreach ($cart->products as $product) {
                OrderItem::create([
                    'order_id'     => $order->id,
                    'product_id'   => $product->id,
                    'product_name' => $product->name,
                    'price'        => $product->price,
                    'quantity'     => $product->pivot->quantity,
                    'subtotal'     => $product->price * $product->pivot->quantity,
                ]);
            }

            $cart->products()->detach();
            $cart->update(['status' => 'completed']);
            Cart::create(['user_id' => Auth::id(), 'status' => 'active']);
        });

        return redirect()->route('checkout.confirmation')->with('message', '¡Pedido realizado con éxito!');
    }

    // ── CONFIRMACIÓN ──────────────────────────────────────────────
    public function confirmation()
    {
        $order = Order::where('user_id', Auth::id())
            ->with('items')
            ->latest()
            ->first();

        return Inertia::render('Checkout/Confirmation', [
            'order' => $order ? [
                'id'          => $order->id,
                'total'       => $order->total,
                'status'      => $order->status_label,
                'name'        => $order->name,
                'email'       => $order->email,
                'address'     => $order->address,
                'city'        => $order->city,
                'postal_code' => $order->postal_code,
                'country'     => $order->country,
                'items'       => $order->items->map(fn($i) => [
                    'name'     => $i->product_name,
                    'price'    => $i->price,
                    'quantity' => $i->quantity,
                    'subtotal' => $i->subtotal,
                ]),
            ] : null,
        ]);
    }
}