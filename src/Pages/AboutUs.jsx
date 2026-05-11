import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Ticket,
  Calendar,
  Users,
  CreditCard,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Eye,
  Heart,
  Globe,
} from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/evenuefywhitelogowithoutbackgroound.png";

const AboutUs = () => {
  return (
    <>
      <div
        className="tw-min-h-screen tw-bg-[#080808] tw-text-[#ffffff] tw-overflow-hidden"
        style={{ fontFamily: "DM Sans, sans-serif" }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* About Planora */}
        <AboutSection />

        {/* Mission & Vision */}
        <MissionVisionSection />

        {/* Core Features */}
        <FeaturesSection />

        {/* Team Philosophy */}
        <PhilosophySection />

        {/* CTA Section */}
        <CTASection />
      </div>
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="tw-relative tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-px-6 tw-py-20 tw-overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <motion.div
        className="tw-absolute tw-inset-0 tw-opacity-20 tw-blur-[120px]"
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, #a855f7 0%, transparent 50%)",
            "radial-gradient(circle at 90% 80%, #ec4899 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #f97316 0%, transparent 50%)",
            "radial-gradient(circle at 10% 20%, #a855f7 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="tw-relative tw-z-10 tw-max-w-6xl tw-mx-auto tw-text-center tw-mt-24">
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="tw-inline-flex tw-items-center tw-gap-2 tw-px-6 tw-py-2 tw-rounded-full tw-bg-white/[0.03] tw-backdrop-blur-xl tw-border tw-border-white/10 tw-mb-8 tw-shadow-2xl"
        >
          <Sparkles className="tw-w-4 tw-h-4 tw-text-yellow-400" />
          <span className="tw-text-xs tw-font-black tw-tracking-[0.2em] tw-uppercase tw-text-purple-300">Defining New Standards</span>
        </motion.div>

        <motion.h1
          className="tw-text-7xl md:tw-text-9xl tw-font-black tw-mb-8 tw-leading-[0.9] tw-tracking-tighter"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Empowering Events.
          <br />
          <span className="tw-bg-gradient-to-r tw-from-[#f97316] tw-via-[#ec4899] tw-to-[#a855f7] tw-bg-clip-text tw-text-transparent tw-filter tw-drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
            Connecting People.
          </span>
        </motion.h1>

        <motion.p
          className="tw-text-xl md:tw-text-2xl tw-text-gray-400 tw-mb-16 tw-max-w-3xl tw-mx-auto tw-font-medium tw-leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Simplifying event management, one ticket at a time. Where organizers
          thrive and attendees discover unforgettable experiences.
        </motion.p>

        <motion.button
          className="tw-group tw-relative tw-px-14 tw-py-6 tw-bg-white tw-text-black tw-rounded-2xl tw-font-black tw-text-xl tw-transition-all tw-duration-500 hover:tw-shadow-[0_20px_60px_rgba(255,255,255,0.2)] hover:tw-scale-105"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/Events")}
        >
          <span className="tw-relative tw-z-10 tw-flex tw-items-center tw-gap-3">
            Explore Events <Zap className="tw-w-6 tw-h-6 tw-fill-current" />
          </span>
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-purple-100 tw-to-pink-100 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity" />
        </motion.button>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="tw-py-32 tw-px-6 tw-bg-[#080808]">
      <div className="tw-max-w-7xl tw-mx-auto tw-grid lg:tw-grid-cols-2 tw-gap-24 tw-items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "DM Sans Normal" }}
        >
          <h2
            className="tw-text-6xl tw-font-black tw-mb-8 tw-tracking-tight"
            style={{ fontFamily: "Recoleta, serif" }}
          >
            <span className="tw-bg-gradient-to-b tw-from-white tw-to-gray-500 tw-bg-clip-text tw-text-transparent">About EvenueFy</span>
          </h2>
          <div className="tw-space-y-6 tw-text-xl tw-text-gray-400 tw-leading-relaxed tw-font-medium">
            <p>
              EvenueFy is the bridge between event organizers and enthusiastic
              attendees. We've built a seamless platform that makes discovering,
              booking, and managing events effortless and enjoyable.
            </p>
            <p>
              From intimate workshops to large-scale conferences, EvenueFy
              automates the complexity of event management while keeping the human
              connection at its core.
            </p>
            <p className="tw-p-6 tw-bg-white/[0.02] tw-border-l-4 tw-border-purple-500 tw-rounded-r-2xl">
              With just a{" "}
              <span className="tw-text-white tw-font-black">
                5% commission
              </span>{" "}
              on every ticket sold, we empower organizers to focus on creating
              memorable experiences while we handle the rest.
            </p>
          </div>
        </motion.div>

        {/* Logo Glass Container */}
        <motion.div
          className="tw-relative tw-h-[500px] tw-rounded-[3rem] tw-overflow-hidden tw-bg-white/[0.02] tw-border tw-border-white/5 tw-backdrop-blur-3xl tw-flex tw-items-center tw-justify-center tw-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, ease: "backOut" }}
        >
          <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-purple-500/10 tw-to-pink-500/10" />
          <img
            src={logo}
            className="tw-w-72 tw-relative tw-z-10 tw-filter tw-drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          />
          {/* Animated Glow in frame */}
          <motion.div
            className="tw-absolute tw-w-64 tw-h-64 tw-bg-purple-600/20 tw-blur-[100px] tw-rounded-full"
            animate={{
              x: [-100, 100, -100],
              y: [-100, 100, -100],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
};

// Mission & Vision Section
const MissionVisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To democratize event management by providing cutting-edge tools that empower organizers of all sizes to create, promote, and execute successful events with minimal friction.",
      gradient: "tw-from-purple-600 tw-to-purple-900",
      accent: "tw-border-purple-500/20",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the global standard for event discovery and management, fostering a world where every event—big or small—can find its perfect audience and create lasting impact.",
      gradient: "tw-from-pink-600 tw-to-orange-900",
      accent: "tw-border-pink-500/20",
    },
  ];

  return (
    <section ref={ref} className="tw-py-32 tw-px-6 tw-bg-[#0a0a0a]">
      <div className="tw-max-w-7xl tw-mx-auto" style={{ fontFamily: "DM Sans Normal" }}>
        <motion.h2
          className="tw-text-6xl tw-font-black tw-text-center tw-mb-20 tw-tracking-tight"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our <span className="tw-text-purple-500">North Star</span>
        </motion.h2>

        <div className="tw-grid md:tw-grid-cols-2 tw-gap-12">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className={`tw-relative tw-p-12 tw-bg-white/[0.02] tw-backdrop-blur-2xl tw-rounded-[3rem] tw-border ${card.accent} tw-group tw-transition-all tw-duration-500 hover:tw-bg-white/[0.05]`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="tw-relative tw-z-10">
                <div className={`tw-w-20 tw-h-20 tw-mb-8 tw-rounded-3xl tw-bg-gradient-to-br ${card.gradient} tw-flex tw-items-center tw-justify-center tw-shadow-2xl tw-rotate-3 group-hover:tw-rotate-0 tw-transition-transform`}>
                  <card.icon className="tw-w-10 tw-h-10 tw-text-white" />
                </div>
                <h3 className="tw-text-4xl tw-font-black tw-mb-6 tw-text-white">{card.title}</h3>
                <p className="tw-text-gray-500 tw-text-lg tw-leading-relaxed tw-font-medium group-hover:tw-text-gray-300 tw-transition-colors">
                  {card.description}
                </p>
              </div>
              {/* Bottom Decoration */}
              <div className={`tw-absolute tw-bottom-0 tw-left-12 tw-right-12 tw-h-1 tw-bg-gradient-to-r ${card.gradient} tw-rounded-full tw-opacity-20 group-hover:tw-opacity-100 tw-transition-all`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Ticket, title: "Easy Ticketing", description: "Generate, customize, and distribute tickets with just a few clicks. QR codes, digital wallets, and more.", color: "#a855f7" },
    { icon: Calendar, title: "Organizer Dashboard", description: "Comprehensive analytics, attendee management, and real-time insights all in one interface.", color: "#ec4899" },
    { icon: CreditCard, title: "Secure Payments", description: "Industry-leading payment security with multiple options and instant payouts to organizers.", color: "#f97316" },
    { icon: Sparkles, title: "Beautiful UI/UX", description: "A stunning, intuitive interface designed for organizers and attendees. Every interaction feels effortless.", color: "#c084fc" },
    { icon: Zap, title: "Real-time Updates", description: "Instant notifications for bookings, cancellations, and event changes keep everyone in the loop.", color: "#facc15" },
    { icon: Shield, title: "Trust & Safety", description: "Advanced fraud detection, secure data handling, and 24/7 support to ensure peace of mind.", color: "#4ade80" },
  ];

  return (
    <section ref={ref} className="tw-py-32 tw-px-6 tw-bg-[#080808]">
      <div className="tw-max-w-7xl tw-mx-auto" style={{ fontFamily: "DM Sans Normal" }}>
        <motion.h2
          className="tw-text-6xl tw-font-black tw-text-center tw-mb-8 tw-tracking-tight"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Core <span className="tw-bg-gradient-to-r tw-from-white tw-to-gray-600 tw-bg-clip-text tw-text-transparent">Capabilities</span>
        </motion.h2>

        <motion.p
          className="tw-text-xl tw-text-gray-500 tw-text-center tw-mb-24 tw-max-w-2xl tw-mx-auto tw-font-medium"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Powerful tools architected for the modern event landscape.
        </motion.p>

        <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="tw-relative tw-p-10 tw-bg-white/[0.02] tw-backdrop-blur-2xl tw-rounded-[2.5rem] tw-border tw-border-white/5 tw-group tw-cursor-pointer tw-transition-all tw-duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, backgroundColor: "rgba(255, 255, 255, 0.05)", borderColor: `${feature.color}40` }}
            >
              <div
                className="tw-w-16 tw-h-16 tw-mb-8 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-500 group-hover:tw-rotate-12"
                style={{ backgroundColor: `${feature.color}15`, boxShadow: `0 0 40px ${feature.color}10` }}
              >
                <feature.icon className="tw-w-8 tw-h-8" style={{ color: feature.color }} />
              </div>
              <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-4 tw-tracking-tight">{feature.title}</h3>
              <p className="tw-text-gray-500 tw-leading-relaxed tw-font-medium group-hover:tw-text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Philosophy Section
const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { icon: Heart, title: "User-Centric", description: "Every feature, every pixel is designed with our users in mind. Your success is our primary KPI." },
    { icon: TrendingUp, title: "Innovation First", description: "We constantly push boundaries, embracing cutting-edge tech to stay ahead of the curve." },
    { icon: Globe, title: "Transparent & Fair", description: "No hidden fees, no surprises. Just honest pricing and straightforward communication." },
  ];

  return (
    <section ref={ref} className="tw-py-32 tw-px-6 tw-bg-[#0a0a0a]">
      <div className="tw-max-w-7xl tw-mx-auto" style={{ fontFamily: "DM Sans Normal" }}>
        <motion.h2
          className="tw-text-6xl tw-font-black tw-text-center tw-mb-24 tw-tracking-tight"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Our DNA
        </motion.h2>

        <div className="tw-grid md:tw-grid-cols-3 tw-gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="tw-relative tw-p-10 tw-bg-white/[0.01] tw-backdrop-blur-xl tw-rounded-[3rem] tw-text-center tw-group tw-border tw-border-white/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -15 }}
            >
              <div className="tw-w-24 tw-h-24 tw-mx-auto tw-mb-10 tw-rounded-full tw-bg-gradient-to-br tw-from-purple-600 tw-to-pink-600 tw-flex tw-items-center tw-justify-center tw-shadow-[0_20px_40px_rgba(168,85,247,0.3)] group-hover:tw-scale-110 tw-transition-all">
                <value.icon className="tw-w-10 tw-h-10 tw-text-white" />
              </div>
              <h3 className="tw-text-2xl tw-font-black tw-text-white tw-mb-6 tw-tracking-tight">{value.title}</h3>
              <p className="tw-text-gray-500 tw-text-lg tw-leading-relaxed tw-font-medium">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="tw-relative tw-py-40 tw-px-6 tw-overflow-hidden tw-bg-[#080808]">
      {/* Background Deep Polish */}
      <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-purple-900/10 tw-to-transparent" />
      
      {/* Dynamic Grid Pattern */}
      <motion.div
        className="tw-absolute tw-inset-0 tw-opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="tw-relative tw-z-10 tw-max-w-5xl tw-mx-auto tw-text-center">
        <motion.h2
          className="tw-text-6xl md:tw-text-8xl tw-font-black tw-mb-8 tw-leading-[0.9] tw-tracking-tighter"
          style={{ fontFamily: "Recoleta, serif" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Join <span className="tw-text-white">EvenueFy</span> — <br />
          <span className="tw-text-gray-600">The Home of Experience.</span>
        </motion.h2>

        <motion.p
          className="tw-text-2xl tw-mb-16 tw-text-gray-400 tw-max-w-2xl tw-mx-auto tw-font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to scale your vision? Let's build something unforgettable together.
        </motion.p>

        <motion.button
          className="tw-px-16 tw-py-8 tw-text-2xl tw-font-black tw-bg-white tw-text-black tw-rounded-[2rem] tw-shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:tw-shadow-[0_30px_70px_rgba(255,255,255,0.2)] hover:tw-scale-110 tw-transition-all"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/Register_Organizer")}
        >
          Become an Organizer
        </motion.button>
      </div>
    </section>
  );
};

export default AboutUs;