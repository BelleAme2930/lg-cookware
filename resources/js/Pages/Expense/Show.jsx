import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";

const Show = ({expense}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Expense Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('expenses.edit', expense)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('expenses.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Expense Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Name'>{expense.name}</LabelValue>
                    <LabelValue title='Description'>{expense.description}</LabelValue>
                    <LabelValue title='Amount'>{expense.amount} Rs.</LabelValue>
                    <LabelValue title='Expense Date'>{expense.expense_date_display}</LabelValue>
                    <LabelValue title='Paid Date'>{expense.paid_date}</LabelValue>
                    <LabelValue title='Status' lastRow={true}>
                        <span
                            className={`text-${expense.status === 'Paid' ? 'green' : 'red'}-600 bg-${expense.status === 'Paid' ? 'green' : 'red'}-200 p-2 font-medium`}>{expense.status}</span>
                    </LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
