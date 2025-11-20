import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import Footer from './Footer';

// --- Color Palette ---
const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";
const ICON_SIZE = "3.5rem";

// =========================================================================
// ⭐️ HOOK: For responsive inline styles
// =========================================================================
const useMediaQuery = (query) => {
  // Check if window is defined (for server-side rendering)
  const isBrowser = typeof window !== "undefined";

  const [matches, setMatches] = useState(
    isBrowser ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // Set initial state correctly after mount
    setMatches(mediaQueryList.matches);
    // Add listener
    mediaQueryList.addEventListener("change", listener);
    // Cleanup on unmount
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query, isBrowser]);

  return matches;
};

// =========================================================================
// ⭐️ HOOK: For hover glow effect
// =========================================================================
const useHoverGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }; // Props to spread onto the component that should glow

  const glowProps = {
    ref,
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    onMouseMove: handleMouseMove,
  }; // The glow visual component itself

  const GlowComponent = () => (
    <div
      style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        top: position.y - 125, // Center on cursor
        left: position.x - 125, // Center on cursor
        background: "linear-gradient(to right, #38b6ff, #1a4aff, #000433)",
        borderRadius: "9999px", // rounded-full
        filter: "blur(48px)", // blur-3xl
        mixBlendMode: "screen", // mix-blend-screen
        pointerEvents: "none", // pointer-events-none
        zIndex: 5, // ⭐️ Set explicit z-index
        transition: "opacity 500ms",
        opacity: visible ? 0.6 : 0, // ⭐️ Use 'visible' from hook
      }}
    />
  );

  return { glowProps, GlowComponent, visible };
};

// =========================================================================
// CORE REUSABLE COMPONENTS (Copied from reference)
// =========================================================================

// ⭐️ Animated Section Title
const SectionTitle = ({ children, align = "center", style = {}, isMobile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        // Ensure unobserve is called only if ref.current exists
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <h2
      ref={ref}
      style={{
        fontSize: isMobile ? "2.2rem" : "3rem", // ⭐️ Responsive font size
        fontWeight: "800",
        color: TEXT_WHITE,
        paddingTop: isMobile ? "40px" : "60px", // ⭐️ Responsive padding
        paddingBottom: "20px",
        textAlign: align,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        letterSpacing: "-0.5px",
        ...style, // Pass through any extra styles from props
      }}
    >
                  {children}       {" "}
    </h2>
  );
};

// Animated Accent Divider
const AccentDivider = ({ align = "center" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: isVisible ? "100px" : "0px",
        height: "4px",
        backgroundColor: ACCENT_BLUE,
        margin: align === "center" ? "0 auto 50px auto" : "0 0 50px 0",
        transition: "width 0.6s ease-out",
        borderRadius: "2px",
      }}
    ></div>
  );
};

// ⭐️ Animated Card Component (with built-in Glow)
const AnimatedCard = ({
  children,
  delay = 0,
  animationClass = "",
  imageSrc = "",
  icon = "",
  title = "",
  style = {},
}) => {
  // ⭐️ Add glow logic
  const { glowProps, GlowComponent, visible: isHovered } = useHoverGlow();

  return (
    <div // ⭐️ Apply glow ref
      ref={glowProps.ref} // ⭐️ Apply glow event handlers
      {...glowProps}
      style={{
        backgroundColor: DEEP_BLUE,
        padding: "30px",
        borderRadius: "15px", // ⭐️ Use 'isHovered' from hook
        boxShadow: isHovered
          ? `0 8px 30px rgba(0, 0, 0, 0.7), 0 0 20px ${ACCENT_BLUE}80`
          : `0 4px 15px rgba(0, 0, 0, 0.4)`,
        border: isHovered
          ? `1px solid ${ACCENT_BLUE}`
          : `1px solid ${ACCENT_BLUE}20`,
        transform: isHovered
          ? "translateY(-10px) scale(1.02)"
          : "translateY(0) scale(1)",
        opacity: 1,
        filter: "none",
        transition: `transform 0.6s ease-out ${delay}ms, box-shadow 0.4s ease-out, border 0.4s ease-out`, // ⭐️ Simplified transition
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={animationClass}
    >
                  {/* ⭐️ Render Glow component (now uses inline styles) */}
                  <GlowComponent />                       {" "}
      {/* ⭐️ Wrap content in a z-10 div to place it above the glow */}         
       {" "}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
                       {" "}
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px",
              height: "180px",
              objectFit: "cover",
            }}
          />
        )}
                       {" "}
        {icon && (
          <div
            style={{
              fontSize: ICON_SIZE,
              color: ACCENT_BLUE,
              marginBottom: "20px",
            }}
          >
            {icon}
          </div>
        )}
                       {" "}
        {title && (
          <h3
            style={{
              color: ACCENT_BLUE,
              marginBottom: "15px",
              fontSize: "1.5rem",
              fontWeight: "700",
              minHeight: "3rem",
            }}
          >
            {title}
          </h3>
        )}
                        {children}           {" "}
      </div>
             {" "}
    </div>
  );
};

