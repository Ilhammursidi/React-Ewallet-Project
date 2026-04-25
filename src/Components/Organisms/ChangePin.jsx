import { useState, useRef, useEffect } from "react";
import { Button } from "../../Components/Atoms/Button";
import { AppHeader } from "./AppHeader";
import { SideBar } from "../Atoms/SideBar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../Redux/slice/authslice";
import { updatePin } from "../../Redux/slice/register";
import { Modal } from "../Atoms/Modal";
import { PinInput } from "../Form/InputPin";
import { useNavigate } from "react-router";

export function ChangePin() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const to = useNavigate();

    const PIN_LENGTH = 6;
    const emptyPin = () => Array(PIN_LENGTH).fill("");

    const [pin, setPin] = useState(emptyPin());
    const inputsRef = useRef([]);

    const [open, setOpen] = useState(false);
    const [step, setStep] = useState("VERIFY_PIN");

    const [form, setForm] = useState({
        newPin: emptyPin(),
        confirmPin: emptyPin(),
        email: "",
        otp: "",
        generatedOtp: ""
    });

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    const resetForm = () => {
        setForm({
            newPin: emptyPin(),
            confirmPin: emptyPin(),
            email: "",
            otp: "",
            generatedOtp: ""
        });
    };

    const closeModal = () => {
        setOpen(false);
        setStep("VERIFY_PIN");
        resetForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pinStr = pin.join("");

        if (pinStr.length !== PIN_LENGTH) return toast.error("Lengkapi PIN!");
        if (pinStr !== currentUser.userPin) return toast.error("PIN salah!");

        setOpen(true);
        setStep("SET_NEW_PIN");
        setPin(emptyPin());
    };

    const handleNextNewPin = () => {
        const newPinStr = form.newPin.join("");
        if (newPinStr.length !== PIN_LENGTH) return toast.error("PIN belum lengkap!");
        if (newPinStr === currentUser.userPin) return toast.error("PIN tidak boleh sama!");
        setStep("CONFIRM_NEW_PIN");
    };

    const handleConfirmNewPin = () => {
        const newPinStr = form.newPin.join("");
        const confirmStr = form.confirmPin.join("");

        if (confirmStr.length !== PIN_LENGTH) return toast.error("PIN belum lengkap!");
        if (newPinStr !== confirmStr) return toast.error("PIN tidak sama!");

        dispatch(updatePin({ email: currentUser.email, newPin: confirmStr }));
        dispatch(updateCurrentUser({ userPin: confirmStr }));

        toast.success("PIN berhasil diubah!");
        closeModal();
        to("/profile");
    };

    const handleResetPin = () => {
        resetForm();
        setOpen(true);
        setStep("INPUT_EMAIL");
    };

    const handleSendOtp = () => {
        if (form.email !== currentUser.email) return toast.error("Email tidak sesuai!");

        const otp = "123456";
        setForm(p => ({ ...p, generatedOtp: otp }));

        toast.success("OTP: " + otp);
        setStep("INPUT_OTP");
    };

    const handleVerifyOtp = () => {
        if (form.otp !== form.generatedOtp) return toast.error("OTP salah!");
        setStep("RESET_NEW_PIN");
    };

    const handleResetNextPin = () => {
        const newPinStr = form.newPin.join("");
        if (newPinStr.length !== PIN_LENGTH) return toast.error("PIN belum lengkap!");
        setStep("RESET_CONFIRM_PIN");
    };

    const handleConfirmResetPin = () => {
        const newPinStr = form.newPin.join("");
        const confirmStr = form.confirmPin.join("");

        if (confirmStr.length !== PIN_LENGTH) return toast.error("PIN belum lengkap!");
        if (newPinStr !== confirmStr) return toast.error("PIN tidak sama!");

        dispatch(updatePin({ email: form.email, newPin: confirmStr }));

        toast.success("PIN berhasil direset!");
        closeModal();
        to("/profile");
    };

    return (
        <section>
            <AppHeader className="md:bg-white" />
            <SideBar />
            <p className="hidden absolute left-60 top-20 font-semibold md:flex">Change Pin</p>

            <section className="p-5 md:w-2/6 md:m-auto">
                <h1 className="text-lg font-medium py-5 text-center">Enter Your PIN</h1>

                <form onSubmit={handleSubmit}>
                    <section className="flex justify-between mb-4 px-2 py-20">
                        {pin.map((d, i) => (
                            <input
                                key={i}
                                type="password"
                                maxLength={1}
                                value={d}
                                onChange={e => {
                                    const arr = [...pin];
                                    arr[i] = e.target.value;
                                    setPin(arr);
                                    if (e.target.value && i < PIN_LENGTH - 1) {
                                        inputsRef.current[i + 1]?.focus();
                                    }
                                }}
                                onKeyDown={e => {
                                    if (e.key === "Backspace" && !pin[i] && i > 0) {
                                        inputsRef.current[i - 1]?.focus();
                                    }
                                }}
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
                    <span onClick={handleResetPin} className="text-blue-600 cursor-pointer">
                        Reset
                    </span>
                </p>

                <Modal isOpen={open} onClose={closeModal} className="w-full bg-white z-10 p-5 rounded-xl">

                    {step === "SET_NEW_PIN" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleNextNewPin(); }}>
                            <h1 className="text-lg text-center">Set New PIN</h1>

                            <PinInput
                                pin={form.newPin}
                                setPin={(v) => setForm(p => ({ ...p, newPin: v }))}
                                onEnter={handleNextNewPin}
                            />
                            <Button type="submit" className="w-full mt-3" color="blue">
                                Next
                            </Button>
                        </form>
                    )}

                    {step === "CONFIRM_NEW_PIN" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleConfirmNewPin(); }}>
                            <h1 className="text-lg text-center">Confirm PIN</h1>

                            <PinInput
                                pin={form.confirmPin}
                                setPin={(v) => setForm(p => ({ ...p, confirmPin: v }))}
                                autoSubmit={false}
                            />

                            <Button type="submit" color="blue" className="w-full mt-3">
                                Save PIN
                            </Button>
                        </form>
                    )}

                    {step === "INPUT_EMAIL" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                            <input
                                className="w-full border p-2 rounded mb-3"
                                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                            />
                            <Button type="submit" color="blue" className="w-full">
                                Send OTP
                            </Button>
                        </form>
                    )}

                    {step === "INPUT_OTP" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
                            <input
                                className="w-full border p-2 rounded mb-3"
                                onChange={(e) => setForm(p => ({ ...p, otp: e.target.value }))}
                            />
                            <Button type="submit" color="blue" className="w-full">
                                Verify
                            </Button>
                        </form>
                    )}

                    {step === "RESET_NEW_PIN" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleResetNextPin(); }}>
                            <PinInput
                                pin={form.newPin}
                                setPin={(v) => setForm(p => ({ ...p, newPin: v }))}
                                autoSubmit={false}
                            />

                            <Button type="submit" color="blue" className="w-full mt-3">
                                Next
                            </Button>
                        </form>
                    )}

                    {step === "RESET_CONFIRM_PIN" && (
                        <form onSubmit={(e) => { e.preventDefault(); handleConfirmResetPin(); }}>
                            <PinInput
                                pin={form.confirmPin}
                                setPin={(v) => setForm(p => ({ ...p, confirmPin: v }))}
                                autoSubmit={false}
                            />

                            <Button type="submit" color="blue" className="w-full mt-3">
                                Save PIN
                            </Button>
                        </form>
                    )}

                </Modal>
            </section>
        </section>
    );
}