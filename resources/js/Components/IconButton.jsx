import React from 'react';

const IconButton = ({ onClick, type = 'button', icon, className = '' }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`p-2 block text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white active:bg-primary-500 active:text-white ${className}`}
        >
            {icon}
        </button>
    );
};

export default IconButton;
