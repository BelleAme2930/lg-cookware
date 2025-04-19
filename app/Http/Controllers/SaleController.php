<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeEnum;
use App\Helpers\WeightHelper;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Resources\AccountResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSizeResource;
use App\Http\Resources\SaleResource;
use App\Http\Resources\CustomerResource;
use App\Models\Account;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Sale;
use App\Models\Customer;
use App\Modules\Sale\SaleWidget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with([
            'items',
        ])->latest()->get();

        return Inertia::render('Sale/Index', [
            'sales' => SaleResource::collection($sales),
        ]);
    }

    public function create()
    {
        $customers = Customer::all();
        $products = Product::with(['sizes'])->get();
        $productSizes = ProductSize::with(['product'])->get();
        $accounts = Account::all();

        return Inertia::render('Sale/Create', [
            'products' => ProductResource::collection($products),
            'customers' => CustomerResource::collection($customers),
            'productSizes' => ProductSizeResource::collection($productSizes),
            'accounts' => AccountResource::collection($accounts),
        ]);
    }

    public function store(StoreSaleRequest $request)
    {
        DB::beginTransaction();

        try {
            $sale = Sale::create([
                'customer_id' => $request->customer,
                'sale_date' => $request->sale_date,
                'notes' => $request->notes,
                'total_amount' => $request->total_amount,
            ]);

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                foreach ($productData['sizes'] as $sizeData) {
                    $sale->items()->create([
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

                $sale->payments()->create($payment);
                $totalPaymentAmount += $paymentData['amount'];
            }

            if ($totalPaymentAmount > $request->total_amount) {
                throw new \Exception('Total payment amount exceeds sale total.');
            }

            $customer = Customer::find($request->customer);
            $customer->current_balance += ($request->total_amount - $totalPaymentAmount);
            $customer->save();

            DB::commit();
            return redirect()->route('sales.index')
                ->with('success', 'Sale created successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('sales.index')
                ->with('error', 'Error occurred while creating sale');
        }
    }

    public function show(Sale $sale)
    {
        $sale->load([
            'customer',
            'items.productSize.product',
            'payments.account',
        ]);

        return Inertia::render('Sale/Show', [
            'sale' => SaleResource::make($sale),
        ]);
    }

    public function edit(Sale $sale)
    {
        $sale->load([
            'customer',
            'payments',
            'items.productSize.product',
        ]);

        $customers = Customer::all();
        $products = Product::with(['sizes'])->get();
        $productSizes = ProductSize::with(['product'])->get();
        $accounts = Account::all();

        return Inertia::render('Sale/Edit', [
            'sale' => SaleResource::make($sale),
            'products' => ProductResource::collection($products),
            'customers' => CustomerResource::collection($customers),
            'productSizes' => ProductSizeResource::collection($productSizes),
            'accounts' => AccountResource::collection($accounts),
        ]);
    }

    public function update(StoreSaleRequest $request, Sale $sale)
    {
        DB::beginTransaction();

        try {

            $oldTotal = $sale->getOriginal('total_amount');
            $oldPayments = $sale->payments()->sum('amount');
            $customer = Customer::find($sale->customer_id);

            $customer->current_balance -= ($oldTotal - $oldPayments);

            $sale->update([
                'customer_id' => $request->customer,
                'sale_date' => $request->sale_date,
                'notes' => $request->notes,
                'total_amount' => $request->total_amount,
            ]);

            $sale->items()->delete();

            foreach ($request->products as $productData) {
                $product = Product::find($productData['product_id']);

                foreach ($productData['sizes'] as $sizeData) {
                    $sale->items()->create([
                        'product_id' => $product->id,
                        'product_size_id' => $sizeData['value'],
                        'quantity' => $sizeData['quantity'],
                        'unit_price' => $sizeData['price'],
                        'weight' => $product->type === ProductTypeEnum::Weight ? WeightHelper::toGrams($sizeData['weight']) : null,
                        'total_price' => $request->total_amount,
                    ]);
                }
            }

            $totalPaymentAmount = 0;
            $sale->payments()->delete();

            foreach ($request->payments as $paymentData) {
                $payment = [
                    'method' => $paymentData['method'],
                    'amount' => $paymentData['amount'],
                    'payment_date' => $paymentData['payment_date'],
                    'notes' => $paymentData['notes'],
                    'due_date' => $paymentData['due_date'] ?? null,
                    'remaining_balance' => $paymentData['remaining_balance'] ?? null,
                    'account_id' => $paymentData['account_id'] ?? null,
                    'cheque_number' => $paymentData['cheque_number'] ?? null,
                    'bank_name' => $paymentData['bank_name'] ?? null,
                ];

                $sale->payments()->create($payment);
                $totalPaymentAmount += $paymentData['amount'];
            }

            if ($totalPaymentAmount > $request->total_amount) {
                throw new \Exception('Total payment amount exceeds sale total.');
            }

            $customer->current_balance += ($request->total_amount - $totalPaymentAmount);
            $customer->save();


            DB::commit();
            return redirect()->route('sales.index')
                ->with('success', 'Sale updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('sales.index')
                ->with('error', 'Error occurred while updating sale');
        }
    }

    public function invoice(Sale $sale)
    {
        $sale->load([
            'customer',
            'items.productSize.product',
            'payments',
        ]);

        return Inertia::render('Sale/Invoice', [
            'sale' => SaleResource::make($sale),
        ]);
    }

    public function destroy(Sale $sale)
    {
        DB::beginTransaction();

        try {
            $sale->items()->delete();

            $sale->payments()->delete();

            $sale->delete();

            DB::commit();
            return redirect()->route('sales.index')
                ->with('success', 'Sale deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('sales.index')
                ->with('error', 'Error occurred while deleting sale: ' . $e->getMessage());
        }
    }

    public function filteredData(Request $request)
    {
        $paymentMethod = $request->get('method');
        $sales = (new SaleWidget())->getFilteredSales($paymentMethod);

        return Inertia::render('Sale/Partials/FilteredSale', [
            'sales' => SaleResource::collection($sales),
            'filters' => [
                'method' => $paymentMethod
            ]
        ]);
    }

}
