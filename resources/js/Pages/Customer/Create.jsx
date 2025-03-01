import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomerForm from "@/Pages/Customer/Partials/CustomerForm.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";

const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Customer'/>
                    <LinkButton href={route('customers.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Customers"/>
            <CustomerForm />
        </AuthenticatedLayout>
    );
};

export default Create;
