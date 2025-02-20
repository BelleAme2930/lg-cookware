import React from 'react';
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaPlus} from "react-icons/fa";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CategoryForm from "@/Pages/Category/Partials/CategoryForm.jsx";

const Create = () => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Create New Category'/>
                </div>
            }
        >
            <Head title="Categories"/>
            <CategoryForm />
        </AuthenticatedLayout>
    );
};

export default Create;
