<?php

use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [ApiController::class, 'categories']);
Route::get('/products', [ApiController::class, 'products']);
Route::get('/products/{slug}', [ApiController::class, 'product']);
Route::get('/realisations', [ApiController::class, 'realisations']);
Route::get('/realisations/{slug}', [ApiController::class, 'realisation']);
Route::post('/quote-requests', [ApiController::class, 'quote']);
Route::post('/contact-messages', [ApiController::class, 'contact']);
