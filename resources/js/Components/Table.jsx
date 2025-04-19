import React from 'react';

const Table = ({headers, data}) => {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
            <tr className="bg-gray-100">
                {headers.map((header, index) => (
                    <th key={index} className="border border-gray-300 p-2">{header}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data.length > 0 ? (
                data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="text-center">
                        {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex} className="border border-gray-300 p-2">
                                {cell ?? '-'}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={headers.length} className="border border-gray-300 p-2 text-center text-gray-500">
                        No data available
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;
