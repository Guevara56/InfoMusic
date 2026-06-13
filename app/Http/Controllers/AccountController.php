<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Fortify\Features;

class AccountController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $totalSpent = $user->orders()->sum('total');

        $totalOrders = $user->orders()->count();

        $lastOrder = $user->orders()
            ->latest()
            ->first();

        $orders = $user->orders()
            ->with('items')
            ->latest()
            ->get()
            ->map(fn($order) => [
                'id' => $order->id,
                'status' => $order->status_label,
                'total' => $order->total,
                'created_at' => $order->created_at->format('d/m/Y'),

                'items' => $order->items->map(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ]),
            ]);

        return Inertia::render('Account/Index', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session()->get('status'),
            'twoFactorEnabled' => $user->hasEnabledTwoFactorAuthentication(),
            'requiresConfirmation' => Features::optionEnabled(
                Features::twoFactorAuthentication(),
                'confirm'
            ),
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'verified' => !is_null($user->email_verified_at),
                'description' => $user->description,
            ],
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalSpent' => $totalSpent,
                'lastOrder' => $lastOrder?->created_at?->format('d/m/Y'),
            ],
            'orders' => $orders,
        ]);
    }

    public function show(\App\Models\Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('items');

        return Inertia::render('Account/Order', [
            'order' => [
                'id' => $order->id,
                'status' => $order->status_label,
                'total' => $order->total,
                'created_at' => $order->created_at->format('d/m/Y H:i'),

                'name' => $order->name,
                'email' => $order->email,
                'phone' => $order->phone,
                'address' => $order->address,
                'city' => $order->city,
                'postal_code' => $order->postal_code,
                'country' => $order->country,

                'items' => $order->items->map(fn($item) => [
                    'name' => $item->product_name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ]),
            ],
        ]);
    }

    public function orders()
    {
        $user = Auth::user();

        $orders = $user->orders()
            ->with('items')
            ->latest()
            ->get()
            ->map(fn($order) => [
                'id'          => $order->id,
                'status'      => $order->status_label,
                'total'       => $order->total,
                'created_at'  => $order->created_at->format('d/m/Y'),
                'items_count' => $order->items->count(),
                'items'       => $order->items->map(fn($item) => [
                    'name'     => $item->product_name,
                    'quantity' => $item->quantity,
                    'price'    => $item->price,
                    'subtotal' => $item->subtotal,
                ]),
            ]);

        return Inertia::render('Account/Orders', [
            'orders' => $orders,
        ]);
    }
}
