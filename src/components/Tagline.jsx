import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Users, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

const PlanoraTaglines = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(0);

  const taglines = [
    {
      id: 1,
      icon: <Sparkles className="tw-w-6 tw-h-6" />,
      title: "Experience Focused",
      headline: "Plan Moments That Last Forever.",
      description:
        "At EvenueFy, we believe every celebration should be unforgettable. Whether it's a music concert, wedding, or private party, we help you discover the best events and bring them closer to you. Explore, compare, and book effortlessly—because memories deserve perfection.",
      color: "tw-from-purple-500 tw-to-pink-500",
      glow: "tw-shadow-purple-500/20",
      border: "tw-border-purple-500/30",
    },
    {
      id: 2,
      icon: <Heart className="tw-w-6 tw-h-6" />,
      title: "Simplicity & Trust",
      headline: "Events Made Effortless.",
      description:
        "Forget the stress of endless searches and unverified organizers. EvenueFy gives you a trusted space where you can plan smarter, celebrate better, and enjoy without worries. From grand festivals to intimate gatherings, we've got everything covered in one place.",
      color: "tw-from-blue-500 tw-to-cyan-500",
      glow: "tw-shadow-blue-500/20",
      border: "tw-border-blue-500/30",
    },
    {
      id: 3,
      icon: <Users className="tw-w-6 tw-h-6" />,
      title: "Community & Belonging",
      headline: "Celebrate Together, Everywhere.",
      description:
        "Events aren't just about dates and venues—they're about people, connections, and experiences. EvenueFy brings communities together, making it easy for attendees to discover exciting moments and for organizers to showcase their passion to the world.",
      color: "tw-from-green-500 tw-to-teal-500",
      glow: "tw-shadow-green-500/20",
      border: "tw-border-green-500/30",
    },
    {
      id: 4,
      icon: <Zap className="tw-w-6 tw-h-6" />,
      title: "Innovation & Future-Ready",
      headline: "Reinventing the Way You Celebrate.",
      description:
        "EvenueFy is more than an event platform—it's your gateway to unforgettable experiences. With seamless booking, real-time updates, and a wide range of events, we're redefining how the world plans, celebrates, and remembers.",
      color: "tw-from-orange-500 tw-to-red-500",
      glow: "tw-shadow-orange-500/20",
      border: "tw-border-orange-500/30",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  return (
    <section
      className="tw-relative tw-px-4 tw-pt-[7%] tw-pb-[5%] sm:tw-px-6 md:tw-pt-[15%] lg:tw-pt-[20%] tw-overflow-hidden"
      style={{ backgroundColor: "rgb(15, 15, 15)" }}
    >
      {/* Background Ambient Glow */}
      <div className={`tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-w-[600px] tw-h-[600px] tw-rounded-full tw-blur-[120px] tw-opacity-20 tw-transition-all tw-duration-1000 tw-bg-gradient-to-r ${taglines[selectedOption].color}`}></div>

      <div data-aos="fade-up" className="tw-max-w-7xl tw-mx-auto tw-relative tw-z-10">
        {/* Header */}
        <div className="tw-text-center tw-mb-16">
          <h2
            className="tw-text-4xl md:tw-text-6xl tw-font-bold tw-text-white tw-mb-6 tw-tracking-tight"
            style={{ fontFamily: "DM Sans ExtraBold" }}
          >
            Choose Your <span className={`tw-bg-gradient-to-r tw-bg-clip-text tw-text-transparent ${taglines[selectedOption].color}`}>Story</span>
          </h2>
          <p
            className="tw-text-gray-400 tw-text-lg md:tw-text-xl tw-max-w-2xl tw-mx-auto tw-leading-relaxed"
            style={{ fontFamily: "DM Sans Bold" }}
          >
            Discover what makes EvenueFy the perfect platform for your events
          </p>
        </div>

        {/* Option Selector Tabs */}
        <div
          data-aos="fade-up"
          className="tw-flex tw-flex-wrap tw-justify-center tw-gap-3 tw-mb-12"
          style={{ fontFamily: "DM Sans SemiBold" }}
        >
          {taglines.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(index)}
              className={`tw-group tw-px-6 tw-py-3 tw-rounded-2xl tw-text-sm tw-font-bold tw-transition-all tw-duration-500 tw-flex tw-items-center tw-gap-3 tw-border ${
                selectedOption === index
                  ? "tw-bg-white tw-text-black tw-border-white tw-shadow-[0_0_30px_rgba(255,255,255,0.2)] tw-scale-105"
                  : "tw-bg-white/[0.03] tw-text-gray-400 tw-border-white/[0.05] hover:tw-bg-white/[0.08] hover:tw-text-white"
              }`}
            >
              <div className={`${selectedOption === index ? "tw-text-black" : "tw-text-gray-500 group-hover:tw-text-white"}`}>
                {option.icon}
              </div>
              <span className="sm:tw-inline tw-hidden tw-uppercase tw-tracking-widest">{option.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Tagline Display with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOption}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className={`tw-relative tw-bg-gradient-to-b tw-from-white/[0.07] tw-to-transparent tw-backdrop-blur-2xl tw-rounded-[2.5rem] tw-p-8 md:tw-p-16 tw-shadow-2xl tw-border-t tw-border-l tw-border-white/10 ${taglines[selectedOption].border}`}
          >
            <div className="tw-text-center tw-relative tw-z-10">
              {/* Icon with animated pulse glow */}
              <div className="tw-relative tw-inline-block tw-mb-8">
                <div className={`tw-absolute tw-inset-0 tw-blur-2xl tw-opacity-50 tw-animate-pulse tw-bg-gradient-to-r ${taglines[selectedOption].color}`}></div>
                <div
                  className={`tw-relative tw-inline-flex tw-items-center tw-justify-center tw-w-20 tw-h-20 tw-rounded-3xl tw-bg-gradient-to-br ${taglines[selectedOption].color} tw-shadow-2xl tw-rotate-3`}
                >
                  <div className="tw-text-white tw-scale-125 -tw-rotate-3">
                    {taglines[selectedOption].icon}
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h3
                className="tw-text-3xl md:tw-text-5xl tw-font-bold tw-text-white tw-mb-8 tw-leading-tight"
                style={{ fontFamily: "DM Sans ExtraBold" }}
              >
                {taglines[selectedOption].headline}
              </h3>

              {/* Description */}
              <p
                className="tw-text-gray-300/90 tw-text-lg md:tw-text-xl tw-leading-relaxed tw-max-w-4xl tw-mx-auto tw-font-light"
                style={{ fontFamily: "DM Sans Normal" }}
              >
                {taglines[selectedOption].description}
              </p>

              {/* CTA Button */}
              <div className="tw-mt-12">
                <button
                  style={{ fontFamily: "DM Sans Bold" }}
                  className={`tw-group tw-relative tw-px-10 tw-py-4 tw-rounded-2xl tw-font-bold tw-text-white tw-overflow-hidden tw-transition-all tw-duration-500 hover:tw-scale-110 active:tw-scale-95`}
                  onClick={() => navigate("/Register_Organizer")}
                >
                    <div className={`tw-absolute tw-inset-0 tw-bg-gradient-to-r ${taglines[selectedOption].color}`}></div>
                    <div className="tw-absolute tw-inset-0 tw-bg-white tw-opacity-0 group-hover:tw-opacity-20 tw-transition-opacity"></div>
                    <span className="tw-relative tw-flex tw-items-center tw-gap-2 tw-uppercase tw-tracking-widest">
                        Start Planning <Zap className="tw-w-4 tw-h-4" />
                    </span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Indicator Dots */}
        <div className="tw-flex tw-justify-center tw-mt-12 tw-gap-4">
          {taglines.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`tw-h-1.5 tw-rounded-full tw-transition-all tw-duration-700 ${
                selectedOption === index
                  ? "tw-w-12 tw-bg-gradient-to-r " + taglines[index].color
                  : "tw-w-3 tw-bg-white/10 hover:tw-bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlanoraTaglines;