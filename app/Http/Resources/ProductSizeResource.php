<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSizeResource extends JsonResource
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
            'product_id' => $this->product_id,
            'name' => $this->name,
            'purchase_price' => $this->purchase_price,
            'sale_price' => $this->sale_price,
            'weight' => $this->weight,
            'quantity' => $this->quantity,
            'product' => $this->whenLoaded('product', fn() => ProductResource::make($this->product)),
            'created_at' => $this->created_at ? $this->created_at->format('d-M-Y') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('d-M-Y') : null,
        ];
    }
}
