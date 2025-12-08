<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\ProductCategory;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('artist', 'category')->get();
        return Inertia::render('Products/Index', compact('products'));
    }
    public function create()
    {
        $artists = Artist::all(); // Cargar todos los artistas
        $categories = ProductCategory::orderBy('name')->get();
        return Inertia::render('Products/Create', compact('artists', 'categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'artist_id' => 'required|exists:artists,id', // Validar que el artista exista
            'product_category_id' => 'required|exists:product_categories,id' // Validar que la categoría exista
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
            'categories' => ProductCategory::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
         
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'artist_id' => 'required|exists:artists,id',
            'product_category_id' => 'required|exists:product_categories,id'
        ]);

        

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'artist_id' => $request->input('artist_id'),
            'product_category_id' => $request->input('category_id'),
        ]);

        

        return redirect()->route('products.index')->with('message', 'Product updated successfully.');
    }
}
