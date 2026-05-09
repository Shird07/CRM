<?php

namespace App\Http\Controllers;

use App\Models\Prospek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class ProspekController extends Controller
{
    // tampil semua prospek (sales)
    public function index()
    {
        $prospeks = Prospek::where('sales_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Sales/Prospek/Index', [
            'prospeks' => $prospeks
        ]);
    }

    // form create
    public function create()
    {
        return Inertia::render('Sales/Prospek/Create');
    }

    // simpan data
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'no_hp' => 'required',
            'produk' => 'required',
        ]);

        $customer = DB::table('customers')
            ->where('nama', $request->nama)
            ->where('no_hp', $request->no_hp)
            ->first();

        if (!$customer) {
            $customerId = DB::table('customers')->insertGetId([
                'nama' => $request->nama,
                'no_hp' => $request->no_hp,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('customers')
                ->where('id', $customerId)
                ->update([
                    'kode_customer' => 'CUST-' . str_pad((string) $customerId, 3, '0', STR_PAD_LEFT),
                    'updated_at' => now(),
                ]);
        } else {
            $customerId = $customer->id;
        }

        Prospek::create([
            'nama' => $request->nama,
            'no_hp' => $request->no_hp,
            'produk' => $request->produk,
            'sales_id' => auth()->id(),
            'customer_id' => $customerId,
            'stage' => 'lead'
        ]);

        return redirect('/sales/prospeks');
    }

    // 🔥 UPDATE STAGE (PENTING BUAT PIPELINE)
    public function updateStage(Request $request, $id)
    {
        $prospek = Prospek::findOrFail($id);

        $prospek->update([
            'stage' => $request->stage
        ]);

        return back();
    }

    // edit
    public function edit(Prospek $prospek)
    {
        return Inertia::render('Sales/Prospek/Edit', [
            'prospek' => $prospek
        ]);
    }

    // update
    public function update(Request $request, Prospek $prospek)
    {
        $prospek->update($request->all());

        return redirect('/sales/prospeks');
    }

    // delete
    public function destroy(Prospek $prospek)
    {
        $prospek->delete();

        return back();
    }

    public function show($id)
{
    // 🔹 ambil data prospek (customer)
    $prospek = DB::table('prospeks')
        ->leftJoin('regions', 'regions.id', '=', 'prospeks.region_id')
        ->leftJoin('users', 'users.id', '=', 'prospeks.sales_id')
        ->leftJoin('customers', 'customers.id', '=', 'prospeks.customer_id')
        ->where('prospeks.id', $id)
        ->select(
            'prospeks.*',
            'regions.nama_region',
            'users.name as sales_name',
            'users.kode_sales',
            DB::raw('COALESCE(customers.nama, prospeks.nama) as customer_name')
        )
        ->first();

    // 🔹 ambil timeline aktivitas
    $activities = DB::table('activities as a')
        ->leftJoin('products as p', 'p.id', '=', 'a.product_id')
        ->where('a.prospek_id', $id)
        ->select(
            'a.*',
            'p.brand',
            'p.type',
            DB::raw("CONCAT('Pada tanggal ', DATE_FORMAT(a.tanggal, '%d-%m-%Y'), ' terjadi kesepakatan di harga ', FORMAT(COALESCE(a.harga,0), 0), ' dengan status ', UPPER(COALESCE(a.status, '-'))) as activity_summary")
        )
        ->orderBy('tanggal', 'desc')
        ->get();

    $activitySummary = DB::table('activities')
        ->where('prospek_id', $id)
        ->selectRaw('COUNT(*) as total_activities')
        ->selectRaw("SUM(CASE WHEN status IN ('negosiasi','deal','win','lose') THEN 1 ELSE 0 END) as total_penawaran")
        ->selectRaw("SUM(CASE WHEN status = 'follow_up' THEN 1 ELSE 0 END) as total_follow_up")
        ->selectRaw("SUM(CASE WHEN status = 'win' THEN 1 ELSE 0 END) as total_win")
        ->first();

    return Inertia::render('Admin/DetailProspek', [
        'prospek' => $prospek,
        'activities' => $activities,
        'activitySummary' => [
            'totalActivities' => (int) ($activitySummary->total_activities ?? 0),
            'totalPenawaran' => (int) ($activitySummary->total_penawaran ?? 0),
            'totalFollowUp' => (int) ($activitySummary->total_follow_up ?? 0),
            'totalWin' => (int) ($activitySummary->total_win ?? 0),
        ],
    ]);

    
}
}