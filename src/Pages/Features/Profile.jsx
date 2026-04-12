import { AppHeader } from "../../Components/Organisms/AppHeader"
import { SideBar } from "../../Components/Atoms/SideBar"
import { Button } from "../../Components/Atoms/Button"
import { NavLink } from "react-router"

export const Profile = () => {
    return ( 
         <section>
            <AppHeader className="md:bg-white"/>
            <section className="md:flex md:justify-between w-full">
                <SideBar></SideBar>
            </section>
            
            <section className=" md:flex md:flex-col">
            <section className="hidden md:flex p-5 md:ml-60">
             <img src="/assets/icon/blueupload.svg" alt=""/>
             <h1 className="font-semibold">Profile</h1>
         </section>

         <section className="p-5 font-medium md:border border-gray-400 rounded md:w-4/6 md:ml-70">
            <p>Profile picture</p>
            <section className="flex py-5 justify-between gap-5">
                <div className="w-70 justify-center flex rounded-md bg-gray-100 h-35">
                <img  className="m-auto w-10" src="/public/icons/userone.svg" alt="photo-profile" />
                </div>
                <article className="w-full flex flex-col justify-between py-2 gap-5">
                    <Button color="blue" className="text-white flex items-center p-3 gap-2 md:w-50 w-full">
                        <img src="/public/icons/Edit Square.svg" alt="change-profile" />
                        <p>Change Profile</p>
                    </Button>
                    <Button color="white" className="text-red-600 border-red-600 p-3 flex md:w-50 items-center gap-2 w-full">
                        <img src="/public/icons/Delete.svg" alt="delete" />
                        <p>Delete Profile</p>
                    </Button>
                </article>
            </section>
                <p className="text-sm font-normal pb-5">The profile picture must be 512 x 512 pixels or less</p>
                <label>Full Name</label>
                <div className="border border-gray-400 flex gap-2 p-3 mt-2 mb-2 focus-within:border-blue-600 rounded-md">
                    <img src="/public/icons/userone.svg" alt="user" />
                    <input className="focus:outline-none text-sm w-full" type="text" placeholder="Input Your Full Name"/>
                </div>
                <label>Phone</label>
                <div className="border border-gray-400 flex gap-2 p-3 mb-2 mt-2 focus-within:border-blue-600 rounded-md">
                    <img src="/public/icons/tlePhone (1).svg" alt="phone" />
                    <input className="focus:outline-none text-sm w-full" type="text" placeholder="Input Your Number Phone"/>
                </div>
                <label>Email</label>
                <div className="border border-gray-400 flex gap-2 p-3 mt-2 focus-within:border-blue-600 rounded-md">
                    <img src="/public/icons/blackMail.svg" alt="mail" />
                    <input className="focus:outline-none text-sm w-full" type="text" placeholder="Input Your Email"/>
                </div>

                <section className="flex flex-col gap-2 mb-2 mt-2">
                <p>Password</p>
                <NavLink className="font-normal text-blue-600">
                    Change Password
                </NavLink>
                <p>Pin</p>
                <NavLink className="font-normal text-blue-600">
                    Change Pin
                </NavLink>
                </section>
                <Button color="blue" className="w-full">Submit</Button>
                </section>
         </section>
            </section>
)
}
    