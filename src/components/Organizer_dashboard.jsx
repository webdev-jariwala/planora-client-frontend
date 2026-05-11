import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, Calendar, CheckCircle, ClipboardList, FileText, LayoutDashboard, PlayCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Organizer_dashboard = ({ tabVariants }) => {
  const navigate = useNavigate();
  const isReqSend = useRef(false);
  const [draftEventCount,setDraftEventCount] = useState(0);
  const [publishedEventCount,setPublishedEventCount] = useState(0);
  const [upcomingEventCount,setUpcomingEventCount] = useState(0);
  const [ongoingEventCount,setOngoingEventCount] = useState(0);
  const [completedEventCount,setCompletedEventCount] = useState(0);
  const [cancelledEventCount,setCancelledEventCount] = useState(0);

  const manageEvents = [
    { id: 1, action: 'Create New Event', time: "Let's Have Some Time", page_id:'create', icon: Star, color: 'tw-text-green-400', bgcolor: 'tw-bg-green-400' },
    { id: 2, action: 'View All Events', time: "Keeping an Eye on Everything", page_id:'view', icon: Calendar, color: 'tw-text-blue-400', bgcolor: 'tw-bg-blue-400' },
    { id: 3, action: 'Manage Bookings', time: "Making Sure Guests are Ready", page_id:'bookings', icon: ClipboardList, color: 'tw-text-purple-400', bgcolor: 'tw-bg-purple-400' },
    { id: 4, action: 'Track Event Reports', time: "Checking How Things Went", page_id:'reports', icon: BarChart3  , color: 'tw-text-yellow-400', bgcolor: 'tw-bg-yellow-400' },
  ];
  const stats = [
    { label: 'Events Created',ActiveTabId: 'upcoming', value:`${draftEventCount + publishedEventCount + upcomingEventCount + ongoingEventCount + completedEventCount + cancelledEventCount}`, icon: Star, color: 'tw-text-purple-400', bg: 'tw-bg-purple-500/10' },
    { label: 'Upcoming Events',ActiveTabId: 'upcoming', value: `${upcomingEventCount}`, icon: Calendar, color: 'tw-text-pink-400', bg: 'tw-bg-pink-500/10' },
    { label: 'Ongoing Events',ActiveTabId: 'ongoing', value: `${ongoingEventCount}`, icon: PlayCircle, color: 'tw-text-yellow-400', bg: 'tw-bg-yellow-500/10' },
    { label: 'Completed/Cancelled Events',ActiveTabId: 'completed', value: `${completedEventCount + cancelledEventCount}`, icon: CheckCircle, color: 'tw-text-green-400', bg: 'tw-bg-green-500/10' },
    { label: 'Draft Events', ActiveTabId: 'draft', value: `${draftEventCount}`, icon: FileText, color: 'tw-text-amber-400', bg: 'tw-bg-amber-500/10'}
  ];

  const countEventsStatusByOrganizer = async () => {
    try {
      const res = await axios.get("http://localhost:4000/event/countEventsStatusByOrganizer",{
        withCredentials:true, 
      });
      // Create a mapping of status -> setter function
      const statusSetters = {
        draft: setDraftEventCount,
        published: setPublishedEventCount,
        upcoming: setUpcomingEventCount,
        ongoing: setOngoingEventCount,
        completed: setCompletedEventCount,
        cancelled: setCancelledEventCount,
      };

      // Loop through the response and call the correct setter
      res.data.eventCount.forEach(({ _id, count }) => {
        if (statusSetters[_id]) {
          statusSetters[_id](count);
        }
      });
    } catch (error) {
      console.log(error.response.data?.error || error.message);
    }
  }

  useEffect(()=>{
    if(!isReqSend.current){
      countEventsStatusByOrganizer();
      isReqSend.current = true;
    }
  },[]);

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="tw-space-y-8"
    >
      {/* Stats Grid */}
      <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-5 tw-gap-4 lg:tw-gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="tw-bg-[#1a1a1a] tw-rounded-xl tw-p-6 tw-border tw-border-gray-800 tw-relative tw-overflow-hidden tw-group"
              onClick={()=>navigate("/OrganizerMainDashboard", { state: { ActiveMenu: 'view',ActiveTab:stat.ActiveTabId } })}
            >
              <div
                className={`tw-absolute tw-inset-0 ${stat.bg} tw-opacity-5 group-hover:tw-opacity-10 tw-transition-opacity`}
              ></div>
              <div className="tw-relative tw-z-10">
                <div
                  className={`tw-inline-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-lg ${stat.bg} tw-mb-4`}
                >
                  <IconComponent className={`tw-w-6 tw-h-6 ${stat.color}`} />
                </div>
                <div className="tw-text-3xl tw-font-bold tw-text-white tw-mb-1">
                  {stat.value}
                </div>
                <div className="tw-text-sm tw-text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="tw-bg-[#1a1a1a] tw-rounded-xl tw-p-6 tw-border tw-border-gray-800">
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-6">
          <h3 className="tw-text-xl tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2">
            <LayoutDashboard className="tw-w-5 tw-h-5 tw-text-purple-400" />
            Manage Events
          </h3>
          <button onClick={()=>{
            navigate("/OrganizerMainDashboard", { state: { ActiveMenu: "create" } })
          }} 
          className="tw-bg-purple-600 hover:tw-bg-purple-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium">
            View All
          </button>
        </div>
        <div className="tw-space-y-4">
          {manageEvents.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <motion.div
                key={activity.id}
                whileHover={{ x: 5 }}
                className="tw-flex tw-items-center tw-gap-4 tw-p-3 tw-rounded-lg tw-bg-[#0f0f0f] tw-border tw-border-gray-800 hover:tw-border-gray-700 tw-transition-all"
                onClick={()=>{
                  navigate("/OrganizerMainDashboard", { state: { ActiveMenu: activity.page_id } })
                }} 
              >
                <div className={`tw-w-2 tw-h-2 tw-rounded-full ${activity.bgcolor}`}></div>
                <IconComponent className={`tw-w-4 tw-h-4 ${activity.color}`} />
                <div className="tw-flex-1">
                  <span className="tw-text-gray-300 tw-text-sm">
                    {activity.action}
                  </span>
                </div>
                <span className="tw-text-xs tw-text-gray-500">
                  {activity.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Organizer_dashboard;
