import { useLocation, NavLink, useNavigate } from "react-router";
import { InputNominal } from "../Form/InputNominal";
import { Button } from "../Atoms/Button";
import { useState, useRef, useMemo } from "react";
import { Modal } from "../Atoms/Modal";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { makeTransfer } from "../../Redux/thunks/transfer"; 
import { fetchDashboardData } from "../../Redux/thunks/dashboard";

/**
 * a user transfer component
 * @typedef UserTransfer
 * @returns 
 */

export const UserTransfer = () => {
    const money = useSelector((state) => state.users.dataBalance.data);
    const location = useLocation();
    
    const user = location.state?.userData; 
    
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [order, setOrder] = useState("");
    const [checkBalance, setCheckBalance] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const nameTemplate = useMemo(() => {
        return user?.receiver ? user.receiver.split('@')[0] : user?.name || "";
    }, [user]);

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

    const handleInput = (e) => {
        const clean = e.target.value.replace(/\D/g, '');
        setOrder(clean);
        if (Number(clean) > money?.balance) {
            setCheckBalance("balance is not enough");
        } else {
            setCheckBalance("");
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        const amount = Number(order);
        const pinStr = pin.join("");

        if (pinStr.length !== PIN_LENGTH) {
            return toast.error("Lengkapi PIN!");
        }

        if (!amount || amount <= 0) {
            setIsOpen(false);
            setIsOpen3(true);
            setOrder("");
            return toast.error("Nominal tidak valid");
        }

        setIsSubmitting(true);

        const payload = {
            receiver_id: Number(user?.id), 
            amount: amount,       
            pin: pinStr           
        };

        try {
            const resultAction = await dispatch(makeTransfer(payload));
            
            if (makeTransfer.fulfilled.match(resultAction)) {
                toast.success("Success");
                setPin(Array(PIN_LENGTH).fill(""));
                setOrder("");
                setIsOpen(false);
                setIsOpen2(true); 
                
                dispatch(fetchDashboardData()); 
            } else {
                const errorMessage = resultAction.payload || "Wrong PIN or transaction failed";
                toast.error(errorMessage);
                setIsOpen(false);
                setIsOpen3(true); 
            }
        } catch (err) {
            toast.error("Connection error");
            setIsOpen(false);
            setIsOpen3(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section>
            <Modal isOpen={isOpen} value="Next" onAction={handleSubmit} onClose={() => setIsOpen(false)}>
                <section className="w-80 bg-white p-5 rounded-md">
                    <p className="font-medium border-b-2 border-black/10">Transfer to {nameTemplate}</p>
                    <p className="font-semibold text-xl py-10">Enter Your Pin 👋</p>
                    <p>Enter Your Pin For Transaction</p>
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
                        <Button className="justify-center w-full bg-blue-600 p-2 rounded-md text-white" type="submit">Next</Button>
                    </form>

                </section>
            </Modal>
            <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)}>
                <section className="w-80 flex flex-col p-2 rounded-md gap-2 bg-white">
                    <p className="font-medium border-b-2 border-black/10">Transfer to {nameTemplate}</p>
                    <img src="/icons/Contact us-pana 1.svg" alt="contact" className="w-50 m-auto" />
                    <p className="text-center font-semibold">Yeay Transfer <span className="text-green-500">Success</span></p>
                    <p className="text-xs text-gray-500 text-center">Thank you for using this application for your financial</p>
                    <Button onClick={() => setIsOpen2(false)} className="rounded-md bg-blue-600 text-white font-medium">Done</Button>
                    <Button className="text-blue-600 font-medium border-2" onClick={() => { setIsOpen3(true); setIsOpen2(false) }}>Transfer Again</Button>
                </section>
            </Modal>

            <Modal isOpen={isOpen3} onClose={() => setIsOpen3(false)}>
                <section className="w-80 flex flex-col p-2 rounded-md bg-white gap-2">
                    <p className="font-medium border-b-2 border-black/10">Transfer to {nameTemplate}</p>
                    <img src="/icons/Oh no-cuate 1.svg" alt="customer-services" className="w-50 m-auto" />
                    <p className="text-center font-semibold">Oops Transfer <span className="text-red-500">Failed</span></p>
                    <p className="text-xs text-gray-500 text-center">Sorry Theres is an issue for your transfer, try again later !</p>
                    <Button onClick={() => window.location.reload()} className="rounded-md bg-blue-600 text-white font-medium">Done</Button>
                    <NavLink to={"/dashboard"} className="border-2 border-blue-600 text-blue-600 rounded-md p-2 text-center font-medium">Back To Dashboard</NavLink>
                </section>
            </Modal>

            <section className="hidden md:flex flex-row gap-5 p-5">
                <section className="flex flex-row gap-2">
                    <span className="rounded-full flex w-6 bg-gray-600 justify-center text-white">1</span>
                    <span className="text-gray-600">Find People</span>
                </section>
                <section>----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-blue-600 flex w-6 justify-center text-white">2</span>
                    <span className="text-blue-600">Set Nominal</span>
                </section>
                <section>----------</section>
                <section className="flex flex-row gap-2">
                    <span className="rounded-full bg-gray-600 flex w-6 justify-center text-white">3</span>
                    <span className="text-gray-600">Finish</span>
                </section>
            </section>


            <section className="information border border-gray-300 p-5">
                <p className="font-medium">People Information</p>
                <section className="user bg-gray-100/50 flex justify-between pr-5">
                    <section className="detail flex w-full">
                        <img src={user.photo || "/icons/userone.svg"} alt={nameTemplate} />
                        <section className="grid p-2">
                            <p className="text-xs font-medium">{nameTemplate}</p>
                            <p className="text-xs">{user.phone_number || "-"}</p>
                            <img className="w-20" src="/icons/verified.svg" alt="verified" />
                        </section>
                    </section>
                    <img className="w-6" src="/icons/Star.svg" alt="star" />
                </section>

                <p className="font-medium">Amount</p>
                <p className="text-gray-500 text-sm">Type the amount you want to transfer and then
                    press continue to the next steps.</p>
                <InputNominal
                    value={order === 0 ? "" : order}
                    onChange={handleInput}
                ></InputNominal>
                <p className="text-red-500 text-sm">{checkBalance}</p>
                <section className="notes">
                    <p className="font-medium">Notes</p>
                    <p className="text-gray-500 text-sm">You can add some notes for this transfer such as payment coffee or something</p>

                </section>
                <textarea className="border border-gray-300 p-2 mt-2 w-full h-60 rounded" name="" id="" placeholder="Enter Some Notes"></textarea>

                <Button onClick={() => setIsOpen(true)} className="w-full h-10 text-white bg-blue-600 mt-5">
                    Submit & Transfer
                </Button>

            </section>
        </section>
    )
}