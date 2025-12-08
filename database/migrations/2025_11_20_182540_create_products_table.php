<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Migración: create_product_categories_table
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Vinyl, CD, Shirt
            $table->string('slug');  // vinyl, cd, shirt
            $table->string('icon')->nullable();  // Icono
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Migración: create_products_table
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->text('description')->nullable();
            $table->foreignId('product_category_id')->constrained('product_categories')->onDelete('restrict');
            $table->foreignId('artist_id')->constrained('artists')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
    }
};
