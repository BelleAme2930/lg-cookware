import React from 'react';

export default function DashboardWidget({ title, children, className = "", actions = null }) {
    return (
        <div className={`bg-white overflow-hidden shadow-sm rounded-lg ${className}`}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {actions && (
                    <div className="flex space-x-2">
                        {actions}
                    </div>
                )}
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
}
