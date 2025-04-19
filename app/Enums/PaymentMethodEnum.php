<?php

namespace App\Enums;

enum PaymentMethodEnum: string
{
    case CASH = 'cash';
    case TRANSFER = 'transfer';
    case CREDIT = 'credit';
    case CHEQUE = 'cheque';

    public function label(): string
    {
        return match($this) {
            self::CASH => 'Cash',
            self::TRANSFER => 'Account Transfer',
            self::CREDIT => 'Credit',
            self::CHEQUE => 'Cheque',
        };
    }

    public function icon(): string
    {
        return match($this) {
            self::CASH => 'fa-money-bill',
            self::TRANSFER => 'fa-exchange-alt',
            self::CREDIT => 'fa-credit-card',
            self::CHEQUE => 'fa-money-check',
        };
    }

    public function color(): string
    {
        return match($this) {
            self::CASH => 'success',
            self::TRANSFER => 'info',
            self::CREDIT => 'warning',
            self::CHEQUE => 'danger',
        };
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
