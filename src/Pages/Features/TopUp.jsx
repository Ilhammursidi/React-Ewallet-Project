import { AppHeader } from "../../Components/Organisms/AppHeader"
import { SideBar } from "../../Components/Atoms/SideBar"

export const TopUp = () => {
    return ( 
         <section className="">
            <AppHeader className="md:bg-white"/>
            <section className="md:flex md:justify-between w-full">
                <SideBar></SideBar>
            <section className="hidden md:block w-50"></section>
            

            </section>

            <section className="p-5">
             <img src="/assets/icon/blueupload.svg" alt=""/>
             <h5 className="font-semibold">Top Up Account</h5>
         </section>
         </section>
)
}
    