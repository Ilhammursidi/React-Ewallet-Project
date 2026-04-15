import { NavLink } from "react-router";

export const Navbar = ({className, mobile = false }) => {
    return (
        <nav>
        <section className={`${className} ${mobile ? "bg-blue-600 text-white p-4" : "p-4 flex flex-col space-y-2"}`}>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/icons/dashboard-two.svg" alt="dashboard" />
                <p>Dasboard</p>
            </section>
            </NavLink>
            <NavLink to="/transfer" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/icons/Send.svg" alt="transfer" />
                <p>Transfer</p>
            </section>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="justify-center flex gap-2">
                <img src="/icons/history.svg" alt="history" />
                <p>History</p>
                </section>
            </NavLink>
            <NavLink to="/topup" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
            <section className="flex justify-center gap-2">
                <img src="/icons/Upload.svg" alt="topup" />
                <p>Top Up</p>
            </section>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/icons/2 User.svg" alt="profile" />
                <p>Profile</p>
                </section>
            </NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "bg-blue-600 text-white px-3 py-2 rounded" : "text-gray-600 hover:bg-gray-200 px-3 py-2 rounded"}>
                <section className="flex justify-center gap-2">
                <img src="/icons/Log Out.svg" alt="logout" />
                <p>Logout</p>

                </section>
            </NavLink>
        </section>
        </nav>
    )
}

