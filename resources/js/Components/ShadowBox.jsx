import React from 'react';
import Title from "@/Components/Title.jsx";

const ShadowBox = ({children, className, title = null}) => {
    return (
        <div className={`p-4 bg-white shadow rounded-lg ${className}`}>
            {title && <Title title={title} className='mb-3 font-bold'/>}
            {children}
        </div>
    );
};

export default ShadowBox;
