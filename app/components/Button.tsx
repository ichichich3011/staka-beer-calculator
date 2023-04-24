


const Button = ({
                    key,
                    onClick,
                    children,
                    className
                }: { key?: string, onClick: () => void, children: React.ReactNode, className?: string}) => {
    return (
        <button className={`p-4 grow text-5xl ${className}`} onClick={onClick} key={key}>
            {children}
        </button>
    )
}


export default Button;
