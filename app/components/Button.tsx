


const Button = ({
                    key,
                    onClick,
                    children,
                    className,
                    disabled,
                }: { key?: string, onClick: () => void, children: React.ReactNode, className?: string}) => {
    return (
        <button className={`p-4 text-5xl ${className}`} onClick={onClick} key={key} disabled={disabled}>
            {children}
        </button>
    )
}


export default Button;
