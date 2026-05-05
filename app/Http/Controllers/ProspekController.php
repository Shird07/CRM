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

        Prospek::create([
            'nama' => $request->nama,
            'no_hp' => $request->no_hp,
            'produk' => $request->produk,
            'sales_id' => auth()->id(),
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
        ->join('regions', 'regions.id', '=', 'prospeks.region_id')
        ->where('prospeks.id', $id)
        ->select('prospeks.*', 'regions.nama_region')
        ->first();

    // 🔹 ambil timeline aktivitas
    $activities = DB::table('activities as a')
        ->leftJoin('products as p', 'p.id', '=', 'a.product_id')
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