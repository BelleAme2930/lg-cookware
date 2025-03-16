import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import ProductForm from "@/Pages/Product/Partials/ProductForm.jsx";

const Edit = ({product, categories, suppliers}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Product'/>
                    <LinkButton href={route('products.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Products"/>
            <ProductForm
                product={product}
                categories={categories}
                suppliers={suppliers}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
