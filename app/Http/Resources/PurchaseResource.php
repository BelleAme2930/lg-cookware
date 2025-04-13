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
            'supplier_id' => $this->supplier_id,
            'supplier' => $this->whenLoaded('supplier', fn() => SupplierResource::make($this->supplier)),
            'purchase_date' => $this->purchase_date->format('Y-m-d'),
            'purchase_date_display' => $this->purchase_date->format('d-M-Y'),
            'notes' => $this->notes,
            'total_amount' => $this->total_amount,
            'total_amount_formatted' => number_format($this->total_amount),
            'items_count' => $this->whenLoaded('items', fn() => $this->items->count()),
            'items' => $this->whenLoaded('items', fn() => PurchaseItemResource::collection($this->items)),
            'item_names' => $this->whenLoaded('items', function () {
                return $this->items->map(function ($item) {
                    return $item->productSize->product->name . ' ' . $item->productSize->name;
                })->implode(', ');
            }),
            'payments' => $this->whenLoaded('payments', fn() => PaymentResource::collection($this->payments)),
            'payments_count' => $this->whenLoaded('payments', fn() => $this->payments->count()),
            'total_paid' => $this->whenLoaded('payments', function () {
                return $this->payments->sum('amount');
            }),
            'total_paid_formatted' => $this->whenLoaded('payments', function () {
                return number_format($this->payments->sum('amount'));
            }),
            'remaining_balance' => $this->whenLoaded('payments', function () {
                return max(0, $this->total_amount - $this->payments->sum('amount'));
            }),
            'remaining_balance_formatted' => $this->whenLoaded('payments', function () {
                return number_format(max(0, $this->total_amount - $this->payments->sum('amount')));
            }),
            'payment_status' => $this->whenLoaded('payments', function () {
                $totalPaid = $this->payments->sum('amount');
                if ($totalPaid >= $this->total_amount) {
                    return 'Paid';
                }
                $hasCreditPayment = $this->payments->contains('method', 'credit');
                return $hasCreditPayment ? 'Credit' : 'Partial';
            }),
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}
