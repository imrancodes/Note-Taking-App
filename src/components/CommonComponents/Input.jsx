import { useId } from 'react';

const Input = ({
    label,
    onValueChange,
    value,
    type = 'text',
    classname = '',
    ...props
}) => {
    const id = useId();

    return (
        <div>
            {label && <label className='flex dark:text-white text-[14px]' htmlFor={id}>{label}</label>}
            <input
                type={type}
                value={value}
                {...props}
                className={`pr-4 pl-2 py-2 outline-0 border border-gray-400 w-full rounded ${classname} my-2 dark:text-white`}
                onChange={(e) => onValueChange && onValueChange(e.target.value)}
                id={id}
            />
        </div>
    );
};

export default Input;
