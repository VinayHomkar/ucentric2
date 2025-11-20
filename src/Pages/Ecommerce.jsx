import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import assets from "../assets/assets";
// import Footer from './Footer';

// --- Color Palette ---
const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";
const ICON_SIZE = "3.5rem";

//  NEW HOOK: For responsive inline styles

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches); // Set initial state

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    // Ensure initial state is correct after mount just in case
    setMatches(mediaQueryList.matches);
    // Cleanup on unmount
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

// ⭐️ FIXED HOOK: Uses inline styles to avoid Tailwind issues

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
        // ⭐️ Converted from Tailwind to inline styles
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
// HOVER-AWARE HELPER COMPONENTS (Fix for :hover error)
// Helper for images that change on hover
const HoverableImage = ({ src, alt, baseStyle, hoverStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        ...(isHovered ? hoverStyle : {}),
        transition:
          "transform 0.5s ease-out, box-shadow 0.5s ease-out, opacity 0.5s ease-out", // Ensure transition is on base
      }}
    />
  );
};

// Helper for list items that change on hover
const HoverableListItem = ({
  children,
  baseStyle,
  hoverStyle,
  isLast = false,
  borderBottomStyle = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        borderBottom: isLast ? "none" : borderBottomStyle,
        ...(isHovered ? hoverStyle : {}),
      }}
    >
      {children}{" "}
    </div>
  );
};

// Helper for links that change on hover
const HoverableLink = ({ href, children, baseStyle, hoverStyle }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        ...(isHovered ? hoverStyle : {}),
        transition: "color 0.3s, opacity 0.3s, transform 0.2s", // Ensure transition is on base
      }}
    >
      {children}{" "}
    </a>
  );
};
// CORE PAGE COMPONENTS
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

// ⭐️ FIXED Animated Card Component (Removed IntersectionObserver)
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
          : `1px solid ${ACCENT_BLUE}20`, // ⭐️ Removed isVisible logic, set transform to hover-dependent only
        transform: isHovered
          ? "translateY(-10px) scale(1.02)"
          : "translateY(0) scale(1)", // ⭐️ Removed isVisible logic, set opacity to 1
        opacity: 1, // ⭐️ Removed isVisible logic, set filter to none
        filter: "none", // ⭐️ Simplified transition
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

// ⭐️ MODIFIED COMPONENT for Section 4
const ProcessStepCard = ({ step, index, isMobile }) => {
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
      {" "}
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
      </div>{" "}
      {index !== 7 && (
        <div
          style={{
            fontSize: "2rem",
            color: ACCENT_BLUE,
            marginTop: "10px",
            animation: "floatArrow 2s infinite ease-in-out",
            display: isMobile ? "none" : "block", // ⭐️ Hide arrow on mobile
          }}
        >
          ➜{" "}
        </div>
      )}{" "}
    </div>
  );
};

// ⭐️ NEW COMPONENT for Section 5
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
      <GlowComponent />{" "}
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
      ></div>{" "}
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

