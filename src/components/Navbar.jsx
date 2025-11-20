import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = isScrolled
    ? "bg-transparent backdrop-blur-none shadow-none"
    : "bg-black shadow-md";

  return (
    <>
      {/* Background tap overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

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
          overflow-x-hidden
          ${navbarClasses}
        `}
      >
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
            max-sm:gap-6   /* ADDED gap between links */
            max-sm:overflow-x-hidden
            max-sm:overflow-y-auto
            ${
              sidebarOpen
                ? "max-sm:w-56 max-sm:pl-8"
                : "max-sm:w-0 max-sm:h-0 overflow-hidden"
            }

            /* Desktop */
            sm:items-center sm:gap-5
          `}
        >
          <img
            src={assets.close_icon}
            alt="close"
            className="absolute w-5 cursor-pointer right-4 top-4 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />

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
              className="relative pb-1 text-white transition-all duration-300 group"
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
    </>
  );
};

export default Navbar;
