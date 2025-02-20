<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $fillable = ['name', 'description', 'amount', 'expense_date', 'paid_date'];
}
