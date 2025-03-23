import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import ProductForm from "@/Pages/Product/Partials/ProductForm.jsx";

const Create = ({categories, suppliers}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Product'/>
                    <LinkButton href={route('products.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Products"/>
            <ProductForm categories={categories} suppliers={suppliers} />
        </AuthenticatedLayout>
    );
};

export default Create;
