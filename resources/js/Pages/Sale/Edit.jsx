import React from 'react';
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import SaleForm from "@/Pages/Sale/Partials/SaleForm.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const Edit = ({
                  accounts,
                  sale,
                  products,
                  customers,
                  productSizes,
              }) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Sale'/>
                    <LinkButton href={route('sales.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Sales"/>
            <SaleForm
                accounts={accounts}
                sale={sale}
                products={products}
                productSizes={productSizes}
                customers={customers}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
