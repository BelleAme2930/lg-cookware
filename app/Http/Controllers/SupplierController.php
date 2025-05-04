<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::all();
        return Inertia::render('Supplier/Index', [
            'suppliers' => SupplierResource::collection($suppliers),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Supplier/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        $openingBalance = $request->balance_type === 'credit'
            ? -abs($request->opening_balance)
            : abs($request->opening_balance);

        Supplier::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'opening_balance' => $openingBalance,
            'current_balance' => $openingBalance,
            'status' => true,
        ]);

        return redirect()->route('suppliers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        return Inertia::render('Supplier/Show', [
            'supplier' => SupplierResource::make($supplier),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        return Inertia::render('Supplier/Edit', [
            'supplier' => SupplierResource::make($supplier),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $openingBalance = $request->balance_type === 'credit'
            ? -abs($request->opening_balance)
            : abs($request->opening_balance);

        $balanceDifference = $openingBalance - $supplier->opening_balance;

        $supplier->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'opening_balance' => $openingBalance,
            'current_balance' => $supplier->current_balance + $balanceDifference,
            'status' => $request->status,
        ]);

        return redirect()->route('suppliers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return redirect()->route('suppliers.index');
    }
}
