import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { toast } from "sonner";

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logout successful");
      navigate("/signin", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <header className="bg-white border-b border-gray-100 w-full">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <div className="text-2xl mb-1 font-bold text-gray-900">
            Hi, {user?.name || "Guest"}
          </div>
          <div className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase border-t border-gray-300 pt-1">
            {user?.role || "USER"}'S DASHBOARD
          </div>
        </div>
        <div className="flex items-center space-x-8">
          {user ? (
            <button
            disabled={isPending}
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-100 rounded-md hover:bg-red-50 transition-colors"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
