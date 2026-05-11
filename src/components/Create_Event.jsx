import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Calendar,
  ClipboardList,
  BarChart3,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";

// Yup validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Event title is required"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category ID is required"),
  venue: Yup.string().required("Venue is required"),
  state_id: Yup.string().required("State is required"),
  city_id: Yup.string().required("City is required"),
  booking_start_date: Yup.date().required("Booking start date is required"),
  booking_end_date: Yup.date()
    .min(Yup.ref("booking_start_date"), "End date cannot be before start date")
    .required("Booking end date is required"),
  event_start_date: Yup.date().required("Event start date is required"),
  event_end_date: Yup.date()
    .min(
      Yup.ref("event_start_date"),
      "Event end date cannot be before start date"
    )
    .required("Event end date is required"),
  total_tickets: Yup.number()
    .min(1, "Must be at least 1")
    .required("Total tickets required"),
  available_tickets: Yup.number()
    .min(0, "Must be 0 or more")
    .max(
      Yup.ref("total_tickets"),
      "Available tickets cannot exceed total tickets"
    )
    .required("Available tickets required"),
  price: Yup.number()
    .min(0, "Price must be positive")
    .required("Price required"),
  status: Yup.string().required("Status is required"),
  previous_photos: Yup.array()
    .of(
      Yup.mixed()
        .test(
          "fileSize",
          "File too large",
          (file) => !file || file.size <= 10 * 1024 * 1024 // 10MB
        )
        .test(
          "fileType",
          "Unsupported file format",
          (file) =>
            !file ||
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              file.type
            )
        )
    )
    .min(1, "At least 1 image is required")
    .max(6, "You can only upload up to 6 images"),
});

