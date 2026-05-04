<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\SalesDashboardController;
use App\Http\Controllers\ProspekController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\ActivityController;

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
| DASHBOARD REDIRECT (ROLE BASED)
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    $user = Auth::user();

    if ($user->role === 'admin') {
        return redirect('/admin');
    }

    return redirect('/sales');

})->middleware(['auth'])->name('dashboard');


/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:admin'])->group(function () {

    Route::get('/admin', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

});


/*
|--------------------------------------------------------------------------
| SALES
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'role:sales'])->group(function () {

    Route::get('/sales', [SalesDashboardController::class, 'index'])
        ->name('sales.dashboard');

    /*
    |-----------------------------------
    | PROSPEK (CRUD)
    |-----------------------------------
    */

    Route::get('/sales/prospeks', [ProspekController::class, 'index']);
    Route::get('/sales/prospeks/create', [ProspekController::class, 'create']);
    Route::post('/sales/prospeks', [ProspekController::class, 'store']);
    Route::get('/sales/prospeks/{prospek}/edit', [ProspekController::class, 'edit']);
    Route::put('/sales/prospeks/{prospek}', [ProspekController::class, 'update']);
    Route::delete('/sales/prospeks/{prospek}', [ProspekController::class, 'destroy']);

    /*
    |-----------------------------------
    | PIPELINE STAGE
    |-----------------------------------
    */

    Route::post('/sales/prospek/{id}/stage', [ProspekController::class, 'updateStage']);

});


/*
|--------------------------------------------------------------------------
| PROFILE
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/activities', [ActivityController::class, 'store']);
Route::get('/prospeks/{id}', [ProspekController::class, 'show']);
/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

require __DIR__.'/auth.php';