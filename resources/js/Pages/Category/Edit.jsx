import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CategoryForm from "@/Pages/Category/Partials/CategoryForm.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";

const Edit = ({category}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Category'/>
                    <LinkButton href={route('categories.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Categories"/>
            <CategoryForm
                category={category}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
