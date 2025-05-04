import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";

const Show = ({supplier}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Supplier Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('suppliers.edit', supplier)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('suppliers.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Supplier Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Name'>{supplier.name}</LabelValue>
                    <LabelValue title='Email'>{supplier.email}</LabelValue>
                    <LabelValue title='Phone'>{supplier.phone}</LabelValue>
                    <LabelValue title='Address'>{supplier.address}</LabelValue>
                    <LabelValue title='Opening Balance'>
                        {supplier.opening_balance < 0
                            ? `${Math.abs(supplier.opening_balance)} Rs. (Credit)`
                            : `${supplier.opening_balance} Rs. (Debit)`}
                    </LabelValue>
                    <LabelValue title='Current Balance'>
                        {supplier.current_balance < 0
                            ? `${Math.abs(supplier.current_balance)} Rs. (Credit)`
                            : `${supplier.current_balance} Rs. (Debit)`}
                    </LabelValue>
                    <LabelValue title='Created Date'>{supplier.created_at}</LabelValue>
                    <LabelValue title='Status' lastRow={true}>
                        <span
                            className={`text-${supplier.status_display === 'Active' ? 'green' : 'red'}-600 bg-${supplier.status_display === 'Active' ? 'green' : 'red'}-200 p-2 font-medium`}>{supplier.status_display}</span>
                    </LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
