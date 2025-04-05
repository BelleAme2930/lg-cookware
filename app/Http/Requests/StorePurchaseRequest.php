<?php

namespace App\Http\Requests;

use App\Enums\ProductTypeEnum;
use App\Models\Product;
use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseRequest extends FormRequest
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
            'supplier' => ['required', 'exists:suppliers,id'],
            'purchase_date' => ['required', 'date'],
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
