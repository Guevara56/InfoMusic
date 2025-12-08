<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Song;
use App\Models\Artist;
use App\Models\Genre;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::with(['artist', 'genres'])
                     ->orderBy('created_at', 'desc')
                     ->get();
        
        return Inertia::render('Songs/Index', compact('songs'));
    }

    public function create()
    {
        $artists = Artist::orderBy('name')->get();
        $genres = Genre::orderBy('name')->get();
        
        return Inertia::render('Songs/Create', compact('artists', 'genres'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'nullable|string|max:10',
            'release_year' => 'nullable|string|max:4',
            'artist_id' => 'required|exists:artists,id',
            'genre_ids' => 'nullable|array',
            'genre_ids.*' => 'exists:genres,id',
        ]);

        // 1. Crear canción (sin genre_ids)
        $song = Song::create($request->except('genre_ids'));

        // 2. Adjuntar géneros
        if ($request->genre_ids) {
            $song->genres()->attach($request->genre_ids);
        }

        return redirect()->route('songs.index')->with('message', 'Song created successfully.');
    }

    public function edit(Song $song)
    {
        $artists = Artist::orderBy('name')->get();
        $genres = Genre::orderBy('name')->get();
        
        // Cargar géneros actuales de la canción
        $song->load('genres');
        
        return Inertia::render('Songs/Edit', compact('song', 'artists', 'genres'));
    }

    public function update(Request $request, Song $song)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'duration' => 'nullable|string|max:10',
            'release_year' => 'nullable|string|max:4',
            'artist_id' => 'required|exists:artists,id',
            'genre_ids' => 'nullable|array',
            'genre_ids.*' => 'exists:genres,id',
        ]);

        // 1. Actualizar canción
        $song->update($request->except('genre_ids'));

        // 2. Sincronizar géneros (reemplaza los anteriores)
        if ($request->has('genre_ids')) {
            $song->genres()->sync($request->genre_ids);
        } else {
            $song->genres()->detach();  // Quitar todos si no seleccionó ninguno
        }

        return redirect()->route('songs.index')->with('message', 'Song updated successfully.');
    }

    public function destroy(Song $song)
    {
        // Las relaciones M:M se borran automáticamente por cascade
        $song->delete();

        return redirect()->route('songs.index')->with('message', 'Song deleted successfully.');
    }
}