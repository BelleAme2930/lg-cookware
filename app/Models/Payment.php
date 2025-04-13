<?php

namespace App\Models;

use App\Enums\PaymentMethodEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'method',
        'amount',
        'payment_date',
        'notes',
        'due_date',
        'remaining_balance',
        'account_id',
        'cheque_number',
        'bank_name',
    ];

    protected $casts = [
        'method' => PaymentMethodEnum::class,
        'payment_date' => 'date',
        'due_date' => 'date',
    ];

    public function payable()
    {
        return $this->morphTo();
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function isFullyPaid(): bool
    {
        if ($this->method === PaymentMethodEnum::CREDIT) {
            return $this->remaining_balance <= 0;
        }

        return true;
    }

    public function isDue(): bool
    {
        if ($this->method === PaymentMethodEnum::CREDIT && $this->due_date) {
            return $this->due_date->isPast() && $this->remaining_balance > 0;
        }

        return false;
    }
}
