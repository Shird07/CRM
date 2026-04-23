<?php

namespace App\Http\Controllers;
use App\Models\Deal;
use App\Models\Prospek;
use Illuminate\Http\Request;

class DealController extends Controller
{
    // 💾 simpan deal
    public function store(Request $request)
    {
        $request->validate([
            'prospek_id' => 'required',
            'status' => 'required'
        ]);

        Deal::updateOrCreate(
            ['prospek_id' => $request->prospek_id],
            [
                'status' => $request->status,
                'alasan' => $request->alasan
            ]
        );

        // update status prospek juga
        $prospek = Prospek::find($request->prospek_id);
        $prospek->update([
            'status' => $request->status === 'win' ? 'deal' : 'lose'
        ]);

        return back();
    }
}