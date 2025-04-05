<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeEnum;
use App\Helpers\WeightHelper;
use App\Http\Requests\StorePurchaseRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductSizeResource;
use App\Http\Resources\PurchaseResource;
use App\Http\Resources\SupplierResource;
use App\Models\Product;
use App\Models\ProductSize;
use App\Models\Purchase;
use App\Models\Supplier;
use Illuminate\Http\Request;
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
        $productSizes = ProductSize::with(['product:id,name,type'])->get();

        return Inertia::render('Purchase/Create', [
            'products' => ProductResource::collection($products),
            'suppliers' => SupplierResource::collection($suppliers),
            'productSizes' => ProductSizeResource::collection($productSizes)
        ]);
    }

    public function store(StorePurchaseRequest $request)
    {
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
                    'total_price' => $request->total_amount,
                ]);
            }
        }

        return redirect()->route('purchases.index')
            ->with('success', 'Purchase created successfully');
    }

    public function show(Purchase $purchase)
    {
        $purchase->load([
            'supplier',
            'items.productSize.product',
        ]);

        return Inertia::render('Purchase/Show', [
            'purchase' => PurchaseResource::make($purchase),
        ]);
    }
}
