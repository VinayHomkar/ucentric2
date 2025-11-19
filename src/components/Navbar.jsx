import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
// FIX: Changed import path to "framer-motion" and added comment to suppress the 'unused' warning
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = isScrolled
    ? "bg-transparent backdrop-blur-none shadow-none"
    : "bg-black shadow-md";

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed top-0 left-0 w-full z-50
        flex justify-between items-center
        px-6 sm:px-10 lg:px-16 py-4
        font-medium text-white
        transition-all duration-700
        overflow-x-hidden    /* IMPORTANT FIX */
        ${navbarClasses}
      `}
    >
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        style={{ width: "90px", height: "auto" }}
      />

      {/* Navigation Menu */}
      <div
        className={`
          flex transition-all

          /* Mobile Sidebar */
          max-sm:fixed max-sm:top-0 max-sm:bottom-0 max-sm:right-0
          max-sm:flex-col max-sm:bg-[#000]/95 max-sm:text-white max-sm:pt-20
          max-sm:overflow-x-hidden    /* FIX overflow */
          max-sm:overflow-y-auto      /* allow only vertical scroll */

          ${
            sidebarOpen
              ? "max-sm:w-56 max-sm:pl-8" /* reduced width FIX */
              : "max-sm:w-0 max-sm:h-0 overflow-hidden"
          }

          /* Desktop */
          sm:items-center sm:gap-5
        `}
      >
        {/* Close Icon (Mobile Only) */}
        <img
          src={assets.close_icon}
          alt="close"
          className="w-5 absolute right-4 top-4 sm:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />

        {/* Nav Links */}
        {[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/About" },
          { label: "Services", href: "/ServicePage" },
          { label: "Contact Us", href: "/Contact" },
        ].map((link, index) => (
          <a
            key={index}
            href={link.href}
            onClick={() => setSidebarOpen(false)}
            className="relative pb-1 group transition-all duration-300 text-white"
          >
            {link.label}
            <span
              className="
                absolute left-0 bottom-0 w-full h-[3px]
                bg-[linear-gradient(90deg,#38b6ff,#000433,#000433)]
                bg-[length:200%_100%] opacity-0 scale-x-0
                group-hover:opacity-100 group-hover:scale-x-100
                transition-all duration-700 ease-out rounded-full
              "
            ></span>
          </a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div
        onClick={() => setSidebarOpen(true)}
        className="
          w-10 h-8 sm:hidden flex flex-col items-end justify-start 
          gap-1.5 cursor-pointer overflow-hidden 
          /* mt-4 removed FIX */
        "
      >
        <div className="h-[2.5px] w-6 rounded-full bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient"></div>
        <div className="h-[2.5px] w-full rounded-full bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient"></div>
        <div className="h-[2.5px] w-6 rounded-full bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient"></div>
      </div>

      {/* Desktop Connect Button */}
      <a
        href="/Contact"
        className="
          text-sm flex items-center gap-2
          bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
          text-white px-6 py-2 rounded-full
          cursor-pointer hover:scale-105 transition-all
          max-sm:hidden
        "
      >
        Connect
        <img src={assets.arrow_icon} width={14} alt="arrow" />
      </a>
    </motion.div>
  );
};

export default Navbar;
