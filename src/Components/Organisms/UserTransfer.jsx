import { useLocation, useParams } from "react-router";
import { Button } from "../Atoms/Button";
import { InputNominal } from "../Form/InputNominal";

/**
 * a user transfer component
 * @typedef UserTransfer
 * @returns 
 */

export const UserTransfer = () => {
const { id } = useParams();
const location = useLocation();
const user = location.state?.userData;

    return (
        <section>

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
                    <img src={user.img} alt="" />
                    <section className="grid p-2">
                        <p className="text-xs font-medium">{user.name}</p>
                        <p className="text-xs">{user.phone}</p>
                        <img className="w-20" src="/src/assets/icons/verified.svg" alt="verified" />
                    </section>
                </section>
                <img className="w-6" src="/src/assets/icons/Star.svg" alt="star" />
            </section>

            <p className="font-medium">Amount</p>
            <p className="text-gray-500 text-sm">Type the amount you want to transfer and then
                press continue to the next steps.</p>
            <InputNominal className="my-2"></InputNominal>

            <section className="notes">
                <p className="font-medium">Notes</p>
                <p className="text-gray-500 text-sm">You can add some notes for this transfer such as payment coffee or something</p>

            </section>
            <textarea className="border border-gray-300 p-2 mt-2 w-full h-60 rounded" name="" id="" placeholder="Enter Some Notes"></textarea>

            <Button className="w-full h-10 text-white bg-blue-600 mt-5">
                Submit & Transfer
            </Button>


        </section>
        </section>
    )
}