import { AppHeader } from "../../Components/Organisms/AppHeader"
import { SideBar } from "../../Components/Atoms/SideBar"
import { InputNominal } from "../../Components/Form/InputNominal"
import { Button } from "../../Components/Atoms/Button"

export const TopUp = () => {
    return (
        <section className="">
            <AppHeader className="md:bg-white" />
            <section className="md:flex w-full">
                <SideBar></SideBar>
                <section className="w-50"></section>
            <section className="p-5 md:flex flex-col">
                <section className="flex items-center md:ml-10 px-5 gap-2 flex-row">
                <img className="hidden md:block w-6" src="/public/icons/blueUpload.svg" alt="upload" />
                <h1 className="hidden md:flex font-medium">Top Up Account</h1>
                </section>
                <section className="md:p-5 md:ml-15 md:mt-5 md:border md:border-gray-400 md:w-180">
                    <p className="font-medium mb-2">Account Information</p>
                    <section className="flex py-2 bg-gray-100/50">
                        <img className="w-20" src="/public/icons/Table cell.svg" alt="ghaluh" />
                        <article className="grid py-2 text-sm ">
                            <p className="font-medium">Ghaluh 1</p>
                            <p>(239)555-0108</p>
                            <img className="h-5" src="/public/icons/verified.svg" alt="verified" />
                        </article>
                        <p></p>
                    </section>
                    <section className="flex flex-col gap-2">
                        <p className="font-medium md:mt-2">Amount</p>
                        <p className="text-xs text-gray-600">Type the amount you want to transfer and then
                            press continue to the next steps.</p>
                        <InputNominal></InputNominal>
                        <p className="font-medium">Payment Method</p>
                        <p className="text-xs text-gray-600">Choose your payment method for top up account</p>
                        <form action="" className="flex flex-col gap-3">
                        <article className="flex text-sm items-center bg-gray-100 h-15 p-2 flex-row gap-2">
                            <input type="radio" id="bri" name="payment"/>
                            <img className="w-8" src="/public/icons/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.svg" alt="bri" />
                            <label htmlFor="bri">Bank Rakyat Indonesia</label>
                        </article>
                        <article className="flex text-sm items-center flex-row gap-2 h-15 bg-gray-100 p-2">
                            <input type="radio" id="dana" name="payment"/>
                            <img src="/public/icons/Logo DANA (PNG-240p) - FileVector69 1.svg" alt="dana" />
                            <label htmlFor="dana">Dana</label>
                        </article>
                        <article className="flex h-15 text-sm items-center flex-row gap-2  bg-gray-100 p-2">
                            <input type="radio" id="bca" name="payment"/>
                            <img src="/public/icons/Bank BCA Logo (SVG-240p) - FileVector69 1.svg" alt="bca" />
                            <label htmlFor="bca">Bank Central Asia</label>
                        </article>
                        <article className="h-15 flex text-sm items-center flex-row gap-2  bg-gray-100 p-2">
                            <input type="radio" id="gopay" name="payment"/>
                            <img src="/public/icons/Logo GoPay (SVG-240p) - FileVector69 1.svg" alt="gopay" />
                            <label htmlFor="gopay">Gopay</label>
                        </article>
                        <article className="flex text-sm h-15 items-center flex-row gap-2  bg-gray-100 p-2">
                            <input type="radio" id="ovo" name="payment"/>
                            <img src="/public/icons/OVO.svg" alt="ovo" />
                            <label htmlFor="ovo">OVO</label>
                        </article>
                            </form>
                    </section>
                </section>
            </section>
                    
                            <section className="font-semibold p-5 md:mt-16 md:border md:border-gray-400 md:h-fit flex flex-col gap-2">
                            <p className="font-normal pt-2">Payment</p>
                                <article className="flex p-2 justify-between">
                                    <p>order</p>
                                    <p>Rp.40.000</p>
                                </article>
                                <article className="flex p-2 justify-between">
                                    <p>Delivery</p>
                                    <p>Rp.0</p>
                                </article>
                                <article className="flex p-2 justify-between">
                                    <p>Tax</p>
                                    <p>Rp.4000</p>
                                </article>
                                <hr className="text-gray-400 m-2"/>
                                <article className="flex p-2 justify-between">
                                    <p>Sub Total</p>
                                    <p>Rp.44.000</p>
                                </article>
                                <Button color="blue" className="font-medium m-2">Submit</Button>
                                <p className="font-normal text-sm p-2 text-gray-500">*Get Discount if you pay with Bank Central Asia</p>
                            </section>
                            
                        

            </section>
        </section>
    )
}
