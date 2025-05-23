<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\CustomerLedgerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SupplierLedgerController;
use App\Http\Controllers\TestingController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/purchases/filtered-purchase', [PurchaseController::class, 'filteredData'])->name('purchases.filteredData');
    Route::get('/sales/filtered-sale', [SaleController::class, 'filteredData'])->name('sales.filteredData');
    Route::get('/suppliers/ledger', [SupplierLedgerController::class, 'index'])->name('supplier.ledger.index');
    Route::get('suppliers/{supplier}/ledger', [SupplierLedgerController::class, 'show'])->name('supplier.ledger.show');
    Route::get('/customers/ledger', [CustomerLedgerController::class, 'index'])->name('customer.ledger.index');
    Route::get('customers/{customer}/ledger', [CustomerLedgerController::class, 'show'])->name('customer.ledger.show');

    Route::resources([
        'categories' => CategoryController::class,
        'accounts' => AccountController::class,
        'expenses' => ExpenseController::class,
        'suppliers' => SupplierController::class,
        'customers' => CustomerController::class,
        'products' => ProductController::class,
        'purchases' => PurchaseController::class,
        'sales' => SaleController::class,
    ]);

    Route::get('/purchases/{purchase}/invoice', [PurchaseController::class, 'invoice'])->name('purchases.invoice');
    Route::get('/sales/{sale}/invoice', [SaleController::class, 'invoice'])->name('sales.invoice');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/testing/reset-db', [TestingController::class, 'resetDb'])->name('testing.reset-db');

});

require __DIR__.'/auth.php';
