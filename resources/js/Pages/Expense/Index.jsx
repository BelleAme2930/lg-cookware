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

const Index = ({expenses}) => {
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
                router.delete(route("expenses.destroy", id));
            }
        });
    };

    const columns = [
        {name: "ID", selector: (row) => row.id},
        {name: "Name", selector: (row) => row.name},
        {name: "Amount", selector: (row) => row.amount + ' Rs.'},
        {name: "Description", selector: (row) => row.description},
        {name: "Expense Date", selector: (row) => row.expense_date_display},
        {name: "Paid Date", selector: (row) => row.paid_date},
        {
            name: "Status",
            selector: (row) => <span
                className={`text-${row.status === 'Paid' ? 'green' : 'red'}-600 bg-${row.status === 'Paid' ? 'green' : 'red'}-200 p-2 font-medium`}>{row.status}</span>,
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye/>} href={route("expenses.show", row.id)}/>
                    <IconLink icon={<FaPen/>} href={route("expenses.edit", row.id)}/>
                    <IconButton icon={<FaTrash/>} onClick={() => handleDelete(row.id)}/>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Expenses List'/>
                    <LinkButton href={route("expenses.create")} icon={<FaPlus/>}>
                        Create Expense
                    </LinkButton>
                </div>
            }
        >
            <Head title="Expenses"/>
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={expenses}
                    title="Expenses List"
                    filterColumns={['name', 'description']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
