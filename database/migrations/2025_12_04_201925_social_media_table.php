<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_media', function (Blueprint $table) {
            $table->id();
            $table->string('platform');
            $table->string('url');
            $table->string('followers')->nullable();
            $table->foreignId('artist_id')->constrained('artists')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('artist_social_media', function (Blueprint $table){
            $table->id();
            $table->foreignId('artist_id')->constrained()->onDelete('cascade');
            $table->foreignId('social_media_id')->constrained()->onDelete('cascade');
            $table->unique(['artist_id', 'social_media_id']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_media');
    }
};
