<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::all();
        return Inertia::render('Artists/Index', compact('artists'));
    }
    public function create()
    {
        return Inertia::render('Artists/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Artist::create($request->all());

        return redirect()->route('artists.index')->with('message', 'Artist created successfully.');
    }

    public function destroy(Artist $artist)
    {
        $artist->delete();

        return redirect()->route('artists.index')->with('message', 'Artist deleted successfully.');
    }

    public function edit(Artist $artist)
    {
        return Inertia::render('Artists/Edit', compact('artist'));
    }

    public function update(Request $request, Artist $artist)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $artist->update([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('artists.index')->with('message', 'Artist updated successfully.');
    }
}