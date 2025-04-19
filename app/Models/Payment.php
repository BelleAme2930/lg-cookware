<?php

namespace App\Models;

use App\Enums\PaymentMethodEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

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

    public function payable(): MorphTo
    {
        return $this->morphTo();
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
