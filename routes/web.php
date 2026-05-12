<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\SalesDashboardController;
use App\Http\Controllers\ProspekController;
use App\Http\Controllers\ActivityController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

/*
|--------------------------------------------------------------------------
| DASHBOARD REDIRECT
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {

    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('sales.dashboard');

})->middleware(['auth'])->name('dashboard');

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/admin', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');
    Route::get('/admin/sales/{id}', [AdminDashboardController::class, 'salesDetail'])
        ->name('admin.sales.detail');
    Route::get('/admin/prospek/{id}', [ProspekController::class, 'showAdmin'])
        ->name('admin.prospek.detail');

});

/*
|--------------------------------------------------------------------------
| SALES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:sales'])->prefix('sales')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get('/', [SalesDashboardController::class, 'index'])
        ->name('sales.dashboard');

    /*
    |--------------------------------------------------------------------------
    | PROSPEK
    |--------------------------------------------------------------------------
    */

    Route::get('/prospek', [ProspekController::class, 'index'])
        ->name('sales.prospek.index');

    Route::get('/prospek/create', [ProspekController::class, 'create'])
        ->name('sales.prospek.create');

    Route::post('/prospek', [ProspekController::class, 'store'])
        ->name('sales.prospek.store');

    Route::get('/prospek/{prospek}', [ProspekController::class, 'show'])
        ->name('sales.prospek.show');

    Route::get('/prospek/{prospek}/edit', [ProspekController::class, 'edit'])
        ->name('sales.prospek.edit');

    Route::put('/prospek/{prospek}', [ProspekController::class, 'update'])
        ->name('sales.prospek.update');

    Route::delete('/prospek/{prospek}', [ProspekController::class, 'destroy'])
        ->name('sales.prospek.destroy');

    /*
    |--------------------------------------------------------------------------
    | UPDATE STAGE
    |--------------------------------------------------------------------------
    */

    Route::post('/prospek/{id}/stage', [ProspekController::class, 'updateStage'])
        ->name('sales.prospek.stage');

    /*
    |--------------------------------------------------------------------------
    | ACTIVITIES
    |--------------------------------------------------------------------------
    */

    Route::get('/activities', function () {
        return Inertia::render('Sales/Activities');
    })->name('sales.activities');

    /*
    |--------------------------------------------------------------------------
    | FOLLOW UP
    |--------------------------------------------------------------------------
    */

    Route::get('/followup', function () {
        return Inertia::render('Sales/FollowUp/index');
    })->name('sales.followup');

    Route::get('/followup/create', function () {
        return Inertia::render('Sales/FollowUp/create');
    })->name('sales.followup.create');

});

/*
|--------------------------------------------------------------------------
| ACTIVITY STORE
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {

    Route::post('/activities', [ActivityController::class, 'store'])
        ->name('activities.store');

});

/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

});

/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

require __DIR__ . '/auth.php';