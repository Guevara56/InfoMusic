<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Artist;
use App\Models\Label;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::with('label')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Artists/Index', compact('artists'));
    }

    public function create()
    {
        $labels = Label::all();
        return Inertia::render('Artists/Create', compact('labels'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|string',
            'country' => 'nullable|string|max:255',
            'formed_year' => 'nullable|string|max:4',
            'label_id' => 'nullable|exists:labels,id',
        ]);

        Artist::create($request->all());

        return redirect()->route('artists.index')->with('message', 'Artist created successfully.');
    }

    public function edit(Artist $artist)
    {
        $labels = Label::all();
        return Inertia::render('Artists/Edit', compact('artist', 'labels'));
    }

    public function update(Request $request, Artist $artist)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|string',
            'country' => 'nullable|string|max:255',
            'formed_year' => 'nullable|string|max:4',
            'label_id' => 'nullable|exists:labels,id',
        ]);

        $artist->update($request->all());

        return redirect()->route('artists.index')->with('message', 'Artist updated successfully.');
    }

    public function destroy(Artist $artist)
    {
        $artist->delete();

        return redirect()->route('artists.index')->with('message', 'Artist deleted successfully.');
    }
}