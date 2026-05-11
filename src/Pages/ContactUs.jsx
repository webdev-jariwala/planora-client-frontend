import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  X,
  Loader2,
  Sparkles,
  Zap,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";

const ContactUs = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@evenuefy.io",
      subtitle: "Get response within 24 hours",
      gradient: "tw-from-[#a855f7] tw-to-[#9333ea]",
      shadow: "tw-shadow-purple-500/20",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 91570-44142",
      subtitle: "Mon-Fri from 8am to 6pm",
      gradient: "tw-from-[#ec4899] tw-to-[#f97316]",
      shadow: "tw-shadow-pink-500/20",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Surat, Gujarat, India",
      subtitle: "Available for meetings",
      gradient: "tw-from-[#f97316] tw-to-[#facc15]",
      shadow: "tw-shadow-orange-500/20",
    },
  ];

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: { name: "", email: "", subject: "", message: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(
          "http://localhost:4000/contactMessages/add",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success(res.data.message, {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        resetForm();
      } catch (error) {
        toast.error(error.response.data?.message || "Something Went Wrong!", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        console.log(error.response.data?.error || error.message);
      }
    },
  });

  return (
    <div
      className="tw-min-h-screen tw-bg-[#080808] tw-text-[#ffffff] tw-overflow-hidden"
      style={{ fontFamily: "DM Sans Normal" }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Contact Info Cards */}
      <ContactInfoSection contactInfo={contactInfo} />

      {/* Contact Form Section */}
      <ContactFormSection formik={formik} />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section
      className="tw-relative tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-px-6 tw-py-20 tw-overflow-hidden"
    >
      {/* Cinematic Deep Mesh Background */}
      <motion.div
        className="tw-absolute tw-inset-0 tw-opacity-20 tw-blur-[120px]"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, #a855f7 0%, transparent 45%)",
            "radial-gradient(circle at 90% 80%, #ec4899 0%, transparent 45%)",
            "radial-gradient(circle at 50% 50%, #f97316 0%, transparent 45%)",
            "radial-gradient(circle at 10% 20%, #a855f7 0%, transparent 45%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="tw-relative tw-z-10 tw-max-w-6xl tw-mx-auto tw-text-center">
        {/* Animated Badge with Hover */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          className="tw-inline-flex tw-items-center tw-gap-2 tw-px-6 tw-py-2.5 tw-rounded-full tw-bg-white/[0.03] tw-backdrop-blur-xl tw-border tw-border-white/10 tw-mb-8 tw-shadow-2xl tw-cursor-default tw-transition-colors"
        >
          <Sparkles className="tw-w-4 tw-h-4 tw-text-yellow-400 tw-animate-pulse" />
          <span className="tw-text-[11px] tw-font-black tw-tracking-[0.3em] tw-uppercase tw-text-purple-300">Reach the team</span>
        </motion.div>

        <motion.h1
          className="tw-text-7xl md:tw-text-9xl tw-font-black tw-mb-8 tw-leading-[0.9] tw-tracking-tighter tw-cursor-default"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Get in Touch with{" "}
          <span className="tw-bg-gradient-to-r tw-from-[#f97316] tw-via-[#ec4899] tw-to-[#a855f7] tw-bg-clip-text tw-text-transparent tw-drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            EvenueFy
          </span>
        </motion.h1>

        <motion.p
          className="tw-text-xl md:tw-text-2xl tw-text-gray-400 tw-mb-12 tw-max-w-3xl tw-mx-auto tw-font-medium tw-leading-relaxed tw-cursor-default"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ twText: "#ffffff" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Whether you're organizing a grand festival or an intimate workshop, 
          we're here to help you make it unforgettable. Reach out anytime.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 140 }}
          whileHover={{ width: 200, transition: { duration: 0.5 } }}
          className="tw-h-1.5 tw-mx-auto tw-bg-gradient-to-r tw-from-[#f97316] tw-to-[#ec4899] tw-rounded-full tw-cursor-pointer"
          style={{ boxShadow: "0 0 40px rgba(236, 72, 153, 0.8)" }}
        />
      </div>
    </section>
  );
};

// Contact Info Section Component
const ContactInfoSection = ({ contactInfo }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="tw-px-6 tw-py-20 tw-max-w-7xl tw-mx-auto tw-relative tw-z-10"
    >
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-10">
        {contactInfo.map((info, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -15, scale: 1.02 }}
            className="tw-group tw-relative tw-p-10 tw-bg-white/[0.02] tw-backdrop-blur-2xl tw-rounded-[2.5rem] tw-border tw-border-white/5 tw-overflow-hidden tw-cursor-pointer tw-transition-all tw-duration-500 hover:tw-bg-white/[0.05] hover:tw-border-white/10"
          >
            {/* Soft Hover Glow */}
            <div
              className={`tw-absolute tw-inset-0 tw-opacity-0 group-hover:tw-opacity-15 tw-transition-opacity tw-duration-700 tw-bg-gradient-to-br ${info.gradient} tw-blur-[80px]`}
            />

            <div className="tw-relative tw-z-10">
              <div
                className={`tw-w-20 tw-h-20 tw-rounded-3xl tw-bg-gradient-to-br ${info.gradient} tw-flex tw-items-center tw-justify-center tw-mb-8 tw-shadow-2xl tw-rotate-3 group-hover:tw-rotate-0 group-hover:tw-scale-110 tw-transition-all tw-duration-500`}
              >
                <info.icon className="tw-w-10 tw-h-10 tw-text-white" />
              </div>
              <h3
                className="tw-text-3xl tw-font-black tw-mb-4 tw-text-white tw-tracking-tight group-hover:tw-text-purple-300 tw-transition-colors"
              >
                {info.title}
              </h3>
              <p className="tw-text-gray-200 tw-text-xl tw-font-bold tw-mb-2">
                {info.content}
              </p>
              <p className="tw-text-gray-500 tw-text-sm tw-font-medium group-hover:tw-text-gray-400 tw-transition-colors">{info.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Contact Form Section Component
const ContactFormSection = ({ formik }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="tw-px-6 tw-py-24 tw-max-w-5xl tw-mx-auto tw-relative tw-z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="tw-relative tw-bg-[#0a0a0a] tw-p-10 md:tw-p-20 tw-rounded-[3.5rem] tw-border tw-border-white/5 tw-overflow-hidden tw-shadow-2xl"
      >
        {/* Dynamic Inner Mesh Glow */}
        <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
          <div className="tw-absolute -tw-top-24 -tw-right-24 tw-w-[500px] tw-h-[500px] tw-bg-purple-600/10 tw-blur-[120px] tw-rounded-full" />
          <div className="tw-absolute -tw-bottom-24 -tw-left-24 tw-w-[500px] tw-h-[500px] tw-bg-pink-600/10 tw-blur-[120px] tw-rounded-full" />
        </div>

        <div className="tw-relative tw-z-10">
          <motion.h2
            whileHover={{ scale: 1.01 }}
            className="tw-text-5xl md:tw-text-6xl tw-font-black tw-mb-4 tw-text-center tw-tracking-tight tw-cursor-default"
            style={{ fontFamily: "Recoleta, serif" }}
          >
            Send Us a Message
          </motion.h2>
          <p className="tw-text-gray-500 tw-text-center tw-mb-16 tw-text-xl tw-font-medium tw-cursor-default">
            Fill out the form below and we'll get back to you shortly
          </p>

          <form
            className="tw-space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
              {/* Name Input */}
              <div className="tw-group tw-space-y-3">
                <label className="tw-block tw-text-gray-400 tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest group-hover:tw-text-purple-400 tw-transition-colors">
                  Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  {...formik.getFieldProps("name")}
                  className="tw-w-full tw-bg-white/[0.03] tw-border tw-border-white/10 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white focus:tw-outline-none focus:tw-border-purple-500/50 focus:tw-bg-white/[0.06] hover:tw-border-white/20 tw-transition-all tw-duration-300"
                  placeholder="Your full name"
                />
                {formik.touched.name && formik.errors.name && (
                <span className="tw-text-red-400 tw-text-xs tw-mt-2 tw-block tw-font-bold">
                  {formik.errors.name}
                </span>
              )}
              </div>

              {/* Email Input */}
              <div className="tw-group tw-space-y-3">
                <label className="tw-block tw-text-gray-400 tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest group-hover:tw-text-purple-400 tw-transition-colors">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  {...formik.getFieldProps("email")}
                  className="tw-w-full tw-bg-white/[0.03] tw-border tw-border-white/10 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white focus:tw-outline-none focus:tw-border-purple-500/50 focus:tw-bg-white/[0.06] hover:tw-border-white/20 tw-transition-all tw-duration-300"
                  placeholder="your@email.com"
                />
                {formik.touched.email && formik.errors.email && (
                <span className="tw-text-red-400 tw-text-xs tw-mt-2 tw-block tw-font-bold">
                  {formik.errors.email}
                </span>
              )}
              </div>
            </div>

            {/* Subject Input */}
            <div className="tw-group tw-space-y-3">
              <label className="tw-block tw-text-gray-400 tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest group-hover:tw-text-purple-400 tw-transition-colors">
                Subject
              </label>
              <motion.input
                whileFocus={{ scale: 1.005 }}
                type="text"
                name="subject"
                {...formik.getFieldProps("subject")}
                className="tw-w-full tw-bg-white/[0.03] tw-border tw-border-white/10 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white focus:tw-outline-none focus:tw-border-purple-500/50 focus:tw-bg-white/[0.06] hover:tw-border-white/20 tw-transition-all tw-duration-300"
                placeholder="What can we help you with?"
              />
              {formik.touched.subject && formik.errors.subject && (
                <span className="tw-text-red-400 tw-text-xs tw-mt-2 tw-block tw-font-bold">
                  {formik.errors.subject}
                </span>
              )}
            </div>

            {/* Message Input */}
            <div className="tw-group tw-space-y-3">
              <label className="tw-block tw-text-gray-400 tw-font-bold tw-text-xs tw-uppercase tw-tracking-widest group-hover:tw-text-purple-400 tw-transition-colors">
                Message
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.005 }}
                name="message"
                {...formik.getFieldProps("message")}
                rows="6"
                className="tw-w-full tw-bg-white/[0.03] tw-border tw-border-white/10 tw-rounded-2xl tw-px-6 tw-py-4 tw-text-white focus:tw-outline-none focus:tw-border-purple-500/50 focus:tw-bg-white/[0.06] hover:tw-border-white/20 tw-transition-all tw-duration-300 tw-resize-none"
                placeholder="Tell us everything..."
              />
              {formik.touched.message && formik.errors.message && (
                <span className="tw-text-red-400 tw-text-xs tw-mt-2 tw-block tw-font-bold">
                  {formik.errors.message}
                </span>
              )}
            </div>

            {/* Submit Button with Dynamic Hover */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="tw-w-full tw-relative tw-bg-white tw-text-black tw-font-black tw-py-6 tw-px-10 tw-rounded-2xl tw-transition-all tw-duration-500 tw-flex tw-items-center tw-justify-center tw-gap-4 tw-text-xl tw-uppercase tw-tracking-widest hover:tw-bg-gradient-to-r hover:tw-from-[#a855f7] hover:tw-to-[#ec4899] hover:tw-text-white group"
            >
              <Send className="tw-w-6 tw-h-6 group-hover:tw-translate-x-1 group-hover:-tw-translate-y-1 tw-transition-transform" />
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;