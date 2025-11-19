import { useRef, useEffect, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// 1. Lazy Import: Only include the pages we have actually built/confirmed.
const Home = lazy(() => import("./Pages/Home"));
// Note: All other pages (Contact, About, Service, etc.) have been removed.

// --- Custom Features (Preserved Logic) ---

// Component scrolls to the top on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // FIX: Using requestAnimationFrame for smoother scroll to top
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
};

// Simple loading component for lazy pages
const PageLoader = () => (
  // Enhanced loader appearance for better aesthetics
  <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38b6ff] mb-3"></div>
    <p className="text-white text-lg font-medium">Loading...</p>
  </div>
);

// --- Main App Component ---

const App = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  // Custom cursor animation effect (Preserved Logic)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      // Smoothing factor
      const speed = 0.15;

      position.current.x += (mouse.current.x - position.current.x) * speed;
      position.current.y += (mouse.current.y - position.current.y) * speed;

      if (dotRef.current && outlineRef.current) {
        // Dot follows immediately (centered at 5px, assuming 10px dot size)
        dotRef.current.style.transform = `translate3d(${
          mouse.current.x - 5
        }px, ${mouse.current.y - 5}px, 0)`;

        // Outline follows with lag (centered at 15px, assuming 30px outline size)
        outlineRef.current.style.transform = `translate3d(${
          position.current.x - 20
        }px, ${position.current.y - 20}px, 0)`; // Adjusted offset for 40px outline
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative bg-black overflow-x-hidden"
      style={{ cursor: "none" }}
    >
      {/* Toast notifications provider */}
      <Toaster />

      <Router>
        <ScrollToTop />

        {/* Lazy Loaded Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Only the confirmed Home route is included */}
            <Route path="/" element={<Home />} />

            {/* Future routes will be added here */}
            {/* <Route path="/About" element={<About />} /> */}
          </Routes>
        </Suspense>

        <Footer />
      </Router>

      {/* Custom Cursor Outline (Lagging) */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full bg-[#38b6ff] opacity-30 pointer-events-none z-[9999]"
        style={{
          transition: "transform 0.1s ease-out",
          willChange: "transform",
        }}
      ></div>

      {/* Custom Cursor Dot (Immediate) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-[#38b6ff] pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      ></div>
    </div>
  );
};

export default App;
// import { useRef, useEffect, lazy, Suspense } from "react";
// import { Toaster } from "react-hot-toast";
// import Footer from "./components/Footer";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";

// // 1. Lazy Import: Only include the pages we have actually built/confirmed.
// const Home = lazy(() => import("./Pages/Home"));
// // Note: All other pages (Contact, About, Service, etc.) have been removed.

// // --- Custom Features (Preserved Logic) ---

// // Component scrolls to the top on navigation
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // FIX: Using requestAnimationFrame for smoother scroll to top
//     requestAnimationFrame(() => {
//       window.scrollTo(0, 0);
//     });
//   }, [pathname]);

//   return null;
// };

// // Simple loading component for lazy pages
// const PageLoader = () => (
//   // Enhanced loader appearance for better aesthetics
//   <div className="w-full h-screen flex flex-col justify-center items-center bg-black">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38b6ff] mb-3"></div>
//     <p className="text-white text-lg font-medium">Loading...</p>
//   </div>
// );

// // --- Main App Component ---

// const App = () => {
//   const dotRef = useRef(null);
//   const outlineRef = useRef(null);
//   const mouse = useRef({ x: 0, y: 0 });
//   const position = useRef({ x: 0, y: 0 });

//   // Custom cursor animation effect (Preserved Logic)
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouse.current.x = e.clientX;
//       mouse.current.y = e.clientY;
//     };

//     document.addEventListener("mousemove", handleMouseMove);

//     const animate = () => {
//       // Smoothing factor
//       const speed = 0.15;

//       position.current.x += (mouse.current.x - position.current.x) * speed;
//       position.current.y += (mouse.current.y - position.current.y) * speed;

//       if (dotRef.current && outlineRef.current) {
//         // Dot follows immediately (centered at 5px, assuming 10px dot size)
//         dotRef.current.style.transform = `translate3d(${
//           mouse.current.x - 5
//         }px, ${mouse.current.y - 5}px, 0)`;

//         // Outline follows with lag (centered at 20px, assuming 40px outline size)
//         outlineRef.current.style.transform = `translate3d(${
//           position.current.x - 20
//         }px, ${position.current.y - 20}px, 0)`; // Adjusted offset for 40px outline
//       }

//       requestAnimationFrame(animate);
//     };

//     animate();
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   return (
//     <div
//       // FIX: Ensure no internal vertical scrollbar by removing overflow-y setting,
//       // relying on the global CSS to handle content overflow.
//       className="relative bg-black overflow-x-hidden min-h-screen" // Added min-h-screen
//       style={{ cursor: "none" }}
//     >
//       {/* Toast notifications provider */}
//       <Toaster />

//       <Router>
//         <ScrollToTop />

//         {/* Lazy Loaded Routes */}
//         <Suspense fallback={<PageLoader />}>
//           <Routes>
//             {/* Only the confirmed Home route is included */}
//             <Route path="/" element={<Home />} />

//             {/* Future routes will be added here */}
//             {/* <Route path="/About" element={<About />} /> */}
//           </Routes>
//         </Suspense>

//         <Footer />
//       </Router>

//       {/* Custom Cursor Outline (Lagging) */}
//       <div
//         ref={outlineRef}
//         className="fixed top-0 left-0 h-10 w-10 rounded-full bg-[#38b6ff] opacity-30 pointer-events-none z-[9999]"
//         style={{
//           transition: "transform 0.1s ease-out",
//           willChange: "transform",
//         }}
//       ></div>

//       {/* Custom Cursor Dot (Immediate) */}
//       <div
//         ref={dotRef}
//         className="fixed top-0 left-0 h-3 w-3 rounded-full bg-[#38b6ff] pointer-events-none z-[9999]"
//         style={{ willChange: "transform" }}
//       ></div>
//     </div>
//   );
// };

// export default App;
