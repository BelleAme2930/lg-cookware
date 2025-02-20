import React from 'react';

const Title = ({title, className = ''}) => {
    return (
        <h2 className={`text-md font-semibold leading-tight text-gray-800 ${className}`}>
            {title}
        </h2>
    );
};

export default Title;
