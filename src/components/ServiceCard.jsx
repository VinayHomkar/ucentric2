// src/components/ServiceCard.jsx

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you use react-router-dom

const MotionLink = motion(Link); // Animatable Link component

const ServiceCard = ({ service, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    // Only proceed if the ref is mounted
    if (divRef.current) {
      const bounds = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
  };

  return (
    <MotionLink // Use the MotionLink component for navigation with animation
      to={service.link}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      ref={divRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden m-4 rounded-2xl border border-[#38b6ff40]
      shadow-[0_0_20px_#00043320] hover:shadow-[0_0_35px_#38b6ff80]
      transition-all duration-500 group bg-white/5 dark:bg-[#000433]/80 backdrop-blur-md"
    >
      {/* 🔵 Hover Glow that follows the cursor */}
      <div
        className={`pointer-events-none blur-3xl rounded-full 
        bg-gradient-to-r from-[#38b6ff] via-[#1a4aff] to-[#000433] 
        w-[250px] h-[250px] absolute z-0 transition-opacity duration-500 mix-blend-screen 
        ${visible ? "opacity-60" : "opacity-0"}`}
        style={{ top: position.y - 125, left: position.x - 125 }}
      />

      {/* 🌟 Content */}
      <div className="relative z-10 flex items-center gap-6 p-8 transition-all duration-300 group-hover:scale-[1.02]">
        {/* Icon */}
        <div className="relative bg-gradient-to-br from-[#38b6ff] to-[#000433] p-[2px] rounded-full">
          <div className="bg-white dark:bg-[#000433] rounded-full p-4 w-[72px] h-[72px] flex justify-center items-center">
            {/* Render the service icon (emoji or character) */}
            <span className="text-4xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              {service.icon}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-[#38b6ff]">{service.title}</h3>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </MotionLink>
  );
};

export default ServiceCard;
