<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ── RUTAS PÚBLICAS ────────────────────────────────────────────
Route::get('/', [PublicController::class, 'home'])->name('home');

Route::prefix('explore')->name('explore.')->group(function () {
    Route::get('/artists',          [PublicController::class, 'artists'])->name('artists');
    Route::get('/artists/{artist}', [PublicController::class, 'artist'])->name('artist');
    Route::get('/songs',            [PublicController::class, 'songs'])->name('songs');
    Route::get('/songs/{song}',     [PublicController::class, 'song'])->name('song');
    Route::get('/genres',           [PublicController::class, 'genres'])->name('genres');
    Route::get('/genres/{genre}',   [PublicController::class, 'genre'])->name('genre');
    Route::get('/labels',           [PublicController::class, 'labels'])->name('labels');
    Route::get('/labels/{label}',   [PublicController::class, 'label'])->name('label');
    Route::get('/shop',             [PublicController::class, 'shop'])->name('shop');
    Route::get('/shop/{product}',   [PublicController::class, 'product'])->name('product');
});

// ── DASHBOARD (solo admin) ────────────────────────────────────
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::resource('product-categories', ProductCategoryController::class);
    Route::resource('artists', ArtistController::class);
    Route::resource('users', UserController::class);
    Route::resource('songs', SongController::class);
    Route::resource('genres', GenreController::class);
    Route::resource('labels', LabelController::class);
    Route::resource('social-medias', SocialMediaController::class);
});

// ── CARRITO (cualquier usuario autenticado) ───────────────────
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/',                    [CartController::class, 'index'])->name('index');
        Route::post('/add',                [CartController::class, 'add'])->name('add');
        Route::patch('/{product}',         [CartController::class, 'update'])->name('update');
        Route::delete('/{product}/remove', [CartController::class, 'remove'])->name('remove');
        Route::delete('/clear',            [CartController::class, 'clear'])->name('clear');
    });
});

require __DIR__.'/settings.php';