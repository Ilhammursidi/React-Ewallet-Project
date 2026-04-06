import { useState, useRef } from "react";
import { BlueButton } from "../../Components/Atoms/Button";
import { BlueLogo } from "../../Components/Atoms/EwalletLogo";

export function EnterPin() {
    const PIN_LENGTH = 6;
    const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef([]);

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

    const handleSubmit = () => {
        const pinStr = pin.join("");
        if (pinStr.length !== PIN_LENGTH) return alert("Lengkapi PIN!");

        localStorage.setItem("userPin", pinStr);
        alert("PIN berhasil disimpan!");
        setPin(Array(PIN_LENGTH).fill(""));
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <section className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
                <BlueLogo className="text-xl"></BlueLogo>
                <section className="mb-4">
                    <h1 className="text-lg font-medium py-5">Enter Your Pin 👋</h1>
                    <p className="text-gray-500 text-sm">
                        Please save your pin because this so important.
                    </p>
                </section>

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

                <BlueButton onClick={handleSubmit} className="w-full py-3">
                    Submit
                </BlueButton>

                <p className="mt-2 text-center text-gray-500 text-sm">
                    Forgot Your Pin?{" "}
                    <span
                        onClick={() => {
                            localStorage.removeItem("userPin");
                            setPin(Array(PIN_LENGTH).fill(""));
                            alert("PIN direset!");
                        }}
                        className="text-blue-600 cursor-pointer"
                    >
                        Reset
                    </span>
                </p>
            </section>
        </section>
    );
}