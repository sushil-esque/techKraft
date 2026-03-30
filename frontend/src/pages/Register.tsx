import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/api/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpInput } from "@/zodSchema";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const { mutate: signUpMutate, isPending: isRegistering } = useMutation({
    mutationFn: signUp,
    onError: (error: Error) => {
      toast.error(error.message || "Registration failed");
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please sign in.");
      navigate("/signin", { replace: true });
    },
  });

  const onSubmit = (data: SignUpInput) => {
    signUpMutate(data);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-500/5 w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-500">
              Join RealEstate Hub to find your dream property
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                className={`w-full border ${
                  errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
                } p-3 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="example@mail.com"
                className={`w-full border ${
                  errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
                } p-3 rounded-xl focus:ring-2 focus:border-transparent outline-none transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={togglePassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="********"
                  className={`w-full border ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"
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
              disabled={isRegistering}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isRegistering ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
