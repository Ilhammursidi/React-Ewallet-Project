import { useState, useRef } from "react";
import { Button } from "../../Components/Atoms/Button";
import { Logo } from "../../Components/Atoms/Logo";
import { useNavigate } from "react-router";
import { AppHeader } from "./AppHeader";
import { SideBar } from "../Atoms/SideBar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../Redux/slice/authslice";
import { updatePin } from "../../Redux/slice/register";
import { Modal } from "../Atoms/Modal";
import { InputChange } from "../Form/ChangePwd";
import { PinInput } from "../Form/InputPin";


export function ChangePin() {
    const accounts = useSelector((state)=>state.users.users)
    const currentUser = useSelector((state)=> state.auth.currentUser);
    const PIN_LENGTH = 6;
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newPin, setNewPin] = useState(Array(PIN_LENGTH).fill(""));
    const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));
    const [open,setOpen] = useState(false)
    const [password, setPassword] = useState("");
    const [step, setStep] = useState("VERIFY_PIN");

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < PIN_LENGTH - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

const handleSubmit = (e) => {
    e.preventDefault();

    const pinStr = pin.join("");

    if (pinStr.length !== PIN_LENGTH) {
        return toast.error("Lengkapi PIN!");
    }

    if (currentUser.userPin === pinStr) {
        setStep("NEW_PIN");
        setOpen(true);
        setPin(Array(PIN_LENGTH).fill(""));
    } else {
        toast.error("PIN salah!");
    }
};
const handleSetNewPin = () => {
    const newPinStr = newPin.join("");
    const confirmPinStr = confirmPin.join("");

    if (newPinStr.length !== PIN_LENGTH) {
        return toast.error("PIN baru belum lengkap!");
    }

    if (confirmPinStr.length !== PIN_LENGTH) {
        return toast.error("Konfirmasi PIN belum lengkap!");
    }

    if (newPinStr !== confirmPinStr) {
        return toast.error("PIN tidak sama!");
    }

    dispatch(updatePin({
        email: currentUser.email,
        newPin: newPinStr
    }));

    dispatch(updateCurrentUser({
        userPin: newPinStr
    }));

    toast.success("PIN berhasil diubah!");

    setNewPin(Array(PIN_LENGTH).fill(""));
    setConfirmPin(Array(PIN_LENGTH).fill(""));
    setOpen(false);
};

const handleResetPin = () => {
    setStep("VERIFY_PASSWORD");
    setOpen(true);
};

const handleVerifyPassword = () => {
    if (!password) {
        return toast.error("Masukkan password!");
    }

    if (password !== currentUser.password) {
        return toast.error("Password salah!");
    }

    toast.success("Verifikasi berhasil!");
    setStep("NEW_PIN");
};
    

    return (
        <section>
            <AppHeader className="md:bg-white"></AppHeader>
            <SideBar></SideBar>
            <p className="hidden absolute left-60 top-20 font-semibold md:flex">Change Pin</p>
            <section className="p-5 md:w-2/6 md:m-auto">
                <section className="mb-4">
                    <h1 className="text-lg font-medium py-5 text-center">Enter Your PIN</h1>
                    <p className="text-gray-500 text-sm">
                        Please save your pin because this so important.
                    </p>
                </section>

                <form onSubmit={handleSubmit}>

                <section className="flex justify-between mb-4 px-2 py-20">
                    {pin.map((digit, i) => (
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

                <p className="mt-2 text-center text-gray-500 text-sm">
                    Forgot Your Pin?{" "}
                    <span
                        onClick={handleResetPin}
                        className="text-blue-600 cursor-pointer"
                    >
                        Reset
                    </span>
                </p>

                <Modal isOpen={open} className="w-full bg-white z-10 p-5 rounded-xl">

    {/* STEP 1: VERIFY PASSWORD */}
    {step === "VERIFY_PASSWORD" && (
        <>
            <h1 className="text-lg font-semibold mb-3">Verify Password</h1>

            <InputChange
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
            />

            <Button onClick={handleVerifyPassword} className="w-full mt-3" color="blue">
                Verify
            </Button>
        </>
    )}

    {/* STEP 2: SET NEW PIN */}
    {step === "NEW_PIN" && (
        <>
            <h1 className="text-lg font-semibold mb-3 text-center">Set New PIN</h1>

            <p className="text-sm text-center font-medium">New PIN</p>
            <PinInput pin={newPin} setPin={setNewPin} />

            <p className="text-sm text-center font-medium">Confirm PIN</p>
            <PinInput pin={confirmPin} setPin={setConfirmPin} />

            <Button onClick={handleSetNewPin} className="w-full" color="blue">
                Save PIN
            </Button>
        </>
    )}

</Modal>
            </section>
        </section>
    );
}