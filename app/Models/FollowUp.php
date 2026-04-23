<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    public function prospek()
    {
        return $this->belongsTo(Prospek::class);
    }
    protected $fillable = 
    [
    'prospek_id',
    'tanggal',
    'catatan',
    'status',
    'next_follow_up'
    ];

}
