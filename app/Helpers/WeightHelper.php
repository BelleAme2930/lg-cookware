<?php

namespace App\Helpers;

class WeightHelper
{
    public static function toKilograms(int $weight): float|int
    {
        return $weight / 1000;
    }

    public static function toGrams(float $weight): int|float
    {
        return $weight * 1000;
    }
}
