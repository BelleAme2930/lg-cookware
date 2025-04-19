<?php

namespace App\Modules\Sale;

use App\Enums\PaymentMethodEnum;
use App\Models\Payment;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class SaleWidget
{
    /**
     * Get sale statistics for the dashboard widget
     *
     * @return array
     */
    public function getSaleStats(): array
    {
        $totalSales = number_format(Sale::all()->sum('total_amount'));

        $cashSales = $this->getSalesByPaymentMethod(PaymentMethodEnum::CASH);
        $transferSales = $this->getSalesByPaymentMethod(PaymentMethodEnum::TRANSFER);
        $creditSales = $this->getSalesByPaymentMethod(PaymentMethodEnum::CREDIT);
        $chequeSales = $this->getSalesByPaymentMethod(PaymentMethodEnum::CHEQUE);

        return [
            'total' => [
                'label' => 'Total',
                'value' => $totalSales,
                'icon' => 'FaShoppingCart',
                'color' => 'blue',
                'route' => route('sales.index'),
            ],
            'cash' => [
                'label' => 'Cash',
                'value' => $cashSales,
                'icon' => 'FaMoneyBillWave',
                'color' => 'green',
                'route' => route('sales.filteredData', ['method' => PaymentMethodEnum::CASH->value]),
            ],
            'transfer' => [
                'label' => 'Transfer',
                'value' => $transferSales,
                'icon' => 'FaExchangeAlt',
                'color' => 'indigo',
                'route' => route('sales.filteredData', ['method' => PaymentMethodEnum::TRANSFER->value]),
            ],
            'credit' => [
                'label' => 'Credit',
                'value' => $creditSales,
                'icon' => 'FaCreditCard',
                'color' => 'yellow',
                'route' => route('sales.filteredData', ['method' => PaymentMethodEnum::CREDIT->value]),
            ],
            'cheque' => [
                'label' => 'Cheque',
                'value' => $chequeSales,
                'icon' => 'FaMoneyCheck',
                'color' => 'red',
                'route' => route('sales.filteredData', ['method' => PaymentMethodEnum::CHEQUE->value]),
            ]
        ];
    }

    /**
     * Get total sales by payment method
     *
     * @param PaymentMethodEnum $method
     * @return string
     */
    protected function getSalesByPaymentMethod(PaymentMethodEnum $method): string
    {
        $amount = Payment::where('method', $method)->sum('amount');

        return number_format($amount);
    }

    /**
     * Get filtered sales for specific views
     *
     * @param string|null $paymentMethod
     * @return Collection
     */
    public function getFilteredSales(?string $paymentMethod = null): Collection
    {
        $query = Sale::with(['customer', 'payments', 'items']);

        if ($paymentMethod) {
            $query->whereHas('payments', function (Builder $query) use ($paymentMethod) {
                $query->where('method', $paymentMethod);
            });
        }

        return $query->latest()->get();
    }
}
