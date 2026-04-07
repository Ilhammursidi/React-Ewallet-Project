import { useState, useEffect } from "react";

/**
 * a confirm password input component
 * @typedef {Object} ConfirmPasswordProps
 * @param {Object} props - The properties for the input
 * @param {string} props.password - The actual password
 * @param {string} props.value - The value of the input
 * @param {function} props.onChange - The function to call when the input value changes
 * @param {string} props.className - class name for styling the input
 * @returns {JSX.Element} The ConfirmPassword component
 */

export const ConfirmPassword = ({password,value,onChange,className=""})=>{
    const [show, setShow] = useState(false);
    const [error,setError] = useState("");
    
    useEffect(()=>{
        if(value && value !== password)
            setError("Password Does Not Match")
        else setError("");
        }, [value, password]);
    
    const defaultClass = "rounded-md bg-gray-100/30 p-3 px-5 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2 " 
    const finalClass = `${defaultClass} ${className}`
    const icon = !show 
    ? "/icons/EyeSlash.svg"
    : "/icons/fi_eye.svg"

    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="confirmPassword">Confirm Password</label>
        <section className={finalClass}>
        <img  src="/icons/Password.svg" alt="confirm-password" />
        <input 
        className="focus:outline-none w-full" 
        type={show ? "text" : "password"} 
        id="confirmPassword"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Password Again"/>
        <img
        className="ml-auto w-5"
        onClick={() => setShow(!show)} 
        src={icon} alt="toggle visibility" />
        </section>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </section>
    )
}
