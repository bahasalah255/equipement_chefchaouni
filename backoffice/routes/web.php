<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return redirect()->route('admin.dashboard');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/categories', [AdminController::class, 'categories'])->name('categories');
    Route::post('/categories', [AdminController::class, 'storeCategory'])->name('categories.store');
    Route::delete('/categories/{category}', [AdminController::class, 'deleteCategory'])->name('categories.delete');
    Route::get('/produits', [AdminController::class, 'products'])->name('products');
    Route::post('/produits', [AdminController::class, 'storeProduct'])->name('products.store');
    Route::delete('/produits/{product}', [AdminController::class, 'deleteProduct'])->name('products.delete');
    Route::get('/realisations', [AdminController::class, 'realisations'])->name('realisations');
    Route::post('/realisations', [AdminController::class, 'storeRealisation'])->name('realisations.store');
    Route::delete('/realisations/{realisation}', [AdminController::class, 'deleteRealisation'])->name('realisations.delete');
    Route::get('/devis', [AdminController::class, 'quotes'])->name('quotes');
    Route::patch('/devis/{quote}', [AdminController::class, 'updateQuote'])->name('quotes.update');
    Route::delete('/devis/{quote}', [AdminController::class, 'deleteQuote'])->name('quotes.delete');
    Route::get('/messages', [AdminController::class, 'messages'])->name('messages');
    Route::patch('/messages/{message}', [AdminController::class, 'updateMessage'])->name('messages.update');
    Route::delete('/messages/{message}', [AdminController::class, 'deleteMessage'])->name('messages.delete');
    Route::get('/parametres', [AdminController::class, 'settings'])->name('settings');
    Route::post('/parametres', [AdminController::class, 'updateSettings'])->name('settings.update');
});
