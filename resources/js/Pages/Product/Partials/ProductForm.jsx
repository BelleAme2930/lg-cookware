import React, {useEffect} from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import InputSelect from "@/Components/InputSelect.jsx";
import Textarea from "@/Components/Textarea.jsx";
import ProductSizes from "@/Pages/Product/Partials/ProductSizes.jsx";

const ProductForm = ({product = null, categories, suppliers}) => {
    const {data, setData, post, patch, processing, reset, errors} = useForm({
        category: product?.category_id ?? '',
        supplier: product?.supplier_id ?? '',
        name: product?.name ?? '',
        description: product?.description ?? '',
        type: product?.type ?? '',
        sizes: product?.sizes ?? [],
    });

    useEffect(() => {
        if (product && product.sizes) {
            setData('sizes', product.sizes);
        }
    }, [product]);

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

    const canSubmit = () => {
        if (!data.isDirty || !data.name || !data.description || !data.category || !data.supplier || !data.type) {
            return false;
        }

        if (!data.sizes || data.sizes.length === 0) {
            return false;
        }

        return data.sizes.every(size =>
            size.name && size.purchase_price && size.sale_price &&
            (size.quantity || size.quantity === 0) &&
            (data.type !== 'weight' || (size.weight || size.weight === 0))
        );
    };


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
                        onChange={(option) => {
                            const newType = option ? option.value : '';
                            setData('type', newType);
                            if (newType !== data.type) {
                                setData('sizes', []);
                            }
                        }}
                        error={!!errors.type}
                        value={data.type}
                        required={true}
                        errorMsg={errors.type}
                        className="w-full"
                    />
                </div>
                {data.type && (
                    <ProductSizes
                        value={data.sizes}
                        onChange={(sizes) => {
                            setData('sizes', sizes);
                            setData('isDirty', true);
                        }}
                        errors={errors}
                        productType={data.type}
                    />
                )}
                <Button
                    type="submit"
                    disabled={processing || !canSubmit()}
                    className="mt-3"
                >
                    {processing ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </ShadowBox>
    );
};

export default ProductForm;

