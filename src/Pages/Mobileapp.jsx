import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// import Footer from '../components/Footer'; // optional

// --- Color Palette ---
const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";
const ICON_SIZE = "3.5rem";

// =========================================================================
// ⭐️ NEW HOOK: For responsive inline styles (from EcommercePage)
// =========================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches); // Set initial state

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    // Add listener
    mediaQueryList.addEventListener("change", listener);

    // Ensure initial state is correct after mount just in case
    setMatches(mediaQueryList.matches);

    // Cleanup on unmount
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

// =========================================================================
// ⭐️ FIXED HOOK: Uses inline styles (from EcommercePage)
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
  };

  // Props to spread onto the component that should glow
  const glowProps = {
    ref,
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    onMouseMove: handleMouseMove,
  };

  // The glow visual component itself
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
// CORE PAGE COMPONENTS (Ported from EcommercePage)
// =========================================================================

// ⭐️ MODIFIED Animated Section Title
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
      {children}
    </h2>
  );
};

// ⭐️ NEW Animated Accent Divider
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

// ⭐️ NEW Animated Card Component (with built-in hover/glow)
const AnimatedCard = ({
  children,
  delay = 0,
  animationClass = "",
  imageSrc = "",
  icon = "",
  title = "",
  style = {},
}) => {
  const { glowProps, GlowComponent, visible: isHovered } = useHoverGlow();

  return (
    <div
      {...glowProps}
      style={{
        backgroundColor: DEEP_BLUE,
        padding: "30px",
        borderRadius: "15px",
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
        transition: `transform 0.6s ease-out ${delay}ms, box-shadow 0.4s ease-out, border 0.4s ease-out`,
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
      <GlowComponent />

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
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "20px",
              maxHeight: "180px",
              objectFit: "cover",
            }}
          />
        )}
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
        {title && (
          <h3
            style={{
              color: ACCENT_BLUE,
              marginBottom: "15px",
              fontSize: "1.5rem",
              fontWeight: "700",
            }}
          >
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

// ⭐️ NEW ProcessStepCard (Amoeba) - MODIFIED to accept totalSteps prop
const ProcessStepCard = ({ step, index, isMobile, totalSteps }) => {
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
      {/* Amoeba-shaped Card */}
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
        <GlowComponent />
        <div style={{ position: "relative", zIndex: 10 }}>
          {" "}
          {/* ⭐️ Content above glow */}
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {step.icon}
          </div>
          <h3
            style={{
              fontSize: "1.1rem",
              color: ACCENT_BLUE,
              marginBottom: "8px",
            }}
          >{`${index + 1}. ${step.title}`}</h3>
          <p style={{ color: LIGHT_GREY, fontSize: "0.9rem", margin: 0 }}>
            {step.desc}
          </p>
        </div>
      </div>

      {/* ⭐️ MODIFIED: Use totalSteps prop to control arrow visibility */}
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
          ➜
        </div>
      )}
    </div>
  );
};

// ⭐️ NEW ServiceLeafCard (from EcommercePage)
const ServiceLeafCard = ({ service }) => {
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps} // ⭐️ Apply glow logic here
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
      <GlowComponent />
      {/* floating glowing blob behind */}
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

      <div style={{ position: "relative", zIndex: 10 }}>
        {" "}
        {/* ⭐️ Content above glow */}
        <div
          style={{
            fontSize: "2rem",
            marginBottom: "15px",
            zIndex: 1,
            animation: "floatIcon 3s ease-in-out infinite",
          }}
        >
          {service.icon}
        </div>
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "10px",
            color: ACCENT_BLUE,
            zIndex: 1,
          }}
        >
          {service.title}
        </h3>
        <p
          style={{
            fontSize: "1rem",
            color: LIGHT_GREY,
            opacity: 0.85,
            lineHeight: "1.6",
            zIndex: 1,
          }}
        >
          {service.desc}
        </p>
      </div>
    </div>
  );
};

