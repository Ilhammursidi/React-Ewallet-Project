import { Navbar } from "./Navbar";
import { UserNavbar } from "../Atoms/UserNavbar";
import { useState,useEffect } from "react";
import { Logo } from "../Atoms/Logo";
import { HamburgerButton } from "../Atoms/HamburgerButton";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Atoms/Modal";
import { SideBar } from "../Atoms/SideBar";
import { getProfile } from "../../Redux/thunks/profile";

/**
 * @typedef {Object} AppHeaderProps
 * @param {string} param0.className - The class name for styling the header
 * @returns {JSX.Element} The AppHeader component
 */

export function AppHeader({className}) {
    const API_URL = import.meta.env.VITE_API_URL;
    // const currentUser = useSelector((state) => state.auth.currentUser);
    // const userLogin = currentUser || []
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state)=> state.users)

    const [open, setOpen] = useState(false);

    useEffect(()=>{
        dispatch(getProfile())
    },[dispatch])

    const userLogin = data
    // console.log(data)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <header className={`w-full sticky top-0 z-50 bg-blue-600 border-b border-white md:border-gray-400 ${className}`}>
                <section className="header-with-button flex px-5 md:px-10 justify-between">
                    <Logo color="blue" className="hidden sm:hidden md:flex"></Logo>
            <section className="flex gap-2 py-2 items-center md:flex-row-reverse md:ml-auto">
                <UserNavbar></UserNavbar>
                <img className="w-10 h-10 rounded-full" src={`${API_URL}/${userLogin?.photo}` || null } alt="photo-profile" />
                <section className="text-white">
                    <p className="text-xs md:hidden">Hello,</p>
                    <p className="font-medium text-sm md:text-gray-500">{userLogin?.fullName || userLogin?.email?.split("@")[0]}</p>
                </section>
            </section>
            
            <HamburgerButton className="sm:block md:hidden" onClick={()=> setOpen(!open)}>
                <img src="/icons/gg_menu-right-alt.svg" alt="hamburger icon" />
            </HamburgerButton>

            </section>
                <Modal className="w-full top-14 md:hidden" isOpen={open} onClose={()=>setOpen(!open)} inner="w-4/6 top-0 right-0 absolute z-20">
                    <Navbar className="bg-white border-b shadow border-gray-200 w-full h-screen absolute z-10"></Navbar>
                </Modal>        
        </header>       
    )
}