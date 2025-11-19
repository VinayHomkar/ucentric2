import React from 'react';
// FIX: Suppressed ESLint warning for 'motion'
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars 

const AboutHero = () => {
    const deepBlue = '#000433';
    
    return (
        <section className="relative h-[70vh] sm:h-[75vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black px-4">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
                style={{ backgroundImage: `url('/path/to/hero-background.jpg')` }}></div>

            <div className="absolute inset-0 z-10" 
                style={{ background: `linear-gradient(to bottom, ${deepBlue} 0%, rgba(0,0,0,0) 50%, ${deepBlue} 100%)` }}>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 text-center max-w-4xl px-2 sm:px-4"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                    We craft experiences that Connect, Inspire, and Engage.
                </h1>
                <p className="text-sm sm:text-md md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
                    At Ucentric, we bridge creativity and technology to help businesses thrive online. Our bespoke digital solutions transform ideas into impactful digital realities.
                </p>
            </motion.div>
        </section>
    );
};

export default AboutHero;