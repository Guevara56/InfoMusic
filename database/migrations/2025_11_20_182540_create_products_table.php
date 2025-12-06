<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->string('image')->nullable();
            // atributo tipo de producto CD, Vinilo, Merchandise,  entradas de Concierto
            $table->enum('type', ['CD', 'Vinilo', 'Merchandise', 'Concierto']);
            $table->integer('stock')->default(0);
            $table->string('status')->default('available');
            $table->text('description')->nullable();
            $table->foreignId('artist_id')->constrained('artists')->onDelete('cascade');
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};