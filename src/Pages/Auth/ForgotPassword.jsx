import { useState, useRef } from "react";
import { Logo } from "../../Components/Atoms/Logo";
import { InputEmail } from "../../Components/Form/InputEmail";
import { Button } from "../../Components/Atoms/Button";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Components/Atoms/Modal";
import { updatePin } from "../../Redux/slice/register";
import { setPin } from "../../Redux/slice/authslice";
import { InputPassword } from "../../Components/Form/InputPassword";
import { InputChange } from "../../Components/Form/ChangePwd";
import { updatePassword } from "../../Redux/slice/register";
import { useNavigate } from "react-router";

export function ForgotPassword() {
    const accounts = useSelector((state) => state.users.users)
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const PIN_LENGTH = 6;
    const [pinInput, setPinInput] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const [isOpen, setIsOpen] = useState(false)
    const [isOpen2, setIsOpen2] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

        const user = accounts.find((u) => u.email === email);

        if (user) {
            setSelectedUser(user);
            setIsOpen(true);
        } else {
            toast.error("Invalid Email");
        }
    };
    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newPin = [...pinInput];
        newPin[index] = value;
        setPinInput(newPin);

        if (value && index < PIN_LENGTH - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pinInput[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePin = (e) => {
        e.preventDefault();

        const pinStr = pinInput.join("");

        if (pinStr.length !== PIN_LENGTH) {
            toast.error("Lengkapi PIN!");
            return;
        }

        if (pinStr !== selectedUser.userPin) {
            toast.error("PIN salah!");
            return;
        }

        toast.success("PIN benar!");

        setPinInput(Array(PIN_LENGTH).fill(""));
        setIsOpen(false);
        setIsOpen2(true)

    };

    const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
        toast.error("Isi semua field!");
        return;
    }

    if (newPassword !== confirmPassword) {
        toast.error("Password tidak sama!");
        return;
    }

    dispatch(updatePassword({
        email: selectedUser.email,
        newPassword
    }));
    setTimeout(()=>{
        navigate("/auth/login")
    },3000)
    toast.success("Password berhasil diubah!");

    setIsOpen2(false);
    setEmail("");
    setSelectedUser(null);
    setNewPassword("");
    setConfirmPassword("");
};

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <section className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <Logo></Logo>
                <p className="text-xl font-medium py-5">Fill Out Form Correctly 👋</p>
                <p className="text-gray-600 text-sm py-5">We will send new password to your email</p>
                <form onSubmit={handleSubmit}>
                    <InputEmail
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></InputEmail>
                    <Button color="blue" className="w-full py-3 mt-3">Submit</Button>
                </form>
            </section>

            <section>
                <Modal isOpen={isOpen} className="bg-white m-auto rounded-xl p-6 w-86 h-90 max-w-sm shadow-lg">
                    <Logo color="blue" className="text-xl"></Logo>
                    <section className="mb-4">
                        <h1 className="text-lg font-medium py-5">Enter Your Pin 👋</h1>
                        <p className="text-gray-500 text-sm">
                            Please save your pin because this so important.
                        </p>
                    </section>

                    <form onSubmit={handlePin}>
                        <section className="flex justify-between mb-4 px-2 py-8">
                            {pinInput.map((digit, i) => (
                                <input
                                    key={i}
                                    type="password"
                                    maxLength={1}
                                    value={digit}
                                    onChange={e => handleChange(e.target.value, i)}
                                    onKeyDown={e => handleKeyDown(e, i)}
                                    ref={el => (inputsRef.current[i] = el)}
                                    className="w-10 h-12 text-center border-b-2 border-gray-300 focus:border-b-blue-600 focus:outline-none text-3xl"
                                />
                            ))}
                        </section>
                        <Button type="submit" className="w-full py-3" color="blue">
                            Submit
                        </Button>
                    </form>
                </Modal>
            </section>

            <section>
                <Modal isOpen={isOpen2} className="bg-white m-auto rounded-xl p-6 w-86 md:w-100 h-90 max-w-sm shadow-lg">
                    <p className="font-semibold">Hello ! Thank You For Using Ours Apps</p>
                    <h1 className="m-auto font-semibold text-blue-600 rounded-md border-3 p-1 text-center text-2xl">Set New Password</h1>
                    <InputChange 
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    label="New Password"></InputChange>
                    <InputChange 
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    label="Confirm New Password"></InputChange>
                    <Button color="blue" className="w-full" onClick={handleResetPassword}>Submit</Button>
                </Modal>
            </section>
        </section>

    )
}
