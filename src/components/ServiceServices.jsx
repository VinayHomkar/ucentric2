import React, { useState, useRef } from "react";
// FIX: Suppressed ESLint warning for 'motion'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useNavigate } from "react-router-dom";
import AccentDivider from "./AccentDivider"; // Reused component

// Service Data (Moved out of component for stability)
const serviceData = [
  {
    icon: "💻",
    title: "Website Design",
    description:
      "Top-quality web design with user-friendly interfaces and brand-focused aesthetics.",
    link: "/Websitedesign",
  },
  {
    icon: "🛒",
    title: "E-Commerce Development",
    description:
      "Data-driven strategies to handle diverse eCommerce challenges.",
    link: "/Ecommerce",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    description:
      "Engaging mobile apps using the latest technologies for seamless UX.",
    link: "/Mobileapp",
  },
  {
    icon: "📊",
    title: "Digital Marketing",
    description:
      "Effective digital strategies to boost your brand visibility and engagement.",
    link: "/Digitalmarketing",
  },
  {
    icon: "🔍",
    title: "Portfolio",
    description:
      "A professional portfolio highlighting skills, achievements, and innovative projects across multiple domains.",
    link: "/Portfolio",
  },
  {
    icon: "🎓",
    title: "College/Student Projects",
    description:
      "Guidance and support for students and colleges on practical technical projects.",
    link: "/StudentProjects",
  },
];

// Service Card Component (Moved and kept fixes)
const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    // FIX: Stability check for divRef.current
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      ref={divRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(service.link)}
      className="relative overflow-hidden m-4 rounded-2xl border border-[#38b6ff40]
        shadow-[0_0_20px_#00043320] hover:shadow-[0_0_35px_#38b6ff80]
        transition-all duration-500 group bg-white/5 dark:bg-[#000433]/80 backdrop-blur-md cursor-pointer flex flex-col items-center p-8 hover:scale-105"
    >
      {/* 🔵 Hover Glow */}
      <div
        className={`pointer-events-none blur-3xl rounded-full 
          bg-gradient-to-r from-[#38b6ff] via-[#1a4aff] to-[#000433] 
          w-[250px] h-[250px] absolute z-0 transition-opacity duration-500 mix-blend-screen 
          ${visible ? "opacity-60" : "opacity-0"}`}
        style={{ top: position.y - 125, left: position.x - 125 }}
      />

      {/* 🌟 Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative bg-gradient-to-br from-[#38b6ff] to-[#000433] p-[2px] rounded-full mb-4">
          <div className="bg-white dark:bg-[#000433] rounded-full p-6 flex justify-center items-center">
            <span className="text-4xl">{service.icon}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#38b6ff] text-center">
          {service.title}
        </h3>
        <p className="text-gray-300 text-sm text-center leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

const ServiceServices = () => (
  <section
    id="services"
    className="py-20 px-6 bg-black text-white text-center relative"
  >
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
    >
      Our Services
    </motion.h2>

    <AccentDivider />

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
      {serviceData.map((service, index) => (
        <ServiceCard key={index} service={service} index={index} />
      ))}
    </div>
  </section>
);

export default ServiceServices;
