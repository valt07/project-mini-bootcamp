<?php

use App\Http\Controllers\ArtikelController;

    Route::get('/Artikel', [ArtikelController::class, 'index']);
    Route::post('/Artikel/{id}', [ArtikelController::class, 'show']);
    Route::post('/Artikel', [ArtikelController::class, 'store']);
    Route::put('/Artikel/{id}', [ArtikelController::class, 'update']);
    Route::delete('/Artikel/{id}', [ArtikelController::class, 'destroy']);
