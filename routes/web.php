<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\SocialMediaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Rutas Productos

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}/', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Rutas Artistas

    Route::get('/artists', [ArtistController::class, 'index'])->name('artists.index');
    Route::post('/artists', [ArtistController::class, 'store'])->name('artists.store');
    Route::get('/artists/create', [ArtistController::class, 'create'])->name('artists.create');
    Route::get('/artists/{artist}/edit', [ArtistController::class, 'edit'])->name('artists.edit');
    Route::put('/artists/{artist}/', [ArtistController::class, 'update'])->name('artists.update');
    Route::delete('/artists/{artist}', [ArtistController::class, 'destroy'])->name('artists.destroy');

    //Rutas Usuarios

    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('/users/{users}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{users}/', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{users}', [UserController::class, 'destroy'])->name('users.destroy');

    //Rutas Canciones

    Route::get('/songs', [SongController::class, 'index'])->name('songs.index');
    Route::post('/songs', [SongController::class, 'store'])->name('songs.store');
    Route::get('/songs/create', [SongController::class, 'create'])->name('songs.create');
    Route::get('/songs/{songs}/edit', [SongController::class, 'edit'])->name('songs.edit');
    Route::put('/songs/{songs}/', [SongController::class, 'update'])->name('songs.update');
    Route::delete('/songs/{songs}', [SongController::class, 'destroy'])->name('songs.destroy');

    //Ruta Generos

    Route::get('/genres', [GenreController::class, 'index'])->name('genres.index');
    Route::post('/genres', [GenreController::class, 'store'])->name('genres.store');
    Route::get('/genres/create', [GenreController::class, 'create'])->name('genres.create');
    Route::get('/genres/{genre}/edit', [GenreController::class, 'edit'])->name('genres.edit');
    Route::put('/genres/{genre}/', [GenreController::class, 'update'])->name('genres.update');
    Route::delete('/genres/{genre}', [GenreController::class, 'destroy'])->name('genres.destroy');

    //Ruta Discograficas

    Route::get('/labels', [LabelController::class, 'index'])->name('labels.index');
    Route::post('/labels', [LabelController::class, 'store'])->name('labels.store');
    Route::get('/labels/create', [LabelController::class, 'create'])->name('labels.create');
    Route::get('/labels/{label}/edit', [LabelController::class, 'edit'])->name('labels.edit');
    Route::put('/labels/{label}/', [LabelController::class, 'update'])->name('labels.update');
    Route::delete('/labels/{label}', [LabelController::class, 'destroy'])->name('labels.destroy');

    //Ruta Redes Sociales

    Route::get('/social-medias', [SocialMediaController::class, 'index'])->name('social-medias.index');
    Route::post('/social-medias', [SocialMediaController::class, 'store'])->name('social-medias.store');
    Route::get('/social-medias/create', [SocialMediaController::class, 'create'])->name('social-medias.create');
    Route::get('/social-medias/{social_media}/edit', [SocialMediaController::class, 'edit'])->name('social-medias.edit');
    Route::put('/social-medias/{social_media}/', [SocialMediaController::class, 'update'])->name('social-medias.update');
    Route::delete('/social-medias/{social_media}', [SocialMediaController::class, 'destroy'])->name('social-medias.destroy');
});

require __DIR__.'/settings.php';

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');

    


