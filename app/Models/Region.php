<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = [
        'nama_region',
    ];

    /**
     * Relasi ke prospeks
     */
    public function prospeks()
    {
        return $this->hasMany(Prospek::class);
    }
}