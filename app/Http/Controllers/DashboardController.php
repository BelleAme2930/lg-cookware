<?php

namespace App\Http\Controllers;

use App\Modules\Purchase\PurchaseWidget;
use App\Modules\Sale\SaleWidget;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;
    protected SaleWidget $saleWidget;

    public function __construct(
        PurchaseWidget $purchaseWidget,
        SaleWidget $saleWidget
    )
    {
        $this->purchaseWidget = $purchaseWidget;
        $this->saleWidget = $saleWidget;
    }

    public function index()
    {
        $purchaseStats = $this->purchaseWidget->getPurchaseStats();
        $saleStats = $this->saleWidget->getSaleStats();

        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats,
            'saleStats' => $saleStats,
        ]);
    }
}
