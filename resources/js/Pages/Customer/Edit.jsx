import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import CustomerForm from "@/Pages/Customer/Partials/CustomerForm.jsx";

const Edit = ({customer}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Customer'/>
                    <LinkButton href={route('customers.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Customers"/>
            <CustomerForm
                customer={customer}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
