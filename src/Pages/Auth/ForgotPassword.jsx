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

const FAKE_OTP = "123456";
const OTP_LENGTH = 6;

export function ForgotPassword() {
    const accounts = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const [otpInput, setOtpInput] = useState(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const [isOtpOpen, setIsOtpOpen] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isResetOpen, setIsResetOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = accounts.find((u) => u.email === email);
        if (!user) {
            toast.error("Email tidak ditemukan!");
            return;
        }
        setSelectedUser(user);
        toast.success(`OTP dikirim ke ${email} (gunakan: ${FAKE_OTP})`);
        setIsOtpOpen(true);
    };

    const handleOtpChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const updated = [...otpInput];
        updated[index] = value;
        setOtpInput(updated);
        if (value && index < OTP_LENGTH - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpInput[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        const otpStr = otpInput.join("");
        if (otpStr.length !== OTP_LENGTH) {
            toast.error("Lengkapi OTP!");
            return;
        }
        if (otpStr !== FAKE_OTP) {
            toast.error("OTP salah!");
            return;
        }
        toast.success("OTP benar!");
        setOtpInput(Array(OTP_LENGTH).fill(""));
        setIsOtpOpen(false);
        setIsResetOpen(true);
        };

    const handleResetPassword = () => {
        const pw = accounts.find((u) => u.password === newPassword)
        if (pw) {
            toast.error("Masukkan password baru")
            return;
        }
        if (!newPassword || !confirmPassword) {
            toast.error("Isi semua field!");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Password tidak sama!");
            return;
        }
        dispatch(updatePassword({ email: selectedUser.email, newPassword }));
        toast.success("Password berhasil diubah!");
        setIsResetOpen(false);
        setEmail("");
        setSelectedUser(null);
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/auth/login"), 3000);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <section className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <Logo color="blue"/>
                <p className="text-xl font-medium py-5">Fill Out Form Correctly 👋</p>
                <p className="text-gray-600 text-sm py-5">We will send new password to your email</p>
                <form onSubmit={handleSubmit}>
                    <InputEmail
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button color="blue" className="w-full py-3 mt-3">Submit</Button>
                </form>
            </section>

            <Modal isOpen={isOtpOpen} inner="grid h-full" className="bg-white m-auto rounded-xl w-86 md:w-100 h-90 max-w-sm shadow-lg">
                <p className="text-lg font-medium">Verifikasi OTP</p>
                <p className="text-gray-500 text-sm">Masukkan 6 digit OTP yang dikirim ke email kamu</p>
                <form onSubmit={handleVerifyOtp} className="grid grid-rows-4 py-5">
                    <div className="flex justify-center gap-2 mb-2 row-span-3">
                        {otpInput.map((val, i) => (
                            <input
                            key={i}
                            ref={(el) => (inputsRef.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={val}
                            onChange={(e) => handleOtpChange(e.target.value, i)}
                            onKeyDown={(e) => handleOtpKeyDown(e, i)}
                            className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        ))}
                    </div>
                    <Button color="blue" className="w-full">Verifikasi</Button>
                </form>
            </Modal>

            <Modal isOpen={isResetOpen} inner="h-full w-full py-10 px-5 flex flex-col justify-between" className="bg-white m-auto rounded-xl w-86 md:w-100 h-90 max-w-sm shadow-lg">
                <InputChange
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    label="New Password"
                />
                <InputChange
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm New Password"
                />
                <Button color="blue" className="w-full" onClick={handleResetPassword}>Submit</Button>
            </Modal>
        </section>
    );
}