import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Compass, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  // Memoize particle configuration for better performance
  const particles = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        size: Math.random() * 3 + 1.5,
        duration: Math.random() * 10 + 25,
        delay: Math.random() * 15,
        isPurple: i % 2 === 0,
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 30 - 15,
        yOffset: -80 - Math.random() * 40,
      })),
    []
  );

  const stars = useMemo(
    () =>
      [...Array(25)].map((_, i) => ({
        isPurple: i % 2 === 0,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="tw-h-screen tw-bg-[#080808] tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden tw-selection:tw-bg-purple-500/30">
      
      {/* Premium Grain Texture Overlay */}
      <div className="tw-absolute tw-inset-0 tw-opacity-[0.03] tw-pointer-events-none tw-bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Animated deep ambient orbs background */}
      <motion.div
        className="tw-absolute tw-top-0 tw-left-1/4 tw-w-[800px] tw-h-[800px] tw-bg-purple-600/10 tw-rounded-full tw-blur-[140px]"
        style={{ willChange: "transform" }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="tw-absolute tw-bottom-0 tw-right-1/4 tw-w-[800px] tw-h-[800px] tw-bg-pink-600/10 tw-rounded-full tw-blur-[140px]"
        style={{ willChange: "transform" }}
        animate={{
          scale: [1.4, 1, 1.4],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
      />

      {/* Glowing particles */}
      <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="tw-absolute tw-rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              background: particle.isPurple
                ? "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, transparent 70%)",
              boxShadow: particle.isPurple
                ? "0 0 20px rgba(168, 85, 247, 0.4)"
                : "0 0 20px rgba(236, 72, 153, 0.4)",
              filter: "blur(0.5px)",
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, particle.yOffset, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="tw-absolute tw-inset-0 tw-pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={`star-${i}`}
            className="tw-absolute tw-w-[2px] tw-h-[2px] tw-rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              background: star.isPurple ? "#a855f7" : "#ec4899",
              boxShadow: star.isPurple
                ? "0 0 12px rgba(168, 85, 247, 1)"
                : "0 0 12px rgba(236, 72, 153, 1)",
              willChange: "opacity, transform",
            }}
            animate={{
              opacity: [0.1, 1, 0.1],
              scale: [0.5, 2, 0.5],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div className="tw-relative tw-z-10 tw-w-full tw-max-w-5xl tw-px-6 tw-flex tw-flex-col tw-items-center">
        {/* 404 Icon with modern Glassmorphism effect */}
        <motion.div
          className="tw-flex tw-justify-center tw-mb-10"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="tw-relative">
            {/* Outer glow aura */}
            <motion.div
              className="tw-absolute tw-inset-0 tw-rounded-full tw-blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 75%)",
                transform: "scale(1.8)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.8, 2.1, 1.8],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Icon Glass Container */}
            <motion.div
              className="tw-relative tw-flex tw-items-center tw-justify-center tw-p-10 tw-rounded-full tw-bg-white/[0.03] tw-backdrop-blur-xl tw-border tw-border-white/10 tw-shadow-2xl"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            >
              <motion.div
                animate={{
                  filter: [
                    "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))",
                    "drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))",
                    "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Compass
                  className="tw-w-32 tw-h-32 tw-text-white tw-opacity-90"
                  strokeWidth={1}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Massive Impact Typography */}
        <div className="tw-text-center tw-mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="tw-mb-6"
          >
            <motion.h1
              className="tw-text-[10rem] md:tw-text-[14rem] tw-font-black tw-mb-0 tw-leading-[0.8] tw-tracking-tighter"
              style={{ fontFamily: "Recoleta, serif" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
            >
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-b tw-from-white tw-via-purple-200 tw-to-purple-500 tw-drop-shadow-2xl">
                404
              </span>
            </motion.h1>

            <motion.h2
              className="tw-text-4xl md:tw-text-6xl tw-font-black tw-mt-4 tw-tracking-tight"
              style={{ fontFamily: "Recoleta, serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-white tw-to-gray-500">
                Page Not Found
              </span>
            </motion.h2>
          </motion.div>

          <motion.p
            className="tw-text-xl md:tw-text-2xl tw-font-medium tw-mb-10 tw-tracking-wide tw-max-w-2xl tw-mx-auto tw-leading-relaxed"
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(255, 255, 255, 0.45)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Looks like this page is no longer available. <br className="tw-hidden md:tw-block"/> 
            Let’s get you back to exploring something exciting.
          </motion.p>

          <motion.div
            className="tw-flex tw-justify-center tw-items-center tw-gap-6 tw-mb-12"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <div className="tw-w-24 tw-h-[1px] tw-bg-gradient-to-r tw-from-transparent tw-to-purple-500/50" />
            <motion.div
              className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-purple-500"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform, opacity" }}
            />
            <div className="tw-w-24 tw-h-[1px] tw-bg-gradient-to-l tw-from-transparent tw-to-pink-500/50" />
          </motion.div>

          {/* Luxury Action buttons */}
          <motion.div
            className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-center tw-items-center tw-gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {/* Primary CTA - Home */}
            <motion.button
              className="tw-group tw-relative tw-px-12 tw-py-6 tw-rounded-[2rem] tw-overflow-hidden tw-font-black tw-text-xl tw-text-black tw-bg-white tw-shadow-[0_20px_50px_rgba(255,255,255,0.1)] tw-transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
            >
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-purple-100 tw-via-white tw-to-orange-50 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity"></div>
              <span className="tw-relative tw-flex tw-items-center tw-gap-4 tw-uppercase tw-tracking-widest">
                <Home className="tw-w-6 tw-h-6 tw-fill-current" />
                Go To Home
              </span>
            </motion.button>

            {/* Secondary CTA - Back */}
            <motion.button
              className="tw-group tw-relative tw-px-12 tw-py-6 tw-rounded-[2rem] tw-overflow-hidden tw-font-black tw-text-xl tw-text-white tw-bg-white/[0.03] tw-backdrop-blur-2xl tw-border tw-border-white/10 tw-transition-all"
              whileHover={{
                scale: 1.05,
                y: -5,
                borderColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.07)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
            >
              <span className="tw-relative tw-flex tw-items-center tw-gap-4 tw-uppercase tw-tracking-widest">
                <ArrowLeft className="tw-w-6 tw-h-6 group-hover:tw--translate-x-2 tw-transition-transform" />
                Go Back
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Modern Corner Accents - Glowing Glass Style */}
      <motion.div
        className="tw-absolute tw-top-12 tw-left-12 tw-w-40 tw-h-40 tw-border-l tw-border-t tw-border-white/10 tw-rounded-tl-[4rem] tw-shadow-[-20px_-20px_50px_rgba(168,85,247,0.05)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      <motion.div
        className="tw-absolute tw-bottom-12 tw-right-12 tw-w-40 tw-h-40 tw-border-r tw-border-b tw-border-white/10 tw-rounded-br-[4rem] tw-shadow-[20px_20px_50px_rgba(236,72,153,0.05)]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      {/* Decorative floating error codes */}
      <motion.div
        className="tw-absolute tw-top-1/4 tw-left-1/4 tw-text-purple-500/[0.03] tw-text-9xl tw-font-black tw-pointer-events-none tw-select-none"
        style={{ fontFamily: "Recoleta, serif" }}
        animate={{
          y: [0, -40, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        404
      </motion.div>
      <motion.div
        className="tw-absolute tw-bottom-1/3 tw-right-1/4 tw-text-pink-500/[0.03] tw-text-[12rem] tw-font-black tw-pointer-events-none tw-select-none"
        style={{ fontFamily: "Recoleta, serif" }}
        animate={{
          y: [0, 40, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        404
      </motion.div>
    </div>
  );
}