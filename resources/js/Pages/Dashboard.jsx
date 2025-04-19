import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import OverviewWidget from "@/Pages/Dashboard/OverviewWidget.jsx";
import { FaSync } from "react-icons/fa";

export default function Dashboard({ auth, purchaseStats, saleStats }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Add your refresh logic here
        setTimeout(() => setIsRefreshing(false), 800); // Simulate refresh delay
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                    <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">Last updated: {new Date().toLocaleString()}</span>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100"
                            title="Refresh Dashboard"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                        >
                            <FaSync className={`text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`}/>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="flex flex-col md:flex-row py-6 gap-4">
                <div className="w-full sm:w-1/3">
                    <OverviewWidget
                        title="Purchases"
                        stats={purchaseStats}
                        colorTheme="orange"
                    />
                </div>
                <div className="w-full sm:w-1/3">
                    <OverviewWidget
                        title="Sales"
                        stats={saleStats}
                        colorTheme="blue"
                    />
                </div>
            </div>

            {/* Add additional widgets or components */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-3">Recent Transactions</h3>
                    <p className="text-gray-500">No recent transactions</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-3">Top Products</h3>
                    <p className="text-gray-500">No data available</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-3">Revenue Trends</h3>
                    <p className="text-gray-500">No data available</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
