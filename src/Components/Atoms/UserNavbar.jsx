import { useNavigate, NavLink, Navigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/slice/authslice";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { clearCharData } from "../../Redux/slice/graph";

export const UserNavbar = ({className}) => {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault()
        setOpen2(true)
        setOpen(false)
    }

    const toLogout = async () => {
        localStorage.setItem("intentional_logout", "true")
        await dispatch(logout()).then(()=>{
            navigate("/auth/login");
        })
        await dispatch(clearCharData())
    }

    return (
        <section className="hidden md:flex">
            <button onClick={() => setOpen(!open)}>
                <img src="/icons/down.svg" alt="dropdown" />
            </button>

        <Modal isOpen={open2} onClose={() => setOpen2(!open2)} className="top-14">
            <section className="w-80 h-30 m-auto rounded-md p-6 bg-white">
            <p className="text-center font-medium">Anda Ingin Keluar ?</p>
            <section className="justify-between gap-2 flex">
            <Button color="blue" onClick={toLogout} className="font-semibold w-full text-white">Ya</Button>
            <Button color="white" onClick={()=> setOpen2(false)} className="font-semibold w-full  text-blue-600">Tidak</Button>
            </section>
            </section>
        </Modal>

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