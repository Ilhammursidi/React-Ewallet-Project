import { NavLink } from "react-router";
import { BlueButton, WhiteButton, HamburgerButton } from "../Atoms/Button";
import { BlueLogo, Logo } from "../Atoms/EwalletLogo";
import { Navbar,UserNavbar } from "./Navbar";
import { useState,useEffect } from "react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="h-15 px-5 sm:px-10 md:px-30 border-b border-white  bg-blue-600 flex justify-between w-full md:border-none items-center">
            <Logo/>
            <section className="hidden sm:flex md:flex flex-row gap-5 items-center">
                {/* belum disambung */}
            </section>
            <HamburgerButton onClick={()=> setOpen(!open)}>
                <img src="/src/assets/icons/gg_menu-right-alt.svg" alt="hamburger icon" />
            </HamburgerButton>

            {open && (
                <section className="absolute left-0 bg-white justify-center rounded-b-4xl shadow-lg top-15 w-full flex flex-col items-center sm:hidden md:hidden p-4 gap-2">
                    {/* belum disambungkan */}
                    <BlueButton className="border h-10 w-95 text-blue-600 rounded-md" onClick={()=> setOpen(false)}><NavLink to={"/login"}>
                Sign In
            </NavLink>
                </BlueButton>
            <WhiteButton onClick={()=> setOpen(false)} className="border h-10 w-95 text-blue-600 rounded-md"><NavLink to={"/signup"}>
                    Sign Up
                    </NavLink>
                </WhiteButton>
                </section>
            )}       
        </header>
    )
}

export function AppHeader({className}) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
    const email = localStorage.getItem("email"); 
    if (email) {
      const name = email.split("@")[0];
      setUsername(name);
    }
  }, []);

    return (
        <header className={`w-full sticky top-0 z-50 bg-blue-600 border-b border-white md:border-gray-400 ${className}`}>
                <section className="header-with-button flex px-5 md:px-10 justify-between">
                    <BlueLogo className="hidden sm:hidden md:flex"></BlueLogo>
            <section className="flex gap-2 py-2 items-center md:flex-row-reverse md:ml-auto">
                <UserNavbar></UserNavbar>
                <img className="w-10" src="/src/assets/icons/ghaluh.svg" alt="gahluh" />
                <section className="text-white">
                    <p className="text-xs md:hidden">Hello,</p>
                    <p className="font-medium text-sm md:text-gray-500">{username || "User"}</p>
                </section>
            </section>
            

            <HamburgerButton className="sm:block md:hidden" onClick={()=> setOpen(!open)}>
                <img src="/src/assets/icons/gg_menu-right-alt.svg" alt="hamburger icon" />
            </HamburgerButton>

            </section>
            {open && (
                <Navbar className="bg-white w-full border-b shadow border-gray-200 absolute top-full z-10"></Navbar>
            )}
        </header>       
    )
}