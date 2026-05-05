<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Product;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // =========================
        // 🔹 DATA PRODUK
        // =========================
        $products = Product::all();

        // =========================
        // 🔹 DATA SALES
        // =========================
        $sales = DB::table('users')
            ->where('role', 'sales')
            ->get();

        // =========================
        // 🔹 BASIC STATS
        // =========================
        $totalProspek = DB::table('prospeks')->count();

        $totalWin = DB::table('prospeks')
            ->where('status', 'win')
            ->count();

        $totalLose = DB::table('prospeks')
            ->where('status', 'lose')
            ->count();

        // =========================
        // 🔹 TOTAL REVENUE
        // =========================
        $totalRevenue = DB::table('activities')
            ->where('status', 'win')
            ->sum('harga');

        // =========================
        // 🔹 SALES TREND (30 hari)
        // =========================
        $trendDataRaw = DB::table('activities')
            ->selectRaw('DATE(tanggal) as date, COUNT(*) as total')
            ->where('status', 'win')
            ->where('tanggal', '>=', now()->subDays(30))
            ->groupBy('date')
            ->pluck('total', 'date');

        $salesTrendData = [];

        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $display = now()->subDays($i)->format('d M');

            $salesTrendData[] = [
                'date' => $display,
                'closing' => $trendDataRaw[$date] ?? 0,
            ];
        }

        // =========================
        // 🔹 TOP TOKO
        // =========================
        $topToko = DB::table('activities as a')
            ->join('prospeks as p', 'p.id', '=', 'a.prospek_id')
            ->select('p.nama', DB::raw('SUM(a.harga) as total'))
            ->where('a.status', 'win')
            ->groupBy('p.id', 'p.nama')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        // =========================
        // 🔹 TOP PRODUK
        // =========================
        $topProducts = DB::table('activities as a')
            ->join('products as pr', 'pr.id', '=', 'a.product_id')
            ->select('pr.brand', 'pr.type', DB::raw('COUNT(*) as total'))
            ->where('a.status', 'win')
            ->groupBy('pr.id', 'pr.brand', 'pr.type')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        // =========================
        // 🔥 FINAL RETURN (SATU SAJA!)
        // =========================
        return Inertia::render('Admin/Dashboard', [
            'totalProspek'   => $totalProspek,
            'totalWin'       => $totalWin,
            'totalLose'      => $totalLose,
            'totalRevenue'   => (int) $totalRevenue,
            'salesTrendData' => $salesTrendData,
            'topToko'        => $topToko,
            'topProducts'    => $topProducts,
            'allProducts'    => $products,
            'allSales'       => $sales,
        ]);
    }
}