import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
