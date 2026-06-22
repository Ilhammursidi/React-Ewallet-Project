import useAuthStatus from "../Hooks/useAuthStatus";
import { useNavigate, Outlet } from "react-router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
  const { isValid } = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValid) {
      // toast.error("Sesi Anda telah berakhir atau Anda belum login.");
      navigate("/auth/login", { replace: true });
    }
  }, []);

  if (!isValid) return null; 
  return <Outlet />;
};

export default ProtectedRoute;