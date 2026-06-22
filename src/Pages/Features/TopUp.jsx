import { AppHeader } from "../../Components/Organisms/AppHeader"
import { SideBar } from "../../Components/Atoms/SideBar"
import { InputNominal } from "../../Components/Form/InputNominal"
import { Button } from "../../Components/Atoms/Button"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { makeTopup } from "../../Redux/thunks/topUp"
import toast from "react-hot-toast"
import { Modal } from "../../Components/Atoms/Modal"

export const TopUp = () => {
    const user = useSelector((state) => state.users.data)
    const [order, setOrder] = useState("");
    const [selectedPaymentId, setSelectedPaymentId] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const BACKEND_URL = import.meta.env.VITE_API_URL
    const TAX_AMOUNT = 5000;
    const paymentMethods = [
        { id: 1, method: "Bank Rakyat Indonesia", img: "/icons/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg" },
        { id: 2, method: "Dana", img: "/icons/Logo DANA (PNG-240p) - FileVector69 1.svg" },
        { id: 3, method: "Bank Central Asia", img: "/icons/Bank BCA Logo (SVG-240p) - FileVector69 1.svg" },
        { id: 4, method: "Gopay", img: "/icons/Logo GoPay (SVG-240p) - FileVector69 1.svg" },
        { id: 5, method: "Ovo", img: "/icons/OVO.svg" }
    ]

    const handleInput = (e) => {
        const clean = e.target.value.replace(/\D/g, '')
        setOrder(clean)
    }

    const orderAmountNum = parseInt(order || 0);
    const rupiahOrder = orderAmountNum.toLocaleString('id-ID');
    
    const totalPayableNum = orderAmountNum > 0 ? orderAmountNum + TAX_AMOUNT : 0;
    const rupiahTotalPayable = totalPayableNum.toLocaleString('id-ID');

    const handleOpenModal = () => {
        if (!orderAmountNum || orderAmountNum <= 0) {
            return toast.error("Invalid amount nominal")
        }
        if (!selectedPaymentId) {
            return toast.error("Please select a payment method")
        }
        setOpen(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            paymentMethodId: selectedPaymentId,
            orderAmount: orderAmountNum, 
            taxAmount: TAX_AMOUNT,       
            deliveryFee: 0,
        };

        const resultAction = await dispatch(makeTopup(payload));

        if (makeTopup.fulfilled.match(resultAction)) {
            toast.success("Top up successful!");
            setOrder("");
            setSelectedPaymentId(null);
        } else {
            toast.error(resultAction.payload || "Failed to process top up");
        }

        setOpen(false)
    }

    return (
        <section className="min-h-screen bg-white">
            <AppHeader className="md:bg-white" />
            <section className="md:flex w-full">
                <SideBar />
                
                <section className="p-5 flex-1 md:flex flex-col md:ml-40">
                    <section className="flex items-center md:ml-10 px-5 gap-2 flex-row">
                        <img className="hidden md:block w-6" src="/icons/blueUpload.svg" alt="upload" />
                        <h1 className="hidden md:flex font-medium text-lg">Top Up Account</h1>
                    </section>

                    <section className="md:p-5 md:ml-10 md:mt-5 md:border md:border-gray-400 md:rounded-xl md:bg-white md:w-180">
                        <p className="font-medium mb-2">Account Information</p>
                        <section className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-100/50 mb-4">
                            <img className="w-12 h-12 rounded-full object-cover" src={`${BACKEND_URL}/${user?.photo || "img/profiles/user_1781943518142517600.svg"}`} alt="User profile" />
                            <article className="flex flex-col text-sm">
                                <p className="font-medium text-gray-800">{user?.fullname || user?.email?.split("@")[0]}</p>
                                <p className="text-gray-500">{user?.phone || "-"}</p>
                                <img className="h-4 w-fit mt-1" src="/icons/verified.svg" alt="verified" />
                            </article>
                        </section>

                        <section className="flex flex-col gap-2">
                            <p className="font-medium">Amount</p>
                            <p className="text-xs text-gray-500">Type the amount you want to transfer and then choose a payment method.</p>
                            
                            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                                <InputNominal
                                    value={order}
                                    onChange={handleInput}
                                />
                                
                                <p className="font-medium mt-2">Payment Method</p>
                                <p className="text-xs text-gray-500">Choose your payment method for top up account</p>
                                
                                <section className="flex flex-col gap-2">
                                    {paymentMethods.map((p) => {
                                        const isSelected = selectedPaymentId === p.id;
                                        return (
                                            <label 
                                                key={p.id} 
                                                htmlFor={`payment-${p.id}`}
                                                className={`flex text-sm items-center rounded-xl cursor-pointer h-14 p-2 px-5 flex-row gap-4 border transition-all ${
                                                    isSelected 
                                                    ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600" 
                                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                                }`}
                                            >
                                                <input 
                                                    type="radio" 
                                                    id={`payment-${p.id}`} 
                                                    name="payment" 
                                                    value={p.id}
                                                    checked={isSelected}
                                                    onChange={() => setSelectedPaymentId(p.id)}
                                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
                                                />
                                                <img className="w-8 h-8 object-contain" src={p.img} alt={p.method} />
                                                <span className="font-medium text-gray-700">{p.method}</span>
                                            </label>
                                        )
                                    })}
                                </section>
                            </form>
                        </section>
                    </section>
                </section>

                <section className="font-semibold p-5 md:mr-10 md:mt-17 md:border md:border-gray-400 md:rounded-xl md:bg-white md:h-fit w-full md:w-80 flex flex-col gap-2">
                    <p className="font-medium pt-2 text-gray-800">Payment</p>
                    <article className="flex p-2 justify-between text-sm text-gray-600">
                        <p className="font-bold">Order</p>
                        <p className="font-bold text-gray-900">Rp {rupiahOrder}</p>
                    </article>
                    <article className="flex p-2 justify-between text-sm text-gray-600">
                        <p className="font-bold">Delivery</p>
                        <p className="font-bold text-gray-900">Rp 0</p>
                    </article>
                    <article className="flex p-2 justify-between text-sm text-gray-600">
                        <p className="font-bold">Tax</p>
                        <p className="font-bold text-gray-900">Rp {orderAmountNum > 0 ? TAX_AMOUNT.toLocaleString('id-ID') : 0}</p>
                    </article>
                    <hr className="border-gray-200 my-1" />
                    <article className="flex p-2 justify-between text-base">
                        <p className="text-gray-800">Sub Total</p>
                        <p className="text-blue-600">Rp {rupiahTotalPayable}</p>
                    </article>
                    <Button onClick={handleOpenModal} color="blue" className="font-medium m-2 mt-4 py-2.5">
                        Submit
                    </Button>
                    <p className="font-normal text-xs p-2 text-gray-400 leading-relaxed">
                        *Get Discount if you pay with Bank Central Asia
                    </p>
                </section>
            </section>

            <Modal isOpen={open} className="top-14" onClose={() => setOpen(false)}>
                <section className="w-80 m-auto rounded-md p-6 bg-white shadow-xl flex flex-col gap-4">
                    <div className="text-center font-medium text-gray-800">
                        <p className="mb-1 text-base font-semibold">Confirm Top Up</p>
                        <p className="text-xs text-gray-500 font-normal">Total Payment (Tax Included):</p>
                        <p className="text-blue-600 font-bold text-xl my-1">Rp {rupiahTotalPayable}</p>
                        <p className="text-xs text-gray-400 font-normal">(Net added balance: Rp {rupiahOrder})</p>
                        <p className="mt-3 text-sm">Is the transaction amount correct?</p>
                    </div>
                    <section className="justify-between gap-2 flex">
                        <Button color="blue" onClick={handleSubmit} className="font-semibold w-full text-white">Yes</Button>
                        <Button color="white" onClick={() => setOpen(false)} className="font-semibold w-full border border-gray-200 text-gray-600">No</Button>
                    </section>
                </section>
            </Modal>
        </section>
    )
}

