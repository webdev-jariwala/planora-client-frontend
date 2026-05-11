import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AOS from "aos";
import { Phone, Mail, MapPin, Heart, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleHover = (item, state) => {
    setIsHovered(prev => ({ ...prev, [item]: state }));
  };

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  return (
    <footer className="tw-bg-[#080808] tw-text-white tw-relative tw-overflow-hidden tw-bottom-0 tw-pt-16 tw-px-5" style={{ fontFamily: 'DM Sans, sans-serif', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      
      {/* Enhanced Background Glows */}
      <div className="tw-absolute tw-inset-0 tw-overflow-hidden tw-pointer-events-none">
        <div className="tw-absolute tw-top-[-10%] tw-left-[-5%] tw-w-[30%] tw-h-[40%] tw-bg-purple-600/10 tw-blur-[120px] tw-rounded-full"></div>
        <div className="tw-absolute tw-bottom-[-10%] tw-right-[-5%] tw-w-[30%] tw-h-[40%] tw-bg-pink-600/10 tw-blur-[120px] tw-rounded-full"></div>
      </div>

      {/* Background Decorative Patterns */}
      <div className="tw-absolute tw-inset-0 tw-opacity-10 tw-pointer-events-none">
        <div className="tw-absolute tw-top-10 tw-left-10 tw-w-32 tw-h-32 tw-border tw-border-purple-500/30 tw-rotate-45"></div>
        <div className="tw-absolute tw-bottom-40 tw-right-20 tw-w-40 tw-h-40 tw-border tw-border-pink-500/20 tw-rounded-full"></div>
      </div>

      <div className="tw-container tw-mx-auto tw-px-4 tw-relative tw-z-10">
        
        {/* Contact Info Section - Modern Glass Cards */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8 tw-mb-20">
          {/* Phone */}
          <div data-aos="fade-up" data-aos-delay="100"
            className="tw-group tw-flex tw-flex-col tw-items-center tw-p-8 tw-rounded-3xl tw-bg-white/[0.02] tw-backdrop-blur-md tw-border tw-border-white/[0.05] tw-transition-all tw-duration-500 hover:tw-bg-white/[0.05] hover:tw-border-purple-500/40 hover:-tw-translate-y-2"
            onMouseEnter={() => handleHover('phone', true)}
            onMouseLeave={() => handleHover('phone', false)}
          >
            <div className={`tw-w-14 tw-h-14 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mb-5 tw-transition-all tw-duration-500 ${
              isHovered.phone ? 'tw-bg-purple-500 tw-shadow-[0_0_20px_rgba(168,85,247,0.4)] tw-rotate-[360deg]' : 'tw-bg-white/10'
            }`}>
              <Phone className={`tw-w-6 tw-h-6 tw-transition-colors ${isHovered.phone ? 'tw-text-white' : 'tw-text-purple-400'}`} />
            </div>
            <span className="tw-text-lg tw-font-medium tw-tracking-wide tw-text-purple-400">(+91) 91570 44142</span>
            <p className="tw-text-xs tw-text-gray-500 tw-mt-2 tw-uppercase tw-tracking-widest">Call us anytime</p>
          </div>

          {/* Email */}
          <div data-aos="fade-up" data-aos-delay="200"
            className="tw-group tw-flex tw-flex-col tw-items-center tw-p-8 tw-rounded-3xl tw-bg-white/[0.02] tw-backdrop-blur-md tw-border tw-border-white/[0.05] tw-transition-all tw-duration-500 hover:tw-bg-white/[0.05] hover:tw-border-pink-500/40 hover:-tw-translate-y-2"
            onMouseEnter={() => handleHover('email', true)}
            onMouseLeave={() => handleHover('email', false)}
          >
            <div className={`tw-w-14 tw-h-14 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mb-5 tw-transition-all tw-duration-500 ${
              isHovered.email ? 'tw-bg-pink-500 tw-shadow-[0_0_20px_rgba(236,72,153,0.4)] tw-rotate-[360deg]' : 'tw-bg-white/10'
            }`}>
              <Mail className={`tw-w-6 tw-h-6 tw-transition-colors ${isHovered.email ? 'tw-text-white' : 'tw-text-pink-400'}`} />
            </div>
            <span className="tw-text-lg tw-font-medium tw-tracking-wide tw-text-pink-400">hello@evenufy.com</span>
            <p className="tw-text-xs tw-text-gray-500 tw-mt-2 tw-uppercase tw-tracking-widest">Drop a message</p>
          </div>

          {/* Location */}
          <div data-aos="fade-up" data-aos-delay="300"
            className="tw-group tw-flex tw-flex-col tw-items-center tw-p-8 tw-rounded-3xl tw-bg-white/[0.02] tw-backdrop-blur-md tw-border tw-border-white/[0.05] tw-transition-all tw-duration-500 hover:tw-bg-white/[0.05] hover:tw-border-yellow-500/40 hover:-tw-translate-y-2"
            onMouseEnter={() => handleHover('location', true)}
            onMouseLeave={() => handleHover('location', false)}
          >
            <div className={`tw-w-14 tw-h-14 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-mb-5 tw-transition-all tw-duration-500 ${
              isHovered.location ? 'tw-bg-yellow-500 tw-shadow-[0_0_20px_rgba(234,179,8,0.4)] tw-rotate-[360deg]' : 'tw-bg-white/10'
            }`}>
              <MapPin className={`tw-w-6 tw-h-6 tw-transition-colors ${isHovered.location ? 'tw-text-white' : 'tw-text-yellow-400'}`} />
            </div>
            <span className="tw-text-lg tw-font-medium tw-tracking-wide tw-text-yellow-400">Surat, Gujarat, India</span>
            <p className="tw-text-xs tw-text-gray-500 tw-mt-2 tw-uppercase tw-tracking-widest">Visit our office</p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-12 tw-gap-12 tw-mb-16">
          {/* Links Section */}
          <div className="lg:tw-col-span-7">
            <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-8">
              {/* About */}
              <div data-aos="fade-right">
                <h3 className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.2em] tw-text-purple-400 tw-mb-8 ">
                  Company
                </h3>
                <ul className="tw-space-y-4">
                  {['Our Story', 'Awards', 'Our Team', 'Careers'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="tw-text-gray-500 tw-no-underline hover:tw-text-purple-400 hover:tw-translate-x-2 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-group">
                        <span className="tw-w-0 group-hover:tw-w-4 tw-h-[1px] tw-bg-purple-400 tw-mr-0 group-hover:tw-mr-2 tw-transition-all"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div data-aos="fade-right" data-aos-delay="100">
                <h3 className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.2em] tw-mb-8 tw-text-pink-400">
                  Services
                </h3>
                <ul className="tw-space-y-4">
                  {['Event Planning', 'Event Booking', 'Venue Management', 'Support'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="tw-text-gray-500 tw-no-underline hover:tw-text-pink-400 hover:tw-translate-x-2 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-group">
                        <span className="tw-w-0 group-hover:tw-w-4 tw-h-[1px] tw-bg-pink-400 tw-mr-0 group-hover:tw-mr-2 tw-transition-all"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div data-aos="fade-right" data-aos-delay="200">
                <h3 className="tw-text-sm tw-font-bold tw-uppercase tw-tracking-[0.2em] tw-mb-8 tw-text-yellow-400">
                  Legal
                </h3>
                <ul className="tw-space-y-4">
                  {['Blog', 'Help Center', 'Privacy Policy', 'Terms of Service'].map((item) => (
                    <li key={item}>
                      <Link to="/" className="tw-text-gray-500 tw-no-underline hover:tw-text-yellow-400 hover:tw-translate-x-2 tw-transition-all tw-duration-300 tw-flex tw-items-center tw-group">
                        <span className="tw-w-0 group-hover:tw-w-4 tw-h-[1px] tw-bg-yellow-400 tw-mr-0 group-hover:tw-mr-2 tw-transition-all"></span>
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section - More Integrated Look */}
          <div className="lg:tw-col-span-5">
            <div data-aos="fade-left" className="tw-p-8 tw-rounded-3xl tw-bg-gradient-to-br tw-from-white/[0.03] tw-to-transparent tw-border tw-border-white/[0.05]">
              <h3 className="tw-text-xl tw-font-bold tw-mb-4 tw-bg-gradient-to-r tw-from-purple-400 tw-via-pink-400 tw-to-yellow-400 tw-bg-clip-text tw-text-transparent">
                Join the inner circle
              </h3>
              <p className="tw-text-sm tw-text-gray-400 tw-mb-6 tw-leading-relaxed">
                Experience the finest events. Subscribe for exclusive early-access and curated updates.
              </p>
              <form onSubmit={handleSubmit} className="tw-relative tw-flex tw-flex-col sm:tw-flex-row tw-gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="tw-flex-1 tw-px-5 tw-py-3.5 tw-rounded-2xl tw-bg-[#121212] tw-border tw-border-white/10 tw-text-white tw-placeholder-gray-600 focus:tw-outline-none focus:tw-border-purple-500/50 focus:tw-ring-4 focus:tw-ring-purple-500/5 tw-transition-all"
                  required
                />
                <button
                  type="submit"
                  className="tw-px-8 tw-py-3.5 tw-bg-white tw-text-black tw-font-bold tw-rounded-2xl hover:tw-bg-gradient-to-r hover:tw-from-purple-500 hover:tw-to-pink-500 hover:tw-text-white tw-transition-all tw-duration-500 hover:tw-shadow-[0_10px_20px_rgba(168,85,247,0.3)]"
                >
                  Join
                </button>
              </form>
              
              <div className="tw-flex tw-gap-4 tw-mt-8">
                <div className="tw-flex tw-items-center tw-space-x-2 tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-purple-500/5 tw-border tw-border-purple-500/10">
                  <div className="tw-w-1.5 tw-h-1.5 tw-bg-purple-500 tw-rounded-full tw-animate-pulse"></div>
                  <span className="tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-purple-300">Weekly Events</span>
                </div>
                <div className="tw-flex tw-items-center tw-space-x-2 tw-px-3 tw-py-1.5 tw-rounded-full tw-bg-pink-500/5 tw-border tw-border-pink-500/10">
                  <div className="tw-w-1.5 tw-h-1.5 tw-bg-pink-500 tw-rounded-full tw-animate-pulse"></div>
                  <span className="tw-text-[10px] tw-uppercase tw-tracking-widest tw-text-pink-300">Exclusive Deals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="tw-border-t tw-border-white/5 tw-pt-10 tw-pb-10">
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center tw-space-y-6 md:tw-space-y-0">
            {/* Copyright */}
            <div className="tw-text-center md:tw-text-left">
              <p className="tw-text-gray-500 tw-text-sm tw-font-light tw-tracking-wide">
                © {new Date().getFullYear()} <span className="tw-text-white tw-font-medium">EvenuFy</span>. Crafting experiences with{' '}
                <Heart className="tw-w-3.5 tw-h-3.5 tw-inline tw-text-red-500 tw-fill-red-500 tw-mx-0.5" />{' '}
                globally.
              </p>
            </div>

            {/* Social Links - Orb Style */}
           <div className="tw-flex tw-space-x-5 tw-mr-[150px]">

              {[
                { icon: Twitter, name: 'twitter', color: 'hover:tw-text-[#1DA1F2]' },
                { icon: Facebook, name: 'facebook', color: 'hover:tw-text-[#1877F2]' },
                { icon: Instagram, name: 'instagram', color: 'hover:tw-text-[#E4405F]' }
              ].map(({ icon: Icon, name, color }) => (
                <a
                  key={name}
                  href="/"
                  className={`tw-w-12 tw-h-12 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-transition-all tw-duration-500 tw-bg-white/[0.03] tw-border tw-border-white/10 ${color} hover:tw-border-purple-500/50 hover:tw-bg-white/[0.08] hover:-tw-translate-y-1 hover:tw-shadow-[0_5px_15px_rgba(0,0,0,0.3)]`}
                  onMouseEnter={() => handleHover(name, true)}
                  onMouseLeave={() => handleHover(name, false)}
                >
                  <Icon className={`tw-w-5 tw-h-5 tw-transition-transform tw-duration-500 ${isHovered[name] ? 'tw-scale-110' : ''}`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Gradient Line */}
        <div className="tw-h-[1px] tw-w-full tw-bg-gradient-to-r tw-from-transparent tw-via-white/10 tw-to-transparent tw-mb-4"></div>
      </div>

      {/* Enhanced Floating Animated Elements */}
      <div className="tw-absolute tw-top-[20%] tw-right-[10%] tw-w-1 tw-h-1 tw-bg-purple-400 tw-rounded-full tw-animate-ping"></div>
      <div className="tw-absolute tw-bottom-[40%] tw-left-[5%] tw-w-1 tw-h-1 tw-bg-pink-400 tw-rounded-full tw-animate-pulse"></div>
      <div className="tw-absolute tw-top-[60%] tw-right-[30%] tw-w-1.5 tw-h-1.5 tw-bg-yellow-400/30 tw-rounded-full tw-animate-bounce"></div>
    </footer>
  );
};

export default Footer;