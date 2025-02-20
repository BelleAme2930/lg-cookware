import React from "react";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaEye, FaPen, FaPlus, FaTrash} from "react-icons/fa";
import IconButton from "@/Components/IconButton.jsx";

const Index = ({categories}) => {
    const columns = [
        {name: "ID", selector: (row) => row.id},
        {name: "Name", selector: (row) => row.name},
        {name: "Description", selector: (row) => row.description},
        {name: "Created At", selector: (row) => row.created_at},
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconButton icon={<FaEye/>} href={route('categories.show', row.id)}/>
                    <IconButton icon={<FaPen/>} href={route('categories.edit', row.id)}/>
                    <IconButton icon={<FaTrash/>} href={route('categories.destroy', row.id)}/>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Categories List'/>
                    <LinkButton href={route('categories.create')} icon={<FaPlus/>}>
                        Create Category
                    </LinkButton>
                </div>
            }
        >
            <Head title="Categories"/>
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={categories}
                    title="Categories List"
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
