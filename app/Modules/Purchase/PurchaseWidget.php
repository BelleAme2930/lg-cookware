<?php

namespace App\Modules\Purchase;

use App\Enums\PaymentMethodEnum;
use App\Models\Payment;
use App\Models\Purchase;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class PurchaseWidget
{
    /**
     * Get purchase statistics for the dashboard widget
     *
     * @return array
     */
    public function getPurchaseStats(): array
    {
        $totalPurchases = number_format(Purchase::all()->sum('total_amount'));

        $cashPurchases = $this->getPurchasesByPaymentMethod(PaymentMethodEnum::CASH);
        $transferPurchases = $this->getPurchasesByPaymentMethod(PaymentMethodEnum::TRANSFER);
        $creditPurchases = $this->getPurchasesByPaymentMethod(PaymentMethodEnum::CREDIT);
        $chequePurchases = $this->getPurchasesByPaymentMethod(PaymentMethodEnum::CHEQUE);

        return [
            'total' => [
                'label' => 'Total',
                'value' => $totalPurchases,
                'icon' => 'FaShoppingCart',
                'color' => 'blue',
                'route' => route('purchases.index'),
            ],
            'cash' => [
                'label' => 'Cash',
                'value' => $cashPurchases,
                'icon' => 'FaMoneyBillWave',
                'color' => 'green',
                'route' => route('purchases.filteredData', ['method' => PaymentMethodEnum::CASH->value]),
            ],
            'transfer' => [
                'label' => 'Transfer',
                'value' => $transferPurchases,
                'icon' => 'FaExchangeAlt',
                'color' => 'indigo',
                'route' => route('purchases.filteredData', ['method' => PaymentMethodEnum::TRANSFER->value]),
            ],
            'credit' => [
                'label' => 'Credit',
                'value' => $creditPurchases,
                'icon' => 'FaCreditCard',
                'color' => 'yellow',
                'route' => route('purchases.filteredData', ['method' => PaymentMethodEnum::CREDIT->value]),
            ],
            'cheque' => [
                'label' => 'Cheque',
                'value' => $chequePurchases,
                'icon' => 'FaMoneyCheck',
                'color' => 'red',
                'route' => route('purchases.filteredData', ['method' => PaymentMethodEnum::CHEQUE->value]),
            ]
        ];
    }

    /**
     * Get total purchases by payment method
     *
     * @param PaymentMethodEnum $method
     * @return int
     */
    protected function getPurchasesByPaymentMethod(PaymentMethodEnum $method): string
    {
        $amount = Payment::where('method', $method)->sum('amount');

        return number_format($amount);
    }

    /**
     * Get filtered purchases for specific views
     *
     * @param string|null $paymentMethod
     * @return Collection
     */
    public function getFilteredPurchases(?string $paymentMethod = null): Collection
    {
        $query = Purchase::with(['supplier', 'payments', 'items']);

        if ($paymentMethod) {
            $query->whereHas('payments', function (Builder $query) use ($paymentMethod) {
                $query->where('method', $paymentMethod);
            });
        }

        return $query->latest()->get();
    }
}
