import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Send, MessageCircle, X, Loader2, Sparkles, Zap } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const ChatBot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef(null);
  const chatBoxRef = useRef(null);
  const chatButtonRef = useRef(null);

  const checkUserLogIn = async () => {
    try {
      const res = await axios.get("http://localhost:4000/user/isUserLoggedIn", {
        withCredentials: true,
      });
      if (res.data.message === "New User") {
        navigate("/Signup");
        toast.error("You Needed to Login First", {
          style: { fontFamily: "DM Sans ExtraBold" },
        });
      } else if (res.data.message === "User is already logged In") {
        setIsChatOpen(true);
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response.data?.message ===
        "Login Session Expired. You need to log in again."
      ) {
        navigate("/login");
      }
      console.log(error.response.data?.error || error.message);
    }
  };
  // Detect click outside the chat box
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if chat box is open and click happens outside it & outside chat button → close
      if (
        isChatOpen &&
        chatBoxRef.current &&
        !chatBoxRef.current.contains(event.target) &&
        (!chatButtonRef.current ||
          !chatButtonRef.current.contains(event.target))
      ) {
        setIsChatOpen(false);
      }
    };

    // Always listen while chat is open
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput("");

    const newMessages = [...chatMessages, { type: "user", text: userMessage }];
    setChatMessages(newMessages);

    setIsTyping(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/chatBot/ask",
        {
          message: userMessage,
          eventId: location.pathname.startsWith("/EventDetailsPage")
            ? location.pathname.split("/")[2]
            : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      setIsTyping(false);

      const updatedMessages = [
        ...newMessages,
        {
          type: "bot",
          text: data.reply || data.response || "I received your message!",
        },
      ];

      setChatMessages(updatedMessages.slice(-10));
    } catch (error) {
      setIsTyping(false);
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setChatMessages([...newMessages, { type: "bot", text: errorMessage }]);
      console.log(error.message);
      console.log(error.response.data.error);
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);
  return (
    <>
      {/* AI Chat Widget - Redesigned */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            ref={chatButtonRef}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              checkUserLogIn();
            }}
            className={`tw-fixed tw-bottom-8 ${
              location.pathname == "/OrganizerMainDashboard"
                ? "tw-left-8"
                : "tw-right-8"
            } tw-rounded-full tw-bg-gradient-to-br tw-from-[#a453f6] tw-to-[#f963fe] tw-to-[#fc54a8] tw-p-5 tw-shadow-2xl tw-z-50 tw-cursor-pointer tw-group`}
            style={{
              boxShadow:
                "0 0 60px rgba(192, 132, 252, 0.5), 0 0 100px rgba(244, 114, 182, 0.2)",
            }}
          >
            <MessageCircle className="tw-w-7 tw-h-7 tw-text-white" />
            <motion.div
              className="tw-absolute tw-top-0 tw-right-1 tw-w-3 tw-h-3 tw-bg-[#5bfe97] tw-rounded-full tw-border-2 tw-border-[#111827]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box - Premium Redesign */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            ref={chatBoxRef}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={`tw-fixed tw-bottom-6 ${
              location.pathname == "/OrganizerMainDashboard"
                ? "tw-left-8"
                : "tw-right-8"
            } tw-w-[440px] tw-h-[650px] tw-bg-[#111] tw-z-50 tw-flex tw-flex-col tw-rounded-3xl tw-shadow-2xl tw-overflow-hidden tw-border tw-border-[#374151]`}
            style={{
              boxShadow:
                "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 100px rgba(192, 132, 252, 0.2)",
            }}
          >
            {/* Chat Header - Premium Design */}
            <div className="tw-relative tw-p-6 tw-overflow-hidden">
              {/* Animated background pattern */}
              <motion.div
                className="tw-absolute tw-inset-0 tw-opacity-20"
                style={{ fontFamily: "DM Sans Normal" }}
                // animate={{
                //   backgroundPosition: ["0% 0%", "100% 100%"],
                // }}
                // transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                // style={{
                //   backgroundImage:
                //     "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                //   backgroundSize: "30px 30px",
                // }}
              />

              <div className="tw-relative tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-gap-4">
                  <motion.div
                    className="tw-w-12 tw-h-12 tw-rounded-2xl tw-bg-white/20 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-border tw-border-white/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="tw-w-6 tw-h-6 tw-text-white" />
                  </motion.div>
                  <div className="-tw-mb-4">
                    <h3
                      className="tw-font-bold tw-text-white tw-text-lg tw-leading-tight"
                      style={{ fontFamily: "DM Sans Normal" }}
                    >
                      EvenueFy AI
                    </h3>
                    <div className="tw-flex tw-items-center tw-gap-2 tw-mt-1">
                      <div className="tw-w-2 tw-h-2 tw-bg-[#22c55e] tw-rounded-full tw-animate-pulse -tw-mt-4" />
                      <p className="tw-text-xs tw-text-white/90 tw-font-medium">
                        Online now
                      </p>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsChatOpen(false)}
                  className="tw-w-10 tw-h-10 tw-rounded-xl tw-bg-white/20 tw-backdrop-blur-md tw-flex tw-items-center tw-justify-center tw-border tw-border-white/30 hover:tw-bg-white/30 tw-transition-colors"
                >
                  <X className="tw-w-5 tw-h-5 tw-text-white" />
                </motion.button>
              </div>
            </div>

            {/* Chat Messages - Enhanced */}
            <div
              ref={chatScrollRef}
              className="tw-flex-1 tw-overflow-y-auto tw-p-5 tw-space-y-4 tw-bg-gradient-to-b tw-from-[#111] tw-via-[#241334] tw-to-[#111]"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(192, 132, 252, 0.9) transparent", // For Firefox
              }}
              //   style={{
              //     backgroundImage: `
              //       radial-gradient(circle at 10% 20%, rgba(192, 132, 252, 0.05) 0%, transparent 30%),
              //       radial-gradient(circle at 90% 80%, rgba(244, 114, 182, 0.05) 0%, transparent 30%)
              //     `,
              //   }}
            >
              {chatMessages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tw-text-center tw-mt-16"
                  style={{ fontFamily: "DM Sans Normal" }}
                >
                  <motion.div
                    className="tw-w-24 tw-h-24 tw-mx-auto tw-mb-5 tw-rounded-3xl tw-bg-gradient-to-br tw-from-[#a453f6] tw-to-[#fe63b3] tw-flex tw-items-center tw-justify-center tw-relative"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(192, 132, 252, 0.1)",
                        "0 0 40px rgba(192, 132, 252, 0.3)",
                        "0 0 20px rgba(192, 132, 252, 0.1)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="tw-w-12 tw-h-12 tw-text-white" />
                  </motion.div>
                  <h4 className="tw-text-white tw-text-xl tw-font-bold tw-mb-2">
                    Welcome to EvenuFy!
                  </h4>
                  <p className="tw-text-[#9ca3af] tw-text-base tw-leading-relaxed tw-max-w-xs tw-mx-auto">
                    Ask me anything about events, bookings, or features. I'm
                    here to help! ✨
                  </p>
                </motion.div>
              )}

              {chatMessages.map((msg, index) => (
                <motion.div
                  style={{ fontFamily: "DM Sans Normal" }}
                  key={index}
                  initial={{
                    opacity: 0,
                    x: msg.type === "user" ? 30 : -30,
                    scale: 0.95,
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`tw-flex ${
                    msg.type === "user" ? "tw-justify-end" : "tw-justify-start"
                  }`}
                >
                  <div
                    className={`tw-max-w-[85%] tw-px-5 tw-pt-4 tw-rounded-2xl tw-shadow-lg ${
                      msg.type === "user"
                        ? "tw-bg-gradient-to-br tw-from-[#a453f6] tw-to-[#fe63b3] tw-text-white tw-rounded-br-md"
                        : "tw-bg-[#2d2d2d] tw-text-white tw-border tw-border-[#374151] tw-rounded-bl-md"
                    }`}
                    style={
                      msg.type === "user"
                        ? {
                            boxShadow: "0 8px 24px rgba(192, 132, 252, 0.1)",
                          }
                        : {
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          }
                    }
                  >
                    {msg.type === "user" ? (
                      <p
                        className="tw-text-sm tw-leading-relaxed"
                        style={{ fontFamily: "DM Sans Normal" }}
                      >
                        {msg.text}
                      </p>
                    ) : (
                      <p
                        className="tw-text-sm tw-leading-relaxed"
                        style={{ fontFamily: "DM Sans Normal" }}
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="tw-flex tw-justify-start"
                >
                  <div className="tw-bg-[#1f2937] tw-border tw-border-[#374151] tw-px-5 tw-py-3.5 tw-rounded-2xl tw-rounded-bl-md tw-flex tw-items-center tw-gap-3 tw-shadow-lg">
                    <Loader2 className="tw-w-5 tw-h-5 tw-text-[#c084fc] tw-animate-spin" />
                    <span
                      className="tw-text-sm tw-text-[#9ca3af]"
                      style={{ fontFamily: "DM Sans Normal" }}
                    >
                      EvenuFy AI is thinking...
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input - Redesigned */}
            <div className="tw-p-5 tw-border-t-8 tw-border-[#ffffff] tw-bg-[#111]">
              <div className="tw-flex tw-gap-3 tw-items-center">
                <div className="tw-flex-1 tw-relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleChatKeyPress}
                    placeholder="Ask me anything..."
                    className="tw-w-full tw-bg-[#111827] tw-border tw-border-[#374151] tw-rounded-2xl tw-px-5 tw-py-3.5 tw-pr-12 tw-text-white tw-text-sm tw-placeholder-[#6b7280] focus:tw-outline-none focus:tw-border-[#c084fc] focus:tw-ring-2 focus:tw-ring-[#c084fc]/20 tw-transition-all tw-duration-300"
                    style={{ fontFamily: "DM Sans Normal" }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleChatSend}
                  disabled={!chatInput.trim()}
                  className="tw-bg-gradient-to-br tw-from-[#a453f6] tw-to-[#fe63b3] tw-border-none tw-outline-none tw-text-white tw-p-3.5 tw-rounded-2xl tw-shadow-lg disabled:tw-opacity-40 disabled:tw-cursor-not-allowed tw-transition-all tw-duration-300 tw-flex-shrink-0"
                  style={{
                    boxShadow: chatInput.trim()
                      ? "0 8px 24px rgba(192, 132, 252, 0.4)"
                      : "none",
                  }}
                >
                  <Send className="tw-w-5 tw-h-5" />
                </motion.button>
              </div>
              <p
                className="tw-text-xs tw-text-[#6b7280] tw-mt-4 -tw-mb-2 tw-text-center"
                style={{ fontFamily: "DM Sans Normal" }}
              >
                Press <span className="tw-text-[#c084fc]">Enter</span> to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
