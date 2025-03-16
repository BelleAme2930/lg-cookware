<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category_id' => $this->category_id,
            'supplier_id' => $this->supplier_id,
            'name' => $this->name,
            'description' => $this->description,
            'type' => $this->type,
            'category' => $this->whenLoaded('category', fn() => CategoryResource::make($this->category)),
            'supplier' => $this->whenLoaded('supplier', fn() => SupplierResource::make($this->supplier)),
            'sizes' => $this->whenLoaded('sizes', fn() => ProductSizeResource::collection($this->sizes)),
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}
