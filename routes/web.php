<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| PROTECTED
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::get('/admin', function () {
        return Inertia::render('Admin/Dashboard');
    });

    Route::get('/sales', function () {
        return Inertia::render('Sales/Dashboard');
    });

    Route::get('/customer', function () {
        return Inertia::render('Customer/Dashboard');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});