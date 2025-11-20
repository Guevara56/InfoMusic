<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::with('genre')->get();
        
        // En lugar de return response()->json()
        // devuelves un componente React con los datos
        return Inertia::render('Artists/Index', [
            'artists' => $artists
        ]);
    }

    public function show($id)
    {
        $artist = Artist::with(['genre', 'socialNetworks', 'products'])
                        ->findOrFail($id);
        
        return Inertia::render('Artists/Show', [
            'artist' => $artist
        ]);
    }
}