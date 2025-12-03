<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Users/Index', compact('users'));
    }
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'description' => 'nullable|string',
        ]);

        User::create($request->all());

        return redirect()->route('users.index')->with('message', 'User created successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('message', 'User deleted successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', compact('user'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'description' => 'nullable|string',
        ]);

        $user->update([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'description' => 'nullable|string',
        ]);

        return redirect()->route('users.index')->with('message', 'User updated successfully.');
    }
}