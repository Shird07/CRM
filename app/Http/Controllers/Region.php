<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prospek extends Model
{
    protected $fillable = [
        'nama',
        'no_hp',
        'region_id',
        'product_id',
        'sales_id',
        'status',
        'kode_prospek',
    ];

    /*
    |--------------------------------------------------------------------------
    | SALES
    |--------------------------------------------------------------------------
    */

    public function sales()
    {
        return $this->belongsTo(User::class, 'sales_id');
    }

    /*
    |--------------------------------------------------------------------------
    | PRODUCT
    |--------------------------------------------------------------------------
    */

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /*
    |--------------------------------------------------------------------------
    | REGION
    |--------------------------------------------------------------------------
    */

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    /*
    |--------------------------------------------------------------------------
    | ACTIVITIES
    |--------------------------------------------------------------------------
    */

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    /*
    |--------------------------------------------------------------------------
    | FOLLOW UPS
    |--------------------------------------------------------------------------
    */

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    /*
    |--------------------------------------------------------------------------
    | PENAWARAN
    |--------------------------------------------------------------------------
    */

    public function penawarans()
    {
        return $this->hasMany(Penawaran::class);
    }

    /*
    |--------------------------------------------------------------------------
    | DEAL
    |--------------------------------------------------------------------------
    */

    public function deal()
    {
        return $this->hasOne(Deal::class);
    }
}