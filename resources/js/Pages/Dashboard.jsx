import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import OverviewWidget from "@/Pages/Dashboard/OverviewWidget.jsx";
import {
    FaBoxOpen,
    FaMoneyBillWave,
    FaMoneyCheckAlt,
    FaShoppingCart,
    FaSync,
    FaTruckLoading,
    FaUsers
} from "react-icons/fa";
import ProfitWidget from "@/Pages/Dashboard/ProfitWidget.jsx";
import ExpenseWidget from "@/Pages/Dashboard/ExpenseWidget.jsx";
import Title from "@/Components/Title.jsx";
import StatWidget from "@/Pages/Dashboard/General/StatWidget.jsx";
import ShadowBox from "@/Components/ShadowBox.jsx";
import PaymentSummaryWidget from "@/Pages/Dashboard/General/PaymentSummaryWidget.jsx";

export default function Dashboard({ auth, purchaseStats, saleStats, profitStats, expenseStats, quickStats }) {
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
                    <Title title='Dashboard'/>
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

            <div className='md:flex gap-2'>
                <ShadowBox className='w-1/2 space-y-2'>
                    <div className="flex flex-wrap gap-1">
                        <StatWidget
                            className='w-1/2'
                            title="Sales"
                            value={quickStats.totalSales}
                            icon={<FaMoneyBillWave className='text-2xl text-green-600'/>}
                            background='bg-green-300'
                            color='text-green-900'
                        />
                        <StatWidget
                            className='w-1/2'
                            title="Customers"
                            value={quickStats.customers}
                            icon={<FaUsers className='text-2xl text-blue-600'/>}
                            background='bg-blue-300'
                            color='text-blue-900'
                        />
                        <StatWidget
                            className='w-1/2'
                            title="Products"
                            value={quickStats.products}
                            icon={<FaBoxOpen className='text-2xl text-red-600'/>}
                            background='bg-red-300'
                            color='text-red-900'
                        />
                    </div>

                    <div className="flex flex-wrap gap-1">
                        <StatWidget
                            className='w-1/2'
                            title="Purchases"
                            value={quickStats.totalPurchases}
                            icon={<FaShoppingCart className='text-2xl text-purple-600'/>}
                            background='bg-purple-300'
                            color='text-purple-900'
                        />
                        <StatWidget
                            className='w-1/2'
                            title="Suppliers"
                            value={quickStats.suppliers}
                            icon={<FaTruckLoading className='text-2xl text-yellow-600'/>}
                            background='bg-yellow-300'
                            color='text-yellow-900'
                        />
                        <StatWidget
                            className='w-1/2'
                            title="Pending Payments"
                            value={`${quickStats.pendingPayments.toLocaleString()} Rs.`}
                            icon={<FaMoneyCheckAlt className='text-2xl text-emerald-800'/>}
                            background='bg-emerald-300'
                            color='text-emerald-900'
                        />
                    </div>
                </ShadowBox>

                <ShadowBox className='w-1/2 space-y-2'>
                    <div className="flex gap-4">
                        <PaymentSummaryWidget
                            className='w-1/2'
                            title="Today's Receivables"
                            amount={quickStats.todaysReceivables.amount}
                            count={quickStats.todaysReceivables.count}
                            extra={`from ${quickStats.todaysReceivables.uniqueCustomers} Customers`}
                            icon={<FaMoneyBillWave className="text-cyan-900" />}
                            bgColor="bg-cyan-100"
                            textColor="text-cyan-900"
                        />
                        <PaymentSummaryWidget
                            className='w-1/2'
                            title="Today's Payables"
                            amount={quickStats.todaysPayables.amount}
                            count={quickStats.todaysPayables.count}
                            extra={`to ${quickStats.todaysPayables.uniqueSuppliers} Suppliers`}
                            icon={<FaMoneyCheckAlt className="text-violet-900" />}
                            bgColor="bg-violet-100"
                            textColor="text-violet-900"
                        />
                    </div>
                </ShadowBox>
            </div>


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
                    <ProfitWidget stats={profitStats}/>
                    <ExpenseWidget stats={expenseStats}/>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
