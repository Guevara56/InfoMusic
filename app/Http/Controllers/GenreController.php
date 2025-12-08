<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GenreController extends Controller
{
    public function index()
    {
        // Cargar géneros con conteo de artistas y canciones
        $genres = Genre::withCount(['artists', 'songs'])
                       ->orderBy('id')
                       ->get();
        
        return Inertia::render('Genres/Index', compact('genres'));
    }

    public function create()
    {
        return Inertia::render('Genres/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:genres,name',
            'description' => 'nullable|string',
        ]);

        Genre::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),  // Generar slug
            'description' => $request->description,
        ]);

        return redirect()->route('genres.index')->with('message', 'Genre created successfully.');
    }

    public function edit(Genre $genre)
    {
        return Inertia::render('Genres/Edit', compact('genre'));
    }

    public function update(Request $request, Genre $genre)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string',
        ]);

        $genre->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'description' => $request->description,
        ]);

        return redirect()->route('genres.index')->with('message', 'Genre updated successfully.');
    }

    public function destroy(Genre $genre)
    {
        // Las relaciones M:M se borran automáticamente por cascade
        $genre->delete();

        return redirect()->route('genres.index')->with('message', 'Genre deleted successfully.');
    }
}