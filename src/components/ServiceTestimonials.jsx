import React, { useState, useEffect } from "react";
import AccentDivider from "./AccentDivider"; // Reused component

const clients = [
  "Phoenix Fire",
  "All In All Avva",
  "Balaji Agencies",
  "Arohi Designer",
  "MD Wood Works",
  "Flowers",
  "Balaji Pawn Shop",
];

const testimonialsData = [
  {
    name: "Sathish K",
    role: "Founder - Phoenix Fire",
    feedback:
      "Ucentric delivered a modern, fast, and visually appealing website that truly reflects our brand identity.",
  },
  {
    name: "Uma Deve",
    role: "Director - All In All Avva",
    feedback:
      "Their team was professional, proactive, and very responsive. Our online presence has never looked better!",
  },
  {
    name: "Arjun Balaji",
    role: "Owner - Balaji Agencies",
    feedback:
      "The website design and functionality exceeded our expectations. We received numerous compliments from clients.",
  },
  {
    name: "Vijayalakxmi",
    role: "Creative Head - Arohi Designer",
    feedback:
      "Ucentric transformed our ideas into a beautiful digital experience. The support and communication were excellent.",
  },
  {
    name: "Madan",
    role: "CEO - MD Wood Works",
    feedback:
      "From concept to delivery, their expertise was outstanding. The project was completed on time and to our satisfaction.",
  },
  {
    name: "Sneha F",
    role: "Manager - Flowers",
    feedback:
      "The team provided innovative solutions and helped us elevate our brand digitally. Very happy with their work!",
  },
  {
    name: "Ramesh P",
    role: "Owner - Balaji Pawn Shop",
    feedback:
      "Professional, creative, and reliable. Ucentric delivered a smooth, user-friendly website with excellent support.",
  },
];

const ServiceTestimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="clients"
      className="py-20 px-6 bg-black text-white text-center"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
        They Trust Us
      </h2>

      <AccentDivider />

      <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
        Join the ranks of our satisfied clients who rely on Ucentric for
        exceptional digital solutions.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-6xl mx-auto mb-12">
        {clients.map((name, i) => (
          <div
            key={i}
            className="bg-[#000814]/40 p-4 rounded-xl flex items-center justify-center text-sm text-gray-300"
          >
            {name}
          </div>
        ))}
      </div>
      <div className="max-w-3xl mx-auto mt-30">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
          Client Testimonial
        </h3>

        <AccentDivider />

        <div className="bg-[#000814]/60 rounded-2xl p-6 shadow-lg transition-all duration-200">
          <p className="text-gray-300 mb-4">
            “{testimonialsData[current].feedback}”
          </p>
          <strong>
            — {testimonialsData[current].name}, {testimonialsData[current].role}
          </strong>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
