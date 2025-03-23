<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseItem extends Model
{
    protected $fillable = [
        'purchase_id',
        'product_size_id',
        'weight',
        'quantity',
        'unit_price',
        'total_price'
    ];
}
