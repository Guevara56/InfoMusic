<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SocialMedia;
use App\Models\Artist;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public function index()
    {
        $socialMedias = SocialMedia::with('artist')
                                   ->orderBy('created_at', 'desc')
                                   ->get();
        
        return Inertia::render('SocialMedias/Index', compact('socialMedias'));
    }

    public function create()
    {
        $artists = Artist::orderBy('name')->get();
        return Inertia::render('SocialMedias/Create', compact('artists'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'followers' => 'nullable|string|max:255',
            'artist_id' => 'required|exists:artists,id',
        ]);

        SocialMedia::create($request->all());

        return redirect()->route('social-medias.index')->with('message', 'Social Media created successfully.');
    }

    public function edit(SocialMedia $socialMedia)
    {
        $artists = Artist::orderBy('name')->get();
        return Inertia::render('SocialMedias/Edit', compact('socialMedia', 'artists'));
    }

    public function update(Request $request, SocialMedia $socialMedia)
    {
        $request->validate([
            'platform' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'followers' => 'nullable|string|max:255',
            'artist_id' => 'required|exists:artists,id',
        ]);

        $socialMedia->update($request->all());

        return redirect()->route('social-medias.index')->with('message', 'Social Media updated successfully.');
    }

    public function destroy(SocialMedia $socialMedia)
    {
        $socialMedia->delete();

        return redirect()->route('social-medias.index')->with('message', 'Social Media deleted successfully.');
    }
}