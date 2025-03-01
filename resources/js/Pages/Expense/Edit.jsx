import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import ExpenseForm from "@/Pages/Expense/Partials/ExpenseForm.jsx";

const Edit = ({expense}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Expense'/>
                    <LinkButton href={route('expenses.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Expenses"/>
            <ExpenseForm
                expense={expense}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
