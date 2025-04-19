<?php

namespace App\Modules\Profit;

use App\Models\Sale;
use App\Models\Expense;
use App\Models\Purchase;

class ProfitWidget
{
    public function getProfitStats(): array
    {
        $totalSales = Sale::sum('total_amount');
        $totalPurchases = Purchase::sum('total_amount');
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