// ⭐️ NEW COMPONENT for Section 6
const TechStackCard = ({ tech, index }) => {
  // ⭐️ Hook automatically provides the fixed GlowComponent
  const { glowProps, GlowComponent, visible } = useHoverGlow();

  return (
    <div
      {...glowProps} // ⭐️ Apply glow logic here
      key={index}
      style={{
        flex: "1 1 250px",
        maxWidth: "260px",
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
      <GlowComponent />{" "}
      <div style={{ position: "relative", zIndex: 10 }}>
        {" "}
        <div
          style={{ fontSize: "3rem", marginBottom: "20px", color: ACCENT_BLUE }}
        >
          {tech.icon}{" "}
        </div>{" "}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: "700",
            color: TEXT_WHITE,
            marginBottom: "10px",
          }}
        >
          {tech.name}{" "}
        </h3>{" "}
        <p
          style={{
            color: LIGHT_GREY,
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          {tech.desc}{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
};

// Simple animated button with gradient hover animation (Tailwind style)
const AnimatedButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm max-sm:hidden flex items-center gap-2 bg-gradient-to-r from-[#38b6ff] to-[#000433] animate-gradient text-white px-6 py-2 rounded-full cursor-pointer hover:scale-105 transition-all justify-center mt-6"
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

// ⭐️ NEW FAQ COMPONENTS (Based on your new code)
// 1. The Data (⭐️ RESTORED Your Original Content)
const faqs = [
  {
    q: "How long does it take to design and develop an ecommerce website?",
    a: "The timeline for e-commerce development varies based on complexity, features, and customizations. A basic store might take 4-8 weeks, while a more complex platform could take 3-6 months. We provide a detailed project plan after understanding your requirements.",
  },
  {
    q: "Can I update my ecommerce website on my own?",
    a: "Absolutely! We build our e-commerce platforms using user-friendly CMS (Content Management Systems) that allow you to easily add/edit products, manage content, process orders, and track sales without needing technical expertise.",
  },
  {
    q: "Do you provide support after the website is launched?",
    a: "Yes, our commitment extends beyond launch. We offer various post-launch support and maintenance packages, including security updates, performance monitoring, bug fixes, and feature enhancements to ensure your site runs smoothly.",
  },
  {
    q: "Can you integrate payment gateways for my ecommerce platform?",
    a: "Definitely. We integrate popular and secure payment gateways such as Stripe, PayPal, Razorpay, and custom solutions, ensuring smooth and secure transactions for your customers.",
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
        <span style={{ flex: 1, paddingRight: "16px" }}>{faq.q}</span>{" "}
        <span
          style={{
            color: "#9CA3AF", // text-gray-400
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
          background: "rgba(0, 8, 20, 0.5)", // bg-[#000814]/50
          textAlign: "left",
          color: "#D1D5DB", // text-gray-300
          fontSize: "0.95rem", // text-sm
        }}
      >
        {" "}
        <div style={{ padding: "16px 24px" }}>{faq.a} </div>{" "}
      </div>{" "}
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
          FAQs{" "}
        </span>{" "}
      </SectionTitle>
      <AccentDivider />{" "}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {" "}
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
        section{" "}
      </div>{" "}
    </div>
  );
};

// ⭐️ MODIFIED MAIN ECOMMERCE PAGE COMPONENT

const EcommercePage = () => {
  const [heroLoaded, setHeroLoaded] = useState(false); // ⭐️ Get mobile state
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setHeroLoaded(true);
  }, []);

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
      <Navbar />{" "}
      <div
        style={{
          width: "100%",
          height: isMobile ? "60vh" : "70vh", // ⭐️ Responsive height
          minHeight: isMobile ? "350px" : "420px", // ⭐️ Responsive min-height
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://img.freepik.com/free-photo/black-friday-sales-sign-neon-light_23-2151833076.jpg?semt=ais_hybrid&w=740&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEXT_WHITE,
          textAlign: "center",
          marginTop: "60px",
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Elevate Your Business with Smart Ecommerce Solutions{" "}
          </h1>{" "}
          <p
            style={{
              color: LIGHT_GREY,
              marginTop: "12px",
              fontSize: isMobile ? "0.95rem" : "1.05rem",
            }}
          >
            Build a powerful, scalable online store with Ucentric — crafted to
            boost sales and grow your digital presence.  {" "}
          </p>{" "}
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <AnimatedButton onClick={() => (window.location.href = "/Contact")}>
              Get a Free Consultation →
            </AnimatedButton>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* 1. HERO / INTRODUCTION SECTION */}{" "}
      <div
        style={{
          padding: "30px 5% 20px 5%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden", // Background kept but section minimized so banner is primary hero
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://images.unsplash.com/photo-1556740758-90de3a0022a2?q=80&w=2070&auto=format&fit=crop)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          minHeight: "0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Animated Background Shapes */}{" "}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "150px",
            height: "150px",
            backgroundColor: ACCENT_BLUE + "30",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "float 8s ease-in-out infinite alternate",
          }}
        ></div>{" "}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "200px",
            height: "200px",
            backgroundColor: DEEP_BLUE + "50",
            borderRadius: "50%",
            filter: "blur(70px)",
            animation: "float 10s ease-in-out infinite alternate-reverse",
          }}
        ></div>{" "}
        <div
          style={{
            position: "absolute",
            top: "30%",
            right: "25%",
            width: "100px",
            height: "100px",
            backgroundColor: ACCENT_BLUE + "40",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 12s ease-in-out infinite",
          }}
        ></div>{" "}
      </div>{" "}
      {/* 2. WHY US / BENEFITS SECTION - ⭐️ MODIFIED */}{" "}
      <div style={{ padding: "40px 5%" }}>
        {" "}
        <div
          style={{
            maxWidth: "100%",
            textAlign: "center",
            padding: "0 20px",
            marginBottom: "60px", // ✅ adds space below heading for cards
          }}
        >
          {" "}
          <SectionTitle
            isMobile={isMobile}
            style={{ paddingTop: 0, whiteSpace: "normal" }}
          >
            {" "}
            <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
              Why Choose Ucentric for Your Ecommerce Platform?
            </span>{" "}
          </SectionTitle>
          <AccentDivider />{" "}
        </div>
        {/* Your cards section starts here */} {/* Cards Container */}{" "}
        <div
          style={{
            display: "flex",
            // --- ✅ THIS IS THE FIX ---
            justifyContent: isMobile ? "flex-start" : "center",
            alignItems: "stretch",
            gap: "20px",
            overflowX: "auto", // enable horizontal scroll
            flexWrap: "nowrap", // keep all in one line
            padding: "20px 0",
            scrollbarWidth: "none", // hide scrollbar for Firefox
          }}
          className="hide-scrollbar" // optional: add CSS below to hide scrollbar
        >
          {" "}
          <AnimatedCard
            delay={0}
            icon="🌍"
            title="Global Reach & Wider Audience"
            style={{
              flex: "0 0 230px", // makes cards smaller
              minWidth: "230px",
              maxWidth: "230px",
            }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Expand your market globally with seamless e-commerce solutions.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={100}
            icon="⏳"
            title="24/7 Accessibility"
            style={{
              flex: "0 0 230px",
              minWidth: "230px",
              maxWidth: "230px",
            }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Sell anytime, anywhere—your store never closes.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={200}
            icon="📈"
            title="Boosted Sales"
            style={{
              flex: "0 0 230px",
              minWidth: "230px",
              maxWidth: "230px",
            }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Optimized designs that turn visitors into loyal buyers.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={300}
            icon="💰"
            title="Cost-Effective"
            style={{
              flex: "0 0 230px",
              minWidth: "230px",
              maxWidth: "230px",
            }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Reduce store costs and invest more in marketing and growth.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
          <AnimatedCard
            delay={400}
            icon="🔍"
            title="Data Insights"
            style={{
              flex: "0 0 230px",
              minWidth: "230px",
              maxWidth: "230px",
            }}
          >
            {" "}
            <p style={{ color: LIGHT_GREY, margin: 0, fontSize: "0.9rem" }}>
              Make smarter decisions with powerful data analytics.{" "}
            </p>{" "}
          </AnimatedCard>{" "}
        </div>{" "}
      </div>{" "}
      {/* 3. WEB DESIGN FOR ECOMMERCE - ERROR FIXED */}{" "}
      <div
        style={{
          padding: isMobile ? "60px 5%" : "80px 5%", // ⭐️ Responsive padding
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: isMobile ? "40px" : "80px", // ⭐️ Responsive gap
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {" "}
        <div style={{ flex: "1 1 500px" }}>
          {" "}
          <SectionTitle
            align="left"
            isMobile={isMobile} // ⭐️ Pass prop
            style={{
              textAlign: "left",
              marginTop: "0", // ⭐️ Font size is now handled *inside* SectionTitle
              fontWeight: 800,
            }}
          >
            Intuitive &{" "}
            <span
              className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient
"
              style={{ display: "inline-block" }}
            >
              Responsive{" "}
            </span>{" "}
            Ecommerce Design{" "}
          </SectionTitle>
          <AccentDivider align="left" />{" "}
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem", // ⭐️ Responsive font
              lineHeight: "1.8",
              opacity: 0.9,
              color: LIGHT_GREY,
            }}
          >
            At Ucentric, we believe exceptional design is the cornerstone of a
            successful online store. Our focus is on creating{" "}
            <b>user-friendly experiences</b> with seamless navigation, powerful
            search capabilities, and a streamlined checkout process. We craft{" "}
            <b>visually appealing designs</b> using high-quality images and
            engaging visuals to capture your audience.{" "}
          </p>{" "}
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.15rem", // ⭐️ Responsive font
              lineHeight: "1.8",
              opacity: 0.9,
              color: LIGHT_GREY,
              marginTop: "20px",
            }}
          >
            With the majority of shopping happening on mobile, we ensure all our
            e-commerce websites are <b>fully mobile-responsive</b>, providing a
            flawless experience across all devices. Your customers will enjoy
            secure and reliable shopping every time.{" "}
          </p>
          {/* Button now navigates to /About */}{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            {" "}
            <AnimatedButton onClick={() => (window.location.href = "/About")}>
              Explore Our Design Philosophy →{" "}
            </AnimatedButton>{" "}
          </div>{" "}
        </div>
        {/* RIGHT IMAGE */}
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
            src="https://screenroot.com/wp-content/uploads/2025/02/E-commerce-UX-Design-Best-Practices-ScreenRoot-Blog.webp"
            alt="Ecommerce web design concept"
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "20px",
              boxShadow: "0 0 40px rgba(56,182,255,0.3)",
              transform: "rotateY(5deg)",
              transition: "transform 0.6s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "rotateY(0deg) scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "rotateY(5deg)")
            }
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* 4. DEVELOPMENT PROCESS - Responsive Horizontal Amoeba Flow - ⭐️ MODIFIED */}{" "}
      <div style={{ padding: "100px 5%", backgroundColor: BACKGROUND_BLACK }}>
        {" "}
        <SectionTitle isMobile={isMobile} style={{ textAlign: "center" }}>
          {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Our Streamlined Ecommerce Development Process{" "}
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
          {/* ⭐️ Mapped to new ProcessStepCard component */}{" "}
          {[
            {
              icon: "💡",
              title: "Discovery & Planning",
              desc: "Understanding your business goals, target audience, and setting a clear roadmap.",
            },
            {
              icon: "📊",
              title: "Market Strategy",
              desc: "Analyzing competitors and trends to form a unique, data-driven ecommerce approach.",
            },
            {
              icon: "🎨",
              title: "Design Phase",
              desc: "Crafting stunning, user-centric interfaces that capture your brand identity.",
            },
            {
              icon: "💻",
              title: "Development",
              desc: "Building a secure, high-performance platform with React, PHP, and MySQL.",
            },
            {
              icon: "🧠",
              title: "Code Review",
              desc: "Optimizing and refining every line of code for scalability and efficiency.",
            },
            {
              icon: "🔍",
              title: "Testing & QA",
              desc: "Rigorous functionality, performance, and security testing before launch.",
            },
            {
              icon: "🚀",
              title: "Launch",
              desc: "Seamless deployment ensuring smooth go-live and system stability.",
            },
            {
              icon: "🛡️",
              title: "Support",
              desc: "Continuous updates, monitoring, and technical support post-launch.",
            },
          ].map((step, index) => (
            <ProcessStepCard
              key={index}
              step={step}
              index={index}
              isMobile={isMobile}
            />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <style>
        {" "}
        {`
@keyframes floatArrow {
 0%, 100% { transform: translateX(0); }
50% { transform: translateX(5px); }
}

@media (max-width: 900px) {
.process-flow {
 flex-direction: column !important;
}
}
`}{" "}
      </style>{" "}
      {/* 5. DEVELOPMENT SERVICES LIST - LEAF SHAPE DESIGN - ⭐️ MODIFIED */}{" "}
      <div style={{ padding: "100px 5%", backgroundColor: BACKGROUND_BLACK }}>
        {" "}
        <SectionTitle isMobile={isMobile}>
          {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Comprehensive Ecommerce Development Services{" "}
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
          }}
        >
          {" "}
          {/* ⭐️ This layout is already responsive, no changes needed */}{" "}
          {[
            {
              icon: "🛍️",
              title: "Product Catalog Management",
              desc: "Organize and manage products with rich visuals, filters, and detailed listings.",
            },
            {
              icon: "💳",
              title: "Payment Gateway Integration",
              desc: "Integrate Razorpay, Stripe, or PayPal securely with seamless checkout flow.",
            },
            {
              icon: "👥",
              title: "Customer Management",
              desc: "Manage user profiles, preferences, and order history for personalized experiences.",
            },
            {
              icon: "📊",
              title: "Admin Dashboard",
              desc: "Centralized control panel to manage users, content, and analytics efficiently.",
            },
            {
              icon: "📈",
              title: "Marketing & SEO",
              desc: "Boost visibility with SEO tools, coupons, and promotional integrations.",
            },
            {
              icon: "🛡️",
              title: "Advanced Security",
              desc: "Enterprise-grade encryption, SSL, and firewall protection for customer safety.",
            },
          ].map((service, index) => (
            <ServiceLeafCard key={index} service={service} index={index} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <style>
        {" "}
        {`
@keyframes floatIcon {
0%, 100% { transform: translateY(0); }
 50% { transform: translateY(-6px); }
}
`}{" "}
      </style>{" "}
      {/* 6. TECH STACK SECTION - BLACK BACKGROUND BEHIND CARDS - ⭐️ MODIFIED */}{" "}
      <div style={{ padding: "100px 5%", backgroundColor: "#000000" }}>
        {" "}
        <SectionTitle isMobile={isMobile}>
          {" "}
          <span className="bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">
            Our Technology Stack{" "}
          </span>{" "}
        </SectionTitle>
        <AccentDivider />{" "}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "stretch",
            gap: "40px",
            marginTop: "50px",
            backgroundColor: "#000000", // black background behind cards
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          {" "}
          {/* ⭐️ This layout is already responsive, no changes needed */}{" "}
          {[
            {
              name: "WordPress",
              icon: "🌐",
              desc: "Flexible CMS for dynamic ecommerce and business websites with plugin integration and SEO support.",
            },
            {
              name: "MERN Stack",
              icon: "⚛️",
              desc: "Full-stack JavaScript development using MongoDB, Express, React, and Node.js for high-performance web apps.",
            },
            {
              name: "MEAN Stack",
              icon: "💻",
              desc: "Robust and scalable applications powered by MongoDB, Express, Angular, and Node.js.",
            },
            {
              name: "Python",
              icon: "🐍",
              desc: "Versatile backend technology for AI-driven ecommerce, data analytics, and automation.",
            },
          ].map((tech, index) => (
            <TechStackCard key={index} tech={tech} index={index} />
          ))}{" "}
        </div>{" "}
      </div>{" "}
      {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) - ⭐️ REPLACED */}{" "}
      {/* The new FAQ section component is called here */}
      <FAQsSection isMobile={isMobile} />{" "}
    </div>
  );
};

export default EcommercePage;
