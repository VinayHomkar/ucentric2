import React, { useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
// FIX: Added eslint-disable-line to suppress 'motion' unused variable warning
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

// --- Reusable Glow Wrapper Component ---
const GlowInputWrapper = ({ children, isFocused, className, inputRef }) => {
  // State for mouse position relative to the wrapper
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handler to track mouse movement for the dynamic inner glow
  const handleLocalMouseMove = useCallback(
    (e) => {
      if (!e.currentTarget || !isFocused) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    },
    [isFocused]
  );

  const handleLocalMouseLeave = useCallback(() => {
    // Reset mouse position to center on blur for a smooth fade out
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
    } else {
      setMousePosition({ x: 0, y: 0 });
    }
  }, [inputRef]);

  // Style for the radial gradient dynamic glow overlay (follows cursor)
  const dynamicGlowStyle = {
    "--mouse-x": `${mousePosition.x}px`,
    "--mouse-y": `${mousePosition.y}px`,
    backgroundImage: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(56, 182, 255, 0.2) 0%, transparent 40%)`,
  };

  return (
    <div
      onMouseMove={handleLocalMouseMove}
      onMouseLeave={handleLocalMouseLeave}
      className={`relative rounded-md transition-all duration-300 ${className} shadow-[0_0_3px_rgba(56,182,255,0.1)]`}
    >
      {/* 1. The Dynamic Glow Overlay (Follows Cursor when focused) */}
      <div
        className={`absolute inset-0 rounded-md transition-opacity duration-300 z-10 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
        style={dynamicGlowStyle}
      ></div>

      {/* 2. Blurry Box Shadow Glow (Static, wraps the input on focus) */}
      <div
        className={`absolute inset-0 rounded-md transition-all duration-300 z-0 ${
          isFocused ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow: `0 0 20px 4px rgba(56,182,255,0.7), inset 0 0 10px rgba(56,182,255,0.3)`,
        }}
      ></div>

      {/* 3. The Actual Input Field (z-index ensures it sits above glows) */}
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
};

// --- Standard Input Component with Glow Functionality ---
const GlowInput = ({
  label,
  name,
  type = "text",
  placeholder,
  rows,
  isPhone = false,
  value,
  onChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const Component = rows ? "textarea" : "input";

  const baseInputClasses =
    "w-full text-sm outline-none bg-transparent placeholder-white/70 text-white";

  const inputPadding = isPhone ? "py-3 pl-20 pr-3" : "p-3";
  const finalInputClasses = `${baseInputClasses} ${inputPadding}`;

  return (
    <div>
      <p className="mb-1 text-sm font-medium">{label}</p>
      <GlowInputWrapper
        isFocused={isFocused}
        inputRef={inputRef}
        className="rounded-md"
      >
        {/* Visual indicator for Phone Input */}
        {isPhone && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pr-2 border-r border-white/30 z-30">
            <span className="text-white/60 text-sm">+91 (IN)</span>
          </div>
        )}

        <Component
          ref={inputRef}
          name={name}
          type={type}
          placeholder={placeholder}
          className={finalInputClasses}
          rows={rows}
          required
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ border: "none" }}
          {...props}
        />
      </GlowInputWrapper>
    </div>
  );
};

// --- Main Form Component ---
const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    services: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    // FIX: Reconstruct FormData entirely from state for reliable submission
    const submitData = new FormData();
    const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "";
    submitData.append("access_key", ACCESS_KEY);

    // Append all state values
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("services", formData.services);
    submitData.append("description", formData.description);

    // Append the full phone number in the desired format
    submitData.append("full_phone_number", `+91 ${formData.phoneNumber}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Thank you for your enquiry! We will be in touch soon.");
        // Reset form data on success
        setFormData({
          name: "",
          phoneNumber: "",
          email: "",
          services: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during submission.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="p-6 sm:p-8 md:p-12 relative overflow-hidden rounded-xl
                     bg-black border-none shadow-none text-white"
    >
      <h2
        className="text-3xl mb-12 font-semibold
                           text-center lg:text-left
                           bg-gradient-to-r from-[#38b6ff] to-[#000433]
                           bg-clip-text text-transparent animate-gradient"
      >
        ENQUIRE NOW
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
        {/* Name */}
        <GlowInput
          label="Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleInputChange}
        />

        {/* Phone Number & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone Number */}
          <GlowInput
            label="Phone Number"
            name="phoneNumber"
            placeholder="000 000 0000"
            type="tel"
            isPhone={true}
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />

          {/* Email */}
          <GlowInput
            label="Email ID"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* Services */}
        <GlowInput
          label="Services Required"
          name="services"
          placeholder="e.g., Web Development, SEO, Mobile App"
          value={formData.services}
          onChange={handleInputChange}
        />

        {/* Description (Textarea) */}
        <GlowInput
          label="Description"
          name="description"
          rows={4}
          placeholder="Tell us more about your project or requirement..."
          value={formData.description}
          onChange={handleInputChange}
        />

        {/* Submit */}
        <div className="mt-4">
          <button
            type="submit"
            className="text-sm w-full justify-center sm:w-auto flex items-center gap-2 
                                   bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
                                   text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
          >
            SUBMIT ENQUIRY
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EnquiryForm;
