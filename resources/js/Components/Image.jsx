import React from "react";

const Image = ({ src, alt, caption, className }) => {
    return (
        <div className={`flex flex-col items-center ${className}`}>
            <img
                src={src}
                alt={alt}
                className="max-w-full h-auto"
                loading="lazy"
            />
            {caption && <p className="mt-2 text-gray-600 text-sm">{caption}</p>}
        </div>
    );
};

export default Image;
