<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Song;
use App\Models\Genre;
use App\Models\Label;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    // ── HOME ──────────────────────────────────────────────────────
    public function home()
    {
        return Inertia::render('home', [
            'artists'  => Artist::with('label')->orderBy('name')->take(8)->get(),
            'songs'    => Song::with(['artist', 'genres'])->orderBy('created_at', 'desc')->take(8)->get(),
            'genres'   => Genre::all(),
            'products' => Product::with(['artist', 'category'])->take(6)->get(),
        ]);
    }

    // ── ARTISTS ───────────────────────────────────────────────────
    public function artists(Request $request)
    {
        $search = $request->input('search', '');

        $artists = Artist::with('label')
            ->when($search, fn($q) => $q->where('name', 'LIKE', "%{$search}%")
                ->orWhere('country', 'LIKE', "%{$search}%"))
            ->orderBy('name')
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('explore/ArtistsIndex', [
            'artists' => $artists,
            'search'  => $search,
        ]);
    }

    public function artist(Artist $artist)
    {
        $artist->load(['label', 'songs.genres', 'products.category', 'socialMedia']);

        return Inertia::render('explore/ArtistShow', [
            'artist' => $artist,
        ]);
    }

    // ── SONGS ─────────────────────────────────────────────────────
    public function songs(Request $request)
    {
        $search = $request->input('search', '');

        $songs = Song::with(['artist', 'genres'])
            ->when($search, fn($q) => $q
                ->where('title', 'LIKE', "%{$search}%")
                ->orWhereHas('artist', fn($q2) => $q2->where('name', 'LIKE', "%{$search}%"))
                ->orWhereHas('genres', fn($q2) => $q2->where('name', 'LIKE', "%{$search}%")))
            ->orderBy('title')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('explore/SongsIndex', [
            'songs'  => $songs,
            'search' => $search,
        ]);
    }

    public function song(Song $song)
    {
        $song->load(['artist', 'genres']);

        return Inertia::render('explore/SongShow', [
            'song' => $song,
        ]);
    }

    // ── GENRES ────────────────────────────────────────────────────
    public function genres()
    {
        $genres = Genre::withCount('songs')->orderBy('name')->get();

        return Inertia::render('explore/GenresIndex', [
            'genres' => $genres,
        ]);
    }

    public function genre(Genre $genre)
    {
        $genre->load(['songs.artist']);

        return Inertia::render('explore/GenreShow', [
            'genre' => $genre,
        ]);
    }

    // ── LABELS ────────────────────────────────────────────────────
    public function labels()
    {
        $labels = Label::withCount('artists')->orderBy('name')->get();

        return Inertia::render('explore/LabelsIndex', [
            'labels' => $labels,
        ]);
    }

    public function label(Label $label)
    {
        $label->load('artists');

        return Inertia::render('explore/LabelShow', [
            'label' => $label,
        ]);
    }

    // ── SHOP ──────────────────────────────────────────────────────
    public function shop(Request $request)
    {
        $search = $request->input('search', '');

        $products = Product::with(['artist', 'category'])
            ->when($search, fn($q) => $q
                ->where('name', 'LIKE', "%{$search}%")
                ->orWhereHas('artist', fn($q2) => $q2->where('name', 'LIKE', "%{$search}%")))
            ->orderBy('name')
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('explore/ShopIndex', [
            'products' => $products,
            'search'   => $search,
        ]);
    }

    public function product(Product $product)
    {
        $product->load(['artist.socialMedia', 'category']);

        return Inertia::render('explore/ProductShow', [
            'product' => $product,
        ]);
    }

    public function about ()
    {
        return Inertia::render('About/Index');
    }
}