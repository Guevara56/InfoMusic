<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Label;
use App\Models\Genre;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ArtistController extends Controller
{
    use HandlesImageUpload;

    public function index()
    {
        $artists = Artist::with('label')->orderBy('name')->get();
        return Inertia::render('Artists/Index', compact('artists'));
    }

    public function create()
    {
        $labels = Label::orderBy('name')->get();
        $genres = Genre::orderBy('name')->get();

        return Inertia::render('Artists/Create', [
            'labels' => $labels,
            'genres' => $genres,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'         => 'required|string|max:255',
            'bio'          => 'nullable|string',
            'country'      => 'nullable|string|max:100',
            'formed_year'  => 'nullable|string|max:4',
            'label_id'     => 'nullable|exists:labels,id',
            'avatar'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('avatar');

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $this->uploadImage($request->file('avatar'), 'artists');
        }

        Artist::create($data);

        return redirect()->route('artists.index')->with('message', 'Artist created successfully.');
    }

    public function edit(Artist $artist)
    {
        $labels = Label::orderBy('name')->get();
        return Inertia::render('Artists/Edit', compact('artist', 'labels'));
    }

    public function update(Request $request, Artist $artist)
    {
        $request->validate([
            'name'         => 'required|string|max:255',
            'bio'          => 'nullable|string',
            'country'      => 'nullable|string|max:100',
            'formed_year'  => 'nullable|string|max:4',
            'label_id'     => 'nullable|exists:labels,id',
            'avatar'       => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('avatar');

        if ($request->hasFile('avatar')) {
            $this->deleteImage($artist->avatar);
            $data['avatar'] = $this->uploadImage($request->file('avatar'), 'artists');
        }

        $artist->update($data);

        return redirect()->route('artists.index')->with('message', 'Artist updated successfully.');
    }

    public function destroy(Artist $artist)
    {
        $this->deleteImage($artist->avatar);
        $artist->delete();
        return redirect()->route('artists.index')->with('message', 'Artist deleted successfully.');
    }
}
