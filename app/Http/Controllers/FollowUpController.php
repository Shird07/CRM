<?php

use App\Models\FollowUp;
use App\Models\Prospek;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
class FollowUpController extends Controller
{
    //list follow up berdasarkan prospek
    public function index($prospekId)
    {
        $prospek = Prospek::with('followUps')->findOrFail($prospekId);

        return Inertia::render('Sales/FollowUp/Index', [
            'prospek' => $prospek
        ]);
    }

    //form tambah
    public function create($prospekId)
    {
        return Inertia::render('Sales/FollowUp/Create', [
            'prospek_id' => $prospekId
        ]);
    }

    // simpan
    public function store(Request $request)
    {
        $request->validate([
            'prospek_id' => 'required',
            'tanggal' => 'required|date',
            'catatan' => 'required',
            'status' => 'required',
        ]);

        FollowUp::create($request->all());

        return back();
    }
}