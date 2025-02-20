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

const Index = ({ accounts }) => {
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
                router.delete(route("accounts.destroy", id));
            }
        });
    };

    const columns = [
        { name: "ID", selector: (row) => row.id },
        { name: "Title", selector: (row) => row.title },
        { name: "Account Number", selector: (row) => row.account_number },
        { name: "Bank Name", selector: (row) => row.bank_name },
        { name: "Created At", selector: (row) => row.created_at },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye />} href={route("accounts.show", row.id)} />
                    <IconLink icon={<FaPen />} href={route("accounts.edit", row.id)} />
                    <IconButton icon={<FaTrash />} onClick={() => handleDelete(row.id)} />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Accounts List' />
                    <LinkButton href={route("accounts.create")} icon={<FaPlus />}>
                        Create Account
                    </LinkButton>
                </div>
            }
        >
            <Head title="Accounts" />
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={accounts}
                    title="Accounts List"
                    filterColumns={['title', 'account_number', 'bank_name']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