// ⭐️ Process Step Card Component (Amoeba Shape)
const ProcessStepCard = ({ step, index, isMobile, totalSteps }) => {
  // ⭐️ MODIFIED: Changed 'isLast' to 'totalSteps'
  // ⭐️ Hook automatically provides the fixed GlowComponent
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        flex: "1 1 260px",
        maxWidth: "280px",
        position: "relative",
      }}
    >
                  {/* Amoeba-shaped Card */}           {" "}
      <div
        {...glowProps} // ⭐️ Apply glow logic here
        style={{
          background: `radial-gradient(circle at 30% 30%, ${ACCENT_BLUE}25, ${DEEP_BLUE})`,
          borderRadius: "50% 40% 60% 50% / 50% 60% 40% 50%",
          padding: "40px 25px",
          height: "230px",
          width: "230px",
          color: TEXT_WHITE,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: visible
            ? "0 0 30px rgba(56,182,255,0.4)"
            : "0 0 20px rgba(56,182,255,0.25)", // Use 'visible' from hook
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: visible ? "scale(1.05)" : "scale(1)", // Use 'visible' from hook
          position: "relative",
          overflow: "hidden",
        }}
      >
                        <GlowComponent />               {" "}
        <div style={{ position: "relative", zIndex: 10 }}>
          {" "}
          {/* ⭐️ Content above glow */}                   {" "}
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {step.icon}
          </div>
                             {" "}
          <h3
            style={{
              fontSize: "1.1rem",
              color: ACCENT_BLUE,
              marginBottom: "8px",
            }}
          >{`${index + 1}. ${step.title}`}</h3>
                             {" "}
          <p style={{ color: LIGHT_GREY, fontSize: "0.9rem", margin: 0 }}>
            {step.desc}
          </p>
                         {" "}
        </div>
                   {" "}
      </div>
                  {/* Downward / right arrow depending on wrap */}           {" "}
      {/* ⭐️ MODIFIED: Logic updated to use totalSteps */}           {" "}
      {index !== totalSteps - 1 && (
        <div
          style={{
            fontSize: "2rem",
            color: ACCENT_BLUE,
            marginTop: "10px",
            animation: "floatArrow 2s infinite ease-in-out",
            display: isMobile ? "none" : "block", // ⭐️ Hide arrow on mobile
          }}
        >
                              ➜                {" "}
        </div>
      )}
             {" "}
    </div>
  );
};

