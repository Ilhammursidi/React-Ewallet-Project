import { data, NavLink } from "react-router";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { Button } from "../../Components/Atoms/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { getProfile } from "../../Redux/thunks/profile";
import { editProfile } from "../../Redux/thunks/editProfile";

export const Profile = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const dispatch = useDispatch();
    const fileInputRef = useRef();
    
    const { data: userProfile, isLoading } = useSelector((state) => state.users);
    
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    
    const [photoPreview, setPhotoPreview] = useState("/icons/userone.svg");
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        if (userProfile) {
            setFullName(userProfile.fullname || "" );
            setPhone(userProfile.phone_number || "" );
            if (userProfile.photo) {
                setPhotoPreview(`${API_URL}/${userProfile.photo}`);
            } else {
                setPhotoPreview("/icons/userone.svg");
            }
        }
    }, [userProfile, API_URL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultAction = await dispatch(editProfile({
            fullName: fullName,
            phone: phone,
            photoFile: photoFile 
        }));

        if (editProfile.fulfilled.match(resultAction)) {
            toast.success("Profile updated successfully!");
            setPhotoFile(null); 
            dispatch(getProfile()); 
        }
    };

    return (
        <section>
            <AppHeader className="md:bg-white" />
            <section className="md:flex md:justify-between w-full">
                <SideBar />
            </section>

            <section className="md:flex md:flex-col">
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
                            setPhotoFile(file); 
                            const url = URL.createObjectURL(file);
                            setPhotoPreview(url); 
                        }
                    }}
                />

                <section className="p-5 font-medium md:border border-gray-400 rounded md:w-4/6 md:ml-70">
                    <p>Profile picture</p>
                    <section className="flex py-5 justify-between gap-5">
                        <div className="w-70 justify-center flex rounded-md bg-gray-100 h-35">
                            <img
                                className="m-auto w-20 h-20 object-cover rounded-full"
                                src={photoPreview} 
                                alt="photo-profile"
                                onError={(e) => { e.target.src = "/icons/userone.svg"; }}
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
                                onClick={() => {
                                    setPhotoPreview("/icons/userone.svg");
                                    setPhotoFile(null);
                                }}
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
                            onChange={(e) => setFullName(e.target.value)} 
                        />
                    </div>
                    
                    <label>Phone</label>
                    <div className="border border-gray-400 flex gap-2 p-3 mb-2 mt-2 focus-within:border-blue-600 rounded-md">
                        <img src="/icons/tlePhone (1).svg" alt="phone" />
                        <input 
                            className="focus:outline-none text-sm w-full"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Input Your Number Phone" 
                        />
                    </div>
                    
                    <label>Email</label>
                    <div className="border border-gray-400 flex gap-2 p-3 mt-2 focus-within:border-blue-600 rounded-md">
                        <img src="/icons/blackMail.svg" alt="mail" />
                        <input className="focus:outline-none text-sm w-full" disabled type="text" placeholder={userProfile?.email || "Email tidak ditemukan"} />
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
                    
                    <Button color="blue" className="w-full" onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Saving Changes..." : "Submit"}
                    </Button>
                </section>
            </section>
        </section>
    );
};
