<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Payment;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Supplier;
use App\Modules\Expense\ExpenseWidget;
use App\Modules\Profit\ProfitWidget;
use App\Modules\Purchase\PurchaseWidget;
use App\Modules\QuickStats\QuickStatsWidget;
use App\Modules\Sale\SaleWidget;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;
    protected SaleWidget $saleWidget;
    protected ProfitWidget $profitWidget;
    protected ExpenseWidget $expenseWidget;
    protected QuickStatsWidget $quickStatsWidget;


    public function __construct(
        PurchaseWidget $purchaseWidget,
        SaleWidget $saleWidget,
        ProfitWidget $profitWidget,
        ExpenseWidget $expenseWidget,
        QuickStatsWidget $quickStatsWidget,
    )
    {
        $this->purchaseWidget = $purchaseWidget;
        $this->saleWidget = $saleWidget;
        $this->profitWidget = $profitWidget;
        $this->expenseWidget = $expenseWidget;
        $this->quickStatsWidget = $quickStatsWidget;
    }

    public function index()
    {

        $purchaseStats = $this->purchaseWidget->getPurchaseStats();
        $saleStats = $this->saleWidget->getSaleStats();
        $profitStats = $this->profitWidget->getProfitStats();
        $expenseStats = $this->expenseWidget->getExpenseStats();
        $quickStats = $this->quickStatsWidget->getQuickStats();

        $today = Carbon::now('Asia/Karachi')->startOfDay();

        $todaysReceivables = Payment::with('payable.customer')
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

        $todaysPayables = Payment::with('payable.supplier')
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


        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
            'profitStats' => $profitStats,
            'expenseStats' => $expenseStats,
            'quickStats' => $quickStats,
            'todaysReceivables' => $todaysReceivables,
            'todaysPayables' => $todaysPayables,
        ]);
    }
}