// ⭐️ Service Leaf Card Component
const ServiceLeafCard = ({ service, index }) => {
  // ⭐️ Hook automatically provides the fixed GlowComponent
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps} // ⭐️ Apply glow logic here
      key={index}
      style={{
        background: `linear-gradient(145deg, #000000, #000433)`,
        border: `1px solid ${ACCENT_BLUE}40`,
        borderRadius: "70% 30% 60% 40% / 40% 60% 30% 70%", // 🍃 leaf-like shape
        padding: "50px 30px",
        color: TEXT_WHITE,
        boxShadow: visible
          ? "0 0 30px #000433"
          : "0 0 30px rgba(56,182,255,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: visible
          ? "translateY(-10px) rotate(-2deg)"
          : "translateY(0) rotate(0deg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
                  <GlowComponent />           {" "}
      {/* floating glowing blob behind */}           {" "}
      <div
        style={{
          position: "absolute",
          width: "180px",
          height: "180px",
          background: `${ACCENT_BLUE}20`,
          borderRadius: "50%",
          top: "-40px",
          right: "-40px",
          filter: "blur(30px)",
          zIndex: 6, // ⭐️ Above main glow (z-5), below content (z-10)
        }}
      ></div>
                 {" "}
      <div style={{ position: "relative", zIndex: 10 }}>
        {" "}
        {/* ⭐️ Content above glow */}               {" "}
        <div
          style={{
            fontSize: "2rem",
            marginBottom: "15px",
            zIndex: 1,
            animation: "floatIcon 3s ease-in-out infinite",
          }}
        >
                              {service.icon}               {" "}
        </div>
                       {" "}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "10px",
            color: ACCENT_BLUE,
            zIndex: 1,
          }}
        >
                              {service.title}               {" "}
        </h3>
                       {" "}
        <p
          style={{
            fontSize: "1rem",
            color: LIGHT_GREY,
            opacity: 0.85,
            lineHeight: "1.6",
            zIndex: 1,
          }}
        >
                              {service.desc}               {" "}
        </p>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

// ⭐️ Tech Stack Card (Used for Types of Projects)
const TechStackCard = ({ tech, index }) => {
  // ⭐️ Hook automatically provides the fixed GlowComponent
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps} // ⭐️ Apply glow logic here
      key={index}
      style={{
        flex: "1 1 250px",
        maxWidth: "280px",
        minWidth: "250px",
        textAlign: "center",
        background: `linear-gradient(160deg, #000000 40%, #000433)`, // keeps blue shine
        border: `1px solid ${ACCENT_BLUE}40`,
        borderRadius: "25px",
        padding: "40px 25px",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        boxShadow: visible
          ? "0 0 40px rgba(56,182,255,0.35)"
          : "0 0 15px rgba(56,182,255,0.15)",
        transform: visible ? "scale(1.07)" : "scale(1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
                  <GlowComponent />           {" "}
      <div style={{ position: "relative", zIndex: 10 }}>
        {" "}
        {/* ⭐️ Content above glow */}               {" "}
        <div
          style={{ fontSize: "3rem", marginBottom: "20px", color: ACCENT_BLUE }}
        >
                              {tech.icon}               {" "}
        </div>
                       {" "}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            color: TEXT_WHITE,
            marginBottom: "10px",
          }}
        >
                          {tech.name}               {" "}
        </h3>
                       {" "}
        <p
          style={{
            color: LIGHT_GREY,
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
                              {tech.desc}               {" "}
        </p>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

// Simple animated button with gradient hover animation
const AnimatedButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm flex items-center gap-2
            bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
            text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all justify-center mt-6"
      style={{
        fontSize: "1.1rem",
        fontWeight: 600,
        boxShadow: "0 0 20px rgba(56,182,255,0.4)",
      }}
    >
                  {children}       {" "}
    </button>
  );
};

// =========================================================================
// ⭐️ FAQ COMPONENTS (Using NEW Student-focused data)
// =========================================================================

// 1. The Data (⭐️ REPLACED with student project questions)
const faqs = [
  {
    q: "Can you help with both mini and final-year projects?",
    a: "Yes, we provide end-to-end guidance for all types of academic projects, including mini-projects for specific semesters and major final-year projects.",
  },
  {
    q: "Do you provide project documentation?",
    a: "Absolutely. We provide complete documentation, including the project report, synopsis, presentations (PPTs), and system architecture diagrams as required by your college.",
  },
  {
    q: "What technologies can I choose for my project?",
    a: "You can choose from a wide range, including Web (MERN, MEAN), Android, Python (AI, ML, Data Science), IoT, and Cloud. We will help you select the best one based on your interests and curriculum.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "A mini-project might take 1-2 weeks, while a final-year project typically takes 4-6 weeks, depending on the complexity. We ensure on-time delivery before your deadline.",
  },
  {
    q: "Can you assist with presentation and viva preparation?",
    a: "Yes! Our service includes helping you understand the code and project flow, preparing for your presentation, and covering potential viva questions.",
  },
];

