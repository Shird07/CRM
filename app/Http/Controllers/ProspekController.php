<?php

use App\Models\Prospek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class ProspekController extends Controller
{
    // tampil semua prospek (sales)
    public function index()
    {
        $prospeks = Prospek::where('sales_id', auth()->id())->latest()->get();

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
        ]);

        return redirect('/sales/prospeks');
    }

    //edit
    public function edit(Prospek $prospek)
    {
        return Inertia::render('Sales/Prospek/Edit', [
            'prospek' => $prospek
        ]);
    }

    //update
    public function update(Request $request, Prospek $prospek)
    {
        $prospek->update($request->all());

        return redirect('/sales/prospeks');
    }

    //delete
    public function destroy(Prospek $prospek)
    {
        $prospek->delete();

        return back();
    }
}

