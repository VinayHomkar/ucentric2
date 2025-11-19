import React, { useState, useRef, useEffect } from "react";
import ContactDetails from "./ContactDetails";
import EnquiryForm from "./EnquiryForm";
// FIX: Added eslint-disable-line to suppress 'motion' unused variable warning
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

// ✅ Animated Accent Divider (FIXED CLEANUP LOGIC)
const AccentDivider = ({ align = "center" }) => {
  // FIX: Removed unused 'useState' and 'useEffect' dependency cleanup redundancy
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect once triggered
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    // Cleanup: Disconnect the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: isVisible ? "100px" : "0px",
        height: "4px",
        backgroundColor: "#38b6ff",
        margin: align === "center" ? "20px auto 40px auto" : "20px 0 40px 0",
        transition: "width 0.6s ease-out",
        borderRadius: "2px",
      }}
    ></div>
  );
};

const ContactUsPage = () => {
  // FIX: Suppress unused warning for AccentDivider if not used elsewhere
  // eslint-disable-next-line no-unused-vars
  const unusedAccentDivider = AccentDivider;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="contact-us"
      // ★★★ FIX 1: Adjusted padding for better responsiveness ★★★
      className="relative pt-20 pb-0 px-6 sm:px-10 lg:px-16 bg-black mb-10"
    >
      {/* --- Background Element for Glass Effect --- */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      {/* --- Content Overlay --- */}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          // ★★★ FIX 2: Reduced the aggressive font sizing ★★★
          className="text-4xl sm:text-5xl lg:text-6xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
        >
          Let’s get in touch
        </motion.h1>

        {/* ✅ ADDED: Accent Divider */}
        <AccentDivider />

        {/* Main Two-Column Layout (This layout is already good!) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Side: Contact Details */}
          <ContactDetails />

          {/* Right Side: Enquiry Form */}
          <EnquiryForm />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
