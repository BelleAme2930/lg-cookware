<?php

namespace App\Http\Controllers;

use App\Modules\Expense\ExpenseWidget;
use App\Modules\Inventory\InventoryStatusWidget;
use App\Modules\PayableReceivable\PayableReceivableWidget;
use App\Modules\Profit\ProfitWidget;
use App\Modules\Purchase\PurchaseWidget;
use App\Modules\QuickStats\QuickStatsWidget;
use App\Modules\Sale\SaleWidget;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;
    protected SaleWidget $saleWidget;
    protected ProfitWidget $profitWidget;
    protected ExpenseWidget $expenseWidget;
    protected QuickStatsWidget $quickStatsWidget;
    protected PayableReceivableWidget $payableReceivableWidget;
    protected InventoryStatusWidget $inventoryStatusWidget;

    public function __construct(
        PurchaseWidget $purchaseWidget,
        SaleWidget $saleWidget,
        ProfitWidget $profitWidget,
        ExpenseWidget $expenseWidget,
        QuickStatsWidget $quickStatsWidget,
        PayableReceivableWidget $payableReceivableWidget,
        InventoryStatusWidget $inventoryStatusWidget,
    )
    {
        $this->purchaseWidget = $purchaseWidget;
        $this->saleWidget = $saleWidget;
        $this->profitWidget = $profitWidget;
        $this->expenseWidget = $expenseWidget;
        $this->quickStatsWidget = $quickStatsWidget;
        $this->payableReceivableWidget = $payableReceivableWidget;
        $this->inventoryStatusWidget = $inventoryStatusWidget;
    }

    public function index()
    {

        $purchaseStats = $this->purchaseWidget->getPurchaseStats();
        $saleStats = $this->saleWidget->getSaleStats();
        $profitStats = $this->profitWidget->getProfitStats();
        $expenseStats = $this->expenseWidget->getExpenseStats();
        $quickStats = $this->quickStatsWidget->getQuickStats();
        $todaysReceivables = $this->payableReceivableWidget->getTodaysReceivables();
        $todaysPayables = $this->payableReceivableWidget->getTodaysPayables();
        $inventoryStats = $this->inventoryStatusWidget->getInventoryStats();

        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
            'profitStats' => $profitStats,
            'expenseStats' => $expenseStats,
            'quickStats' => $quickStats,
            'todaysReceivables' => $todaysReceivables,
            'todaysPayables' => $todaysPayables,
            'inventoryStats' => $inventoryStats,
        ]);
    }
}
