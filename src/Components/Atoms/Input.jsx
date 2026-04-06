import { useState,useEffect } from "react"

export const InputEmail = ({value,onChange,className=""}) => {
    const defaultClass = "rounded-md bg-gray-100/30 px-5 p-3 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2" 
    const finalClass = `${defaultClass} ${className}`
    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="email">Email</label>
        <section className={finalClass}>
        <img  src="/src/assets/icons/blackMail.svg" alt="mail" />
        <input 
        className="focus:outline-none" 
        type="email" 
        id="email"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Email"/>
        </section>
        </section>
    )
}

export const InputPassword = ({value,onChange,className=""})=>{
    const [show, setShow] = useState(false) 
    const defaultClass = "rounded-md bg-gray-100/30 p-3 px-5 text-sm border border-gray-400 flex flex-row gap-3 focus-within:border-blue-500 focus-within:border-2 " 
    const finalClass = `${defaultClass} ${className}`

    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="password">Password</label>
        <section className={finalClass}>
        <img  src="/src/assets/icons/Password.svg" alt="password" />
        <input 
        className="focus:outline-none" 
        type={show ? "text" : "password"} 
        id="password"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Password"/>
        <img
        className="ml-auto"
        onClick={() => setShow(!show)} 
        src="/src/assets/icons/EyeSlash.svg" alt="eye-slash" />
        </section>
        </section>
    )
}

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

    return (
        <section className="flex py-2 flex-col gap-3 font-medium">
            <label htmlFor="confirmPassword">Confirm Password</label>
        <section className={finalClass}>
        <img  src="/src/assets/icons/Password.svg" alt="confirm-password" />
        <input 
        className="focus:outline-none" 
        type={show ? "text" : "password"} 
        id="confirmPassword"
        value={value}
        onChange={onChange}
        placeholder="Enter Your Password Again"/>
        <img
        className="ml-auto"
        onClick={() => setShow(!show)} 
        src="/src/assets/icons/EyeSlash.svg" alt="eye-slash" />
        </section>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </section>
    )
}

export function saveAccount({email,password}) {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    accounts.push({ email, password });
    localStorage.setItem("accounts",JSON.stringify(accounts));
}

