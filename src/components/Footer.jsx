import React, { useState } from "react";
// FIX: Added eslint-disable-line to suppress 'motion' unused variable warning
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import assets from "../assets/assets";
import toast from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Newsletter Subscription from Ucentric");
    formData.append("from_name", "Ucentric Newsletter");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          "You have successfully subscribed to Ucentric newsletter!"
        );
        setEmail("");
      } else {
        // Log the full error message for debugging if available
        console.error("Web3Forms Error:", data);
        toast.error(data.message || "An error occurred.");
      }
    } catch (error) {
      // FIX: Using console.error to prevent 'error' is defined but never used warning
      console.error("Submission failed:", error);
      toast.error("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ★★★ FIX 1: Corrected Google Maps URL construction ★★★
  const address =
    "#20133, SDA, Balegere - Panathur Main Road, Varthuru, Bengaluru, Karnataka - 560087";
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-[#000433] text-gray-300 pt-16 pb-6 px-6 sm:px-10 lg:px-16"
    >
      <div className="container mx-auto">
        {/* Top section: 4-column layout */}
        <div className="grid grid-cols-1 gap-10 mb-12 md:grid-cols-4 lg:gap-8">
          {/* Column 1: Logo, Description, Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-32 sm:w-44 h-[40px] flex items-center">
              <img
                src={assets.logo}
                style={{ width: "90px", height: "auto" }}
                className=""
                alt="logo"
              />
            </div>

            <p className="max-w-xs mt-4 text-sm leading-relaxed">
              At Ucentric, we blend creativity and technology to turn ideas into
              impactful digital realities. Whether you’re a student, influencer,
              or brand, we help you stand out online through stunning
              portfolios, websites, and apps tailored for your goals.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/ucentric.official/?hl=en"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#E1306C] transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-2xl fab fa-instagram"></i>
              </a>
              <a
                href="https://x.com/Ucentric187302"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#1DA1F2] transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-2xl fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/ucentric-official/about/?viewAsMember=true"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-[#0A66C2] transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-2xl fab fa-linkedin"></i>
              </a>
              <a
                href="https://wa.me/917406167017"
                aria-label="WhatsApp"
                className="text-gray-400 hover:text-[#25D366] transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-2xl fab fa-whatsapp"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UCfg9pKJ96unw-wdNIyUipKA"
                aria-label="YouTube"
                className="text-gray-400 hover:text-[#FF0000] transition-transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="text-2xl fab fa-youtube"></i>
              </a>
            </div>
          </motion.div>

          {/* Column 2: COMPANY */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-left md:col-span-1 md:pl-12 sm:pl-0"
          >
            <h4 className="font-semibold text-[#38b6ff] mb-4 tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/About" className="transition-colors hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/ServicePage"
                  className="transition-colors hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: SUPPORT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-left md:col-span-1"
          >
            <h4 className="font-semibold text-[#38b6ff] mb-4 tracking-wider">
              SUPPORT
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/PrivacyPolicy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: STAY UPDATED */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <h4 className="font-semibold text-[#38b6ff] mb-4 tracking-wider">
              STAY UPDATED
            </h4>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter for inspiration and special offers.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-stretch gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 text-sm text-white placeholder-gray-400 bg-transparent border border-gray-600 rounded-md outline-none sm:rounded-r-none sm:rounded-l-md focus:border-white focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="text-sm flex items-center justify-center gap-2 
                                           bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
                                           text-white px-6 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md 
                                           cursor-pointer hover:scale-105 transition-all disabled:opacity-70"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </motion.div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between text-sm text-gray-400 sm:flex-row"
        >
          <p className="mb-2 text-center sm:text-left sm:mb-0">
            © 2025 Ucentric. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
