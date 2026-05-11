import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Tag,
  IndianRupee,
  Building2,
  User,
} from "lucide-react";
import { image1, image2 } from "./Event_Images";
import LoadingScreen from "./LoadingScreen";
import { toast } from "react-toastify";
import axios from "axios";

const TrackEvent = ({ eventId, getRandomEventId }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isReqSend = useRef(false);

  const getEventData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/event/fetchOne/${eventId || await getRandomEventId()}`,
        {
          withCredentials: true, // 🔑 allow cookies
        }
      );
      setEventData(res.data.event[0]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error(error.response.data?.message || "Something Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      getEventData();
      isReqSend.current = true;
    }
  }, []);

  // Custom scrollbar styles
  const scrollbarStyles = `
    /* Main container scrollbar */
    .custom-scrollbar-container::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar-container::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }

    .custom-scrollbar-container::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
      border-radius: 10px;
      border: 2px solid transparent;
      background-clip: padding-box;
      backdrop-filter: blur(10px);
    }

    .custom-scrollbar-container::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
    }

    /* Description scrollbar */
    .tw-custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }

    .tw-custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 8px;
    }

    .tw-custom-scrollbar::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .tw-custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.15));
    }

    /* Firefox scrollbar styling */
    .custom-scrollbar-container,
    .tw-custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05);
    }
  `;

  if (!eventData && !loading) {
    return (
      <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f] tw-flex tw-items-center tw-justify-center">
        <div
          className="tw-text-center tw-text-white tw-flex tw-flex-col tw-items-center tw-gap-3"
          style={{ fontFamily: "DM Sans Normal" }}
        >
          <AlertTriangle size={48} className="tw-text-red-500" />
          <p>Event not found</p>
        </div>
      </div>
    );
  }

  const bookedSeats = eventData?.total_tickets - eventData?.available_tickets;
  const remainingSeats = eventData?.available_tickets;
  const bookedPercentage = (bookedSeats / eventData?.total_tickets) * 100;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "tw-bg-gray-100 tw-text-gray-800 tw-border-gray-300";
      case "published":
        return "tw-bg-blue-100 tw-text-blue-800 tw-border-blue-300";
      case "upcoming":
        return "tw-bg-green-100 tw-text-green-800 tw-border-green-300";
      case "ongoing":
        return "tw-bg-orange-100 tw-text-orange-800 tw-border-orange-300";
      case "completed":
        return "tw-bg-purple-100 tw-text-purple-800 tw-border-purple-300";
      case "cancelled":
        return "tw-bg-red-100 tw-text-red-800 tw-border-red-300";
      default:
        return "tw-bg-gray-100 tw-text-gray-800 tw-border-gray-300";
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  // Get the first image for background, fallback to a default
  const backgroundImage = eventData?.previous_event_photos?.[0]
    ? `http://localhost:4000/${eventData?.previous_event_photos[0]?.replace(
        /\\/g,
        "/"
      )}`
    : image2;

  if (loading) {
    return (
      <div className="tw-relative tw-w-auto tw-ml-7 tw-h-full tw-top-1/2 tw-right-4 -tw-translate-y-1/2 tw-z-50 tw-rounded-2xl tw-overflow-hidden">
        <div className="tw-bg-black/40 tw-rounded-2xl tw-p-6 tw-shadow-lg">
          <LoadingScreen msg="Loading Event Details" />
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Inject custom scrollbar styles */}
      <style>{scrollbarStyles}</style>
      <div
        className="tw-min-h-screen tw-rounded-2xl tw-relative custom-scrollbar-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-b tw-from-black/60 tw-via-black/40 tw-to-black/70"></div>

        <div className="tw-relative tw-z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="tw-backdrop-blur-sm tw-border-b tw-border-white/10"
          >
            <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6">
              <div className="tw-flex tw-items-start tw-justify-between tw-flex-wrap tw-gap-4">
                <div className="tw-flex-1">
                  <h1
                    className="tw-text-4xl lg:tw-text-5xl tw-text-white tw-mb-3 tw-leading-tight"
                    style={{ fontFamily: "DM Sans Bold" }}
                  >
                    {eventData?.title}
                  </h1>
                  <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-text-white/80">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <User className="tw-w-4 tw-h-4" />
                      <span style={{ fontFamily: "DM Sans Normal" }}>
                        {eventData?.organizer_id?.company_name ||
                          "Unknown Organizer"}
                      </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <Building2 className="tw-w-4 tw-h-4" />
                      <span style={{ fontFamily: "DM Sans Normal" }}>
                        Event ID: {eventData?._id}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className={`tw-px-6 tw-py-3 tw-rounded-full tw-text-sm tw-font-medium tw-capitalize tw-border-2 tw-backdrop-blur-sm ${getStatusColor(
                    eventData?.status
                  )}`}
                  style={{ fontFamily: "DM Sans SemiBold" }}
                >
                  {eventData?.status}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-8 ">
            <AnimatePresence mode="wait">
              <motion.div
                key={eventData?._id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-8"
              >
                {/* Event Details Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="tw-bg-white/5 tw-backdrop-blur-lg tw-rounded-3xl tw-shadow-2xl tw-border tw-border-white/10 tw-p-8"
                >
                  <h2
                    className="tw-text-2xl tw-text-white tw-mb-6 tw-flex tw-items-center tw-gap-3"
                    style={{ fontFamily: "DM Sans SemiBold" }}
                  >
                    <Tag className="tw-w-6 tw-h-6 tw-text-blue-400" />
                    Event Information
                  </h2>

                  <div className="tw-space-y-6">
                    <div className="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/10">
                      <Tag className="tw-w-6 tw-h-6 tw-text-blue-400 tw-mt-0.5 tw-flex-shrink-0" />
                      <div>
                        <p
                          className="tw-text-sm tw-text-white/70 tw-mb-1"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Category
                        </p>
                        <p
                          className="tw-text-lg tw-text-white"
                          style={{ fontFamily: "DM Sans SemiBold" }}
                        >
                          {eventData.category_id?.name || "Unknown Category"}
                        </p>
                      </div>
                    </div>

                    <div className="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/10">
                      <MapPin className="tw-w-6 tw-h-6 tw-text-red-400 tw-mt-0.5 tw-flex-shrink-0" />
                      <div>
                        <p
                          className="tw-text-sm tw-text-white/70 tw-mb-1"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Location
                        </p>
                        <p
                          className="tw-text-lg tw-text-white"
                          style={{ fontFamily: "DM Sans SemiBold" }}
                        >
                          {eventData.venue}
                        </p>
                        <p
                          className="tw-text-sm tw-text-white/60"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          {eventData.city_id?.name}, {eventData.state_id?.name}
                        </p>
                      </div>
                    </div>

                    <div className="tw-flex tw-items-start tw-gap-4 tw-p-4 tw-rounded-2xl tw-bg-gradient-to-r tw-from-green-500/10 tw-to-emerald-500/10 tw-border tw-border-green-400/20">
                      <IndianRupee className="tw-w-6 tw-h-6 tw-text-green-400 tw-mt-0.5 tw-flex-shrink-0" />
                      <div>
                        <p
                          className="tw-text-sm tw-text-white/70 tw-mb-1"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Ticket Price
                        </p>
                        <p
                          className="tw-text-3xl tw-text-green-400 tw-flex tw-items-center tw-gap-1"
                          style={{ fontFamily: "DM Sans Bold" }}
                        >
                          ₹{eventData.price}
                        </p>
                      </div>
                    </div>

                    <div className="tw-border-t tw-border-white/10 tw-pt-6">
                      <p
                        className="tw-text-lg tw-text-white tw-mb-3"
                        style={{ fontFamily: "DM Sans SemiBold" }}
                      >
                        Description
                      </p>
                      <div
                        className="tw-text-white/80 tw-leading-relaxed tw-max-h-48 tw-overflow-y-auto tw-custom-scrollbar"
                        style={{ fontFamily: "DM Sans Normal" }}
                      >
                        {eventData.description
                          ?.split("\n")
                          .map((paragraph, index) => (
                            <p key={index} className="tw-mb-2">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Tickets & Dates Card */}
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="tw-bg-white/5 tw-backdrop-blur-lg tw-rounded-3xl tw-shadow-2xl tw-border tw-border-white/10 tw-p-8"
                >
                  <h2
                    className="tw-text-2xl tw-text-white tw-mb-6 tw-flex tw-items-center tw-gap-3"
                    style={{ fontFamily: "DM Sans SemiBold" }}
                  >
                    <Users className="tw-w-6 tw-h-6 tw-text-purple-400" />
                    Tickets & Schedule
                  </h2>

                  {/* Ticket Stats */}
                  <div className="tw-space-y-6 tw-mb-8">
                    <div className="tw-grid tw-grid-cols-3 tw-gap-4">
                      <div className="tw-text-center tw-p-6 tw-bg-gradient-to-b tw-from-blue-500/10 tw-to-blue-600/5 tw-rounded-2xl tw-border tw-border-blue-400/20">
                        <Users className="tw-w-8 tw-h-8 tw-text-blue-400 tw-mx-auto tw-mb-3" />
                        <p
                          className="tw-text-3xl tw-text-blue-400 tw-mb-1"
                          style={{ fontFamily: "DM Sans Bold" }}
                        >
                          {eventData.total_tickets}
                        </p>
                        <p
                          className="tw-text-xs tw-text-white/60"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Total Seats
                        </p>
                      </div>

                      <div className="tw-text-center tw-p-6 tw-bg-gradient-to-b tw-from-orange-500/10 tw-to-orange-600/5 tw-rounded-2xl tw-border tw-border-orange-400/20">
                        <Users className="tw-w-8 tw-h-8 tw-text-orange-400 tw-mx-auto tw-mb-3" />
                        <p
                          className="tw-text-3xl tw-text-orange-400 tw-mb-1"
                          style={{ fontFamily: "DM Sans Bold" }}
                        >
                          {bookedSeats}
                        </p>
                        <p
                          className="tw-text-xs tw-text-white/60"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Booked
                        </p>
                      </div>

                      <div className="tw-text-center tw-p-6 tw-bg-gradient-to-b tw-from-green-500/10 tw-to-green-600/5 tw-rounded-2xl tw-border tw-border-green-400/20">
                        <Users className="tw-w-8 tw-h-8 tw-text-green-400 tw-mx-auto tw-mb-3" />
                        <p
                          className="tw-text-3xl tw-text-green-400 tw-mb-1"
                          style={{ fontFamily: "DM Sans Bold" }}
                        >
                          {remainingSeats}
                        </p>
                        <p
                          className="tw-text-xs tw-text-white/60"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Available
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="tw-p-4 tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/10">
                      <div className="tw-flex tw-justify-between tw-mb-3">
                        <span
                          className="tw-text-sm tw-text-white/70"
                          style={{ fontFamily: "DM Sans Normal" }}
                        >
                          Booking Progress
                        </span>
                        <span
                          className="tw-text-sm tw-text-white tw-font-semibold"
                          style={{ fontFamily: "DM Sans SemiBold" }}
                        >
                          {bookedPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="tw-w-full tw-bg-white/10 tw-rounded-full tw-h-4 tw-overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${bookedPercentage}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="tw-bg-gradient-to-r tw-from-blue-500 tw-via-purple-500 tw-to-orange-500 tw-h-4 tw-rounded-full tw-relative"
                        >
                          <div className="tw-absolute tw-inset-0 tw-bg-white/20 tw-animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="tw-space-y-4">
                    <div className="tw-p-4 tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/10">
                      <div className="tw-flex tw-items-start tw-gap-4">
                        <Calendar className="tw-w-6 tw-h-6 tw-text-purple-400 tw-mt-0.5 tw-flex-shrink-0" />
                        <div className="tw-flex-1">
                          <p
                            className="tw-text-sm tw-text-white/70 tw-mb-2"
                            style={{ fontFamily: "DM Sans Normal" }}
                          >
                            Booking Period
                          </p>
                          <p
                            className="tw-text-white tw-leading-relaxed"
                            style={{ fontFamily: "DM Sans SemiBold" }}
                          >
                            {formatDate(eventData.booking_start_date)}
                          </p>
                          <p
                            className="tw-text-white/60 tw-text-sm"
                            style={{ fontFamily: "DM Sans Normal" }}
                          >
                            to {formatDate(eventData.booking_end_date)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="tw-p-4 tw-rounded-2xl tw-bg-white/5 tw-border tw-border-white/10">
                      <div className="tw-flex tw-items-start tw-gap-4">
                        <Clock className="tw-w-6 tw-h-6 tw-text-indigo-400 tw-mt-0.5 tw-flex-shrink-0" />
                        <div className="tw-flex-1">
                          <p
                            className="tw-text-sm tw-text-white/70 tw-mb-2"
                            style={{ fontFamily: "DM Sans Normal" }}
                          >
                            Event Schedule
                          </p>
                          <p
                            className="tw-text-white tw-leading-relaxed"
                            style={{ fontFamily: "DM Sans SemiBold" }}
                          >
                            {formatDate(eventData.event_start_date)}
                          </p>
                          <p
                            className="tw-text-white/60 tw-text-sm"
                            style={{ fontFamily: "DM Sans Normal" }}
                          >
                            {formatTime(eventData.event_start_date)} -{" "}
                            {formatTime(eventData.event_end_date)}
                          </p>
                          {eventData.event_start_date !==
                            eventData.event_end_date && (
                            <p
                              className="tw-text-white/60 tw-text-sm"
                              style={{ fontFamily: "DM Sans Normal" }}
                            >
                              Ends: {formatDate(eventData.event_end_date)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackEvent;
