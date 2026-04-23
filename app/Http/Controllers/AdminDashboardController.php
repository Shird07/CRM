<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Prospek;
use App\Models\Deal;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // semua sales
        $sales = User::where('role', 'sales')->get();

        // statistik global
        $totalProspek = Prospek::count();
        $totalWin = Deal::where('status', 'win')->count();
        $totalLose = Deal::where('status', 'lose')->count();

        // ranking sales
        $ranking = User::where('role', 'sales')
            ->withCount([
                'prospeks',
                'prospeks as win_count' => function ($q) {
                    $q->whereHas('deal', fn($d) => $d->where('status', 'win'));
                }
            ])
            ->orderByDesc('win_count')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'sales' => $sales,
            'totalProspek' => $totalProspek,
            'totalWin' => $totalWin,
            'totalLose' => $totalLose,
            'ranking' => $ranking
        ]);
    }
} 
