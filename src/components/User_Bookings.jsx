import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, CreditCard } from "lucide-react";
import axios from "axios";
import logo from '../assets/evenuefylogo-removebg-preview.png'
import { useNavigate } from "react-router-dom";

const User_Bookings = ({ tabVariants }) => {
  const navigate = useNavigate();
  const isReqSend = useRef(false);
  const [bookings,setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Animation variants
  const bookingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const fetchBookingData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/booking/fetchOneByUserID",{
        withCredentials:true, 
      });
      setBookings(res.data.Bookings);
    } catch (error) {
      console.log(error.response.data?.error || error.message);
    }
  }

  useEffect(()=>{
    if(!isReqSend.current){
      fetchBookingData();
      isReqSend.current = true;
    }
  },[]);
  
  if (bookings.length === 0) {
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-[70vh] tw-px-4">
      <div className="tw-bg-[#1a1a1a]/80 tw-backdrop-blur-lg tw-rounded-3xl tw-shadow-2xl tw-px-10 tw-py-14 tw-text-center tw-transition-transform tw-transform hover:tw-scale-105">
        <img
          src={logo} 
          height={'75px'}
          alt="No Bookings"
          className='tw-logo-image tw-mx-auto tw-mb-6 tw-animate-bounce'
          style={{
            filter: "brightness(0) invert(1)",
                      transition: 'all 0.3s ease',
            }}
        />
        <h2 className="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-purple-400 tw-to-pink-500 tw-font-extrabold tw-text-4xl md:tw-text-5xl">
          No Bookings Found
        </h2>
        <p className="tw-text-gray-400 tw-mt-4 tw-text-lg md:tw-text-xl">
          It looks like you haven’t made any bookings yet.
        </p>
        <button onClick={()=>navigate('/Events')} className="tw-mt-6 tw-bg-purple-600 hover:tw-bg-purple-700 tw-text-white tw-font-semibold tw-px-6 tw-py-3 tw-rounded-full tw-shadow-lg tw-transition-all">
          Browse Events
        </button>
      </div>
    </div>
  );
}

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="tw-space-y-6"
    >
      <div className="tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2">
          <Calendar className="tw-w-6 tw-h-6 tw-text-purple-400" />
          My Bookings
        </h3>
      </div>

      {/* Bookings */}
      <div className="tw-grid tw-gap-4">
        <AnimatePresence mode="wait">
          {currentBookings.map((booking) => (
            <motion.div
              key={booking._id}
              variants={bookingVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
              whileHover={{ x: 5 }}
              className="tw-bg-gradient-to-br tw-from-[#111111] tw-to-[#1a1a1a] tw-rounded-xl tw-p-6 tw-border tw-border-gray-800 hover:tw-border-purple-700 tw-transition-all tw-shadow-lg"
            >
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-items-start sm:tw-items-center tw-gap-6">
                <div className="tw-flex-1">
                  <div className="tw-flex tw-items-center tw-gap-3 tw-mb-3">
                    <h4 className="tw-font-semibold tw-text-white tw-text-xl">
                      {booking.event_id.title}
                    </h4>
                    <span className="tw-text-xs tw-font-semibold tw-bg-purple-800/30 tw-text-purple-300 tw-px-3 tw-py-1 tw-mb-2 tw-rounded-full">
                      Qty: {booking.quantity}
                    </span>
                  </div>
                  <div className="tw-text-gray-400 tw-text-sm tw-space-y-2">
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <Clock className="tw-w-4 tw-h-4 tw-text-purple-400" />
                      <span>
                        Order:{" "}
                        {new Date(booking.order_date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2">
                      <Clock className="tw-w-4 tw-h-4 tw-text-purple-400" />
                      <span>
                        Event:{" "}
                        {new Date(
                          booking.event_id.event_start_date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(
                          booking.event_id.event_end_date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-purple-300 tw-font-medium">
                      <CreditCard className="tw-w-4 tw-h-4" />
                      <span>Total Paid: ₹ {booking.total_amount}</span>
                    </div>
                  </div>
                </div>

                <div className="tw-flex tw-items-center">
                  <span className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium tw-bg-green-900/50 tw-text-green-300 tw-border tw-border-green-800">
                    <CheckCircle className="tw-w-4 tw-h-4" />
                    Confirmed
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
    </motion.div>
  );
};

export default User_Bookings;
