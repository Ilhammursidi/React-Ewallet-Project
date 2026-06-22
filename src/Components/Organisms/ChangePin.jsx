// Pages/Features/Profile/ChangePinPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Button } from "../Atoms/Button";
import { PinInput } from "../Form/InputPin";
import { editUserPin } from "../../Redux/thunks/changePin";
import { AppHeader } from "./AppHeader";
import { SideBar } from "../Atoms/SideBar";

const PIN_LENGTH = 6;
const emptyPin = () => Array(PIN_LENGTH).fill("");

const STEP_TEXT = {
    VERIFY: { title: "Enter Your PIN", button: "Next" },
    SET: { title: "Set New PIN", button: "Next" },
    CONFIRM: { title: "Confirm New PIN", button: "Save PIN" },
};

export function ChangePinPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState("VERIFY");
    const [oldPin, setOldPin] = useState(emptyPin());
    const [newPin, setNewPin] = useState(emptyPin());
    const [confirmPin, setConfirmPin] = useState(emptyPin());
    const [submitting, setSubmitting] = useState(false);

    const { title, button } = STEP_TEXT[step];

    const activePin = step === "VERIFY" ? oldPin : step === "SET" ? newPin : confirmPin;
    const setActivePin = step === "VERIFY" ? setOldPin : step === "SET" ? setNewPin : setConfirmPin;

    const resetAll = () => {
        setStep("VERIFY");
        setOldPin(emptyPin());
        setNewPin(emptyPin());
        setConfirmPin(emptyPin());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pinStr = activePin.join("");
        if (pinStr.length !== PIN_LENGTH) return toast.error("Complete the PIN!");

        if (step === "VERIFY") {
            setStep("SET");
            return;
        }

        if (step === "SET") {
            if (pinStr === oldPin.join("")) {
                return toast.error("the new PIN cannot be the same as the new PIN!");
            }
            setStep("CONFIRM");
            return;
        }

        if (pinStr !== newPin.join("")) {
            toast.error("pins are not the same");
            setConfirmPin(emptyPin());
            return;
        }

        setSubmitting(true);
        const resultAction = await dispatch(
            editUserPin({ OldPin: oldPin.join(""), NewPin: pinStr })
        );
        setSubmitting(false);

        if (editUserPin.fulfilled.match(resultAction)) {
            toast.success("Change PIN success!");
            navigate("/profile");
        } else {
            toast.error(resultAction.payload || "The old PIN is incorrect or an error occurred.");
            resetAll(); 
        }
    };

    return (
        <section>
            <AppHeader className="md:bg-white" />
            <SideBar />
            <p className="hidden absolute left-60 top-20 font-semibold md:flex">Change Pin</p>

            <section className="p-5 md:w-132 md:m-auto">
                <h1 className="text-lg font-medium py-5 text-center">{title}</h1>
                
                <form onSubmit={handleSubmit}>
                    <PinInput wide={"w-full"} key={step} pin={activePin} setPin={setActivePin} />
                    <Button type="submit" className="w-full mt-3" color="blue" disabled={submitting}>
                        {submitting ? "Saving..." : button}
                    </Button>
                </form>

                {step === "VERIFY" && (
                    <p className="mt-2 text-center text-gray-500 text-sm">
                        Forgot Your Pin?{" "}
                        <span
                            onClick={() => navigate("/profile/change-pin/reset")}
                            className="text-blue-600 cursor-pointer"
                        >
                            Reset
                        </span>
                    </p>
                )}

                {step !== "VERIFY" && (
                    <p className="mt-2 text-center text-gray-500 text-sm">
                        <span onClick={resetAll} className="text-blue-600 cursor-pointer">
                            Reset Input
                        </span>
                    </p>
                )}
            </section>
        </section>
    );
}