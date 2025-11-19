import { useEffect } from "react";
// FIX: Added comment to suppress the 'unused' warning for motion
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import backgroundVideo from "../assets/bg_video.mp4";

const Hero = () => {
  // Ensures global animation styles are only injected once on the client
  useEffect(() => {
    if (!document.getElementById("ucentric-global-styles")) {
      const style = document.createElement("style");
      style.id = "ucentric-global-styles";
      style.innerHTML = `
            @keyframes gradientShift { 
                0% { background-position: 0% 50%; } 
                50% { background-position: 100% 50%; } 
                100% { background-position: 0% 50%; } 
            }
            .animate-gradient {
                background-size: 200% 200%;
                animation: gradientShift 4s ease infinite;
            }
          `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center 
                         overflow-x-hidden overflow-y-hidden 
                         text-gray-700 dark:text-white"
    >
      {/* --- Background Video --- */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-100 dark:opacity-70"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* --- Content Wrapper --- */}
      <div
        className="relative z-10 flex flex-col items-center gap-6 
                           px-6 sm:px-10 lg:px-16 
                           text-center w-full max-w-[1200px] mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="
                        text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 
                        font-medium leading-tight 
                        bg-gradient-to-r from-[#000433] to-[#38b6ff] 
                        bg-clip-text text-transparent 
                        animate-gradient
                        w-full max-w-[90%] mx-auto
                    "
        >
          Shaping imagination into digital success.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="text-sm sm:text-lg font-medium 
                               text-gray-500 dark:text-white/75 
                               max-w-[600px] mx-auto pb-3"
        >
          Empowering digital growth and transforming imagination into meaningful
          interactive experiences.
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
