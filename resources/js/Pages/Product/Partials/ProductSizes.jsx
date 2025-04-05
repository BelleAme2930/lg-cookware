import React, { useState, useEffect } from 'react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import IconButton from "@/Components/IconButton.jsx";
import {FaTrash} from "react-icons/fa";

const ProductSizes = ({ value = [], onChange, errors = {}, productType }) => {
    const [sizes, setSizes] = useState(value);

    useEffect(() => {
        if (productType && sizes.length === 0) {
            handleAddSize();
        }
    }, [productType]);

    const handleAddSize = () => {
        const newSize = {
            name: '',
            purchase_price: '',
            sale_price: '',
            weight: productType === 'weight' ? '' : null,
            quantity: '0'
        };

        const newSizes = [...sizes, newSize];
        setSizes(newSizes);
        onChange(newSizes);
    };

    const handleRemoveSize = (index) => {
        const newSizes = [...sizes];
        newSizes.splice(index, 1);
        setSizes(newSizes);
        onChange(newSizes);
    };

    const handleSizeChange = (index, field, value) => {
        const newSizes = [...sizes];
        newSizes[index][field] = value;
        setSizes(newSizes);
        onChange(newSizes);
    };

    return (
        <div className="mb-4 border border-gray-300 px-4 py-2">
            <div className="flex justify-between items-center mb-2">
                <InputLabel>Product Sizes</InputLabel>
                <Button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-1 text-sm"
                >
                    Add Size
                </Button>
            </div>

            {sizes.length === 0 && (
                <div className="text-gray-500 text-sm mb-2">No sizes added yet. Click "Add Size" to add product size.</div>
            )}

            {sizes.map((size, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-2 items-start border p-3 rounded">
                    <div className="w-full flex-1">
                        <InputLabel className="text-sm">Size Name</InputLabel>
                        <TextInput
                            type="text"
                            value={size.name}
                            onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                            placeholder="e.g. S, M, L, XL"
                            className="w-full"
                        />
                        {errors[`sizes.${index}.name`] && (
                            <InputError message={errors[`sizes.${index}.name`]} />
                        )}
                    </div>

                    <div className="w-full flex-1">
                        <InputLabel className="text-sm">Purchase Price</InputLabel>
                        <TextInput
                            type="number"
                            value={size.purchase_price}
                            onChange={(e) => handleSizeChange(index, 'purchase_price', e.target.value)}
                            placeholder="0"
                            className="w-full"
                        />
                        {errors[`sizes.${index}.purchase_price`] && (
                            <InputError message={errors[`sizes.${index}.purchase_price`]} />
                        )}
                    </div>

                    <div className="w-full flex-1">
                        <InputLabel className="text-sm">Sale Price</InputLabel>
                        <TextInput
                            type="number"
                            value={size.sale_price}
                            onChange={(e) => handleSizeChange(index, 'sale_price', e.target.value)}
                            placeholder="0"
                            className="w-full"
                        />
                        {errors[`sizes.${index}.sale_price`] && (
                            <InputError message={errors[`sizes.${index}.sale_price`]} />
                        )}
                    </div>

                    {/*<div className="w-full flex-1">*/}
                    {/*    <InputLabel className="text-sm">Quantity</InputLabel>*/}
                    {/*    <TextInput*/}
                    {/*        type="number"*/}
                    {/*        value={size.quantity}*/}
                    {/*        onChange={(e) => handleSizeChange(index, 'quantity', e.target.value)}*/}
                    {/*        placeholder="0"*/}
                    {/*        className="w-full"*/}
                    {/*    />*/}
                    {/*    {errors[`sizes.${index}.quantity`] && (*/}
                    {/*        <InputError message={errors[`sizes.${index}.quantity`]} />*/}
                    {/*    )}*/}
                    {/*</div>*/}

                    {/* Show weight field only for weight type products */}
                    {productType === 'weight' && (
                        <div className="w-full flex-1">
                            <InputLabel className="text-sm">Weight</InputLabel>
                            <TextInput
                                type="number"
                                value={size.weight}
                                onChange={(e) => handleSizeChange(index, 'weight', e.target.value)}
                                placeholder="0"
                                className="w-full"
                            />
                            {errors[`sizes.${index}.weight`] && (
                                <InputError message={errors[`sizes.${index}.weight`]} />
                            )}
                        </div>
                    )}

                    <div className="flex justify-end w-full md:w-auto md:self-end">
                        <IconButton
                            icon={<FaTrash/>}
                            type="button"
                            onClick={() => handleRemoveSize(index)}
                            disabled={sizes.length === 1}
                        >
                            Remove
                        </IconButton>
                    </div>
                </div>
            ))}

            {errors.sizes && !Array.isArray(errors.sizes) && (
                <InputError message={errors.sizes} />
            )}
        </div>
    );
};

export default ProductSizes;
