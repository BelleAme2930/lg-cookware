import React from 'react';
import {Link} from '@inertiajs/react';
import * as FaIcons from "react-icons/fa";
import ShadowBox from "@/Components/ShadowBox.jsx";
import {FaArrowRight} from "react-icons/fa";

export default function PurchasesOverviewWidget({title, stats, className = ""}) {
    console.log(stats)
    const getIconSize = (base = "text-xl") => {
        return `${base} md:text-2xl`;
    };

    return (
        <ShadowBox className={className}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className='text-primary-600 items-center text-sm'>
                    <Link
                        className='flex gap-1 items-center'
                        href={stats.total.route}
                    >
                        <span>View All</span>
                        <FaArrowRight/>
                    </Link>
                </div>
            </div>
            <div className="flex">
                {Object.keys(stats).map((key) => (
                    <div className='flex-1'>
                        <Link
                            key={key}
                            href={stats[key].route}
                            className="bg-white hover:bg-gray-50 border border-gray-100 rounded-lg p-3 flex flex-col items-center justify-center transition-all hover:shadow-md group"
                        >
                            <div
                                className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-${stats[key].color}-100 flex items-center justify-center mb-2 group-hover:bg-${stats[key].color}-200 transition-colors`}>
                                {FaIcons[stats[key].icon] &&
                                    React.createElement(FaIcons[stats[key].icon], {
                                        className: `text-${stats[key].color}-600 ${getIconSize()}`
                                    })
                                }
                            </div>
                            <h4 className="text-gray-700 font-medium text-xs md:text-sm text-center">{stats[key].label}</h4>
                            <p className={`text-${stats[key].color}-600 text-sm md:text-lg font-bold mt-1`}>
                                {stats[key].value} Rs.
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </ShadowBox>
    );
}
