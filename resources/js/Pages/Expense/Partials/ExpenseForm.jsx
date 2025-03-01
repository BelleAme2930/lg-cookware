import React from 'react';
import {useForm} from "@inertiajs/react";
import TextInput from "@/Components/TextInput.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Button from "@/Components/Button.jsx";
import InputError from "@/Components/InputError.jsx";
import Textarea from "@/Components/Textarea.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";

const ExpenseForm = ({expense = null}) => {
    const {data, setData, post, patch, processing, reset, errors, isDirty} = useForm({
        name: expense?.name ?? '',
        description: expense?.description ?? '',
        amount: expense?.amount ?? 0,
        expense_date: expense?.expense_date ?? '',
        paid_date: expense?.paid_date ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        expense ? patch(route('expenses.update', expense), {
                onSuccess: () => reset()
            }) :
            post(route('expenses.store'), {
                onSuccess: () => reset()
            });
    };

    return (
        <ShadowBox>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <InputLabel>Expense Name:</InputLabel>
                    <TextInput
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter expense name"
                    />
                    <InputError message={errors.name}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Expense Description:</InputLabel>
                    <Textarea
                        placeholder='Enter Expense Description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <InputLabel>Expense Amount:</InputLabel>
                    <TextInput
                        type="number"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        placeholder="Enter expense amount"
                    />
                    <InputError message={errors.amount}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Expense Date:</InputLabel>
                    <TextInput
                        type="date"
                        value={data.expense_date}
                        onChange={(e) => setData('expense_date', e.target.value)}
                        placeholder="Enter expense date"
                    />
                    <InputError message={errors.expense_date}/>
                </div>
                <div className='mb-2'>
                    <InputLabel>Paid Date:</InputLabel>
                    <TextInput
                        type="date"
                        value={data.paid_date}
                        onChange={(e) => setData('paid_date', e.target.value)}
                        placeholder="Enter expense date"
                    />
                    <InputError message={errors.paid_date}/>
                </div>
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

export default ExpenseForm;

