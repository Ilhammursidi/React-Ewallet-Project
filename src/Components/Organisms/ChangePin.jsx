import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";
import { SideBar } from "../Atoms/SideBar";

export function ChangePinLayout() {
    return (
        <section>
            <AppHeader className="md:bg-white" />
            <SideBar />
            <p className="hidden absolute left-60 top-20 font-semibold md:flex">Change Pin</p>

            <section className="p-5 md:w-2/6 md:m-auto">
                <Outlet />
            </section>
        </section>
    );
}