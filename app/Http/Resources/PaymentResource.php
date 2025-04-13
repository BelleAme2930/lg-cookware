<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
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
            'method' => $this->method,
            'method_display' => ucfirst($this->method->value),
            'amount' => $this->amount,
            'amount_formatted' => number_format($this->amount),
            'payment_date' => $this->payment_date->format('Y-m-d'),
            'payment_date_display' => $this->payment_date->format('d-M-Y'),
            'notes' => $this->notes,
            'due_date' => $this->due_date ? $this->due_date->format('Y-m-d') : null,
            'due_date_display' => $this->due_date ? $this->due_date->format('d-M-Y') : null,
            'remaining_balance' => $this->remaining_balance,
            'remaining_balance_formatted' => $this->remaining_balance ? number_format($this->remaining_balance) : null,
            'account_id' => $this->account_id,
            'account' => $this->whenLoaded('account', fn() => AccountResource::make($this->account)),
            'cheque_number' => $this->cheque_number,
            'bank_name' => $this->bank_name,
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}
