import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Award,
  Target,
  Shield,
  Ticket,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Home_Slider from "../components/Home_Slider";
import logo from "../assets/evenuefywhitelogowithoutbackgroound.png";
import TiltedCard from "../components/TiltedCard";
import PlanoraTaglines from "../components/Tagline";
import * as Avtar from "../components/Avtar_images.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

const Home = () => {
  const [rotate, setRotate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const organizersRef = useRef(null);
  const whyUsRef = useRef(null);

  const featuresInView = useInView(featuresRef, {
    once: true,
    margin: "-100px",
  });
  const organizersInView = useInView(organizersRef, {
    once: true,
    margin: "-100px",
  });
  const whyUsInView = useInView(whyUsRef, { once: true, margin: "-100px" });

  const handleScroll = () => {
    const rotation = window.scrollY / 37;
    setRotate(rotation);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="tw-min-h-screen tw-bg-[#0f0f0f] tw-text-white tw-overflow-hidden"
      style={{ fontFamily: "DM Sans Normal" }}
    >
      {isLoading && <LoadingScreen />}
      {/* Home Slider */}
      <Home_Slider />

      {/* Hero Section with Video/Image */}
      <section
        ref={heroRef}
        className="tw-relative tw-min-h-screen tw-flex tw-items-center tw-px-6 tw-py-20 tw-overflow-hidden"
      >
        {/* Dynamic Background */}
        <div className="tw-absolute tw-inset-0">
          <div className="tw-absolute tw-top-[-10%] tw-left-[-10%] tw-w-[600px] tw-h-[600px] tw-bg-gradient-to-r tw-from-purple-600/30 tw-via-pink-600/20 tw-to-transparent tw-rounded-full tw-blur-3xl tw-animate-pulse"></div>
          <div className="tw-absolute tw-bottom-[-10%] tw-right-[-10%] tw-w-[700px] tw-h-[700px] tw-bg-gradient-to-l tw-from-yellow-500/25 tw-via-orange-500/20 tw-to-transparent tw-rounded-full tw-blur-3xl tw-animate-pulse tw-delay-1000"></div>
        </div>

        {/* Rotating Logo */}
        <div
          className="tw-absolute tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-w-[900px] tw-h-[900px] tw-opacity-5 tw-hidden lg:tw-block"
          style={{
            backgroundImage: `url("${logo}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
            filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))",
          }}
        />

        <div className="tw-relative tw-z-10 tw-container tw-mx-auto tw-max-w-7xl">
          <div className="tw-grid lg:tw-grid-cols-2 tw-gap-16 tw-items-center">
            {/* Left Content */}
            <motion.div
              className="tw-space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="tw-space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="tw-inline-block tw-px-6 tw-py-2 tw-bg-gradient-to-r tw-from-purple-600/20 tw-to-pink-600/20 tw-border tw-border-purple-500/30 tw-rounded-full tw-mb-6">
                    <span className="tw-text-purple-300 tw-font-semibold tw-flex tw-items-center tw-gap-2">
                      <Sparkles className="tw-w-4 tw-h-4" />
                      Your Event Journey Starts Here
                    </span>
                  </div>
                </motion.div>

                <h1
                  className="tw-text-5xl lg:tw-text-7xl tw-font-black tw-leading-tight"
                  style={{ fontFamily: "Recoleta, serif" }}
                >
                  <span className="tw-text-white">Plan.</span>
                  <br />
                  <span className="tw-text-white">Celebrate.</span>
                  <br />
                  <span className="tw-bg-gradient-to-r tw-from-[#f59e0b] tw-via-[#ec4899] tw-to-[#a855f7] tw-bg-clip-text tw-text-transparent">
                    Remember.
                  </span>
                </h1>
              </div>

              <div className="tw-space-y-6">
                <p className="tw-text-2xl tw-text-gray-300 tw-leading-relaxed">
                  <span className="tw-font-bold tw-text-3xl tw-bg-gradient-to-r tw-from-purple-400 tw-to-pink-400 tw-bg-clip-text tw-text-transparent">
                    EvenueFy
                  </span>{" "}
                  is your premier destination for discovering and booking
                  unforgettable events.
                </p>

                <div className="tw-space-y-4">
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-gradient-to-r tw-from-purple-600 tw-to-pink-600 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                      <Ticket className="tw-w-6 tw-h-6" />
                    </div>
                    <p className="tw-text-lg tw-text-gray-400">
                      Organizers showcase their experiences
                    </p>
                  </div>
                  <div className="tw-flex tw-items-center tw-gap-4">
                    <div className="tw-w-12 tw-h-12 tw-rounded-full tw-bg-gradient-to-r tw-from-pink-600 tw-to-yellow-500 tw-flex tw-items-center tw-justify-center tw-flex-shrink-0">
                      <Users className="tw-w-6 tw-h-6" />
                    </div>
                    <p className="tw-text-lg tw-text-gray-400">
                      Attendees enjoy seamless exploration
                    </p>
                  </div>
                </div>

                <p className="tw-text-xl tw-text-gray-500 tw-italic tw-border-l-4 tw-border-purple-500 tw-pl-6 tw-py-2">
                  From grand celebrations to intimate gatherings, EvenueFy brings
                  every moment closer to perfection.
                </p>
              </div>

              <motion.button
                onClick={() => navigate("/Events")}
                className="tw-group tw-relative tw-px-10 tw-py-5 tw-bg-gradient-to-r tw-from-purple-600 tw-via-pink-600 tw-to-yellow-500 tw-rounded-full tw-text-white tw-font-bold tw-text-xl tw-transition-all tw-duration-500 hover:tw-shadow-[0_0_60px_rgba(168,85,247,0.8)] tw-overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="tw-relative tw-z-10 tw-flex tw-items-center tw-gap-3">
                  Explore Events
                  <ArrowRight className="tw-w-6 tw-h-6 tw-transition-transform tw-duration-300 group-hover:tw-translate-x-2" />
                </span>
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-purple-700 tw-via-pink-700 tw-to-yellow-600 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300"></div>
              </motion.button>
            </motion.div>

            {/* Right Video Section */}
            <motion.div
              className="tw-relative tw-group"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Decorative elements */}
              <div className="tw-absolute -tw-top-6 -tw-left-6 tw-w-24 tw-h-24 tw-border-4 tw-border-purple-500/30 tw-rounded-full"></div>
              <div className="tw-absolute -tw-bottom-6 -tw-right-6 tw-w-32 tw-h-32 tw-bg-gradient-to-br tw-from-pink-500 tw-to-yellow-500 tw-rounded-3xl tw-rotate-12 tw-blur-xl tw-opacity-60"></div>

              {/* Video Container */}
              <div className="tw-relative tw-w-full tw-h-[500px] lg:tw-h-[600px] tw-rounded-3xl tw-overflow-hidden tw-border-2 tw-border-purple-500/30 tw-shadow-[0_0_80px_rgba(168,85,247,0.3)] tw-transition-all tw-duration-700 group-hover:tw-scale-105 group-hover:tw-shadow-[0_0_100px_rgba(168,85,247,0.5)]">
                <video
                  className="tw-w-full tw-h-full tw-object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/Home_Video.mp4" type="video/mp4" />
                </video>

                {/* Gradient overlay */}
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-tr tw-from-purple-900/20 tw-via-transparent tw-to-pink-900/20"></div>

                {/* Live indicator */}
                <div className="tw-absolute tw-top-6 tw-right-6 tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-bg-black/60 tw-backdrop-blur-md tw-rounded-full tw-border tw-border-white/20">
                  <div className="tw-w-2 tw-h-2 tw-bg-red-500 tw-rounded-full tw-animate-pulse"></div>
                  <span className="tw-text-sm tw-font-semibold">LIVE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Planora Section */}
      <section
  ref={whyUsRef}
  className="tw-relative tw-py-32 tw-px-6 tw-bg-[#0a0a0a] tw-overflow-hidden"
>
  {/* Ambient Background Glows */}
  <div className="tw-absolute tw-top-0 tw-left-1/2 -tw-translate-x-1/2 tw-w-full tw-h-full tw-pointer-events-none">
    <div className="tw-absolute tw-top-[-10%] tw-left-[20%] tw-w-[500px] tw-h-[500px] tw-bg-purple-600/10 tw-blur-[120px] tw-rounded-full"></div>
    <div className="tw-absolute tw-bottom-[-10%] tw-right-[20%] tw-w-[500px] tw-h-[500px] tw-bg-blue-600/5 tw-blur-[120px] tw-rounded-full"></div>
  </div>

  <div className="tw-relative tw-z-10 tw-max-w-7xl tw-mx-auto">
    <motion.div
      className="tw-text-center tw-mb-24"
      initial={{ opacity: 0, y: 30 }}
      animate={whyUsInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="tw-text-6xl md:tw-text-8xl tw-font-black tw-mb-8 tw-tracking-tighter"
        style={{ fontFamily: "Recoleta, serif" }}
      >
        <span className="tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-gray-500 tw-bg-clip-text tw-text-transparent tw-drop-shadow-2xl">
          Why Choose EvenueFy?
        </span>
      </h2>
      <p className="tw-text-xl tw-text-gray-400 tw-max-w-2xl tw-mx-auto tw-font-medium tw-leading-relaxed">
        We’ve redefined the event experience. High-speed, high-security, and high-impact tools for every creator.
      </p>
    </motion.div>

    <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
      {[
        {
          icon: Zap,
          title: "Lightning Fast",
          description: "Book tickets in seconds with our optimized engine.",
          color: "tw-from-yellow-400 tw-to-orange-600",
          glow: "group-hover:tw-shadow-orange-500/40",
        },
        {
          icon: Shield,
          title: "Secure & Safe",
          description: "Encrypted transactions with bank-grade protocols.",
          color: "tw-from-emerald-400 tw-to-cyan-600",
          glow: "group-hover:tw-shadow-cyan-500/40",
        },
        {
          icon: Heart,
          title: "Made with Love",
          description: "A beautiful UI designed for modern event lovers.",
          color: "tw-from-pink-400 tw-to-rose-600",
          glow: "group-hover:tw-shadow-rose-500/40",
        },
        {
          icon: Globe,
          title: "Global Reach",
          description: "Connect with events and audiences worldwide.",
          color: "tw-from-blue-400 tw-to-indigo-600",
          glow: "group-hover:tw-shadow-indigo-500/40",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          className="tw-relative tw-p-10 tw-bg-white/[0.02] tw-backdrop-blur-2xl tw-rounded-[2.5rem] tw-border tw-border-white/5 tw-group tw-text-center tw-transition-all tw-duration-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={whyUsInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ 
            y: -10,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.2)"
          }}
        >
          {/* Decorative Corner Glow */}
          <div className={`tw-absolute tw-top-0 tw-right-0 tw-w-24 tw-h-24 tw-bg-gradient-to-br ${item.color} tw-opacity-0 group-hover:tw-opacity-10 tw-blur-2xl tw-transition-opacity tw-duration-500`}></div>

          {/* Icon Container */}
          <div
            className={`tw-w-20 tw-h-20 tw-mx-auto tw-mb-8 tw-rounded-3xl tw-bg-gradient-to-br ${item.color} tw-flex tw-items-center tw-justify-center tw-shadow-2xl tw-transition-all tw-duration-500 group-hover:tw-rotate-[10deg] ${item.glow}`}
          >
            <item.icon className="tw-w-10 tw-h-10 tw-text-white tw-filter tw-drop-shadow-lg" />
          </div>

          <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-mb-4 tw-tracking-tight">
            {item.title}
          </h3>
          <p className="tw-text-gray-500 tw-leading-relaxed tw-font-medium group-hover:tw-text-gray-300 tw-transition-colors">
            {item.description}
          </p>

          {/* Bottom Accent Line */}
          <div className={`tw-absolute tw-bottom-6 tw-left-1/2 -tw-translate-x-1/2 tw-w-8 tw-h-1 tw-rounded-full tw-bg-gradient-to-r ${item.color} tw-opacity-20 group-hover:tw-w-16 group-hover:tw-opacity-100 tw-transition-all tw-duration-500`}></div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Top Organizers Section - Creative Layout */}
      <section
  ref={organizersRef}
  className="tw-relative tw-py-36 tw-px-6 tw-bg-gradient-to-b tw-from-[#050505] tw-via-[#080808] tw-to-black tw-overflow-hidden"
>
  {/* Enhanced Ambient Background */}
  <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
    <div className="tw-absolute tw-top-[-15%] tw-left-[-15%] tw-w-[80%] tw-h-[80%] tw-bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,transparent_70%)] tw-blur-[120px] tw-animate-pulse"></div>
    <div className="tw-absolute tw-bottom-[-15%] tw-right-[-15%] tw-w-[80%] tw-h-[80%] tw-bg-[radial-gradient(circle,rgba(236,72,153,0.18)_0%,transparent_70%)] tw-blur-[120px] tw-animate-pulse tw-delay-700"></div>
    <div className="tw-absolute tw-inset-0 tw-bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] tw-opacity-[0.04]"></div>
  </div>

  {/* Rotating Logo */}
  <div
    className="tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-w-[1100px] tw-h-[1100px] tw-opacity-[0.08] tw-hidden xl:tw-block"
    style={{
      backgroundImage: `url("${logo}")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      filter: "drop-shadow(0 0 120px rgba(168,85,247,0.45))",
    }}
  />

  <div className="tw-relative tw-z-10 tw-max-w-7xl tw-mx-auto">
    {/* Header */}
    <motion.div
      className="tw-text-center tw-mb-28"
      initial={{ opacity: 0, y: 40 }}
      animate={organizersInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      <motion.div
        className="tw-inline-flex tw-items-center tw-gap-3 tw-px-10 tw-py-3 tw-rounded-full tw-bg-white/5 tw-border tw-border-white/10 tw-backdrop-blur-xl tw-shadow-[0_0_30px_rgba(168,85,247,0.25)]"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={organizersInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >
        <Award className="tw-w-5 tw-h-5 tw-text-yellow-400 tw-animate-bounce" />
        <span className="tw-text-purple-300 tw-text-sm tw-font-extrabold tw-tracking-[0.25em]">
          MEET OUR STARS
        </span>
      </motion.div>

      <h2
        className="tw-mt-10 tw-text-7xl md:tw-text-8xl tw-font-black tw-tracking-tight"
        style={{ fontFamily: "Recoleta, serif" }}
      >
        <span className="tw-bg-gradient-to-b tw-from-white tw-via-purple-300 tw-to-purple-600 tw-bg-clip-text tw-text-transparent tw-drop-shadow-[0_20px_40px_rgba(168,85,247,0.4)]">
          Top Organizers
        </span>
      </h2>

      <p className="tw-mt-8 tw-text-lg tw-text-gray-400 tw-max-w-2xl tw-mx-auto tw-leading-relaxed">
        Curating extraordinary experiences through creativity, precision, and passion.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="tw-space-y-20 lg:tw-space-y-0">
      {/* Center Card */}
      <motion.div
        className="tw-flex tw-justify-center tw-mb-20"
        initial={{ opacity: 0, y: 60 }}
        animate={organizersInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <div className="tw-relative tw-w-full tw-max-w-md tw-group tw-h-[560px]">
          <div className="tw-absolute tw--inset-6 tw-rounded-[2.8rem] tw-bg-gradient-to-r tw-from-purple-500/30 tw-to-pink-500/30 tw-blur-3xl tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-duration-700"></div>

          <TiltedCard
            imageSrc={Avtar.image2}
            altText="Mr Dev"
            captionText="Mr Dev"
            containerHeight="560px"
            containerWidth="100%"
            imageHeight="560px"
            imageWidth="100%"
            rotateAmplitude={18}
            scaleOnHover={1.12}
            showMobileWarning={false}
            showTooltip={true}
            displayOverlayContent={true}
            overlayContent={
              <div className="tw-text-center tw-p-7 tw-bg-black/70 tw-backdrop-blur-xl tw-rounded-2xl tw-border tw-border-white/15 tw-shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <p className="tw-text-4xl tw-font-extrabold tw-text-white">Mr Dev</p>
                <p className="tw-mt-1 tw-text-purple-400 tw-text-sm tw-tracking-widest tw-font-black">
                  Creative Director
                </p>
                <div className="tw-flex tw-justify-center tw-gap-2 tw-mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="tw-w-5 tw-h-5 tw-text-yellow-400 tw-fill-yellow-400 tw-drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  ))}
                </div>
              </div>
            }
          />
        </div>
      </motion.div>

      {/* Bottom Cards */}
      <div className="tw-grid lg:tw-grid-cols-2 tw-gap-20 tw-max-w-6xl tw-mx-auto">
        {/* Miss Grancy */}
        <motion.div
          className="tw-flex tw-justify-center lg:tw-justify-end"
          initial={{ opacity: 0, x: -60 }}
          animate={organizersInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="tw-w-full tw-max-w-sm tw-group tw-h-[520px]">
            <TiltedCard
              imageSrc={Avtar.image1}
              altText="Miss Grancy"
              captionText="Miss Grancy"
              containerHeight="520px"
              containerWidth="100%"
              imageHeight="520px"
              imageWidth="100%"
              rotateAmplitude={14}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tw-text-center tw-p-6 tw-bg-black/70 tw-backdrop-blur-xl tw-rounded-xl tw-border tw-border-white/15">
                  <p className="tw-text-3xl tw-font-bold tw-text-white">Miss Grancy</p>
                  <p className="tw-text-pink-400 tw-text-xs tw-tracking-widest tw-font-black tw-mt-1">
                    Event Specialist
                  </p>
                  <div className="tw-flex tw-justify-center tw-gap-1.5 tw-mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="tw-w-4 tw-h-4 tw-text-yellow-400 tw-fill-yellow-400" />
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </motion.div>

        {/* Mr Himanshu */}
        <motion.div
          className="tw-flex tw-justify-center lg:tw-justify-start lg:tw--mt-16"
          initial={{ opacity: 0, x: 60 }}
          animate={organizersInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="tw-w-full tw-max-w-sm tw-group tw-h-[520px]">
            <TiltedCard
              imageSrc={Avtar.image3}
              altText="Mr Himanshu"
              captionText="Mr Himanshu"
              containerHeight="520px"
              containerWidth="100%"
              imageHeight="520px"
              imageWidth="100%"
              rotateAmplitude={14}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tw-text-center tw-p-6 tw-bg-black/70 tw-backdrop-blur-xl tw-rounded-xl tw-border tw-border-white/15">
                  <p className="tw-text-3xl tw-font-bold tw-text-white">Mr Himanshu</p>
                  <p className="tw-text-yellow-400 tw-text-xs tw-tracking-widest tw-font-black tw-mt-1">
                    Experience Curator
                  </p>
                  <div className="tw-flex tw-justify-center tw-gap-1.5 tw-mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="tw-w-4 tw-h-4 tw-text-yellow-400 tw-fill-yellow-400" />
                    ))}
                  </div>
                </div>
              }
            />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>


      {/* Taglines Component */}
      <PlanoraTaglines />
    </div>
  );
};

export default Home;
