import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserShield,
} from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/loginImg.jpg";

import {
  loginSchema,
  type LoginFormData,
} from "../../shared/schemas/authSchemas";
import { useLoginMutation } from "../../shared/services/authApi";
import Button from "../../shared/UIElements/button/Button";
import Spinner from "../../shared/UIElements/spinner/Spinner";
import { toaster } from "../../shared/utils/toaster";

function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      localStorage.setItem("token", response.token);
      toaster("success", response.message);
      setTimeout(() => navigate("/"), 1500);
    } catch (err: any) {
      toaster("error", err?.data?.message || "Login failed");
    } finally {
      setClickedBtn("");
    }
  };

  const handleDemoLogin = async (role: "user" | "admin") => {
    const credentials = {
      user: { email: "user@test.com", password: "secret123" },
      admin: { email: "test-admin@mail.com", password: "secret123" },
    };
    setClickedBtn(role);
    await onSubmit(credentials[role]);
  };

  return (
    <div className="bg-bg flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="bg-main-light border-main grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[3rem] border-4 shadow-2xl lg:grid-cols-2">
        <div className="relative flex flex-col items-center justify-center p-8 sm:p-16">
          <div className="w-full max-w-md space-y-10">
            <div className="space-y-2 text-center">
              <h1 className="text-main-btn text-4xl font-black tracking-tighter uppercase italic">
                Welcome Back
              </h1>
              <p className="text-main-dark/60 text-xs font-bold tracking-widest uppercase">
                Ready for some delicious burgers?
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-main-btn ml-2 text-xs font-black tracking-[0.2em] uppercase italic">
                  Email Address
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <IoMailSharp className="text-main-btn size-5 transition-transform group-focus-within:scale-110" />
                  </div>
                  <input
                    type="email"
                    className="bg-main/5 border-main/20 text-main-btn focus:border-main-btn w-full rounded-2xl border-2 py-4 pr-4 pl-12 font-bold transition-all outline-none placeholder:opacity-30"
                    placeholder="you@studio.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="ml-2 text-[10px] font-black text-red-500 uppercase italic">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-main-btn ml-2 text-xs font-black tracking-[0.2em] uppercase italic">
                  Security Code
                </label>
                <div className="group relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <FaLock className="text-main-btn size-5 transition-transform group-focus-within:scale-110" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="bg-main/5 border-main/20 text-main-btn focus:border-main-btn w-full rounded-2xl border-2 py-4 pr-12 pl-12 font-bold transition-all outline-none placeholder:opacity-30"
                    placeholder="••••••••"
                    {...register("password")}
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
                  <p className="ml-2 text-[10px] font-black text-red-500 uppercase italic">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Main Submit Button */}
              <Button
                type="submit"
                className="bg-main-btn hover:bg-main-btn/90 flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-lg font-black tracking-widest text-white uppercase italic shadow-lg transition-all active:scale-95"
                disabled={isLoading}
                onClick={() => setClickedBtn("login")}
              >
                {isLoading && clickedBtn === "login" ? (
                  <Spinner />
                ) : (
                  "Unlock Kitchen"
                )}
              </Button>

              {/* Demo Logins - Daha şık butonlar */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("user")}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-blue-500/50 bg-blue-500/50 py-3 text-[10px] font-black tracking-widest text-blue-600 uppercase transition-all hover:bg-blue-500 hover:text-white"
                >
                  <FaUser /> {clickedBtn === "user" ? "..." : "Demo User"}
                </Button>
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleDemoLogin("admin")}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-500/50 bg-purple-500/50 py-3 text-[10px] font-black tracking-widest text-purple-600 uppercase transition-all hover:bg-purple-500 hover:text-white"
                >
                  <FaUserShield />
                  {clickedBtn === "admin" ? "..." : "Demo Admin"}
                </Button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="pt-4 text-center">
              <p className="text-main-dark/50 text-xs font-bold tracking-widest uppercase">
                New to the Studio?{" "}
                <Link
                  to="/register"
                  className="text-main-btn decoration-2 underline-offset-4 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-main relative hidden p-8 lg:block">
          <div className="bg-main-btn/10 absolute inset-0 z-10 mix-blend-multiply" />
          <img
            src={img}
            alt="Burger"
            className="h-full w-full rounded-4xl object-cover shadow-2xl grayscale-20 transition-all duration-700 hover:grayscale-0"
          />

          <div className="absolute bottom-16 left-16 z-20">
            <h2 className="text-6xl leading-none font-black tracking-tighter text-white uppercase italic drop-shadow-2xl">
              Taste <br /> The <br /> Art.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
