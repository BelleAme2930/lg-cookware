import React from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import Textarea from "@/Components/Textarea.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import InputSelect from "@/Components/InputSelect.jsx";

const SupplierForm = ({supplier = null}) => {
    const {data, setData, post, patch, processing, reset, errors, isDirty} = useForm({
        name: supplier?.name ?? '',
        email: supplier?.email ?? '',
        phone: supplier?.phone ?? '',
        address: supplier?.address ?? '',
        opening_balance: supplier?.opening_balance ? Math.abs(supplier.opening_balance) : 0,
        balance_type: supplier?.opening_balance >= 0 ? 'debit' : 'credit',
        status: supplier?.status !== 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate the actual balance value based on the balance type
        const calculatedOpeningBalance =
            data.balance_type === 'credit'
                ? -Math.abs(data.opening_balance)
                : Math.abs(data.opening_balance);

        const formData = {
            ...data,
            opening_balance: calculatedOpeningBalance,
        };

        supplier
            ? patch(route('suppliers.update', supplier), formData, {
                onSuccess: () => reset()
            })
            : post(route('suppliers.store'), formData, {
                onSuccess: () => reset()
            });
    };

    return (
        <ShadowBox>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <InputLabel>Supplier Name:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter supplier name"
                    />
                    <InputError message={errors.name}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Supplier Email:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter supplier email"
                    />
                    <InputError message={errors.email}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Supplier Phone Number:</InputLabel>
                    <TextInput
                        type="number"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="Enter supplier phone"
                    />
                    <InputError message={errors.phone}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Supplier Address:</InputLabel>
                    <Textarea
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Enter supplier address"
                    />
                    <InputError message={errors.address}/>
                </div>
                {!supplier ? (
                    <div className='mb-4'>
                        <div className='flex gap-4'>
                            <div className='flex-1'>
                                <InputLabel>Opening Balance:</InputLabel>
                                <TextInput
                                    type="number"
                                    value={data.opening_balance}
                                    onChange={(e) => setData('opening_balance', e.target.value)}
                                    placeholder="Enter opening balance"
                                    min="0"
                                />
                                <InputError message={errors.opening_balance}/>
                            </div>
                            <div className='w-64'>
                                <InputLabel>Balance Type:</InputLabel>
                                <InputSelect
                                    id="balance_type"
                                    options={[
                                        {label: 'Debit (Supplier Owes)', value: 'debit'},
                                        {label: 'Credit (We Owe)', value: 'credit'},
                                    ]}
                                    value={data.balance_type}
                                    onChange={(option) => setData('balance_type', option ? option.value : 'debit')}
                                    error={!!errors.balance_type}
                                    required={true}
                                    errorMsg={errors.balance_type}
                                    className="w-full"
                                />
                                <InputError message={errors.balance_type}/>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500 mt-1'>
                            {data.balance_type === 'debit'
                                ? 'Debit: Supplier owes you money'
                                : 'Credit: You owe supplier money (advance payment)'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className='mb-4'>
                            <div className='flex gap-4'>
                                <div className='flex-1'>
                                    <InputLabel>Opening Balance:</InputLabel>
                                    <TextInput
                                        type="number"
                                        value={data.opening_balance}
                                        onChange={(e) => setData('opening_balance', e.target.value)}
                                        placeholder="Enter opening balance"
                                        min="0"
                                    />
                                    <InputError message={errors.opening_balance}/>
                                </div>
                                <div className='w-40'>
                                    <InputLabel>Balance Type:</InputLabel>
                                    <InputSelect
                                        id="balance_type"
                                        options={[
                                            {label: 'Debit (Supplier Owes)', value: 'debit'},
                                            {label: 'Credit (We Owe)', value: 'credit'},
                                        ]}
                                        value={data.balance_type}
                                        onChange={(option) => setData('balance_type', option ? option.value : 'debit')}
                                        error={!!errors.balance_type}
                                        required={true}
                                        errorMsg={errors.balance_type}
                                        className="w-full"
                                    />
                                    <InputError message={errors.balance_type}/>
                                </div>
                            </div>
                            <p className='text-sm text-gray-500 mt-1'>
                                {data.balance_type === 'debit'
                                    ? 'Debit: Supplier owes you money'
                                    : 'Credit: You owe supplier money (advance payment)'}
                            </p>
                        </div>
                        <div className='mb-2'>
                            <InputSelect
                                id="status"
                                label="Status"
                                options={[
                                    {label: 'Active', value: true},
                                    {label: 'Inactive', value: false},
                                ]}
                                value={data.status}
                                onChange={(option) => setData('status', option ? option.value : '')}
                                error={!!errors.status}
                                required={false}
                                errorMsg={errors.status}
                                className="w-full"
                            />
                        </div>
                    </>
                )}
                <Button
                    type="submit"
                    disabled={processing || !isDirty}
                    className="mt-3"
                >
                    {processing ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </ShadowBox>
    );
};

export default SupplierForm;
