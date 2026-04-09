/**
 * a sidebar component for the dashboard
 * @typedef {Object} SideBarProps
 * @param {Object} props - The properties for the sidebar
 * @param {string} props.className - class name for styling the sidebar
 * @returns {JSX.Element} The SideBar component
*/
import { NavLink } from "react-router";

export const SideBar = ({className}) => {
    const defaultClass = "hidden md:min-h-screen md:flex flex-col bg-white z-40 justify-start w-1/6 py-5 px-5 gap-5 border-r border-gray-400";

    return (
        <aside className={`${defaultClass} ${className}`}>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-gray-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
                {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/dashboard-two.svg" alt="dashboard" /><span>Dasboard</span>
                </>
                }
            </NavLink>
            <NavLink to="/transfer" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-gray-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
                {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/Send.svg" alt="transfer" /><span>Transfer</span>
                </>
                }
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-gray-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
               {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/history.svg" alt="history" /><span>History</span>
                </>
                }
            </NavLink>
            <NavLink to="/topup" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-gray-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
            {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/Upload.svg" alt="topup" /><span>Top Up</span>
                </>
                }
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-gray-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
                {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/2 User.svg" alt="profile" /><span>Profile</span>
                </>
                }
            </NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "bg-blue-600 flex justify-center gap-2 text-white px-5 py-2 rounded" : "text-red-600 flex justify-center gap-2 hover:bg-gray-200 px-3 py-2 rounded"}>
                {({ isActive }) =>
                <>
                <img className={`w-5 h-5 transition ${ isActive ? "invert brightness-0" : "" }`} src="/icons/Log Out.svg" alt="logout" /><span>Log Out</span>
                </>
                }
            </NavLink>
        </aside>
            )}