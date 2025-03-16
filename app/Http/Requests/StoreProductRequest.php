<?php

namespace App\Http\Requests;

use App\Enums\ProductTypeEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules =  [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'category' => ['required', 'integer', 'exists:categories,id'],
            'supplier' => ['required', 'integer', 'exists:suppliers,id'],
            'type' => ['required', 'string', 'in:weight,quantity'],
            'sizes.*.name' => ['required', 'string', 'max:255'],
            'sizes.*.purchase_price' => ['required', 'numeric', 'min:0'],
            'sizes.*.sale_price' => ['required', 'numeric', 'min:0'],
            'sizes.*.quantity' => ['required', 'numeric', 'min:0']
        ];

        if ($this->type === ProductTypeEnum::Weight) {
            $rules['sizes.*.weight'] = ['required', 'numeric', 'min:0'];
        }

        return $rules;
    }
}
