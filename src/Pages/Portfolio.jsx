import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // ⭐️ CHANGED: Import useNavigate
// import Footer from './Footer'; // Assuming you have a Footer component

// --- Color Palette (Copied from reference) ---
const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";
const ICON_SIZE = "3.5rem";

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
        top: position.y - 125,
        left: position.x - 125,
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
// ⭐️ CORE PAGE COMPONENTS (Copied from reference)
// =========================================================================

// Animated Section Title
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
      {children}{" "}
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

// Animated Card Component (Used for "Why You Need One")
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
      ref={glowProps.ref}
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
      <GlowComponent />{" "}
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
              maxHeight: "180px",
              objectFit: "cover",
            }}
          />
        )}{" "}
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
        )}{" "}
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
        {children}{" "}
      </div>{" "}
    </div>
  );
};

// Process Step Card (Used for "Our Process")
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
      {" "}
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
        <GlowComponent />{" "}
        <div style={{ position: "relative", zIndex: 10 }}>
          {" "}
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {step.icon}
          </div>{" "}
          <h3
            style={{
              fontSize: "1.1rem",
              color: ACCENT_BLUE,
              marginBottom: "8px",
            }}
          >{`${index + 1}. ${step.title}`}</h3>{" "}
          <p style={{ color: LIGHT_GREY, fontSize: "0.9rem", margin: 0 }}>
            {step.desc}
          </p>{" "}
        </div>{" "}
      </div>
      {/* Arrow */}{" "}
      {index !== totalSteps - 1 && (
        <div
          style={{
            fontSize: "2rem",
            color: ACCENT_BLUE,
            marginTop: "10px",
            animation: "floatArrow 2s infinite ease-in-out",
            display: isMobile ? "none" : "block",
          }}
        >
          ➜{" "}
        </div>
      )}{" "}
    </div>
  );
};

// Service Leaf Card (Used for "Our Portfolio Services")
const ServiceLeafCard = ({ service, index }) => {
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps}
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
      <GlowComponent /> {/* floating glowing blob behind */}{" "}
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
       {" "}
      <div style={{ position: "relative", zIndex: 10 }}>
        {" "}
        <div
          style={{
            fontSize: "2rem",
            marginBottom: "15px",
            zIndex: 1,
            animation: "floatIcon 3s ease-in-out infinite",
          }}
        >
          {service.icon}{" "}
        </div>{" "}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            marginBottom: "10px",
            color: ACCENT_BLUE,
            zIndex: 1,
          }}
        >
          {service.title}{" "}
        </h3>{" "}
        <p
          style={{
            fontSize: "1rem",
            color: LIGHT_GREY,
            opacity: 0.85,
            lineHeight: "1.6",
            zIndex: 1,
          }}
        >
          {service.desc}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

// Animated Button (Used for Banner and CTA)
const AnimatedButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick} // Removed 'max-sm:hidden' to make button visible on mobile, ensuring full responsiveness
      className="text-sm flex items-center gap-2
            bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient
            text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all justify-center mt-6"
      style={{
        fontSize: "1.1rem",
        fontWeight: 600,
        boxShadow: "0 0 20px rgba(56,182,255,0.4)",
      }}
    >
      {children}{" "}
    </button>
  );
};

// 1. The NEW Data for portfolios
const portfolioFaqs = [
  {
    q: "How long does it take to create a custom portfolio website?",
    a: "A typical portfolio website takes about 2-4 weeks from start to finish. This includes discovery, design, development, and revisions. More complex portfolios with unique features may take longer.",
  },
  {
    q: "Can I update my portfolio myself after it's built?",
    a: "Yes! We build most portfolios on a user-friendly Content Management System (CMS) that allows you to easily add new projects, update your bio, and change images without any coding knowledge.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "To start, you'll need to provide your existing content (projects, images, case studies, resume/bio). If you don't have content, our 'Content & Copywriting' service can help you create it.",
  },
  {
    q: "Do you provide hosting and maintenance?",
    a: "We offer separate hosting and maintenance packages to keep your portfolio secure, fast, and up-to-date. This includes regular backups, security scans, and support for minor updates.",
  },
];

