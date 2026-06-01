import { SideBar } from "../Atoms/SideBar";
import { AppHeader } from "./AppHeader";
import { InputChange } from "../Form/ChangePwd";
import { Button } from "../Atoms/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { resetProfileStatus } from "../../Redux/slice/register";
import { editPassword } from "../../Redux/thunks/changePassword";

export function ChangePassword() {
    const [OldPassword, setOldPassword] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isLoading, isSuccess, error } = useSelector((state) => state.users);

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password berhasil diubah!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            dispatch(resetProfileStatus());
            navigate("/profile");
            console.log("halo")
        }

        if (error) {
            toast.error(error); 
            dispatch(resetProfileStatus());
        }
    }, [isSuccess, error, dispatch, navigate]);

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (!OldPassword || !NewPassword || !confirmPassword) {
            toast.error("Isi semua field!");
            return;
        }

        if (NewPassword !== confirmPassword) {
            toast.error("Konfirmasi password baru tidak sama!");
            return;
        }

        dispatch(editPassword({ OldPassword, NewPassword }));
    };

    return (
        <section>
            <AppHeader className="md:bg-white" />
            <SideBar />
            <section className="p-5">
                <p className="hidden md:block md:ml-70 md:mb-2 font-medium">Profile</p>
                <section className="md:w-4/6 md:ml-70 md:border md:p-5">
                    <p className="font-medium">Change Password</p>
                    <form onSubmit={handleResetPassword}>
                        <InputChange
                            type="password"
                            value={OldPassword}
                            onChange={(e) => setOldPassword(e.target.value)} 
                            label="Existing Password"
                        />    
                        <InputChange 
                            type="password"
                            label="New Password"
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)} 
                        />    
                        <InputChange 
                            type="password"
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                        <Button 
                            className="mt-2 w-full" 
                            color="blue" 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Submit"}
                        </Button>    
                    </form>
                </section>
            </section>
        </section>
    );
}
