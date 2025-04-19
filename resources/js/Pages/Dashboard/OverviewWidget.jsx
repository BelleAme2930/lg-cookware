import React from 'react';
import { Link } from '@inertiajs/react';
import * as FaIcons from "react-icons/fa";
import ShadowBox from "@/Components/ShadowBox.jsx";

export default function OverviewWidget({
                                               title,
                                               stats,
                                               colorTheme = "orange",
                                               className = ""
                                           }) {
    const gradients = {
        orange: "bg-gradient-to-r to-[#de6262] from-[#ffb88c]",
        blue: "bg-gradient-to-r to-[#2193b0] from-[#5cc2da]"
    };

    const gradient = gradients[colorTheme] || gradients.orange;

    const totalValue = stats.total?.value || "0";

    return (
        <ShadowBox className={`${className} overflow-hidden px-6`}>
            <div className="py-4 text-gray-700">
                <h2 className="text-2xl">{title}</h2>
            </div>

            <div className={`${gradient} rounded-lg p-6 text-white`}>
                <h3 className="text-xl font-medium mb-4">{title} Overview</h3>

                <div className="flex items-center mb-6">
                    <FaIcons.FaCoins className="text-white text-3xl mr-3" />
                    <span className="text-3xl font-bold">{totalValue} Rs</span>
                </div>

                {Object.keys(stats).filter(key => key !== 'total').map((key) => (
                    <div key={key} className="bg-white rounded-lg p-4 mb-4 text-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <Link href={stats[key].route || '#'} className="flex justify-between items-center">
                            <div className="flex items-center">
                                {FaIcons[stats[key].icon] ? (
                                    React.createElement(FaIcons[stats[key].icon], {
                                        className: `text-${stats[key].color}-500 text-2xl mr-3`
                                    })
                                ) : (
                                    <FaIcons.FaMoneyBillWave className="text-green-500 text-2xl mr-3" />
                                )}
                                <span className="font-medium">{stats[key].label}</span>
                            </div>
                            <span className="font-bold">{stats[key].value} Rs</span>
                        </Link>
                    </div>
                ))}
            </div>
        </ShadowBox>
    );
}
