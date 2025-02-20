import React from "react";
import Swal from "sweetalert2";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import IconButton from "@/Components/IconButton.jsx";
import { router } from "@inertiajs/react";
import IconLink from "@/Components/IconLink.jsx";

const Index = ({ categories }) => {
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("categories.destroy", id));
            }
        });
    };

    const columns = [
        { name: "ID", selector: (row) => row.id },
        { name: "Name", selector: (row) => row.name },
        { name: "Description", selector: (row) => row.description },
        { name: "Created At", selector: (row) => row.created_at },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye />} href={route("categories.show", row.id)} />
                    <IconLink icon={<FaPen />} href={route("categories.edit", row.id)} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDelete(row.id)} />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Categories List' />
                    <LinkButton href={route("categories.create")} icon={<FaPlus />}>
                        Create Category
                    </LinkButton>
                </div>
            }
        >
            <Head title="Categories" />
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={categories}
                    title="Categories List"
                    filterColumns={['name', 'description']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
