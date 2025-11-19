import React from "react";
// FIX: Suppressed ESLint warning for 'motion'
import { motion, useInView } from "framer-motion"; // eslint-disable-line no-unused-vars

const AnimatedStat = ({ value, label, color, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = React.useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ""), 10);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500;
      const stepTime = 20;
      const increment = numericValue / (duration / stepTime);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          start = numericValue;
          clearInterval(timer);
        }
        setCount(Math.floor(start));
      }, stepTime);

      // Cleanup function for the timer
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <p
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2"
        style={{ color }}
      >
        {count}+
      </p>
      <h3 className="text-lg sm:text-xl font-semibold text-white text-center">
        {label}
      </h3>
    </motion.div>
  );
};

export default AnimatedStat;
