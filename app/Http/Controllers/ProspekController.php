<?php

namespace App\Http\Controllers;

use App\Models\Prospek;
use App\Models\Product;
use App\Models\Region;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProspekController extends Controller
{
    public function index()
    {
        $prospeks = Prospek::with([
            'product',
            'region',
            'sales'
        ])
        ->where('sales_id', auth()->id())
        ->latest()
        ->get();

        return Inertia::render('Sales/Prospek/Index', [
            'prospeks' => $prospeks
        ]);
    }

    public function create()
    {
        return Inertia::render('Sales/Prospek/Create', [
            'products' => Product::all(),
            'regions' => Region::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required',
            'no_hp' => 'required',
            'region_id' => 'required',
            'product_id' => 'required',
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
            'region_id' => $request->region_id,
            'product_id' => $request->product_id,

            'jenis_customer' => $request->jenis_customer,
            'email' => $request->email,
            'alamat' => $request->alamat,
            'catatan' => $request->catatan,

            'sales_id' => auth()->id(),
            'stage' => 'lead'
        ]);

        return redirect('/sales/prospek');
    }

    public function show($id)
    {
        $prospek = Prospek::with([
            'product',
            'region',
            'activities',
        ])
        ->where('sales_id', auth()->id())
        ->findOrFail($id);

        return Inertia::render('Sales/Prospek/Show', [
            'prospek' => $prospek,
        ]);
    }

    public function edit(Prospek $prospek)
    {
        if ($prospek->sales_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Sales/Prospek/Edit', [
            'prospek' => $prospek,
            'products' => Product::all(),
            'regions' => Region::all(),
        ]);
    }

    public function update(Request $request, Prospek $prospek)
    {
        if ($prospek->sales_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'nama' => 'required',
            'no_hp' => 'required',
            'region_id' => 'required',
            'product_id' => 'required',
            'status' => 'required',
        ]);

        $prospek->update([
            'nama' => $request->nama,
            'no_hp' => $request->no_hp,
            'jenis_customer' => $request->jenis_customer,
            'email' => $request->email,
            'alamat' => $request->alamat,
            'catatan' => $request->catatan,
            'region_id' => $request->region_id,
            'product_id' => $request->product_id,
            'status' => $request->status,
        ]);

        return redirect('/sales/prospek');
    }

    public function destroy(Prospek $prospek)
    {
        if ($prospek->sales_id !== auth()->id()) {
            abort(403);
        }

        $prospek->delete();

        return back();
    }

    public function showAdmin($id)
{
    // 🔹 ambil data prospek (customer)
    $prospek = DB::table('prospeks')
        ->join('regions', 'regions.idRegion', '=', 'prospeks.region_id')
        ->where('prospeks.idProspek', $id)
        ->select('prospeks.*', 'regions.nama_region')
        ->first();

    // 🔹 ambil timeline aktivitas
    $activities = DB::table('activities as a')
        ->leftJoin('products as p', 'p.idProduk', '=', 'a.product_id')
        ->where('a.prospek_id', $id)
        ->select('a.*', 'p.brand', 'p.type')
        ->orderBy('tanggal', 'desc')
        ->get();

    return Inertia::render('Admin/DetailProspek', [
        'prospek' => $prospek,
        'activities' => $activities
    ]);

    
}
}