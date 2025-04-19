import React, { useState } from "react";
import DataTable from "react-data-table-component";
import TextInput from "@/Components/TextInput.jsx";
import Title from "@/Components/Title.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";

const CustomDataTable = ({ columns, data, title, filterColumns = [] }) => {
    const [filterText, setFilterText] = useState("");

    const filteredData = data.filter((row) =>
        filterColumns.some((colKey) =>
            row[colKey]?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    return (
        <ShadowBox>
            <div className='flex items-center justify-between gap-4 mb-4 p-4 bg-gray-100 rounded-lg'>
                <Title className='capitalize' title={title} />
                <TextInput
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setFilterText(e.target.value)}
                    className='max-w-72 border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:border-primary-500 focus:ring-primary-500'
                />
            </div>
            <DataTable
                columns={columns.map(col => ({ ...col, sortable: false }))}
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                striped
                className='rounded-lg'
                customStyles={{
                    headCells: {
                        style: {
                            backgroundColor: "#f3f4f6",
                            fontWeight: "bold",
                            color: "#374151",
                            padding: "12px",
                        },
                    },
                    rows: {
                        style: {
                            minHeight: "48px",
                        },
                    },
                }}
                noDataComponent={<div className='mt-2 text-md text-primary-500'>No records found.</div>}
            />
        </ShadowBox>
    );
};

export default CustomDataTable;
