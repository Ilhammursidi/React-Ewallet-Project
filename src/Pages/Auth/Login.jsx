import { NavLink } from "react-router";
import { Button } from "../../Components/Atoms/Button";
import { SocialButton } from "../../Components/Atoms/SocialButton";
import { Logo } from "../../Components/Atoms/Logo";
import { InputEmail } from "../../Components/Form/InputEmail";
import { InputPassword } from "../../Components/Form/InputPassword";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
/**
 * Login Page Component
 * @typedef {Object} LoginProps
 * @property {React.ReactNode} [children] - Optional children elements
 */

/**
 * Handle login form submission
 * @callback HandleLogin
 * @param {React.FormEvent<HTMLFormElement>} e - Form submit event
 * @returns {void}
 */

/**
 * A login component for user authentication
 * 
 * @param {LoginProps} props - Component props (optional)
 * @returns {JSX.Element} The Login component
 */

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const account = JSON.parse(localStorage.getItem("accounts") || "[]")
        const user = account.find(acc => acc.email === email && acc.password === password)
        if(user) {
            toast.success("Login Successful")
            setEmail(""); setPassword("");
            
            localStorage.setItem("currentUser", JSON.stringify(user))
            
            if (user.userPin) {
                navigate("/dashboard")
            } else {
                navigate("auth/enter-pin")
            }
        } else {
            toast.error("Invalid Email or Password",{duration:2000})
        }
    }


    return (
        <main>
            <section className="flex min-h-screen overflow-hidden bg-blue-600">

            <section className="left-side w-full bg-white md:rounded-r-4xl px-6 py-30 md:w-1/2 md:px-10">
                <Logo color="blue" className="text-xl" />
                <h1 className="text-xl font-medium py-3">Hello Welcome Back 👋</h1>
                <p className="text-gray-500 text-sm">Fill out the form correctly or you can login with several option.</p>
                <section className="flex flex-row gap-5 py-5  md:flex-col">
                    <SocialButton className="w-full p-2 md:flex md:flex-row md:gap-2">
                        <img className="w-7 md:w-5 md:m-0 m-auto md:ml-auto" src="/icons/googleround.svg" alt="google-icon" />
                        <p className="hidden md:flex md:mr-auto">Login With Google</p>
                    </SocialButton>
                    <SocialButton className="w-full p-2 md:flex md:flex-row md:gap-2 ">
                        <img className="w-9 m-auto md:ml-auto md:w-6 md:m-0" src="/icons/fbround.svg" alt="facebook-icon" />
                        <p className="hidden md:flex md:mr-auto">Login With Facebook</p>
                    </SocialButton>
                </section>
                <section className="flex flex-row items-center justify-between">
                    <hr className="border border-gray-300 w-[40%]" />
                    <p className="text-gray-400" >Or</p>
                    <hr className="border border-gray-300 w-[40%]" />
                </section>
                <form onSubmit={handleLogin}>
                    <InputEmail value={email} onChange={e => setEmail(e.target.value)}></InputEmail>
                    <InputPassword value={password} onChange={e => setPassword(e.target.value)}></InputPassword>
                    <p className="text-gray-600">Forgot Your Password? <NavLink
                        className="text-blue-600"
                    to={"/auth/forgot-password"} >
                        Click here
                    </NavLink></p>
                    <Button onClick={handleLogin} className="w-full h-12 py-2 mt-4" color="blue">
                        Login
                    </Button>
                    <p className="text-center mt-2 text-gray-600">Have An Account? 
                        <NavLink 
                            className="text-blue-600" to={"/auth/signup"}> Register
                        </NavLink>
                    </p>
                </form>
            </section>
            <section className="hidden items center right-side bg-blue-600 md:flex md:w-1/2 justify-center">
                <img src="/icons/hand-phone.svg" alt="hand and phone" />
            </section>
            </section>
        </main>
    )
}

export default Login;