// 2. The Item Component (handles animation)
const NewFAQItem = ({ faq, index, openIndex, setOpenIndex, isMobile }) => {
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = openIndex === index;

  return (
    <div
      style={{
        border: "1px solid rgba(26, 74, 255, 0.2)", // border border-[#1a4aff]/20
        borderRadius: "12px", // rounded-xl
        overflow: "hidden",
        marginBottom: "16px", // from space-y-4
      }}
    >
                 {" "}
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          padding: "16px 24px", // px-6 py-4
          fontSize: isMobile ? "1rem" : "1.125rem", // text-lg (and responsive)
          fontWeight: 500, // font-medium
          background: isHovered ? "rgba(0, 8, 20, 0.8)" : "rgba(0, 8, 20, 0.6)", // bg-[#000814]/60 hover:bg-[#000814]/80
          color: isOpen ? ACCENT_BLUE : TEXT_WHITE, // Make title blue when open
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
                       {" "}
        <span style={{ flex: 1, paddingRight: "16px" }}>{faq.q}</span>         
             {" "}
        <span
          style={{
            color: "#9CA3AF", // text-gray-400
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
                   {" "}
      </button>
                              {/* This div animates the height */}           {" "}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
          background: "rgba(0, 8, 20, 0.5)", // bg-[#000814]/50
          textAlign: "left",
          color: "#D1D5DB", // text-gray-300
          fontSize: "0.95rem", // text-sm
        }}
      >
                       {" "}
        {/* This inner div provides padding so it doesn't look cramped */}     
                 {" "}
        <div style={{ padding: "16px 24px" }}>
                              {faq.a}               {" "}
        </div>
                   {" "}
      </div>
             {" "}
    </div>
  );
};

// 3. The Main Section Component (holds state)
const FAQsSection = ({ isMobile }) => {
  const [openIndex, setOpenIndex] = useState(null); // State is held in the parent

  return (
    <div
      style={{
        padding: isMobile ? "60px 5%" : "80px 5%",
        backgroundColor: BACKGROUND_BLACK,
        color: TEXT_WHITE,
        textAlign: "center",
      }}
    >
                 {" "}
      <SectionTitle isMobile={isMobile}>
                       {" "}
        <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                              FAQs                {" "}
        </span>
                   {" "}
      </SectionTitle>
              <AccentDivider />                       {" "}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                       {" "}
        {faqs.map((faq, index) => (
          <NewFAQItem
            key={index}
            s
            faq={faq}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            isMobile={isMobile}
          />
        ))}
                   {" "}
      </div>
             {" "}
    </div>
  );
};

