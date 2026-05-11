import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Star,
  Settings,
  Upload,
  Edit3,
  Award,
  Clock,
  MapPin,
  Mail,
  User,
  Shield,
  TrendingUp,
  Briefcase,
  Crown,
  LogOut,
  PlayCircle,
  CheckCircle,
  ClipboardList,
  BarChart3,
} from "lucide-react";
import Organizer_dashboard from "../components/organizer_dashboard";
import User_Bookings from "../components/User_Bookings";
import User_Setting from "../components/User_Setting";
import Organizer_Setting from "../components/Organizer_Setting";
import axios from "axios";
import OrganizerDetailsSection from "../components/Organizer_Details";
import LoadingScreen from "../components/LoadingScreen";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = ({ setProfilePic }) => {
  const isReqSend = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  // Sample user data based on your MongoDB schema
  const [user, setUser] = useState({
    uname: "",
    email: "",
    gender: "",
    city: "",
    profile_picture: "",
    isOrganizer: true,
    isBlocked: false,
    createdAt: "",
  });

  const [organizer, setOrganizer] = useState({
    company_name: "ZM Creation",
    bussiness_email: "zmcreation@gmail.com",
    gst_number: "GTW843OEP3JD9KD",
    address: "Delhi",
  });

  const [activeTab, setActiveTab] = useState("businessProfile");

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message === "New User") {
        toast.error("You Need to Sign Up First", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        navigate("/Signup");
      }
      SetProfile_Page();
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
      navigate("/login");
    }
  };

  const SetProfile_Page = async () => {
    const isOrganizer = await fetchUserData();
    if (isOrganizer) {
      await fetchOrganizerData();
    }
    isOrganizer ? setActiveTab("businessProfile") : setActiveTab("bookings");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  //Get User Data
  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/getOneUserData", {
        withCredentials: true,
      });
      setUser(res.data.user);
      setProfilePic(res.data.user.profile_picture);
      return res.data.user.isOrganizer;
    } catch (error) {
      console.log(error.response.data?.error || error.message);
    }
  };
  const fetchOrganizerData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/Organizer/getOneOrganizerData",
        {
          withCredentials: true,
        }
      );
      setOrganizer(res.data.organizer);
    } catch (error) {
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      checkUserLogIn();
      isReqSend.current = true;
    }
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4000/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success(res.data.message, {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      setProfilePic("images/user_profile_pic/UserProfile_Pic.png");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
      navigate("/login");
    }
  };

  const prfile_nav = [
    ...(user.isOrganizer
      ? [
          { id: "businessProfile", label: "Business Profile", icon: Briefcase },
          { id: "dashboard", label: "Dashboard", icon: TrendingUp },
        ]
      : []),
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const InfoCard = ({ icon, label, value }) => (
    <div className="tw-bg-[#1a1a1a] tw-rounded-lg tw-p-4 tw-border tw-border-gray-800">
      <div className="tw-mb-2">{icon}</div>
      <span className="tw-text-gray-400 tw-text-sm tw-block tw-mb-1">
        {label}
      </span>
      <span className="tw-font-medium tw-text-white tw-text-sm tw-break-all">
        {value}
      </span>
    </div>
  );

  // === Variants for fade-up animation ===
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6, // smoother sequence
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const renderTabContent = () => {
    const content = {
      businessProfile: user.isOrganizer ? (
        <OrganizerDetailsSection
          organizer={organizer}
          setActiveTab={setActiveTab}
        />
      ) : (
        "businessProfile"
      ),
      dashboard: user.isOrganizer ? (
        <Organizer_dashboard tabVariants={tabVariants} />
      ) : (
        "dashboard"
      ),

      bookings: <User_Bookings tabVariants={tabVariants} />,

      settings: (
        <>
          <User_Setting
            user={user}
            tabVariants={tabVariants}
            fetchUserData={fetchUserData}
          />
          {user.isOrganizer && (
            <Organizer_Setting
              organizer={organizer}
              tabVariants={tabVariants}
              fetchOrganizerData={fetchOrganizerData}
            />
          )}
        </>
      ),
    };

    return content[activeTab];
  };

  return (
    <>
      {
        <>
          <div
            className="tw-min-h-screen tw-bg-[#0f0f0f]"
            style={{ fontFamily: "DM Sans Normal" }}
          >
            {isLoading && <LoadingScreen />}
            <div className={`${isLoading ? "tw-hidden" : ""}`}>
              <motion.div
                initial="hidden"
                animate="show"
                variants={containerVariants}
                className="tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f] tw-py-12 lg:tw-py-16"
              >
                <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-pt-[10%] lg:tw-pt-[8%]">
                  <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center lg:tw-items-start tw-gap-8 lg:tw-gap-12">
                    {/* === Profile Picture === */}
                    <motion.div
                      variants={fadeUp}
                      className="tw-flex tw-flex-col tw-items-center tw-gap-4 tw-mt-1"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="tw-w-40 tw-h-40 lg:tw-w-48 lg:tw-h-48 tw-rounded-full tw-overflow-hidden tw-border-4 tw-border-purple-500 tw-bg-[#1a1a1a] tw-shadow-2xl tw-relative group"
                      >
                        <motion.img
                          // animate only after the image has loaded
                          variants={fadeUp}
                          initial="hidden"
                          animate={imgLoaded ? "show" : "hidden"}
                          onLoad={() => setImgLoaded(true)}
                          src={`http://localhost:4000/${user.profile_picture}`}
                          alt="Profile"
                          className="tw-w-full tw-h-full tw-object-cover"
                          loading="lazy"
                        />
                        <label
                          htmlFor="profilePic"
                          className="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-30 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-opacity-0 group-hover:tw-opacity-100 tw-transition-all tw-cursor-pointer"
                        />
                      </motion.div>

                      {/* Become Organizer */}
                      {!user.isOrganizer && !user.isBlocked && (
                        <motion.div variants={fadeUp}>
                          <Link
                            to="/Register_Organizer"
                            className="tw-bg-transparent tw-no-underline tw-border-2 tw-border-gradient-to-r tw-from-orange-500 tw-to-pink-500 tw-text-orange-400 hover:tw-bg-gradient-to-r hover:tw-from-orange-500 hover:tw-to-pink-500 hover:tw-text-white tw-px-4 tw-py-3 tw-rounded-xl tw-font-semibold tw-shadow-lg tw-flex tw-items-center tw-gap-2 tw-transition-all tw-duration-500 tw-group"
                          >
                            <Crown className="tw-w-5 tw-h-5 tw-text-orange-400 group-hover:tw-text-white tw-transition-colors tw-duration-500" />
                            Become an Organizer
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* === User Info === */}
                    <motion.div
                      variants={fadeUp}
                      className="tw-flex-1 tw-text-center lg:tw-text-left"
                    >
                      {/* Username + Status + Logout */}
                      <motion.div
                        variants={fadeUp}
                        className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-justify-between tw-gap-4 tw-mb-6"
                      >
                        {/* Left side: Username + Status */}
                        <motion.div
                          variants={fadeUp}
                          className="tw-flex tw-flex-wrap tw-items-center tw-gap-4"
                        >
                          <motion.h1
                            variants={fadeUp}
                            className="tw-text-3xl tw-font-bold tw-text-white"
                            style={{ fontFamily: "DM Sans ExtraBold" }}
                          >
                            @{user.uname}
                          </motion.h1>

                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-semibold tw-border ${
                              user.isBlocked
                                ? "tw-bg-red-900/20 tw-text-red-300 tw-border-red-800"
                                : "tw-bg-green-900/20 tw-text-green-300 tw-border-green-800 hover:tw-border-red-400 tw-transition-all tw-duration-300 tw-text-sm"
                            }`}
                          >
                            <Shield className="tw-w-4 tw-h-4 " />
                            {user.isBlocked
                              ? "Blocked Account"
                              : "Active Account"}
                          </motion.span>
                        </motion.div>

                        {/* Right side: Logout Button */}
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleLogOut}
                          className="tw-mx-3 tw-bg-gradient-to-r tw-from-red-600 tw-to-red-500 hover:tw-from-red-700 hover:tw-to-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-full tw-font-medium tw-shadow-lg tw-flex tw-items-center tw-gap-2 tw-border tw-border-red-500/50 hover:tw-border-red-400 tw-transition-all tw-duration-300 tw-text-sm"
                        >
                          <LogOut className="tw-w-4 tw-h-4" />
                          <span className="tw-hidden sm:tw-inline">Logout</span>
                        </motion.button>
                      </motion.div>

                      {/* User Details Grid */}
                      <motion.div
                        variants={fadeUp}
                        className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-6 tw-text-gray-300 tw-mb-8"
                      >
                        <InfoCard
                          icon={
                            <Mail className="tw-w-5 tw-h-5 tw-text-purple-400" />
                          }
                          label="Email"
                          value={user.email}
                        />
                        <InfoCard
                          icon={
                            <User className="tw-w-5 tw-h-5 tw-text-pink-400" />
                          }
                          label="Gender"
                          value={user.gender}
                        />
                        <InfoCard
                          icon={
                            <MapPin className="tw-w-5 tw-h-5 tw-text-yellow-400" />
                          }
                          label="City"
                          value={user.city}
                        />
                        <InfoCard
                          icon={
                            <Clock className="tw-w-5 tw-h-5 tw-text-green-400" />
                          }
                          label="Member Since"
                          value={new Date(user.createdAt).toLocaleDateString()}
                        />
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        variants={fadeUp}
                        className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center lg:tw-justify-start"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 hover:tw-from-purple-700 hover:tw-to-purple-600 tw-text-white tw-px-8 tw-py-3 tw-rounded-lg tw-font-semibold tw-shadow-xl tw-flex tw-items-center tw-gap-2"
                          onClick={() => setActiveTab("settings")}
                        >
                          <Edit3 className="tw-w-5 tw-h-5" />
                          Update Profile
                        </motion.button>

                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="tw-bg-transparent tw-border-2 tw-border-pink-500 tw-text-pink-400 hover:tw-bg-pink-500 hover:tw-text-white tw-px-8 tw-py-3 tw-rounded-lg tw-font-semibold tw-flex tw-items-center tw-gap-2"
                        >
                          <Upload className="tw-w-5 tw-h-5" />
                          Share Profile
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              {user.isBlocked ? (
                <>
                  <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center tw-py-10 lg:tw-mt-14">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`tw-inline-flex tw-items-center tw-gap-3 tw-px-10 tw-py-5 
                              tw-rounded-full tw-text-lg sm:tw-text-xl md:tw-text-2xl 
                              tw-font-bold tw-border tw-transition tw-duration-300 
                              tw-bg-red-900/30 tw-text-red-300 tw-border-red-800
                            `}
                    >
                      <Shield className="tw-w-6 tw-h-6" />
                      Blocked Account
                    </motion.span>
                  </div>
                </>
              ) : (
                <>
                  {/* Navigation Tabs */}
                  <div className="tw-bg-gradient-to-r tw-from-[#1a1a1a] tw-to-[#111] tw-border-b tw-border-gray-800 tw-sticky tw-top-0 tw-py-5 tw-z-40 tw-shadow-lg">
                    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
                      <div className="tw-flex tw-space-x-6 tw-overflow-x-auto tw-scrollbar-hide">
                        {prfile_nav.map((tab) => {
                          const IconComponent = tab.icon;
                          const isActive = activeTab === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className={`tw-flex tw-items-center tw-gap-2 tw-py-3 tw-px-4 tw-rounded-lg tw-text-sm tw-font-medium tw-relative tw-border-none tw-outline-none
                            ${
                              isActive
                                ? "tw-text-purple-400 tw-bg-[#2a2a2a]"
                                : "tw-text-gray-400 tw-bg-[#1e1e1e] hover:tw-text-gray-200 hover:tw-bg-[#2a2a2a]"
                            }
                            tw-transition-colors tw-duration-300`}
                            >
                              <IconComponent className="tw-w-5 tw-h-5" />
                              {tab.label}
                              {isActive && (
                                <motion.div
                                  layoutId="activeTab"
                                  className="tw-absolute tw-bottom-0 tw-left-3 tw-right-3 tw-h-0.5 tw-rounded-full"
                                  style={{
                                    borderBottom: "1px solid #a855f7",
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
                    <AnimatePresence mode="wait">
                      {renderTabContent()}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Profile;
