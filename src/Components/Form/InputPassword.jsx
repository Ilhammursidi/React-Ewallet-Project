import { useState,useEffect } from "react";
/**
 * A password input component
 * @typedef {Object} InputPasswordProps
 * @param {Object} props - The properties for the input
 * @param {string} props.value - The value of the input
 * @param {function} props.onChange - The function to call when the input value changes
 * @param {string} props.className - class name for styling the input
 * @returns {JSX.Element} The InputPassword component
 */

export const InputPassword = ({value,onChange,className=""})=>{
    const [show, setShow] = useState(false);
    const [error,setError] = useState("");
        
        useEffect(()=>{
            if(value.length === 0) {
                setError("")
            }else if( value.length < 5) {
                setError("password must be more than 5 characters")
            }else setError("");
            }, [value]);
    
    const defaultClass = "rounded-md bg-gray-100/30 p-3 px-5 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2 " 
    const finalClass = `${defaultClass} ${className}`

    const icon = !show 
    ? "/icons/EyeSlash.svg"
    : "/icons/fi_eye.svg"

    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="password">Password</label>
        <section className={finalClass}>
        <img  src="/icons/Password.svg" alt="password" />
        <input 
        className="focus:outline-none w-full" 
        type={show ? "text" : "password"} 
        id="password"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Password"/>
        <img
        className="ml-auto w-5"
        onClick={(e) => setShow(!show)} 
        src={icon} alt="toggle visibility" />
        </section>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </section>
    )
}
