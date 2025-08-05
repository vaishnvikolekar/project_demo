import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdLockOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [mode, setMode] = useState("login"); // login | signup | reset
  const [transitioning, setTransitioning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const resetState = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.endsWith("gmail.com")) {
      newErrors.email = "Please enter a valid Gmail address";
    }

    if (!password.trim()) newErrors.password = "Password is required";

    if (mode === "signup" && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (mode === "reset" && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log(`${mode} successful`);
      if (mode === "reset") {
        setMode("login");
        resetState();
      }
    }
  };

  const handleModeChange = (targetMode) => {
    setTransitioning(true);
    setTimeout(() => {
      setMode(targetMode);
      resetState();
      setTransitioning(false);
    }, 400);
  };

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isReset = mode === "reset";

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-500">
        <div
          className={`transition-opacity duration-500 p-8 min-h-[530px] flex flex-col justify-center ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            {isLogin
              ? "Welcome to MDM Security"
              : isSignup
              ? "Create your account"
              : "Reset Password"}
          </h2>

          {(isLogin || isSignup) && (
            <>
              <button className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                <FcGoogle className="text-2xl" />
                {isLogin ? "Login with Google" : "Signup with Google"}
              </button>
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-400">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {(isLogin || isSignup) && (
              <div className="relative">
                <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  title={!email ? "Please fill this field" : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            )}

            {(isLogin || isSignup || isReset) && (
              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isReset ? "New Password" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            )}

            {(isReset) && (
              <div className="relative">
                <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-300"
                      : "border-gray-300 focus:ring-blue-300"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => handleModeChange("reset")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isLogin ? "Login" : isSignup ? "Sign Up" : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm">
            {isLogin ? (
              <>
                Don’t have an account?{' '}
                <button
                  onClick={() => handleModeChange("signup")}
                  className="text-blue-600 hover:underline transition"
                >
                  Sign up
                </button>
              </>
            ) : isSignup ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => handleModeChange("login")}
                  className="text-blue-600 hover:underline transition"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Back to{' '}
                <button
                  onClick={() => handleModeChange("login")}
                  className="text-blue-600 hover:underline transition"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="text-center mt-4 text-xs text-gray-500">
            <a href="#" className="hover:underline">Terms of Use</a> |{' '}
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;