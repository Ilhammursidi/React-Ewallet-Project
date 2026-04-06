/**
 * A button component
 * @typedef {Object} ButtonProps
 * @param {Object} props - The properties for the button
 * @param {React.ReactNode} props.children - The content of the button
 * @param {function} props.onClick - The function to call when the button is clicked
 * @param {string} props.className - class name for styling the button 
 * @returns {JSX.Element} The Button component
 */


export const Button = ({children,onClick,className=""})=>{
    const defaultClass = "rounded-md p-2"
    const finalClass =`${defaultClass} ${className}`
    return (
        <button className={finalClass} onClick={onClick}>{children}</button>
    )
}



