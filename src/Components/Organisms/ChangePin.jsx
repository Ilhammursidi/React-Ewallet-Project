import { useState, useRef } from "react";
import { Button } from "../../Components/Atoms/Button";
import { Logo } from "../../Components/Atoms/Logo";
import { useNavigate } from "react-router";
import { AppHeader } from "./AppHeader";
import { SideBar } from "../Atoms/SideBar";

export function ChangePin() {
    const PIN_LENGTH = 6;
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const navigate = useNavigate()

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
        return alert("Lengkapi PIN!");
    }

    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const updatedAccounts = accounts.map(acc => {
        if (acc.email === currentUser.email) {
            return {
                ...acc,
                userPin: pinStr
            };
        }
        return acc;
    });

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    localStorage.setItem("currentUser", JSON.stringify({
        ...currentUser,
        userPin: pinStr
    }));

    alert("Save PIN Success!");
    setPin(Array(PIN_LENGTH).fill(""));
    navigate("/Dashboard")
};

    const handleResetPin = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const updatedAccounts = accounts.map(acc => {
        if (acc.email === currentUser.email) {
            return {
                ...acc,
                userPin: null
            };
        }
        return acc;
    });

    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

    localStorage.setItem("currentUser", JSON.stringify({
        ...currentUser,
        userPin: null
    }));

    setPin(Array(PIN_LENGTH).fill(""));
    alert("PIN reset!");
};

    return (
        <section>
            <AppHeader className="md:bg-white"></AppHeader>
            <SideBar></SideBar>
            <section className="p-5 md:w-2/6 md:m-auto">
                <section className="mb-4">
                    <h1 className="text-lg font-medium py-5 text-center">Change Pin 👋</h1>
                    <p className="text-gray-500 text-sm">
                        Please save your pin because this so important.
                    </p>
                </section>

                <form onSubmit={handleSubmit}>

                <section className="flex justify-between mb-4 px-2 py-20">
                    {pin.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
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
            </section>
        </section>
    );
}