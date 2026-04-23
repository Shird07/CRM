<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProspekController;
use App\Http\Controllers\FollowUpController;
use App\Http\Controllers\SalesDashboardController;
use App\Http\Controllers\PenawaranController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\AdminDashboardController;

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

Route::middleware(['auth'])->group(function () {

    Route::get('/sales/prospeks', [ProspekController::class, 'index']);
    Route::get('/sales/prospeks/create', [ProspekController::class, 'create']);
    Route::post('/sales/prospeks', [ProspekController::class, 'store']);
    Route::get('/sales/prospeks/{prospek}/edit', [ProspekController::class, 'edit']);
    Route::put('/sales/prospeks/{prospek}', [ProspekController::class, 'update']);
    Route::delete('/sales/prospeks/{prospek}', [ProspekController::class, 'destroy']);

});

Route::middleware(['auth'])->group(function () {

    Route::get('/sales/prospeks/{id}/follow-up', [FollowUpController::class, 'index']);
    Route::get('/sales/prospeks/{id}/follow-up/create', [FollowUpController::class, 'create']);
    Route::post('/sales/follow-up', [FollowUpController::class, 'store']);

});

Route::get('/sales', [SalesDashboardController::class, 'index']);

Route::middleware(['auth'])->group(function () {

    Route::get('/sales/prospeks/{id}/penawaran', [PenawaranController::class, 'index']);
    Route::get('/sales/prospeks/{id}/penawaran/create', [PenawaranController::class, 'create']);
    Route::post('/sales/penawaran', [PenawaranController::class, 'store']);

    Route::put('/sales/penawaran/{penawaran}/status', [PenawaranController::class, 'updateStatus']);

});

Route::post('/sales/deal', [DealController::class, 'store']);

Route::get('/admin', [AdminDashboardController::class, 'index']);