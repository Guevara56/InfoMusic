<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index()
    {
        $songs = Song::all();
        return Inertia::render('Songs/Index', compact('songs'));
    }
    public function create()
    {
        return Inertia::render('Songs/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Song::create($request->all());

        return redirect()->route('songs.index')->with('message', 'Song created successfully.');
    }

    public function destroy(Song $song)
    {
        $song->delete();

        return redirect()->route('songs.index')->with('message', 'Song deleted successfully.');
    }

    public function edit(Song $song)
    {
        return Inertia::render('Songs/Edit', compact('song'));
    }

    public function update(Request $request, Song $song)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $song->update([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('songs.index')->with('message', 'Song updated successfully.');
    }
}