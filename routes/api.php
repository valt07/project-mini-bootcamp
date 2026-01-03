<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']); // If needed, but admin seed usually enough for CMS

// Public Routes
Route::get('/articles', [ArtikelController::class, 'index']);
Route::get('/articles/{id}', [ArtikelController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard Stats
    Route::get('/stats', [ArtikelController::class, 'stats']);

    // Articles (Protected Actions)
    Route::post('/articles', [ArtikelController::class, 'store']);
    Route::put('/articles/{id}', [ArtikelController::class, 'update']);
    Route::delete('/articles/{id}', [ArtikelController::class, 'destroy']);
    
    // User Management (Pengguna)
    Route::apiResource('pengguna', \App\Http\Controllers\UserController::class);
});
