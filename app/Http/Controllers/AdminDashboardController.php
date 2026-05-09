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
        // 🔹 DATA PROSPEK
        // =========================
        $latestActivitySub = DB::table('activities as la')
            ->select('la.prospek_id', DB::raw('MAX(la.id) as latest_activity_id'))
            ->groupBy('la.prospek_id');

        $prospeksRaw = DB::table('prospeks as p')
            ->leftJoin('regions as r', 'r.id', '=', 'p.region_id')
            ->leftJoin('users as u', 'u.id', '=', 'p.sales_id')
            ->leftJoin('deals as d', 'd.prospek_id', '=', 'p.id')
            ->leftJoin('customers as c', 'c.id', '=', 'p.customer_id')
            ->leftJoinSub($latestActivitySub, 'lat', function ($join) {
                $join->on('lat.prospek_id', '=', 'p.id');
            })
            ->leftJoin('activities as a', 'a.id', '=', 'lat.latest_activity_id')
            ->leftJoin('products as pr', 'pr.id', '=', 'a.product_id')
            ->select(
                'p.id',
                'p.nama as prospek_nama',
                'p.no_hp',
                'p.status',
                'p.created_at',
                'r.nama_region',
                'u.name as sales_name',
                'u.kode_sales',
                'd.status as deal_status',
                'd.value as deal_value',
                'c.id as customer_id',
                'c.nama as customer_nama',
                'a.kode_transaksi',
                'a.harga as agreed_price',
                'a.status as activity_status',
                'a.tanggal as activity_date',
                'pr.brand as product_brand',
                'pr.type as product_type'
            )
            ->orderByDesc('p.id')
            ->get();

        $prospeks = $prospeksRaw->map(function ($item) {
            $status = $item->activity_status ?? $item->deal_status ?? $item->status ?? 'lead';
            $agreedPrice = (int) ($item->agreed_price ?? $item->deal_value ?? 0);

            return [
                'id' => (int) $item->id,
                'nama' => $item->customer_nama ?? $item->prospek_nama,
                'no_hp' => $item->no_hp,
                'status' => $status,
                'created_at' => $item->activity_date ?? $item->created_at,
                'nama_region' => $item->nama_region,
                'kode_transaksi' => $item->kode_transaksi,
                'harga_disepakati' => $agreedPrice,
                'produk' => trim(($item->product_brand ?? '') . ' ' . ($item->product_type ?? '')),
                'customer' => [
                    'id' => $item->customer_id ? (int) $item->customer_id : null,
                    'name' => $item->customer_nama ?? $item->prospek_nama,
                ],
                'sales' => [
                    'name' => $item->sales_name ?? 'Unknown',
                    'code' => $item->kode_sales ?? null,
                ],
                'deal' => [
                    'status' => $status,
                    'value' => $agreedPrice,
                ],
            ];
        });

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
        $trendProspekRaw = DB::table('prospeks')
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->pluck('total', 'date');

        $trendClosingRaw = DB::table('activities')
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
                'masuk' => (int) ($trendProspekRaw[$date] ?? 0),
                'closing' => (int) ($trendClosingRaw[$date] ?? 0),
            ];
        }

        // =========================
        // 🔹 TOP TOKO
        // =========================
        $topToko = DB::table('activities as a')
            ->join('prospeks as p', 'p.id', '=', 'a.prospek_id')
            ->select(
                'p.nama',
                DB::raw('SUM(a.harga) as total')
            )
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
            ->select(
                'pr.id',
                'pr.brand',
                'pr.type',
                DB::raw('COUNT(*) as sales_count'),
                DB::raw('SUM(a.harga) as total')
            )
            ->where('a.status', 'win')
            ->groupBy('pr.id', 'pr.brand', 'pr.type')
            ->orderByDesc('total')
            ->take(5)
            ->get();

        // =========================
        // 🔹 RANKING SALES (fallback dari top toko)
        // =========================
        $ranking = $topToko->map(function ($item, $index) {
            return [
                'id' => $index + 1,
                'name' => $item->nama,
                'revenue' => (int) $item->total,
            ];
        });

        // =========================
        // 🔹 LOW STOCK ITEMS
        // =========================
        $lowStockItems = DB::table('products')
            ->select(
                'id',
                DB::raw("CONCAT(COALESCE(brand, ''), ' ', COALESCE(type, '')) as name"),
                'stock'
            )
            ->where('stock', '<=', 10)
            ->orderBy('stock')
            ->take(5)
            ->get();

        // =========================
        // 🔹 DATA WILAYAH
        // =========================
        $storesRaw = DB::table('regions as r')
            ->leftJoin('prospeks as p', 'p.region_id', '=', 'r.id')
            ->leftJoin('activities as a', function ($join) {
                $join->on('a.prospek_id', '=', 'p.id')
                    ->where('a.status', '=', 'win');
            })
            ->select(
                'r.id',
                'r.kode_region',
                DB::raw("COALESCE(r.nama_region, CONCAT('Region ', r.id)) as region"),
                DB::raw("COALESCE(COUNT(DISTINCT p.id), 0) as total_prospek"),
                DB::raw("COALESCE(SUM(a.harga), 0) as current")
            )
            ->groupBy('r.id', 'r.kode_region', 'r.nama_region')
            ->orderBy('r.id')
            ->get();

        $stores = $storesRaw->map(function ($row) {
            $target = max((int) $row->total_prospek * 10000000, 50000000);
            $current = (int) $row->current;
            $pct = $target > 0 ? round(($current / $target) * 100) : 0;

            if ($pct >= 100) {
                $status = 'Achieved';
            } elseif ($pct >= 70) {
                $status = 'On Track';
            } else {
                $status = 'Below Target';
            }

            return [
                'id' => (int) $row->id,
                'code' => $row->kode_region ?: ('REG-' . str_pad((string) $row->id, 3, '0', STR_PAD_LEFT)),
                'region' => $row->region,
                'name' => $row->region,
                'target' => $target,
                'current' => $current,
                'status' => $status,
            ];
        });

        // =========================
        // 🔥 FINAL RETURN
        // =========================
        return Inertia::render('Admin/Dashboard', [
            // Dashboard Stats
            'totalProspek'   => $totalProspek,
            'totalWin'       => $totalWin,
            'totalLose'      => $totalLose,
            'totalRevenue'   => (int) $totalRevenue,
            'salesTrendData' => $salesTrendData,
            'topToko'        => $topToko,
            'topProducts'    => $topProducts,
            'ranking'        => $ranking,
            'lowStockItems'  => $lowStockItems,

            // Master Data
            'allProducts'    => $products,
            'allSales'       => $sales,
            'allProspeks'    => $prospeks,
            'stores'         => $stores,
        ]);
    }

    public function salesDetail($id)
    {
        $sales = DB::table('users as u')
            ->leftJoin('regions as r', 'r.id', '=', 'u.region_id')
            ->where('u.id', $id)
            ->where('u.role', 'sales')
            ->select(
                'u.id',
                'u.name',
                'u.email',
                'u.role',
                'u.status',
                'u.kode_sales',
                'u.region_id',
                'r.nama_region',
                'r.kode_region',
                'u.created_at'
            )
            ->first();

        abort_if(!$sales, 404);

        $activitySummary = DB::table('prospeks as p')
            ->leftJoin('activities as a', 'a.prospek_id', '=', 'p.id')
            ->where('p.sales_id', $id)
            ->selectRaw('COUNT(DISTINCT p.id) as total_prospeks')
            ->selectRaw('COUNT(a.id) as total_aktivitas')
            ->selectRaw("SUM(CASE WHEN a.status IN ('negosiasi','deal','win','lose') THEN 1 ELSE 0 END) as total_penawaran")
            ->selectRaw("SUM(CASE WHEN a.status = 'win' THEN 1 ELSE 0 END) as total_win")
            ->first();

        return Inertia::render('Admin/DetailSales', [
            'sales' => $sales,
            'activitySummary' => [
                'totalProspeks' => (int) ($activitySummary->total_prospeks ?? 0),
                'totalAktivitas' => (int) ($activitySummary->total_aktivitas ?? 0),
                'totalPenawaran' => (int) ($activitySummary->total_penawaran ?? 0),
                'totalWin' => (int) ($activitySummary->total_win ?? 0),
            ],
        ]);
    }
}