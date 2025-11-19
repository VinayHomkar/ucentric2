import { useRef, useEffect, lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 1. Lazy Import: Only include the pages we have actually built/confirmed.
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const ServicePage = lazy(() => import('./Pages/ServicePage')); 
// Note: All other pages (Contact, Websitedesign, etc.) remain excluded for clarity.

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
}

// A simple loading component to show while pages are downloaded
const PageLoader = () => (
  // FIX: Applied spinner styling for better loader aesthetics
  <div className="w-full h-screen flex justify-center items-center bg-black">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#38b6ff] mb-3"></div>
    <p className="text-white text-lg">Loading...</p>
  </div>
);


const App = () => {  
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  // Custom cursor animation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Smoothing factor
      const speed = 0.15;
      
      position.current.x += (mouse.current.x - position.current.x) * speed;
      position.current.y += (mouse.current.y - position.current.y) * speed;

      if (dotRef.current && outlineRef.current) {
        // Dot follows immediately (centered at 5px)
        dotRef.current.style.transform =
          `translate3d(${mouse.current.x - 5}px, ${mouse.current.y - 5}px, 0)`;

        // FIX: Corrected offset for 40px outline
        outlineRef.current.style.transform =
          `translate3d(${position.current.x - 20}px, ${position.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="relative bg-black overflow-x-hidden min-h-screen" 
      style={{ cursor: 'none' }} 
    >
      <Toaster />
      <Router>
        <ScrollToTop />

        {/* Lazy Loaded Routes */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Completed Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} /> 
            {/* FIX: Changed path to match the link in Navbar.jsx */}
            <Route path="/ServicePage" element={<ServicePage />} /> 

            {/* Incomplete Routes (Commented out) */}
            {/* <Route path="/Contact" element={<Contact />} />
            ... (other routes)
            */}
          </Routes>
        </Suspense>

        <Footer />
      </Router>

      {/* Custom Cursor */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full bg-[#38b6ff] opacity-30 pointer-events-none z-[9999]"
        style={{ transition: 'transform 0.1s ease-out', willChange: "transform" }}
      ></div>

      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-[#38b6ff] pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      ></div>
    </div>
  )
}

export default App;