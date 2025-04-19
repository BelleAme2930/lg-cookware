<?php

namespace App\Http\Resources;

use App\Helpers\WeightHelper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SaleItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sale_id' => $this->sale_id,
            'product_size_id' => $this->product_size_id,
            'weight' => $this->weight ? WeightHelper::toKilograms($this->weight) : null,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'unit_price_display' => number_format($this->unit_price),
            'total_price' => number_format($this->total_price),
            'product_size' => $this->whenLoaded('productSize', fn() => ProductSizeResource::make($this->productSize)),
        ];
    }
}
