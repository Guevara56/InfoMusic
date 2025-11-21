<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller {
    public function index() {
        $products = Product::orderBy('created_at','desc')->get();
        return Inertia::render('Products/Index', [
            'products' => $products
        ]);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'nullable|string'
        ]);
        Product::create($data);
        return redirect()->back(); // con Inertia esto funciona bien
    }
}

