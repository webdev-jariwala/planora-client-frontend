import React, { useState } from "react";
import "./App.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import AppWrapper from "./components/Routes";


export default function App() {
  const [profilePic, setProfilePic] = useState(
    "images/user_profile_pic/UserProfile_Pic.png"
  );
  const [filters, setFilters] = useState({
    category: "",
    state: "",
    city: "",
    search: "",
  });

  return (
    <Router>
      <AppWrapper
        profilePic={profilePic}
        setProfilePic={setProfilePic}
        filters={filters}
        setFilters={setFilters}
      />
      <ToastContainer position="top-right" autoClose={4000} />
    </Router>
  );
}
