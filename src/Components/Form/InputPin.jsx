import { useRef } from "react";

export const PinInput = ({
    pin,
    setPin,
    length = 6,
    className = "w-10 h-12 text-center border-b-2 border-gray-300 focus:border-b-blue-600 focus:outline-none text-3xl"
}) => {
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <section className="flex justify-between gap-1 w-80 md:w-120 mb-4 px-2 py-10 border-b-2 border-gray-300">
            {pin.map((digit, i) => (
                <input
                    key={i}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => (inputsRef.current[i] = el)}
                    className={className}
                />
            ))}
        </section>
    );
};