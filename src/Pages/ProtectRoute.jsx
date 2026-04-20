import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoute = () => {
    const navigate = useNavigate()
const users = useSelector((state)=> state.auth.currentUser)

    if (!users) {
    const timeout = setTimeout(() => {
        navigate("/auth/login")
    }, 3000);
    return <section className="fixed top-50 left-50">
        <h1 className="font-bold text-4xl">DOKUMEN RAHASIA SILAHKAN LOGIN DULU</h1>
        </section>
    }
    return <Outlet />;
};

export default ProtectedRoute;