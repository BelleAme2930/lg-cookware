import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";
import PurchaseDetails from "@/Pages/Purchase/Partials/PurchaseDetails.jsx";

const Show = ({purchase}) => {
    console.log(purchase)
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Purchase Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('purchases.edit', purchase)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('purchases.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Purchase Details"/>
            <div className='flex gap-2 mb-3'>
                <ShadowBox className='w-1/3' title='Purchase Details'>
                    <LabelValue title='Purchase Date'>{purchase.purchase_date}</LabelValue>
                    <LabelValue title='Total Items'>{purchase.items_count}</LabelValue>
                    <LabelValue title='Notes' lastRow={true}>{purchase.notes}</LabelValue>
                </ShadowBox>
                <ShadowBox className='w-1/3' title='Other Details'>
                    <LabelValue title='Supplier'>{purchase.supplier.name}</LabelValue>
                    <LabelValue title='Products' lastRow={true}>{purchase.item_names}</LabelValue>
                </ShadowBox>
            </div>
            <div className='flex'>
                <ShadowBox className='w-full text-sm' title='Size Details'>
                    <PurchaseDetails purchase={purchase}/>
                    <div className='flex justify-end mt-4'>
                        <Title title={`Total Price: ${purchase.total_amount} Rs.`} className='text-lg'/>
                    </div>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
