import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Tag,
  Building2,
  Clock,
  Ticket,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Sparkles,
  IndianRupee,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PaymentPopup from "../components/PaymentPopup";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";

const DetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [eventsData, setEventsData] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [ticketCount, setTicketCount] = useState(1);
  const [isPaymentPanelOpen, setIsPaymentPanelOpen] = useState(false);
  const isReqSend = useRef(false);

  const [scrollY, setScrollY] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  const getEventData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/event/fetchOne/${id}`,
        {
          withCredentials: true,
        }
      );
      setEventsData(res.data.event[0]);
      setGalleryImages(res.data.event[0].previous_event_photos.slice(1));
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/booking/add/${id}`,
        {
          quantity: ticketCount,
          total_amount: ticketCount * (eventsData?.price || 0),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTicketCount(1);
      return res?.data?.booking_id || "";
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
      return "";
    }
  };

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message === "New User") {
        navigate("/Signup", { state: { path: `/EventDetailsPage/${id}` } });
        toast.error("You Needed to Login First", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        return false;
      } else if (res.data.message === "User is already logged In") {
        return true;
      } else {
        navigate("/login", { state: { path: `/EventDetailsPage/${id}` } });
        return false;
      }
    } catch (error) {
      if (
        error.response.data?.message ===
        "Login Session Expired. You need to log in again."
      ) {
        navigate("/login", { state: { path: `/EventDetailsPage/${id}` } });
        return false;
      }
      console.log(error.response.data?.error || error.message);
    }
  };

  const handlePaymentButtonClick = async () => {
    const isUserLoggedIn = await checkUserLogIn();
    if (isUserLoggedIn) {
      window.scrollTo(0, 100);
      setIsPaymentPanelOpen(true);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1500, once: false });
    window.scrollTo(0, 0);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    if (!isReqSend.current) {
      getEventData();
      isReqSend.current = true;
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isBookingAvailable = () => {
    const now = new Date();
    const bookingStart = new Date(eventsData?.booking_start_date);
    const bookingEnd = new Date(eventsData?.booking_end_date);
    return (
      now >= bookingStart &&
      now <= bookingEnd &&
      eventsData?.available_tickets > 0
    );
  };

  const getButtonText = () => {
    if (eventsData?.available_tickets === 0) return "Sold Out";
    if (!isBookingAvailable()) return "Booking Closed";
    return "Confirm Selection";
  };

  const isLowStock = () => {
    return (
      eventsData?.available_tickets > 0 &&
      eventsData?.available_tickets <= eventsData?.total_tickets * 0.1
    );
  };

  const openLightbox = (image) => {
    setLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const nextGalleryImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevGalleryImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="tw-min-h-screen tw-bg-[#080808] tw-text-white tw-relative tw-overflow-hidden  tw-selection:tw-bg-purple-500/30">
      {/* Background Ambient Glows */}
      <div className="tw-fixed tw-inset-0 tw-pointer-events-none">
        <div className="tw-absolute tw-top-[-10%] tw-left-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-purple-600/10 tw-blur-[140px] tw-rounded-full"></div>
        <div className="tw-absolute tw-bottom-[-10%] tw-right-[-10%] tw-w-[50%] tw-h-[50%] tw-bg-pink-600/10 tw-blur-[140px] tw-rounded-full"></div>
      </div>

      {isPaymentPanelOpen && (
        <PaymentPopup
          setIsPaymentPanelOpen={setIsPaymentPanelOpen}
          amount={ticketCount * (eventsData?.price || 0)}
          handleBooking={handleBooking}
          getEventData={getEventData}
        />
      )}

      {/* Hero Content Section */}
      <div className="tw-relative tw-z-10 tw-pt-32 lg:tw-pt-12 tw-mt-[50px]">
        <div className="tw-max-w-7xl tw-mx-auto tw-p-6 md:tw-p-10">
          <div className="tw-grid lg:tw-grid-cols-12 tw-gap-12 tw-items-start">
            
            {/* Left Side: Main Visual (Cinematic Image Frame) */}
            <div data-aos="fade-right" className="lg:tw-col-span-7 tw-relative group">
              <div className="tw-relative tw-overflow-hidden tw-rounded-[3rem] tw-border tw-border-white/10 tw-shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                {eventsData?.previous_event_photos?.[0] && (
                  <img
                    src={`http://localhost:4000/${eventsData?.previous_event_photos?.[0].replace(/\\/g, "/")}`}
                    alt={eventsData?.title}
                    className="tw-w-full tw-h-[550px] lg:tw-h-[700px] tw-object-cover tw-transition-all tw-duration-[1.5s] group-hover:tw-scale-110"
                    onClick={() => openLightbox(eventsData?.previous_event_photos?.[0])}
                  />
                )}
                {/* Visual Overlays */}
                <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-t tw-from-[#080808] tw-via-transparent tw-to-transparent tw-opacity-80"></div>
                
                {/* Floating Content over Image */}
                <div className="tw-absolute tw-bottom-12 tw-left-12 tw-right-12">
                  <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-mb-6">
                    <div className="tw-px-6 tw-py-2 tw-rounded-full tw-bg-white/10 tw-backdrop-blur-2xl tw-border tw-border-white/20 tw-text-xs tw-font-black tw-uppercase tw-tracking-[0.2em] tw-text-white shadow-xl">
                      {eventsData?.category_id?.name}
                    </div>
                    {isLowStock() && (
                      <div className="tw-flex tw-items-center tw-gap-2 tw-text-red-500 tw-text-xs tw-font-black tw-uppercase tw-tracking-widest tw-animate-pulse">
                        <Zap className="tw-w-4 tw-h-4 tw-fill-current" /> High Demand
                      </div>
                    )}
                  </div>
                  <h1 className="tw-text-5xl lg:tw-text-7xl tw-font-black tw-tracking-tighter tw-drop-shadow-2xl" style={{ fontFamily: "Recoleta, serif" }}>
                    Experience <br/> <span className="tw-text-white/60">the Magic.</span>
                  </h1>
                </div>

                {/* Sparkling Icon in Middle */}
                <div className="tw-absolute tw-top-1/2 tw-left-1/2 tw--translate-x-1/2 tw--translate-y-1/2 tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-duration-700">
                  <div className="tw-w-24 tw-h-24 tw-bg-white/10 tw-backdrop-blur-md tw-rounded-full tw-flex tw-items-center tw-justify-center tw-border tw-border-white/20 tw-shadow-2xl">
                    <Sparkles className="tw-w-10 tw-h-10 tw-text-white tw-animate-spin-slow" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: High-End Interactive Sidebar */}
            <div data-aos="fade-left" className="lg:tw-col-span-5 tw-relative">
              <div className="tw-bg-white/[0.02] tw-backdrop-blur-3xl tw-border tw-border-white/10 tw-rounded-[3.5rem] tw-p-10 lg:tw-p-12 tw-shadow-[0_20px_50px_rgba(0,0,0,0.5)] tw-relative tw-overflow-hidden">
                
                {/* Glass Inner Glow */}
                <div className="tw-absolute tw-top-0 tw-right-0 tw-w-40 tw-h-40 tw-bg-purple-600/5 tw-blur-3xl tw-rounded-full"></div>

                <div className="tw-relative tw-z-10">
                  {/* Event Meta Header */}
                  <div className="tw-mb-12">
                    <div className="tw-flex tw-items-center tw-gap-3 tw-text-purple-400 tw-text-xs tw-font-black tw-uppercase tw-tracking-[0.3em] tw-mb-4">
                      <TrendingUp className="tw-w-4 tw-h-4" /> Top Tier Listing
                    </div>
                    <h2 className="tw-text-4xl lg:tw-text-5xl tw-font-black tw-leading-[0.95] tw-tracking-tighter tw-mb-8">
                      {eventsData?.title}
                    </h2>
                    
                    <div className="tw-flex tw-items-center tw-gap-4 tw-p-5 tw-bg-white/5 tw-rounded-[2rem] tw-border tw-border-white/5">
                      <div className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-gradient-to-br tw-from-purple-500/20 tw-to-pink-500/20 tw-flex tw-items-center tw-justify-center tw-border tw-border-white/10 shadow-lg">
                        <Building2 className="tw-w-6 tw-h-6 tw-text-purple-300" />
                      </div>
                      <div>
                        <p className="tw-text-[10px] tw-text-gray-500 tw-font-black tw-uppercase tw-tracking-widest">Organized By</p>
                        <p className="tw-text-base tw-font-bold tw-text-white">{eventsData?.organizer_id?.company_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Primary Info Tiles */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4 tw-mb-12">
                    <div className="tw-p-5 tw-rounded-3xl tw-bg-white/[0.03] tw-border tw-border-white/5 group hover:tw-border-purple-500/30 tw-transition-all tw-duration-500">
                      <Calendar className="tw-w-5 tw-h-5 tw-text-purple-500 tw-mb-3" />
                      <p className="tw-text-[10px] tw-text-gray-600 tw-font-black tw-uppercase tw-mb-2">Event Date</p>
                      <p className="tw-text-[13px] tw-font-black tw-text-gray-200">{formatDate(eventsData?.event_start_date)}</p>
                    </div>
                    <div className="tw-p-5 tw-rounded-3xl tw-bg-white/[0.03] tw-border tw-border-white/5 group hover:tw-border-pink-500/30 tw-transition-all tw-duration-500">
                      <MapPin className="tw-w-5 tw-h-5 tw-text-pink-500 tw-mb-3" />
                      <p className="tw-text-[10px] tw-text-gray-600 tw-font-black tw-uppercase tw-mb-2">Venue Location</p>
                      <p className="tw-text-[13px] tw-font-black tw-text-gray-200 tw-line-clamp-1">{eventsData?.venue}</p>
                    </div>
                  </div>

                  {/* Pricing & Selection Control */}
                  <div className="tw-p-8 tw-bg-black/40 tw-rounded-[3rem] tw-border tw-border-white/10 tw-mb-10">
                    <div className="tw-flex tw-justify-between tw-items-end tw-mb-10">
                      <div>
                        <p className="tw-text-[10px] tw-text-gray-500 tw-font-black tw-uppercase tw-tracking-widest tw-mb-2">Standard Entry</p>
                        <div className="tw-flex tw-items-center tw-text-4xl tw-font-black tw-text-white">
                          <IndianRupee className="tw-w-6 tw-h-6 tw-text-emerald-400" />
                          {eventsData?.price}
                        </div>
                      </div>
                      
                      <div className="tw-flex tw-items-center tw-gap-5 tw-bg-white/5 tw-p-2 tw-rounded-2xl tw-border tw-border-white/5 shadow-inner">
                        <button 
                          onClick={() => setTicketCount(prev => Math.max(1, prev - 1))} 
                          className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-white/5 hover:tw-bg-white/10 tw-transition-all tw-font-black tw-text-xl"
                        >-</button>
                        <span className="tw-text-2xl tw-font-black tw-w-8 tw-text-center">{ticketCount}</span>
                        <button 
                          onClick={() => ticketCount < eventsData?.available_tickets ? setTicketCount(ticketCount + 1) : toast.error("Maximum Available Tickets Reached")} 
                          className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-white tw-text-black hover:tw-bg-purple-500 hover:tw-text-white tw-transition-all tw-font-black tw-text-xl shadow-lg"
                        >+</button>
                      </div>
                    </div>

                    {/* Total Summary */}
                    <div className="tw-flex tw-justify-between tw-items-center tw-pt-6 tw-border-t tw-border-white/10">
                      <div>
                        <p className="tw-text-[11px] tw-font-black tw-uppercase tw-text-gray-500">Estimated Total</p>
                        <p className="tw-text-3xl tw-font-black tw-text-purple-400">₹{ticketCount * (eventsData?.price || 0)}</p>
                      </div>
                      <div className="tw-text-right">
                         <div className={`tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-1.5 tw-rounded-full tw-bg-white/5 tw-border tw-border-white/10`}>
                            <div className={`tw-w-2 tw-h-2 tw-rounded-full ${eventsData?.available_tickets > 0 ? (isLowStock() ? 'tw-bg-red-500 tw-animate-pulse' : 'tw-bg-emerald-500') : 'tw-bg-gray-500'}`}></div>
                            <span className="tw-text-[10px] tw-font-black tw-uppercase tw-tracking-widest tw-text-gray-400">{eventsData?.available_tickets} / {eventsData?.total_tickets}</span>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    disabled={!isBookingAvailable() || eventsData?.available_tickets === 0}
                    onClick={handlePaymentButtonClick}
                    className={`tw-group tw-w-full tw-relative tw-py-7 tw-rounded-3xl tw-font-black tw-text-xl tw-uppercase tw-tracking-[0.2em] tw-transition-all tw-duration-500 tw-overflow-hidden ${
                      isBookingAvailable() && eventsData?.available_tickets > 0
                        ? "tw-bg-white tw-text-black hover:tw-bg-purple-600 hover:tw-text-white tw-shadow-[0_25px_50px_rgba(255,255,255,0.1)] hover:tw-shadow-purple-500/50 hover:tw--translate-y-2"
                        : "tw-bg-white/5 tw-text-gray-600 tw-cursor-not-allowed"
                    }`}
                  >
                    <span className="tw-relative tw-z-10 tw-flex tw-items-center tw-justify-center tw-gap-4">
                      {getButtonText()} <ChevronRight className="tw-w-6 tw-h-6 group-hover:tw-translate-x-3 tw-transition-transform tw-duration-500" />
                    </span>
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-transparent tw-via-white/10 tw-to-transparent tw-opacity-0 group-hover:tw-opacity-100 tw--translate-x-full group-hover:tw-translate-x-full tw-transition-all tw-duration-1000"></div>
                  </button>

                  <div className="tw-mt-8 tw-flex tw-items-center tw-justify-center tw-gap-3 tw-text-gray-600 tw-text-[10px] tw-font-black tw-uppercase tw-tracking-[0.3em]">
                    <ShieldCheck className="tw-w-4 tw-h-4 tw-text-emerald-500" /> Payment Protection Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Breakdown Section */}
      <div data-aos="fade-up" className="tw-max-w-7xl tw-mx-auto tw-py-40 tw-px-6">
        <div className="tw-grid lg:tw-grid-cols-12 tw-gap-16">
          <div className="lg:tw-col-span-5">
             <div className="tw-sticky tw-top-32">
                <p className="tw-text-purple-500 tw-font-black tw-uppercase tw-tracking-[0.4em] tw-text-xs tw-mb-4">The Narrative</p>
                <h3 className="tw-text-6xl lg:tw-text-8xl tw-font-black tw-tracking-tighter tw-mb-10" style={{ fontFamily: "Recoleta, serif" }}>
                  The <br/> <span className="tw-bg-gradient-to-r tw-from-white tw-to-gray-600 tw-bg-clip-text tw-text-transparent">Unfolding.</span>
                </h3>
                <div className="tw-w-24 tw-h-1 tw-bg-purple-600 tw-rounded-full tw-mb-8"></div>
                <p className="tw-text-xl tw-text-gray-500 tw-font-medium tw-leading-relaxed max-w-md">Every event hosted on EvenueFy is more than a booking—it’s a carefully architected experience designed to stay with you long after the final applause.</p>
             </div>
          </div>
          <div className="lg:tw-col-span-7">
            <div className="tw-p-16 tw-rounded-[4rem] tw-bg-white/[0.01] tw-backdrop-blur-xl tw-border tw-border-white/5 tw-relative tw-overflow-hidden tw-shadow-2xl">
               <div className="tw-absolute tw-top-0 tw-right-0 tw-w-64 tw-h-64 tw-bg-purple-600/5 tw-blur-[100px] tw-rounded-full"></div>
               <p className="tw-text-2xl tw-text-gray-300 tw-leading-[1.8] tw-font-medium tw-whitespace-pre-line tw-relative tw-z-10">
                 {eventsData?.description}
               </p>
               <Sparkles className="tw-absolute tw-bottom-12 tw-right-12 tw-w-16 tw-h-16 tw-text-white/5" />
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Media Showcase */}
      {galleryImages.length > 0 && (
        <div className="tw-bg-[#050505] tw-py-40">
          <div className="tw-max-w-7xl tw-mx-auto tw-px-6">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-end tw-mb-20 tw-gap-8">
               <div>
                  <p className="tw-text-pink-500 tw-font-black tw-uppercase tw-tracking-[0.4em] tw-text-xs tw-mb-4">Archive Visuals</p>
                  <h2 className="tw-text-6xl tw-font-black tw-tracking-tighter">Event Gallery</h2>
               </div>
               <div className="tw-flex tw-gap-4">
                  <button onClick={prevGalleryImage} className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-white/5 hover:tw-bg-white/10 tw-border tw-border-white/10 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-500 active:tw-scale-90"><ChevronLeft className="tw-w-8 tw-h-8" /></button>
                  <button onClick={nextGalleryImage} className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-white/5 hover:tw-bg-white/10 tw-border tw-border-white/10 tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-500 active:tw-scale-90"><ChevronRight className="tw-w-8 tw-h-8" /></button>
               </div>
            </div>

            <div className="tw-relative tw-h-[750px] tw-rounded-[4rem] tw-overflow-hidden tw-shadow-[0_40px_100px_rgba(0,0,0,1)] tw-border tw-border-white/5">
               <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    src={`http://localhost:4000/${galleryImages[selectedImageIndex].replace(/\\/g, "/")}`}
                    className="tw-w-full tw-h-full tw-object-cover tw-cursor-zoom-in"
                    onClick={() => openLightbox(galleryImages[selectedImageIndex])}
                  />
               </AnimatePresence>
               
               <div className="tw-absolute tw-bottom-12 tw-right-12 tw-px-8 tw-py-4 tw-bg-black/40 tw-backdrop-blur-3xl tw-rounded-[2rem] tw-border tw-border-white/10 tw-text-sm tw-font-black tw-tracking-[0.2em]">
                  {selectedImageIndex + 1} <span className="tw-text-gray-600 tw-mx-2">/</span> {galleryImages.length}
               </div>
            </div>

            {/* Micro Thumbnails for Direct Navigation */}
            <div className="tw-flex tw-flex-wrap tw-justify-center tw-gap-5 tw-mt-12">
               {galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`tw-h-24 tw-w-36 tw-rounded-3xl tw-overflow-hidden tw-cursor-pointer tw-transition-all tw-duration-700 tw-border-2 ${selectedImageIndex === idx ? 'tw-border-purple-500 tw-scale-110 shadow-[0_0_30px_rgba(168,85,247,0.3)]' : 'tw-border-transparent tw-opacity-30 hover:tw-opacity-100 hover:tw-scale-105'}`}
                  >
                    <img src={`http://localhost:4000/${img.replace(/\\/g, "/")}`} className="tw-w-full tw-h-full tw-object-cover" />
                  </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {/* Professional Full-Screen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="tw-fixed tw-inset-0 tw-bg-black tw-z-[9999] tw-flex tw-items-center tw-justify-center tw-p-8 md:tw-p-20"
            onClick={() => setIsLightboxOpen(false)}
          >
             <div className="tw-absolute tw-top-12 tw-right-12 tw-z-10">
                <button className="tw-w-20 tw-h-20 tw-bg-white/10 tw-backdrop-blur-3xl tw-rounded-full tw-flex tw-items-center tw-justify-center hover:tw-bg-red-500 tw-transition-all tw-duration-500 tw-border tw-border-white/10"><X className="tw-w-10 tw-h-10" /></button>
             </div>
             <motion.img 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              src={`http://localhost:4000/${lightboxImage.replace(/\\/g, "/")}`} 
              className="tw-max-w-full tw-max-h-full tw-rounded-[3rem] tw-shadow-[0_50px_100px_rgba(0,0,0,1)] tw-object-contain tw-border tw-border-white/10" 
              onClick={e => e.stopPropagation()} 
             />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .tw-animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default DetailsPage;