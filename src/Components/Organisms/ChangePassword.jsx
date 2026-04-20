import { SideBar } from "../Atoms/SideBar";
import { AppHeader } from "./AppHeader";
import { InputChange } from "../Form/ChangePwd";
import { Button } from "../Atoms/Button";
import { updatePassword } from "../../Redux/slice/register";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../Redux/slice/authslice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function ChangePassword() {
    const userLogin = useSelector((state) => state.auth.currentUser)
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleResetPassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
        toast.error("Isi semua field!");
        return;
    }

    if (oldPassword !== userLogin.password) {
        toast.error("Password lama salah!");
        return;
    }

    if (newPassword !== confirmPassword) {
        toast.error("Password tidak sama!");
        return;
    }

    dispatch(updatePassword({
        email: userLogin.email,
        newPassword
    }));

    dispatch(updateCurrentUser({
        password: newPassword
    }));

    toast.success("Password berhasil diubah!");
    navigate("/profile")

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
};


    return (
        <section>
            <AppHeader className="md:bg-white"></AppHeader>
            <SideBar></SideBar>
                <section className="p-5">
                    <p className="hidden md:block md:ml-70 md:mb-2 font-medium">Profile</p>
                    <section className="md:w-4/6 md:ml-70 md:border md:p-5">
                        <p className="font-medium">Change Password</p>
                        <form onSubmit={handleResetPassword}>
                        <InputChange
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)} 
                        label="Existing Password"></InputChange>    
                        <InputChange label="New Password"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}></InputChange>    
                        <InputChange label="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}></InputChange>
                        <Button className="mt-2 w-full" color="blue" type="submit"
                        >Submit</Button>    
                        </form>
                    </section>
                </section>
        </section>
    )
}