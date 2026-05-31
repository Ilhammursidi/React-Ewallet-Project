import { useState, useRef } from "react";
import { Logo } from "../../Components/Atoms/Logo";
import { InputEmail } from "../../Components/Form/InputEmail";
import { Button } from "../../Components/Atoms/Button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Components/Atoms/Modal";
import { InputChange } from "../../Components/Form/ChangePwd";
import { updatePassword } from "../../Redux/slice/register";
import { useNavigate } from "react-router";
import { forgotPassword } from "../../Redux/thunks/forgotPassword";

export function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const handleRequestEmail = async (e) => {
        e.preventDefault();
        if (!email) return toast.error("Email wajib diisi!");

        setIsSendingEmail(true);
        const result = await dispatch(forgotPassword(email));
        setIsSendingEmail(false);

        if (forgotPassword.fulfilled.match(result)) {
            toast.success("Link/Token reset telah dikirim ke email Anda!");
        } else {
            toast.error(result.payload);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <section className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <Logo color="blue"/>
                <p className="text-xl font-medium py-5">Forgot Password 👋</p>
                <form onSubmit={handleRequestEmail}>
                    <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button color="blue" className="w-full py-3 mt-3" disabled={isSendingEmail}>
                        {isSendingEmail ? "Sending Link..." : "Submit"}
                    </Button>
                </form>
            </section>
        </section>
    );
}