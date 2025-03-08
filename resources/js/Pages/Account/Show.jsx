import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft, FaEdit} from "react-icons/fa";

const Show = ({account}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Account Details'/>
                    <div className='flex items-center gap-2'>
                        <LinkButton href={route('accounts.edit', account)} icon={<FaEdit/>}>
                            Edit
                        </LinkButton>
                        <LinkButton href={route('accounts.index')} icon={<FaArrowLeft/>}>
                            Back to List
                        </LinkButton>
                    </div>
                </div>
            }
        >
            <Head title="Account Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Account Title'>{account.title}</LabelValue>
                    <LabelValue title='Account Number'>{account.account_number}</LabelValue>
                    <LabelValue title='Bank Name' lastRow={true}>{account.bank_name}</LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
