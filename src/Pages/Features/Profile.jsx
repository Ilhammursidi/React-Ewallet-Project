import { NavLink } from "react-router"
import { AppHeader } from "../../Components/Organisms/AppHeader"
import { SideBar } from "../../Components/Atoms/SideBar"
import { Button } from "../../Components/Atoms/Button"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../Redux/slice/register";
import { updateCurrentUser } from "../../Redux/slice/authslice";
import toast from "react-hot-toast"

export const Profile = () => {
    const userLogin = useSelector((state) => state.auth.currentUser)
    const [fullName, setFullName] = useState(userLogin?.fullName || "");
    const [phone, setPhone] = useState(userLogin?.phone || "");
    const [photo, setPhoto] = useState(userLogin?.photoProfile || "/icons/userone.svg");
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    

    const handleSubmit = () => {
        if (!fullName || !phone) {
            toast.error("Lengkapi data!");
            return;
        }

        dispatch(updateProfile({
            email: userLogin.email,
            fullName,
            phone,
            photoProfile: photo
        }));

        dispatch(updateCurrentUser({
            fullName,
            phone,
            photoProfile: photo
        }));

        toast.success("Profile updated!");
    };



    return (
        <section>
            <AppHeader className="md:bg-white" />
            <section className="md:flex md:justify-between w-full">
                <SideBar></SideBar>
            </section>

            <section className=" md:flex md:flex-col">
                <section className="hidden md:flex p-5 md:ml-60">
                    <img src="/assets/icon/blueupload.svg" alt="" />
                    <h1 className="font-semibold">Profile</h1>
                </section>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            setPhoto(url);
                        }
                    }}
                />

                <section className="p-5 font-medium md:border border-gray-400 rounded md:w-4/6 md:ml-70">
                    <p>Profile picture</p>
                    <section className="flex py-5 justify-between gap-5">
                        <div className="w-70 justify-center flex rounded-md bg-gray-100 h-35">
                            <img
                                className="m-auto w-20 h-20 object-cover rounded-full"
                                src={photo || "/icons/userone.svg"}
                                alt="photo-profile"
                            />
                        </div>
                        <article className="w-full flex flex-col justify-between py-2 gap-5">
                            <Button
                                color="blue"
                                className="text-white flex items-center p-3 gap-2 md:w-50 w-full"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <img src="/icons/Edit Square.svg" alt="change-profile" />
                                <p>Change Profile</p>
                            </Button>
                            <Button
                                color="white"
                                className="text-red-600 border-red-600 p-3 flex md:w-50 items-center gap-2 w-full"
                                onClick={() => setPhoto("/icons/userone.svg")}
                            >
                                <img src="/icons/Delete.svg" alt="delete" />
                                <p>Delete Profile</p>
                            </Button>
                        </article>
                    </section>
                    <p className="text-sm font-normal pb-5">The profile picture must be 512 x 512 pixels or less</p>
                    <label>Full Name</label>
                    <div className="border border-gray-400 flex gap-2 p-3 mt-2 mb-2 focus-within:border-blue-600 rounded-md">
                        <img src="/icons/userone.svg" alt="user" />
                        <input
                            className="focus:outline-none text-sm w-full"
                            type="text"
                            placeholder="Input Your Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <label>Phone</label>
                    <div className="border border-gray-400 flex gap-2 p-3 mb-2 mt-2 focus-within:border-blue-600 rounded-md">
                        <img src="/icons/tlePhone (1).svg" alt="phone" />
                        <input className="focus:outline-none text-sm w-full"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Input Your Number Phone" />
                    </div>
                    <label>Email</label>
                    <div className="border border-gray-400 flex gap-2 p-3 mt-2 focus-within:border-blue-600 rounded-md">
                        <img src="/icons/blackMail.svg" alt="mail" />
                        <input className="focus:outline-none text-sm w-full" disabled type="text" placeholder={userLogin.email} />
                    </div>

                    <section className="flex flex-col gap-2 mb-2 mt-2">
                        <p>Password</p>
                        <NavLink to="change-password" className="font-normal text-blue-600">
                            <p>Change Password</p>
                        </NavLink>
                        <p>Pin</p>
                        <NavLink to="change-pin" className="font-normal text-blue-600">
                            Change Pin
                        </NavLink>
                    </section>
                    <Button
                        color="blue"
                        className="w-full"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </section>
            </section>
        </section>
    )
}
