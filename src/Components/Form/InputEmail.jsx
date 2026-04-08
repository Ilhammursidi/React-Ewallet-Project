import { useEffect,useState } from "react"

/**
 * An email input component
 * @typedef {Object} InputEmailProps
 * @param {Object} props - The properties for the input
 * @param {string} props.value - The value of the input
 * @param {function} props.onChange - The function to call when the input value changes
 * @param {string} props.className - class name for styling the input
 * @returns {JSX.Element} The InputEmail component
 */


export const InputEmail = ({value,onChange,className=""}) => {
    const [error,setError] = useState("");
    useEffect(()=>{
            if(value.length === 0) {
                setError("")
            }else if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ) {
                setError("Invalid Email Format")
            }else setError("");
            }, [value]);

    const defaultClass = "rounded-md bg-gray-100/30 px-5 p-3 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2" 
    const finalClass = `${defaultClass} ${className}`
    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="email">Email</label>
        <section className={finalClass}>
        <img  src="/icons/blackMail.svg" alt="mail" />
        <input 
        className="focus:outline-none w-full" 
        type="email" 
        id="email"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Email"
        required/>
        </section>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </section>
    )
}
