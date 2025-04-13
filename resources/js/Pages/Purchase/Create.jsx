import React from 'react';
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import PurchaseForm from "@/Pages/Purchase/Partials/PurchaseForm.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Create = ({
                    products,
                    accounts,
                    suppliers,
                    productSizes,
                }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Purchase'/>
                    <LinkButton href={route('products.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Purchases"/>
            <PurchaseForm
                products={products}
                productSizes={productSizes}
                suppliers={suppliers}
                accounts={accounts}
            />
        </AuthenticatedLayout>
    );
};

export default Create;
