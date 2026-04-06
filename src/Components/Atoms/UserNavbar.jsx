import { NavLink } from "react-router";
import { useState } from "react";

// user navbar for user header dropdown menu profile and logout
export const UserNavbar = ({className}) => {
    const [open, setOpen] = useState(false);
    return (
        <section className="hidden md:flex">
            <button onClick={() => setOpen(!open)}>
                <img src="/src/assets/icons/down.svg" alt="dropdown" />
            </button>

            {open && (
                <section className="absolute border top-12 right-10 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20">
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700" : "flex items-center font-semibold gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"}>
                        <img src="/src/assets/icons/fi_user.svg" alt="user" />
                        Profile
                    </NavLink>
                    <NavLink to="/" className={({ isActive }) => isActive ? "bg-gray-100 block px-4 py-2 text-sm text-gray-700" : "flex items-center font-semibold gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"}>
                        <img src="/src/assets/icons/Log Out.svg" alt="logout" />
                        Logout
                    </NavLink>
                </section>
            )}
        </section>
    )
}