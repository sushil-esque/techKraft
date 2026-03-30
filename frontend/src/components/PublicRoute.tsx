import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

function PublicRoute () {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;