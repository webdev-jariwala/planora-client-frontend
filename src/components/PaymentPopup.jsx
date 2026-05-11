import React, { useState, useEffect } from 'react';
import { X, CreditCard, Smartphone, Building, Sparkles, Shield, Zap } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from './LoadingScreen';
import { toast } from 'react-toastify';
import axios from 'axios';

const PaymentPopup = ({ isOpen = true, setIsPaymentPanelOpen,amount,handleBooking,getEventData }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [formData, setFormData] = useState({
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const onClose = () => {
    setIsPaymentPanelOpen(false);
  };

  const paymentMethods = [
    { 
      id: 'upi', 
      label: 'UPI Payment', 
      icon: Smartphone, 
      description: 'Quick & secure UPI transfer',
      gradient: 'tw-from-purple-600 tw-to-purple-500'
    },
    { 
      id: 'bank', 
      label: 'Bank Transfer', 
      icon: Building, 
      description: 'Direct bank account transfer',
      gradient: 'tw-from-purple-600 tw-to-purple-500'
    },
    { 
      id: 'card', 
      label: 'Card Payment', 
      icon: CreditCard, 
      description: 'Credit/Debit card payment',
      gradient: 'tw-from-purple-600 tw-to-purple-500'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedMethod === 'upi') {
      if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
      else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) newErrors.upiId = 'Invalid UPI ID format';
    }
    
    if (selectedMethod === 'bank') {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
      if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) newErrors.ifscCode = 'Invalid IFSC code format';
    }
    
    if (selectedMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Invalid format (MM/YY)';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addPayment_Details = async (booking_id) => {
    try {
        const res = await axios.post(`http://localhost:4000/payment/add/${booking_id}`,{payment_method:selectedMethod,amount:amount},{
          headers:{
            "Content-Type":"application/json",
          },
          withCredentials: true  // 🔑 allow cookies
        });
        return res.data.message;
      } catch (error) {
        toast.error(error.response.data?.message || "Somthing Went Wrong!",{style:{fontFamily: "DM Sans ExtraBold"}});
        console.log(error.response.data?.error || error.message);
      }
  }

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    const booking_id = await handleBooking();
    if(booking_id != ""){
      console.log("booking_id" + booking_id);
      const message = await addPayment_Details(booking_id);
      getEventData();
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsProcessing(false);
      toast.success(message,{style:{fontFamily: "DM Sans ExtraBold"}});
    }
    handleClose();
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const match = v.match(/\d{4,16}/g);
    const result = match && match[0] || '';
    const parts = [];
    for (let i = 0, len = result.length; i < len; i += 4) {
      parts.push(result.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const renderPaymentForm = () => {
    const formVariants = {
      upi: (
        <div className="tw-space-y-6">
          <div className="tw-group">
            <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
              <Smartphone className="tw-w-4 tw-h-4 tw-text-purple-400" />
              <span>UPI ID</span>
            </label>
            <div className="tw-relative">
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => handleInputChange('upiId', e.target.value)}
                placeholder="yourname@paytm, @googlepay, @phonepe"
                className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                  errors.upiId 
                    ? 'tw-border-red-500 tw-shadow-red-500/20' 
                    : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
                } tw-focus:shadow-lg`}
              />
              {/* <div className="tw-absolute tw-inset-0 tw-rounded-xl tw-bg-gradient-to-r tw-from-purple-600/10 tw-to-purple-500/10 tw-opacity-0 tw-pointer-events-none tw-transition-opacity tw-duration-300 group-hover:tw-opacity-100" /> */}
            </div>
            {errors.upiId && (
              <p className="tw-text-red-400 tw-text-sm tw-mt-2 tw-flex tw-items-center tw-space-x-1 tw-animate-pulse">
                <span>⚠️</span>
                <span>{errors.upiId}</span>
              </p>
            )}
          </div>
        </div>
      ),
      
      bank: (
        <div className="tw-space-y-5">
          <div className="tw-group">
            <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
              <Building className="tw-w-4 tw-h-4 tw-text-purple-400" />
              <span>Bank Name</span>
            </label>
            <input
              type="text"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              placeholder="State Bank of India, HDFC Bank, etc."
              className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                errors.bankName 
                  ? 'tw-border-red-500 tw-shadow-red-500/20' 
                  : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
              } tw-focus:shadow-lg`}
            />
            {errors.bankName && (
              <p className="tw-text-red-400 tw-text-sm tw-mt-2 tw-flex tw-items-center tw-space-x-1">
                <span>⚠️</span>
                <span>{errors.bankName}</span>
              </p>
            )}
          </div>
          
          <div className="tw-group">
            <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
              <Shield className="tw-w-4 tw-h-4 tw-text-purple-400" />
              <span>Account Number</span>
            </label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value.replace(/\D/g, ''))}
              placeholder="1234567890123456"
              className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                errors.accountNumber 
                  ? 'tw-border-red-500 tw-shadow-red-500/20' 
                  : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
              } tw-focus:shadow-lg`}
            />
            {errors.accountNumber && (
              <p className="tw-text-red-400 tw-text-sm tw-mt-2 tw-flex tw-items-center tw-space-x-1">
                <span>⚠️</span>
                <span>{errors.accountNumber}</span>
              </p>
            )}
          </div>
          
          <div className="tw-group">
            <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
              <Zap className="tw-w-4 tw-h-4 tw-text-purple-400" />
              <span>IFSC Code</span>
            </label>
            <input
              type="text"
              value={formData.ifscCode}
              onChange={(e) => handleInputChange('ifscCode', e.target.value.toUpperCase())}
              placeholder="SBIN0001234"
              className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                errors.ifscCode 
                  ? 'tw-border-red-500 tw-shadow-red-500/20' 
                  : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
              } tw-focus:shadow-lg`}
            />
            {errors.ifscCode && (
              <p className="tw-text-red-400 tw-text-sm tw-mt-2 tw-flex tw-items-center tw-space-x-1">
                <span>⚠️</span>
                <span>{errors.ifscCode}</span>
              </p>
            )}
          </div>
        </div>
      ),
      
      card: (
        <div className="tw-space-y-5">
          <div className="tw-group">
            <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
              <CreditCard className="tw-w-4 tw-h-4 tw-text-purple-400" />
              <span>Card Number</span>
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-font-mono tw-tracking-wider tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                errors.cardNumber 
                  ? 'tw-border-red-500 tw-shadow-red-500/20' 
                  : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
              } tw-focus:shadow-lg`}
            />
            {errors.cardNumber && (
              <p className="tw-text-red-400 tw-text-sm tw-mt-2 tw-flex tw-items-center tw-space-x-1">
                <span>⚠️</span>
                <span>{errors.cardNumber}</span>
              </p>
            )}
          </div>
          
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
            <div className="tw-group">
              <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
                <span>📅</span>
                <span>Expiry</span>
              </label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiry(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-font-mono tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                  errors.expiryDate 
                    ? 'tw-border-red-500 tw-shadow-red-500/20' 
                    : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
                } tw-focus:shadow-lg`}
              />
              {errors.expiryDate && (
                <p className="tw-text-red-400 tw-text-xs tw-mt-1">⚠️ {errors.expiryDate}</p>
              )}
            </div>
            
            <div className="tw-group">
              <label className="tw-flex tw-items-center tw-space-x-2 tw-text-sm tw-font-semibold tw-text-gray-300 tw-mb-3">
                <span>🔒</span>
                <span>CVV</span>
              </label>
              <input
                type="password"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                placeholder="123"
                maxLength={4}
                className={`tw-w-full tw-px-5 tw-py-4 tw-bg-[#0f0f0f] tw-border-2 tw-rounded-xl tw-text-white tw-placeholder-gray-500 tw-text-base tw-font-medium tw-font-mono tw-transition-all tw-duration-300 tw-focus:outline-none tw-focus:ring-0 tw-shadow-inner ${
                  errors.cvv 
                    ? 'tw-border-red-500 tw-shadow-red-500/20' 
                    : 'tw-border-gray-700 tw-focus:border-purple-500 tw-hover:border-gray-600 tw-focus:shadow-purple-500/20'
                } tw-focus:shadow-lg`}
              />
              {errors.cvv && (
                <p className="tw-text-red-400 tw-text-xs tw-mt-1">⚠️ {errors.cvv}</p>
              )}
            </div>
          </div>
        </div>
      )
    };

    // Return the form content directly - the motion wrapper is in the parent component
    return formVariants[selectedMethod];
  };

  if (!isOpen) return null;

  return (
    <div className={`tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4 tw-transition-all tw-duration-300 ${isVisible ? 'tw-backdrop-blur-md tw-bg-black/70' : 'tw-backdrop-blur-0 tw-bg-black/0'}`}>
      {isProcessing && <LoadingScreen msg={"Processsing Payment"}/>}
      <div 
        className="tw-fixed tw-inset-0" 
        onClick={handleClose}
      />
      
      <div className={`tw-relative tw-w-full tw-max-w-6xl tw-bg-[#1a1a1a] tw-rounded-3xl tw-shadow-2xl tw-border tw-border-gray-800/50 tw-backdrop-blur-xl tw-transform tw-transition-all tw-duration-500 tw-overflow-hidden ${
        isVisible 
          ? 'tw-scale-100 tw-opacity-100 tw-translate-y-0' 
          : 'tw-scale-95 tw-opacity-0 tw-translate-y-8'
      }`} style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(139, 92, 246, 0.1)'
      }}>
        
        {/* Decorative Elements */}
        <div className="tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-1 tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 tw-rounded-t-3xl"></div>
        
        {/* Header */}
        <div className="tw-flex tw-items-center tw-justify-between tw-p-6 lg:tw-p-8 tw-border-b tw-border-gray-800/30">
          <div className="tw-flex tw-items-center tw-space-x-3">
            <div className="tw-w-12 tw-h-12 tw-bg-gradient-to-br tw-from-purple-600 tw-to-purple-500 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-purple-500/25">
              <Sparkles className="tw-w-6 tw-h-6 tw-text-white" />
            </div>
            <div>
              <h2 className="tw-text-xl lg:tw-text-2xl tw-font-bold tw-text-white tw-tracking-tight" style={{ fontFamily: 'Recoleta' }}>
                Complete Payment
              </h2>
              <p className="tw-text-xs lg:tw-text-sm tw-text-gray-400 tw-font-medium">Secure • Fast • Trusted</p>
            </div>
          </div>
          <div>
            <h3 
              className="tw-text-2xl lg:tw-text-3xl tw-font-black tw-bg-gradient-to-r tw-from-[#f472b6] tw-to-[#a855f7] tw-bg-clip-text tw-text-transparent tw-leading-tight tw-border-b-4 tw-border-pink-500"
              style={{ fontFamily: 'DM Sans ExtraBold, sans-serif' }}
            >
              Total Payment : {amount}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="tw-w-12 tw-h-12 tw-bg-white/10 tw-backdrop-blur-sm tw-border-0 tw-text-gray-300 tw-hover:text-white tw-hover:bg-white/20 tw-rounded-2xl tw-transition-all tw-duration-300 tw-group tw-flex tw-items-center tw-justify-center tw-shadow-lg hover:tw-shadow-xl tw-transform hover:tw-scale-105"
          >
            <X className="tw-w-5 tw-h-5 tw-group-hover:tw-rotate-90 tw-transition-transform tw-duration-300" />
          </button>
        </div>
        
        {/* Main Content - Landscape Layout */}
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-min-h-[500px]">
          
          {/* Left Sidebar - Payment Methods */}
          <div className="tw-w-full lg:tw-w-80 tw-bg-gradient-to-b tw-from-[#0f0f0f]/80 tw-to-[#1a1a1a]/50 tw-p-6 lg:tw-p-8 tw-border-b lg:tw-border-b-0 lg:tw-border-r tw-border-gray-800/30">
            <h3 className="tw-text-lg tw-font-semibold tw-text-white tw-mb-6 tw-flex tw-items-center tw-space-x-2">
              <span>Choose Payment Method</span>
            </h3>
            
            <div className="tw-space-y-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const isActive = selectedMethod === method.id;
                return (
                  <motion.button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    initial={{ scale: 1 }}
                    whileHover={{
                        scale: 1.05,
                        background: `${(isActive)?'linear-gradient(to right, #a64df9, #f56bb2)':'rgba(26, 26, 26, 1)'}`,
                        transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    animate={
                        isActive
                        ? {
                            background: "linear-gradient(to right, #f56bb2, #a64df9)",
                            transition: { duration: 0.6, ease: "easeInOut" }
                            }
                        : {
                            background: "rgba(26, 26, 26, 0.8)",
                            transition: { duration: 0.6, ease: "easeInOut" }
                            }
                    }
                    className={`tw-w-full tw-flex tw-items-center tw-space-x-4 tw-p-5 tw-rounded-2xl tw-text-left tw-group tw-relative tw-overflow-hidden tw-shadow-lg ${
                        isActive
                        ? "tw-text-white tw-shadow-2xl tw-shadow-purple-500/30 tw-backdrop-blur-sm"
                        : "tw-text-gray-300 hover:tw-text-white tw-shadow-lg hover:tw-shadow-xl tw-border tw-border-gray-800/50 hover:tw-border-gray-700/50"
                    }`}
                    >
                    {isActive && (
                        <>
                        <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-purple-600/20 tw-to-purple-500/20 tw-animate-pulse"></div>
                        <div className="tw-absolute tw-top-0 tw-right-0 tw-w-20 tw-h-20 tw-bg-white/10 tw-rounded-full tw-blur-2xl tw-animate-pulse"></div>
                        </>
                    )}

                    <div
                        className={`tw-w-12 tw-h-12 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-relative tw-z-10 tw-shadow-lg ${
                        isActive
                            ? "tw-bg-white/20 tw-backdrop-blur-sm"
                            : "tw-bg-gradient-to-br tw-from-purple-600/20 tw-to-purple-500/20 group-hover:tw-from-purple-600/30 group-hover:tw-to-purple-500/30"
                        }`}
                    >
                        <Icon
                        className={`tw-w-6 tw-h-6 ${
                            isActive
                            ? "tw-text-white tw-drop-shadow-sm"
                            : "tw-text-purple-400 group-hover:tw-text-purple-300"
                        }`}
                        />
                    </div>

                    <div className="tw-flex-1 tw-relative tw-z-10">
                        <div className="tw-font-bold tw-text-base tw-mb-1">{method.label}</div>
                        <div
                        className={`tw-text-sm ${
                            isActive
                            ? "tw-text-purple-100/90"
                            : "tw-text-gray-500 group-hover:tw-text-gray-400"
                        }`}
                        >
                        {method.description}
                        </div>
                    </div>

                    {isActive && (
                        <div className="tw-w-3 tw-h-3 tw-bg-white tw-rounded-full tw-animate-pulse tw-relative tw-z-10 tw-shadow-lg tw-shadow-white/50" />
                    )}
                    </motion.button>

                );
              })}
            </div>
          </div>
          
          {/* Right Content - Payment Form */}
          <div className="tw-flex-1 tw-p-6 lg:tw-p-8">
            <div className="tw-h-full tw-flex tw-flex-col">
              
              {/* Form Content */}
              <div className="tw-flex-1 tw-py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMethod}
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="tw-w-full"
                  >
                    {renderPaymentForm()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Action Buttons */}
              <div className="tw-flex tw-flex-col sm:tw-flex-row tw-space-y-3 sm:tw-space-y-0 sm:tw-space-x-4 tw-pt-8 tw-border-t tw-border-gray-800/20">
                <button
                  onClick={handleClose}
                  disabled={isProcessing}
                  className="tw-flex-1 tw-px-8 tw-py-4 tw-bg-gradient-to-r tw-from-gray-800/80 tw-to-gray-700/80 tw-backdrop-blur-sm tw-text-gray-200 tw-rounded-2xl tw-font-semibold tw-hover:from-gray-700/90 tw-hover:to-gray-600/90 tw-hover:text-white tw-transition-all tw-duration-300 tw-disabled:opacity-50 tw-group tw-shadow-lg hover:tw-shadow-xl tw-transform hover:tw-scale-105 tw-border tw-border-gray-600/30 hover:tw-border-gray-500/50"
                >
                  <span className="tw-group-hover:tw-scale-105 tw-transition-transform tw-duration-300 tw-inline-block tw-drop-shadow-sm">Cancel</span>
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="tw-flex-1 tw-px-8 tw-py-4 tw-bg-gradient-to-r tw-from-purple-600 tw-to-purple-500 hover:tw-from-purple-700 hover:tw-to-purple-600 tw-text-white tw-rounded-2xl tw-font-bold tw-transition-all tw-duration-300 tw-disabled:opacity-50 tw-disabled:cursor-not-allowed tw-flex tw-items-center tw-justify-center tw-space-x-3 tw-shadow-2xl tw-shadow-purple-500/30 tw-hover:shadow-purple-500/50 tw-hover:scale-105 tw-transform tw-group tw-backdrop-blur-sm tw-relative tw-overflow-hidden"
                >
                  {!isProcessing && (
                    <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-r tw-from-white/10 tw-to-transparent tw-opacity-0 group-hover:tw-opacity-100 tw-transition-opacity tw-duration-300"></div>
                  )}
                  {isProcessing ? (
                    <>
                      <div className="tw-w-5 tw-h-5 tw-border-2 tw-border-white/30 tw-border-t-white tw-rounded-full tw-animate-spin" />
                      <span className="tw-drop-shadow-sm">Processing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="tw-w-5 tw-h-5 tw-group-hover:tw-rotate-12 tw-transition-transform tw-duration-300 tw-drop-shadow-sm tw-relative tw-z-10" />
                      <span className="tw-relative tw-z-10 tw-drop-shadow-sm">Pay Now</span>
                    </>
                  )}
                </button>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentPopup;