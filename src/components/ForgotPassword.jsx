import { useState, useEffect, useRef } from "react";
import { Mail, Shield, Clock, RefreshCw, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingScreen from "./LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";
import UpdatePasswordPopup from "./UpdatePasswordPopup";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerStart, setTimerStart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [canResendotp, setCanResendotp] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showUpdatePasswordPopUp, setShowUpdatePasswordPopUp] = useState(false);
  const inputRefs = useRef([]);
  const isOtpSend = useRef(false);

  const SendOtp = async () => {
    try {
      setIsSending(true);
      const res = await axios.get(
        `http://localhost:4000/mailer/sendOtp/${email}`,
        {
          withCredentials: true,
        }
      );
      setIsSending(false);
      toast.success(res.data.message, {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      setTimerStart(true);
    } catch (error) {
      setIsSending(false); // FIX: was missing, caused infinite loading screen
      toast.error(error.response?.data?.message || "Something Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    // FIX: guard against missing email — redirect back if not provided
    if (!email) {
      toast.error("Email not found. Please try again.", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      navigate("/");
      return;
    }
    if (!isOtpSend.current) {
      SendOtp();
      isOtpSend.current = true;
    }
  }, []);

  // Mask email for display
  const getMaskedEmail = (email) => {
    if (!email || !email.includes("@")) return email; // FIX: guard against invalid email
    const [username, domain] = email.split("@");
    if (username.length <= 3) return email;
    const maskedUsername =
      username.slice(0, 3) + "*".repeat(username.length - 3);
    return `${maskedUsername}@${domain}`;
  };

  // Countdown timer
  useEffect(() => {
    if (timerStart) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft((prev) => prev - 1); // FIX: use functional update to avoid stale closure
          if (timeLeft <= 240) {
            setCanResendotp(true);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [timeLeft, timerStart]);

  const formatTime = (seconds) => {
    const s = Math.max(0, seconds); // FIX: prevent negative time display
    const minutes = Math.floor(s / 60);
    const remainingSeconds = s % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // OTP input handling
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter complete 6-digit OTP", { // FIX: use toast instead of alert
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `http://localhost:4000/mailer/verifyOtp`,
        { email, otp: otpString },
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message, {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      setShowUpdatePasswordPopUp(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response?.data?.error || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setTimeLeft(300); // FIX: reset timer before sending so countdown is correct
    setOtp(["", "", "", "", "", ""]);
    setCanResendotp(false);
    await SendOtp();
    inputRefs.current[0]?.focus();
    setIsResending(false);
    setIsSubmitting(false);
  };

  const isOtpComplete = otp.every((digit) => digit !== "");
  const isTimerExpired = timeLeft === 0;

  if (isSending) {
    return (
      <>
        <LoadingScreen msg="Sending Otp To Your Email" />
      </>
    );
  }

  return (
    <div
      className="tw-min-h-screen tw-bg-[#0f0f0f] tw-flex tw-items-center tw-justify-center tw-p-4"
      style={{ fontFamily: "DM Sans Normal" }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onClick={() => navigate("/")}
        className="tw-absolute tw-z-20 tw-w-12 tw-h-12 tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-md tw-border tw-border-white tw-border-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-opacity-30 hover:tw-scale-110 tw-transition-all tw-duration-300"
        style={{ top: "40px", right: "35px" }}
      >
        <Home size={20} />
      </motion.button>
      {showUpdatePasswordPopUp && (
        <UpdatePasswordPopup
          setShowUpdatePasswordPopUp={setShowUpdatePasswordPopUp}
          email={email}
        />
      )}
      <div className="tw-w-full tw-max-w-6xl">
        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-0 tw-bg-[#1a1a1a] tw-rounded-3xl tw-shadow-2xl tw-overflow-hidden">
          {/* Left Side - Information */}
          <div className="tw-relative tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-justify-center tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#111]">
            {/* Background decoration */}
            <div className="tw-absolute tw-top-0 tw-right-0 tw-w-64 tw-h-64 tw-bg-gradient-to-bl tw-from-purple-600/10 tw-to-transparent tw-rounded-full tw-blur-3xl"></div>
            <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-48 tw-h-48 tw-bg-gradient-to-tr tw-from-pink-400/10 tw-to-transparent tw-rounded-full tw-blur-2xl"></div>

            <div className="tw-relative tw-z-10">
              {/* Icon */}
              <div className="tw-mb-8">
                <div className="tw-w-16 tw-h-16 tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shadow-lg">
                  <Shield className="tw-w-8 tw-h-8 tw-text-white" />
                </div>
              </div>

              {/* Main content */}
              <h1 className="tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-white tw-mb-6 tw-leading-tight">
                Verify Your Identity
              </h1>

              <div className="tw-mb-8">
                <p className="tw-text-gray-200 tw-text-lg tw-mb-4 tw-leading-relaxed">
                  We've sent a verification code to your email to reset your
                  password.
                </p>

                {/* Email display */}
                <div className="tw-flex tw-items-center tw-gap-3 tw-bg-[#2a2a2a] tw-p-4 tw-rounded-xl tw-border tw-border-gray-800">
                  <div className="tw-w-10 tw-h-10 tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-rounded-lg tw-flex tw-items-center tw-justify-center">
                    <Mail className="tw-w-5 tw-h-5 tw-text-white" />
                  </div>
                  <div>
                    <p className="tw-text-gray-400 tw-text-sm">Sent to:</p>
                    <p className="tw-text-white tw-font-semibold">
                      {getMaskedEmail(email)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timer display */}
              <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-200">
                <Clock className="tw-w-5 tw-h-5 tw-text-green-400" />
                <span className="tw-text-sm">
                  Code expires in:
                  <span
                    className={`tw-ml-2 tw-font-bold ${
                      isTimerExpired ? "tw-text-red-400" : "tw-text-green-400"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </span>
                </span>
              </div>

              {/* Decorative elements */}
              <div className="tw-mt-12 tw-flex tw-gap-4">
                <div className="tw-w-2 tw-h-2 tw-bg-purple-400 tw-rounded-full tw-animate-pulse"></div>
                <div
                  className="tw-w-2 tw-h-2 tw-bg-pink-400 tw-rounded-full tw-animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="tw-w-2 tw-h-2 tw-bg-purple-400 tw-rounded-full tw-animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - OTP Form */}
          <div className="tw-p-8 lg:tw-p-12 tw-flex tw-flex-col tw-justify-center tw-bg-[#1a1a1a]">
            <div className="tw-max-w-md tw-mx-auto tw-w-full">
              {/* Header */}
              <div className="tw-text-center tw-mb-8">
                <h2 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-2">
                  Enter Verification Code
                </h2>
                <p className="tw-text-gray-400">
                  Enter the 6-digit code sent to your email
                </p>
              </div>

              {/* OTP Input */}
              <div className="tw-mb-8">
                <div className="tw-flex tw-gap-3 tw-justify-center tw-mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      style={{ fontFamily: "DM Sans Normal" }}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      disabled={isTimerExpired}
                      className={`
                        tw-w-12 tw-h-12 tw-text-center tw-text-xl tw-font-bold tw-rounded-xl tw-border-2 
                        tw-bg-[#2a2a2a] tw-text-white tw-transition-all tw-duration-300
                        focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-400/50 focus:tw-scale-105
                        ${
                          digit
                            ? "tw-border-purple-400 tw-bg-gradient-to-br tw-from-purple-600/20 tw-to-purple-500/10 tw-shadow-lg"
                            : "tw-border-gray-800 hover:tw-border-gray-700"
                        }
                        ${
                          isTimerExpired
                            ? "tw-opacity-50 tw-cursor-not-allowed"
                            : ""
                        }
                      `}
                    />
                  ))}
                </div>

                {/* Resend button */}
                <div className="tw-text-center tw-mb-6">
                  {canResendotp ? (
                    <button
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="tw-text-white tw-p-2 tw-px-4 tw-rounded-3xl tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-transition-all hover:tw-text-white hover:-tw-translate-y-1 hover:tw-shadow-md hover:tw-shadow-black/20 tw-font-medium tw-duration-200 tw-flex tw-items-center tw-gap-2 tw-mx-auto"
                      style={{ fontFamily: "DM Sans Normal" }}
                    >
                      <RefreshCw
                        className={`tw-w-4 tw-h-4 ${
                          isResending ? "tw-animate-spin" : ""
                        }`}
                        style={{ fontFamily: "DM Sans Normal" }}
                      />
                      <p style={{ fontFamily: "DM Sans Normal" }}>
                        {isResending ? "Sending..." : "Resend Code"}
                      </p>
                    </button>
                  ) : (
                    <p
                      className="tw-text-gray-400 tw-text-sm"
                      style={{ fontFamily: "DM Sans Normal" }}
                    >
                      Didn't receive the code?
                      <span
                        className="tw-text-gray-400 tw-ml-1"
                        style={{ fontFamily: "DM Sans Normal" }}
                      >
                        Resend in {formatTime(Math.max(0, timeLeft - 240))}
                        {/* FIX: Math.max(0, ...) prevents negative countdown */}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                disabled={!isOtpComplete || isTimerExpired || isSubmitting}
                style={{ fontFamily: "DM Sans Normal" }}
                className={`
                  tw-w-full tw-py-4 tw-px-6 tw-rounded-xl tw-font-semibold tw-text-white tw-transition-all tw-duration-300
                  ${
                    isOtpComplete && !isTimerExpired && !isSubmitting
                      ? "tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 hover:tw-from-purple-700 hover:tw-to-purple-600 tw-shadow-lg hover:tw-shadow-xl hover:tw-scale-[1.02] active:tw-scale-[0.98]"
                      : "tw-bg-[#2a2a2a] tw-text-gray-400 tw-cursor-not-allowed"
                  }
                  ${isSubmitting ? "tw-animate-pulse" : ""}
                `}
              >
                {isSubmitting ? (
                  <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
                    <div className="tw-w-5 tw-h-5 tw-border-2 tw-border-white tw-border-t-transparent tw-rounded-full tw-animate-spin"></div>
                    <span
                      className="tw-mr-[1rem]"
                      style={{ fontFamily: "DM Sans Normal" }}
                    >
                      Verifying Code...
                    </span>
                  </div>
                ) : (
                  "Verify & Reset Password"
                )}
              </button>

              {/* Footer */}
              <div className="tw-text-center tw-mt-8">
                <p className="tw-text-gray-400 tw-text-sm tw-leading-relaxed">
                  Having trouble? Check your spam folder or{" "}
                  <button
                    className="tw-text-white tw-bg-transparent tw-outline-none tw-border-none tw-transition-all hover:tw-underline tw-font-medium"
                    style={{ fontFamily: "DM Sans Normal" }}
                  >
                    contact support
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;