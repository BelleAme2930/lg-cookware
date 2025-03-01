import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import SupplierForm from "@/Pages/Supplier/Partials/SupplierForm.jsx";

const Edit = ({supplier}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Supplier'/>
                    <LinkButton href={route('suppliers.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Suppliers"/>
            <SupplierForm
                supplier={supplier}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
