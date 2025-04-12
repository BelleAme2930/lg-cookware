import React from 'react';
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import PurchaseForm from "@/Pages/Purchase/Partials/PurchaseForm.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Edit = ({
                    purchase,
                    products,
                    suppliers,
                    productSizes,
                }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Purchase'/>
                    <LinkButton href={route('purchases.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Purchases"/>
            <PurchaseForm
                purchase={purchase}
                products={products}
                productSizes={productSizes}
                suppliers={suppliers}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