// =========================================================================
// ⭐️ NEW PAGE COMPONENT: StudentProjects
// =========================================================================
const StudentProjects = () => {
  const navigate = useNavigate(); // ⭐️ CHANGED: Initialize the navigate function
  const [heroLoaded, setHeroLoaded] = useState(false); // ⭐️ Get mobile state
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setHeroLoaded(true);
  }, []); // 4. Why Choose Ucentric
  const whyUcentric = [
    {
      icon: "👨‍🏫",
      title: "End-to-End Guidance",
      desc: "From topic selection to final viva, we guide you at every single step.",
    },
    {
      icon: "🚀",
      title: "Real-World Tech Stack",
      desc: "Work on technologies that companies actually use, like React, Node, and Python.",
    },
    {
      icon: "📄",
      title: "Reports & PPT Assistance",
      desc: "Get professionally written project reports, documentation, and presentations.",
    },
    {
      icon: "⏳",
      title: "On-Time Delivery",
      desc: "We guarantee your project is completed and delivered well before your deadline.",
    },
    {
      icon: "💰",
      title: "Affordable for Students",
      desc: "Special packages and pricing designed specifically to fit a student's budget.",
    },
  ]; // --- Data for Page Sections --- // 3. Types of Student Projects

  const projectTypes = [
    {
      icon: "🌐",
      name: "Web Development",
      desc: "Full-stack web apps, e-commerce sites, and portals using MERN/MEAN stack.",
    },
    {
      icon: "🤳",
      name: "Android Development",
      desc: "Native Android apps for various business, utility, or entertainment purposes.",
    },
    {
      icon: "🤖",
      name: "Software Development Projects",
      desc: "Projects involving predictive models, NLP, computer vision, and deep learning.",
    },
    {
      icon: "🔌",
      name: "Final-Year / Mini Projects",
      desc: "we create final year projects based on your requirment",
    },
    {
      icon: "📈",
      name: "Data Analytics",
      desc: "Data visualization, business intelligence dashboards, and big data processing.",
    },
    {
      icon: "🗂️",
      name: "Academic Project Documentation",
      desc: "Comprehensive reports, research papers, and project documentation for students.",
    },
    {
      icon: "🎨",
      name: "UI/UX Design Projects",
      desc: "Creative design interfaces and prototypes with a user-first approach.",
    },
  ]; // 5. Our Process

  const studentProcess = [
    {
      icon: "💬",
      title: "Consultation",
      desc: "We discuss your ideas, requirements, and finalize the project topic.",
    },
    {
      icon: "📝",
      title: "Project Planning",
      desc: "We create a detailed plan, architecture, and timeline for your project.",
    },
    {
      icon: "💻",
      title: "Development & Testing",
      desc: "Our developers build your project, followed by rigorous testing.",
    },
    {
      icon: "📚",
      title: "Report & Documentation",
      desc: "We prepare the complete project report, synopsis, and PPT.",
    },
    {
      icon: "🏁",
      title: "Review & Submission",
      desc: "You review the final project and submit it with confidence.",
    },
  ]; // 6. Featured Projects

  const featuredProjects = [
    {
      img: "https://images.unsplash.com/photo-1554492652-92c2f0f7f038?q=80&w=1974&auto=format&fit=crop",
      title: "Smart Attendance System",
      desc: "An AI-based system using facial recognition to automate attendance.",
    },
    {
      img: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1932&auto=format&fit=crop",
      title: "E-commerce Web App",
      desc: "A full-stack MERN project with payment gateway and admin panel.",
    },
    {
      img: "https://images.unsplash.com/photo-1534972195531-c0f30d0e127c?q=80&w=2070&auto=format&fit=crop",
      title: "AI Chatbot for Colleges",
      desc: "An NLP-powered chatbot to answer student queries 24/7.",
    },
    {
      img: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?q=80&w=1974&auto=format&fit=crop",
      title: "IoT Smart Home Automation",
      desc: "Control home appliances using a mobile app and IoT sensors.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: BACKGROUND_BLACK,
        color: TEXT_WHITE,
        minHeight: "100vh",
        fontFamily: "Inter, Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
                  <Navbar />           {" "}
      {/* ========================================================================= */}
                  {/* 1. HERO BANNER SECTION */}           {" "}
      {/* ========================================================================= */}
                 {" "}
      <div
        style={{
          width: "100%",
          height: isMobile ? "60vh" : "70vh", // ⭐️ Responsive height
          minHeight: isMobile ? "400px" : "450px", // ⭐️ Responsive min-height
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1523240795610-a78a641a6a8a?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_WHITE,
          textAlign: "center",
        }}
      >
                       {" "}
        <div
          style={{
            maxWidth: "1100px",
            padding: isMobile ? "0 15px" : "0 20px",
          }}
        >
                             {" "}
          <h1
            className="
                        text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                        font-extrabold 
                        leading-tight 
                        text-center 
                        bg-gradient-to-r from-[#38b6ff] to-[#000433] 
                        bg-clip-text 
                        text-transparent 
                        animate-gradient
                        "
          >
                                    Empowering Students to Build Real-World
            Projects              {" "}
          </h1>
                             {" "}
          <p
            style={{
              color: LIGHT_GREY,
              marginTop: "12px",
              fontSize: isMobile ? "1rem" : "1.15rem",
            }}
          >
                                    From idea to implementation — we help
            students and graduates turn academic visions into impactful digital
            solutions.                    {" "}
          </p>
                             {" "}
          {/* ⭐️ CHANGED: Added flex and justify-center to center the button */}
                             {" "}
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
                                   {" "}
            <AnimatedButton onClick={() => navigate("/contact")}>
              {" "}
              {/* ⭐️ CHANGED */}                            Start Your Project
              →                        {" "}
            </AnimatedButton>
                               {" "}
          </div>
                         {" "}
        </div>
                   {" "}
      </div>
                   
      {/* ========================================================================= */}
                  {/* 2. WHAT WE OFFER SECTION */}           {" "}
      {/* ========================================================================= */}
                 {" "}
      <div
        style={{
          padding: isMobile ? "60px 5%" : "80px 5%",
          textAlign: "center",
        }}
      >
                         
        <SectionTitle isMobile={isMobile} style={{ paddingTop: 0 }}>
                             {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                                    What We Offer                    {" "}
          </span>
                         {" "}
        </SectionTitle>
                     <AccentDivider />               {" "}
        <p
          style={{
            color: LIGHT_GREY,
            fontSize: isMobile ? "1rem" : "1.15rem",
            lineHeight: "1.8",
            maxWidth: "1000px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
                               Ucentric provides complete assistance in college
          and final-year projects. Our service includes everything from{" "}
          <b>project planning and topic selection</b> to{" "}
          <b>development, testing, documentation, and presentation</b>. We
          ensure you not only get a high-quality project but also understand it
          thoroughly. We cover a vast array of technologies including{" "}
          <b>
            Web Development, Android,Data analytics,HTML, CSS, JavaScript, PHP,
            MySQL, React, Flutter, and Android.
          </b>
          .                {" "}
        </p>
                   {" "}
      </div>
                 {" "}
      {/* ========================================================================= */}
             {" "}
      {/* 4. WHY CHOOSE UCENTRIC - ⭐️⭐️⭐️ SECTION MODIFIED ⭐️⭐️⭐️ */}     
           {" "}
      {/* ========================================================================= */}
                 {" "}
      <div style={{ padding: "40px 5%" }}>
                       {" "}
        <SectionTitle isMobile={isMobile}>
                             {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                                    Why Choose Ucentric                    {" "}
          </span>
                         {" "}
        </SectionTitle>
                        <AccentDivider />                               {" "}
        {/* ⭐️ CHANGED: Container style copied from EcommercePage "WHY CHOOSE" section */}
                       {" "}
        <div
          style={{
            display: "flex", // --- ✅ THIS IS THE FIX ---
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "stretch",
            gap: "20px",
            overflowX: "auto", // enable horizontal scroll
            flexWrap: "nowrap", // keep all in one line
            padding: "20px 0",
            scrollbarWidth: "none", // hide scrollbar for Firefox
          }}
          className="hide-scrollbar"
        >
                             {" "}
          {/* ⭐️ CHANGED: Using AnimatedCard instead of ServiceLeafCard */}   
                         {" "}
          {whyUcentric.map((card, index) => (
            <AnimatedCard
              key={index}
              delay={index * 100}
              icon={card.icon}
              title={card.title}
              style={{
                flex: "0 0 230px", // makes cards smaller
                minWidth: "230px",
                maxWidth: "230px",
              }}
            >
                                         {" "}
              <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
                                                {card.desc}                     
                 {" "}
              </p>
                                     {" "}
            </AnimatedCard>
          ))}
                         {" "}
        </div>
               {" "}
      </div>
                             {" "}
      {/* ========================================================================= */}
                 {" "}
      {/* 3. TYPES OF STUDENT PROJECTS - ⭐️⭐️⭐️ SECTION MODIFIED ⭐️⭐️⭐️ */}
                 {" "}
      {/* ========================================================================= */}
                 {" "}
      <div style={{ padding: "80px 5%", backgroundColor: BACKGROUND_BLACK }}>
                       {" "}
        <SectionTitle isMobile={isMobile}>
                             {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                                    Types of Student Projects                  
             {" "}
          </span>
                         {" "}
        </SectionTitle>
                        <AccentDivider />                               {" "}
        {/* ⭐️ CHANGED: Container style copied from EcommercePage "SERVICES" section */}
                       {" "}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "50px",
            marginTop: "60px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
                             {" "}
          {/* ⭐️ CHANGED: Using ServiceLeafCard instead of TechStackCard */}   
                         {" "}
          {projectTypes.map((service, index) => (
            <ServiceLeafCard
              key={index}
              index={index}
              service={{
                icon: service.icon,
                title: service.name, // Map name to title
                desc: service.desc,
              }}
            />
          ))}
                         {" "}
        </div>
               {" "}
      </div>
                 {" "}
      {/* ========================================================================= */}
                  {/* 5. OUR PROCESS */}           {" "}
      {/* ========================================================================= */}
                 {" "}
      <div style={{ padding: "100px 5%", backgroundColor: BACKGROUND_BLACK }}>
                       {" "}
        <SectionTitle isMobile={isMobile} style={{ textAlign: "center" }}>
                             {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
                                    Our Project Process                    {" "}
          </span>
                         {" "}
        </SectionTitle>
                  <AccentDivider />               {" "}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px 60px",
            marginTop: "60px",
          }}
        >
                             {" "}
          {studentProcess.map((step, index) => (
            <ProcessStepCard
              key={index}
              step={step}
              index={index}
              isMobile={isMobile}
              totalSteps={studentProcess.length} // ⭐️ MODIFIED: Passed correct prop
            />
          ))}
                         {" "}
        </div>
                   {" "}
      </div>
                             {" "}
      {/* ========================================================================= */}
                  {/* 7. FAQs SECTION */}           {" "}
      {/* ========================================================================= */}
                 {" "}
      {/* This component uses the new 'faqs' data array defined above */}
                  <FAQsSection isMobile={isMobile} />           {" "}
      {/* ========================================================================= */}
              {/* 8. CALL-TO-ACTION SECTION */}           {" "}
      {/* ========================================================================= */}
                 {" "}
      <div
        style={{
          width: "100%",
          height: isMobile ? "50vh" : "50vh", // ⭐️ Responsive height
          minHeight: isMobile ? "350px" : "400px", // ⭐️ Responsive min-height
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_WHITE,
          textAlign: "center",
        }}
      >
                       {" "}
        <div
          style={{
            maxWidth: "1100px",
            padding: isMobile ? "0 15px" : "0 20px",
          }}
        >
                       {" "}
          <h1
            className="
                        text-4xl sm:text-5xl md:text-6xl
                        font-extrabold 
                        leading-tight 
                            text-center 
                        bg-gradient-to-r from-[#38b6ff] to-[#000433] 
                  bg-clip-text 
                        text-transparent 
                        animate-gradient
                        "
          >
                                    Let's Build Your Dream Project              
                 {" "}
          </h1>
                             {" "}
          <p
            style={{
              color: LIGHT_GREY,
              marginTop: "12px",
              fontSize: isMobile ? "1rem" : "1.15rem",
            }}
          >
                                    Get professional guidance, quality code, and
            perfect documentation — all in one place.                    {" "}
          </p>
                             {" "}
          {/* ⭐️ CHANGED: Added flex and justify-center to center the button */}
                             {" "}
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
                                   {" "}
            <AnimatedButton onClick={() => navigate("/contact")}>
              {" "}
              {/* ⭐️ CHANGED */}                            Contact Us Now →  
                         {" "}
            </AnimatedButton>
                               {" "}
          </div>
                         {" "}
        </div>
                   {" "}
      </div>
                    {/* Global animations for components */}           {" "}
      <style>
                       {" "}
        {`
                 @keyframes floatArrow {
              0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }

                  @keyframes floatIcon {
                0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
              }

                /* Gradient animation for text and buttons */
             .animate-gradient {
                    background-size: 200% 200%;
                  animation: gradient-animation 4s ease infinite;
                }
                
                @keyframes gradient-animation {
                0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
           {" "}
      </style>
                              {/* <Footer /> */}       {" "}
    </div>
  );
};

export default StudentProjects;
