import React from 'react';
import { FaChartLine } from 'react-icons/fa';
import * as FaIcons from "react-icons/fa";

export default function ProfitWidget({ stats }) {
    const { value, totalSales, totalPurchases } = stats;
    const isProfit = value >= 0;

    const bgGradient = isProfit
        ? 'from-green-400 to-emerald-600'
        : 'from-red-400 to-red-600';

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Profit</h3>
            <div className={`rounded-lg p-4 text-white bg-gradient-to-br ${bgGradient}`}>
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
        </div>
    );
}
