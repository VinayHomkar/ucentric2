import React, { useState, useEffect, useRef } from "react";

const AccentDivider = ({ align = "center" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect the observer once it has served its purpose
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    // Cleanup: Disconnect observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        width: isVisible ? "100px" : "0px",
        height: "4px",
        backgroundColor: "#38b6ff", // brightBlue
        margin: align === "center" ? "0 auto 50px auto" : "0 0 50px 0",
        transition: "width 0.6s ease-out",
        borderRadius: "2px",
      }}
    ></div>
  );
};

export default AccentDivider;
