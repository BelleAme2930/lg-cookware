import React, { useState } from "react";
import DataTable from "react-data-table-component";
import TextInput from "@/Components/TextInput.jsx";
import Title from "@/Components/Title.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import {FaDatabase, FaThumbsDown} from "react-icons/fa";

const CustomDataTable = ({ columns, data, title }) => {
    const [filterText, setFilterText] = useState("");

    const filteredData = data.filter((row) =>
        Object.values(row).some((value) =>
            value?.toString().toLowerCase().includes(filterText.toLowerCase())
        )
    );

    return (
        <ShadowBox>
            <div className='flex items-center justify-between gap-2 mb-2'>
                <Title title={title} />
                <TextInput
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setFilterText(e.target.value)}
                    className='max-w-72'
                />
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                responsive
                striped
                noDataComponent={<div className='mt-2 text-md text-primary-500'>No records found.</div>}
            />
        </ShadowBox>
    );
};

export default CustomDataTable;
