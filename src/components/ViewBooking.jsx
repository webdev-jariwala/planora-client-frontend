import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  Ticket,
  User,
  IndianRupee,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewBooking = ({eventId,getRandomEventId}) => {
  // Sample booking data matching your API response structure
  const [bookings,setBookings] = useState([]);
  const [eventData,setEventData] = useState([]);
  const isReqSend = useRef(false);

  // const [bookings] = useState([
  //   {
  //     _id: "68d01bc393a50025339767b5",
  //     user_id: {
  //       _id: "68c9a4a59f021e57e63c4cca",
  //       uname: "rishin_mahatma",
  //     },
  //     event_id: {
  //       _id: "68cf015c52b4a921a1a9f756",
  //       title: "Active Event",
  //       event_start_date: "2025-09-30T19:31:00.000Z",
  //       event_end_date: "2025-10-03T19:31:00.000Z",
  //       total_tickets: 500,
  //       available_tickets: 469,
  //     },
  //     quantity: 4,
  //     total_amount: 920,
  //     order_date: "2025-09-21T15:37:39.728Z",
  //     createdAt: "2025-09-21T15:37:39.732Z",
  //     updatedAt: "2025-09-21T15:37:39.732Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "68d01c5693a50025339767c0",
  //     user_id: {
  //       _id: "68c9a4a59f021e57e63c4cca",
  //       uname: "rishin_mahatma",
  //     },
  //     event_id: {
  //       _id: "68cf015c52b4a921a1a9f756",
  //       title: "Active Event",
  //       event_start_date: "2025-09-30T19:31:00.000Z",
  //       event_end_date: "2025-10-03T19:31:00.000Z",
  //       total_tickets: 500,
  //       available_tickets: 469,
  //     },
  //     quantity: 4,
  //     total_amount: 920,
  //     order_date: "2025-09-21T15:40:06.881Z",
  //     createdAt: "2025-09-21T15:40:06.882Z",
  //     updatedAt: "2025-09-21T15:40:06.882Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "68d01c7e93a50025339767cb",
  //     user_id: {
  //       _id: "68c9a4a59f021e57e63c4cca",
  //       uname: "rishin_mahatma",
  //     },
  //     event_id: {
  //       _id: "68cf015c52b4a921a1a9f756",
  //       title: "Active Event",
  //       event_start_date: "2025-09-30T19:31:00.000Z",
  //       event_end_date: "2025-10-03T19:31:00.000Z",
  //       total_tickets: 500,
  //       available_tickets: 469,
  //     },
  //     quantity: 6,
  //     total_amount: 1380,
  //     order_date: "2025-09-21T15:40:46.330Z",
  //     createdAt: "2025-09-21T15:40:46.331Z",
  //     updatedAt: "2025-09-21T15:40:46.331Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "68d0258f4a47608adbcfad46",
  //     user_id: {
  //       _id: "68c9a4a59f021e57e63c4cca",
  //       uname: "rishin_mahatma",
  //     },
  //     event_id: {
  //       _id: "68cf015c52b4a921a1a9f756",
  //       title: "Active Event",
  //       event_start_date: "2025-09-30T19:31:00.000Z",
  //       event_end_date: "2025-10-03T19:31:00.000Z",
  //       total_tickets: 500,
  //       available_tickets: 469,
  //     },
  //     quantity: 10,
  //     total_amount: 2300,
  //     order_date: "2025-09-21T16:19:27.201Z",
  //     createdAt: "2025-09-21T16:19:27.204Z",
  //     updatedAt: "2025-09-21T16:19:27.204Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "68d02a104a47608adbcfad78",
  //     user_id: {
  //       _id: "68c9a4a59f021e57e63c4cca",
  //       uname: "rishin_mahatma",
  //     },
  //     event_id: {
  //       _id: "68cf015c52b4a921a1a9f756",
  //       title: "Active Event",
  //       event_start_date: "2025-09-30T19:31:00.000Z",
  //       event_end_date: "2025-10-03T19:31:00.000Z",
  //       total_tickets: 500,
  //       available_tickets: 469,
  //     },
  //     quantity: 7,
  //     total_amount: 1610,
  //     order_date: "2025-09-21T16:38:40.985Z",
  //     createdAt: "2025-09-21T16:38:40.985Z",
  //     updatedAt: "2025-09-21T16:38:40.985Z",
  //     __v: 0,
  //   },
  // ]);
  const getBookings = async () => {
      try {
          const res = await axios.get(`http://localhost:4000/booking/fetchOneByEventID/${eventId || await getRandomEventId()}`,{
            withCredentials: true  // 🔑 allow cookies
          });
          setBookings(res.data.Bookings);
          setEventData(res.data.eventData);
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!",{style:{fontFamily: "DM Sans ExtraBold"}});
        console.log(error.response.data?.error || error.message);
      }
    }

    useEffect(()=>{
      if(!isReqSend.current){
        getBookings();
        isReqSend.current = true;
      }
    },[]);

  // Extract event info from first booking (since all bookings are for the same event)
  const eventInfo =
    eventData.length > 0
      ? {
          name: eventData[0].title,
          totalTickets: eventData[0].total_tickets,
          availableTickets: eventData[0].available_tickets,
        }
      : {
          name: "No Event",
          totalTickets: 0,
          availableTickets: 0,
        };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Display 10 bookings per page
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  // Calculate current bookings to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  // Pagination function
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Calculate booking statistics
  const bookedSeats = bookings.reduce(
    (total, booking) => total + booking.quantity,
    0
  );
  const remainingSeats = eventInfo.availableTickets;

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format user ID helper (truncate for display)
  const formatUserId = (userId) => {
    return userId.length > 30 ? `${userId.substring(0, 30)}...` : userId;
  };

  // Format currency helper
  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f] tw-p-4 tw-font-sans">
      <div className="tw-max-w-6xl tw-mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="tw-bg-[#1f1f1f] tw-border tw-border-gray-700 tw-rounded-2xl tw-p-6 tw-shadow-xl tw-mb-8"
        >
          <div className="tw-flex tw-flex-col tw-lg:tw-flex-row tw-lg:tw-items-center tw-lg:tw-justify-between tw-gap-6">
            <div>
              <h1
                className="tw-text-3xl tw-font-bold tw-text-white tw-mb-2"
                style={{ fontFamily: "DM Sans Bold" }}
              >
                {eventInfo.name}
              </h1>
              <p
                className="tw-text-gray-400 tw-font-medium"
                style={{ fontFamily: "DM Sans Normal" }}
              >
                Event ID:{" "}
                {eventId}
              </p>
            </div>

            <div className="tw-grid tw-grid-cols-3 tw-gap-4">
              <div className="tw-text-center tw-bg-blue-900/20 tw-p-4 tw-rounded-xl tw-border tw-border-blue-800">
                <div className="tw-flex tw-items-center tw-justify-center tw-mb-2">
                  <Ticket className="tw-w-5 tw-h-5 tw-text-blue-400 tw-mr-2" />
                  <span
                    className="tw-text-2xl tw-font-bold tw-text-blue-300"
                    style={{ fontFamily: "DM Sans Bold" }}
                  >
                    {eventInfo.totalTickets}
                  </span>
                </div>
                <p
                  className="tw-text-sm tw-text-blue-400 tw-font-semibold"
                  style={{ fontFamily: "DM Sans SemiBold" }}
                >
                  Total Seats
                </p>
              </div>

              <div className="tw-text-center tw-bg-green-900/20 tw-p-4 tw-rounded-xl tw-border tw-border-green-800">
                <div className="tw-flex tw-items-center tw-justify-center tw-mb-2">
                  <Users className="tw-w-5 tw-h-5 tw-text-green-400 tw-mr-2" />
                  <span
                    className="tw-text-2xl tw-font-bold tw-text-green-300"
                    style={{ fontFamily: "DM Sans Bold" }}
                  >
                    {bookedSeats}
                  </span>
                </div>
                <p
                  className="tw-text-sm tw-text-green-400 tw-font-semibold"
                  style={{ fontFamily: "DM Sans SemiBold" }}
                >
                  Booked Seats
                </p>
              </div>

              <div className="tw-text-center tw-bg-orange-900/20 tw-p-4 tw-rounded-xl tw-border tw-border-orange-800">
                <div className="tw-flex tw-items-center tw-justify-center tw-mb-2">
                  <Ticket className="tw-w-5 tw-h-5 tw-text-orange-400 tw-mr-2" />
                  <span
                    className="tw-text-2xl tw-font-bold tw-text-orange-300"
                    style={{ fontFamily: "DM Sans Bold" }}
                  >
                    {remainingSeats}
                  </span>
                </div>
                <p
                  className="tw-text-sm tw-text-orange-400 tw-font-semibold"
                  style={{ fontFamily: "DM Sans SemiBold" }}
                >
                  Remaining
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bookings Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="tw-space-y-4"
        >
          <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
            <h2
              className="tw-text-2xl tw-font-bold tw-text-white"
              style={{ fontFamily: "DM Sans Bold" }}
            >
              Booking Details ({bookings.length} bookings)
            </h2>
            <div className="tw-text-gray-400 tw-text-sm">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {/* Current Page Bookings */}
          <div className="tw-space-y-2">
            <AnimatePresence mode="wait">
              {currentBookings.map((booking, index) => (
                <motion.div
                  key={`${booking._id}-${index}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    scale: 1.01,
                    transition: { duration: 0.2 },
                  }}
                  className="tw-bg-[#222222] tw-border tw-border-gray-700 tw-rounded-lg tw-p-4 tw-hover:bg-gray-700 tw-transition-colors tw-duration-300 tw-cursor-pointer"
                >
                  <div className="tw-flex tw-items-center tw-justify-between tw-gap-4">
                    {/* User Info */}
                    <div className="tw-flex tw-items-center tw-overflow-hidden tw-flex-1">
                      <div className="tw-bg-indigo-900/30 tw-p-2 tw-rounded-lg tw-mr-3 tw-flex-shrink-0">
                        <User className="tw-w-4 tw-h-4 tw-text-indigo-400" />
                      </div>
                      <div className="tw-min-w-0 tw-flex-1">
                        <div className="tw-overflow-x-auto tw-pb-1">
                          <p
                            className="tw-font-semibold tw-text-white tw-whitespace-nowrap tw-text-sm"
                            style={{ fontFamily: "DM Sans SemiBold" }}
                            title={booking.user_id.uname}
                          >
                            {formatUserId(booking.user_id.uname)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
                      <Ticket className="tw-w-4 tw-h-4 tw-text-blue-400" />
                      <span
                        className="tw-font-bold tw-text-white tw-text-sm"
                        style={{ fontFamily: "DM Sans Bold" }}
                      >
                        {booking.quantity}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
                      <IndianRupee className="tw-w-4 tw-h-4 tw-text-green-400" />
                      <span
                        className="tw-font-bold tw-text-white tw-text-sm"
                        style={{ fontFamily: "DM Sans Bold" }}
                      >
                        {formatCurrency(booking.total_amount)}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="tw-flex tw-items-center tw-gap-1 tw-flex-shrink-0">
                      <Calendar className="tw-w-4 tw-h-4 tw-text-purple-400" />
                      <span
                        className="tw-font-semibold tw-text-gray-300 tw-text-sm"
                        style={{ fontFamily: "DM Sans SemiBold" }}
                      >
                        {formatDate(booking.order_date)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="tw-flex tw-justify-center tw-items-center tw-gap-2 tw-mt-6">
              {/* Prev Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`tw-w-10 tw-h-10 tw-rounded-lg tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none tw-transition-all tw-duration-200 ${
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
                  className="tw-w-10 tw-h-10 tw-rounded-lg tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none hover:tw-bg-gray-800 tw-transition-all tw-duration-200"
                >
                  {index + 1}
                </motion.button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`tw-w-10 tw-h-10 tw-rounded-lg tw-text-2xl tw-font-semibold tw-flex tw-items-center tw-justify-center tw-border-none tw-outline-none tw-transition-all tw-duration-200 ${
                  currentPage === totalPages
                    ? "tw-bg-gray-900 tw-text-gray-600 tw-cursor-not-allowed"
                    : "tw-bg-gray-900 hover:tw-bg-gray-800 tw-text-gray-100"
                }`}
              >
                »
              </button>
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tw-text-center tw-py-12"
          >
            <div className="tw-bg-[#1f1f1f] tw-border tw-border-gray-700 tw-rounded-2xl tw-p-8">
              <Users className="tw-w-16 tw-h-16 tw-text-gray-500 tw-mx-auto tw-mb-4" />
              <h3
                className="tw-text-xl tw-font-bold tw-text-white tw-mb-2"
                style={{ fontFamily: "DM Sans Bold" }}
              >
                No Bookings Yet
              </h3>
              <p
                className="tw-text-gray-400"
                style={{ fontFamily: "DM Sans Normal" }}
              >
                Bookings will appear here once customers start purchasing
                tickets.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .tw-custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .tw-custom-scrollbar::-webkit-scrollbar-track {
          background: #222222;
          border-radius: 3px;
        }
        .tw-custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(255, 255, 255, 0.5);
          border-radius: 3px;
        }
        .tw-custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333333;
        }
      `}</style>
    </div>
  );
};

export default ViewBooking;
