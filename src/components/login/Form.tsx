import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import img from "../../assets/homeImg1.jpg";

import {
  loginSchema,
  type LoginFormData,
} from "../../shared/schemas/authSchemas";
import { useLoginMutation } from "../../shared/services/authApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { toaster } from "../../shared/UIElements/toaster/toaster";

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // RTK Query Mutation Hook
  const [registerUser, { isLoading }] = useLoginMutation();

  // React Hook Form Configuration
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  // Form Submit Handler
  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    try {
      const response = await registerUser(values).unwrap();
      localStorage.setItem("token", response.token);
      toaster("success", response.message);

      setTimeout(() => navigate("/"), 2000);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const handleDemoLogin = async (role: "user" | "admin") => {
    const credentials = {
      user: { email: "user@test.com", password: "secret123" },
      admin: { email: "test-admin@mail.com", password: "secret123" },
    };

    await onSubmit(credentials[role]);
  };

  return (
    <div className="container-box mt-28 md:mt-0">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="mb-8 text-center">
              <div className="group flex flex-col items-center gap-2">
                <h1 className="text-text-dark mt-2 text-2xl font-bold">
                  Welcome Back
                </h1>
                <p className="text-text-dark">Sign in to your account</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-text-dark font-medium">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <IoMailSharp className="text-base-content/40 z-10 size-5" />
                  </div>
                  <input
                    type="email"
                    className={`input input-bordered w-full pl-10`}
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <span className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-text-dark font-medium">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-base-content/40 z-10 size-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10`}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-base-content/40 z-10 size-5" />
                    ) : (
                      <FaEye className="text-base-content/40 z-10 size-5" />
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
                className="bg-main-btn hover:bg-main-btn-hover w-full p-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Loading...
                  </>
                ) : (
                  "Sign In "
                )}
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("user")}
                  className="w-[49%] bg-blue-600 p-2 text-xs text-white hover:bg-blue-700 md:text-sm lg:text-base"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Loading...
                    </>
                  ) : (
                    "Demo User Login"
                  )}
                </Button>
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("admin")}
                  className="bg-secondary-btn hover:bg-secondary-btn-hover w-[49%] p-2 text-xs"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Loading...
                    </>
                  ) : (
                    "Demo Admin Login"
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center">
              <p className="text-text-dark">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="link link-secondary">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-center lg:flex">
          <img src={img} alt="" />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Form;
