<?php

namespace App\Modules\QuickStats;

use App\Models\Customer;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Supplier;
use Illuminate\Support\Carbon;

class QuickStatsWidget
{
    public function getQuickStats(): array
    {
        $today = Carbon::today();

        $todaysReceivablesQuery = Payment::whereDate('payment_date', $today)
            ->whereHasMorph('payable', [Sale::class]);

        $todaysPayablesQuery = Payment::whereDate('payment_date', $today)
            ->whereHasMorph('payable', [Purchase::class]);

        return [
            'customers' => Customer::count(),
            'products' => Product::count(),
            'suppliers' => Supplier::count(),
            'pendingPayments' => number_format(Payment::where('remaining_balance', '>', 0)->sum('remaining_balance')),
            'totalSales' => Sale::count(),
            'totalPurchases' => Purchase::count(),
            'todaysReceivables' => [
                'count' => $todaysReceivablesQuery->count(),
                'amount' => $todaysReceivablesQuery->sum('amount'),
                'uniqueCustomers' => Payment::whereDate('payment_date', $today)
                    ->whereHasMorph('payable', [Sale::class])
                    ->get()
                    ->pluck('payable.customer_id')
                    ->unique()
                    ->count(),
            ],
            'todaysPayables' => [
                'count' => $todaysPayablesQuery->count(),
                'amount' => $todaysPayablesQuery->sum('amount'),
                'uniqueSuppliers' => Payment::whereDate('payment_date', $today)
                    ->whereHasMorph('payable', [Purchase::class])
                    ->get()
                    ->pluck('payable.supplier_id')
                    ->unique()
                    ->count(),
            ],
        ];
    }
}
