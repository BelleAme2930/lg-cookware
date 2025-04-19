import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import * as FaIcons from "react-icons/fa";
import ShadowBox from "@/Components/ShadowBox.jsx";

export default function ProfitWidget({ stats }) {
    const { value, totalSales, totalPurchases } = stats;
    const isProfit = value >= 0;

    const bgGradient = isProfit
        ? 'from-green-300 to-green-500'
        : 'from-red-400 to-red-600';

    return (
        <ShadowBox className="px-4">
            <div className="py-4 text-gray-700">
                <h2 className="text-2xl">Profit</h2>
            </div>
            <div className={`rounded-lg p-4 text-white bg-gradient-to-r ${bgGradient}`}>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-medium mb-4">Profit Overview</h3>
                        <div className="flex items-center mb-6">
                            <FaIcons.FaCoins className="text-white text-3xl mr-3"/>
                            <span className="text-3xl font-bold">{value.toLocaleString()} Rs</span>
                        </div>
                    </div>
                    <FaChartLine className="text-4xl opacity-80"/>
                </div>
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
                <div className="flex justify-between">
                    <span>Total Sales:</span>
                    <span className="font-semibold">{totalSales} Rs</span>
                </div>
                <div className="flex justify-between">
                    <span>Total Purchases:</span>
                    <span className="font-semibold">{totalPurchases} Rs</span>
                </div>
            </div>
        </ShadowBox>
    );
}
