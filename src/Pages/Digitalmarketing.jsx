import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Import your existing Navbar component
import Navbar from "../components/Navbar";

// ⭐️ ADD IconContext IMPORT
import { IconContext } from "react-icons";
import {
  FaSearch,
  FaBullseye,
  FaUsers,
  FaLightbulb,
  FaSync,
  FaChartBar,
  FaLinkedin,
  FaInstagram,
  FaChevronDown,
  FaShieldAlt,
  FaBolt,
  FaPaintBrush,
  FaEnvelope,
  FaRobot,
  FaHandshake,
  FaWhatsapp,
  FaVideo,
} from "react-icons/fa";
import {
  FiTarget,
  FiBarChart2,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

// --- Color Palette (from ecommerce.jsx) ---
const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";

// =========================================================================
// ⭐️ NEW HOOK (from ecommerce.jsx): For responsive inline styles
// =========================================================================
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    setMatches(mediaQueryList.matches);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

// =========================================================================
// ⭐️ NEW HOOK (from ecommerce.jsx): For hover glow effect
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

  const glowProps = {
    ref,
    onMouseEnter: () => setVisible(true),
    onMouseLeave: () => setVisible(false),
    onMouseMove: handleMouseMove,
  };

  const GlowComponent = () => (
    <div
      style={{
        position: "absolute",
        width: "250px",
        height: "250px",
        top: position.y - 125, // Center on cursor
        left: position.x - 125, // Center on cursor
        background: "linear-gradient(to right, #38b6ff, #1a4aff, #000433)",
        borderRadius: "9999px",
        filter: "blur(48px)",
        mixBlendMode: "screen",
        pointerEvents: "none",
        zIndex: 5,
        transition: "opacity 500ms",
        opacity: visible ? 0.6 : 0,
      }}
    />
  );

  return { glowProps, GlowComponent, visible };
};

// =========================================================================
// ⭐️ NEW COMPONENT (from ecommerce.jsx): Animated Section Title
// =========================================================================
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
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <h2
      ref={ref}
      style={{
        fontSize: isMobile ? "2.2rem" : "3rem",
        fontWeight: "800",
        color: TEXT_WHITE,
        paddingTop: isMobile ? "40px" : "60px",
        paddingBottom: "20px",
        textAlign: align,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        letterSpacing: "-0.5px",
        ...style,
      }}
    >
      {children}
    </h2>
  );
};

// =========================================================================
// ⭐️ NEW COMPONENT (from ecommerce.jsx): Animated Accent Divider
// =========================================================================
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

