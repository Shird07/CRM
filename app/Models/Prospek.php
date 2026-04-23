<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Prospek extends Model
{
   public function sales()
    {
        return $this->belongsTo(User::class, 'sales_id');
    }

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function penawarans()
    {
        return $this->hasMany(Penawaran::class);
    }

    public function deal()
    {
        return $this->hasOne(Deal::class);
    } //

    protected $fillable = 
    [
        'nama',
        'no_hp',
        'produk',
        'sales_id'
    ];
}

