<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Sale extends Model
{
    protected $fillable = [
        'customer_id',
        'sale_date',
        'notes',
        'total_amount',
    ];

    protected function casts(): array
    {
        return [
            'sale_date' => 'date',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(SaleItem::class);
    }

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

    public function isFullyPaid(): bool
    {
        $totalPaid = $this->payments->sum('amount');
        return $totalPaid >= $this->total_amount;
    }

    public function getRemainingBalance(): float
    {
        $totalPaid = $this->payments->sum('amount');
        return max(0, $this->total_amount - $totalPaid);
    }

    public function getPaymentStatus(): string
    {
        if ($this->isFullyPaid()) {
            return 'Paid';
        }

        $hasCreditPayment = $this->payments->contains(function ($payment) {
            return $payment->method->value === 'credit';
        });

        if ($hasCreditPayment) {
            return 'Credit';
        }

        return 'Partial';
    }
}
