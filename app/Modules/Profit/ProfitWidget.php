<?php

namespace App\Modules\Profit;

use App\Models\Expense;
use App\Models\PurchaseItem;
use App\Models\SaleItem;

class ProfitWidget
{
    public function getProfitStats(): array
    {
        $totalSales = SaleItem::sum('total_price');
        $totalPurchases = PurchaseItem::sum('total_price');
        $totalExpenses = Expense::sum('amount');

        $netProfit = $totalSales - $totalPurchases - $totalExpenses;

        return [
            'value' => $netProfit,
            'totalSales' => number_format($totalSales),
            'totalPurchases' => number_format($totalPurchases),
            'totalExpenses' => number_format($totalExpenses),
        ];
    }
}
