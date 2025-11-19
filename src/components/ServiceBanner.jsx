import React from 'react';
// FIX: Suppressed ESLint warning for 'motion'
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars 

const ServiceBanner = () => (
  <div className="relative h-[70vh] w-full bg-black overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80"
      alt="Tech Banner"
      className="absolute inset-0 w-full h-full object-cover opacity-30"
    />
    <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
      >
        Empowering Digital Growth
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg max-w-2xl text-gray-300"
      >
        Scalable, secure, and smart web solutions crafted for modern businesses.
      </motion.p>
    </div>
  </div>
);

export default ServiceBanner;