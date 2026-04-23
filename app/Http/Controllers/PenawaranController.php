<?php

namespace App\Http\Controllers;
use App\Models\Penawaran;
use App\Models\Prospek;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenawaranController extends Controller
{
    // 📋 list penawaran per prospek
    public function index($prospekId)
    {
        $prospek = Prospek::with('penawarans')->findOrFail($prospekId);

        return Inertia::render('Sales/Penawaran/Index', [
            'prospek' => $prospek
        ]);
    }

    // ➕ form
    public function create($prospekId)
    {
        return Inertia::render('Sales/Penawaran/Create', [
            'prospek_id' => $prospekId
        ]);
    }

    // 💾 simpan
    public function store(Request $request)
    {
        $request->validate([
            'prospek_id' => 'required',
            'harga' => 'required|numeric',
            'status' => 'required',
        ]);

        Penawaran::create($request->all());

        return back();
    }

    // 🔄 update status (diterima / ditolak)
    public function updateStatus(Request $request, Penawaran $penawaran)
    {
        $penawaran->update([
            'status' => $request->status
        ]);

        return back();
    }
}