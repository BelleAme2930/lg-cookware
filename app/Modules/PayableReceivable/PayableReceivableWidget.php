<?php

namespace App\Modules\PayableReceivable;

use App\Models\Payment;
use App\Models\Purchase;
use App\Models\Sale;
use Illuminate\Support\Carbon;

class PayableReceivableWidget
{
    public function getTodaysReceivables()
    {
        $today = Carbon::now('Asia/Karachi')->startOfDay();

        return Payment::with('payable.customer')
            ->where('due_date', $today)
            ->whereHasMorph('payable', [Sale::class])
            ->where('remaining_balance', '>', 0)
            ->get()
            ->map(function ($payment) {
                return [
                    'Customer' => $payment->payable->customer->name ?? '-',
                    'Amount' => number_format($payment->amount) . ' Rs',
                    'Remaining' => number_format($payment->remaining_balance) . ' Rs',
                    'Date' => $payment->due_date->format('d M Y'),
                ];
            });
    }

    public function getTodaysPayables()
    {
        $today = Carbon::now('Asia/Karachi')->startOfDay();

        return Payment::with('payable.supplier')
            ->whereDate('due_date', $today)
            ->whereHasMorph('payable', [Purchase::class])
            ->where('remaining_balance', '>', 0)
            ->get()
            ->map(function ($payment) {
                return [
                    'Supplier' => $payment->payable->supplier->name ?? '-',
                    'Amount' => number_format($payment->amount) . ' Rs',
                    'Remaining' => number_format($payment->remaining_balance) . ' Rs',
                    'Date' => $payment->due_date->format('d M Y'),
                ];
            });
    }
}
