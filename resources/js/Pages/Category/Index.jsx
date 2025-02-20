import React from "react";
import {Head} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import CustomDataTable from "@/Components/CustomDataTable.jsx";
import Title from "@/Components/Title.jsx";

const Index = ({categories}) => {
    const columns = [
        {name: "ID", selector: (row) => row.id, sortable: true},
        {name: "Name", selector: (row) => row.name, sortable: true},
        {name: "Created At", selector: (row) => row.created_at, sortable: true},
    ];

    return (
        <AuthenticatedLayout
            header={
                <Title title='Categories List'/>
            }
        >
            <Head title="Categories"/>
            <div className="p-6 bg-gray-100">
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
