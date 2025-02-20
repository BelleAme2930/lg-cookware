import React from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import Textarea from "@/Components/Textarea.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import InputSelect from "@/Components/InputSelect.jsx";

const AccountForm = ({account = null}) => {
    const {data, setData, post, patch, processing, reset, errors, isDirty} = useForm({
        title: account?.title ?? '',
        account_number: account?.account_number ?? '',
        bank_name: account?.bank_name ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        account ? patch(route('accounts.update', account), {
                onSuccess: () => reset()
            }) :
            post(route('accounts.store'), {
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
                <div className='mb-2'>
                    <InputLabel>Account Title:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Enter account title"
                    />
                    <InputError message={errors.title}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Account Number:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.account_number}
                        onChange={(e) => setData('account_number', e.target.value)}
                        placeholder="Enter account number"
                    />
                    <InputError message={errors.account_number}/>
                </div>
                <div className='mb-2'>
                    <InputSelect
                        id="bank_name"
                        label="Bank Name"
                        options={bankOptions}
                        value={data.bank_name}
                        onChange={(option) => setData('bank_name', option ? option.value : '')}
                        error={!!errors.bank_name}
                        required={true}
                        errorMsg={errors.bank_name}
                        className="w-full"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={processing || !isDirty || !data.title || !data.account_number || !data.bank_name}
                    className="mt-3"
                >
                    {processing ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </ShadowBox>
    );
};

export default AccountForm;

