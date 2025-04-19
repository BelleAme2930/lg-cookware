import React from "react";
import Swal from "sweetalert2";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaEye, FaFile, FaPen, FaPlus, FaTrash} from "react-icons/fa";
import IconButton from "@/Components/IconButton.jsx";
import {router} from "@inertiajs/react";
import IconLink from "@/Components/IconLink.jsx";

const Index = ({suppliers}) => {
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
                router.delete(route("suppliers.destroy", id));
            }
        });
    };

    const columns = [
        {name: "ID", selector: (row) => row.id},
        {name: "Name", selector: (row) => row.name},
        {name: "Phone", selector: (row) => row.phone},
        {name: "Current Balance", selector: (row) => row.current_balance.toLocaleString() + ' Rs.'},
        {
            name: "Status",
            selector: (row) => <span
                className={`${row.status_display === 'Active' ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'} p-2 font-medium`}>{row.status_display}</span>,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye/>} href={route("suppliers.show", row.id)}/>
                    <IconLink icon={<FaFile/>} href={route("supplier.ledger.show", row.id)}/>
                    <IconLink icon={<FaPen/>} href={route("suppliers.edit", row.id)}/>
                    <IconButton icon={<FaTrash/>} onClick={() => handleDelete(row.id)}/>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Suppliers List'/>
                    <LinkButton href={route("suppliers.create")} icon={<FaPlus/>}>
                        Create Supplier
                    </LinkButton>
                </div>
            }
        >
            <Head title="Suppliers"/>
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={suppliers}
                    title="Suppliers List"
                    filterColumns={['name', 'phone']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
