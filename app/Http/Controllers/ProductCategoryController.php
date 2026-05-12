<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index()
    {
        $categories = ProductCategory::withCount('products')
            ->orderBy('name')
            ->get();

        return Inertia::render('ProductCategories/Index', compact('categories'));
    }

    public function create()
    {
        return Inertia::render('ProductCategories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        ProductCategory::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'icon' => $request->icon,
            'description' => $request->description,
        ]);

        return redirect()->route('product-categories.index')->with('message', 'Category created successfully.');
    }

    public function edit(ProductCategory $productCategory)
    {
        return Inertia::render('ProductCategories/Edit', [
            'category' => $productCategory
        ]);
    }

    public function update(Request $request, ProductCategory $productCategory)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name,' . $productCategory->id,
            'icon' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $productCategory->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'icon' => $request->icon,
            'description' => $request->description,
        ]);

        return redirect()->route('product-categories.index')->with('message', 'Category updated successfully.');
    }

    public function destroy(ProductCategory $productCategory)
    {
        // Borra primero los productos asociados y luego la categoría
        $productCategory->products()->delete();
        $productCategory->delete();

        return redirect()->route('product-categories.index')->with('message', 'Category and its products deleted successfully.');
    }
}
