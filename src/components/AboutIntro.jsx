import React from 'react';
// FIX: Suppressed ESLint warning for 'motion'
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars 
import AccentDivider from './AccentDivider'; // Import centralized divider

const AboutIntro = () => {
    return (
        <section className="bg-black text-white py-16 sm:py-20 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                        Beyond Websites — Crafting Complete Digital Journeys in Bangalore
                    </h2>
                    
                    <AccentDivider align="left" />
                </motion.div>

                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } } }}
                    className="text-sm sm:text-md md:text-lg text-white space-y-4"
                >
                    <p>Founded in 2024 in Bangalore, Ucentric Web Solutions is a modern digital agency dedicated to empowering businesses with end-to-end digital solutions. We go beyond traditional web design and development, offering services that span web and app development, branding, digital marketing, and technology consulting.</p>
                    <p>At Ucentric, we believe in crafting meaningful digital experiences that help brands connect, grow, and lead in an ever-evolving digital landscape. Our approach combines creativity, technology, and strategy, ensuring every project we deliver is tailored, impactful, and future-ready.</p>
                    <p>From startups to established enterprises, we are committed to being Bangalore’s trusted partner for complete digital transformation.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutIntro;