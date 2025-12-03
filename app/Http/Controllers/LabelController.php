<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Label;
use Illuminate\Http\Request;

class LabelController extends Controller
{
    public function index()
    {
        $labels = Label::all();
        return Inertia::render('Labels/Index', compact('labels'));
    }
    public function create()
    {
        return Inertia::render('Labels/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Label::create($request->all());

        return redirect()->route('labels.index')->with('message', 'Label created successfully.');
    }

    public function destroy(Label $label)
    {
        $label->delete();

        return redirect()->route('labels.index')->with('message', 'Label deleted successfully.');
    }

    public function edit(Label $label)
    {
        return Inertia::render('Labels/Edit', compact('label'));
    }

    public function update(Request $request, Label $label)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $label->update([
            'name' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('labels.index')->with('message', 'Label updated successfully.');
    }
}