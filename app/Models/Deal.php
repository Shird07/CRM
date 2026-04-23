<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    public function prospek()
    {
        return $this->belongsTo(Prospek::class);
    }
    protected $fillable = 
    [
    'prospek_id',
    'status',
    'alasan'
    ];
}
