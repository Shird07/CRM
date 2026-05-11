<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'prospek_id',
        'product_id',
        'tanggal',
        'next_follow_up',
        'note',
        'harga',
        'status',
        'kode_transaksi',
    ];

    /**
     * Relasi ke prospek
     */
    public function prospek()
    {
        return $this->belongsTo(Prospek::class);
    }

    /**
     * Relasi ke produk
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}