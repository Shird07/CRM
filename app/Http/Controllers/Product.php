<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'brand',
        'type',
        'price',
        'stock',
    ];

    public function prospeks()
    {
        return $this->hasMany(Prospek::class);
    }
}