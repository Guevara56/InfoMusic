<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artist_follows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('artist_id')->constrained('artists')->onDelete('cascade');
            $table->unique(['user_id', 'artist_id']); // un usuario solo puede seguir una vez al mismo artista
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artist_follows');
    }
};