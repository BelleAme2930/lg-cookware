<?php

namespace App\Http\Controllers;

use App\Modules\Purchase\PurchaseWidget;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected PurchaseWidget $purchaseWidget;

    public function __construct(PurchaseWidget $purchaseWidget)
    {
        $this->purchaseWidget = $purchaseWidget;
    }

    public function index()
    {
        $purchaseStats = $this->purchaseWidget->getPurchaseStats();

        return Inertia::render('Dashboard', [
            'purchaseStats' => $purchaseStats
        ]);
    }
}
