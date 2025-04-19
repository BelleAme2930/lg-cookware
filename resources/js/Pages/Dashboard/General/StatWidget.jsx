import React from 'react';
import {FaBox} from "react-icons/fa";

export default function StatWidget({ title, value, icon = <FaBox />, className = '', background = '', color = 'text-white' }) {

    return (
        <div className={`flex-1 rounded-lg ${className}`}>
            <div className={`flex items-center gap-2 p-4 rounded-lg ${background} bg-opacity-60`}>
                <div className={`flex justify-center items-center w-12 h-12 rounded-lg mr-2 ${background}`}>
                    {icon}
                </div>
                <div>
                    <div className={`text-sm font-semibold ${color}`}>
                        {title}
                    </div>
                    <div className={`text-lg font-bold ${color}`}>
                        {value}
                    </div>
                </div>
            </div>
        </div>
    );
}
