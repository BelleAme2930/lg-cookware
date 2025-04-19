<?php

namespace App\Modules\Inventory;

use App\Enums\ProductTypeEnum;
use App\Helpers\WeightHelper;
use App\Models\Product;

class InventoryStatusWidget
{
    public function getInventoryStats(): array
    {
        $products = Product::with('sizes')->get();

        $totalProducts = $products->count();

        $inStockProducts = $products->filter(function ($product) {
            return $product->sizes->sum(fn ($size) => $product->type->value === ProductTypeEnum::Weight->value
                    ? $size->weight
                    : $size->quantity
                ) > 0;
        })->count();

        $outOfStockProducts = $totalProducts - $inStockProducts;

        $lowStockThreshold = 10;
        $lowStockProducts = $products->filter(function ($product) use ($lowStockThreshold) {
            $total = $product->sizes->sum(fn ($size) => $product->type->value === ProductTypeEnum::Weight->value
                ? $size->weight
                : $size->quantity
            );
            return $total > 0 && $total < $lowStockThreshold;
        })->count();

        $totalStockQuantity = $products->sum(function ($product) {
            return $product->sizes->sum(fn ($size) => $product->type->value === ProductTypeEnum::Quantity->value
                ? ($size->quantity) : 0
            );
        });

        $totalStockWeight = $products->sum(function ($product) {
            return $product->sizes->sum(fn ($size) => $product->type->value === ProductTypeEnum::Weight->value
                ? (WeightHelper::toKilograms($size->weight ?? 0)) : 0
            );
        });

        $totalStockValue = $products->sum(function ($product) {
            return $product->sizes->sum(function ($size) use ($product) {
                $unit = $product->type->value === ProductTypeEnum::Weight->value ? WeightHelper::toKilograms($size->weight ?? 0) : $size->quantity;
                return $unit * $size->purchase_price;
            });
        });

        $totalStockEstimatedValue = $products->sum(function ($product) {
            return $product->sizes->sum(function ($size) use ($product) {
                $unit = $product->type->value === ProductTypeEnum::Weight->value ? WeightHelper::toKilograms($size->weight ?? 0) : $size->quantity;
                return $unit * $size->sale_price;
            });
        });

        return [
            'totalProducts' => $totalProducts,
            'inStockProducts' => $inStockProducts,
            'outOfStockProducts' => $outOfStockProducts,
            'lowStockProducts' => $lowStockProducts,
            'totalStockQuantity' => $totalStockQuantity,
            'totalStockWeight' => $totalStockWeight,
            'totalStockValue' => $totalStockValue,
            'totalStockEstimatedValue' => $totalStockEstimatedValue,
        ];
    }
}
