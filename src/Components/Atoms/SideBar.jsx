
/**
 * a sidebar component for the dashboard
 * @typedef {Object} SideBarProps
 * @param {Object} props - The properties for the sidebar
 * @param {string} props.className - class name for styling the sidebar
 * @returns {JSX.Element} The SideBar component
*/
import { NavLink } from "react-router";

export const SideBar = ({className}) => {
    const defaultClass = "hidden md:flex flex-col justify-start w-1/6 p-10 gap-5 border-r border-gray-400";

    return (
        <aside className={`${defaultClass} ${className}`}>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/dashboard-two.svg" alt="dashboard" />
                <p>Dasboard</p>
            </section>
            </NavLink>
            <NavLink to="/transfer" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/src/assets/icons/Send.svg" alt="transfer" />
                <p>Transfer</p>
            </section>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/src/assets/icons/history.svg" alt="history" />
                <p>History</p>
                </section>
            </NavLink>
            <NavLink to="/topup" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/Upload.svg" alt="topup" />
                <p>Top Up</p>
            </section>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/2 User.svg" alt="profile" />
                <p>Profile</p>
                </section>
            </NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-5 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/src/assets/icons/Log Out.svg" alt="logout" />
                <p>Logout</p>

                </section>
            </NavLink>
        </aside>
            )}