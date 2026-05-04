<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function store(Request $request)
    {
        DB::table('activities')->insert([
            'prospek_id' => $request->prospek_id,
            'product_id' => $request->product_id,
            'tanggal' => now(),
            'note' => $request->note,
            'harga' => $request->harga,
            'status' => $request->status,
            'kode_transaksi' => $request->status === 'win' ? 'TRX'.time() : null,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return back();
    }
}
