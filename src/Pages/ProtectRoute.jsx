import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router";

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const { isLogin, user } = useSelector((state) => state.auth);

    if (!isLogin || !user) {
            setTimeout(() => {
                navigate("/auth/login")
            }, 2000);
        return <section className="min-h-screen min-w-screen">
            <h1 className="font-bold flex justify-center text-9xl">Login Dulu Awokowkowwok</h1>
            </section>
    }

    return <Outlet />;
};

export default ProtectedRoute;
