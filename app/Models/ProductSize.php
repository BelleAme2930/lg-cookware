<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    protected $fillable = [
        'product_id',
        'name',
        'purchase_price',
        'sale_price',
        'weight',
        'quantity',
    ];
}
