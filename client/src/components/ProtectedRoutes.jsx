import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { loggedIn, authLoading } = useAuth();

  if (authLoading) {
    return <div className="p-8 text-center">Checking login status...</div>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
