// import React, { useState, useEffect, useRef } from 'react';
// // FIX 1: Import AnimatePresence from framer-motion
// import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// // ✅ Banner Section
// const Banner = () => (
//   <div className="relative h-[70vh] w-full bg-black overflow-hidden">
//     <img
//       src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=2000&q=80"
//       alt="Tech Banner"
//       className="absolute inset-0 w-full h-full object-cover opacity-30"
//     />
//     <div className="relative z-10 flex flex-col justify-center items-center text-center h-full text-white px-6">
//       <motion.h1
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
//       >
//         Empowering Digital Growth
//       </motion.h1>
//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 1 }}
//         className="text-lg max-w-2xl text-gray-300"
//       >
//         Scalable, secure, and smart web solutions crafted for modern businesses.
//       </motion.p>
//     </div>
//   </div>
// );

// // ✅ Services Section Data (Unchanged)
// const serviceData = [
//   { 
//     icon: '💻', 
//     title: 'Website Design', 
//     description: 'Top-quality web design with user-friendly interfaces and brand-focused aesthetics.',
//     link: '/Websitedesign'
//   },
//   { 
//     icon: '🛒', 
//     title: 'E-Commerce Development', 
//     description: 'Data-driven strategies to handle diverse eCommerce challenges.',
//     link: '/Ecommerce'
//   },
//   { 
//     icon: '📱', 
//     title: 'Mobile App Development', 
//     description: 'Engaging mobile apps using the latest technologies for seamless UX.',
//     link: '/Mobileapp'
//   },
//   { 
//     icon: '📊', 
//     title: 'Digital Marketing', 
//     description: 'Effective digital strategies to boost your brand visibility and engagement.',
//     link: '/Digitalmarketing'
//   },
//   { 
//     icon: '🔍', 
//     title: 'Portfolio', 
//     description: 'A professional portfolio highlighting skills, achievements, and innovative projects across multiple domains.',
//     link: '/Portfolio'
//   },
//   { 
//     icon: '🎓', 
//     title: 'College/Student Projects', 
//     description: 'Guidance and support for students and colleges on practical technical projects.',
//     link: '/StudentProjects'
//   }
// ];

// // ✅ Animated Accent Divider (Unchanged fix)
// const AccentDivider = ({ align = 'center' }) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         const currentRef = ref.current;
//         if (!currentRef) return; 

//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                     observer.disconnect(); 
//                 }
//             },
//             { threshold: 0.5 }
//         );
        
//         observer.observe(currentRef);

//         return () => {
//              observer.disconnect();
//         };
//     }, []); 

//     return (
//         <div
//             ref={ref}
//             style={{
//                 width: isVisible ? '100px' : '0px',
//                 height: '4px',
//                 backgroundColor: '#38b6ff', // ACCENT_BLUE
//                 margin: align === 'center' ? '0 auto 50px auto' : '0 0 50px 0',
//                 transition: 'width 0.6s ease-out',
//                 borderRadius: '2px'
//             }}
//         ></div>
//     );
// };


// // ✅ Service Card Component (Unchanged fix)
// const ServiceCard = ({ service, index }) => {
//   const navigate = useNavigate();
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [visible, setVisible] = useState(false);
//   const divRef = useRef(null);

//   const handleMouseMove = (e) => {
//     if (!divRef.current) return; 
//     const bounds = divRef.current.getBoundingClientRect();
//     setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.2 }}
//       viewport={{ once: true }}
//       ref={divRef}
//       onMouseEnter={() => setVisible(true)}
//       onMouseLeave={() => setVisible(false)}
//       onMouseMove={handleMouseMove}
//       onClick={() => navigate(service.link)}
//       className='relative overflow-hidden m-4 rounded-2xl border border-[#38b6ff40]
//         shadow-[0_0_20px_#00043320] hover:shadow-[0_0_35px_#38b6ff80]
//         transition-all duration-500 group bg-white/5 dark:bg-[#000433]/80 backdrop-blur-md cursor-pointer flex flex-col items-center p-8 hover:scale-105'
//     >
//       {/* 🔵 Hover Glow */}
//       <div
//         className={`pointer-events-none blur-3xl rounded-full 
//           bg-gradient-to-r from-[#38b6ff] via-[#1a4aff] to-[#000433] 
//           w-[250px] h-[250px] absolute z-0 transition-opacity duration-500 mix-blend-screen 
//           ${visible ? 'opacity-60' : 'opacity-0'}`}
//         style={{ top: position.y - 125, left: position.x - 125 }}
//       />

//       {/* 🌟 Content */}
//       <div className="relative z-10 flex flex-col items-center gap-4">
//         <div className='relative bg-gradient-to-br from-[#38b6ff] to-[#000433] p-[2px] rounded-full mb-4'>
//           <div className='bg-white dark:bg-[#000433] rounded-full p-6 flex justify-center items-center'>
//             <span className='text-4xl'>{service.icon}</span>
//           </div>
//         </div>

//         <h3 className='text-xl font-bold text-[#38b6ff] text-center'>{service.title}</h3>
//         <p className='text-gray-300 text-sm text-center leading-relaxed'>{service.description}</p>
//       </div>
//     </motion.div>
//   );
// };

// // ✅ Services Section (Unchanged)
// const Services = () => (
//   <section id="services" className="py-20 px-6 bg-black text-white text-center relative">
//     <motion.h2
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
//     >
//       Our Services
//     </motion.h2>
    
//     <AccentDivider />

