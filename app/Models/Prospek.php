<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prospek extends Model
{
    protected $fillable = [
        'nama', 'no_hp', 'produk',
        'sales_id', 'product_id', 'status',
    ];

    // ✅ Relasi ke User (sales)
    public function sales()
    {
        return $this->belongsTo(User::class, 'sales_id');
    }

    // ✅ Relasi ke Deal (hasOne karena 1 prospek = 1 deal)
    public function deal()
    {
        return $this->hasOne(Deal::class);
    }

    // ✅ Relasi ke Penawaran (hasMany)
    public function penawarans()
    {
        return $this->hasMany(Penawaran::class);
    }

    // ✅ Alias singular untuk eager load di controller
    public function penawaran()
    {
        return $this->hasMany(Penawaran::class);
    }

    // ✅ Relasi ke Product (jika tabel products sudah ada)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    
}