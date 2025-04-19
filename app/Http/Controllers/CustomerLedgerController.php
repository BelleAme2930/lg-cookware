<?php

namespace App\Http\Controllers;

use App\Http\Resources\SaleResource;
use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use App\Models\Sale;
use Inertia\Inertia;

class CustomerLedgerController extends Controller
{
    /**
     * Display a listing of customers for ledger selection.
     */
    public function index()
    {
        $customers = Customer::where('status', true)->get();

        return Inertia::render('Customer/CustomerLedger/Index', [
            'customers' => CustomerResource::collection($customers),
        ]);
    }

    /**
     * Display the ledger for a specific customer.
     */
    public function show(Customer $customer)
    {
        // Get all sales for this customer with related items and payments
        $sales = Sale::with(['items.productSize', 'payments'])
            ->where('customer_id', $customer->id)
            ->orderBy('sale_date')
            ->get();

        // Calculate ledger entries
        $ledgerEntries = collect();

        // Add opening balance as first entry
        $ledgerEntries->push([
            'id' => 'opening',
            'date' => null,
            'type' => 'opening_balance',
            'description' => 'Opening Balance',
            'debit' => $customer->opening_balance > 0 ? $customer->opening_balance : 0,
            'credit' => $customer->opening_balance < 0 ? abs($customer->opening_balance) : 0,
            'balance' => $customer->opening_balance,
            'reference' => null,
        ]);

        $runningBalance = $customer->opening_balance;

        // Add sales
        foreach ($sales as $sale) {
            $runningBalance += $sale->total_amount;

            $ledgerEntries->push([
                'id' => 'sale_' . $sale->id,
                'date' => $sale->sale_date->format('Y-m-d'),
                'type' => 'sale',
                'description' => 'Sale #' . $sale->id,
                'debit' => $sale->total_amount,
                'credit' => 0,
                'balance' => $runningBalance,
                'reference' => $sale->id,
                'sale_data' => SaleResource::make($sale),
            ]);
        }

        $ledgerEntries = $ledgerEntries->sortBy([
            fn ($a, $b) => $a['date'] === null ? -1 : ($b['date'] === null ? 1 : strcmp($a['date'], $b['date'])),
            fn ($a, $b) => $a['id'] <=> $b['id']
        ])->values()->all();

        return Inertia::render('Customer/CustomerLedger/Show', [
            'customer' => CustomerResource::make($customer),
            'ledgerEntries' => $ledgerEntries,
        ]);
    }
}
