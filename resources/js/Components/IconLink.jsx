import React from 'react';
import {Link} from "@inertiajs/react";

const IconLink = ({ href, icon, className = '' }) => {
    return (
        <Link
            href={href}
            className={`p-2 block text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white active:bg-primary-500 active:text-white ${className}`}
        >
            {icon}
        </Link>
    );
};

export default IconLink;
