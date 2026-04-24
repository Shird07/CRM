<?php

namespace App\Http\Controllers;

use App\Models\FollowUp;
use App\Models\Prospek;
use App\Models\Deal;
use Inertia\Inertia;

class SalesDashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();
        $today = now()->toDateString();

        // 🔔 reminder
        $reminders = FollowUp::with('prospek')
            ->whereDate('next_follow_up', $today)
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->get();

        // 📊 total prospek
        $totalProspek = Prospek::where('sales_id', $userId)->count();

        // ✅ deal win
        $totalWin = Deal::where('status', 'win')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->count();

        // ❌ deal lose
        $totalLose = Deal::where('status', 'lose')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->count();

        // 📈 conversion
        $conversion = $totalProspek > 0
            ? round(($totalWin / $totalProspek) * 100, 1)
            : 0;

        // 📊 chart
        $chart = Deal::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
            ->where('status', 'win')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->groupBy('bulan')
            ->pluck('total', 'bulan');

        // 🎯 SATU RETURN SAJA
        return Inertia::render('Sales/Dashboard', [
            'reminders' => $reminders,
            'totalProspek' => $totalProspek,
            'totalWin' => $totalWin,
            'totalLose' => $totalLose,
            'conversion' => $conversion,
            'chart' => $chart
        ]);
    }
}