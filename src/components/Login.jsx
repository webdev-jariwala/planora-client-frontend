import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import { useFormik } from "formik";
import * as images from "./Event_Images";
import {
  LogIn,
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  Calendar,
  Users,
  Star,
  Home,
  Ticket,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Yup Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path || "/";
  const isReqSend = useRef(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [email, setEmail] = useState("");

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message !== "New User") {
        toast.success(res.data.message, {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      checkUserLogIn();
      isReqSend.current = true;
    }
  }, []);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      isRemember: false,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/user/login",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // 🔑 allow cookies
          }
        );
        toast.success(res.data.message, {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        setSubmitting(false);
        resetForm();
        document.querySelector("#chkBox_Remember").checked = false;
        navigate(path === "/" ? "/profile" : path);
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        if (error.response.data?.email) {
          setEmail(error.response.data?.email);
          setIsForgetPassword(true);
        }
        console.log(error.response.data?.error || error.message);
      }
    },
  });

  const inputClasses =
    "tw-w-full tw-h-12 tw-text-base tw-rounded-lg tw-bg-[#1a1a1a] tw-border tw-border-gray-700 tw-text-white tw-px-4 tw-pr-12 tw-placeholder-gray-400 focus:tw-border-purple-500 focus:tw-ring-2 focus:tw-ring-purple-500/30 tw-transition";

  return (
    <div
      className="tw-min-h-screen tw-bg-[#0f0f0f] tw-flex"
      style={{ fontFamily: "DM Sans Normal" }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={() => navigate(path)}
        className="tw-absolute tw-z-20 tw-w-12 tw-h-12 tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-md tw-border tw-border-white tw-border-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-opacity-30 hover:tw-scale-110 tw-transition-all tw-duration-300"
        style={{ top: "40px", right: "35px" }}
      >
        {path === "/" ? <Home size={20} /> : <Ticket size={20} />}
      </motion.button>
      {/* Left Side - Event Image with Fade */}
      <div className="tw-hidden lg:tw-flex lg:tw-w-1/2 tw-relative tw-overflow-hidden">
        <div
          className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-bg-no-repeat"
          style={{
            backgroundImage: `url(${images.image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: "0.4",
          }}
        >
          <div className="tw-absolute tw-inset-0 tw-bg-black/20"></div>
        </div>
        <div className="tw-absolute tw-ml-[50%] tw-inset-0 tw-bg-gradient-to-r tw-from-transparent tw-via-transparent tw-to-[#0f0f0f] tw-z-10"></div>

        {/* Overlay Content */}
        <div className="tw-relative tw-z-20 tw-flex tw-flex-col tw-justify-center tw-items-start tw-p-12 tw-ml-20 tw-text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="tw-max-w-md"
          >
            <div className="tw-flex tw-items-center tw-mb-6">
              <Calendar className="tw-w-12 tw-h-12 tw-text-purple-400 tw-mr-4" />
              <h1 className="tw-text-4xl tw-font-bold">EvenuFy</h1>
            </div>
            <h2 className="tw-text-3xl tw-font-bold tw-mb-4 tw-leading-tight">
              Welcome Back to Your Event Universe
            </h2>
            <p className="tw-text-xl tw-text-gray-300 tw-mb-8 tw-leading-relaxed">
              Dive back into seamless event planning, where every celebration
              becomes extraordinary.
            </p>

            <div className="tw-space-y-4">
              <div className="tw-flex tw-items-center">
                <Star className="tw-w-5 tw-h-5 tw-text-purple-400 tw-mr-3" />
                <span className="tw-text-gray-300">
                  Premium Event Templates
                </span>
              </div>
              <div className="tw-flex tw-items-center">
                <Users className="tw-w-5 tw-h-5 tw-text-purple-400 tw-mr-3" />
                <span className="tw-text-gray-300">Collaborative Planning</span>
              </div>
              <div className="tw-flex tw-items-center">
                <Calendar className="tw-w-5 tw-h-5 tw-text-purple-400 tw-mr-3" />
                <span className="tw-text-gray-300">Smart Scheduling</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="tw-w-full lg:tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-p-8 lg:tw-p-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="tw-w-full tw-max-w-md"
        >
          <div className="tw-text-center tw-mb-8 tw-pt-[6%]">
            <div className="tw-inline-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-bg-purple-500/10 tw-rounded-full tw-border tw-border-purple-500/30 tw-mb-4">
              <LogIn className="tw-w-8 tw-h-8 tw-text-purple-400" />
            </div>
            <h2 className="tw-text-3xl tw-font-bold tw-text-white tw-mb-2">
              Welcome Back
            </h2>
            <p className="tw-text-gray-400">
              Sign in to continue your event planning journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className="tw-space-y-6">
            {/* Email */}
            <div>
              <label className="tw-block tw-text-white tw-font-medium tw-mb-2">
                Email Address
              </label>
              <div className="tw-relative">
                <input
                  type="email"
                  {...formik.getFieldProps("email")}
                  className={inputClasses}
                  placeholder="Enter your email"
                />
                <Mail className="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-w-5 tw-h-5 tw-text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="tw-text-red-400 tw-text-sm tw-mt-1 tw-block">
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="tw-block tw-text-white tw-font-medium tw-mb-2">
                Password
              </label>
              <div className="tw-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={inputClasses}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 tw-bg-[#1a1a1a] tw-rounded-full tw-p-1"
                  style={{ outline: "none", border: "none" }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {showPassword ? (
                      <motion.div
                        key="eye-off"
                        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <EyeOff className="tw-w-5 tw-h-5 tw-text-gray-400 hover:tw-text-purple-400 tw-transition" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="eye"
                        initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Eye className="tw-w-5 tw-h-5 tw-text-gray-400 hover:tw-text-purple-400 tw-transition" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="tw-text-red-400 tw-text-sm tw-mt-1 tw-block">
                  {formik.errors.password}
                </span>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="tw-flex tw-items-center tw-justify-between">
              <label className="tw-flex tw-items-center tw-cursor-pointer">
                <input
                  {...formik.getFieldProps("isRemember")}
                  id="chkBox_Remember"
                  type="checkbox"
                  className="tw-appearance-none tw-w-5 tw-h-5 tw-rounded tw-border-2 tw-border-purple-600 tw-bg-[#1a1a1a]
                          tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-300 tw-ease-in-out
                          checked:tw-bg-purple-600 checked:tw-border-purple-600 
                          checked:after:tw-content-['✔'] checked:after:tw-text-white checked:after:tw-opacity-100
                          after:tw-opacity-0 after:tw-transition-opacity after:tw-duration-300"
                />
                <span className="tw-ml-2 tw-text-sm tw-text-gray-400">
                  Remember me
                </span>
              </label>
              {isForgetPassword && (
                <button
                  type="button"
                  className="tw-text-sm tw-text-purple-400 hover:tw-text-purple-300 tw-transition tw-bg-transparent tw-border-none tw-cursor-pointer"
                  onClick={() =>
                    navigate("/ForgotPassword", { state: { email } })
                  }
                >
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="tw-w-full tw-h-12 tw-font-semibold tw-text-white tw-text-lg tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-rounded-lg tw-shadow-xl hover:tw--translate-y-0.5 hover:tw-shadow-2xl disabled:tw-opacity-50 tw-transition tw-duration-300 tw-group tw-border-none tw-cursor-pointer"
            >
              <LogIn className="tw-inline tw-w-5 tw-h-5 tw-mr-2 group-hover:tw-translate-x-1 tw-transition-transform" />
              {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="tw-relative tw-my-8">
            <div className="tw-absolute tw-inset-0 tw-flex tw-items-center">
              <div className="tw-w-full tw-border-t tw-border-gray-700"></div>
            </div>
            <div className="tw-relative tw-flex tw-justify-center tw-text-sm">
              <span className="tw-px-4 tw-bg-[#0f0f0f] tw-text-gray-400">
                New to EvenuFy?
              </span>
            </div>
          </div>

          {/* Sign Up */}
          <button
            type="button"
            onClick={() => navigate("/Signup",{state:{path:path}})}
            className="tw-block tw-w-full tw-text-center tw-text-purple-400 hover:tw-text-purple-300 tw-transition tw-bg-transparent tw-border-none tw-cursor-pointer tw-group"
            style={{ marginTop: "-15px" }}
          >
            <span className="tw-inline-flex tw-items-center">
              Create your account
              <ArrowRight className="tw-ml-2 tw-w-4 tw-h-4 group-hover:tw-translate-x-1 tw-transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
