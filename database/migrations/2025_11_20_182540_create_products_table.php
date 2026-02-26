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
            $table->timestamps();
        });

        // Tabla pivote para la relación muchos a muchos entre productos y artistas

        Schema::create('artist_product', function (Blueprint $table) {
            $table->id();
            $table->foreignID('artist_id')->constrained()->onDelete('cascade');
            $table->foreignID('product_id')->constrained()->onDelete('cascade');
            $table->unique(['artist_id', 'product_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
    }
};
