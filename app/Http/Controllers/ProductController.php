<?php

namespace App\Http\Controllers;
use App\Models\Artist;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('artist')->get();
        return Inertia::render('Products/Index', compact('products'));
    }
    public function create()
{
    $artists = Artist::all(); // Cargar todos los artistas
    return Inertia::render('Products/Create', compact('artists'));
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'nullable|string',
        'artist_id' => 'required|exists:artists,id', // Validar que el artista exista
    ]);

    Product::create($request->all());

    return redirect()->route('products.index')->with('message', 'Product created successfully.');
}

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('message', 'Product deleted successfully.');
    }

    public function edit(Product $product)
    {
        $artists = Artist::all();

         return Inertia::render('Products/Edit', [
        'product' => $product->load('artist'),
        'artists' => $artists,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'artist_id' => 'required|exists:artists,id'
        ]);

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'artist_id' => $request->input('artist_id')
        ]);

        return redirect()->route('products.index')->with('message', 'Product updated successfully.');
    }
}

