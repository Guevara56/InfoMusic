<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{
    use HandlesImageUpload;

    public function index()
    {
        $products = Product::with('artist', 'category')->get();
        return Inertia::render('Products/Index', compact('products'));
    }

    public function create()
    {
        $artists    = Artist::orderBy('name')->get();
        $categories = ProductCategory::orderBy('name')->get();
        return Inertia::render('Products/Create', compact('artists', 'categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'                => 'required|string|max:255',
            'price'               => 'required|numeric|min:0',
            'description'         => 'nullable|string',
            'artist_id'           => 'required|exists:artists,id',
            'product_category_id' => 'required|exists:product_categories,id',
            'image'               => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request->file('image'), 'products');
        }

        Product::create($data);

        return redirect()->route('products.index')->with('message', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $artists    = Artist::orderBy('name')->get();
        $categories = ProductCategory::orderBy('name')->get();
        return Inertia::render('Products/Edit', compact('product', 'artists', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name'                => 'required|string|max:255',
            'price'               => 'required|numeric|min:0',
            'description'         => 'nullable|string',
            'artist_id'           => 'required|exists:artists,id',
            'product_category_id' => 'required|exists:product_categories,id',
            'image'               => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $this->deleteImage($product->image);
            $data['image'] = $this->uploadImage($request->file('image'), 'products');
        }

        $product->update($data);

        return redirect()->route('products.index')->with('message', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $this->deleteImage($product->image);
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Product deleted successfully.');
    }
}