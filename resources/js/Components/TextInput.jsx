import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', max, isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            max={max}
            type={type}
            className={
                'w-full rounded-sm border-gray-300 !py-1.5 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 ' +
                className
            }
            ref={localRef}
        />
    );
});
