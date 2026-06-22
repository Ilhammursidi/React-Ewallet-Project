import { Navigate, Outlet } from "react-router";
import useAuthStatus from "../Hooks/useAuthStatus";

const GuestRoute = () => {
  const { isValid } = useAuthStatus();
  if (isValid) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};

export default GuestRoute;