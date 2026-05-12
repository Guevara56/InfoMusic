<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Song;
use App\Models\Artist;
use App\Models\Genre;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $songs = Song::with(['artist', 'genres'])
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'LIKE', "%{$search}%")
                      ->orWhereHas('artist', fn($q) => $q->where('name', 'LIKE', "%{$search}%"))
                      ->orWhereHas('genres', fn($q) => $q->where('name', 'LIKE', "%{$search}%"));
            })
            ->orderBy('created_at', 'desc')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('Songs/Index', [
            'songs'  => $songs,
            'search' => $search,
        ]);
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
            'title'        => 'required|string|max:255',
            'duration'     => 'nullable|string|max:10',
            'release_year' => 'nullable|string|max:4',
            'artist_id'    => 'required|exists:artists,id',
            'genre_ids'    => 'nullable|array',
            'genre_ids.*'  => 'exists:genres,id',
        ]);

        $song = Song::create($request->except('genre_ids'));

        if ($request->genre_ids) {
            $song->genres()->attach($request->genre_ids);
        }

        return redirect()->route('songs.index')->with('message', 'Song created successfully.');
    }

    public function edit(Song $song)
    {
        $artists = Artist::orderBy('name')->get();
        $genres = Genre::orderBy('name')->get();
        $song->load('genres');

        return Inertia::render('Songs/Edit', compact('song', 'artists', 'genres'));
    }

    public function update(Request $request, Song $song)
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'duration'     => 'nullable|string|max:10',
            'release_year' => 'nullable|string|max:4',
            'artist_id'    => 'required|exists:artists,id',
            'genre_ids'    => 'nullable|array',
            'genre_ids.*'  => 'exists:genres,id',
        ]);

        $song->update($request->except('genre_ids'));

        if ($request->has('genre_ids')) {
            $song->genres()->sync($request->genre_ids);
        } else {
            $song->genres()->detach();
        }

        return redirect()->route('songs.index')->with('message', 'Song updated successfully.');
    }

    public function destroy(Song $song)
    {
        $song->delete();
        return redirect()->route('songs.index')->with('message', 'Song deleted successfully.');
    }
}