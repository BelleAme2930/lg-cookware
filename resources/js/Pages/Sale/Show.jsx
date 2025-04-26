import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit, FaPrint} from "react-icons/fa";
import SaleDetails from "@/Pages/Sale/Partials/SaleDetails.jsx";
import Badge from "@/Components/Badge.jsx";
import SalePaymentDetails from "@/Pages/Sale/Partials/SalePaymentDetails.jsx";

const Show = ({sale}) => {
    // Determine payment status color
    const getStatusColor = (status) => {
        switch(status) {
            case 'Paid': return 'green';
            case 'Credit': return 'yellow';
            case 'Partial': return 'red';
            default: return 'gray';
        }
    };

    const paymentStatusColor = getStatusColor(sale.payment_status);

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Sale Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('sales.edit', sale)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('sales.invoice', sale)} icon={<FaPrint/>}>
                            Invoice
                        </LinkButton>
                        <LinkButton href={route('sales.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Sale Details"/>
            <div className='flex flex-col md:flex-row gap-3 mb-3'>
                <ShadowBox className='w-full md:w-1/3' title='Sale Details'>
                    <LabelValue title='Sale Date'>{sale.sale_date_display}</LabelValue>
                    <LabelValue title='Total Items'>{sale.items_count}</LabelValue>
                    <LabelValue title='Notes'>{sale.notes || '-'}</LabelValue>
                    <LabelValue title='Payment Status' lastRow={true}>
                        <Badge color={paymentStatusColor}>{sale.payment_status}</Badge>
                    </LabelValue>
                </ShadowBox>

                <ShadowBox className='w-full md:w-1/3' title='Customer & Products'>
                    <LabelValue title='Customer'>{sale?.customer?.name}</LabelValue>
                    <LabelValue title='Products' lastRow={true}>{sale.item_names}</LabelValue>
                </ShadowBox>

                <ShadowBox className='w-full md:w-1/3' title='Payment Summary'>
                    <LabelValue title='Total Amount'>{sale.total_amount_formatted} Rs.</LabelValue>
                    <LabelValue title='Total Paid'>{sale.total_paid_formatted} Rs.</LabelValue>
                    <LabelValue title='Remaining Balance' lastRow={true}>
                        <span className={sale.remaining_balance > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                            {sale.remaining_balance_formatted} Rs.
                        </span>
                    </LabelValue>
                </ShadowBox>
            </div>

            <div className='grid grid-cols-1 gap-3'>
                <ShadowBox className='w-full text-sm' title='Product Details'>
                    <SaleDetails sale={sale}/>
                    <div className='flex justify-end mt-4'>
                        <Title title={`Total Price: ${sale.total_amount_formatted} Rs.`} className='text-lg'/>
                    </div>
                </ShadowBox>

                <ShadowBox className='w-full text-sm' title='Payment Details'>
                    <SalePaymentDetails payments={sale.payments}/>
                    <div className='flex flex-col md:flex-row justify-between items-center mt-4 bg-gray-50 p-3 rounded'>
                        <div className='text-sm text-gray-700 mb-2 md:mb-0'>
                            <span className='font-semibold'>Payment Count:</span> {sale.payments_count}
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-4'>
                            <div>
                                <span className='font-semibold'>Total Paid:</span> {sale.total_paid_formatted} Rs.
                            </div>
                            <div className={sale.remaining_balance > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                                {sale.remaining_balance > 0
                                    ? `Remaining: ${sale.remaining_balance_formatted} Rs.`
                                    : 'Fully Paid'}
                            </div>
                            <Badge color={paymentStatusColor}>{sale.payment_status}</Badge>
                        </div>
                    </div>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
