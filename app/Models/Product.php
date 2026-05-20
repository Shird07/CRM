<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'idProduk';

    protected $fillable = [
        'brand',
        'type',
        'price',
        'stock',
    ];

    /**
     * Relasi ke prospeks
     */
    public function prospeks()
    {
        return $this->hasMany(Prospek::class);
    }

    /**
     * Relasi ke activities
     */
    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}