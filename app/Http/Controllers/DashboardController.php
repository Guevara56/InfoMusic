<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Song;
use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use App\Models\Genre;
use App\Models\Label;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ── STATS GLOBALES ────────────────────────────────────────
        $stats = [
            'artists'  => Artist::count(),
            'songs'    => Song::count(),
            'products' => Product::count(),
            'users'    => User::count(),
            'orders'   => Order::count(),
            'genres'   => Genre::count(),
            'labels'   => Label::count(),
            'revenue'  => Order::where('status', 'paid')->sum('total'),
        ];

        // ── ÚLTIMOS PEDIDOS ───────────────────────────────────────
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($o) => [
                'id'         => $o->id,
                'user'       => $o->user?->name ?? $o->name,
                'total'      => $o->total,
                'status'     => $o->status_label,
                'created_at' => $o->created_at->format('d/m/Y H:i'),
            ]);

        // ── ÚLTIMOS ARTISTAS ──────────────────────────────────────
        $recentArtists = Artist::with('label')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($a) => [
                'id'      => $a->id,
                'name'    => $a->name,
                'country' => $a->country,
                'avatar'  => $a->avatar,
                'label'   => $a->label?->name,
            ]);

        // ── ÚLTIMAS CANCIONES ─────────────────────────────────────
        $recentSongs = Song::with('artist')
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($s) => [
                'id'           => $s->id,
                'title'        => $s->title,
                'artist'       => $s->artist?->name,
                'release_year' => $s->release_year,
                'duration'     => $s->duration,
            ]);

        // ── PEDIDOS POR ESTADO ────────────────────────────────────
        $ordersByStatus = Order::selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->get()
            ->mapWithKeys(fn($o) => [$o->status => $o->total]);

        return Inertia::render('dashboard', [
            'stats'          => $stats,
            'recentOrders'   => $recentOrders,
            'recentArtists'  => $recentArtists,
            'recentSongs'    => $recentSongs,
            'ordersByStatus' => $ordersByStatus,
        ]);
    }
}