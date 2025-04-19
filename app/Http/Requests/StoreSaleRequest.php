<?php

namespace App\Http\Requests;

use App\Enums\PaymentMethodEnum;
use App\Enums\ProductTypeEnum;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer' => ['required', 'exists:customers,id'],
            'sale_date' => ['required', 'date'],
            'notes' => ['nullable', 'string'],
            'total_amount' => ['required', 'numeric', 'min:0'],

            'products' => ['required', 'array', 'min:1'],
            'products.*.product_id' => ['required', 'exists:products,id'],
            'products.*.sizes' => ['required', 'array', 'min:1'],
            'products.*.sizes.*.value' => ['required', 'exists:product_sizes,id'],
            'products.*.sizes.*.label' => ['required', 'string'],
            'products.*.sizes.*.quantity' => ['required', 'numeric', 'min:1'],
            'products.*.sizes.*.price' => ['required', 'numeric', 'min:0'],
            'products.*.sizes.*.weight' => ['nullable', 'numeric', 'min:0'],

            'payments' => 'required|array|min:1',
            'payments.*.method' => ['required', Rule::in(PaymentMethodEnum::values())],
            'payments.*.amount' => 'required|numeric|min:0',
            'payments.*.payment_date' => 'required|date',
            'payments.*.notes' => 'nullable|string',

            // Conditional validation based on payment method
            'payments.*.due_date' => 'nullable|date|required_if:payments.*.method,credit',
            'payments.*.remaining_balance' => 'nullable|numeric|min:0|required_if:payments.*.method,credit',
            'payments.*.account_id' => 'nullable|exists:accounts,id|required_if:payments.*.method,transfer',
            'payments.*.cheque_number' => 'nullable|string|required_if:payments.*.method,cheque',
            'payments.*.bank_name' => 'nullable|string|required_if:payments.*.method,cheque',
        ];
    }

    public function messages(): array
    {
        return [
            'payments.*.due_date.required_if' => 'The due date is required when payment method is Credit.',
            'payments.*.remaining_balance.required_if' => 'The remaining balance is required when payment method is Credit.',
            'payments.*.account_id.required_if' => 'The account is required when payment method is Transfer.',
            'payments.*.cheque_number.required_if' => 'The cheque number is required when payment method is Cheque.',
            'payments.*.bank_name.required_if' => 'The bank name is required when payment method is Cheque.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            foreach ($this->products as $index => $productData) {
                $product = Product::find($productData['product_id']);

                if (!$product) {
                    continue;
                }

                if ($product->type === ProductTypeEnum::Weight) {
                    foreach ($productData['sizes'] as $sizeIndex => $sizeData) {
                        if (empty($sizeData['weight'])) {
                            $validator->errors()->add(
                                "products.{$index}.sizes.{$sizeIndex}.weight",
                                'The weight field is required for weight-based products.'
                            );
                        }
                    }
                }
            }
        });
    }
}
