<?php

namespace App\Modules\Expense;

use App\Models\Expense;
use App\Models\PurchaseItem;
use App\Models\SaleItem;

class ExpenseWidget
{
    public function getExpenseStats(): array
    {
        $totalExpenses = Expense::sum('amount');

        return [
            'totalExpenses' => $totalExpenses,
        ];
    }
}
