<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
    Schema::create('songs', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->integer('duration')->nullable(); // en segundos
        $table->date('release_date')->nullable();
        $table->timestamps();
    });

    // Tabla pivote para la relación muchos a muchos entre canciones y artistas

    Schema::create('artist_song', function (Blueprint $table) {
        $table->id();
        $table->foreignId('artist_id')->constrained()->onDelete('cascade');
        $table->foreignId('song_id')->constrained()->onDelete('cascade');
    });

    // Tabla pivote para la relación muchos a muchos entre canciones y géneros

    Schema::create('genre_song', function (Blueprint $table) {
        $table->id();
        $table->foreignId('genre_id')->constrained()->onDelete('cascade');
        $table->foreignId('song_id')->constrained()->onDelete('cascade');
    });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
        Schema::dropIfExists('artist_song');
        Schema::dropIfExists('genre_song');
    }
};
