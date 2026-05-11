import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useSwipeable } from "react-swipeable";
import * as images from "./Event_Images";
import axios from "axios";
import { toast } from "react-toastify";

const Home_Slider = () => {
  const navigate = useNavigate();
  const isReqSend = useRef(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slides, setSlides] = useState([]);

  const getEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/event/fetchByStatus/upcoming",
        {
          withCredentials: true, // 🔑 allow cookies
        }
      );
      const events = res.data.event;
      const shuffled = [...events].sort(() => 0.5 - Math.random());
      setSlides(shuffled.slice(0, Math.min(5, events.length)));
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      getEvents();
      isReqSend.current = true;
    }
  }, []);
  const getFirstTwoLines = (text, charLimit = 100) => {
    const trimmed = text.slice(0, charLimit);
    const lastSpace = trimmed.lastIndexOf(" ");
    return trimmed.slice(0, lastSpace) + (text.length > charLimit ? "..." : "");
  };
  // Sample slide data - replace with your content
  // const slides = [
  //   {
  //     id: 1,
  //     title: "Revolutionary Design",
  //     subtitle: "Experience the Future",
  //     description:
  //       "Cutting-edge technology meets stunning aesthetics in our latest innovation.",
  //     image: images.image1,
  //     color: "tw-text-white",
  //   },
  //   {
  //     id: 2,
  //     title: "Seamless Performance",
  //     subtitle: "Power Redefined",
  //     description:
  //       "Unleash unlimited potential with our advanced performance solutions.",
  //     image: images.image2,
  //     color: "tw-text-white",
  //   },
  //   {
  //     id: 3,
  //     title: "Smart Innovation",
  //     subtitle: "Intelligence Amplified",
  //     description:
  //       "AI-powered solutions that adapt and evolve with your needs.",
  //     image: images.image3,
  //     color: "tw-text-white",
  //   },
  //   {
  //     id: 4,
  //     title: "Global Connectivity",
  //     subtitle: "Connect Everywhere",
  //     description:
  //       "Bridge distances and connect with possibilities across the globe.",
  //     image: images.image4,
  //     color: "tw-text-white",
  //   },
  //   {
  //     id: 5,
  //     title: "Sustainable Future",
  //     subtitle: "Green Tomorrow",
  //     description:
  //       "Building a sustainable future with eco-friendly innovations.",
  //     image: images.image5,
  //     color: "tw-text-white",
  //   },
  // ];

  const totalSlides = slides.length;

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, totalSlides]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const Event_Handler = useSwipeable({
    onSwipedLeft: () => {
      goToNextSlide();
      setIsAutoPlay(false);
      setTimeout(() => setIsAutoPlay(true), 1000);
    },
    onSwipedRight: () => {
      goToPrevSlide();
      setIsAutoPlay(false);
      setTimeout(() => setIsAutoPlay(true), 1000);
    },
    trackMouse: true,
    trackTouch: true,
  });

  const currentSlideData = slides[currentSlide];

  return (
    <>
      {slides.length > 0 && (
        <div
          className="tw-relative tw-w-full tw-h-screen tw-overflow-hidden tw-bg-black"
          style={{ fontFamily: "DM Sans Normal" }}
          {...Event_Handler}
        >
          {/* Background Slides */}
          <div className="tw-relative tw-w-full tw-h-full">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`tw-absolute tw-inset-0 tw-transition-all tw-duration-1000 tw-ease-in-out ${
                  index === currentSlide
                    ? "tw-opacity-100 tw-scale-100"
                    : "tw-opacity-0 tw-scale-105"
                }`}
              >
                {/* Background Image */}

                <div
                  className="tw-absolute tw-inset-0 tw-bg-cover tw-bg-center tw-bg-no-repeat tw-pointer-events-none"
                  style={{
                    backgroundImage: `url(http://localhost:4000/${slide.previous_event_photos[0].replace(
                      /\\/g,
                      "/"
                    )})`,
                  }}
                />
                {/* Dark Overlay */}
                <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-40 tw-pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Content Container */}
          <div
            className="tw-relative tw-z-10 tw-h-full tw-flex tw-items-center"
            style={{
              position: "absolute",
              top: "50%",
              left: "7%",
              transform: "translateY(-50%)",
            }}
          >
            <div className="tw-container tw-mx-auto tw-px-6 lg:tw-px-12">
              <div className="tw-max-w-4xl">
                {/* Main Content */}
                <div
                  className={`tw-transition-all tw-duration-1000 tw-delay-300 ${
                    currentSlide !== null
                      ? "tw-opacity-100 tw-translate-y-0"
                      : "tw-opacity-0 tw-translate-y-8"
                  }`}
                >
                  <div className="tw-mb-6 tw-overflow-hidden">
                    <h1
                      className={`tw-text-4xl md:tw-text-6xl lg:tw-text-7xl tw-font-bold tw-text-white tw-leading-tight animate-slide-up animation-delay-200`}
                    >
                      {currentSlideData.title}
                    </h1>
                  </div>

                  <div className="tw-mb-8 tw-overflow-hidden tw-max-w-2xl">
                    <p
                      className={`tw-text-lg md:tw-text-xl tw-text-white tw-opacity-80 tw-leading-relaxed animate-slide-up animation-delay-400`}
                    >
                      {getFirstTwoLines(currentSlideData.description)}
                    </p>
                  </div>

                  <div className="tw-flex tw-flex-wrap tw-gap-4 tw-overflow-hidden">
                    <button
                      className="tw-border-2 tw-border-white tw-text-gray-900 tw-px-8 tw-py-4 tw-rounded-full tw-font-semibold tw-text-lg 
                              tw-transition-all tw-duration-500 tw-ease-in-out tw-transform 
                              hover:tw-scale-105 hover:tw--translate-y-2 hover:tw-shadow-lg 
                              animate-fadeIn"
                      style={{
                        marginTop: "10px",
                        marginLeft: "10px",
                      }}
                      onClick={() => {
                        navigate(`/EventDetailsPage/${currentSlideData._id}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevSlide}
            className="tw-absolute tw-left-4 md:tw-left-8 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-20 tw-w-14 tw-h-14 tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-md tw-border tw-border-white tw-border-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-opacity-30 hover:tw-scale-110 tw-transition-all tw-duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft
              size={24}
              className="tw-transition-transform group-hover:-tw-translate-x-0.5"
            />
          </button>

          <button
            onClick={goToNextSlide}
            className="tw-absolute tw-right-4 md:tw-right-8 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-z-20 tw-w-14 tw-h-14 tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-md tw-border tw-border-white tw-border-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-opacity-30 hover:tw-scale-110 tw-transition-all tw-duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight
              size={24}
              className="tw-transition-transform group-hover:tw-translate-x-0.5"
            />
          </button>

          {/* Slide Indicators */}
          <div className="tw-absolute tw-bottom-8 tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-z-20">
            <div className="tw-flex tw-items-center tw-space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`tw-transition-all tw-duration-500 tw-rounded-full ${
                    index === currentSlide
                      ? "tw-w-12 tw-h-3 tw-bg-white tw-shadow-lg"
                      : "tw-w-3 tw-h-3 tw-bg-white tw-bg-opacity-50 hover:tw-bg-opacity-75 hover:tw-scale-125"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Auto-play Control */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="tw-absolute tw-z-20 tw-w-12 tw-h-12 tw-bg-white tw-bg-opacity-20 tw-backdrop-blur-md tw-border tw-border-white tw-border-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-text-white hover:tw-bg-opacity-30 hover:tw-scale-110 tw-transition-all tw-duration-300"
            style={{ top: "115px", right: "36px" }}
            aria-label={isAutoPlay ? "Pause autoplay" : "Play autoplay"}
          >
            {isAutoPlay ? <Pause size={20} /> : <Play size={20} />}
          </button>

          {/* Progress Bar */}
          <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-white tw-bg-opacity-20 tw-z-20">
            <div
              className="tw-h-full tw-bg-white tw-transition-all tw-duration-300 tw-ease-out"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>

          {/* Custom Styles */}
          <style jsx>{`
            @keyframes slide-up {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-up {
              animation: slide-up 0.8s ease-out forwards;
            }
            .animation-delay-200 {
              animation-delay: 0.2s;
            }
            .animation-delay-400 {
              animation-delay: 0.4s;
            }
            .animation-delay-600 {
              animation-delay: 0.6s;
            }
            .animation-delay-700 {
              animation-delay: 0.7s;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Home_Slider;
