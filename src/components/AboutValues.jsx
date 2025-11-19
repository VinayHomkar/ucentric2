import React from 'react';
// FIX: Suppressed ESLint warning for 'motion'
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars 
import AccentDivider from './AccentDivider'; // Import centralized divider

const AboutValues = () => {
    // const brightBlue = '#38b6ff';
    // const deepBlue = '#000433';

    const values = [
        { number: '01', title: 'Quality', description: 'Where quality meets innovation in every digital solution.' },
        { number: '02', title: 'Commitment', description: 'At Ucentric, we are committed to turning your vision into results with dedication and precision.' },
        { number: '03', title: 'Devotion', description: 'Your satisfaction is our priority, and we are dedicated to delivering the very best in every project.' },
        { number: '04', title: 'Integrity', description: 'Our processes are fully transparent, and you can trust us to deliver work of the highest quality.' },
    ];

    const defaultVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="bg-black text-white py-16 sm:py-20 px-4 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }} viewport={{ once: true }}
                    className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient'
                >
                    Values That Shape Ucentric
                </motion.h2>

                <AccentDivider />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={defaultVariants}
                            initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="flex flex-col items-center"
                        >
                            <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold opacity-40 text-white mb-4">
                                {value.number}
                            </p>
                            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#38b6ff]">{value.title}</h3>
                            <p className="text-sm sm:text-md md:text-base text-white leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutValues;