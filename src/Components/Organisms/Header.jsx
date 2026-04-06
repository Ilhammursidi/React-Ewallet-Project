import { NavLink } from "react-router";
import { Button } from "../Atoms/Button";
import { Logo } from "../Atoms/Logo";
import { HamburgerButton } from "../Atoms/HamburgerButton";
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
                    <Button className="border h-10 w-95 text-blue-600 rounded-md" onClick={()=> setOpen(false)}><NavLink to={"/login"}>
                Sign In
            </NavLink>
                </Button>
            <Button onClick={()=> setOpen(false)} color="white" className="border h-10 w-95 text-blue-600 rounded-md"><NavLink to={"/signup"}>
                    Sign Up
                    </NavLink>
                </Button>
                </section>
            )}       
        </header>
    )
}

