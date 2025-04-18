<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeEnum;
use App\Helpers\WeightHelper;
use App\Http\Requests\StorePurchaseRequest;
use App\Http\Resources\AccountResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSizeResource;
use App\Http\Resources\PurchaseResource;
use App\Http\Resources\SupplierResource;
use App\Models\Account;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Purchase;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Purchase::with([
            'items',
        ])->latest()->get();

        return Inertia::render('Purchase/Index', [
            'purchases' => PurchaseResource::collection($purchases),
        ]);
    }

    public function create()
    {
        $suppliers = Supplier::all();
        $products = Product::with(['sizes'])->get();
        $productSizes = ProductSize::with(['product'])->get();
        $accounts = Account::all();

        return Inertia::render('Purchase/Create', [
            'products' => ProductResource::collection($products),
            'suppliers' => SupplierResource::collection($suppliers),
            'productSizes' => ProductSizeResource::collection($productSizes),
            'accounts' => AccountResource::collection($accounts),
        ]);
    }

    public function store(StorePurchaseRequest $request)
    {
        DB::beginTransaction();

        try {
            $purchase = Purchase::create([
                'supplier_id' => $request->supplier,
                'purchase_date' => $request->purchase_date,
                'notes' => $request->notes,
                'total_amount' => $request->total_amount,
            ]);

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                foreach ($productData['sizes'] as $sizeData) {
                    $purchase->items()->create([
                        'product_id' => $product->id,
                        'product_size_id' => $sizeData['value'],
                        'quantity' => $sizeData['quantity'],
                        'unit_price' => $sizeData['price'],
                        'weight' => $product->type === ProductTypeEnum::Weight ? WeightHelper::toGrams($sizeData['weight']) : null,
                        'total_price' => $product->type === ProductTypeEnum::Weight ? $sizeData['weight'] * $sizeData['price'] : $sizeData['quantity'] * $sizeData['price'],
                    ]);
                }
            }

            $totalPaymentAmount = 0;

            foreach ($request->payments as $paymentData) {
                $payment = [
                    'method' => $paymentData['method'],
                    'amount' => $paymentData['amount'],
                    'payment_date' => $paymentData['payment_date'],
                    'notes' => $paymentData['notes'] ?? null,
                ];

                switch ($paymentData['method']) {
                    case 'credit':
                        $payment['due_date'] = $paymentData['due_date'];
                        $payment['remaining_balance'] = $paymentData['remaining_balance'];
                        break;

                    case 'transfer':
                        $payment['account_id'] = $paymentData['account_id'];
                        break;

                    case 'cheque':
                        $payment['cheque_number'] = $paymentData['cheque_number'];
                        $payment['bank_name'] = $paymentData['bank_name'];
                        break;
                }

                $purchase->payments()->create($payment);
                $totalPaymentAmount += $paymentData['amount'];
            }

            if ($totalPaymentAmount > $request->total_amount) {
                throw new \Exception('Total payment amount exceeds purchase total.');
            }

            DB::commit();
            return redirect()->route('purchases.index')
                ->with('success', 'Purchase created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('purchases.index')
                ->with('error', 'Error occurred while creating purchase');
        }
    }

    public function show(Purchase $purchase)
    {
        $purchase->load([
            'supplier',
            'items.productSize.product',
            'payments.account',
        ]);

        return Inertia::render('Purchase/Show', [
            'purchase' => PurchaseResource::make($purchase),
        ]);
    }

    public function edit(Purchase $purchase)
    {
        $purchase->load([
            'supplier',
            'payments',
            'items.productSize.product',
        ]);

        $suppliers = Supplier::all();
        $products = Product::with(['sizes'])->get();
        $productSizes = ProductSize::with(['product'])->get();
        $accounts = Account::all();

        return Inertia::render('Purchase/Edit', [
            'purchase' => PurchaseResource::make($purchase),
            'products' => ProductResource::collection($products),
            'suppliers' => SupplierResource::collection($suppliers),
            'productSizes' => ProductSizeResource::collection($productSizes),
            'accounts' => AccountResource::collection($accounts),
        ]);
    }

    public function update(StorePurchaseRequest $request, Purchase $purchase)
    {
        DB::beginTransaction();

        try {
            $purchase->update([
                'supplier_id' => $request->supplier,
                'purchase_date' => $request->purchase_date,
                'notes' => $request->notes,
                'total_amount' => $request->total_amount,
            ]);

            $purchase->items()->delete();

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                foreach ($productData['sizes'] as $sizeData) {
                    $purchase->items()->create([
                        'product_id' => $product->id,
                        'product_size_id' => $sizeData['value'],
                        'quantity' => $sizeData['quantity'],
                        'unit_price' => $sizeData['price'],
                        'weight' => $product->type === ProductTypeEnum::Weight ? WeightHelper::toGrams($sizeData['weight']) : null,
                        'total_price' => $request->total_amount,
                    ]);
                }
            }

            $purchase->payments()->delete();
            foreach ($request->payments as $paymentData) {
                $purchase->payments()->create([
                    'method' => $paymentData['method'],
                    'amount' => $paymentData['amount'],
                    'payment_date' => $paymentData['payment_date'],
                    'notes' => $paymentData['notes'],
                    'due_date' => $paymentData['due_date'] ?? null,
                    'remaining_balance' => $paymentData['remaining_balance'] ?? null,
                    'account_id' => $paymentData['account_id'] ?? null,
                    'cheque_number' => $paymentData['cheque_number'] ?? null,
                    'bank_name' => $paymentData['bank_name'] ?? null,
                ]);
            }

            DB::commit();
            return redirect()->route('purchases.index')
                ->with('success', 'Purchase updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('purchases.index')
                ->with('error', 'Error occurred while updating purchase');
        }
    }

    public function invoice(Purchase $purchase)
    {
        $purchase->load([
            'supplier',
            'items.productSize.product',
            'payments',
        ]);

        return Inertia::render('Purchase/Invoice', [
            'purchase' => PurchaseResource::make($purchase),
        ]);
    }

    public function destroy(Purchase $purchase)
    {
        DB::beginTransaction();

        try {
            $purchase->items()->delete();

            $purchase->payments()->delete();

            $purchase->delete();

            DB::commit();
            return redirect()->route('purchases.index')
                ->with('success', 'Purchase deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('purchases.index')
                ->with('error', 'Error occurred while deleting purchase: ' . $e->getMessage());
        }
    }

}
