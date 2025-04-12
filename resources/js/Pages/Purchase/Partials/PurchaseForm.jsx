import React, {useEffect, useState} from 'react';
import {useForm} from "@inertiajs/react";
import InputSelect from "@/Components/InputSelect.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import Button from "@/Components/Button.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import Textarea from "@/Components/Textarea.jsx";
import IconButton from "@/Components/IconButton.jsx";
import {FaTrash} from "react-icons/fa";

const PurchaseForm = ({purchase, suppliers, products}) => {

    const formattedProducts = purchase?.items ? formatExistingItems(purchase.items) : [];

    const [selectedProductIds, setSelectedProductIds] = useState(
        formattedProducts.map(item => item.product_id)
    );

    const {data, setData, errors, processing, post, patch, reset} = useForm({
        supplier: purchase?.supplier_id ?? '',
        purchase_date: purchase?.purchase_date ?? '',
        notes: purchase?.notes ?? '',
        products: purchase?.items ? formatExistingItems(purchase.items) : [],
    });

    function formatExistingItems(items) {
        return items.map(item => ({
            product_id: item.product_size.product_id,
            sizes: [{
                value: item.product_size.id,
                label: item.product_size.name,
                quantity: item.quantity,
                price: item.unit_price,
                weight: item.weight
            }]
        }));
    }

    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));

    const filteredProducts = data.supplier
        ? products.filter(product => product.supplier_id === data.supplier)
        : [];

    const productOptions = filteredProducts
        .filter(product => !selectedProductIds.includes(product.id))
        .map((product) => ({
            value: product.id,
            label: product.name,
        }));

    const handleAddProduct = (option) => {
        if (!option) return;

        const productId = option.value;
        const newProduct = {
            product_id: productId,
            sizes: []
        };

        setData('products', [...data.products, newProduct]);
        setSelectedProductIds([...selectedProductIds, productId]);
    };

    const handleRemoveProduct = (productId) => {
        setData('products', data.products.filter(p => p.product_id !== productId));
        setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
    };

    const getProductById = (productId) => {
        return products.find(product => product.id === productId);
    };

    const handleSizeChange = (productId, selectedSizes) => {
        setData('products', data.products.map(product =>
            product.product_id === productId
                ? {...product, sizes: selectedSizes || []}
                : product
        ));
    };

    const handleQuantityChange = (productId, sizeId, value) => {
        setData('products', data.products.map(product =>
            product.product_id === productId
                ? {
                    ...product,
                    sizes: product.sizes.map(size =>
                        size.value === sizeId ? {...size, quantity: value} : size
                    )
                }
                : product
        ));
    };

    const handlePriceChange = (productId, sizeId, value) => {
        setData('products', data.products.map(product =>
            product.product_id === productId
                ? {
                    ...product,
                    sizes: product.sizes.map(size =>
                        size.value === sizeId ? {...size, price: value} : size
                    )
                }
                : product
        ));
    };

    const handleWeightChange = (productId, sizeId, value) => {
        setData('products', data.products.map(product =>
            product.product_id === productId
                ? {
                    ...product,
                    sizes: product.sizes.map(size =>
                        size.value === sizeId ? {...size, weight: value} : size
                    )
                }
                : product
        ));
    };

    const calculateTotalAmount = () => {
        let total = 0;
        data.products.forEach(product => {
            const productData = getProductById(product.product_id);
            if (!productData) return;

            product.sizes.forEach(size => {
                if (productData.type === 'weight') {
                    const weight = parseFloat(size.weight) || 0;
                    const price = parseFloat(size.price) || 0;
                    total += weight * price;
                } else {
                    const quantity = parseFloat(size.quantity) || 0;
                    const price = parseFloat(size.price) || 0;
                    total += quantity * price;
                }
            });
        });
        return total;
    };

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            total_amount: calculateTotalAmount()
        }));
    }, [data.products]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const finalData = {
        //     ...data,
        //     total_amount: calculateTotalAmount(),
        // };

        purchase
            ? patch(route('purchases.update', purchase), {
                onSuccess: () => reset()
            })
            : post(route('purchases.store'), {
                onSuccess: () => reset()
            });
    };
    console.log(data.products)

    return (
        <ShadowBox className='w-3/4 mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <InputSelect
                        id="supplier_id"
                        label="Product Supplier"
                        options={supplierOptions}
                        onChange={(option) => {
                            setData('supplier', option ? option.value : '');
                            setData('products', []);
                            setSelectedProductIds([]);
                        }}
                        error={!!errors.supplier}
                        value={data.supplier}
                        required={true}
                        errorMsg={errors.supplier}
                        className="w-full"
                    />
                </div>

                <div className='mb-4'>
                    <InputLabel>Purchase Date:</InputLabel>
                    <TextInput
                        type="date"
                        value={data.purchase_date}
                        onChange={(e) => setData('purchase_date', e.target.value)}
                        placeholder="Enter purchase date"
                        className="w-full"
                    />
                    <InputError message={errors.purchase_date}/>
                </div>

                <div className='mb-4'>
                    <InputLabel>Notes:</InputLabel>
                    <Textarea
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        placeholder="Enter purchase notes (optional)"
                        className="w-full"
                    />
                </div>

                {data.supplier && (
                    <div className='mb-4'>
                        <h3 className='text-lg font-medium mb-2'>Products</h3>
                        <div className='flex items-center justify-between mb-2'>
                            <InputSelect
                                id="add_product"
                                label="Add Product"
                                options={productOptions}
                                onChange={handleAddProduct}
                                placeholder="Select product to add"
                                className="w-full"
                            />
                        </div>

                        {data.products.length === 0 && (
                            <div className='text-sm text-red-500 text-center p-2 bg-gray-100'>
                                No products added yet. Use the dropdown above to add products.
                            </div>
                        )}

                        <div>
                            {data.products.map((productEntry, index) => {
                                const product = getProductById(productEntry.product_id);
                                if (!product) return null;

                                const sizeOptions = product.sizes.map(size => ({
                                    value: size.id,
                                    label: size.name,
                                }));
                                console.log(productEntry, 'productEntry')

                                return (
                                    <div key={index} className='mb-6 border border-gray-200 rounded-md p-4'>
                                        <div className='flex items-center justify-between mb-3'>
                                            <h4 className='font-semibold text-gray-800'>{product.name}</h4>
                                            <IconButton
                                                icon={<FaTrash/>}
                                                type="button"
                                                onClick={() => handleRemoveProduct(productEntry.product_id)}
                                                className="text-xs !p-1.5"
                                            />
                                        </div>

                                        <div className='mb-3'>
                                            <InputSelect
                                                id={`sizes_${index}`}
                                                label="Select Sizes"
                                                options={sizeOptions}
                                                isMulti
                                                onChange={(selectedOptions) => handleSizeChange(productEntry.product_id, selectedOptions)}
                                                value={productEntry.sizes}
                                                className="w-full"
                                            />
                                        </div>

                                        {productEntry.sizes.length > 0 && (
                                            <div className='mt-3'>
                                                {productEntry.sizes.map((size, sizeIndex) => (
                                                    <div
                                                        key={sizeIndex}
                                                        className='mb-2 bg-gray-100 p-3 rounded'
                                                    >
                                                        <div className='text-sm font-semibold text-gray-700 mb-2'>
                                                            {size.label}:
                                                        </div>
                                                        <div className='flex items-center gap-3 flex-wrap'>
                                                            {product.type === 'weight' && (
                                                                <div className='flex-1 min-w-[150px]'>
                                                                    <InputLabel>Weight</InputLabel>
                                                                    <TextInput
                                                                        type="number"
                                                                        step="0.01"
                                                                        value={size.weight || ''}
                                                                        onChange={(e) => handleWeightChange(
                                                                            productEntry.product_id,
                                                                            size.value,
                                                                            e.target.value
                                                                        )}
                                                                        placeholder="Enter weight"
                                                                        className="w-full"
                                                                    />
                                                                    {errors[`products.${index}.sizes.${sizeIndex}.weight`] && (
                                                                        <InputError
                                                                            message={errors[`products.${index}.sizes.${sizeIndex}.weight`]}/>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div className='flex-1 min-w-[150px]'>
                                                                <InputLabel>Quantity</InputLabel>
                                                                <TextInput
                                                                    type="number"
                                                                    min="1"
                                                                    value={size.quantity || ''}
                                                                    onChange={(e) => handleQuantityChange(
                                                                        productEntry.product_id,
                                                                        size.value,
                                                                        e.target.value
                                                                    )}
                                                                    placeholder="Enter quantity"
                                                                    className="w-full"
                                                                />
                                                                {errors[`products.${index}.sizes.${sizeIndex}.quantity`] && (
                                                                    <InputError
                                                                        message={errors[`products.${index}.sizes.${sizeIndex}.quantity`]}/>
                                                                )}
                                                            </div>
                                                            <div className='flex-1'>
                                                                <InputLabel>Purchase Price</InputLabel>
                                                                <TextInput
                                                                    type="number"
                                                                    step="0.01"
                                                                    min="0"
                                                                    value={size.price || ''}
                                                                    onChange={(e) => handlePriceChange(
                                                                        productEntry.product_id,
                                                                        size.value,
                                                                        e.target.value
                                                                    )}
                                                                    placeholder="Enter price"
                                                                    className="w-full"
                                                                />
                                                                {errors[`products.${index}.sizes.${sizeIndex}.price`] && (
                                                                    <InputError
                                                                        message={errors[`products.${index}.sizes.${sizeIndex}.price`]}/>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {data.products.length > 0 && (
                    <div className='mb-4 text-right'>
                        <div className='text-lg font-semibold'>
                            Total: {calculateTotalAmount()} Rs.
                        </div>
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={processing || data.products.length === 0}
                    className="mt-3"
                >
                    {processing ? 'Submitting...' : 'Submit Purchase'}
                </Button>
            </form>
        </ShadowBox>
    );
};

export default PurchaseForm;
