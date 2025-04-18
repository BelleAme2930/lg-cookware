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
import {FaPlus, FaTrash} from "react-icons/fa";

const PurchaseForm = ({purchase, suppliers, products, accounts}) => {
    console.log(purchase)

    const formattedProducts = purchase?.items ? formatExistingItems(purchase.items) : [];

    const [selectedProductIds, setSelectedProductIds] = useState(
        formattedProducts.map(item => item.product_id)
    );

    const paymentMethods = [
        {value: 'cash', label: 'Cash'},
        {value: 'transfer', label: 'Transfer'},
        {value: 'credit', label: 'Credit'},
        {value: 'cheque', label: 'Cheque'},
    ];

    const {data, setData, errors, processing, post, patch, reset} = useForm({
        supplier: purchase?.supplier_id ?? '',
        purchase_date: purchase?.purchase_date ?? '',
        notes: purchase?.notes ?? '',
        products: purchase?.items ? formatExistingItems(purchase.items) : [],
        payments: purchase?.payments ? formatExistingPayments(purchase.payments) : [],
        total_amount: purchase?.total_amount ?? 0,
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

    function formatExistingPayments(payments) {
        return payments.map(payment => ({
            method: payment.method,
            amount: payment.amount,
            payment_date: payment.payment_date,
            notes: payment.notes || '',
            due_date: payment.due_date || '',
            remaining_balance: payment.remaining_balance || '',
            account_id: payment.account_id || '',
            cheque_number: payment.cheque_number || '',
            bank_name: payment.bank_name || '',
        }));
    }

    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
    }));

    const accountOptions = accounts?.map((account) => ({
        value: account.id,
        label: account.title + ' - ' + account.bank_name,
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

    const calculateTotalPaymentAmount = () => {
        return data.payments.reduce((sum, payment) => {
            return sum + (parseFloat(payment.amount) || 0);
        }, 0);
    };

    const getRemainingBalance = () => {
        const total = calculateTotalAmount();
        const paid = calculateTotalPaymentAmount();
        return Math.max(0, total - paid);
    };

    useEffect(() => {
        getRemainingBalance();
    }, [data]);

    const handleAddPayment = () => {
        const newPayment = {
            method: 'cash',
            amount: '',
            payment_date: data.purchase_date || new Date().toISOString().split('T')[0],
            notes: '',
            due_date: '',
            remaining_balance: '',
            account_id: '',
            cheque_number: '',
            bank_name: '',
        };

        setData('payments', [...data.payments, newPayment]);
    };

    const handleRemovePayment = (index) => {
        setData('payments', data.payments.filter((_, i) => i !== index));
    };

    const handlePaymentChange = (index, field, value) => {
        setData('payments', data.payments.map((payment, i) =>
            i === index ? {...payment, [field]: value} : payment
        ));
    };

    useEffect(() => {
        setData(prevData => ({
            ...prevData,
            total_amount: calculateTotalAmount()
        }));
    }, [data.products]);

    useEffect(() => {
        // Update remaining balance for credit payments when payment amounts change
        if (data.payments.length > 0) {
            const updatedPayments = data.payments.map(payment => {
                if (payment.method === 'credit') {
                    return { ...payment, remaining_balance: getRemainingBalance().toString() };
                }
                return payment;
            });

            // Only update if there's a difference to avoid infinite loops
            const needsUpdate = updatedPayments.some((payment, i) =>
                payment.method === 'credit' &&
                payment.remaining_balance !== data.payments[i].remaining_balance
            );

            if (needsUpdate) {
                setData('payments', updatedPayments);
            }
        }
    }, [data.products, data.payments]);

    const handleSubmit = (e) => {
        e.preventDefault();

        purchase
            ? patch(route('purchases.update', purchase), {
                onSuccess: () => reset()
            })
            : post(route('purchases.store'), {
                onSuccess: () => reset()
            });
    };

    const bankOptions = [
        { value: 'Bank Alfalah', label: 'Bank Alfalah' },
        { value: 'HBL Bank', label: 'HBL Bank' },
        { value: 'UBL Bank', label: 'UBL Bank' },
        { value: 'Meezan Bank', label: 'Meezan Bank' },
        { value: 'Jazzcash', label: 'Jazzcash' },
        { value: 'Easypaisa', label: 'Easypaisa' },
        { value: 'Nayapay', label: 'Nayapay' },
    ];

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
                    <>
                        <div className='mb-4 text-right'>
                            <div className='text-lg font-semibold'>
                                Total: {calculateTotalAmount().toLocaleString()} Rs.
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='flex items-center justify-between mb-2'>
                                <h3 className='text-lg font-medium'>Payment Details</h3>
                                <Button
                                    type="button"
                                    onClick={handleAddPayment}
                                    className="flex items-center gap-1 !py-1 !px-2"
                                >
                                    <FaPlus size={12}/> Add Payment
                                </Button>
                            </div>

                            {data.payments.length === 0 && (
                                <div className='text-sm text-red-500 text-center p-2 bg-gray-100 rounded mb-3'>
                                    No payments added yet. Click "Add Payment" to record payment details.
                                </div>
                            )}

                            {data.payments.map((payment, index) => (
                                <div key={index} className='mb-4 border border-gray-200 rounded-md p-4'>
                                    <div className='flex items-center justify-between mb-3'>
                                        <h4 className='font-semibold text-gray-800'>Payment #{index + 1}</h4>
                                        <IconButton
                                            icon={<FaTrash/>}
                                            type="button"
                                            onClick={() => handleRemovePayment(index)}
                                            className="text-xs !p-1.5"
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                                        <div>
                                            <InputSelect
                                                id={`payment_method_${index}`}
                                                label="Payment Method"
                                                options={paymentMethods}
                                                onChange={(option) => handlePaymentChange(index, 'method', option.value)}
                                                value={payment.method}
                                                required={true}
                                                errorMsg={errors[`payments.${index}.method`]}
                                                className="w-full"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel>Amount</InputLabel>
                                            <TextInput
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={payment.amount}
                                                onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
                                                placeholder="Enter amount"
                                                className="w-full"
                                                required
                                            />
                                            <InputError message={errors[`payments.${index}.amount`]}/>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3'>
                                        <div>
                                            <InputLabel>Payment Date</InputLabel>
                                            <TextInput
                                                type="date"
                                                value={payment.payment_date}
                                                onChange={(e) => handlePaymentChange(index, 'payment_date', e.target.value)}
                                                placeholder="Enter payment date"
                                                className="w-full"
                                                required
                                            />
                                            <InputError message={errors[`payments.${index}.payment_date`]}/>
                                        </div>
                                        <div>
                                            <InputLabel>Notes</InputLabel>
                                            <TextInput
                                                type="text"
                                                value={payment.notes}
                                                onChange={(e) => handlePaymentChange(index, 'notes', e.target.value)}
                                                placeholder="Enter payment notes (optional)"
                                                className="w-full"
                                            />
                                            <InputError message={errors[`payments.${index}.notes`]}/>
                                        </div>
                                    </div>

                                    {/* Conditional fields based on payment method */}
                                    {payment.method === 'credit' && (
                                        <div
                                            className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 mt-2 bg-gray-50 p-3 rounded'>
                                            <div>
                                                <InputLabel>Due Date</InputLabel>
                                                <TextInput
                                                    type="date"
                                                    value={payment.due_date}
                                                    onChange={(e) => handlePaymentChange(index, 'due_date', e.target.value)}
                                                    placeholder="Enter due date"
                                                    className="w-full"
                                                    required
                                                />
                                                <InputError message={errors[`payments.${index}.due_date`]}/>
                                            </div>
                                            <div>
                                                <InputLabel>Remaining Balance</InputLabel>
                                                <TextInput
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={payment.remaining_balance || getRemainingBalance()}
                                                    onChange={(e) => handlePaymentChange(index, 'remaining_balance', e.target.value)}
                                                    placeholder="Enter remaining balance"
                                                    className="w-full"
                                                    required
                                                />
                                                <InputError message={errors[`payments.${index}.remaining_balance`]}/>
                                            </div>
                                        </div>
                                    )}

                                    {payment.method === 'transfer' && (
                                        <div className='mb-3 mt-2 bg-gray-50 p-3 rounded'>
                                            <div>
                                                <InputSelect
                                                    id={`account_id_${index}`}
                                                    label="Account"
                                                    options={accountOptions}
                                                    onChange={(option) => handlePaymentChange(index, 'account_id', option.value)}
                                                    value={payment.account_id}
                                                    required={true}
                                                    errorMsg={errors[`payments.${index}.account_id`]}
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {payment.method === 'cheque' && (
                                        <div
                                            className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 mt-2 bg-gray-50 p-3 rounded'>
                                            <div>
                                                <InputLabel>Cheque Number</InputLabel>
                                                <TextInput
                                                    type="text"
                                                    value={payment.cheque_number}
                                                    onChange={(e) => handlePaymentChange(index, 'cheque_number', e.target.value)}
                                                    placeholder="Enter cheque number"
                                                    className="w-full"
                                                    required
                                                />
                                                <InputError message={errors[`payments.${index}.cheque_number`]}/>
                                            </div>
                                            <div>
                                                <InputSelect
                                                    id="bank_name"
                                                    label="Bank Name"
                                                    options={bankOptions}
                                                    value={payment.bank_name}
                                                    // onChange={(e) => handlePaymentChange(index, 'bank_name', e.target.value)}
                                                    onChange={(option) => handlePaymentChange(index,'bank_name', option ? option.value : '')}
                                                    error={!!errors.bank_name}
                                                    required={true}
                                                    errorMsg={errors.bank_name}
                                                    className="w-full"
                                                />
                                                <InputError message={errors[`payments.${index}.bank_name`]}/>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {data.payments.length > 0 && (
                                <div className='flex justify-between p-3 bg-gray-100 rounded-md mt-2'>
                                    <div className='font-medium'>Payment Summary</div>
                                    <div className='text-right'>
                                        <div>Total Purchase: {calculateTotalAmount().toLocaleString()} Rs.</div>
                                        <div>Total Paid: {calculateTotalPaymentAmount().toLocaleString()} Rs.</div>
                                        <div
                                            className={getRemainingBalance() > 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                                            {getRemainingBalance() > 0
                                                ? `Remaining: ${getRemainingBalance().toLocaleString()} Rs.`
                                                : 'Fully Paid'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
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
