import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";

const Show = ({customer}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Customer Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('customers.edit', customer)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('customers.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Customer Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Name'>{customer.name}</LabelValue>
                    <LabelValue title='Email'>{customer.email}</LabelValue>
                    <LabelValue title='Phone'>{customer.phone}</LabelValue>
                    <LabelValue title='Address'>{customer.address}</LabelValue>
                    <LabelValue title='Opening Balance'>
                        {customer.opening_balance < 0
                            ? `${Math.abs(customer.opening_balance)} Rs. (Credit)`
                            : `${customer.opening_balance} Rs. (Debit)`}
                    </LabelValue>
                    <LabelValue title='Current Balance'>
                        {customer.current_balance < 0
                            ? `${Math.abs(customer.current_balance)} Rs. (Credit)`
                            : `${customer.current_balance} Rs. (Debit)`}
                    </LabelValue>
                    <LabelValue title='Created Date'>{customer.created_at}</LabelValue>
                    <LabelValue title='Status' lastRow={true}>
                        <span
                            className={`text-${customer.status_display === 'Active' ? 'green' : 'red'}-600 bg-${customer.status_display === 'Active' ? 'green' : 'red'}-200 p-2 font-medium`}>{customer.status_display}</span>
                    </LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
