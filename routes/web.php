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
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// ── RUTAS PÚBLICAS ────────────────────────────────────────────
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/about', [PublicController::class, 'about'])->name('about');

Route::get('/email-verified', function () {
    return Inertia::render('email-verified');
})->name('email.verified.success');

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
    Route::get('dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

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
        Route::get('/',                    [\App\Http\Controllers\CartController::class, 'index'])->name('index');
        Route::post('/add',                [\App\Http\Controllers\CartController::class, 'add'])->name('add');
        Route::patch('/{product}',         [\App\Http\Controllers\CartController::class, 'update'])->name('update');
        Route::delete('/{product}/remove', [\App\Http\Controllers\CartController::class, 'remove'])->name('remove');
        Route::delete('/clear',            [\App\Http\Controllers\CartController::class, 'clear'])->name('clear');
    });

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/confirmation', [CheckoutController::class, 'confirmation'])->name('checkout.confirmation');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/account', [\App\Http\Controllers\AccountController::class, 'index'])->name('account.index');
    Route::get('/account/orders', [AccountController::class, 'orders'])
        ->name('account.orders');
    Route::get('/account/orders/{order}', [\App\Http\Controllers\AccountController::class, 'show'])->name('account.orders.show');
});

require __DIR__ . '/settings.php';
