import { useNavigate, NavLink, Navigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/slice/authslice";

// user navbar for user header dropdown menu profile and logout
export const UserNavbar = ({className}) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        navigate("/")
    }

    return (
        <section className="hidden md:flex">
            <button onClick={() => setOpen(!open)}>
                <img src="/icons/down.svg" alt="dropdown" />
            </button>

            {open && (
                <section className="absolute border top-12 text-center items-center flex flex-col gap-5 right-10 mt-2 w-40 bg-white rounded-md shadow-lg p-2 z-20">
                    <NavLink to="/profile" className="flex gap-5 items-center hover:bg-amber-600 hover:invert hover:brigthness-0 rounded-md p-2 font-semibold" >
                        <img src="/icons/fi_user.svg" alt="user" />
                        Profile
                    </NavLink>
                    <NavLink onClick={handleLogout} className="flex gap-5 items-center hover:bg-blue-600 hover:text-white rounded-md p-2 font-semibold">
                        <img src="/icons/Log Out.svg" alt="logout" />
                        Logout
                    </NavLink>
                </section>
            )}
        </section>
    )
}