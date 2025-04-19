<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use App\Models\Purchase;
use Inertia\Inertia;

class SupplierLedgerController extends Controller
{
    /**
     * Display a listing of suppliers for ledger selection.
     */
    public function index()
    {
        $suppliers = Supplier::where('status', true)->get();

        return Inertia::render('Supplier/SupplierLedger/Index', [
            'suppliers' => SupplierResource::collection($suppliers),
        ]);
    }

    /**
     * Display the ledger for a specific supplier.
     */
    public function show(Supplier $supplier)
    {
        // Get all purchases for this supplier with related items and payments
        $purchases = Purchase::with(['items.productSize', 'payments'])
            ->where('supplier_id', $supplier->id)
            ->orderBy('purchase_date')
            ->get();

        // Calculate ledger entries
        $ledgerEntries = collect();

        // Add opening balance as first entry
        $ledgerEntries->push([
            'id' => 'opening',
            'date' => null,
            'type' => 'opening_balance',
            'description' => 'Opening Balance',
            'debit' => $supplier->opening_balance > 0 ? $supplier->opening_balance : 0,
            'credit' => $supplier->opening_balance < 0 ? abs($supplier->opening_balance) : 0,
            'balance' => $supplier->opening_balance,
            'reference' => null,
        ]);

        $runningBalance = $supplier->opening_balance;

        // Add purchases
        foreach ($purchases as $purchase) {
            $runningBalance += $purchase->total_amount;

            $ledgerEntries->push([
                'id' => 'purchase_' . $purchase->id,
                'date' => $purchase->purchase_date->format('Y-m-d'),
                'type' => 'purchase',
                'description' => 'Purchase #' . $purchase->id,
                'debit' => $purchase->total_amount,
                'credit' => 0,
                'balance' => $runningBalance,
                'reference' => $purchase->id,
                'purchase_data' => PurchaseResource::make($purchase),
            ]);
        }

        $ledgerEntries = $ledgerEntries->sortBy([
            fn ($a, $b) => $a['date'] === null ? -1 : ($b['date'] === null ? 1 : strcmp($a['date'], $b['date'])),
            fn ($a, $b) => $a['id'] <=> $b['id']
        ])->values()->all();

        return Inertia::render('Supplier/SupplierLedger/Show', [
            'supplier' => SupplierResource::make($supplier),
            'ledgerEntries' => $ledgerEntries,
        ]);
    }
}
