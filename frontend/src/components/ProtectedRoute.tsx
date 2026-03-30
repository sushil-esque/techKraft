import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

function ProtectedRoute () {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