// 2. The Item Component (Copied from reference)
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
        {" "}
        <span style={{ flex: 1, paddingRight: "16px" }}>{faq.q}</span>{" "}
        <span
          style={{
            color: "#9CA3AF",
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▼
        </span>{" "}
      </button>{" "}
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
        <div style={{ padding: "16px 24px" }}>{faq.a} </div>{" "}
      </div>{" "}
    </div>
  );
};

// 3. The Main Section Component (Copied and modified to use portfolioFaqs)
const PortfolioFAQsSection = ({ isMobile }) => {
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
      {" "}
      <SectionTitle isMobile={isMobile}>
        {" "}
        <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
          FAQs.{" "}
        </span>{" "}
      </SectionTitle>
      <AccentDivider />{" "}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {" "}
        {portfolioFaqs.map(
          (
            faq,
            index // ⭐️ Changed to use portfolioFaqs
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
        )}{" "}
      </div>{" "}
    </div>
  );
};

// 🚀 NEW PORTFOLIO PAGE COMPONENT

const PortfolioPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate(); // ⭐️ CHANGED: Initialize the navigate function // Data for the "Process" section
  const portfolioProcessSteps = [
    {
      icon: "🧠",
      title: "Consultation & Topic Finalization",
      desc: "We define your goals, target audience, and unique value proposition.",
    },
    {
      icon: "📝",
      title: "Project Planning",
      desc: "Crafting your story and designing a stunning, user-centric interface.",
    },
    {
      icon: "💻",
      title: "Development & Testing",
      desc: "Building a responsive, high-performance site with clean code.",
    },
    {
      icon: "🗎",
      title: "Report & Documentation",
      desc: "Deploying your portfolio and ensuring everything is pixel-perfect.",
    },
    {
      icon: "🚀",
      title: "Review & Launch",
      desc: "Deploying your portfolio and ensuring everything is pixel-perfect.",
    },
  ]; // Data for the "Services" section

  const portfolioServices = [
    {
      icon: "🎓",
      title: "College Students & Graduates",
      desc: "A unique design built from scratch to match your personal brand.",
    },
    {
      icon: "💼",
      title: "Corporates & Small Businesses",
      desc: "Looks flawless on all devices, from mobile phones to desktops.",
    },
    {
      icon: "🎥",
      title: "Influencers & Content Creators",
      desc: "We help you craft compelling project descriptions and a professional bio.",
    },
    {
      icon: "🚀",
      title: "Personal Branding Professionals",
      desc: "Helping clients and recruiters find you online through search.",
    },
    {
      icon: "🌟",
      title: "Celebrities & Public Figures",
      desc: "Beautiful, easy-to-manage galleries for your images, videos, and case studies.",
    },
    {
      icon: "⚙️",
      title: "Custom portfolio",
      desc: "Easily update your own projects, or let us handle it for you.",
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
      <Navbar /> {/* 1. BANNER SECTION */}{" "}
      <div
        style={{
          width: "100%",
          height: isMobile ? "60vh" : "70vh",
          minHeight: isMobile ? "350px" : "420px",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1557862921-3e160c9bb4a9?q=80&w=2070&auto=format&fit=crop')`, // Professional portfolio image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_WHITE,
          textAlign: "center",
          marginTop: "80px",
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-center bg-gradient-to-r from-[#38b6ff] to-[#000433]  bg-clip-text text-transparent animate-gradient">
            Showcase Your Work. Build Your Brand.{" "}
          </h1>{" "}
          <p
            style={{
              color: LIGHT_GREY,
              marginTop: "12px",
              fontSize: isMobile ? "0.95rem" : "1.05rem",
            }}
          >
            Create a stunning, professional portfolio that captures your unique
            talent and vision.{" "}
          </p>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "18px",
            }}
          >
            {" "}
            <AnimatedButton onClick={() => navigate("/contact")}>
              {" "}
              {/* ⭐️ CHANGED */}Start Your Portfolio Project →{" "}
            </AnimatedButton>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* 2. "WHAT IS A PORTFOLIO?" SECTION (Modeled after Ref Section 3) */}{" "}
      <div
        style={{
          padding: isMobile ? "60px 5%" : "80px 5%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: isMobile ? "40px" : "80px",
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "#000000", // Slight variant to break up sections
        }}
      >
        {/* LEFT CONTENT */}{" "}
        <div style={{ flex: "1 1 500px" }}>
          {" "}
          <SectionTitle
            align="left"
            isMobile={isMobile}
            style={{ marginTop: "0" }}
          >
            {" "}
            <span
              className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
              style={{ display: "inline-block" }}
            >
              Digital Portfolio?{" "}
            </span>{" "}
          </SectionTitle>
          <AccentDivider align="left" />{" "}
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              lineHeight: "1.8",
              opacity: 0.9,
              color: LIGHT_GREY,
            }}
          >
            A digital portfolio is your personal online gallery. It's more than
            a resume; it's a dynamic, interactive space to{" "}
            <b>showcase your best projects</b>, case studies, and skills.{" "}
          </p>{" "}
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem",
              lineHeight: "1.8",
              opacity: 0.9,
              color: LIGHT_GREY,
              marginTop: "20px",
            }}
          >
            It allows you to <b>tell your professional story</b>, demonstrate
            your expertise, and provide tangible proof of your abilities to
            potential clients, employers, and collaborators.{" "}
          </p>{" "}
        </div>
        {/* RIGHT IMAGE (Style copied from Ref Section 3) */}
        <div
          style={{
            flex: "1 1 400px",
            position: "relative",
            minHeight: "450px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop"
            alt="Digital portfolio on a laptop"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "20px",
              boxShadow: "0 0 40px rgba(56,182,255,0.3)",
              transform: "rotateY(-5deg)",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "rotateY(0deg) scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "rotateY(-5deg)")
            }
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* 3. "WHY YOU NEED ONE?" SECTION (Modeled after Ref Section 2) */}{" "}
      <div style={{ padding: "60px 5%" }}>
        {" "}
        <div
          style={{
            maxWidth: "100%",
            textAlign: "center",
            padding: "0 20px",
            marginBottom: "60px",
          }}
        >
          {" "}
          <SectionTitle
            isMobile={isMobile}
            style={{ paddingTop: 0, whiteSpace: "normal" }}
          >
            {" "}
            <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
              Why a Professional Portfolio is Essential{" "}
            </span>{" "}
          </SectionTitle>
          <AccentDivider />{" "}
        </div>{" "}
        {/* Cards Container (Style copied from Ref Section 2) */}{" "}
        <div
          style={{
            display: "flex",
            // --- ✅ THIS IS THE FIX ---
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "stretch",
            gap: "20px",
            overflowX: "auto",
            flexWrap: "nowrap",
            padding: "20px 0",
            scrollbarWidth: "none",
          }}
          className="hide-scrollbar"
        >
          {" "}
          <AnimatedCard
            delay={0}
            icon="🌟"
            title="Make a Strong First Impression"
            style={{ flex: "0 0 230px", minWidth: "230px", maxWidth: "230px" }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Capture attention instantly with a polished, professional online
              presence.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={100}
            icon="📈"
            title="Build Credibility & Trust"
            style={{ flex: "0 0 230px", minWidth: "230px", maxWidth: "230px" }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Show, don't just tell. Real projects build more trust than a
              resume alone.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={200}
            icon="💼"
            title="Win More Clients & Jobs"
            style={{ flex: "0 0 230px", minWidth: "230px", maxWidth: "230px" }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              A great portfolio is your 24/7 salesperson, converting visitors
              into opportunities.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={300}
            icon="🌐"
            title="Showcase Your Full Skillset"
            style={{ flex: "0 0 230px", minWidth: "230px", maxWidth: "230px" }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Demonstrate the depth and breadth of your abilities through
              detailed case studies.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={400}
            icon="🎨"
            title="Define Your Personal Brand"
            style={{ flex: "0 0 230px", minWidth: "230px", maxWidth: "230px" }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Control your narrative and express your unique style, voice, and
              expertise.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
        </div>{" "}
      </div>{" "}
      {/* 4. "OUR PROCESS" SECTION (Using ProcessStepCard) */}{" "}
      <div style={{ padding: "100px 5%", backgroundColor: BACKGROUND_BLACK }}>
        {" "}
        <SectionTitle isMobile={isMobile} style={{ textAlign: "center" }}>
          {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Our Portfolio Creation Process{" "}
          </span>{" "}
        </SectionTitle>
        <AccentDivider />{" "}
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
          {portfolioProcessSteps.map((step, index) => (
            <ProcessStepCard
              key={index}
              step={step}
              index={index}
              isMobile={isMobile}
              totalSteps={portfolioProcessSteps.length} // Pass total for arrow logic
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* 5. "OUR PORTFOLIO SERVICES" SECTION (Using ServiceLeafCard) */}{" "}
      <div style={{ padding: "100px 5%", backgroundColor: "#000000" }}>
        {" "}
        <SectionTitle isMobile={isMobile}>
          {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Who We Create Portfolios For{" "}
          </span>{" "}
        </SectionTitle>
        <AccentDivider />{" "}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "50px",
            marginTop: "60px",
            maxWidth: "1400px",
            margin: "0 auto",
            backgroundColor: "#000000",
          }}
        >
          {" "}
          {portfolioServices.map((service, index) => (
            <ServiceLeafCard key={index} service={service} index={index} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* 6. "FAQs" SECTION (Using custom PortfolioFAQsSection) */}{" "}
      <PortfolioFAQsSection isMobile={isMobile} />{" "}
      {/* 7. CALL-TO-ACTION SECTION */}{" "}
      <div
        style={{
          padding: "80px 5%",
          textAlign: "center",
          background: `linear-gradient(180deg, ${BACKGROUND_BLACK})`,
          borderTop: `1px solid ${ACCENT_BLUE}20`,
        }}
      >
        {" "}
        <SectionTitle
          isMobile={isMobile}
          style={{ fontSize: isMobile ? "2rem" : "2.5rem", paddingTop: "0" }}
        >
          Ready to Build Your Portfolio?{" "}
        </SectionTitle>{" "}
        <p
          style={{
            fontSize: isMobile ? "1rem" : "1.15rem",
            lineHeight: "1.8",
            opacity: 0.9,
            color: LIGHT_GREY,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Let's work together to create a stunning portfolio that gets you
          noticed and wins you the opportunities you deserve.{" "}
        </p>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {" "}
          <AnimatedButton onClick={() => navigate("/contact")}>
            {" "}
            {/* ⭐️ CHANGED */}Get Started Today →{" "}
          </AnimatedButton>{" "}
        </div>{" "}
      </div>{" "}
      {/* ⭐️ STYLES & KEYFRAMES (Copied from reference) */}{" "}
      <style>
        {" "}
        {`
/* Keyframes for floating icons */
@keyframes floatIcon {
0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); }
}

/* Keyframes for process arrow */
@keyframes floatArrow {
0%, 100% { transform: translateX(0); } 50% { transform: translateX(5px); }
}

/* Gradient animation for text */
.animate-gradient {
 background-size: 200% auto;
 animation: gradient 3s linear infinite;
}

@keyframes gradient {
 0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
}

/* Utility to hide scrollbar */
.hide-scrollbar::-webkit-scrollbar {
 display: none;
}
.hide-scrollbar {
 -ms-overflow-style: none; /* IE and Edge */
 scrollbar-width: none; /* Firefox */
}
`}{" "}
      </style>{" "}
    </div>
  );
};

export default PortfolioPage;
