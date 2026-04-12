import { SideBar } from "../Atoms/SideBar";
import { AppHeader } from "./AppHeader";
import { InputChange } from "../Form/ChangePwd";
import { Button } from "../Atoms/Button";

export function ChangePassword() {
    return (
        <section>
            <AppHeader className="md:bg-white"></AppHeader>
            <SideBar></SideBar>
                <section className="p-5">
                    <p className="hidden md:block md:ml-70 md:mb-2 font-medium">Profile</p>
                    <section className="md:w-4/6 md:ml-70 md:border md:p-5">
                        <p className="font-medium">Change Password</p>
                        <InputChange label="Existing Password"></InputChange>    
                        <InputChange label="New Password"></InputChange>    
                        <InputChange label="Confirm New Password"></InputChange>
                        <Button className="mt-2 w-full" color="blue">Submit</Button>    
                    </section>
                </section>
        </section>
    )
}