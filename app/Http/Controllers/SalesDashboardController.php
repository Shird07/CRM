<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Prospek;
use Inertia\Inertia;

class SalesDashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        /**
         * Total Prospek
         */
        $totalProspek = Prospek::where('sales_id', $userId)->count();

        /**
         * Total Win
         */
        $totalWin = Activity::where('status', 'win')
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->count();

        /**
         * Total Lose
         */
        $totalLose = Activity::where('status', 'lose')
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->count();

        /**
         * Total Revenue
         */
        $totalRevenue = Activity::where('status', 'win')
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->sum('harga');

        /**
         * Conversion Rate
         */
        $conversion = $totalProspek > 0
            ? round(($totalWin / $totalProspek) * 100, 1)
            : 0;

        /**
         * Reminder Follow Up
         */
        $reminders = Activity::with(['prospek', 'product'])
            ->whereNotNull('next_follow_up')
            ->whereDate('next_follow_up', '<=', today())
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->latest()
            ->take(5)
            ->get();

        /**
         * Chart Closing Bulanan
         */
        $chart = Activity::selectRaw('MONTH(tanggal) as bulan, COUNT(*) as total')
            ->where('status', 'win')
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->groupBy('bulan')
            ->pluck('total', 'bulan');

        /**
         * Aktivitas Terbaru
         */
        $latestActivities = Activity::with(['prospek', 'product'])
            ->whereHas('prospek', function ($q) use ($userId) {
                $q->where('sales_id', $userId);
            })
            ->latest()
            ->take(5)
            ->get();

        /**
         * Prospek Terbaru
         */
        $latestProspeks = Prospek::with(['product', 'region'])
            ->where('sales_id', $userId)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Sales/Dashboard', [
            'totalProspek' => $totalProspek,
            'totalWin' => $totalWin,
            'totalLose' => $totalLose,
            'totalRevenue' => $totalRevenue,
            'conversion' => $conversion,
            'reminders' => $reminders,
            'chart' => $chart,
            'latestActivities' => $latestActivities,
            'latestProspeks' => $latestProspeks,
        ]);
    }
}