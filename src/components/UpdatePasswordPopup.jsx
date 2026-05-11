import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  X,
  Eye,
  EyeOff,
  Shield,
  Lock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    )
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const UpdatePasswordPopup = ({
  isOpen = true,
  onClose,
  setShowUpdatePasswordPopUp,
  email,
}) => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // FIX 1: Immediately show modal when isOpen becomes true
    if (isOpen) {
      setIsVisible(true);
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    // FIX 2: Don't allow closing while password update is in progress
    if (isProcessing) return;
    setIsVisible(false);
    setShowUpdatePasswordPopUp?.(false);
    setTimeout(() => {
      onClose && onClose();
    }, 200);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // FIX 3: Guard — email must exist before attempting password update
    if (!email || email.trim() === "") {
      toast.error("Email is missing. Please restart the process.", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      setSubmitting(false);
      return;
    }

    try {
      setIsProcessing(true);

      // FIX 4: Explicitly send email + newPassword so backend gets both fields
      const payload = {
        email: email,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

      const res = await axios.post(
        "http://localhost:4000/user/updatePassword",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message || "Password updated successfully!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });

      resetForm();
      handleClose();

      // FIX 5: Small delay before navigating so user sees the success toast
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // FIX 6: Optional chaining on error.response to prevent crash on network errors
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      toast.error(msg, {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.error(
        "UpdatePassword error:",
        error.response?.data || error.message
      );
    } finally {
      // FIX 7: Always reset both flags in finally
      setIsProcessing(false);
      setSubmitting(false);
    }
  };

  // FIX 8: Do not early-return null — let AnimatePresence handle mount/unmount
  // (returning null while AnimatePresence is animating breaks exit animations)
  if (!isOpen && !isVisible) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="update-password-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4"
        >
          {/* Dark Overlay */}
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{
              backdropFilter: isVisible ? "blur(10px)" : "blur(0px)",
            }}
            transition={{ duration: 0.3 }}
            className="tw-absolute tw-inset-0 tw-bg-black/70"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{
              scale: isVisible ? 1 : 0.9,
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20,
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="tw-relative tw-w-full tw-max-w-md tw-bg-[#121212] tw-backdrop-blur-xl tw-rounded-2xl tw-border tw-border-gray-800 tw-shadow-[0_0_25px_rgba(128,0,255,0.3)] tw-overflow-hidden"
          >
            {/* Header */}
            <div className="tw-flex tw-items-center tw-justify-between tw-p-6 tw-border-b tw-border-gray-800">
              <div className="tw-flex tw-items-center tw-gap-4">
                <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-br tw-from-purple-600 tw-to-purple-900 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                  <Shield className="tw-w-6 tw-h-6 tw-text-white" />
                </div>
                <div>
                  <h2 className="tw-text-2xl tw-font-bold tw-text-white">
                    Update Password
                  </h2>
                  <p className="tw-text-sm tw-text-gray-400">
                    Keep your account safe & secure
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isProcessing}
                className="tw-w-10 tw-h-10 tw-bg-[#1f1f1f] hover:tw-bg-gray-800 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-gray-400 hover:tw-text-white tw-transition-all"
              >
                <X className="tw-w-5 tw-h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="tw-p-6">
              <Formik
                initialValues={{
                  email: email || "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form className="tw-space-y-6">
                    {/* New Password */}
                    <div className="tw-space-y-2">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-300 tw-flex tw-items-center tw-gap-2">
                        <div className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-purple-500/10 tw-border tw-border-purple-500/30">
                          <Shield className="tw-w-4 tw-h-4 tw-text-purple-400" />
                        </div>
                        New Password
                      </label>

                      <div className="tw-relative">
                        <input
                          {...formik.getFieldProps("newPassword")}
                          type={
                            showPasswords.newPassword ? "text" : "password"
                          }
                          placeholder="Enter a strong password"
                          className={`tw-w-full tw-h-12 tw-px-4 tw-pr-12 tw-bg-[#1a1a1a] tw-border tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 focus:tw-outline-none focus:tw-ring-2 tw-shadow-inner ${
                            formik.touched.newPassword &&
                            formik.errors.newPassword
                              ? "tw-border-red-500 focus:tw-ring-red-500/50"
                              : "tw-border-gray-700 focus:tw-border-purple-500 focus:tw-ring-purple-500/30"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            togglePasswordVisibility("newPassword")
                          }
                          className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 tw-bg-[#1a1a1a] tw-rounded-full tw-p-1"
                          style={{ outline: "none", border: "none" }}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {showPasswords.newPassword ? (
                              <motion.div
                                key="eye-off"
                                initial={{
                                  opacity: 0,
                                  rotate: -90,
                                  scale: 0.5,
                                }}
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

                      {formik.touched.newPassword &&
                        formik.errors.newPassword && (
                          <div className="tw-flex tw-items-center tw-gap-2 tw-text-red-400 tw-text-sm tw-bg-red-500/10 tw-border tw-border-red-500/20 tw-rounded-lg tw-px-3 tw-py-1.5">
                            <AlertCircle className="tw-w-4 tw-h-4" />
                            <span>{formik.errors.newPassword}</span>
                          </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="tw-space-y-2">
                      <label className="tw-text-sm tw-font-semibold tw-text-gray-300 tw-flex tw-items-center tw-gap-2">
                        <div className="tw-w-8 tw-h-8 tw-flex tw-items-center tw-justify-center tw-rounded-xl tw-bg-purple-500/10 tw-border tw-border-purple-500/30">
                          <Lock className="tw-w-4 tw-h-4 tw-text-purple-400" />
                        </div>
                        Confirm Password
                      </label>

                      <div className="tw-relative">
                        <input
                          {...formik.getFieldProps("confirmPassword")}
                          type={
                            showPasswords.confirmPassword ? "text" : "password"
                          }
                          placeholder="Re-enter new password"
                          className={`tw-w-full tw-h-12 tw-px-4 tw-pr-12 tw-bg-[#1a1a1a] tw-border tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 focus:tw-outline-none focus:tw-ring-2 tw-shadow-inner ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "tw-border-red-500 focus:tw-ring-red-500/50"
                              : "tw-border-gray-700 focus:tw-border-purple-500 focus:tw-ring-purple-500/30"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            togglePasswordVisibility("confirmPassword")
                          }
                          className="tw-absolute tw-right-3 tw-top-1/2 tw--translate-y-1/2 tw-bg-[#1a1a1a] tw-rounded-full tw-p-1"
                          style={{ outline: "none", border: "none" }}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {showPasswords.confirmPassword ? (
                              <motion.div
                                key="eye-off"
                                initial={{
                                  opacity: 0,
                                  rotate: -90,
                                  scale: 0.5,
                                }}
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

                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <div className="tw-flex tw-items-center tw-gap-2 tw-text-red-400 tw-text-sm tw-bg-red-500/10 tw-border tw-border-red-500/20 tw-rounded-lg tw-px-3 tw-py-1.5">
                            <AlertCircle className="tw-w-4 tw-h-4" />
                            <span>{formik.errors.confirmPassword}</span>
                          </div>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="tw-flex tw-gap-3 tw-pt-4 tw-border-t tw-border-gray-800">
                      <button
                        type="button"
                        onClick={handleClose}
                        disabled={isProcessing}
                        className="tw-flex-1 tw-h-12 tw-bg-[#1f1f1f] hover:tw-bg-gray-800 tw-text-gray-300 hover:tw-text-white tw-rounded-xl tw-font-semibold tw-transition-all tw-duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formik.isSubmitting || isProcessing}
                        className={`tw-flex-1 tw-h-12 tw-rounded-xl tw-font-bold tw-flex tw-items-center tw-justify-center tw-gap-2 tw-transition-all tw-duration-200
                          ${
                            formik.isSubmitting || isProcessing
                              ? "tw-bg-purple-900 tw-text-gray-400 tw-cursor-not-allowed"
                              : "tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-800 hover:tw-from-purple-700 hover:tw-to-purple-900 tw-text-white"
                          }
                        `}
                      >
                        <Sparkles className="tw-w-4 tw-h-4" />
                        {isProcessing ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePasswordPopup;