<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Genre;
use App\Models\Artist;
use Illuminate\Http\Request;    

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::with('artists')->get();
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
            'slug' => 'required|string|max:255',
        ]); 

        Genre::create($request->all());

        return redirect()->route('genres.index')->with('message', 'Genre created successfully.');
    }

    public function destroy(Genre $genre)
    {
        $genre->delete();

        return redirect()->route('genres.index')->with('message', 'Genre deleted successfully.');
    }

    public function edit(Genre $genre)
    {
        return Inertia::render('Genres/Edit', compact('genre'));
    }

    public function update(Request $request, Genre $genre)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ]);

        $genre->update([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ]);

        return redirect()->route('genres.index')->with('message', 'Genre updated successfully.');
    }
}