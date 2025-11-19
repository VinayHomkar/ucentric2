import React, { useState, useRef, useCallback } from "react";
// FIX: Added eslint-disable-line to suppress 'motion' unused variable warning
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import toast from "react-hot-toast"; // Ensure you have <Toaster /> in your main App.jsx
import {
  FiPhone,
  FiMail,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// --- Interactive Button with Glow Effect ---
const InteractiveButton = ({ children, onClick, className }) => {
  const buttonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Using useCallback to ensure handleMouseMove function identity is stable
  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    // Calculate position relative to the element
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []); // Dependencies are stable

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset glow position smoothly
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const dynamicGlowStyle = {
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
    // The glow effect uses CSS variables defined above
    backgroundImage: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(56,182,255,0.35) 0%, transparent 45%)`,
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative rounded-lg p-4 transition-all duration-300 text-left w-full ${className}`}
      style={{
        backgroundColor: "rgba(56,182,255,0.08)",
        border: "1px solid rgba(56,182,255,0.4)",
        boxShadow: isHovered
          ? "0 0 20px 6px rgba(56,182,255,0.4)"
          : "0 0 6px rgba(56,182,255,0.2)",
      }}
    >
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-300 z-10 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={dynamicGlowStyle}
      ></div>
      <div
        className={`absolute inset-0 rounded-lg transition-opacity duration-300 z-0 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow: "inset 0 0 12px rgba(56,182,255,0.3)",
        }}
      ></div>
      <div className="relative z-20 w-full h-full text-left">{children}</div>
    </button>
  );
};

// --- Contact Details Component ---
const ContactDetails = () => {
  // FIX: Wrapped handleCopy in useCallback for stability (though not strictly required here, it's a good practice for utility functions)
  const handleCopy = useCallback((text, message) => {
    if (!navigator.clipboard) {
      toast.error("Copying not supported.");
      return;
    }
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(message))
      .catch(() => toast.error("Failed to copy."));
  }, []); // Empty dependency array means this function is stable

  const phoneNumber = "+917406167017";
  const emailAddress = "contact@ucentric.in";
  const whatsappLink = "https://wa.me/917406167017";
  const linkedinLink =
    "https://www.linkedin.com/company/ucentric-official/about/?viewAsMember=true";
  const twitterLink = "https://x.com/Ucentric187302";
  const instagramLink = "https://www.instagram.com/ucentric.official/?hl=en";

  // FIX: Wrapped handlers in useCallback
  const handlePhoneClick = useCallback(() => {
    const isMobile = /Mobi/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      handleCopy(phoneNumber, "Phone number copied!");
    }
  }, [handleCopy, phoneNumber]);

  const handleEmailClick = useCallback(() => {
    window.location.href = `mailto:${emailAddress}`;
  }, [emailAddress]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="p-6 sm:p-8 md:p-12 relative overflow-hidden rounded-xl bg-transparent text-white"
    >
      <div className="relative z-10">
        <h2 className="text-3xl mb-12 font-semibold text-center lg:text-left bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
          CONTACT US
        </h2>

        <div className="flex flex-col gap-6">
          <InteractiveButton onClick={handlePhoneClick}>
            <p className="text-sm font-semibold uppercase opacity-80 mb-1 flex items-center gap-2">
              <FiPhone className="w-4 h-4" /> CONTACT US
            </p>
            <p className="text-xl font-bold">{phoneNumber}</p>
          </InteractiveButton>

          <InteractiveButton onClick={handleEmailClick}>
            <p className="text-sm font-semibold uppercase opacity-80 mb-1 flex items-center gap-2">
              <FiMail className="w-4 h-4" /> MAIL US TO
            </p>
            <p className="text-xl font-bold">{emailAddress}</p>
          </InteractiveButton>
        </div>

        <div className="mt-10 flex gap-4 justify-center sm:justify-start">
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#0077B5] text-[#0077B5]"
          >
            <FiLinkedin className="text-xl" />
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#DD2A7B] text-[#DD2A7B]"
          >
            <FiInstagram className="text-xl" />
          </a>
          <a
            href={twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#1DA1F2] text-[#1DA1F2]"
          >
            <FiTwitter className="text-xl" />
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-green-400 text-green-400 rounded-lg"
          >
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactDetails;
