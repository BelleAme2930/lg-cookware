import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit, FaPrint} from "react-icons/fa";
import PurchaseDetails from "@/Pages/Purchase/Partials/PurchaseDetails.jsx";
import Badge from "@/Components/Badge.jsx";
import PurchasePaymentDetails from "@/Pages/Purchase/Partials/PurchasePaymentDetails.jsx";

const Show = ({purchase}) => {
    // Determine payment status color
    const getStatusColor = (status) => {
        switch(status) {
            case 'Paid': return 'green';
            case 'Credit': return 'yellow';
            case 'Partial': return 'red';
            default: return 'gray';
        }
    };

    const paymentStatusColor = getStatusColor(purchase.payment_status);

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Purchase Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('purchases.edit', purchase)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('purchases.invoice', purchase)} icon={<FaPrint/>}>
                            Invoice
                        </LinkButton>
                        <LinkButton href={route('purchases.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Purchase Details"/>
            <div className='flex flex-col md:flex-row gap-3 mb-3'>
                <ShadowBox className='w-full md:w-1/3' title='Purchase Details'>
                    <LabelValue title='Purchase Date'>{purchase.purchase_date_display}</LabelValue>
                    <LabelValue title='Total Items'>{purchase.items_count}</LabelValue>
                    <LabelValue title='Notes'>{purchase.notes || '-'}</LabelValue>
                    <LabelValue title='Payment Status' lastRow={true}>
                        <Badge color={paymentStatusColor}>{purchase.payment_status}</Badge>
                    </LabelValue>
                </ShadowBox>

                <ShadowBox className='w-full md:w-1/3' title='Supplier & Products'>
                    <LabelValue title='Supplier'>{purchase?.supplier?.name}</LabelValue>
                    <LabelValue title='Products' lastRow={true}>{purchase.item_names}</LabelValue>
                </ShadowBox>

                <ShadowBox className='w-full md:w-1/3' title='Payment Summary'>
                    <LabelValue title='Total Amount'>{purchase.total_amount_formatted} Rs.</LabelValue>
                    <LabelValue title='Total Paid'>{purchase.total_paid_formatted} Rs.</LabelValue>
                    <LabelValue title='Remaining Balance' lastRow={true}>
                        <span className={purchase.remaining_balance > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                            {purchase.remaining_balance_formatted} Rs.
                        </span>
                    </LabelValue>
                </ShadowBox>
            </div>

            <div className='grid grid-cols-1 gap-3'>
                <ShadowBox className='w-full text-sm' title='Product Details'>
                    <PurchaseDetails purchase={purchase}/>
                    <div className='flex justify-end mt-4'>
                        <Title title={`Total Price: ${purchase.total_amount_formatted} Rs.`} className='text-lg'/>
                    </div>
                </ShadowBox>

                <ShadowBox className='w-full text-sm' title='Payment Details'>
                    <PurchasePaymentDetails payments={purchase.payments}/>
                    <div className='flex flex-col md:flex-row justify-between items-center mt-4 bg-gray-50 p-3 rounded'>
                        <div className='text-sm text-gray-700 mb-2 md:mb-0'>
                            <span className='font-semibold'>Payment Count:</span> {purchase.payments_count}
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4'>
                            <div>
                                <span className='font-semibold'>Total Paid:</span> {purchase.total_paid_formatted} Rs.
                            </div>
                            <div className={purchase.remaining_balance > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                                {purchase.remaining_balance > 0
                                    ? `Remaining: ${purchase.remaining_balance_formatted} Rs.`
                                    : 'Fully Paid'}
                            </div>
                            <Badge color={paymentStatusColor}>{purchase.payment_status}</Badge>
                        </div>
                    </div>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
