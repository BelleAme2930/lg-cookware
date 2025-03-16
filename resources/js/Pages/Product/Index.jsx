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

const Index = ({ products }) => {
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
                router.delete(route("products.destroy", id));
            }
        });
    };

    const columns = [
        { name: "ID", selector: (row) => row.id },
        { name: "Name", selector: (row) => row.name },
        { name: "Created Date", selector: (row) => row.created_at },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye />} href={route("products.show", row.id)} />
                    <IconLink icon={<FaPen />} href={route("products.edit", row.id)} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDelete(row.id)} />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Products List' />
                    <LinkButton href={route("products.create")} icon={<FaPlus />}>
                        Create Product
                    </LinkButton>
                </div>
            }
        >
            <Head title="Products" />
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={products}
                    title="Products List"
                    filterColumns={['name', 'description', 'type']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
