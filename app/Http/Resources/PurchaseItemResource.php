<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseItemResource extends JsonResource
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
            'purchase_id' => $this->purchase_id,
            'product_size_id' => $this->product_size_id,
            'weight' => $this->weight,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total_price' => $this->total_price,
            'product_size' => $this->whenLoaded('productSize', fn() => ProductSizeResource::make($this->productSize)),
        ];
    }
}
