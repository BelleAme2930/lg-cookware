import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import OverviewWidget from "@/Pages/Dashboard/OverviewWidget.jsx";
import { FaSync } from "react-icons/fa";
import ProfitWidget from "@/Pages/Dashboard/ProfitWidget.jsx";
import ExpenseWidget from "@/Pages/Dashboard/ExpenseWidget.jsx";
import Title from "@/Components/Title.jsx";

export default function Dashboard({ auth, purchaseStats, saleStats, profitStats, expenseStats }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 800);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <Title title='Dashboard' />
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
                <div className="w-full sm:w-1/3 flex flex-col justify-between">
                    <ProfitWidget stats={profitStats} />
                    <ExpenseWidget stats={expenseStats} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
