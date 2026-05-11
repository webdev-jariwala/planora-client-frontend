import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Mail,
  Hash,
  MapPin,
  Sparkles,
  Rocket,
  Users,
  Calendar,
} from "lucide-react";
import { image1 } from "./Event_Images";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register_Organizer = () => {
  const navigate = useNavigate();
  const isReqSend = useRef(false);
  const [focusedField, setFocusedField] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message === "New User") {
        toast.error("You First Needed to Create User Account", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        navigate("/Signup");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
      navigate("/login");
    }
  };
  const checkIsUserOrganizer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/organizer/isUserOrganizer",
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.error(res.data.message, {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      checkUserLogIn();
      checkIsUserOrganizer();
      isReqSend.current = true;
    }
  }, []);
  // ✅ Validation Schema
  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company name is required"),
    businessEmail: Yup.string()
      .email("Invalid email format")
      .required("Business email is required"),
    gstNumber: Yup.string()
      .matches(/^[0-9A-Z]{15}$/, "GST must be 15 characters (A-Z, 0-9)")
      .required("GST number is required"),
    address: Yup.string().required("Address is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      companyName: "",
      businessEmail: "",
      gstNumber: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/organizer/register",
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
        axios.get(`http://localhost:4000/mailer/sendOrganizerWelcomeEmail`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // 🔑 allow cookies
        });
        resetForm();
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        console.log(error.response.data?.error || error.message);
      }
    },
  });

  const steps = [
    {
      id: "companyName",
      title: "Company Identity",
      icon: FileText,
      color: "purple",
      description: "Tell us about your business",
    },
    {
      id: "businessEmail",
      title: "Contact Gateway",
      icon: Mail,
      color: "blue",
      description: "How can we reach you?",
    },
    {
      id: "gstNumber",
      title: "Legal Credentials",
      icon: Hash,
      color: "emerald",
      description: "Your business registration",
    },
    {
      id: "address",
      title: "Location Hub",
      icon: MapPin,
      color: "orange",
      description: "Where magic happens",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNextStep = async () => {
    const fieldName = steps[currentStep].id;

    // Mark field as touched so Formik shows the error in <span>
    formik.setFieldTouched(fieldName, true);

    const errors = await formik.validateForm();
    if (!errors[fieldName]) {
      handleStepClick(currentStep + 1);
    }
  };

  const handleStepClick = (stepIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStep(stepIndex);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        border: "tw-border-purple-500/60",
        shadow: "tw-shadow-purple-500/25",
        bg: "tw-bg-purple-500/20",
        text: "tw-text-purple-400",
        gradient: "tw-from-purple-600 tw-to-purple-800",
      },
      blue: {
        border: "tw-border-blue-500/60",
        shadow: "tw-shadow-blue-500/25",
        bg: "tw-bg-blue-500/20",
        text: "tw-text-blue-400",
        gradient: "tw-from-blue-600 tw-to-blue-800",
      },
      emerald: {
        border: "tw-border-emerald-500/60",
        shadow: "tw-shadow-emerald-500/25",
        bg: "tw-bg-emerald-500/20",
        text: "tw-text-emerald-400",
        gradient: "tw-from-emerald-600 tw-to-emerald-800",
      },
      orange: {
        border: "tw-border-orange-500/60",
        shadow: "tw-shadow-orange-500/25",
        bg: "tw-bg-orange-500/20",
        text: "tw-text-orange-400",
        gradient: "tw-from-orange-600 tw-to-orange-800",
      },
    };
    return colors[color];
  };

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }
        @keyframes particle-float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-particle {
          animation: particle-float 15s linear infinite;
        }
        .step-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .step-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        /* On-load animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease forwards;
        }
        .fade-in-up.delay-1 {
          animation-delay: 0.3s;
        }
        .fade-in-up.delay-2 {
          animation-delay: 0.6s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-gray-950 tw-via-purple-950/20 tw-to-black tw-relative tw-overflow-hidden tw-font-['DM_Sans_Normal']">
        {/* Background Particles */}
        <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="floating-particle tw-absolute tw-w-1 tw-h-1 tw-bg-purple-400/30 tw-rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Mouse Gradient */}
        <div
          className="tw-absolute tw-pointer-events-none tw-w-96 tw-h-96 tw-bg-gradient-radial tw-from-purple-600/20 tw-via-blue-600/10 tw-to-transparent tw-rounded-full tw-blur-3xl tw-transition-all tw-duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        <div
          className="tw-min-h-screen tw-p-4 tw-pt-[22%] sm:tw-pt-[17%] md:tw-pt-[15%] lg:tw-pt-[10%] tw-pb-[7%] tw-relative tw-z-10"
          style={{
            backgroundImage: `url(${image1})`,
            backgroundSize: "cover",
          }}
        >
          {/* Background Blur and shade  */}
          <div className="tw-absolute tw-inset-0 tw-bg-black/40 tw-backdrop-blur-[8px] tw-z-0"></div>
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-l tw-from-transparent tw-via-transparent tw-to-[#0f0f0f] tw-z-0"></div>
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-transparent tw-via-transparent tw-to-[#0f0f0f] tw-z-0"></div>

          <div className="tw-relative tw-z-10">
            <div className="tw-max-w-3xl tw-mx-auto tw-text-center tw-mb-8">
              <h1 className="fade-in-up tw-text-6xl tw-font-['Recoleta'] tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-purple-400 tw-via-blue-400 tw-to-purple-600 tw-mb-4 tw-leading-tight">
                Create <span className="tw-text-4xl tw-ml-3">Epic Events</span>
              </h1>
              <p className="fade-in-up delay-1 tw-text-gray-300 tw-text-lg tw-leading-relaxed">
                Join the revolution of event organizers creating
                <span className="tw-text-purple-400 tw-font-semibold">
                  {" "}
                  unforgettable experiences
                </span>
              </p>
            </div>
          </div>

          <div className="tw-flex tw-items-center tw-justify-center">
            <div className="tw-w-full tw-max-w-7xl tw-grid tw-grid-cols-1 xl:tw-grid-cols-5 tw-gap-8 tw-items-start">
              {/* Left Steps */}
              <div className="tw-hidden xl:tw-inline-block xl:tw-col-span-2 tw-space-y-6 fade-in-up delay-1">
                {/* Step cards … */}
                <div className="tw-space-y-4">
                  {steps.map((step, index) => {
                    const colors = getColorClasses(step.color);
                    const isActive = currentStep === index;
                    const isCompleted =
                      formik.values[step.id] !== "" && !formik.errors[step.id];

                    return (
                      <div
                        key={step.id}
                        onClick={() => handleStepClick(index)}
                        className={`step-card tw-px-6 tw-py-5 tw-rounded-2xl tw-border tw-cursor-pointer tw-group tw-backdrop-blur-sm ${
                          isActive
                            ? `${colors.border} ${colors.shadow} ${colors.bg} tw-shadow-lg`
                            : "tw-border-gray-700/30 tw-bg-[#0f0f0f]/60 hover:tw-border-gray-600/50"
                        }`}
                      >
                        <div className="tw-flex tw-items-center tw-gap-4">
                          <div
                            className={`tw-p-3 tw-rounded-xl tw-transition-all tw-duration-300 ${
                              isActive ? colors.bg : "tw-bg-gray-700/30"
                            }`}
                          >
                            <step.icon
                              size={24}
                              className={`tw-transition-colors tw-duration-300 ${
                                isActive ? colors.text : "tw-text-gray-400"
                              }`}
                            />
                          </div>
                          <div className="tw-flex-1">
                            <h3
                              className={`tw-font-['DM_Sans_SemiBold'] tw-text-lg tw-transition-colors tw-duration-300 ${
                                isActive ? "tw-text-white" : "tw-text-gray-300"
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="tw-text-sm tw-text-gray-400 tw-mt-1">
                              {step.description}
                            </p>
                          </div>
                          {isCompleted && (
                            <div className="tw-w-6 tw-h-6 tw-bg-green-500 tw-rounded-full tw-flex tw-items-center tw-justify-center">
                              <svg
                                className="tw-w-3 tw-h-3 tw-text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stats Cards */}
                <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-mt-8">
                  {[
                    { icon: Users, value: "10K+", label: "Organizers" },
                    { icon: Calendar, value: "50K+", label: "Events" },
                    { icon: Rocket, value: "1M+", label: "Attendees" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="tw-bg-gray-900/30 tw-backdrop-blur-sm tw-rounded-xl tw-p-4 tw-text-center tw-border tw-border-gray-700/30"
                    >
                      <stat.icon
                        size={20}
                        className="tw-text-purple-400 tw-mx-auto tw-mb-2"
                      />
                      <div className="tw-text-lg tw-font-['DM_Sans_Bold'] tw-text-white">
                        {stat.value}
                      </div>
                      <div className="tw-text-xs tw-text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Form */}
              <div className="xl:tw-col-span-3 fade-in-up delay-2">
                <div className="tw-bg-[#0f0f0f]/60 tw-backdrop-blur-xl tw-rounded-3xl tw-border tw-border-gray-700/50 tw-shadow-2xl tw-p-8 lg:tw-p-12 tw-relative tw-overflow-hidden">
                  {/* Form Header */}
                  <div className="tw-text-center tw-mb-8">
                    <div className="tw-inline-flex tw-items-center tw-gap-2 tw-mb-4">
                      <Sparkles size={20} className="tw-text-purple-400" />
                      <span className="tw-text-sm tw-text-purple-400 tw-uppercase tw-tracking-wider tw-font-['DM_Sans_SemiBold']">
                        Step {currentStep + 1} of {steps.length}
                      </span>
                    </div>
                    <h2 className="tw-text-3xl tw-font-['Recoleta'] tw-text-white tw-mb-2">
                      {steps[currentStep].title}
                    </h2>
                    <p className="tw-text-gray-300">
                      {steps[currentStep].description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="tw-w-full tw-bg-gray-700/30 tw-rounded-full tw-h-2 tw-mb-8 tw-overflow-hidden">
                    <div
                      className="tw-h-full tw-bg-gradient-to-r tw-from-purple-500 tw-to-blue-500 tw-transition-all tw-duration-500 tw-ease-out"
                      style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Dynamic Form Content */}
                  <div
                    className={`tw-transition-all tw-duration-300 ${
                      isAnimating
                        ? "tw-opacity-0 tw-transform tw-scale-95"
                        : "tw-opacity-100 tw-transform tw-scale-100"
                    }`}
                  >
                    {currentStep === 0 && (
                      <div className="tw-space-y-6">
                        <div className="tw-relative">
                          <label className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-['DM_Sans_SemiBold'] tw-text-gray-200 tw-uppercase tw-tracking-wider tw-mb-3">
                            <FileText
                              size={16}
                              className="tw-text-purple-400"
                            />
                            Company Name
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps("companyName")}
                            onFocus={() => setFocusedField("companyName")}
                            onBlur={() => setFocusedField("")}
                            className={`tw-w-full tw-bg-[#0f0f0f]/70 tw-border tw-border-gray-600/50 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white tw-placeholder-gray-400 tw-font-['DM_Sans_Normal'] tw-text-lg tw-transition-all tw-duration-300 tw-outline-none tw-backdrop-blur-sm ${
                              focusedField === "companyName"
                                ? "tw-border-purple-500/60 tw-shadow-lg tw-shadow-purple-500/25 tw-bg-black/30"
                                : "hover:tw-border-gray-500/70 hover:tw-bg-[#0f0f0f]/10"
                            }`}
                            placeholder="What's your company name?"
                          />
                          {formik.touched.companyName &&
                            formik.errors.companyName && (
                              <span className="tw-text-red-400 tw-text-sm">
                                {formik.errors.companyName}
                              </span>
                            )}
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="tw-space-y-6">
                        <div className="tw-relative">
                          <label className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-['DM_Sans_SemiBold'] tw-text-gray-200 tw-uppercase tw-tracking-wider tw-mb-3">
                            <Mail size={16} className="tw-text-blue-400" />
                            Business Email
                          </label>
                          <input
                            type="email"
                            {...formik.getFieldProps("businessEmail")}
                            onFocus={() => setFocusedField("businessEmail")}
                            onBlur={() => setFocusedField("")}
                            className={`tw-w-full tw-bg-[#0f0f0f]/70 tw-border tw-border-gray-600/50 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white tw-placeholder-gray-400 tw-font-['DM_Sans_Normal'] tw-text-lg tw-transition-all tw-duration-300 tw-outline-none tw-backdrop-blur-sm ${
                              focusedField === "businessEmail"
                                ? "tw-border-blue-500/60 tw-shadow-lg tw-shadow-blue-500/25 tw-bg-black/30"
                                : "hover:tw-border-gray-500/70 hover:tw-bg-[#0f0f0f]/10"
                            }`}
                            placeholder="your.business@example.com"
                          />
                          {formik.touched.businessEmail &&
                            formik.errors.businessEmail && (
                              <span className="tw-text-red-400 tw-text-sm">
                                {formik.errors.businessEmail}
                              </span>
                            )}
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="tw-space-y-6">
                        <div className="tw-relative">
                          <label className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-['DM_Sans_SemiBold'] tw-text-gray-200 tw-uppercase tw-tracking-wider tw-mb-3">
                            <Hash size={16} className="tw-text-emerald-400" />
                            GST Number
                          </label>
                          <input
                            type="text"
                            {...formik.getFieldProps("gstNumber")}
                            onFocus={() => setFocusedField("gstNumber")}
                            onBlur={() => setFocusedField("")}
                            className={`tw-w-full tw-bg-[#0f0f0f]/70 tw-border tw-border-gray-600/50 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white tw-placeholder-gray-400 tw-font-['DM_Sans_Normal'] tw-text-lg tw-transition-all tw-duration-300 tw-outline-none tw-backdrop-blur-sm ${
                              focusedField === "gstNumber"
                                ? "tw-border-emerald-500/60 tw-shadow-lg tw-shadow-emerald-500/25 tw-bg-black/30"
                                : "hover:tw-border-gray-500/70 hover:tw-bg-[#0f0f0f]/10"
                            }`}
                            placeholder="22AAAAA0000A1Z5"
                          />
                          {formik.touched.gstNumber &&
                            formik.errors.gstNumber && (
                              <span className="tw-text-red-400 tw-text-sm">
                                {formik.errors.gstNumber}
                              </span>
                            )}
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="tw-space-y-6">
                        <div className="tw-relative">
                          <label className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-['DM_Sans_SemiBold'] tw-text-gray-200 tw-uppercase tw-tracking-wider tw-mb-3">
                            <MapPin size={16} className="tw-text-orange-400" />
                            Business Address
                          </label>
                          <textarea
                            {...formik.getFieldProps("address")}
                            onFocus={() => setFocusedField("address")}
                            onBlur={() => setFocusedField("")}
                            rows={4}
                            className={`tw-w-full tw-bg-[#0f0f0f]/70 tw-border tw-border-gray-600/50 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white tw-placeholder-gray-400 tw-font-['DM_Sans_Normal'] tw-text-lg tw-transition-all tw-duration-300 tw-outline-none tw-resize-none tw-backdrop-blur-sm ${
                              focusedField === "address"
                                ? "tw-border-orange-500/60 tw-shadow-lg tw-shadow-orange-500/25 tw-bg-black/30"
                                : "hover:tw-border-gray-500/70 hover:tw-bg-[#0f0f0f]/10"
                            }`}
                            placeholder="Enter your complete business address..."
                          />
                          {formik.touched.address && formik.errors.address && (
                            <span className="tw-text-red-400 tw-text-sm">
                              {formik.errors.address}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="tw-flex tw-gap-4 tw-mt-8">
                    {currentStep > 0 && (
                      <button
                        onClick={() => handleStepClick(currentStep - 1)}
                        className="tw-px-6 tw-py-3 tw-bg-gray-700/50 tw-text-white tw-rounded-xl tw-border tw-border-gray-600/50 hover:tw-bg-gray-600/50 tw-transition-all tw-duration-300 tw-font-['DM_Sans_SemiBold']"
                      >
                        Previous
                      </button>
                    )}

                    {currentStep < steps.length - 1 ? (
                      <button
                        onClick={() => handleNextStep()}
                        className="tw-flex-1 tw-bg-gradient-to-r tw-from-purple-600 tw-to-blue-600 hover:tw-from-purple-500 hover:tw-to-blue-500 tw-text-white tw-font-['DM_Sans_Bold'] tw-text-lg tw-py-3 tw-px-8 tw-rounded-xl tw-transition-all tw-duration-300 tw-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-purple-600/25"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        onClick={formik.handleSubmit}
                        className="tw-flex-1 tw-bg-gradient-to-r tw-from-emerald-600 tw-to-purple-600 hover:tw-from-emerald-500 hover:tw-to-purple-500 tw-text-white tw-font-['DM_Sans_Bold'] tw-text-lg tw-py-3 tw-px-8 tw-rounded-xl tw-transition-all tw-duration-300 tw-transform hover:tw-scale-105 tw-shadow-lg tw-shadow-emerald-600/25"
                      >
                        🚀 Launch My Journey
                      </button>
                    )}
                  </div>

                  {/* Terms */}
                  <p className="tw-text-sm tw-text-gray-400 tw-text-center tw-mt-6">
                    By registering, you agree to Planora's{" "}
                    <span className="tw-text-purple-400 hover:tw-text-purple-300 tw-cursor-pointer tw-underline tw-decoration-dotted tw-transition-colors tw-duration-200">
                      Terms & Conditions
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register_Organizer;
