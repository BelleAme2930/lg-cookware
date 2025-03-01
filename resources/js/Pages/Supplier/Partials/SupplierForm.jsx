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
        opening_balance: supplier?.opening_balance ?? 0,
        status: supplier?.status !== 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        supplier ? patch(route('suppliers.update', supplier), {
                onSuccess: () => reset()
            }) :
            post(route('suppliers.store'), {
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
                    <div className='mb-2'>
                        <InputLabel>Opening Balance:</InputLabel>
                        <TextInput
                            type="number"
                            value={data.opening_balance}
                            onChange={(e) => setData('opening_balance', e.target.value)}
                            placeholder="Enter opening balance"
                        />
                        <InputError message={errors.opening_balance}/>
                    </div>
                ) : (
                    <>
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

