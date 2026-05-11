import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  Calendar,
  ClipboardList,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Create_Event from "../components/Create_Event";
import Update_Event from "../components/Update_Event";
import ViewAllEvents from "../components/ViewAllEvents";
import ViewBooking from "../components/ViewBooking";
import TrackEvent from "../components/TrackEvent";
import axios from "axios";
import { toast } from "react-toastify";

// Menu items configuration
const menuItems = [
  {
    id: "create",
    label: "Create New Event",
    icon: Star,
    color: "green",
    bgColor: "tw-bg-green-400",
    textColor: "tw-text-green-400",
    hoverBg: "hover:tw-bg-green-400/10",
    activeBg: "tw-bg-green-400/20",
    glowColor: "hover:tw-shadow-green-400/25",
  },
  {
    id: "view",
    label: "View All Events",
    icon: Calendar,
    color: "blue",
    bgColor: "tw-bg-blue-400",
    textColor: "tw-text-blue-400",
    hoverBg: "hover:tw-bg-blue-400/10",
    activeBg: "tw-bg-blue-400/20",
    glowColor: "hover:tw-shadow-blue-400/25",
  },
  {
    id: "bookings",
    label: "Manage Bookings",
    icon: ClipboardList,
    color: "purple",
    bgColor: "tw-bg-purple-400",
    textColor: "tw-text-purple-400",
    hoverBg: "hover:tw-bg-purple-400/10",
    activeBg: "tw-bg-purple-400/20",
    glowColor: "hover:tw-shadow-purple-400/25",
  },
  {
    id: "reports",
    label: "Track Event Reports",
    icon: BarChart3,
    color: "yellow",
    bgColor: "tw-bg-yellow-400",
    textColor: "tw-text-yellow-400",
    hoverBg: "hover:tw-bg-yellow-400/10",
    activeBg: "tw-bg-yellow-400/20",
    glowColor: "hover:tw-shadow-yellow-400/25",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 }, // completely invisible at start
  visible: {
    opacity: 1, // fully visible
    transition: {
      duration: 0.5, // fade-in duration
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const pageVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const OrganizerMainDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isReqSend = useRef(false);
  const { ActiveMenu, ActiveTab } = location.state || {
    ActiveMenu: "create",
    ActiveTab: "upcoming",
  };
  const [activeMenu, setActiveMenu] = useState(ActiveMenu);
  const [activeTab, setActiveTab] = useState(ActiveTab);
  const [eventId, seteventId] = useState(null);

  const getRandomEventId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/event/fetchRandomEventId`,
        {
          withCredentials: true, // 🔑 allow cookies
        }
      );
      seteventId(res.data.event_id);
      return res.data.event_id;
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Always start at top
    if (!isReqSend.current) {
      getRandomEventId();
      isReqSend.current = true;
    }
  }, []);

  // Page content mapping
  const pageContent = {
    create: <Create_Event />,
    update: <Update_Event eventId={eventId} setActiveMenu={setActiveMenu}/>,
    view: (
      <ViewAllEvents
        activeTab={activeTab}
        seteventId={seteventId}
        setActiveMenu={setActiveMenu}
      />
    ),
    bookings: (
      <ViewBooking eventId={eventId} getRandomEventId={getRandomEventId} />
    ),
    reports: (
      <div className="tw-w-full tw-h-[calc(100vh-100px)] tw-overflow-auto">
        <TrackEvent eventId={eventId} getRandomEventId={getRandomEventId} />
      </div>
    ),
  };

  return (
    <>
      <motion.div
        className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f] tw-text-white"
        style={{ fontFamily: "DM Sans Normal" }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main Layout Grid */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[300px_1fr] tw-min-h-screen">
          {/* Left Sidebar */}
          <motion.div
            className="tw-bg-[#1a1a1a] tw-border-r tw-border-gray-800 tw-p-6"
            variants={itemVariants}
          >
            {/* Logo/Header */}
            <div className="tw-mb-8">
              <h1
                className="tw-text-2xl tw-text-white tw-mb-2"
                style={{ fontFamily: '"DM Sans ExtraBold"' }}
              >
                EvenueFy
              </h1>
              <p
                className="tw-text-gray-400 tw-text-sm"
                style={{ fontFamily: "DM Sans Normal" }}
              >
                Event Organizer Dashboard
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="tw-space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      tw-relative tw-flex tw-items-center tw-space-x-3 tw-p-4 tw-rounded-xl tw-cursor-pointer tw-transition-all tw-duration-300
                      ${
                        isActive
                          ? `${item.activeBg} tw-shadow-lg ${item.glowColor}`
                          : `tw-bg-transparent ${item.hoverBg} hover:tw-shadow-lg ${item.glowColor}`
                      }
                      hover:tw--translate-y-0.5
                    `}
                    onClick={() => {
                      if(item.id == "view") setActiveTab("upcoming");
                      setActiveMenu(item.id);
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className={`tw-absolute tw-left-0 tw-top-0 tw-bottom-0 tw-w-1 ${item.bgColor} tw-rounded-r-full`}
                        layoutId="activeIndicator"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`tw-p-2 tw-rounded-lg ${
                        isActive ? item.bgColor : "tw-bg-gray-800"
                      }`}
                    >
                      <Icon
                        className={`tw-w-5 tw-h-5 ${
                          isActive ? "tw-text-black" : item.textColor
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`tw-text-sm ${
                        isActive ? "tw-text-white" : "tw-text-gray-400"
                      } tw-font-medium`}
                      style={{ fontFamily: '"DM Sans Bold"' }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>

          {/* Right Content Area */}
          <div className="tw-flex tw-flex-col">
            {/* Header */}
            <motion.div
              className="tw-bg-[#1a1a1a] tw-border-b tw-border-gray-800 tw-p-6 tw-flex tw-justify-end tw-items-center"
              variants={itemVariants}
            >
              {/* <h2 
                className="tw-text-xl tw-text-white"
                style={{ fontFamily: '"DM Sans SemiBold"' }}
              >
                {menuItems.find(item => item.id === activeMenu)?.label}
              </h2> */}

              {/* Back to Home Link */}
              <motion.div
                className="tw-flex tw-items-center tw-space-x-2 tw-text-gray-400 hover:tw-text-white tw-cursor-pointer tw-transition-colors tw-duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="tw-w-4 tw-h-4" />
                <span
                  className="tw-text-sm"
                  style={{ fontFamily: "DM Sans Normal" }}
                  onClick={() => navigate("/profile")}
                >
                  Back to Home
                </span>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <motion.div className="tw-flex-1 tw-p-6" variants={itemVariants}>
              {pageContent[activeMenu]}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OrganizerMainDashboard;