const Create_Event = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:4000/categories/fetchAll", {
        withCredentials: true, // 🔑 allow cookies
      });
      setCategories(res.data.categories);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  const getStates = async () => {
    try {
      const res = await axios.get("http://localhost:4000/states/fetchAll", {
        withCredentials: true, // 🔑 allow cookies
      });
      setStates(res.data.states);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  const getCities = async (state_id) => {
    try {
      const res = await axios.get(
        `http://localhost:4000/cities/fetchOne/${state_id}`,
        {
          withCredentials: true, // 🔑 allow cookies
        }
      );
      setCities(res.data.cities);
    } catch (error) {
      toast.error(error.response.data?.message || "Somthing Went Wrong!", {
        style: { fontFamily: "DM Sans ExtraBold" },
      });
      console.log(error.response.data?.error || error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getStates();
  }, []);
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category_id: "",
      venue: "",
      state_id: "",
      city_id: "",
      booking_start_date: "",
      booking_end_date: "",
      event_start_date: "",
      event_end_date: "",
      total_tickets: "",
      available_tickets: "",
      price: "",
      status: "draft",
      previous_photos: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        // Append all normal form fields
        Object.keys(values).forEach((key) => {
          if (key !== "previous_photos") {
            formData.append(key, values[key]);
          }
        });

        // Append all files from previous_photos array
        if (values.previous_photos && values.previous_photos.length > 0) {
          values.previous_photos.forEach((file) => {
            formData.append("previous_photos", file); // same name as multer.array
          });
        }
        const res = await axios.post(
          "http://localhost:4000/event/add",
          formData,
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
        resetForm();
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
        console.log(error.response.data?.error || error.message);
      }
    },
  });

  // helper
  const getFieldProps = (name) => ({
    ...formik.getFieldProps(name),
    id: name,
    name,
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    formik.setFieldValue("previous_photos", files);
    if (!(files.length > 0 && files.length < 7)) {
      formik.setFieldTouched("previous_photos", true); // 👈 add this
      formik.validateField("previous_photos"); // 👈 force validation immediately
    }
  };

  const handleRemoveImage = (index) => {
    const updated = formik.values.previous_photos.filter((_, i) => i !== index);
    formik.setFieldValue("previous_photos", updated);
    formik.setFieldTouched("previous_photos", true); // 👈 add this
    formik.validateField("previous_photos"); // 👈 force validation immediately
  };

  const renderCreateEventForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="tw-space-y-8"
    >
      <div className="tw-flex tw-items-center tw-space-x-4 tw-mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="tw-p-3 tw-bg-green-400/20 tw-rounded-xl tw-border tw-border-green-400/30"
        >
          <Star className="tw-w-6 tw-h-6 tw-text-green-400" />
        </motion.div>
        <div>
          <h1 className="tw-text-3xl tw-font-bold tw-text-white">
            Create New Event
          </h1>
          <p className="tw-text-gray-400 tw-mt-1">
            Fill in the details to create your event
          </p>
        </div>
      </div>

      <div className="tw-space-y-6">
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6">
          {/* Title */}
          <div className="lg:tw-col-span-2">
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white tw-placeholder-gray-500 focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              placeholder="Enter event title"
              {...getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="lg:tw-col-span-2">
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Event Description *
            </label>
            <textarea
              name="description"
              rows={4}
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white tw-placeholder-gray-500 focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200 tw-resize-none"
              placeholder="Describe your event..."
              {...getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Category *
            </label>
            <select
              name="category_id"
              className="tw-w-full tw-px-4 tw-py-3 tw-mt-[1px] tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              onBlur={formik.handleBlur}
              {...getFieldProps("category_id")}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category_id && formik.errors.category_id && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.category_id}
              </p>
            )}
          </div>

          {/* venue */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Venue *
            </label>
            <input
              type="text"
              name="venue"
              className="tw-w-full tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white tw-placeholder-gray-500 focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              placeholder="Enter Venue"
              {...getFieldProps("venue")}
            />
            {formik.touched.venue && formik.errors.venue && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.venue}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              State *
            </label>
            <select
              name="state_id"
              className="tw-w-full tw-px-4 tw-py-3 tw-mt-[1px] tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              onBlur={formik.handleBlur}
              {...getFieldProps("state_id")}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue("state_id", value);
                formik.setFieldValue("city_id", "");
                if (value) getCities(value);
              }}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option value={state._id} key={state._id}>
                  {state.name}
                </option>
              ))}
            </select>
            {formik.touched.state_id && formik.errors.state_id && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.state_id}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              City *
            </label>
            <select
              name="city_id"
              className="tw-w-full tw-px-4 tw-py-3 tw-mt-[1px] tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              onBlur={formik.handleBlur}
              {...getFieldProps("city_id")}
              disabled={cities.length === 0 ? true : false}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option value={city._id} key={city._id}>
                  {city.name}
                </option>
              ))}
            </select>
            {formik.touched.city_id && formik.errors.city_id && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.city_id}
              </p>
            )}
          </div>

          {/* Booking Start Date */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Booking Start Date *
            </label>
            <input
              type="datetime-local"
              name="booking_start_date"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200
                        [&::-webkit-calendar-picker-indicator]:tw-invert 
                        [&::-webkit-calendar-picker-indicator]:tw-cursor-pointer 
                        [&::-webkit-calendar-picker-indicator]:hover:tw-opacity-80"
              {...getFieldProps("booking_start_date")}
            />
            {formik.touched.booking_start_date &&
              formik.errors.booking_start_date && (
                <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                  {formik.errors.booking_start_date}
                </p>
              )}
          </div>

          {/* Booking End Date */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Booking End Date *
            </label>
            <input
              type="datetime-local"
              name="booking_end_date"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200
                        [&::-webkit-calendar-picker-indicator]:tw-invert 
                        [&::-webkit-calendar-picker-indicator]:tw-cursor-pointer 
                        [&::-webkit-calendar-picker-indicator]:hover:tw-opacity-80"
              {...getFieldProps("booking_end_date")}
            />
            {formik.touched.booking_end_date &&
              formik.errors.booking_end_date && (
                <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                  {formik.errors.booking_end_date}
                </p>
              )}
          </div>

          {/* Event Start Date */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Event Start Date *
            </label>
            <input
              type="datetime-local"
              name="event_start_date"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                      tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none 
                      focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200
                      [&::-webkit-calendar-picker-indicator]:tw-invert 
                      [&::-webkit-calendar-picker-indicator]:tw-cursor-pointer 
                      [&::-webkit-calendar-picker-indicator]:hover:tw-opacity-80"
              {...getFieldProps("event_start_date")}
            />
            {formik.touched.event_start_date &&
              formik.errors.event_start_date && (
                <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                  {formik.errors.event_start_date}
                </p>
              )}
          </div>

          {/* Event End Date */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Event End Date *
            </label>
            <input
              type="datetime-local"
              name="event_end_date"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200
                        [&::-webkit-calendar-picker-indicator]:tw-invert 
                        [&::-webkit-calendar-picker-indicator]:tw-cursor-pointer 
                        [&::-webkit-calendar-picker-indicator]:hover:tw-opacity-80"
              {...getFieldProps("event_end_date")}
            />
            {formik.touched.event_end_date && formik.errors.event_end_date && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.event_end_date}
              </p>
            )}
          </div>

          {/* Total Tickets */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Total Tickets *
            </label>
            <input
              type="number"
              name="total_tickets"
              min="1"
              placeholder="Enter total tickets"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white tw-placeholder-gray-500 
                        focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 
                        tw-transition-all tw-duration-200 
                        [appearance:textfield] 
                        [&::-webkit-inner-spin-button]:tw-appearance-none 
                        [&::-webkit-outer-spin-button]:tw-appearance-none"
              {...getFieldProps("total_tickets")}
            />
            {formik.touched.total_tickets && formik.errors.total_tickets && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.total_tickets}
              </p>
            )}
          </div>

          {/* Available Tickets */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Available Tickets *
            </label>
            <input
              type="number"
              name="available_tickets"
              min="0"
              placeholder="Enter available tickets"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white tw-placeholder-gray-500 
                        focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 
                        tw-transition-all tw-duration-200 
                        [appearance:textfield] 
                        [&::-webkit-inner-spin-button]:tw-appearance-none 
                        [&::-webkit-outer-spin-button]:tw-appearance-none"
              {...getFieldProps("available_tickets")}
            />
            {formik.touched.available_tickets &&
              formik.errors.available_tickets && (
                <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                  {formik.errors.available_tickets}
                </p>
              )}
          </div>

          {/* Price */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Price *
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              placeholder="Enter price"
              className="tw-w-full tw-h-[48px] tw-px-4 tw-py-3 tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none 
                        tw-rounded-2xl tw-text-white tw-placeholder-gray-500 
                        focus:tw-border-green-400 focus:tw-outline-none 
                        focus:tw-ring-2 focus:tw-ring-green-400/20 
                        tw-transition-all tw-duration-200 
                        [appearance:textfield] 
                        [&::-webkit-inner-spin-button]:tw-appearance-none 
                        [&::-webkit-outer-spin-button]:tw-appearance-none"
              {...getFieldProps("price")}
            />
            {formik.touched.price && formik.errors.price && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.price}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
              Status *
            </label>
            <select
              name="status"
              className="tw-w-full tw-px-4 tw-py-3 tw-mt-[1px] tw-bg-[#1a1a1a] tw-border tw-border-black/20 tw-outline-none tw-rounded-2xl tw-text-white focus:tw-border-green-400 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-400/20 tw-transition-all tw-duration-200"
              onBlur={formik.handleBlur}
              {...getFieldProps("status")}
            >
              <option value="draft">Draft</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <p className="tw-text-red-500 tw-text-sm tw-mt-1">
                {formik.errors.status}
              </p>
            )}
          </div>
        </div>

        {/* Previous Event Photos */}
        <div className="lg:tw-col-span-2">
          <label className="tw-block tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-2">
            Previous Event Photos
          </label>

          <div
            className={`tw-relative tw-border-2 tw-border-dashed tw-rounded-2xl tw-px-4 tw-py-6 tw-text-center tw-cursor-pointer
              ${
                isDragging
                  ? "tw-border-green-400 tw-bg-[#1f1f1f]"
                  : "tw-border-gray-600 tw-bg-[#1a1a1a]"
              }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const droppedFiles = Array.from(e.dataTransfer.files).filter(
                (file) => file.type.startsWith("image/")
              );
              if (droppedFiles.length) {
                formik.setFieldValue("previous_photos", [
                  ...formik.values.previous_photos,
                  ...droppedFiles,
                ]);
              }
            }}
          >
            {/* Hidden file input */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-opacity-0 tw-cursor-pointer tw-z-10"
              id="file-upload"
            />

            {/* Custom styled label */}
            <label
              htmlFor="file-upload"
              className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-2"
            >
              <svg
                className="tw-w-6 tw-h-6 tw-text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="tw-text-sm tw-text-gray-300">
                {formik.values.previous_photos.length > 0
                  ? `${formik.values.previous_photos.length} files selected`
                  : "Choose files or drag and drop"}
              </span>
              <span className="tw-text-xs tw-text-gray-500">
                PNG, JPG, GIF up to 10MB
              </span>
            </label>
          </div>

          {/* Selected files display */}
          {formik.values.previous_photos.length > 0 && (
            <div className="tw-mt-3 tw-space-y-2">
              <div className="tw-text-xs tw-text-gray-400 tw-font-medium">
                Selected files:
              </div>
              <div className="tw-flex tw-flex-wrap tw-gap-2">
                {formik.values.previous_photos.map((file, index) => (
                  <div
                    key={index}
                    className="tw-flex tw-items-center tw-gap-2 tw-bg-[#0f0f0f] tw-px-3 tw-py-1 tw-rounded-lg tw-border tw-border-gray-700 tw-group"
                  >
                    <svg
                      className="tw-w-4 tw-h-4 tw-text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="tw-text-xs tw-text-gray-300">
                      {file.name}
                    </span>
                    <span className="tw-text-xs tw-text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(1)}MB)
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveImage(index);
                      }}
                      className="tw-ml-2 tw-text-white tw-text-2xl tw-font-bold hover:tw-text-red-400 tw-transition-colors tw-duration-200 tw-bg-transparent tw-border-none tw-p-0"
                      title="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {formik.touched.previous_photos && formik.errors.previous_photos && (
            <center>
              <p className="tw-text-red-500 tw-text-sm tw-mt-2">
                {formik.errors.previous_photos}
              </p>
            </center>
          )}
        </div>

        {/* Submit Button */}
        <motion.div className="tw-flex tw-justify-end tw-pt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={formik.handleSubmit}
            className="tw-flex tw-items-center tw-space-x-2 tw-px-8 tw-py-4 tw-bg-green-400 tw-text-black tw-font-bold tw-rounded-2xl hover:tw-bg-green-300 tw-transition-all tw-duration-200 tw-shadow-lg tw-shadow-green-400/20"
          >
            <Plus className="tw-w-5 tw-h-5" />
            <span>Create Event</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div
      style={{ fontFamily: "DM Sans Normal" }}
      className="tw-min-h-screen tw-bg-gradient-to-br tw-from-[#1a1a1a] tw-to-[#0f0f0f]"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="tw-flex tw-min-h-screen"
      >
        {/* Right Content Area */}
        <div className="tw-flex-1 tw-flex tw-flex-col">
          {/* Main Content */}
          <div className="tw-flex-1 tw-p-8">
            <AnimatePresence mode="wait">
              {renderCreateEventForm()}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Create_Event;