// ⭐️ NEW TechStackCard (from EcommercePage)
const TechStackCard = ({ tech }) => {
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps} // ⭐️ Apply glow logic here
      style={{
        width: "100%",
        maxWidth: "260px",
        height: "100%",
        minHeight: "280px", // Set a minimum height
        textAlign: "center",
        background: `linear-gradient(160deg, #000000 40%, #000433)`,
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GlowComponent />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <div
          style={{ fontSize: "3rem", marginBottom: "20px", color: ACCENT_BLUE }}
        >
          {tech.icon}
        </div>
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            color: TEXT_WHITE,
            marginBottom: "10px",
          }}
        >
          {tech.name}
        </h3>
        {tech.desc && (
          <p
            style={{
              color: LIGHT_GREY,
              fontSize: "0.95rem",
              lineHeight: "1.6",
            }}
          >
            {tech.desc}
          </p>
        )}
      </div>
    </div>
  );
};

// ⭐️ NEW AnimatedButton (from EcommercePage, removed max-sm:hidden)
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
        display: "inline-flex", // ⭐️ Added this from old button to ensure it works
      }}
    >
      {children}
    </button>
  );
};

// =========================================================================
// ⭐️ NEW FAQ COMPONENTS (Ported from EcommercePage)
// =========================================================================

