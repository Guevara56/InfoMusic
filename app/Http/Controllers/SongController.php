<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Song;
use App\Models\Artist;
use App\Models\Genre;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;

class SongController extends Controller
{
    use HandlesImageUpload;

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
            'image'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'spotify_url' => 'nullable|url',
            'apple_music_url' => 'nullable|url',
            'youtube_url' => 'nullable|url',
        ]);


        $data = $request->except('genre_ids');

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage(
                $request->file('image'),
                'songs'
            );
        }

        $song = Song::create($data);

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
            'image'        => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'spotify_url' => 'nullable|url',
            'apple_music_url' => 'nullable|url',
            'youtube_url' => 'nullable|url',
        ]);


        $data = $request->except('genre_ids');

        if ($request->hasFile('image')) {
            $this->deleteImage($song->image);
            $data['image'] = $this->uploadImage($request->file('image'), 'songs');
        } else {
            unset($data['image']); // mantiene la imagen anterior
        }

        $song->update($data);

        if ($request->has('genre_ids')) {
            $song->genres()->sync($request->genre_ids);
        }

        return redirect()->route('songs.index')->with('message', 'Song updated successfully.');
    }

    public function destroy(Song $song)
    {
        $song->delete();
        return redirect()->route('songs.index')->with('message', 'Song deleted successfully.');
    }
}
