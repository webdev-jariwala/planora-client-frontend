import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Edit3, User, Mail, MapPin, CheckCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const User_Setting = ({ user, fetchUserData, tabVariants }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cities, setCities] = useState([]);

  const getCities = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/cities/fetchAll`, {
        withCredentials: true, // 🔑 allow cookies
      });
      setCities(res.data.cities);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  // ✅ Yup Validation
  const validationSchema = Yup.object({
    uname: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Please select gender"),
    city: Yup.string().required("Please select city"),
    profile_picture: Yup.mixed().nullable(),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      uname: user.uname,
      email: user.email,
      gender: user.gender == "None" ? null : user.gender,
      city: user.city == "None" ? null : user.city,
      profile_picture: null,
      oldImg: user.profile_picture,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.put(
          "http://localhost:4000/user/updateUser",
          values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // 🔑 allow cookies
          }
        );
        toast.success(res.data.message, {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        await fetchUserData();
        setIsEditMode(false);
        resetForm();
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
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
      transition={{ duration: 0.3 }}
      className="tw-space-y-6"
    >
      {/* Header */}
      <div className="tw-flex tw-items-center tw-justify-between">
        <h3 className="tw-text-2xl tw-font-bold tw-text-white tw-flex tw-items-center tw-gap-2">
          <Settings className="tw-w-6 tw-h-6 tw-text-purple-400" />
          Account Settings
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
          {/* Username */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <User className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" />{" "}
              Username
            </label>
            <input
              type="text"
              {...formik.getFieldProps("uname")}
              disabled={!isEditMode}
              className={inputClasses}
              placeholder="Choose a username"
            />
            {formik.touched.uname && formik.errors.uname && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.uname}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <Mail className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" /> Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              disabled={!isEditMode}
              className={inputClasses}
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* City */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 flex items-center gap-2 tw-pb-2">
              <MapPin className="tw-w-4 tw-h-4 tw-mb-[2px] tw-mr-[2px]" /> City
            </label>
            <select
              {...formik.getFieldProps("city")}
              disabled={!isEditMode}
              className={inputClasses}
            >
              <option value="">Select city</option>
              {cities.map((city)=>(
                <option value={city.name}>{city.name}</option>
              ))}
            </select>
            {formik.touched.city && formik.errors.city && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.city}
              </span>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-text-gray-300 tw-pb-2">
              Gender
            </label>
            <select
              {...formik.getFieldProps("gender")}
              disabled={!isEditMode}
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <span className="tw-text-red-400 tw-text-sm">
                {formik.errors.gender}
              </span>
            )}
          </div>

          {/* Profile Picture */}
          <div className="md:tw-col-span-2">
            <label className="tw-text-sm tw-font-medium tw-text-gray-300">
              Profile Picture
            </label>
            <input
              id="input_img"
              type="file"
              accept="image/*"
              disabled={!isEditMode}
              onChange={(e) =>
                formik.setFieldValue(
                  "profile_picture",
                  e.currentTarget.files[0]
                )
              }
              className="tw-mt-1 tw-block tw-w-full tw-text-sm tw-text-gray-400 file:tw-mr-4 file:tw-py-2 file:tw-px-4 file:tw-rounded-md file:tw-border-0 file:tw-bg-purple-600 file:tw-text-white hover:file:tw-bg-purple-500 disabled:file:tw-bg-gray-700"
            />
            {formik.touched.profile_picture &&
              formik.errors.profile_picture && (
                <span className="tw-text-red-400 tw-text-sm">
                  {formik.errors.profile_picture}
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

export default User_Setting;
