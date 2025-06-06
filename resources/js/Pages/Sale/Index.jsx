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

const Index = ({sales}) => {
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
                router.delete(route("sales.destroy", id));
            }
        });
    };

    const columns = [
        {name: "ID", selector: (row) => row.id},
        {name: "Sale Date", selector: (row) => row.sale_date},
        {name: "Total Items", selector: (row) => row.items_count},
        {name: "Total Price", selector: (row) => row.total_amount_formatted + ' Rs.'},
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye/>} href={route("sales.show", row.id)}/>
                    <IconLink icon={<FaPen/>} href={route("sales.edit", row.id)}/>
                    <IconButton icon={<FaTrash/>} onClick={() => handleDelete(row.id)}/>
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center'>
                    <Title title='Sales List'/>
                    <LinkButton href={route("sales.create")} icon={<FaPlus/>}>
                        Create Sale
                    </LinkButton>
                </div>
            }
        >
            <Head title="Sales"/>
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={sales}
                    title="Sales List"
                    filterColumns={['sale_date']}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
