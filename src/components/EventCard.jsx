import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Eye, Edit, X, Ticket } from "lucide-react";

const EventCard = ({
  event,
  handleUpdateEvent,
  handleCancelEvent,
  handleViewEvent,
  handleViewBooking,
}) => {
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

  const statusBadge = statusConfig[event.status] || statusConfig.upcoming;
  const isUpcoming = event.status === "upcoming";
  const isDraft = event.status === "draft";

  const formatDateTime = (isoString) => {
    const dateObj = new Date(isoString);

    // Extract date in YYYY-MM-DD
    const date = dateObj.toISOString().split("T")[0];

    // Format time in hh:mm AM/PM
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    const time = dateObj.toLocaleTimeString("en-US", options);

    return { date, time };
  };
  return (
    <motion.div
      key={event._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f] tw-rounded-xl tw-p-6 tw-border tw-border-gray-800 tw-relative tw-overflow-hidden tw-group hover:tw-border-gray-700 tw-transition-all tw-duration-300"
      style={{
        backgroundImage: `url(http://localhost:4000/${event.previous_event_photos[0].replace(
          /\\/g,
          "/"
        )})`,
        backgroundSize: "cover",
      }}
    >
      <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-5 group-hover:tw-opacity-25 tw-transition-opacity"></div>
      <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-65"></div>

      {/* Eye icon */}
      {!isDraft && (
        <div className="tw-absolute tw-top-6 tw-right-6 tw-z-20">
          <button
            onClick={() => handleViewEvent(event._id)}
            className="tw-bg-[#1a1a1a] hover:tw-bg-[#282828] tw-w-10 tw-h-10 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-colors tw-text-white tw-shadow-lg"
            title="View Details"
          >
            <Eye className="tw-w-4 tw-h-4" />
          </button>
        </div>
      )}

      <div className="tw-relative tw-z-10">
        {/* Title & Status */}
        <div className="tw-mb-4">
          <h3 className="tw-text-xl tw-w-3/4 tw-font-bold tw-text-white tw-mb-2 tw-line-clamp-2">
            {event.title}
          </h3>
          <div className="tw-flex tw-items-center tw-gap-3">
            <span
              className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${statusBadge.bg} ${statusBadge.text}`}
            >
              {statusBadge.label}
            </span>
            <span
              className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium ${statusBadge.bg} ${statusBadge.text}`}
            >
              {event.category_id.name}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="tw-space-y-3 tw-mb-6">
          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-300">
            <Calendar className="tw-w-4 tw-h-4 tw-text-blue-400" />
            <span className="tw-text-sm">
              {formatDateTime(event.event_start_date).date} at{" "}
              {formatDateTime(event.event_start_date).time}
            </span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-300">
            <MapPin className="tw-w-4 tw-h-4 tw-text-blue-400" />
            <span className="tw-text-sm tw-line-clamp-1">
              {event.city_id.name} , {event.state_id.name}
            </span>
          </div>
          <div className="tw-flex tw-items-center tw-gap-3 tw-text-gray-300">
            <Users className="tw-w-4 tw-h-4 tw-text-blue-400" />
            <span className="tw-text-sm">{event.total_tickets} attendees</span>
          </div>
        </div>

        <p className="tw-text-gray-400 tw-text-sm tw-line-clamp-2 tw-mb-6">
          {event.description.split("\n")[0]}
        </p>

        {/* Action Buttons */}
        <div className="tw-flex tw-flex-col tw-gap-2">
          {(isUpcoming || isDraft) && (
            <div className="tw-flex tw-gap-3">
              <button
                onClick={() => handleUpdateEvent(event._id)}
                className="tw-flex-1 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <Edit className="tw-w-4 tw-h-4" /> Update
              </button>
              <button
                onClick={() => handleCancelEvent(event._id)}
                className="tw-flex-1 tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <X className="tw-w-4 tw-h-4" /> Cancel
              </button>
            </div>
          )}
          {!isDraft && (
            <button
              onClick={() => handleViewBooking(event._id)}
              className="tw-flex-1 tw-bg-green-600 hover:tw-bg-green-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium tw-flex tw-items-center tw-justify-center tw-gap-2"
            >
              <Ticket className="tw-w-4 tw-h-4" /> View Booking
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
