<?php

namespace App\Http\Controllers;

use App\Enums\ProductTypeEnum;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['sizes'])->get();

        return Inertia::render('Product/Index', [
            'products' => ProductResource::collection($products),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $suppliers = Supplier::all();

        return Inertia::render('Product/Create', [
            'categories' => CategoryResource::collection($categories),
            'suppliers' => SupplierResource::collection($suppliers),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category,
            'supplier_id' => $request->supplier,
            'type' => $request->type,
        ]);

        foreach ($request->sizes as $size) {
            $product->sizes()->create([
                'name' => $size['name'],
                'purchase_price' => $size['purchase_price'],
                'sale_price' => $size['sale_price'],
                'weight' => $request->type === ProductTypeEnum::Weight ? $size['weight'] : null,
                'quantity' => $size['quantity'],
            ]);
        }

        return redirect()->route('products.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Product/Show', [
            'product' => ProductResource::make($product),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $suppliers = Supplier::all();

        $product->load(['sizes']);

        return Inertia::render('Product/Edit', [
            'product' => ProductResource::make($product),
            'categories' => CategoryResource::collection($categories),
            'suppliers' => SupplierResource::collection($suppliers),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->category,
            'supplier_id' => $request->supplier,
            'type' => $request->type,
        ]);

        $product->sizes()->delete();

        foreach ($request->sizes as $size) {
            $product->sizes()->create([
                'name' => $size['name'],
                'purchase_price' => $size['purchase_price'],
                'sale_price' => $size['sale_price'],
                'weight' => $request->type === ProductTypeEnum::Weight ? $size['weight'] : null,
                'quantity' => $size['quantity'],
            ]);
        }

        return redirect()->route('products.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index');
    }
}
