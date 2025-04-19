import React from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";
import {FaEye} from "react-icons/fa";
import IconLink from "@/Components/IconLink.jsx";

const Index = ({ customers }) => {
    const columns = [
        { name: "ID", selector: (row) => row.id },
        { name: "Name", selector: (row) => row.name },
        { name: "Phone", selector: (row) => row.phone },
        {
            name: "Current Balance",
            selector: (row) => (
                <span className={row.current_balance > 0 ? "text-red-600" : "text-green-600"}>
                    {row.current_balance.toLocaleString()} Rs.
                </span>
            )
        },
        {
            name: "Status",
            selector: (row) => (
                <span className={`${row.status_display === 'Active' ? 'text-green-600 bg-green-200' : 'text-red-600 bg-red-200'} p-2 font-medium`}>
                    {row.status_display}
                </span>
            ),
        },
        {
            name: "Actions",
            selector: (row) => (
                <div className="flex items-center gap-2">
                    <IconLink icon={<FaEye />} href={route("customer.ledger.show", row.id)} tooltip="View Ledger" />
                </div>
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <Title title="Customer Ledgers" />
                </div>
            }
        >
            <Head title="Customer Ledgers" />
            <div className="p-2 bg-gray-100">
                <CustomDataTable
                    columns={columns}
                    data={customers}
                    title="Customer Ledgers"
                    filterColumns={["name", "phone"]}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
