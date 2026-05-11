import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import logo from "../assets/evenuefywhitelogowithoutbackgroound.png";

export default function MaintenancePage() {
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
    <div className="tw-h-screen tw-bg-[#050505] tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden tw-selection:tw-bg-purple-500/30">
      {/* Premium Texture Overlay */}
      <div className="tw-absolute tw-inset-0 tw-opacity-[0.03] tw-pointer-events-none tw-bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* Animated gradient orbs background - Enhanced Blur and Depth */}
      <motion.div
        className="tw-absolute tw-top-0 tw-left-1/4 tw-w-[800px] tw-h-[800px] tw-bg-purple-600 tw-rounded-full tw-opacity-10 tw-blur-[140px]"
        style={{ willChange: "transform" }}
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="tw-absolute tw-bottom-0 tw-right-1/4 tw-w-[800px] tw-h-[800px] tw-bg-pink-600 tw-rounded-full tw-opacity-10 tw-blur-[140px]"
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
                ? "radial-gradient(circle, rgba(168, 85, 247, 0.8) 0%, rgba(168, 85, 247, 0.2) 40%, transparent 70%)"
                : "radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0.2) 40%, transparent 70%)",
              boxShadow: particle.isPurple
                ? "0 0 20px rgba(168, 85, 247, 0.5)"
                : "0 0 20px rgba(236, 72, 153, 0.5)",
              filter: "blur(0.5px)",
              willChange: "transform, opacity",
            }}
            animate={{
              y: [0, particle.yOffset, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
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
        {/* Logo with elegant glow effect */}
        <motion.div
          className="tw-flex tw-justify-center tw-mb-10"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
        >
          <div className="tw-relative">
            {/* Outer glow ring - Enhanced Glassmorphism */}
            <motion.div
              className="tw-absolute tw-inset-0 tw-rounded-full tw-blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 75%)",
                transform: "scale(1.8)",
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1.8, 2.2, 1.8],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo container - Clean floating effect */}
            <motion.div
              className="tw-relative tw-flex tw-items-center tw-justify-center tw-p-10 tw-rounded-full tw-bg-white/[0.02] tw-backdrop-blur-sm tw-border tw-border-white/5"
              whileHover={{ scale: 1.05 }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              style={{ willChange: "transform" }}
            >
              {/* Logo with cinematic drop shadow */}
              <motion.div
                className="tw-relative"
                animate={{
                  filter: [
                    "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))",
                    "drop-shadow(0 0 30px rgba(236, 72, 153, 0.6))",
                    "drop-shadow(0 0 15px rgba(168, 85, 247, 0.6))",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={logo}
                  alt="Planora Logo"
                  className="tw-h-36 tw-relative tw-z-10 tw-object-contain"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </motion.div>

              {/* Sparkles decoration - Modern look */}
              <motion.div
                className="tw-absolute tw-top-4 tw-right-4"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles
                  className="tw-w-6 tw-h-6 tw-text-purple-400"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Typography - Massive and Premium */}
        <div className="tw-text-center tw-mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="tw-mb-8"
          >
            <h1
              className="tw-text-6xl md:tw-text-9xl tw-font-black tw-tracking-tighter tw-mb-4 tw-leading-none"
              style={{ fontFamily: "Recoleta, serif" }}
            >
              {["Scheduled", "Maintenance"].map((word, i) => (
                <motion.span
                  key={word}
                  className="tw-inline-block tw-mx-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.4 + i * 0.1 },
                    y: {
                      duration: 4,
                      delay: 0.5 + i * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <span className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-b tw-from-white tw-via-white tw-to-gray-600">
                    {word}
                  </span>
                </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            className="tw-text-xl md:tw-text-2xl tw-font-medium tw-mb-10 tw-tracking-wide"
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(255, 255, 255, 0.45)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Our team is architecting a better experience for you.
          </motion.p>

          <motion.div
            className="tw-flex tw-justify-center tw-items-center tw-gap-6 tw-mb-12"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="tw-w-24 tw-h-[1px] tw-bg-gradient-to-r tw-from-transparent tw-to-purple-500/50" />
            <motion.div
              className="tw-px-4 tw-py-1 tw-rounded-full tw-border tw-border-purple-500/20 tw-bg-purple-500/5 tw-flex tw-items-center tw-gap-2"
            >
              <motion.div
                className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-purple-500"
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="tw-text-[10px] tw-uppercase tw-tracking-[0.3em] tw-font-black tw-text-purple-400">Processing Updates</span>
            </motion.div>
            <div className="tw-w-24 tw-h-[1px] tw-bg-gradient-to-l tw-from-transparent tw-to-pink-500/50" />
          </motion.div>

          <motion.p
            className="tw-text-sm tw-tracking-[0.5em] tw-uppercase tw-font-black"
            style={{
              fontFamily: "DM Sans, sans-serif",
              color: "rgba(255, 255, 255, 0.7)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Returning <span className="tw-text-purple-400">Shortly</span>
          </motion.p>
        </div>

        {/* Animated loader - Modern Minimalist Style */}
        <motion.div
          className="tw-flex tw-justify-center tw-items-center tw-gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="tw-relative"
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <div
                className="tw-w-1.5 tw-h-1.5 tw-rounded-full"
                style={{
                  background: i === 0 ? "#a855f7" : i === 1 ? "#ec4899" : "#f97316",
                  boxShadow: `0 0 15px ${
                    i === 0
                      ? "rgba(168, 85, 247, 0.8)"
                      : i === 1
                      ? "rgba(236, 72, 153, 0.8)"
                      : "rgba(249, 115, 22, 0.8)"
                  }`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
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
    </div>
  );
}