// 1. The Data (⭐️ RESTORED MobileApp.jsx Content)
const faqs = [
  {
    q: "How long does it take to develop a mobile app?",
    a: "The timeline varies by complexity. A simple app: 2–3 months. A medium app: 4–6 months. Complex/enterprise: 6–12+ months. We provide a detailed timeline during Discovery.",
  },
  {
    q: "Do you build apps for both Android and iOS?",
    a: "Yes — native apps using Swift (iOS) and Kotlin (Android), and cross-platform using React Native or Flutter for faster delivery.",
  },
  {
    q: "What is your pricing model?",
    a: "We offer Fixed Price for well-defined scope and Time & Material for evolving projects. We can discuss the best fit after Discovery.",
  },
  {
    q: "Can you maintain my app after launch?",
    a: "Absolutely — we provide maintenance, monitoring, security updates, and feature development post-launch.",
  },
  {
    q: "Do you provide App Store Optimization (ASO)?",
    a: "Yes — we can help with ASO, screenshots, descriptions, and store listing optimizations to improve visibility and downloads.",
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
        <span style={{ flex: 1, paddingRight: "16px" }}>{faq.q}</span>
        <span
          style={{
            color: "#9CA3AF", // text-gray-400
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      {/* This div animates the height */}
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
        {/* This inner div provides padding so it doesn't look cramped */}
        <div style={{ padding: "16px 24px" }}>{faq.a}</div>
      </div>
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
      <SectionTitle isMobile={isMobile}>
        {/* ⭐️ MODIFIED: Title updated for Mobile App page */}
        <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
          Frequently Asked Questions
        </span>
      </SectionTitle>
      <AccentDivider />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {faqs.map((faq, index) => (
          <NewFAQItem
            key={index}
            faq={faq}
            index={index}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// ⭐️ MAIN MOBILE APP PAGE COMPONENT (Updated)
// =========================================================================
const Mobileapp = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const processSteps = [
    {
      icon: "💡",
      title: "Discovery & Strategy",
      desc: "Understand goals, users, and scope to build a clear plan.",
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      desc: "Design user flows and interfaces that delight.",
    },
    {
      icon: "💻",
      title: "Development",
      desc: "Build with performance, structure and best practices.",
    },
    {
      icon: "🔍",
      title: "Testing & QA",
      desc: "Comprehensive testing across devices and scenarios.",
    },
    {
      icon: "🚀",
      title: "Deployment & Support",
      desc: "Launch and provide continued support & updates.",
    },
  ];

  const appServices = [
    {
      icon: "📱",
      title: "Custom App Development",
      desc: "Native & cross-platform apps built to fit your needs.",
    },
    {
      icon: "🎨",
      title: "App UI/UX Design",
      desc: "Human-centered designs that drive engagement.",
    },
    {
      icon: "🛠️",
      title: "Maintenance & Support",
      desc: "Ongoing updates, monitoring and improvements.",
    },
  ];

  const industries = [
    { icon: "🏥", name: "Healthcare" },
    { icon: "🎓", name: "Education" },
    { icon: "🛍️", name: "E-commerce" },
    { icon: "🏠", name: "Real Estate" },
    { icon: "🎬", name: "Entertainment" },
    { icon: "💼", name: "Finance" },
  ];

  // sample images (inline)
  const heroImage =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop";

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
      <Navbar />

      {/* HERO */}
      <div
        style={{
          width: "100%",
          height: isMobile ? "60vh" : "70vh",
          minHeight: isMobile ? 400 : 500,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_WHITE,
          textAlign: "center",
        }}
      >
        <div
          style={{ maxWidth: 1100, padding: isMobile ? "0 16px" : "0 24px" }}
        >
          <h1
            className="font-extrabold leading-tight"
            style={{
              fontSize: isMobile ? "2rem" : "3rem",
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
              margin: 0,
            }}
          >
            Transform Ideas into Powerful Mobile Experiences
          </h1>

          <p
            style={{
              color: LIGHT_GREY,
              marginTop: 12,
              fontSize: isMobile ? "1rem" : "1.15rem",
              maxWidth: 700,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We build engaging, scalable, and high-performance mobile apps
            tailored to your brand.
          </p>

          <div
            style={{ marginTop: 18, display: "flex", justifyContent: "center" }}
          >
            <AnimatedButton onClick={() => navigate("/contact")}>
              Get Started →
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ⭐️⭐️⭐️ "WHAT WE DO" SECTION MODIFIED ⭐️⭐️⭐️ */}
      {/* ========================================================================= */}
      <div
        style={{
          padding: isMobile ? "50px 5%" : "80px 5%",
          textAlign: "center",
        }}
      >
        <SectionTitle isMobile={isMobile}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            What We Do
          </span>
        </SectionTitle>
        <AccentDivider />

        <p
          style={{
            color: LIGHT_GREY,
            fontSize: isMobile ? "1rem" : "1.05rem",
            maxWidth: 900,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Ucentric specializes in developing cutting-edge iOS, Android, and
          cross-platform mobile apps. Our process is built on a foundation of
          exceptional UI/UX design and engineering best-practices for scale.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 16, // ⭐️ CHANGED: Reduced gap from 24 to 16
            marginTop: 20,
            justifyItems: "center",
            alignItems: "stretch",
          }}
        >
          <TechStackCard
            tech={{
              icon: "",
              name: "iOS Development",
              desc: "Swift, UIKit & SwiftUI",
            }}
          />
          <TechStackCard
            tech={{
              icon: "🤖",
              name: "Android Development",
              desc: "Kotlin & Jetpack Compose",
            }}
          />
          <TechStackCard
            tech={{
              icon: "🔄",
              name: "Cross-Platform",
              desc: "React Native & Flutter",
            }}
          />
        </div>
      </div>
      {/* ========================================================================= */}
      {/* ⭐️⭐️⭐️ END OF SECTION MODIFICATION ⭐️⭐️⭐️ */}
      {/* ========================================================================= */}

      {/* WHY CHOOSE */}
      <div style={{ padding: "40px 5%" }}>
        <SectionTitle isMobile={isMobile} style={{ whiteSpace: "normal" }}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Why Choose Ucentric for App Development?
          </span>
        </SectionTitle>
        <AccentDivider />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(5, 1fr)",
            gap: 20,
            padding: 12,
          }}
        >
          <AnimatedCard delay={0} icon="🎨" title="User-Centered Design">
            <p style={{ color: LIGHT_GREY, margin: 0 }}>
              We design for your users — focusing on engagement and ease-of-use.
            </p>
          </AnimatedCard>
          <AnimatedCard delay={100} icon="💻" title="Latest Tech Stack">
            <p style={{ color: LIGHT_GREY, margin: 0 }}>
              React Native, Flutter, Swift & Kotlin — chosen to fit your product
              needs.
            </p>
          </AnimatedCard>
          <AnimatedCard delay={200} icon="⚡️" title="Agile Development">
            <p style={{ color: LIGHT_GREY, margin: 0 }}>
              Iterative sprints, continuous feedback, and fast delivery.
            </p>
          </AnimatedCard>
          <AnimatedCard delay={300} icon="🚀" title="Full Lifecycle Support">
            <p style={{ color: LIGHT_GREY, margin: 0 }}>
              From idea to launch and beyond — we partner for success.
            </p>
          </AnimatedCard>
          <AnimatedCard delay={400} icon="🛠️" title="Post-Launch Maintenance">
            <p style={{ color: LIGHT_GREY, margin: 0 }}>
              Monitoring, updates and feature growth to keep your app healthy.
            </p>
          </AnimatedCard>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <div style={{ padding: "100px 5%", backgroundColor: BACKGROUND_BLACK }}>
        <SectionTitle isMobile={isMobile} style={{ textAlign: "center" }}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Our Development Process
          </span>
        </SectionTitle>
        <AccentDivider />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px 60px",
            marginTop: 60,
          }}
        >
          {processSteps.map((step, idx) => (
            <ProcessStepCard
              key={idx}
              step={step}
              index={idx}
              isMobile={isMobile}
              totalSteps={processSteps.length}
            />
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ⭐️⭐️⭐️ "INDUSTRIES" SECTION MODIFIED ⭐️⭐️⭐️ */}
      {/* ========================================================================= */}
      <div style={{ padding: "80px 5%", backgroundColor: "#000000" }}>
        <SectionTitle isMobile={isMobile}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Industries We Serve
          </span>
        </SectionTitle>
        <AccentDivider />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 16, // ⭐️ CHANGED: Reduced gap from 24 to 16
            marginTop: 24,
            maxWidth: 1400,
            marginLeft: "auto",
            marginRight: "auto",
            justifyItems: "center",
            alignItems: "stretch",
          }}
        >
          {industries.map((it, idx) => (
            <TechStackCard key={idx} tech={{ icon: it.icon, name: it.name }} />
          ))}
        </div>
      </div>
      {/* ========================================================================= */}
      {/* ⭐️⭐️⭐️ END OF SECTION MODIFICATION ⭐️⭐️⭐️ */}
      {/* ========================================================================= */}

      {/* SERVICES */}
      <div style={{ padding: "80px 5%", backgroundColor: BACKGROUND_BLACK }}>
        <SectionTitle isMobile={isMobile}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Our App Development Services
          </span>
        </SectionTitle>
        <AccentDivider />

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
          {appServices.map((s, idx) => (
            <ServiceLeafCard key={idx} service={s} />
          ))}
        </div>
      </div>

      <FAQsSection isMobile={isMobile} />

      {/* CTA */}
      <div
        style={{
          padding: isMobile ? "60px 5%" : "80px 5%",
          background: BACKGROUND_BLACK,
          textAlign: "center",
          borderTop: `1px solid ${ACCENT_BLUE}20`,
        }}
      >
        <SectionTitle isMobile={isMobile} style={{ paddingTop: 0 }}>
          <span
            style={{
              background: `linear-gradient(90deg, ${ACCENT_BLUE}, ${DEEP_BLUE})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Let’s Build Something Extraordinary
          </span>
        </SectionTitle>
        <AccentDivider />

        <p
          style={{
            color: LIGHT_GREY,
            fontSize: isMobile ? "1rem" : "1.05rem",
            maxWidth: 700,
            margin: "0 auto 20px",
            lineHeight: 1.7,
          }}
        >
          Ready to start your project? Get in touch with our team of app
          development experts today and let's discuss your vision.
        </p>

        <AnimatedButton onClick={() => navigate("/contact")}>
          Start Project →
        </AnimatedButton>
      </div>

      {/* Optional Footer */}
      {/* <Footer /> */}

      <style>
        {`
          @keyframes floatArrow {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(5px); }
          }
          @keyframes floatIcon {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default Mobileapp;
