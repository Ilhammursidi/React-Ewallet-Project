import { useState } from "react";
import {BlueLogo} from "../../Components/Atoms/EwalletLogo";
import { InputEmail } from "../../Components/Atoms/Input";
import { BlueButton } from "../../Components/Atoms/Button";

export function ForgotPassword(){
    const [email, setEmail] = useState("");
    const handdleSubmit = () => {
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        const user = accounts.find(acc => acc.email === email);
        if(user){
            const newPassword = Math.random().toString(36).slice(-8);
            const updateAccounts = accounts.map(acc => acc.email === email ? {
                ...acc,password: newPassword} : acc);
                localStorage.setItem("accounts",JSON.stringify(updateAccounts));

                alert(`New Password Sent Successfully \nNew Password : ${newPassword}`);
                setEmail("") 
            } else {
                alert("Invalid Email")
            }
        };
    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <section className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <BlueLogo></BlueLogo>
                <p className="text-xl font-medium py-5">Fill Out Form Correctly 👋</p>
                <p className="text-gray-600 text-sm py-5">We will send new password to your email</p>
                <InputEmail
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></InputEmail>
                <BlueButton onClick={handdleSubmit} className="w-full py-3 mt-3">Submit</BlueButton>
            </section>
        </section>
    )

    }
