import { useState, useRef } from "react";
import { Button } from "../../Components/Atoms/Button";
import { Logo } from "../../Components/Atoms/Logo";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updatePin } from "../../Redux/slice/register";
import { setPin } from "../../Redux/slice/authslice";

export function EnterPin() {
    const PIN_LENGTH = 6;
    const [pinInput, setPinInput] = useState(Array(PIN_LENGTH).fill(""));
    const inputsRef = useRef([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.auth);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pinStr = pinInput.join("");
        if (pinStr.length !== PIN_LENGTH) {
                toast.error("Lengkapi PIN!");
                return;
            }
        const result = await dispatch(setPin(pinStr))
        if (setPin.fulfilled.match(result)) {
            toast.success("Save PIN Success!");
            navigate("/dashboard");
        } else {
            toast.error(result.payload || "Failed to set PIN")
        }
    };

    return (
        <section className="min-h-screen md:justify-between md:flex bg-white items-center justify-center md:bg-blue-500 p-4 md:p-0">

            <section className="bg-white rounded-xl md:flex md:flex-col h-screen flex flex-col justify-center md:h-screen md:justify-center p-6 md:w-3/6 md:px-20 md:rounded-r-4xl shadow-lg">

                <Logo color="blue" className="text-xl"></Logo>
                <section className="mb-4">
                    <h1 className="text-lg font-medium py-5 md:text-2xl">Enter Your Pin 👋</h1>
                    <p className="text-gray-500 text-sm">
                        Please save your pin because this so important.
                    </p>
                </section>

                <form onSubmit={handleSubmit}>
                    <section className="flex justify-between mb-4 px-2 py-20">
                        {pinInput.map((digit, i) => (
                            <input
                                key={i}
                                type="password"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleChange(e.target.value, i)}
                                onKeyDown={e => handleKeyDown(e, i)}
                                ref={el => (inputsRef.current[i] = el)}
                                className="w-10 h-12 text-center border-b-2 md:w-15 border-gray-300 focus:border-b-blue-600 focus:outline-none text-3xl"
                            />
                        ))}
                    </section>
                    <Button type="submit" className="w-full py-3" color="blue">
                        Submit
                    </Button>
                </form>
            </section>
            <section className="hidden right md:flex md:h-screen md:w-3/6">
                <img src="/manWithLaptop.png" alt="" />
            </section>
        </section>
    );
}