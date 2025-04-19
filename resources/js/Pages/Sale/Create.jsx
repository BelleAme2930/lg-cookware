import React from 'react';
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import SaleForm from "@/Pages/Sale/Partials/SaleForm.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Create = ({
                    products,
                    accounts,
                    customers,
                    productSizes,
                }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Sale'/>
                    <LinkButton href={route('products.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Sales"/>
            <SaleForm
                products={products}
                productSizes={productSizes}
                customers={customers}
                accounts={accounts}
            />
        </AuthenticatedLayout>
    );
};

export default Create;
