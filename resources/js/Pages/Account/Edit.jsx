import React from 'react';
import Title from "@/Components/Title.jsx";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {FaArrowLeft} from "react-icons/fa";
import LinkButton from "@/Components/LinkButton.jsx";
import AccountForm from "@/Pages/Account/Partials/AccountForm.jsx";

const Edit = ({account}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Edit Account'/>
                    <LinkButton href={route('accounts.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Accounts"/>
            <AccountForm
                account={account}
            />
        </AuthenticatedLayout>
    );
};

export default Edit;
