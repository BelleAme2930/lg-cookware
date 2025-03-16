import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";

const Show = ({product}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Product Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('products.edit', product)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('products.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Product Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Product Name'>{product.name}</LabelValue>
                    <LabelValue title='Product Description'>{product.description}</LabelValue>
                    <LabelValue title='Product Type' className='capitalize'>{product.type}</LabelValue>
                    <LabelValue title='Created Date' lastRow={true}>{product.created_at}</LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
