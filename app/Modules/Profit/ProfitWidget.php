<?php

namespace App\Modules\Profit;

use App\Models\Expense;
use App\Models\SaleItem;

class ProfitWidget
{
    public function getProfitStats(): array
    {
        $totalProfit = 0;

        // Fetch all sold items
        $soldItems = SaleItem::with(['productSize'])->get();

        foreach ($soldItems as $item) {
            $productSize = $item->productSize;

            if ($productSize) {
                $salePrice = $productSize->sale_price;
                $purchasePrice = $productSize->purchase_price;

                $quantity = $item->quantity;
                $profitPerUnit = $salePrice - $purchasePrice;

                $totalProfit += $profitPerUnit * $quantity;
            }
        }

        // Subtract expenses
        $totalExpenses = Expense::sum('amount');
        $netProfit = $totalProfit - $totalExpenses;

        return [
            'value' => $netProfit,
            'totalProfitFromSales' => number_format($totalProfit),
            'totalExpenses' => number_format($totalExpenses),
        ];
    }
}
