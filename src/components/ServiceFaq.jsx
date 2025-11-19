import React, { useState } from "react";
// FIX: Suppressed ESLint warning for 'motion'
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import AccentDivider from "./AccentDivider"; // Reused component

const faqs = [
  {
    q: "What services do you offer?",
    a: "We offer web development, LMS solutions, server management, and cybersecurity services.",
  },
  {
    q: "Do you provide support after project completion?",
    a: "Yes! We provide continuous support and upgrades post-project.",
  },
  {
    q: "What security standards do you follow for web designing?",
    a: "We follow strict protocols ensuring client data is fully protected at every stage, with thorough security checks and utmost confidentiality.",
  },
  {
    q: "How do you decide the best technology for my project?",
    a: "We analyze your project goals, requirements, and budget to select technologies ensuring scalability, performance, and maintainability.",
  },
  {
    q: "How are resources assigned to a new project?",
    a: "Resources are assigned based on project scope and expertise required. Skilled designers, developers, and managers are allocated for timely, quality delivery.",
  },
];

const ServiceFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faqs" className="py-20 px-6 bg-black text-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
      >
        FAQs
      </motion.h2>

      <AccentDivider />

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#1a4aff]/20 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-medium bg-[#000814]/60 hover:bg-[#000814]/80"
            >
              <span>{faq.q}</span>
              <span
                className={`text-gray-400 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {/* FIX: Wrapped conditional motion.div in AnimatePresence to solve the "Element type is invalid" error */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-300 text-sm bg-[#000814]/50"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceFaq;
