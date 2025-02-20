import React from 'react';
import {Link} from "@inertiajs/react";

const Button = ({ children, onClick, icon, className = '', disabled = false, type = 'button' }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`px-4 py-2 flex items-center gap-2 bg-primary-500 text-white text-sm font-semibold rounded-sm shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {icon}{children}
        </button>
    );
};

export default Button;