// =========================================================================
// ⭐️ NEW COMPONENT (from ecommerce.jsx): Animated Button
// =========================================================================
const AnimatedButton = ({ children, onClick, style = {} }) => {
  return (
    <button
      onClick={onClick}
      // ⭐️ MODIFIED: 'inline-flex' allows parent's text-center to work
      className="text-sm inline-flex items-center gap-2
                 bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
                 text-white px-8 py-3 rounded-md cursor-pointer hover:scale-105 transition-all justify-center"
      style={{
        fontSize: "1rem",
        fontWeight: 600,
        boxShadow: "0 0 20px rgba(56,182,255,0.4)",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

// =========================================================================
// ⭐️ NEW COMPONENT (from ecommerce.jsx): Strategy Process Step Card
// =========================================================================
const ProcessStepCard = ({ step, index, isMobile }) => {
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
        {...glowProps}
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
            : "0 0 20px rgba(56,182,255,0.25)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: visible ? "scale(1.05)" : "scale(1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GlowComponent />
        <div style={{ position: "relative", zIndex: 10 }}>
          {/* ⭐️ MODIFIED: Used IconContext to force color and size */}
          <IconContext.Provider value={{ color: ACCENT_BLUE, size: "2rem" }}>
            <div style={{ marginBottom: "10px" }}>{step.icon}</div>
          </IconContext.Provider>
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

      {/* Arrow */}
      {index !== 4 && ( // Only show 4 arrows for 5 items
        <div
          style={{
            fontSize: "2rem",
            color: ACCENT_BLUE,
            marginTop: "10px",
            animation: "floatArrow 2s infinite ease-in-out",
            display: isMobile ? "none" : "block",
          }}
        >
          ➜
        </div>
      )}
    </div>
  );
};

// =========================================================================
// ⭐️ NEW COMPONENT (from ecommerce.jsx): Service Leaf Card
// =========================================================================
const ServiceLeafCard = ({ service, index }) => {
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps}
      key={index}
      style={{
        background: `linear-gradient(145deg, ${BACKGROUND_BLACK}, ${DEEP_BLUE})`,
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
          zIndex: 6,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* ⭐️ MODIFIED: Used IconContext to force color and size */}
        <IconContext.Provider value={{ color: ACCENT_BLUE, size: "2rem" }}>
          <div
            style={{
              marginBottom: "15px",
              zIndex: 1,
              animation: "floatIcon 3s ease-in-out infinite",
              animationDelay: `${index * 0.2}s`,
            }}
          >
            {service.icon}
          </div>
        </IconContext.Provider>
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
          {service.description}
        </p>
      </div>
    </div>
  );
};

// =========================================================================
// ⭐️ NEW FAQ COMPONENTS (from ecommerce.jsx)
// =========================================================================

// 1. The Item Component (handles animation)
const NewFAQItem = ({ faq, index, openIndex, setOpenIndex, isMobile }) => {
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = openIndex === index;

  return (
    <div
      style={{
        border: "1px solid rgba(26, 74, 255, 0.2)",
        borderRadius: "12px",
        overflow: "hidden",
        marginBottom: "16px",
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
          padding: "16px 24px",
          fontSize: isMobile ? "1rem" : "1.125rem",
          fontWeight: 500,
          background: isHovered ? "rgba(0, 8, 20, 0.8)" : "rgba(0, 8, 20, 0.6)",
          color: isOpen ? ACCENT_BLUE : TEXT_WHITE,
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        <span style={{ flex: 1, paddingRight: "16px" }}>{faq.q}</span>
        <span
          style={{
            color: "#9CA3AF",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
          opacity: isOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease-in-out, opacity 0.3s ease-in-out",
          background: "rgba(0, 8, 20, 0.5)",
          textAlign: "left",
          color: "#D1D5DB",
          fontSize: "0.95rem",
        }}
      >
        <div style={{ padding: "16px 24px" }}>{faq.a}</div>
      </div>
    </div>
  );
};

// 2. The Main Section Component (holds state)
const FAQsSection = ({ isMobile, faqs }) => {
  // ⭐️ Accepts faqs as a prop
  const [openIndex, setOpenIndex] = useState(null);

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
        <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
          Frequently Asked Questions
        </span>
      </SectionTitle>
      <AccentDivider />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {faqs.map(
          (
            faq,
            index // ⭐️ Maps over the faqs prop
          ) => (
            <NewFAQItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              isMobile={isMobile}
            />
          )
        )}
      </div>
    </div>
  );
};

/**
 * ===================================================================
 * Main Component: Digitalmarketing
 * ===================================================================
 */
const Digitalmarketing = () => {
  // ⭐️ Get mobile state
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Data for the services grid
  const services = [
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🔍</span>,
      title: "SEO",
      description: "Rank higher on search engines and attract organic traffic.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🎯</span>,
      title: "SEM / PPC",
      description: "Instant, targeted visibility with paid search campaigns.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>👥</span>,
      title: "Social Media Marketing",
      description:
        "Build your brand and engage your community on all platforms.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>💼</span>,
      title: "LinkedIn Marketing",
      description: "Dominate B2B marketing with expert LinkedIn strategies.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🎨</span>,
      title: "Content Marketing",
      description: "Attract and convert with valuable, relevant content.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>📧</span>,
      title: "Email Marketing",
      description: "Nurture leads and retain customers with automated funnels.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🤝</span>,
      title: "Influencer & Affiliate",
      description: "Leverage trusted voices to amplify your brand's reach.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🛡️</span>,
      title: "Online Reputation (ORM)",
      description: "Monitor, manage, and protect your brand's online image.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>📈</span>,
      title: "Conversion Rate (CRO)",
      description: "Turn more website visitors into paying customers.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>📊</span>,
      title: "Analytics & Reporting",
      description:
        "Make data-driven decisions with clear, actionable insights.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>💬</span>,
      title: "WhatsApp & Chatbot",
      description:
        "Automate conversations and provide instant customer support.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🎥</span>,
      title: "Video & Reels Marketing",
      description:
        "Capture attention with compelling short-form and long-form video.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🚀</span>,
      title: "Lead Generation",
      description:
        "Fill your sales pipeline with high-quality, qualified leads.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🤖</span>,
      title: "AI-Powered Marketing",
      description:
        "Use predictive analytics to optimize campaigns in real-time.",
    },
  ];

  // Data for the FAQ section
  const faqs = [
    {
      q: "What makes Ucentric different from other agencies?",
      a: "We focus on ROI-driven, tailored strategies. We're not just a service provider; we're your growth partner. Our transparency and data-first approach ensure you always know how your campaigns are performing.",
    },
    {
      q: "How long before I see results?",
      a: "This varies by strategy. SEO is a long-term game (3-6 months), while PPC can deliver results within days. We set clear expectations based on your specific goals and budget.",
    },
    {
      q: "Do you manage ad budgets and media spend?",
      a: "Yes, we manage ad budgets transparently. You set the budget, and we optimize the spend to achieve the maximum possible return on investment (ROAS).",
    },
    {
      q: "Can I track performance reports?",
      a: "Absolutely. We provide comprehensive, easy-to-understand monthly reports and a real-time dashboard so you can track KPIs, engagement, and conversions.",
    },
    {
      q: "What industries do you specialize in?",
      a: "We have experience across a wide range of industries, including SaaS, e-commerce, healthcare, real estate, and B2B services. We adapt our strategies to fit the unique challenges of your market.",
    },
    {
      q: "Do you offer monthly or one-time packages?",
      a: "We offer both. While most clients prefer our monthly retainers for continuous growth and optimization, we also provide one-time services like website audits, strategy development, and campaign setups.",
    },
  ];

  // Data for the Strategy section (emoji icons sized up to match Services cards)
  const strategySteps = [
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🔍</span>,
      title: "Research & Audit",
      desc: "We analyze your market, competitors, and current assets.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>💡</span>,
      title: "Strategy & Planning",
      desc: "We build a custom, data-driven roadmap for success.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🎯</span>,
      title: "Execution",
      desc: "Our experts launch your campaigns with precision.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>🔁</span>,
      title: "Optimization",
      desc: "We continuously test and refine for better performance.",
    },
    {
      icon: <span style={{ fontSize: "3rem", lineHeight: 1 }}>📊</span>,
      title: "Reporting & Growth",
      desc: "We provide transparent reports and scale what works.",
    },
  ];

  // Main component render
  return (
    <div className="overflow-x-hidden font-sans text-white bg-black">
      {/* ⭐️ Merged style tag with all keyframes */}
      <style>{`
        html { scroll-behavior: smooth; }
        
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes floatArrow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
      `}</style>

      {/* =================================================================== */}
      {/* 1. Navbar (Imported) */}
      {/* =================================================================== */}
      <Navbar />

      {/* =================================================================== */}
      {/* 2. Hero Section */}
      {/* =================================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 text-center overflow-hidden">
        {/* Animated Gradient Glow Effect */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#000433] to-[#38b6ff] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#38b6ff] to-[#000433] rounded-full filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Glowing Gradient Border Container */}
        <div className="relative z-10 max-w-4xl mx-auto p-1 bg-gradient-to-r from-[#000433] via-[#38b6ff] to-[#000433] rounded-xl">
          {/* ⭐️ MODIFIED: Added textAlign: 'center' to center the button */}
          <div
            className="p-12 bg-black rounded-lg"
            style={{ textAlign: "center" }}
          >
            <h1 className="mb-6 text-4xl font-extrabold text-transparent md:text-6xl bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Why Ucentric for Digital Marketing
            </h1>
            <p className="mb-8 text-xl text-gray-300 md:text-2xl">
              Transform your online presence with data-driven, growth-focused
              strategies.
            </p>
            <ul className="flex flex-wrap justify-center mb-10 text-gray-400 gap-x-6 gap-y-2">
              <li className="flex items-center">
                <FiCheckCircle className="text-[#38b6ff] mr-2" /> Expert
                marketing professionals
              </li>
              <li className="flex items-center">
                <FiCheckCircle className="text-[#38b6ff] mr-2" /> ROI-driven
                campaigns
              </li>
              <li className="flex items-center">
                <FiCheckCircle className="text-[#38b6ff] mr-2" /> Tailored
                strategies
              </li>
              <li className="flex items-center">
                <FiCheckCircle className="text-[#38b6ff] mr-2" /> Transparent
                reporting
              </li>
            </ul>

            {/* ⭐️ REPLACED with AnimatedButton */}
            <Link to="/contact">
              <AnimatedButton style={{ padding: "0.75rem 2rem" }}>
                Get a Free Strategy Call
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 3. About Digital Marketing (⭐️ REFACTORED) */}
      {/* =================================================================== */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle isMobile={isMobile} style={{ paddingTop: 0 }}>
            <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
              What Is Digital Marketing & Why You Need It
            </span>
          </SectionTitle>
          <AccentDivider />
          <div className="grid gap-10 text-lg text-gray-300 md:grid-cols-2">
            <p>
              In simple terms, **digital marketing** is the practice of
              promoting products or services using digital channels. This
              includes search engines, social media, email, websites, and mobile
              apps. Unlike traditional marketing, it allows you to target
              specific audiences, interact with them in real-time, and measure
              results with precision.
            </p>
            <p>
              Today, your customers are online. **Every business needs digital
              marketing** to survive and thrive. It's no longer an option—it's
              essential for visibility, engagement, and conversions. It levels
              the playing field, allowing you to compete with larger brands,
              build credibility, and generate a continuous stream of leads and
              sales.
            </p>
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. Our Digital Marketing Strategy (⭐️ REFACTORED with Amoeba Cards) */}
      {/* =================================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#000000]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle isMobile={isMobile} style={{ paddingTop: 0 }}>
            <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
              Our Digital Marketing Strategy
            </span>
          </SectionTitle>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: isMobile ? "40px" : "40px 50px",
              marginTop: "60px",
            }}
          >
            {strategySteps.map((step, index) => (
              <ProcessStepCard
                key={index}
                step={step}
                index={index}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 5. Our Digital Marketing Services (⭐️ REFACTORED with Leaf Cards) */}
      {/* =================================================================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#000000]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle isMobile={isMobile} style={{ paddingTop: 0 }}>
            <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
              Our Digital Marketing Services
            </span>
          </SectionTitle>
          <AccentDivider />

          <div
            className="grid gap-10"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              marginTop: "60px",
              maxWidth: "1400px",
              margin: "60px auto 0 auto",
            }}
          >
            {services.map((service, index) => (
              <ServiceLeafCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 6. FAQs Section (⭐️ REPLACED) */}
      {/* =================================================================== */}
      <FAQsSection isMobile={isMobile} faqs={faqs} />

      {/* =================================================================== */}
      {/* 7. Call-to-Action Section (⭐️ Button Replaced) */}
      {/* =================================================================== */}
      <section className="relative px-4 py-24 overflow-hidden sm:px-6 lg:px-8">
        {/* Glowing border effect */}
        <div
          className="relative max-w-4xl mx-auto p-1 rounded-2xl
                        before:content-[''] before:absolute before:inset-0 before:rounded-2xl
                        before:bg-gradient-to-br before:from-[#000433] before:via-[#38b6ff] before:to-[#000433]
                        before:blur-md before:opacity-75 before:animate-border-glow
                        after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:bg-[#0a1128]
                        after:z-10"
        >
          <div className="relative z-20 max-w-4xl mx-auto text-center p-8 rounded-2xl bg-[#0a1128]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient bg-[length:300%_auto]">
              Let’s Create a Site That Converts
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-300 md:text-2xl">
              Your dream website starts with a single click. Ready to elevate
              your brand? Contact us for a free consultation.
            </p>

            {/* ⭐️ REPLACED with AnimatedButton */}
            <Link to="/Contact">
              <AnimatedButton
                style={{ padding: "1rem 2.5rem", borderRadius: "9999px" }}
              >
                Let’s Talk
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digitalmarketing;
