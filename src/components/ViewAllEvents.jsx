import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Search,
  Edit,
  X,
  Clock,
  MapPin,
  Users,
  Star,
  Filter,
  Eye,
  Ticket,
  FileText,
} from "lucide-react";
import { image1, image2, image3, image4, image5, image7 } from "./Event_Images";
import { toast } from "react-toastify";
import axios from "axios";
import EventCard from "./EventCard";

const ViewAllEvents = ({
  tabVariants,
  activeTab,
  seteventId,
  setActiveMenu,
}) => {
  const isReqSend = useRef(false);
  const [Events, setEvents] = useState([]);
  const [ActiveTab, setActiveTab] = useState((activeTab == null || activeTab == "")? "upcoming":activeTab);
  const [searchQuery, setSearchQuery] = useState("");

  const getEvents = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/event/fetchOneByOrganizer",
        {
          withCredentials: true, // 🔑 allow cookies
        }
      );
      setEvents(res.data.event);
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

  useEffect(() => {
    if (activeTab) {
      setActiveTab(activeTab);
    }
  }, [activeTab]);

  // Sample events data
  // const Events = [
  //   {
  //     id: 1,
  //     name: "Tech Innovation Summit 2025",
  //     date: "2025-10-15",
  //     time: "09:00 AM",
  //     location: "Silicon Valley Conference Center",
  //     attendees: 250,
  //     status: "upcoming",
  //     category: "Technology",
  //     description: "A premier gathering of tech innovators and entrepreneurs.",
  //     image:image1
  //   },
  //   {
  //     id: 2,
  //     name: "Digital Marketing Workshop",
  //     date: "2025-09-20",
  //     time: "02:00 PM",
  //     location: "Business Hub Downtown",
  //     attendees: 80,
  //     status: "ongoing",
  //     category: "Marketing",
  //     description: "Learn the latest digital marketing strategies and tools.",
  //     image:image2
  //   },
  //   {
  //     id: 3,
  //     name: "Annual Music Festival",
  //     date: "2025-08-10",
  //     time: "06:00 PM",
  //     location: "Central Park Amphitheater",
  //     attendees: 1500,
  //     status: "completed",
  //     category: "Entertainment",
  //     description: "A celebration of music featuring local and international artists.",
  //     image:image3
  //   },
  //   {
  //     id: 4,
  //     name: "Startup Pitch Competition",
  //     date: "2025-09-25",
  //     time: "10:00 AM",
  //     location: "Innovation Center",
  //     attendees: 120,
  //     status: "cancelled",
  //     category: "Business",
  //     description: "Entrepreneurs showcase their innovative business ideas.",
  //     image:image4
  //   },
  //   {
  //     id: 5,
  //     name: "AI & Machine Learning Conference",
  //     date: "2025-11-05",
  //     time: "09:30 AM",
  //     location: "Tech Plaza Convention Hall",
  //     attendees: 300,
  //     status: "upcoming",
  //     category: "Technology",
  //     description: "Exploring the future of artificial intelligence and machine learning.",
  //     image:image5
  //   },
  //   {
  //     id: 6,
  //     name: "Creative Design Expo",
  //     date: "2025-09-18",
  //     time: "11:00 AM",
  //     location: "Art District Gallery",
  //     attendees: 150,
  //     status: "ongoing",
  //     category: "Design",
  //     description: "Showcasing innovative design concepts and creative solutions.",
  //     image:image7
  //   }
  // ];

  // Navigation tabs configuration
  const view_nav = [
    {
      id: "upcoming",
      label: "Upcoming Events",
      icon: Calendar,
      color: "blue",
      bgColor: "tw-bg-blue-400",
      textColor: "tw-text-blue-400",
      hoverBg: "hover:tw-bg-blue-400/10",
      activeBg: "tw-bg-blue-400/20",
      glowColor: "hover:tw-shadow-blue-400/25",
    },
    {
      id: "ongoing",
      label: "Ongoing Events",
      icon: Clock,
      color: "green",
      bgColor: "tw-bg-green-400",
      textColor: "tw-text-green-400",
      hoverBg: "hover:tw-bg-green-400/10",
      activeBg: "tw-bg-green-400/20",
      glowColor: "hover:tw-shadow-green-400/25",
    },
    {
      id: "completed",
      label: "Completed Events",
      icon: Star,
      color: "purple",
      bgColor: "tw-bg-purple-400",
      textColor: "tw-text-purple-400",
      hoverBg: "hover:tw-bg-purple-400/10",
      activeBg: "tw-bg-purple-400/20",
      glowColor: "hover:tw-shadow-purple-400/25",
    },
    {
      id: "cancelled",
      label: "Cancelled Events",
      icon: X,
      color: "red",
      bgColor: "tw-bg-red-400",
      textColor: "tw-text-red-400",
      hoverBg: "hover:tw-bg-red-400/10",
      activeBg: "tw-bg-red-400/20",
      glowColor: "hover:tw-shadow-red-400/25",
    },
    {
      id: "draft",
      label: "Draft Events",
      icon: FileText,
      color: "amber",
      bgColor: "tw-bg-amber-400",
      textColor: "tw-text-amber-400",
      hoverBg: "hover:tw-bg-amber-400/10",
      activeBg: "tw-bg-amber-400/20",
      glowColor: "hover:tw-shadow-amber-400/25",
    },
  ];

  // Filter events based on active tab and search query
  const filteredEvents = useMemo(() => {
    return Events.filter((event) => {
      const matchesStatus = event.status === ActiveTab;

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category_id.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city_id.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.state_id.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [Events, ActiveTab, searchQuery]);

  // Get status badge styles
  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: {
        bg: "tw-bg-amber-400/20",
        text: "tw-text-amber-400",
        label: "Draft",
      },
      upcoming: {
        bg: "tw-bg-blue-500/20",
        text: "tw-text-blue-400",
        label: "Upcoming",
      },
      ongoing: {
        bg: "tw-bg-green-500/20",
        text: "tw-text-green-400",
        label: "Live",
      },
      completed: {
        bg: "tw-bg-purple-500/20",
        text: "tw-text-purple-400",
        label: "Completed",
      },
      cancelled: {
        bg: "tw-bg-red-500/20",
        text: "tw-text-red-400",
        label: "Cancelled",
      },
    };

    return statusConfig[status] || statusConfig.upcoming;
  };

  // Handle event operations
  const handleUpdateEvent = (eventId) => {
    seteventId(eventId);
    setActiveMenu("update");
  };

  const handleCancelEvent = async (eventId) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/event/cancel/${eventId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message, {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      getEvents();
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  const handleViewEvent = (eventId) => {
    seteventId(eventId);
    setActiveMenu("reports");
  };
  const handleViewBooking = (eventId) => {
    seteventId(eventId);
    setActiveMenu("bookings");
  };

  // Render tab content
  const renderTabContent = () => {
    if (filteredEvents.length === 0) {
      return (
        <motion.div
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="tw-text-center tw-py-16"
        >
          <Calendar className="tw-w-16 tw-h-16 tw-text-gray-600 tw-mx-auto tw-mb-4" />
          <h3
            className="tw-text-xl tw-font-semibold tw-text-gray-400 tw-mb-2"
            style={{ fontFamily: "DM Sans SemiBold" }}
          >
            No events found
          </h3>
          <p
            className="tw-text-gray-500"
            style={{ fontFamily: "DM Sans Normal" }}
          >
            {searchQuery
              ? "Try adjusting your search terms"
              : `No ${ActiveTab} events available`}
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6"
      >
        {filteredEvents.map((event) => (
          <EventCard
            event={event}
            handleUpdateEvent={handleUpdateEvent}
            handleCancelEvent={handleCancelEvent}
            handleViewEvent={handleViewEvent}
            handleViewBooking={handleViewBooking}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#0f0f0f] tw-to-[#1a1a1a]">
      {/* Navigation Tabs */}
      <div className="tw-bg-gradient-to-r tw-from-[#1a1a1a] tw-to-[#111] tw-border-b tw-border-gray-800 tw-sticky tw-top-0 tw-py-5 tw-z-40 tw-shadow-lg">
        <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
            <h1 className="tw-text-2xl tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-3">
              <Calendar className="tw-w-8 tw-h-8 tw-text-blue-400" />
              View All Events
            </h1>

            {/* Search Bar */}
            <div className="tw-relative">
              <Search className="tw-absolute tw-left-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-w-5 tw-h-5 tw-text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tw-bg-[#2a2a2a] tw-border tw-border-gray-700 tw-rounded-lg tw-pl-10 tw-pr-4 tw-py-2 tw-text-white tw-placeholder-gray-400 tw-focus:outline-none tw-focus:border-blue-500 tw-focus:ring-2 tw-focus:ring-blue-500/20 tw-transition-all tw-w-64"
              />
            </div>
          </div>

          <div className="tw-flex tw-space-x-6 tw-overflow-x-auto tw-scrollbar-hide">
            {view_nav.map((tab) => {
              const IconComponent = tab.icon;
              const isActive = ActiveTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-4 tw-rounded-lg tw-text-sm tw-font-medium tw-relative tw-border-none tw-outline-none tw-whitespace-nowrap
                    ${
                      isActive
                        ? `${tab.textColor} tw-bg-[#2a2a2a]`
                        : "tw-text-gray-400 tw-bg-[#1e1e1e] hover:tw-text-gray-200 hover:tw-bg-[#2a2a2a]"
                    }
                    tw-transition-colors tw-duration-300`}
                >
                  <IconComponent className="tw-w-5 tw-h-5" />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="ActiveTab"
                      className="tw-absolute tw-bottom-0 tw-left-3 tw-right-3 tw-h-0.5 tw-rounded-full"
                      style={{
                        borderBottom: `1px solid ${
                          isActive
                            ? (tab.color === "blue" && "#60a5fa") || // blue-400
                              (tab.color === "green" && "#34d399") || // green-400
                              (tab.color === "purple" && "#a855f7") || // purple-400
                              (tab.color === "amber" && "#fbbf24") || // gray-400
                              "#ef4444" // default: red-400
                            : "transparent"
                        }`,
                        boxShadow: "none",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-py-8 lg:tw-py-12">
        <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
      </div>
    </div>
  );
};

export default ViewAllEvents;
