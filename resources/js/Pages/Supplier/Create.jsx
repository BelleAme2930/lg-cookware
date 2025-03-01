import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import SupplierForm from "@/Pages/Supplier/Partials/SupplierForm.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";

const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Supplier'/>
                    <LinkButton href={route('expenses.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Suppliers"/>
            <SupplierForm />
        </AuthenticatedLayout>
    );
};

export default Create;
