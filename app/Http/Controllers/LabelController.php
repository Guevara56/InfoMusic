<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Label;
use Illuminate\Http\Request;

class LabelController extends Controller
{
    public function index()
    {
        $labels = Label::withCount('artists')
                       ->orderBy('name')
                       ->get();
        
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
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|url',
            'website' => 'nullable|url',
        ]);

        Label::create($request->all());

        return redirect()->route('labels.index')->with('message', 'Label created successfully.');
    }

    public function edit(Label $label)
    {
        return Inertia::render('Labels/Edit', compact('label'));
    }

    public function update(Request $request, Label $label)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'logo' => 'nullable|url',
            'website' => 'nullable|url',
        ]);

        $label->update($request->all());

        return redirect()->route('labels.index')->with('message', 'Label updated successfully.');
    }

    public function destroy(Label $label)
    {
        // Verificar si tiene artistas antes de borrar
        if ($label->artists()->count() > 0) {
            return back()->withErrors(['error' => 'Cannot delete label with artists. Reassign or delete artists first.']);
        }

        $label->delete();

        return redirect()->route('labels.index')->with('message', 'Label deleted successfully.');
    }
}