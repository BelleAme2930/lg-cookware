<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExpenseResource extends JsonResource
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
            'name' => $this->name,
            'amount' => $this->amount,
            'description' => $this->description,
            'expense_date' => $this->expense_date,
            'expense_date_display' => Carbon::parse($this->expense_date)->format('d-M-Y'),
            'paid_date' => $this->paid_date ? Carbon::parse($this->paid_date)->format('d-M-Y') : '-',
            'status' => $this->paid_date ? 'Paid' : 'Unpaid',
            'created_at' => $this->created_at->format('d-M-Y'),
            'updated_at' => $this->updated_at->format('d-M-Y'),
        ];
    }
}
