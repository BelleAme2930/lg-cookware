import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import PurchasesOverviewWidget from "@/Pages/Dashboard/PurchasesOverviewWidget.jsx";
import {FaSync} from "react-icons/fa";

export default function Dashboard({auth, purchaseStats}) {
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
                        >
                            <FaSync className="text-gray-500"/>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard"/>

            <div className="flex py-6">
                <div className="w-1/2">
                    <PurchasesOverviewWidget
                        title="Purchases Overview"
                        stats={purchaseStats}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
