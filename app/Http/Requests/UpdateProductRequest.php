<?php

namespace App\Http\Requests;

use App\Enums\ProductTypeEnum;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
        $rules =  [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'category' => ['required', 'integer', 'exists:categories,id'],
            'supplier' => ['required', 'integer', 'exists:suppliers,id'],
            'type' => ['required', 'string', 'in:weight,quantity'],
        ];

        if ($this->type === ProductTypeEnum::Weight) {
            $rules['sizes.*.weight'] = ['required', 'numeric', 'min:0'];
        }

        return $rules;
    }
}
