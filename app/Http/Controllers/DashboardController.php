<?php

namespace App\Http\Controllers;

use App\Modules\Purchase\PurchaseWidget;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidgetService;

    public function __construct(PurchaseWidget $purchaseWidgetService)
    {
        $this->purchaseWidgetService = $purchaseWidgetService;
    }

    public function index()
    {
        $purchaseStats = $this->purchaseWidgetService->getPurchaseStats();

        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats
        ]);
    }
}
