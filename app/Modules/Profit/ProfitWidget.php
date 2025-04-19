<?php

namespace App\Modules\Profit;

use App\Models\PurchaseItem;
use App\Models\SaleItem;

class ProfitWidget
{
    public function getProfitStats(): array
    {
        $totalSales = SaleItem::sum('total_price');

        $totalPurchases = PurchaseItem::sum('total_price');

        return [
            'value' => $totalSales - $totalPurchases,
            'totalSales' => number_format($totalSales),
            'totalPurchases' => number_format($totalPurchases),
        ];
    }
}
