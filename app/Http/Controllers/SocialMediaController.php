<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\SocialMedia;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public function index()
    {
        $socialmedias = SocialMedia::all();
        return Inertia::render('SocialMedias/Index', compact('socialmedias'));
    }
    public function create()
    {
        return Inertia::render('SocialMedias/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        SocialMedia::create($request->all());

        return redirect()->route('socialmedias.index')->with('message', 'SocialMedia created successfully.');
    }

    public function destroy(SocialMedia $socialmedia)
    {
        $socialmedia->delete();

        return redirect()->route('socialmedias.index')->with('message', 'SocialMedia deleted successfully.');
    }

    public function edit(SocialMedia $socialmedia)
    {
        return Inertia::render('SocialMedias/Edit', compact('socialmedia'));
    }

    public function update(Request $request, SocialMedia $socialmedia)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $socialmedia->update([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('socialmedias.index')->with('message', 'SocialMedia updated successfully.');
    }
}