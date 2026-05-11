import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Shield, MapPin, Briefcase } from 'lucide-react';

const OrganizerCard = ({ icon, label, value, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="tw-relative tw-group tw-cursor-pointer"
  >
    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-br tw-from-purple-500/20 tw-to-pink-500/20 tw-rounded-xl tw-blur-xl tw-group-hover:tw-blur-2xl tw-transition-all tw-duration-300 tw-opacity-0 tw-group-hover:tw-opacity-100" />
    
    <div className="tw-relative tw-bg-[#1a1a1a] tw-backdrop-blur-sm tw-border tw-border-gray-700/50 tw-rounded-xl tw-p-6 tw-hover:tw-border-purple-500/50 tw-transition-all tw-duration-300 tw-group-hover:tw-transform tw-group-hover:tw-scale-[1.02]">
      <div className="tw-flex tw-items-start tw-justify-between tw-mb-4">
        <div className={`tw-p-3 tw-rounded-lg tw-bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
        <div className="tw-w-2 tw-h-2 tw-bg-green-400 tw-rounded-full tw-animate-pulse" />
      </div>
      
      <div className="tw-space-y-2">
        <p className="tw-text-sm tw-font-medium tw-text-gray-400 tw-uppercase tw-tracking-wider">
          {label}
        </p>
        <p className="tw-text-white tw-font-semibold tw-text-lg tw-leading-tight tw-break-words">
          {value}
        </p>
      </div>
      
      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-h-1 tw-bg-gradient-to-r tw-from-transparent tw-via-purple-500/50 tw-to-transparent tw-opacity-0 tw-group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300" />
    </div>
  </motion.div>
);

const OrganizerDetailsSection = ({ organizer,setActiveTab }) => {
  return (
    <div className="">
      {/* Header with Business Badge */}
      {/* <div className="tw-flex tw-items-center tw-gap-4 tw-mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="tw-flex tw-items-center tw-gap-3 tw-bg-gradient-to-r tw-from-purple-600/20 tw-to-pink-600/20 tw-backdrop-blur-sm tw-border tw-border-purple-500/30 tw-rounded-full tw-px-4 tw-py-2"
        >
          <Briefcase className="tw-w-5 tw-h-5 tw-text-purple-400" />
          <span className="tw-text-purple-300 tw-font-semibold tw-text-sm tw-uppercase tw-tracking-wider">
            Business Profile
          </span>
        </motion.div>
      </div> */}

      <div className="tw-flex tw-items-center tw-justify-between tw-mb-8">
        <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tw-gap-2 tw-font-bold tw-bg-gradient-to-r tw-from-white tw-via-purple-200 tw-to-pink-200 tw-bg-clip-text tw-text-transparent tw-flex tw-items-center"
            style={{ fontFamily: "DM Sans ExtraBold" }}
        >
        <Briefcase className="tw-w-7 tw-h-7 tw-text-purple-400" />
            Business Information
        </motion.h3>
            <button onClick={()=>setActiveTab("settings")} className="tw-bg-purple-600 hover:tw-bg-purple-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium">
                Update Details
            </button>
      </div>
      

      {/* Cards Grid with Staggered Animation */}
      <motion.div 
        className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <OrganizerCard 
          icon={<Building2 className="tw-w-6 tw-h-6 tw-text-white" />} 
          label="Company" 
          value={organizer.company_name}
          gradient="tw-from-blue-500 tw-to-cyan-500"
        />
        <OrganizerCard 
          icon={<Mail className="tw-w-6 tw-h-6 tw-text-white" />} 
          label="Business Email" 
          value={organizer.bussiness_email}
          gradient="tw-from-purple-500 tw-to-pink-500"
        />
        <OrganizerCard 
          icon={<Shield className="tw-w-6 tw-h-6 tw-text-white" />} 
          label="GST Number" 
          value={organizer.gst_number}
          gradient="tw-from-amber-500 tw-to-orange-500"
        />
        <OrganizerCard 
          icon={<MapPin className="tw-w-6 tw-h-6 tw-text-white" />} 
          label="Business Address" 
          value={organizer.address}
          gradient="tw-from-green-500 tw-to-emerald-500"
        />
      </motion.div>

      {/* Verification Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="tw-mt-8 tw-flex tw-items-center tw-justify-center"
      >
        <div className="tw-flex tw-items-center tw-gap-3 tw-bg-green-500/10 tw-border tw-border-green-500/30 tw-rounded-full tw-px-6 tw-py-3">
          <div className="tw-w-3 tw-h-3 tw-bg-green-400 tw-rounded-full tw-animate-pulse" />
          <span className="tw-text-green-300 tw-font-medium tw-text-sm">
            Verified Business Account
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default OrganizerDetailsSection;