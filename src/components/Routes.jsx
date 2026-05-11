import React, { useEffect, useRef, useState } from "react";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";

import Nav from "./Nav";
import Home from "../Pages/Home";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import Update_User_Profile from "./Update_User_Profile";
import Profile from "../Pages/Profile";
import Register_Organizer from "./Register_Organizer";
import OrganizerMainDashboard from "../Pages/OrganizerMainDashboard";
import Events from "../Pages/Events";
import EventDetailsPage from "../Pages/EventDetailsPage";
import ForgotPassword from "./ForgotPassword";
import MaintenancePage from "../Pages/MaintenancePage";
import NotFoundPage from "../Pages/NotFoundPage";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import ChatBot from "./ChatBot";

function AppWrapper({ profilePic, setProfilePic, filters, setFilters }) {
  const location = useLocation();
  const isPostBack = useRef(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [showChatBot, setshowChatBot] = useState(false);

  const noNavFooterPaths = [
    "/login",
    "/Signup",
    "/OrganizerMainDashboard",
    "/ForgotPassword",
  ];

  const noChatBotPaths = ["/login", "/Signup", "/ForgotPassword"];

  const noChatBotPathsForFullScreen = ["/", "/aboutUs", "/contactUs"];

  const knownPaths = [
    "/",
    "/Events",
    "/EventDetailsPage",
    "/About_Us",
    "/Contact_Us",
    "/Product_Details",
    "/Signup",
    "/login",
    "/aboutUs",
    "/contactUs",
    "/ForgotPassword",
    "/profile",
    "/updateprofile",
    "/Register_Organizer",
    "/OrganizerMainDashboard",
  ];

  // ✅ Detect if route exists in our defined <Routes>
  const routeExists = knownPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(path + "/")
  );

  const isUnknownRoute = !routeExists;

  // ✅ Hide nav/footer if noNavFooterPaths OR unknown route
  const hideNavFooter =
    noNavFooterPaths.includes(location.pathname) || isUnknownRoute;

  const hideChatbot =
    noChatBotPaths.includes(location.pathname) || isUnknownRoute;

  const fetchSiteSettings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/siteSettings/fetchAll",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMaintenanceMode(res.data.MaintenanceMode);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  const handleScroll = () => {
    if (
      window.scrollY > 400 &&
      noChatBotPathsForFullScreen.includes(location.pathname)
    ) {
      setshowChatBot(true);
    } else if (
      window.scrollY < 400 &&
      noChatBotPathsForFullScreen.includes(location.pathname)
    ) {
      setshowChatBot(false);
    } else if (!noChatBotPathsForFullScreen.includes(location.pathname)) {
      setshowChatBot(true);
    }
  };

  useEffect(() => {
    if (!isPostBack.current) {
      fetchSiteSettings();
      isPostBack.current = true;
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  if (maintenanceMode) {
    return (
      <>
        <Routes>
          <Route path="/" element={<MaintenancePage />} />
          <Route path="*" element={<MaintenancePage />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      {!hideNavFooter && (
        <Nav
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <motion.div
        key="chatBotContainer"
        initial={false} // ✅ Prevent re-animation on mount
        animate={
          !hideChatbot && showChatBot
            ? { opacity: 1, x: 20, y: 30 } // visible state
            : { opacity: 0, x: 50, y: 30 } // hidden state (still mounted)
        }
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`tw-fixed ${
          location.pathname == "/OrganizerMainDashboard"
            ? "-tw-left-3"
            : "tw-right-8"
        } tw-bottom-8 tw-z-50`}
        style={{
          pointerEvents: !hideChatbot && showChatBot ? "auto" : "none", // ✅ prevents clicks when hidden
        }}
      >
        <ChatBot key={"chatBot"} />
      </motion.div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Events"
          element={<Events filters={filters} setFilters={setFilters} />}
        />
        <Route path="/EventDetailsPage/:id" element={<EventDetailsPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route
          path="/profile"
          element={<Profile setProfilePic={setProfilePic} />}
        />
        <Route path="/updateprofile" element={<Update_User_Profile />} />
        <Route path="/Register_Organizer" element={<Register_Organizer />} />
        <Route
          path="/OrganizerMainDashboard"
          element={<OrganizerMainDashboard />}
        />
        {/* <Route path="/Create_Event" element={<Create_Event />} /> */}
        {/* <Route path="/View_All_Events" element={<View_All_Events />} />
        <Route path="/Manage_Bookings" element={<Manage_Bookings />} />
        <Route path="/Create_Event" element={<Create_Event />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default AppWrapper;
