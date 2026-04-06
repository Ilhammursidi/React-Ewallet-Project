import { useState } from "react";
import { NavLink } from "react-router";

export const Navbar = ({className, mobile = false }) => {
    return (
        <nav className={`${className} ${mobile ? "bg-blue-600 text-white p-4" : "p-4 flex flex-col space-y-2"}`}>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/dashboard-two.svg" alt="dashboard" />
                <p>Dasboard</p>
            </section>
            </NavLink>
            <NavLink to="/transfer" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/src/assets/icons/Send.svg" alt="transfer" />
                <p>Transfer</p>
            </section>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/src/assets/icons/history.svg" alt="history" />
                <p>History</p>
                </section>
            </NavLink>
            <NavLink to="/topup" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/Upload.svg" alt="topup" />
                <p>Top Up</p>
            </section>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/2 User.svg" alt="profile" />
                <p>Profile</p>
                </section>
            </NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/Log Out.svg" alt="logout" />
                <p>Logout</p>

                </section>
            </NavLink>
        </nav>
    )
}

// user navbar for user header dropdown menu profile and logout
export const UserNavbar = ({className}) => {
    const [open, setOpen] = useState(false);
    return (
        <section className="hidden md:flex">
            <button onClick={() => setOpen(!open)}>
                <img src="/src/assets/icons/down.svg" alt="dropdown" />
            </button>

            {open && (
                <section className="absolute border right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-20">
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