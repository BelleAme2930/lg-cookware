<?php

namespace App\Http\Controllers;

use App\Modules\Profit\ProfitWidget;
use App\Modules\Purchase\PurchaseWidget;
use App\Modules\Sale\SaleWidget;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;
    protected SaleWidget $saleWidget;
    protected ProfitWidget $profitWidget;

    public function __construct(
        PurchaseWidget $purchaseWidget,
        SaleWidget $saleWidget,
        ProfitWidget $profitWidget
    )
    {
        $this->purchaseWidget = $purchaseWidget;
        $this->saleWidget = $saleWidget;
        $this->profitWidget = $profitWidget;
    }

    public function index()
    {
        $purchaseStats = $this->purchaseWidget->getPurchaseStats();
        $saleStats = $this->saleWidget->getSaleStats();
        $profitStats = $this->profitWidget->getProfitStats();

        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
            'profitStats' => $profitStats,
        ]);
    }
}
