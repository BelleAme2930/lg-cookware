import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import Title from "@/Components/Title.jsx";
import { FaChevronDown, FaChevronRight, FaPrint, FaArrowLeft } from "react-icons/fa";
import IconButton from "@/Components/IconButton.jsx";
import IconLink from "@/Components/IconLink.jsx";
import Table from "@/Components/Table";

const LedgerShow = ({ supplier, ledgerEntries }) => {
    const [expandedRows, setExpandedRows] = useState({});

    const toggleRow = (id) => {
        setExpandedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const purchaseEntries = ledgerEntries.filter(entry => entry.type === 'purchase');

    const printLedger = () => {
        window.print();
    };

    const ledgerHeaders = ["Date", "Description", "Debit", "Credit", "Balance", "Type", "Actions"];
    const ledgerData = ledgerEntries.map(entry => {
        return {
            date: formatDate(entry.date),
            description: entry.description,
            debit: entry.debit > 0 ? entry.debit.toLocaleString() + ' Rs.' : '-',
            credit: entry.credit > 0 ? entry.credit.toLocaleString() + ' Rs.' : '-',
            balance: `${(Math.abs(entry.balance).toLocaleString() + ' Rs.')}`,
            type: `${entry.balance > 0 ? 'Debit' : 'Credit'}`,
            actions: entry.type === 'purchase' ? (
                <button
                    onClick={() => toggleRow(entry.id)}
                    className="w-full print:hidden justify-center text-blue-500 hover:text-blue-700 focus:outline-none flex items-center"
                >
                    {expandedRows[entry.id] ? (
                        <>
                            <FaChevronDown size={14} className="mr-1" /> Hide Details
                        </>
                    ) : (
                        <>
                            <FaChevronRight size={14} className="mr-1" /> View Details
                        </>
                    )}
                </button>
            ) : null
        };
    });

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center print:hidden">
                    <Title title={`${supplier.name} - Ledger`} />
                    <div className="flex gap-2">
                        <IconLink
                            icon={<FaArrowLeft />}
                            href={route("supplier.ledger.index")}
                            label="Back to Suppliers"
                        />
                        <IconButton
                            icon={<FaPrint />}
                            onClick={printLedger}
                        />
                    </div>
                </div>
            }
        >
            <Head title={`${supplier.name} - Ledger`} />

            <div className="p-4 bg-white shadow-sm rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Supplier Details</h3>
                        <div className="space-y-1">
                            <p><span className="font-medium">Name:</span> {supplier.name}</p>
                            <p><span className="font-medium">Phone:</span> {supplier.phone}</p>
                            <p><span className="font-medium">Email:</span> {supplier.email || "N/A"}</p>
                            <p><span className="font-medium">Address:</span> {supplier.address || "N/A"}</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Balance Summary</h3>
                        <div className="space-y-1">
                            <p>
                                <span className="font-medium">Opening Balance:</span> {(supplier.opening_balance.toLocaleString())} Rs.
                            </p>
                            <p>
                                <span className="font-medium">Current Balance:</span>{" "}
                                <span className={supplier.current_balance > 0 ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                                    {(supplier.current_balance.toLocaleString())} Rs.
                                </span>
                            </p>
                            <p>
                                <span className="font-medium">Total Purchases:</span> {purchaseEntries.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden p-4 print:shadow-none">
                <h3 className="text-lg font-semibold mb-4">Ledger Entries</h3>
                <Table headers={ledgerHeaders} data={ledgerData} />

                {ledgerEntries.map((entry) => {
                    if (entry.type === 'purchase' && expandedRows[entry.id] && entry.purchase_data) {
                        const purchaseItemHeaders = ["Product", "Quantity", "Weight", "Unit Price", "Total"];
                        const purchaseItemData = entry.purchase_data.items.map(item => ({
                            product: `${item.product_size.product.name} - ${item.product_size.name}`,
                            quantity: item.quantity + ' Rs.',
                            weight: item.weight + ' KG' || '-',
                            unitPrice: (item.unit_price) + ' Rs.',
                            total: (item.total_price) + ' Rs.',
                        }));

                        return (
                            <div key={`details-${entry.id}`} className="mt-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h4 className="font-medium mb-2">Purchase Details - {formatDate(entry.purchase_data.purchase_date)}</h4>
                                <p className="mb-4"><span className="font-medium">Notes:</span> {entry.purchase_data.notes || 'N/A'}</p>

                                <h5 className="font-medium mb-2">Items</h5>
                                <Table headers={purchaseItemHeaders} data={purchaseItemData} />

                                <div className="mt-2 text-right">
                                    <p className="font-medium">Total Amount: {(entry.purchase_data.total_amount)} Rs.</p>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </AuthenticatedLayout>
    );
};

export default LedgerShow;