//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
//       {serviceData.map((service, index) => (
//         <ServiceCard key={index} service={service} index={index} />
//       ))}
//     </div>
//   </section>
// );

// // Testimonials data (Unchanged)
// const testimonialsData = [
//   { name: 'Sathish K', role: 'Founder - Phoenix Fire', feedback: 'Ucentric delivered a modern, fast, and visually appealing website that truly reflects our brand identity.' },
//   { name: 'Uma Deve', role: 'Director - All In All Avva', feedback: 'Their team was professional, proactive, and very responsive. Our online presence has never looked better!' },
//   { name: 'Arjun Balaji', role: 'Owner - Balaji Agencies', feedback: 'The website design and functionality exceeded our expectations. We received numerous compliments from clients.' },
//   { name: 'Vijayalakxmi', role: 'Creative Head - Arohi Designer', feedback: 'Ucentric transformed our ideas into a beautiful digital experience. The support and communication were excellent.' },
//   { name: 'Madan', role: 'CEO - MD Wood Works', feedback: 'From concept to delivery, their expertise was outstanding. The project was completed on time and to our satisfaction.' },
//   { name: 'Sneha F', role: 'Manager - Flowers', feedback: 'The team provided innovative solutions and helped us elevate our brand digitally. Very happy with their work!' },
//   { name: 'Ramesh P', role: 'Owner - Balaji Pawn Shop', feedback: 'Professional, creative, and reliable. Ucentric delivered a smooth, user-friendly website with excellent support.' }
// ];

// const Testimonials = () => {
//   const clients = [
//     'Phoenix Fire', 'All In All Avva', 'Balaji Agencies',
//     'Arohi Designer', 'MD Wood Works',
//     'Flowers', 'Balaji Pawn Shop'
//   ];
//   const [current, setCurrent] = useState(0);
  
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent(prev => (prev + 1) % testimonialsData.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="clients" className="py-20 px-6 bg-black text-white text-center">
//       <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">They Trust Us</h2>
      
//       <AccentDivider />

//       <p className="text-gray-300 mb-12 max-w-2xl mx-auto">Join the ranks of our satisfied clients who rely on Ucentric for exceptional digital solutions.</p>
//       <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-6xl mx-auto mb-12">
//         {clients.map((name, i) => (
//         <div key={i} className="bg-[#000814]/40 p-4 rounded-xl flex items-center justify-center text-sm text-gray-300">{name}</div>
//         ))}
//       </div>
//       <div className="max-w-3xl mx-auto mt-30">
//         <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient">Client Testimonial</h3>

//         <AccentDivider />

//         <div className="bg-[#000814]/60 rounded-2xl p-6 shadow-lg transition-all duration-200">
//           <p className="text-gray-300 mb-4">“{testimonialsData[current].feedback}”</p>
//           <strong>— {testimonialsData[current].name}, {testimonialsData[current].role}</strong>
//         </div>
//       </div>
//     </section>
//   );
// };

// // FAQ data (Unchanged)
// const faqs = [
//   { q: 'What services do you offer?', a: 'We offer web development, LMS solutions, server management, and cybersecurity services.' },
//   { q: 'Do you provide support after project completion?', a: 'Yes! We provide continuous support and upgrades post-project.' },
//   { q: 'What security standards do you follow for web designing?', a: 'We follow strict protocols ensuring client data is fully protected at every stage, with thorough security checks and utmost confidentiality.' },
//  { q: 'How do you decide the best technology for my project?', a: 'We analyze your project goals, requirements, and budget to select technologies ensuring scalability, performance, and maintainability.' },
//   { q: 'How are resources assigned to a new project?', a: 'Resources are assigned based on project scope and expertise required. Skilled designers, developers, and managers are allocated for timely, quality delivery.' }
// ];

// const FAQs = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <section id="faqs" className="py-20 px-6 bg-black text-white text-center">
//       <motion.h2
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-12 font-semibold text-center bg-gradient-to-r from-[#38b6ff] to-[#000433] bg-clip-text text-transparent animate-gradient"
//       >
//         FAQs
//       </motion.h2>

//       <AccentDivider />

//       <div className="max-w-3xl mx-auto space-y-4">
//         {faqs.map((faq, index) => (
//           <div key={index} className="border border-[#1a4aff]/20 rounded-xl overflow-hidden">
//             <button
//               onClick={() => setOpenIndex(openIndex === index ? null : index)}
//               className="w-full flex justify-between items-center text-left px-6 py-4 text-lg font-medium bg-[#000814]/60 hover:bg-[#000814]/80"
//             >
//               <span>{faq.q}</span>
//               <span className={`text-gray-400 ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
//             </button>
//             {/* FIX 6: Wrapped conditional motion.div in AnimatePresence */}
//             <AnimatePresence initial={false}>
//               {openIndex === index && (
//                 <motion.div
//                     key="content"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="px-6 pb-4 text-gray-300 text-sm bg-[#000814]/50"
//                   >
//                     {faq.a}
//                   </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// // ✅ Main Component
// const ServicePage = () => {
//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Navbar />
//       <Banner />
//       <Services />
//       <Testimonials />
//       <FAQs />
//     </div>
//   );
// };

// export default ServicePage;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceBanner from '../components/ServiceBanner';
import ServiceServices from '../components/ServiceServices';
import ServiceTestimonials from '../components/ServiceTestimonials';
import ServiceFaq from '../components/ServiceFaq';

const ServicePage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main>
        <ServiceBanner />
        <ServiceServices />
        <ServiceTestimonials />
        <ServiceFaq />
      </main>
    </div>
  );
};

export default ServicePage;