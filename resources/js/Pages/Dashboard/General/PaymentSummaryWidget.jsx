import React from 'react';

export default function PaymentSummaryWidget({ className ='', title, amount, count, icon, bgColor = 'bg-gray-100', textColor = 'text-gray-800', extra = '' }) {
    return (
        <div className={`flex flex-col p-4 rounded-xl shadow-md ${className} ${bgColor}`}>
            <div className="flex items-center justify-between mb-2">
                <div className={`text-lg font-semibold ${textColor}`}>
                    {title}
                </div>
                <div className="text-2xl">
                    {icon}
                </div>
            </div>
            <div className={`text-2xl font-bold ${textColor}`}>
                {amount.toLocaleString()} Rs.
            </div>
            <div className={`text-sm ${textColor}`}>
                {count} Payments {extra}
            </div>
        </div>
    );
}
