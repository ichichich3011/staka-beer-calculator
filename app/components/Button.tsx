


const Button = ({
                    key,
                    onClick,
                    children,
                    className,
                    disabled,
                }: { key?: string, onClick: () => void, children: React.ReactNode, className?: string, disabled?: boolean | undefined    }) => {
    return (
        <button className={`p-4 text-3xl md:text-5xl ${className} ${disabled ? 'opacity-20' : ''}`} onClick={onClick} key={key} disabled={disabled}>
            {children}
        </button>
    )
}


export default Button;
