import React from 'react';

const LabelValue = ({children, title, lastRow = false, className = ''}) => {
    return (
        <div className={`flex justify-between text-sm pt-2 pb-3 mt-2 ${!lastRow && 'border-b border-gray-200'}`}>
            <div className='font-semibold'>{title}: </div>
            <div className={className}>{children}</div>
        </div>
    );
};

export default LabelValue;
