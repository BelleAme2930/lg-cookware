import React from 'react';
import ShadowBox from "@/Components/ShadowBox.jsx";
import { FaBoxes, FaExclamationTriangle, FaMoneyBillWave } from "react-icons/fa";

export default function InventoryStatusWidget({ stats }) {
    const inventoryStatus = [
        { value: stats.inStockProducts, total: stats.totalProducts, label: 'In Stock', color: 'bg-green-500' },
        { value: stats.outOfStockProducts, total: stats.totalProducts, label: 'Out of Stock', color: 'bg-red-500' },
        { value: stats.lowStockProducts, total: stats.totalProducts, label: 'Low Stock', color: 'bg-yellow-500' }
    ];

    return (
        <ShadowBox className="mt-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">Inventory at a Glance</h2>
                <div className="flex items-center gap-2">
                    <FaBoxes className="text-indigo-600" />
                    <span className="font-semibold">{stats.totalProducts} Products</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left side - Inventory bar chart */}
                <div className="w-full md:w-2/3">
                    <div className="flex flex-col gap-3">
                        {inventoryStatus.map((item, index) => (
                            <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>{item.label}</span>
                                    <span className="font-medium">{item.value} items</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className={`${item.color} h-2.5 rounded-full`}
                                        style={{ width: `${(item.value / item.total * 100) || 0}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side - Summary */}
                <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                        <FaBoxes className="text-indigo-600 text-lg mr-3" />
                        <div className='w-1/2'>
                            <div className="text-xs text-indigo-600">Total Quantity</div>
                            <div className="font-semibold">{stats.totalStockQuantity} Pcs.</div>
                        </div>
                        <div className='w-1/2'>
                            <div className="text-xs text-indigo-600">Total Weight</div>
                            <div className="font-semibold">{stats.totalStockWeight} KG.</div>
                        </div>
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <FaMoneyBillWave className="text-blue-600 text-lg mr-3" />
                        <div className='w-1/2'>
                            <div className="text-xs text-blue-600">Stock Purchase Value</div>
                            <div className="font-semibold">{Number(stats.totalStockValue).toLocaleString()} Rs.</div>
                        </div>
                        <div className='w-1/2'>
                            <div className="text-xs text-blue-600">Estimated Stock Value</div>
                            <div className="font-semibold">{Number(stats.totalStockEstimatedValue).toLocaleString()} Rs.</div>
                        </div>
                    </div>

                    {stats.lowStockProducts > 0 && (
                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <FaExclamationTriangle className="text-yellow-600 text-lg mr-3" />
                            <div>
                                <div className="text-xs text-yellow-600">Low Stock Alert</div>
                                <div className="font-semibold">{stats.lowStockProducts} products need restock</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ShadowBox>
    );
}
