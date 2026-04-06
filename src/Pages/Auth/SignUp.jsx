import { NavLink } from "react-router";
import { Button } from "../../Components/Atoms/Button";
import { SocialButton } from "../../Components/Atoms/SocialButton";
import { Logo } from "../../Components/Atoms/Logo";
import { InputEmail } from "../../Components/Form/InputEmail";
import { InputPassword } from "../../Components/Form/InputPassword";
import { ConfirmPassword } from "../../Components/Form/ConfirmPassword";
import { saveAccount } from "../../Components/Atoms/SaveAccount";
import { useState } from "react";


function SignUp
() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const handleRegister = () => {
        if(password !== confirm) 
            return alert("Check Your Input");
        saveAccount({email,password})
        alert("Account Saved Successfully")
        setEmail(""); setPassword(""); setConfirm("");
        window.location.href = "/login"
    }


    return (
        <main>
            <section className="flex min-h-screen overflow-hidden bg-blue-600">

            <section className="left-side bg-white md:rounded-r-4xl px-6 py-10 md:w-1/2 md:px-10">
                <Logo className="text-xl" color="blue" />
                <p className="text-xl font-medium py-3">Start Accessing Banking Needs
                    With All Devices and All Platforms
                    With 30.000+ Users</p>
                <p className="text-gray-500 text-sm">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
                <section className="flex flex-row gap-5 py-5  md:flex-col">
                    <SocialButton className="w-full p-2 md:flex md:flex-row md:gap-2">
                        <img className="w-7 md:w-5 md:m-0 m-auto md:ml-auto" src="/src/assets/icons/googleround.svg" alt="google-icon" />
                        <p className="hidden md:flex md:mr-auto">Sign Up With Google</p>
                    </SocialButton>
                    <SocialButton className="w-full p-2 md:flex md:flex-row md:gap-2 ">
                        <img className="w-9 m-auto md:ml-auto md:w-6 md:m-0" src="/src/assets/icons/fbround.svg" alt="facebook-icon" />
                        <p className="hidden md:flex md:mr-auto">Sign Up With Facebook</p>
                    </SocialButton>
                </section>
                <section className="flex flex-row items-center justify-between">
                    <hr className="border border-gray-300 w-[40%]" />
                    <p className="text-gray-400" >Or</p>
                    <hr className="border border-gray-300 w-[40%]" />
                </section>
                <section>
                    <InputEmail value={email} onChange={e => setEmail(e.target.value)}></InputEmail>
                    <InputPassword value={password} onChange={e => setPassword(e.target.value)}></InputPassword>
                    <ConfirmPassword value={confirm} onChange={e => setConfirm(e.target.value)}password={password}></ConfirmPassword>
                    <Button onClick={handleRegister}   className="w-full h-12 py-2 mt-4" color="blue">
                        Register
                    </Button>
                    <p className="text-center mt-2 text-gray-600">Have An Account? 
                        <NavLink
                            className="text-blue-600" to={"/login"}> Login
                        </NavLink>
                    </p>
                </section>
            </section>
            <section className="hidden items center right-side bg-blue-600 md:flex md:w-1/2 justify-center">
                <img src="/src/assets/icons/handwallet.svg" alt="hand and wallet" />
            </section>
            </section>
        </main>
    )
}

export default SignUp
;