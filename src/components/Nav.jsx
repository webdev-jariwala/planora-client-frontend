import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../assets/evenuefy-logo.png";
import axios from "axios";

const Nav = ({ profilePic, setProfilePic, filters, setFilters }) => {
  const navigate = useNavigate();
  const isReqSend = useRef(false);

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message === "New User") {
        navigate("/Signup");
      } else if (res.data.message === "User is already logged In") {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response.data?.message ===
        "Login Session Expired. You need to log in again."
      ) {
        navigate("/login");
      }
      console.log(error.response.data?.error || error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/getOneUserData", {
        withCredentials: true,
      });
      setProfilePic(res.data.user.profile_picture);
    } catch (error) {
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    if (!isReqSend.current) {
      fetchUserData();
      isReqSend.current = true;
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/Events");
  };

  return (
    <>
      <style>
        {`
          .modern-nav-link {
            position: relative;
            padding-bottom: 8px !important;
          }
          .link-underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            /* Multi-color gradient inspired by Evenuefy logo */
            background: linear-gradient(90deg, #ff5e7e 0%, #a881c1 50%, #8ca1ef 100%);
            transition: width 0.3s ease-in-out;
            border-radius: 2px;
          }
          .modern-nav-link:hover .link-underline, 
          .active-link .link-underline {
            width: 100%;
          }
          .active-link .link-text {
            color: #a881c1 !important;
          }
        `}
      </style>

      <nav
        className="navbar navbar-expand-lg modern-navbar"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(248,248,248,0) 100%)",
          fontFamily: "DM Sans ExtraBold",
          height: "100px",
          width: "99vw",
          backdropFilter: "blur(15px)",
          padding: "0 40px",
          position: "absolute",
          transitionDuration: "0s",
        }}
      >
        <div className="container-fluid px-0">
          <Link
            to="/"
            className="navbar-brand logo-container"
            style={{ marginRight: "60px" }}
          >
            <span>
              <img
                src={logo}
                height={"40px"}
                className="logo-image"
                style={{
                  filter: " invert(0)",
                  transition: "all 0.3s ease",
                }}
              />
            </span>
          </Link>

          <button
            className="navbar-toggler modern-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              border: "none",
              outline: "none",
              transform: "all 0.5s ease",
            }}
          >
            <span
              className="navbar-toggler-icon"
              style={{ border: "none", outline: "none" }}
            ></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="desktop-layout d-flex justify-content-between align-items-center w-100 ">
              <ul
                className="navbar-nav nav-links-container"
                style={{
                  gap: "42px",
                  fontSize: "18px",
                  marginLeft: "120px",
                }}
              >
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text">Home</span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Events"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text">Events</span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/aboutUs"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text">About Us</span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contactUs"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text">Contact Us</span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
              </ul>

              <form
                className="d-flex search-form desktop-search"
                style={{ marginRight: "20px" }}
              >
                <div className="search-container">
                  <input
                    type="search"
                    className="form-control search-input"
                    placeholder="Search Event"
                    aria-label="search"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="btn search-btn"
                    onClick={(e) => handleSearch(e)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ marginRight: "5px" }}
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Search
                  </button>
                </div>
              </form>
            </div>

            <div className="mobile-layout">
              <ul className="navbar-nav nav-links-container">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text" style={{ color: "Black" }}>
                      Home
                    </span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/Events"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text" style={{ color: "Black" }}>
                      Events
                    </span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/aboutUs"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text" style={{ color: "Black" }}>
                      About Us
                    </span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contactUs"
                    className={({ isActive }) =>
                      `nav-link modern-nav-link ${
                        isActive ? "active-link" : "inactive-link"
                      }`
                    }
                  >
                    <span className="link-text" style={{ color: "Black" }}>
                      Contact Us
                    </span>
                    <div className="link-underline"></div>
                  </NavLink>
                </li>
              </ul>

              <form className="d-flex search-form mobile-search">
                <div className="search-container">
                  <input
                    type="search"
                    className="form-control search-input"
                    placeholder="Search Event"
                    aria-label="search"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="btn search-btn"
                    onClick={(e) => handleSearch(e)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="profile_pic_div tw-flex tw-justify-center tw-items-center tw-rounded-full tw-transform tw-transition-all tw-duration-500 tw-ease-in-out hover:tw--translate-y-3 hover:tw-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
            style={{ marginRight: "-1%" }}
          >
            <div
              className={`${
                profilePic == "images/user_profile_pic/UserProfile_Pic.png"
                  ? "tw-bg-indigo-50"
                  : "tw-bg-transparent"
              } profile_pic tw-h-14 tw-w-14 tw-rounded-full tw-overflow-hidden tw-transition-all tw-duration-300 tw-ease-in-out`}
              style={{
                border: "3px solid rgba(99, 102, 241, 0.4)",
                borderRadius: "50%",
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
              }}
            >
              <img
                src={`http://localhost:4000/${profilePic}`}
                className="tw-w-full tw-h-full tw-object-cover"
                onClick={checkUserLogIn}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;