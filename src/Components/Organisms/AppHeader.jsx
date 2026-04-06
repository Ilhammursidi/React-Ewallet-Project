import { Navbar } from "./Navbar";
import { UserNavbar } from "../Atoms/UserNavbar";
import { useState,useEffect } from "react";
import { Logo } from "../Atoms/Logo";
import { HamburgerButton } from "../Atoms/HamburgerButton";

/**
 * @typedef {Object} AppHeaderProps
 * @param {string} param0.className - The class name for styling the header
 * @returns {JSX.Element} The AppHeader component
 */

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
                    <Logo color="blue" className="hidden sm:hidden md:flex"></Logo>
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