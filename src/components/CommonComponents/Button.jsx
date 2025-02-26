const Button = ({
    classname = '',
    children,
    type = 'button',
    onClick,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            {...props}
            className={`text-center w-full cursor-pointer rounded ${classname}`}>
            {children}
        </button>
    );
};

export default Button;