import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const Events = ({ filters, setFilters }) => {
  const isReqSend = useRef(false);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 6 events per page as requested

  const getEvents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/event/fetchAll", {
        withCredentials: true, // 🔑 allow cookies
      });
      setEvents(res.data.event);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    if (!isReqSend.current) {
      getEvents();
      isReqSend.current = true;
    }
  }, []);

  // Get unique filter options
  const filterOptions = useMemo(() => {
    const categories = [
      ...new Set(events.map((event) => event.category_id.name)),
    ];
    const states = [...new Set(events.map((event) => event.state_id.name))];
    const cities = [...new Set(events.map((event) => event.city_id.name))];

    return { categories, states, cities };
  }, [events]);

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    const now = new Date(); // Current date-time
    const filtered = events.filter((event) => {
      const matchesCategory =
        !filters.category || event.category_id.name === filters.category;
      const matchesState =
        !filters.state || event.state_id.name === filters.state;
      const matchesCity = !filters.city || event.city_id.name === filters.city;
      const matchesSearch =
        !filters.search ||
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.venue.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        event.status == "upcoming" || event.status == "ongoing";

      return (
        matchesCategory &&
        matchesState &&
        matchesCity &&
        matchesSearch &&
        matchesStatus
      );
    });

    // Reset to page 1 when filters change
    setCurrentPage(1);

    return filtered;
  }, [events, filters]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Pagination functions
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of events section when page changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ category: "", state: "", city: "", search: "" });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge styles
  const getStatusBadge = (status) => {
    const baseClasses =
      "tw-px-3 tw-py-1 tw-rounded-lg tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide";

    switch (status) {
      case "upcoming":
        return `${baseClasses} tw-bg-emerald-500/20 tw-text-emerald-400 tw-border tw-border-emerald-500/30`;
      case "completed":
        return `${baseClasses} tw-bg-gray-500/20 tw-text-gray-400 tw-border tw-border-gray-500/30`;
      case "draft":
        return `${baseClasses} tw-bg-amber-500/20 tw-text-amber-400 tw-border tw-border-amber-500/30`;
      case "canceled":
        return `${baseClasses} tw-bg-red-500/20 tw-text-red-400 tw-border tw-border-red-500/30`;
      default:
        return `${baseClasses} tw-bg-gray-500/20 tw-text-gray-400 tw-border tw-border-gray-500/30`;
    }
  };

  // Get ticket availability indicator
  const getTicketAvailability = (available, total) => {
    const percentage = (available / total) * 100;

    if (available === 0) {
      return {
        color: "tw-text-red-400",
        text: "Sold Out",
        bg: "tw-bg-red-500/10",
      };
    } else if (percentage <= 20) {
      return {
        color: "tw-text-amber-400",
        text: "Few Left",
        bg: "tw-bg-amber-500/10",
      };
    } else {
      return {
        color: "tw-text-emerald-400",
        text: "Available",
        bg: "tw-bg-emerald-500/10",
      };
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#0f0f0f] tw-to-[#1a1a1a]  tw-font-sans">
      <div className="tw-container tw-mx-auto tw-p-4 tw-pt-[25%] sm:tw-pt-[20%] md:tw-pt-[15%] lg:tw-pt-[10%] tw-pb-20">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-8">
          {/* Left Filter Column */}
          <div className="tw-w-full lg:tw-w-1/4">
            <div className="tw-bg-gradient-to-t tw-from-[#1a1a1a] tw-to-[#111] tw-backdrop-blur-sm tw-rounded-2xl tw-p-6 tw-border tw-border-gray-800/50">
              <h2 className="tw-text-white tw-font-semibold tw-text-xl tw-mb-6">
                Filters
              </h2>

              {/* Category Filter */}
              <div className="tw-mb-4">
                <label className="tw-text-gray-300 tw-font-semibold tw-mb-2 tw-block tw-text-sm">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="tw-w-full tw-bg-[#202020] tw-text-gray-100 tw-outline-none tw-rounded-xl tw-p-3 tw-border tw-border-gray-700/50 focus:tw-ring-2 focus:tw-ring-blue-500/50 focus:tw-border-blue-500/50 tw-transition-all"
                >
                  <option value="">All Categories</option>
                  {filterOptions.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div className="tw-mb-4">
                <label className="tw-text-gray-300 tw-font-semibold tw-mb-2 tw-block tw-text-sm">
                  State
                </label>
                <select
                  value={filters.state}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, state: e.target.value }))
                  }
                  className="tw-w-full tw-bg-[#202020] tw-text-gray-100 tw-outline-none tw-rounded-xl tw-p-3 tw-border tw-border-gray-700/50 focus:tw-ring-2 focus:tw-ring-blue-500/50 focus:tw-border-blue-500/50 tw-transition-all"
                >
                  <option value="">All States</option>
                  {filterOptions.states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div className="tw-mb-6">
                <label className="tw-text-gray-300 tw-font-semibold tw-mb-2 tw-block tw-text-sm">
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, city: e.target.value }))
                  }
                  className="tw-w-full tw-bg-[#202020] tw-text-gray-100 tw-outline-none tw-rounded-xl tw-p-3 tw-border tw-border-gray-700/50 focus:tw-ring-2 focus:tw-ring-blue-500/50 focus:tw-border-blue-500/50 tw-transition-all"
                >
                  <option value="">All Cities</option>
                  {filterOptions.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="tw-w-full tw-bg-[#a855f7] tw-text-white tw-rounded-xl tw-p-3 tw-font-semibold hover:tw-from-violet-700 hover:tw-to-violet-800 tw-transition-all tw-duration-200 tw-shadow-lg hover:tw-shadow-violet-500/25"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Right Events Column */}
          <div className="tw-w-full lg:tw-w-3/4">
            {/* Results Count */}
            <div className="tw-mb-6">
              <p className="tw-text-gray-400 tw-font-normal">
                Showing {currentEvents.length} of {filteredEvents.length} events
                {totalPages > 1 && (
                  <span className="tw-ml-2 tw-text-gray-500">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </p>
            </div>

            {/* Events Grid */}
            {currentEvents.length > 0 ? (
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                {currentEvents.map((event) => {
                  const ticketInfo = getTicketAvailability(
                    event.available_tickets,
                    event.total_tickets
                  );
                  const eventImage = event.previous_event_photos[0];

                  return (
                    <div
                      key={event._id}
                      data-aos="fade-up"
                      className="tw-group tw-bg-gradient-to-b tw-from-[#202020] tw-to-[#0a0a0a] tw-shadow-xl tw-shadow-black/50 tw-backdrop-blur-sm tw-rounded-2xl tw-border tw-border-gray-800/50 tw-overflow-hidden hover:tw-border-gray-700/70 tw-transition-all tw-duration-300 tw-cursor-pointer hover:tw-transform hover:tw-scale-[1.02]"
                      onClick={() => navigate(`/EventDetailsPage/${event._id}`)}
                    >
                      {/* Event Image */}
                      <div className="tw-relative tw-h-48 tw-overflow-hidden">
                        {eventImage ? (
                          <img
                            src={`http://localhost:4000/${eventImage}`}
                            alt={event.title}
                            className="tw-w-full tw-h-full tw-object-cover group-hover:tw-scale-110 tw-transition-transform tw-duration-500"
                          />
                        ) : (
                          <div className="tw-w-full tw-h-full tw-bg-gradient-to-br tw-from-blue-600 tw-to-purple-700"></div>
                        )}
                        <div className="tw-absolute tw-inset-0 tw-bg-black/20 group-hover:tw-bg-black/10 tw-transition-all"></div>

                        {/* Status Badge */}
                        <div className="tw-absolute tw-top-4 tw-left-4">
                          <span className={getStatusBadge(event.status)}>
                            {event.status}
                          </span>
                        </div>

                        {/* Category Badge */}
                        <div className="tw-absolute tw-top-4 tw-right-4">
                          <span className="tw-px-3 tw-py-1 tw-rounded-lg tw-text-xs tw-font-semibold tw-bg-white/20 tw-text-white tw-backdrop-blur-sm tw-border tw-border-white/20">
                            {event.category_id.name}
                          </span>
                        </div>
                      </div>

                      {/* Event Content */}
                      <div className="tw-p-6">
                        {/* Title */}
                        <h3 className="tw-text-xl tw-font-bold tw-text-white tw-mb-3 tw-line-clamp-2 group-hover:tw-text-blue-400 tw-transition-colors">
                          {event.title}
                        </h3>

                        {/* Event Details */}
                        <div className="tw-space-y-2 tw-mb-4">
                          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-400">
                            <svg
                              className="tw-w-4 tw-h-4 tw-text-blue-400 tw-flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="tw-text-sm tw-font-normal">
                              {formatDate(event.event_start_date)} •{" "}
                              {formatTime(event.event_start_date)}
                            </span>
                          </div>
                          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-400">
                            <svg
                              className="tw-w-4 tw-h-4 tw-text-blue-400 tw-flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="tw-text-sm tw-font-normal tw-line-clamp-1">
                              {event.venue}
                            </span>
                          </div>
                          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-400">
                            <svg
                              className="tw-w-4 tw-h-4 tw-text-blue-400 tw-flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="tw-text-sm tw-font-normal">
                              {event.city_id.name}, {event.state_id.name}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="tw-text-gray-500 tw-text-sm tw-line-clamp-2 tw-mb-4 tw-font-normal tw-leading-relaxed">
                          {event.description}
                        </p>

                        {/* Bottom Section */}
                        <div className="tw-flex tw-justify-between tw-items-center tw-pt-4 tw-border-t tw-border-gray-800/50">
                          {/* Price */}
                          <div className="tw-flex tw-items-center tw-gap-2">
                            <span className="tw-text-2xl tw-font-bold tw-text-white">
                              <IndianRupee className="tw-w-5 tw-h-5 tw-mb-[3.5px] tw-text-green-400" />
                              {event.price.toLocaleString()}
                            </span>
                            <span className="tw-text-gray-500 tw-text-sm tw-font-normal">
                              per ticket
                            </span>
                          </div>

                          {/* Ticket Availability */}
                          <div
                            className={`tw-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-rounded-lg ${ticketInfo.bg} tw-border tw-border-gray-700/50`}
                          >
                            <div
                              className={`tw-w-2 tw-h-2 tw-rounded-full ${
                                event.available_tickets === 0
                                  ? "tw-bg-red-400"
                                  : event.available_tickets /
                                      event.total_tickets <=
                                    0.2
                                  ? "tw-bg-amber-400"
                                  : "tw-bg-emerald-400"
                              }`}
                            ></div>
                            <span
                              className={`tw-font-semibold tw-text-sm ${ticketInfo.color}`}
                            >
                              {event.available_tickets} left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Events Found */
              <div className="tw-text-center tw-py-12">
                <div className="tw-bg-[#1a1a1a] tw-backdrop-blur-sm tw-rounded-2xl tw-p-8 tw-border tw-border-gray-800/50">
                  <div className="tw-w-16 tw-h-16 tw-bg-[#a855f7] tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-4">
                    <svg
                      className="tw-w-8 tw-h-8 tw-text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="tw-text-white tw-font-semibold tw-text-xl tw-mb-2">
                    No events found
                  </h3>
                  <p className="tw-text-gray-400 tw-font-normal tw-mb-4">
                    Try adjusting your filters or search terms to find more
                    events.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="tw-bg-[#a855f7] tw-text-white tw-rounded-xl tw-px-6 tw-py-2 tw-font-semibold hover:tw-from-violet-700 hover:tw-to-violet-800 tw-transition-all tw-duration-200 tw-shadow-lg hover:tw-shadow-violet-500/25"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-mt-8">
                {/* Prev Button */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`tw-w-10 tw-h-10 tw-rounded-lg tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none ${
                    currentPage === 1
                      ? "tw-bg-gray-900 tw-text-gray-600 tw-cursor-not-allowed"
                      : "tw-bg-gray-900 hover:tw-bg-gray-800 tw-text-gray-100"
                  }`}
                >
                  «
                </button>

                {/* Page Numbers with animation */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <motion.button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    animate={{
                      scale: currentPage === index + 1 ? 1.1 : 1,
                      backgroundColor:
                        currentPage === index + 1 ? "#6b21a8" : "#1a1a1a",
                      color: currentPage === index + 1 ? "#fff" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                    className="tw-w-10 tw-h-10 tw-rounded-lg tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none hover:tw-bg-gray-800"
                  >
                    {index + 1}
                  </motion.button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`tw-w-10 tw-h-10 tw-rounded-lg tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none ${
                    currentPage === totalPages
                      ? "tw-bg-gray-900 tw-text-gray-600 tw-cursor-not-allowed"
                      : "tw-bg-gray-900 hover:tw-bg-gray-800 tw-text-gray-100"
                  }`}
                >
                  »
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
