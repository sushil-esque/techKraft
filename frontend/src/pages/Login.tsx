import { signIn } from "@/api/auth";
import { loginSchema, type LoginInput } from "@/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const { mutate: signInMutate, isPending: issigningIn } = useMutation({
    mutationFn: signIn,
    onError: (error: Error) => {
      console.log(error.message);

      toast.error(error.message || "Something went wrong");
    },
    onSuccess: (data) => {
      toast.success("Login successful");
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
  });

  const onSubmit = (data: LoginInput) => {
    signInMutate(data);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-500/5 w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="example@mail.com"
                className={`w-full border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-200 focus:ring-blue-500"
                } p-3 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={togglePassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="********"
                  className={`w-full border ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  } p-3 pr-11 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setTogglePassword(!togglePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {togglePassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={issigningIn}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {issigningIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
