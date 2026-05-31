import { useState } from "react";
import { Logo } from "../../Components/Atoms/Logo";
import { Button } from "../../Components/Atoms/Button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../Redux/thunks/forgotPassword";
import { InputChange } from "../../Components/Form/ChangePwd";
import { useLocation, useNavigate } from "react-router";

export function ResetPassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const token = location.state?.token;
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault()

        if (!newPassword || !confirmPassword) return toast.error("Isi semua field!");
        if (newPassword !== confirmPassword) return toast.error("Password tidak cocok!");

        setIsResettingPassword(true);
        const result = await dispatch(resetPassword({ token: token, password: newPassword }));
        setIsResettingPassword(false);

        if (resetPassword.fulfilled.match(result)) {
            toast.success("Password berhasil diubah!");
            setNewPassword(""); setConfirmPassword("");
            setTimeout(() => navigate("/auth/login"), 2000);
        } else {
            toast.error(result.payload);
            setTimeout(() => navigate("/auth/forgot-password"), 2000)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <form onSubmit={handleResetPasswordSubmit} className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <InputChange value={newPassword} onChange={(e) => setNewPassword(e.target.value)} label="New Password" type="password" />
                <InputChange value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} label="Confirm New Password" type="password" />
                <Button color="blue" className="w-full" onClick={handleResetPasswordSubmit} disabled={isResettingPassword}>
                    {isResettingPassword ? "Saving..." : "Submit New Password"}
                </Button>
            </form>
        </section>
    )
}