import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Edit3,
  Mail,
  MapPin,
  Building2,
  Hash,
  CheckCircle,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const Organizer_Setting = ({organizer,fetchOrganizerData,tabVariants}) => { 
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ Yup Validation
  const validationSchema = Yup.object({
    company_name: Yup.string().required("Company name is required"),
    bussiness_email: Yup.string()
      .email("Invalid email format")
      .required("Business email is required"),
    gst_number: Yup.string()
      .matches(/^[0-9A-Z]{15}$/, "GST must be 15 characters (A-Z, 0-9)")
      .required("GST number is required"),
    address: Yup.string().required("Address is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company_name: organizer.company_name,
      bussiness_email: organizer.bussiness_email,
      gst_number: organizer.gst_number,
      address: organizer.address,
    },
    validationSchema,
    onSubmit: async (values,{resetForm}) => {
      try {
        const res = await axios.put('http://localhost:4000/organizer/updateOrganizer',values,{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true  // 🔑 allow cookies
        });
        toast.success(res.data.message,{style:{fontFamily: "DM Sans ExtraBold"}});
        await fetchOrganizerData();
        setIsEditMode(false);
        resetForm();
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!",{style:{fontFamily: "DM Sans ExtraBold"}});
        console.log(error.response.data?.error || error.message);
      }
    },
  });

  const inputClasses =
    "tw-w-full tw-bg-[#0f0f0f] tw-border tw-border-gray-700 tw-rounded-lg tw-px-4 tw-py-3 tw-text-white tw-placeholder-gray-400 focus:tw-border-purple-500 focus:tw-ring-2 focus:tw-ring-purple-500/30 tw-transition disabled:tw-opacity-50";

  return (
    <motion.div
      variants={tabVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="tw-space-y-6"
    >
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-mt-10">
        <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2">
          <Settings className="tw-w-6 tw-h-6 tw-text-purple-400" />
          Organizer Settings
        </h3>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className="tw-bg-purple-600 hover:tw-bg-purple-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors tw-text-sm tw-font-medium tw-flex tw-items-center tw-gap-2"
        >
          <Edit3 className="tw-w-4 tw-h-4" />
          {isEditMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="tw-bg-[#1a1a1a] tw-rounded-xl tw-p-6 tw-border tw-border-gray-800"
      >
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
          {/* Company Name */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <Building2 className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" /> Company Name
            </label>
            <input
              type="text"
              {...formik.getFieldProps("company_name")}
              disabled={!isEditMode}
              className={inputClasses}
              placeholder="Enter company name"
            />
            {formik.touched.company_name && formik.errors.company_name && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.company_name}
              </span>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <Mail className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]"/> Business Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("bussiness_email")}
              disabled={!isEditMode}
              className={inputClasses}
              placeholder="Enter business email"
            />
            {formik.touched.bussiness_email &&
              formik.errors.bussiness_email && (
                <span className="tw-text-red-400 tw-text-sm">
                  {formik.errors.bussiness_email}
                </span>
              )}
          </div>

          {/* GST Number */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <Hash className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" /> GST Number
            </label>
            <input
              type="text"
              {...formik.getFieldProps("gst_number")}
              disabled={!isEditMode}
              className={inputClasses}
              placeholder="Enter GST number"
            />
            {formik.touched.gst_number && formik.errors.gst_number && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.gst_number}
              </span>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <MapPin className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" /> Address
            </label>
            <textarea
              {...formik.getFieldProps("address")}
              disabled={!isEditMode}
              className={`${inputClasses} tw-min-h-[100px]`}
              placeholder="Enter address"
            />
            {formik.touched.address && formik.errors.address && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.address}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        {isEditMode && (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="tw-flex tw-gap-4 tw-mt-6 tw-pt-6 tw-border-t tw-border-gray-800 tw-justify-end"
        >
        {/* Save Button */}
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="tw-bg-purple-600 hover:tw-bg-purple-700
                    tw-text-white tw-px-6 tw-py-3 tw-rounded-xl tw-font-semibold
                    tw-shadow-md tw-shadow-purple-500/30 tw-transition-all tw-duration-300
                    tw-flex tw-items-center tw-gap-2
                    outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
            <CheckCircle className="tw-w-5 tw-h-5" />
            Save Changes
        </motion.button>

        {/* Cancel Button */}
        <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => {
                setIsEditMode(false);
                formik.resetForm();
            }}
            className="tw-bg-gray-700 hover:tw-bg-gray-600
                    tw-text-gray-200 tw-px-6 tw-py-3 tw-rounded-xl tw-font-medium
                    tw-shadow tw-shadow-black/20 tw-transition-all tw-duration-300
                    outline-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
        >
            Cancel
        </motion.button>
        </motion.div>

        )}
      </form>
    </motion.div>
  );
};

export default Organizer_Setting;
