import React, { useEffect, useState } from "react";
import AOS from "aos";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Update_User_Profile = ({user}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  // ✅ Yup Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Please confirm your password"),
    gender: Yup.string().required("Please select gender"),
    city: Yup.string().required("Please select city"),
    profilePic: Yup.mixed().required("Please upload profile picture"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      city: "",
      profilePic: null,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("Form Submitted:", values);
      alert("Account created successfully!");
      document.querySelector("#input_img").value = null;
      setSubmitting(false);
      resetForm();
    },
  });

  const inputClasses =
    "tw-w-full tw-h-12 tw-text-base tw-rounded-lg tw-bg-[#1a1a1a] tw-border tw-border-gray-700 tw-text-white tw-px-4 tw-pr-12 tw-placeholder-gray-400 focus:tw-border-purple-500 focus:tw-ring-2 focus:tw-ring-purple-500/30 tw-transition";

  return (
    <div
      className="tw-flex tw-justify-center tw-items-center tw-min-h-screen tw-bg-[#0f0f0f] tw-py-[15%] sm:tw-py-[10%]"
      style={{ fontFamily: "DM Sans Normal" }}
    >
        
      <div className="tw-w-full tw-max-w-5xl tw-bg-[#111111] tw-rounded-2xl tw-shadow-2xl tw-border tw-border-gray-800 tw-p-10">
        {/* Header */}
        <div data-aos="fade-up" className="tw-text-center tw-mb-10">
          <div className="tw-inline-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-bg-purple-500/10 tw-rounded-full tw-border tw-border-purple-500/30 tw-mb-4">
            <UserPlus className="tw-w-8 tw-h-8 tw-text-purple-400" />
          </div>
          <h2 className="tw-text-3xl tw-font-bold tw-text-white">
            Create Account
          </h2>
          <p className="tw-text-gray-400 tw-mt-2">
            Join EvenueFy and start your journey today
          </p>
        </div>

        {/* Form */}
        <form
          data-aos="fade-up"
          onSubmit={formik.handleSubmit}
          className={`tw-grid md:tw-grid-cols-2 tw-gap-6`}
        >
          {/* Full Name */}
          <div>
            <label className="tw-text-white tw-font-medium">Full Name</label>
            <input
              type="text"
              {...formik.getFieldProps("name")}
              className={inputClasses}
              placeholder="Enter full name"
            />
            {formik.touched.name && formik.errors.name && (
              <span className="tw-text-red-400 tw-text-sm">{formik.errors.name}</span>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="tw-text-white tw-font-medium">Username</label>
            <input
              type="text"
              {...formik.getFieldProps("username")}
              className={inputClasses}
              placeholder="Choose a username"
            />
            {formik.touched.username && formik.errors.username && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.username}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="tw-text-white tw-font-medium">Email Address</label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className={inputClasses}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="tw-text-red-400 tw-text-sm">{formik.errors.email}</span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="tw-text-white tw-font-medium">Gender</label>
            <select
              {...formik.getFieldProps("gender")}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.gender}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label className="tw-text-white tw-font-medium">City</label>
            <select {...formik.getFieldProps("city")} className={inputClasses}>
              <option value="">Select city</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
            {formik.touched.city && formik.errors.city && (
              <span className="tw-text-red-400 tw-text-sm">{formik.errors.city}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="tw-text-white tw-font-medium">Password</label>
            <div className="tw-relative">
              <input
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className={inputClasses}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2 tw-bg-[#1a1a1a] tw-rounded-full tw-p-1"
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
                      <EyeOff className="tw-w-5 tw-h-5 tw-text-white hover:tw-text-purple-400 tw-transition" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Eye className="tw-w-5 tw-h-5 tw-text-white hover:tw-text-purple-400 tw-transition" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.password}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="tw-text-white tw-font-medium">
              Confirm Password
            </label>
            <div className="tw-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...formik.getFieldProps("confirmPassword")}
                className={inputClasses}
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="tw-absolute tw-right-3 tw-top-1/2 -tw-translate-y-1/2 tw-bg-[#1a1a1a] tw-rounded-full tw-p-1"
                style={{ outline: "none", border: "none" }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {showConfirmPassword ? (
                    <motion.div
                      key="eye-off"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EyeOff className="tw-w-5 tw-h-5 tw-text-white hover:tw-text-purple-400 tw-transition" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Eye className="tw-w-5 tw-h-5 tw-text-white hover:tw-text-purple-400 tw-transition" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="tw-text-red-400 tw-text-sm">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>

          {/* Profile Pic */}
          <div className="md:tw-col-span-2">
            <label className="tw-text-white tw-font-medium">
              Profile Picture
            </label>
            <input
              id="input_img"
              type="file"
              accept="image/*"
              onChange={(e) =>
                formik.setFieldValue("profilePic", e.currentTarget.files[0])
              }
              className="tw-mt-1 tw-block tw-w-full tw-text-sm tw-text-gray-400 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-md file:tw-border-0 file:tw-bg-purple-600 file:tw-text-white hover:file:tw-bg-purple-500"
            />
            {formik.touched.profilePic && formik.errors.profilePic && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.profilePic}
              </span>
            )}
          </div>

          {/* Submit */}
          <div className="md:tw-col-span-2">
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="tw-w-full tw-h-12 tw-font-semibold tw-text-white tw-text-lg tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-rounded-lg tw-shadow-xl hover:tw--translate-y-0.5 hover:tw-shadow-2xl disabled:tw-opacity-50 tw-transition"
            >
              <UserPlus className="tw-inline tw-w-5 tw-h-5 tw-mr-2" />
              {formik.isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <Link to="/" className="tw-text-center tw-mt-6 tw-no-underline">
          <div className="tw-text-purple-400 hover:tw-text-purple-300 tw-text-sm">
            <ArrowLeft className="tw-inline tw-w-4 tw-h-4 tw-mr-1" />
            Already have an account? Sign In
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Update_User_Profile;
