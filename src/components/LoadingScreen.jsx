import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = ({ msg = "" }) => {
  const [count, setCount] = useState(1);
  const screenVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    if (!msg) return;
    const id = setInterval(
      () => setCount((c) => (c >= 5 ? 1 : c + 1)),
      500
    );
    return () => clearInterval(id);
  }, [msg]);

  const dotsArray = Array.from({ length: count });

  // line animation helper
  const lineVariants = (delay = 0, distance = 26, duration = 0.8) => ({
    animate: {
      x: [-distance, distance],
      transition: {
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
        delay,
      },
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        variants={screenVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="tw-fixed tw-inset-0 tw-bg-gradient-to-br tw-from-indigo-50 tw-via-white tw-to-purple-50 tw-flex tw-flex-col tw-items-center tw-justify-center tw-overflow-hidden tw-z-50"
      >
        {/* Lines */}
        <div className="tw-relative tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6">
          {/* Line 1 – medium, balanced */}
          <motion.div
            variants={lineVariants(0, 26, 0.9)}
            animate="animate"
            className="tw-h-4 tw-w-24 tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600 tw-rounded-full tw-shadow-lg"
          />
          {/* Line 2 – slower, longer */}
          <motion.div
            variants={lineVariants(0.25, 30, 1.1)}
            animate="animate"
            className="tw-h-4 tw-w-20 tw-bg-gradient-to-r tw-from-purple-500 tw-to-pink-600 tw-rounded-full tw-shadow-lg"
          />
          {/* Line 3 – faster, shorter */}
          <motion.div
            variants={lineVariants(0.5, 22, 0.7)}
            animate="animate"
            className="tw-h-4 tw-w-28 tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-600 tw-rounded-full tw-shadow-lg"
          />
        </div>
        <motion.h2
          className="tw-h-4 tw-text-center tw-text-gray-800 tw-mt-3 tw-font-semibold"
          style={{ fontFamily: "DM Sans ExtraBold" }}
        >
          {msg + " "}
          {msg && <span aria-hidden={false}>
            {dotsArray.map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 0.25, delay: i * 0.1 }}
                style={{ display: "inline-block" }}
              >
                {".\u00A0"}
              </motion.span>
            ))}
          </span>}
        </motion.h2>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;