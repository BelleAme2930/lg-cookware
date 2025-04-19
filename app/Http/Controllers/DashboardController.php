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

        $today = Carbon::today();

        $todaysReceivablesQuery = Payment::whereDate('payment_date', $today)
            ->whereHasMorph('payable', [Sale::class]);

        $todaysPayablesQuery = Payment::whereDate('payment_date', $today)
            ->whereHasMorph('payable', [Purchase::class]);

        $customersWithPendingReceivables = Payment::where('remaining_balance', '>', 0)
            ->whereHasMorph('payable', [Sale::class], function ($query) {
                $query->select('customer_id');
            })
            ->get()
            ->pluck('payable.customer_id')
            ->unique()
            ->count();

        $suppliersWithPendingPayables = Payment::where('remaining_balance', '>', 0)
            ->whereHasMorph('payable', [Purchase::class], function ($query) {
                $query->select('supplier_id');
            })
            ->get()
            ->pluck('payable.supplier_id')
            ->unique()
            ->count();

        $purchaseStats = $this->purchaseWidget->getPurchaseStats();
        $saleStats = $this->saleWidget->getSaleStats();
        $profitStats = $this->profitWidget->getProfitStats();
        $expenseStats = $this->expenseWidget->getExpenseStats();
        $quickStats = $this->quickStatsWidget->getQuickStats();


        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
            'profitStats' => $profitStats,
            'expenseStats' => $expenseStats,
            'quickStats' => $quickStats,
        ]);
    }
}
