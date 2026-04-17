import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import img from "../../assets/homeImg1.jpg";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import {
  registerSchema,
  type RegisterFormData,
} from "../../shared/schemas/authSchemas";
import { useRegisterMutation } from "../../shared/services/authApi";
import { toaster } from "../../shared/utils/toaster";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // RTK Query Mutation Hook
  const [registerUser, { isLoading }] = useRegisterMutation();

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  // Form Submit Handler
  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      // unwrap() kullanarak hatayı try-catch bloğuna düşürüyoruz
      const response = await registerUser(values).unwrap();
      localStorage.setItem("token", response.token);
      toaster("success", response.message);

      // Kayıt başarılıysa 2 saniye sonra login'e yönlendir
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="container-box mt-28 md:mt-0">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="mb-8 text-center">
              <h1 className="text-text-dark mt-2 text-2xl font-bold">
                Create Account
              </h1>
              <p className="text-text-dark">
                Get started with your free account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-text-dark font-medium">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="z-10 size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register("fullName")}
                    className={`input input-bordered w-full pl-10 ${errors.fullName ? "border-red-500" : ""}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-text-dark font-medium">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IoMailSharp className="z-10 size-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`input input-bordered w-full pl-10 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-text-dark font-medium">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="z-10 size-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`input input-bordered w-full pl-10 ${errors.password ? "border-red-500" : ""}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="size-5 text-gray-400" />
                    ) : (
                      <FaEye className="size-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="bg-main-btn w-full p-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner /> Loading...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-text-dark">
                Already have an account?{" "}
                <Link to="/login" className="link link-secondary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="hidden items-center justify-center lg:flex">
          <img
            src={img}
            alt="Burger Burger"
            className="max-h-[80%] object-contain"
          />
        </div>
      </div>
      {/* ToastContainer ana App.tsx'te değilse burada kalabilir */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default RegisterForm;
