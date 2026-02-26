<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\ProductCategoryController;
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
    Route::resource('products', ProductController::class);
    Route::resource('product-categories', ProductCategoryController::class);

    // Rutas Artistas
    Route::resource('artists',ArtistController::class);

    //Rutas Usuarios
    Route::resource('users',UserController::class);

    //Rutas Canciones
    Route::resource('songs',SongController::class);

    //Ruta Generos
    Route::resource('genres',GenreController::class);

    //Ruta Discograficas
    Route::resource('labels', LabelController::class);

    //Ruta Redes Sociales
    Route::resource('social-medias', SocialMediaController::class);
});

require __DIR__.'/settings.php';

Route::get('/test', function () {
    return Inertia::render('test');
})->name('test');




