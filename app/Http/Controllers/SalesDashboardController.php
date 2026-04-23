<?php

use App\Models\FollowUp;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class SalesDashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        $reminders = FollowUp::with('prospek')
            ->whereDate('next_follow_up', $today)
            ->whereHas('prospek', function ($q) {
                $q->where('sales_id', auth()->id());
            })
            ->get();

        return Inertia::render('Sales/Dashboard', [
            'reminders' => $reminders
        ]);
        $userId = auth()->id();

        // total prospek
        $totalProspek = Prospek::where('sales_id', $userId)->count();

        // deal win
        $totalWin = Deal::where('status', 'win')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->count();

        // deal lose
        $totalLose = Deal::where('status', 'lose')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->count();

        // conversion rate
        $conversion = $totalProspek > 0
            ? round(($totalWin / $totalProspek) * 100, 1)
            : 0;

        // data chart (per bulan)
        $chart = Deal::selectRaw('MONTH(created_at) as bulan, COUNT(*) as total')
            ->where('status', 'win')
            ->whereHas('prospek', fn($q) => $q->where('sales_id', $userId))
            ->groupBy('bulan')
            ->pluck('total', 'bulan');

        return Inertia::render('Sales/Dashboard', [
            'totalProspek' => $totalProspek,
            'totalWin' => $totalWin,
            'totalLose' => $totalLose,
            'conversion' => $conversion,
            'chart' => $chart
        ]);
    
    }
}