<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = Account::all();
        return Inertia::render('Account/Index', [
            'accounts' => AccountResource::collection($accounts)->resolve(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Account/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        Account::create([
            'title' => $request->title,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
        ]);

        return redirect()->route('accounts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        return Inertia::render('Account/Show', [
            'account' => AccountResource::make($account)->resolve(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        return Inertia::render('Account/Edit', [
            'account' => AccountResource::make($account)->resolve(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account)
    {
        $account->update([
            'title' => $request->title,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
        ]);

        return redirect()->route('accounts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();

        return redirect()->route('accounts.index');
    }
}
