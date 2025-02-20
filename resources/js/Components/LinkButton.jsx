import React from 'react';
import {Link} from "@inertiajs/react";

const LinkButton = ({ children, href, icon, className = '' }) => {
    return (
        <Link
            href={href}
            className={`px-4 py-2 flex items-center gap-2 bg-primary-500 text-white text-sm font-semibold rounded-sm shadow-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75 ${className}`}
        >
            {icon}{children}
        </Link>
    );
};

export default LinkButton;
