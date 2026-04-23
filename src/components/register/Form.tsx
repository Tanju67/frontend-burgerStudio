import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import img from "../../assets/registerImg.jpg";
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
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const response = await registerUser(values).unwrap();
      localStorage.setItem("token", response.token);
      toaster("success", response.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      toaster("error", err?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-bg flex min-h-screen items-center justify-center p-4 md:p-8">
      {/* Ana Kart */}
      <div className="bg-main-light border-main grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[3rem] border-4 shadow-2xl lg:grid-cols-2">
        {/* Sol Taraf - Görsel Alanı (Responsive için mobilde gizli) */}
        <div className="bg-main relative order-last hidden p-8 lg:order-first lg:block">
          <div className="bg-main-btn/10 absolute inset-0 z-10 mix-blend-multiply" />
          <img
            src={img}
            alt="Burger Studio Register"
            className="h-full w-full rounded-4xl object-cover shadow-2xl grayscale-20 transition-all duration-700 hover:grayscale-0"
          />
          <div className="absolute top-16 left-16 z-20">
            <h2 className="text-6xl leading-none font-black tracking-tighter text-white uppercase italic drop-shadow-2xl">
              Join <br /> The <br /> Squad.
            </h2>
          </div>
        </div>

        {/* Sağ Taraf - Form Alanı */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-16">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="space-y-2 text-center">
              <h1 className="text-main-btn text-4xl font-black tracking-tighter uppercase italic">
                Create Account
              </h1>
              <p className="text-main-dark/60 text-xs font-bold tracking-widest uppercase">
                Start your journey with Burger Studio
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label className="text-main-btn ml-2 text-[10px] font-black tracking-[0.2em] uppercase italic">
                  Full Name
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaUser className="text-main-btn size-5 transition-transform group-focus-within:scale-110" />
                  </div>
                  <input
                    type="text"
                    {...register("fullName")}
                    className={`bg-main/5 border-main/20 text-main-btn focus:border-main-btn w-full rounded-2xl border-2 py-4 pr-4 pl-12 font-bold transition-all outline-none placeholder:opacity-30 ${errors.fullName ? "border-red-500/50" : ""}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && (
                  <p className="ml-2 animate-pulse text-[10px] font-black text-red-500 uppercase italic">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-main-btn ml-2 text-[10px] font-black tracking-[0.2em] uppercase italic">
                  Email Address
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <IoMailSharp className="text-main-btn size-5 transition-transform group-focus-within:scale-110" />
                  </div>
                  <input
                    type="email"
                    {...register("email")}
                    className={`bg-main/5 border-main/20 text-main-btn focus:border-main-btn w-full rounded-2xl border-2 py-4 pr-4 pl-12 font-bold transition-all outline-none placeholder:opacity-30 ${errors.email ? "border-red-500/50" : ""}`}
                    placeholder="you@studio.com"
                  />
                </div>
                {errors.email && (
                  <p className="ml-2 animate-pulse text-[10px] font-black text-red-500 uppercase italic">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-main-btn ml-2 text-[10px] font-black tracking-[0.2em] uppercase italic">
                  Create Password
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaLock className="text-main-btn size-5 transition-transform group-focus-within:scale-110" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`bg-main/5 border-main/20 text-main-btn focus:border-main-btn w-full rounded-2xl border-2 py-4 pr-12 pl-12 font-bold transition-all outline-none placeholder:opacity-30 ${errors.password ? "border-red-500/50" : ""}`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="text-main-btn/40 hover:text-main-btn absolute inset-y-0 right-0 flex items-center pr-4 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="ml-2 animate-pulse text-[10px] font-black text-red-500 uppercase italic">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-main-btn hover:bg-main-btn/90 mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lg font-black tracking-widest text-white uppercase italic shadow-lg transition-all active:scale-95"
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

            {/* Footer Link */}
            <div className="text-center">
              <p className="text-main-dark/50 text-xs font-bold tracking-widest uppercase">
                Already part of the squad?{" "}
                <Link
                  to="/login"
                  className="text-main-btn decoration-2 underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
