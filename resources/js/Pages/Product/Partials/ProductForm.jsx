import React from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import InputSelect from "@/Components/InputSelect.jsx";
import Textarea from "@/Components/Textarea.jsx";

const ProductForm = ({product = null, categories, suppliers}) => {
    const {data, setData, post, patch, processing, reset, errors, isDirty} = useForm({
        category: product?.category_id ?? '',
        supplier: product?.supplier_id ?? '',
        name: product?.name ?? '',
        description: product?.description ?? '',
        type: product?.type ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        product ? patch(route('products.update', product), {
                onSuccess: () => reset()
            }) :
            post(route('products.store'), {
                onSuccess: () => reset()
            });
    };

    const productTypeOptions = [
        {value: 'weight', label: 'Weight'},
        {value: 'quantity', label: 'Quantity'},
    ];

    const categoryOptions = categories.map((category) => {
        return {
            value: category.id,
            label: category.name,
        };
    });

    const supplierOptions = suppliers.map((supplier) => {
        return {
            value: supplier.id,
            label: supplier.name,
        };
    });

    return (
        <ShadowBox className='w-3/4 mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <InputLabel>Product Name:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter product name"
                    />
                    <InputError message={errors.name}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Product Description:</InputLabel>
                    <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Enter product description"
                    />
                    <InputError message={errors.description}/>
                </div>
                <div className='mb-2'>
                    <InputSelect
                        id="category_id"
                        label="Product Category"
                        options={categoryOptions}
                        value={data.category}
                        onChange={(option) => setData('category', option ? option.value : '')}
                        error={!!errors.category}
                        required={true}
                        errorMsg={errors.category}
                        className="w-full"
                    />
                </div>
                <div className='mb-2'>
                    <InputSelect
                        id="supplier_id"
                        label="Product Supplier"
                        options={supplierOptions}
                        onChange={(option) => setData('supplier', option ? option.value : '')}
                        error={!!errors.supplier}
                        value={data.supplier}
                        required={true}
                        errorMsg={errors.supplier}
                        className="w-full"
                    />
                </div>
                <div className='mb-2'>
                    <InputSelect
                        id="type"
                        label="Product Type"
                        options={productTypeOptions}
                        onChange={(option) => setData('type', option ? option.value : '')}
                        error={!!errors.type}
                        value={data.type}
                        required={true}
                        errorMsg={errors.type}
                        className="w-full"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={processing || !isDirty || !data.supplier || !data.category || !data.name || !data.description || !data.type}
                    className="mt-3"
                >
                    {processing ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </ShadowBox>
    );
};

export default ProductForm;

