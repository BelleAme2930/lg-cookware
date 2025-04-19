import React from 'react';

export function PaymentBadge({ method }) {
    const getBadgeColor = () => {
        const colors = {
            'cash': 'bg-green-100 text-green-800 border-green-200',
            'transfer': 'bg-blue-100 text-blue-800 border-blue-200',
            'credit': 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'cheque': 'bg-red-100 text-red-800 border-red-200'
        };

        return colors[method] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getIcon = () => {
        const icons = {
            'cash': 'fa-money-bill',
            'transfer': 'fa-exchange-alt',
            'credit': 'fa-credit-card',
            'cheque': 'fa-money-check'
        };

        return icons[method] || 'fa-question-circle';
    };

    const getLabel = () => {
        const labels = {
            'cash': 'Cash',
            'transfer': 'Transfer',
            'credit': 'Credit',
            'cheque': 'Cheque'
        };

        return labels[method] || method;
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeColor()}`}>
            <i className={`fas ${getIcon()} mr-1`}></i>
            {getLabel()}
        </span>
    );
}
