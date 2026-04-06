export const BlueButton = ({children,onClick,className=""})=>{
    const defaultClass = "text-white rounded-md bg-blue-600 p-2 border border-white"
    const finalClass =`${defaultClass} ${className}`
    return (
        <button className={finalClass} onClick={onClick}>{children}</button>
    )
}

export const WhiteButton = ({children,onClick,className=""})=>{
    const defaultClass = "text-blue-600 rounded-md border bg-white p-2"
    const finalClass =`${defaultClass} ${className}`
    return (
        <button className={finalClass} onClick={onClick}>{children}</button>
    )
}

export const HamburgerButton = ({children,onClick,className="sm:hidden md:hidden "}) => {
    return (
        <button className={className} onClick={onClick}>{children}</button>
    )
}

export const SocialButton = ({children,onClick,className=""})=>{
    const defaultClass = "text-gray-500 rounded-full border bg-white p-2"
    const finalClass =`${defaultClass} ${className}`
    return (
        <button className={finalClass} onClick={onClick}>{children}</button>
    )
}
