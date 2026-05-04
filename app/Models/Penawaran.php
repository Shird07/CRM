<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penawaran extends Model
{
    protected $fillable = ['prospek_id', 'harga', 'catatan', 'status'];

    // ✅ Relasi ke Prospek
    public function prospek()
    {
        return $this->belongsTo(Prospek::class);
    }
}