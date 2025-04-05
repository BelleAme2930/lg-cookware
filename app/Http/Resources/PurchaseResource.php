<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
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
            'supplier' => $this->whenLoaded('supplier', fn() => SupplierResource::make($this->supplier)),
            'purchase_date' => $this->purchase_date->format('d-M-Y'),
            'notes' => $this->notes,
            'total_amount' => number_format($this->total_amount),
            'items_count' => $this->whenLoaded('items', fn() => $this->items->count()),
            'items' => $this->whenLoaded('items', fn() => PurchaseItemResource::collection($this->items)),
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}
