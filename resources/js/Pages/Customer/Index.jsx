import React from "react";
import Swal from "sweetalert2";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";
import LinkButton from "@/Components/LinkButton.jsx";
import {FaEye, FaPen, FaPlus, FaTrash} from "react-icons/fa";
import IconButton from "@/Components/IconButton.jsx";
import {router} from "@inertiajs/react";
import IconLink from "@/Components/IconLink.jsx";

const Index = ({customers}) => {
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
                router.delete(route("customers.destroy", id));
            }
        });
    };

    const columns = [
        {name: "ID", selector: (row) => row.id},
        {name: "Name", selector: (row) => row.name},
        {name: "Phone", selector: (row) => row.phone},
        {name: "Current Balance", selector: (row) => row.current_balance + ' Rs.'},
        {
            name: "Status",
            selector: (row) => <span
                className={`text-${row.status_display === 'Active' ? 'green' : 'red'}-600 bg-${row.status_display === 'Active' ? 'green' : 'red'}-200 p-2 font-medium`}>{row.status_display}</span>,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye/>} href={route("customers.show", row.id)}/>
                    <IconLink icon={<FaPen/>} href={route("customers.edit", row.id)}/>
                    <IconButton icon={<FaTrash/>} onClick={() => handleDelete(row.id)}/>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Customers List'/>
                    <LinkButton href={route("customers.create")} icon={<FaPlus/>}>
                        Create Customer
                    </LinkButton>
                </div>
            }
        >
            <Head title="Customers"/>
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={customers}
                    title="Customers List"
                    filterColumns={['name', 'phone']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
