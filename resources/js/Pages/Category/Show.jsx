import React from 'react';
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import LabelValue from "@/Components/LabelValue.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaArrowLeft} from "react-icons/fa";

const Show = ({category}) => {
    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Category Details'/>
                    <LinkButton href={route('categories.index')} icon={<FaArrowLeft/>}>
                        Back to List
                    </LinkButton>
                </div>
            }
        >
            <Head title="Category Details"/>
            <div className='flex'>
                <ShadowBox className='w-1/3' title='Details'>
                    <LabelValue title='Name'>{category.name}</LabelValue>
                    <LabelValue title='Description' lastRow={true}>{category.description}</LabelValue>
                </ShadowBox>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
