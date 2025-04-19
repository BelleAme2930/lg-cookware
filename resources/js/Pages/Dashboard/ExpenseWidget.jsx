import React from 'react';
import { FaMoneyBillWave, FaReceipt } from 'react-icons/fa';

export default function ExpenseWidget({ stats }) {
    const { totalExpenses } = stats;

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="py-4 text-gray-700">
                <h2 className="text-2xl">Expenses</h2>
            </div>
            <div className="rounded-lg p-4 text-white bg-gradient-to-r from-blue-300 to-blue-500">
            <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-medium mb-4">Expense Overview</h3>
                        <div className="flex items-center mb-6">
                            <FaMoneyBillWave className="text-white text-3xl mr-3"/>
                            <span className="text-3xl font-bold">{totalExpenses.toLocaleString()} Rs</span>
                        </div>
                    </div>
                    <FaReceipt className="text-4xl opacity-80"/>
                </div>
            </div>
        </div>
    );
}
