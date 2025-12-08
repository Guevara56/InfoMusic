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
        $table->string('duration')->nullable();  // "3:45"
        $table->string('release_year')->nullable();  // "2024"
        $table->foreignId('artist_id')->constrained('artists')->onDelete('cascade');
        $table->timestamps();
    });

    // Tabla pivote para la relación muchos a muchos entre canciones y artistas

    Schema::create('artist_song', function (Blueprint $table) {
        $table->id();
        $table->foreignId('artist_id')->constrained()->onDelete('cascade');
        $table->foreignId('song_id')->constrained()->onDelete('cascade');
        $table->unique(['artist_id', 'song_id']);
        $table->timestamps();
    });

    // Tabla pivote para la relación muchos a muchos entre canciones y géneros

    Schema::create('genre_song', function (Blueprint $table) {
            $table->id();
            $table->foreignId('genre_id')->constrained('genres')->onDelete('cascade');
            $table->foreignId('song_id')->constrained('songs')->onDelete('cascade');
            $table->unique(['genre_id', 'song_id']);
            $table->timestamps();
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
