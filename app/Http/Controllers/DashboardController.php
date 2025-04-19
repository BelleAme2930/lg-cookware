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
use App\Modules\Sale\SaleWidget;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;
    protected SaleWidget $saleWidget;
    protected ProfitWidget $profitWidget;
    protected ExpenseWidget $expenseWidget;

    public function __construct(
        PurchaseWidget $purchaseWidget,
        SaleWidget $saleWidget,
        ProfitWidget $profitWidget,
        ExpenseWidget $expenseWidget,
    )
    {
        $this->purchaseWidget = $purchaseWidget;
        $this->saleWidget = $saleWidget;
        $this->profitWidget = $profitWidget;
        $this->expenseWidget = $expenseWidget;
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
        $quickStats = [
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


        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
            'profitStats' => $profitStats,
            'expenseStats' => $expenseStats,
            'quickStats' => $quickStats,
        ]);
    }
}
