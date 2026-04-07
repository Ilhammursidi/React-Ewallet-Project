import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { Outlet } from "react-router";

/**
 * a component that shows the history of transactions, with a search bar to filter the transactions by name or phone number. The data is hardcoded for now, but it can be replaced with real data from an API in the future.
 * @typedef {Object} HistoryProps
 * @param {Object} props - The properties for the History component 
 * @returns {JSX.Element} The History component
 */

export const Transfer = () => {
        
    return (
        <section>
            <AppHeader className="md:bg-white"/>
                <section className="md:flex md:justify-between w-full">
            <SideBar></SideBar>
                
                <section className="md:flex flex-col md:w-5/6 md:px-5">
                    <section className="hidden md:flex md:h-5 md:mr-auto md:gap-2 items-center font-medium md:m-5 ">
                        <img src="/icons/blueSend.svg" alt="send" />
                        <p>Transfer Money</p>
                    </section>
                    <section className="hidden md:flex md:flex-col md:gap-4">
                    </section>
                <section className="content-section">
                <Outlet></Outlet>
                </section>
                </section>
            </section>
        </section>
    )
}