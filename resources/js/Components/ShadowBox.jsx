import React from 'react';

const ShadowBox = ({children}) => {
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            {children}
        </div>
    );
};

export default ShadowBox;
