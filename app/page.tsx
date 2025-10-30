// "use client";


// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [impactPoints, setImpactPoints] = useState<{ x: number; y: number; id: number }[]>([]);
//   const [isClient, setIsClient] = useState(false); // <-- ADD THIS
//   const controls = useAnimation();

//   useEffect(() => {
//     // This effect only runs on the client, after mount
//     setIsClient(true); // <-- ADD THIS

//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []); // Empty dependency array ensures this runs only once

//   const createImpact = (x: number, y: number) => {
//     const id = Date.now();
//     setImpactPoints((prev) => [...prev, { x, y, id }]);
//     setTimeout(() => {
//       setImpactPoints((prev) => prev.filter((point) => point.id !== id));
//     }, 1000);
//   };

//   return (
//     <div 
//       className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden"
//       onClick={(e) => createImpact(e.clientX, e.clientY)}
//     >
//       {/* ... (Animated Scanlines and Dynamic Grid Background are fine) ... */}
//       <motion.div
//         className="absolute inset-0 pointer-events-none opacity-10"
//         animate={{ y: ["0%", "100%"] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         style={{
//           backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 50, 50, 0.3) 2px, rgba(255, 50, 50, 0.3) 4px)",
//         }}
//       />
//       <div className="absolute inset-0 opacity-30">
//         <motion.div
//           className="absolute inset-0"
//           animate={{
//             backgroundPosition: ["0px 0px", "50px 50px"],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           style={{
//             backgroundImage: `linear-gradient(rgba(255, 50, 50, 0.4) 2px, transparent 2px),
//                              linear-gradient(90deg, rgba(255, 50, 50, 0.4) 2px, transparent 2px)`,
//             backgroundSize: "50px 50px",
//             transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
//           }}
//         />
//       </div>

//       {/* ... (Bullet Impact Effects are fine) ... */}
//       {impactPoints.map((point) => (
//         <div key={point.id}>
//           {/* Impact Ring */}
//           <motion.div
//             className="absolute w-4 h-4 border-2 border-red-500 rounded-full pointer-events-none"
//             style={{ left: point.x - 8, top: point.y - 8 }}
//             initial={{ scale: 0, opacity: 1 }}
//             animate={{ scale: 8, opacity: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           />
//           {/* Shockwave */}
//           <motion.div
//             className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none"
//             style={{ left: point.x - 4, top: point.y - 4 }}
//             initial={{ scale: 1, opacity: 1 }}
//             animate={{ scale: 0, opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           />
//           {/* Fragments */}
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-orange-500 rounded-full pointer-events-none"
//               style={{ left: point.x, top: point.y }}
//               initial={{ x: 0, y: 0, opacity: 1 }}
//               animate={{
//                 x: Math.cos((i * Math.PI * 2) / 8) * 50,
//                 y: Math.sin((i * Math.PI * 2) / 8) * 50,
//                 opacity: 0,
//               }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             />
//           ))}
//         </div>
//       ))}


//       {/* Floating Bullets/Shells -- <-- UPDATED BLOCK */}
//       {isClient && [...Array(30)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-3 bg-gradient-to-b from-yellow-600 to-orange-700 rounded-sm opacity-40"
//           initial={{
//             // window is now safe to use
//             x: Math.random() * window.innerWidth,
//             y: -20,
//             rotate: Math.random() * 360,
//           }}
//           animate={{
//             // window is now safe to use
//             y: window.innerHeight + 20,
//             rotate: Math.random() * 360 + 720,
//           }}
//           transition={{
//             duration: Math.random() * 10 + 15,
//             repeat: Infinity,
//             ease: "linear",
//             delay: Math.random() * 10,
//           }}
//         />
//       ))}

//       {/* ... (Rest of the component is fine) ... */}
//       <motion.div
//         className="absolute pointer-events-none z-50 mix-blend-screen"
//         animate={{ x: mousePosition.x - 25, y: mousePosition.y - 25 }}
//         transition={{ type: "spring", damping: 30, stiffness: 200 }}
//       >
//         <div className="relative w-12 h-12">
//           <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
//           <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
//           <div className="absolute left-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
//           <div className="absolute right-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
//           <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-50" />
//         </div>
//       </motion.div>

//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 50, 50, 0.2), transparent 50%)`,
//         }}
//       />

//       <div className="relative z-10 text-center px-4 max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="mb-6 relative"
//         >
//           <motion.h1
//             className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter relative"
//             initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
//             animate={{ opacity: 1, scale: 1, rotateX: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           >
//             <motion.span
//               className="inline-block"
//               animate={{
//                 textShadow: [
//                   "0 0 20px rgba(255, 50, 50, 0.8)",
//                   "0 0 40px rgba(255, 50, 50, 0.6)",
//                   "0 0 20px rgba(255, 50, 50, 0.8)",
//                 ],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               PRECISION
//             </motion.span>
//           </motion.h1>
          
//           <motion.div
//             className="relative overflow-hidden"
//             initial={{ opacity: 0, x: -100 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <motion.h1
//               className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-red-600 tracking-tighter mt-2 relative"
//               initial={{ scale: 1 }}
//               animate={{ scale: [1, 1.05, 1] }}
//               transition={{ duration: 0.5, delay: 1.2 }}
//             >
//               <motion.span
//                 className="inline-block relative"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.1, delay: 1.2 }}
//               >
//                 ENGINEERED
//                 <motion.span
//                   className="absolute top-1/2 left-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full shadow-2xl"
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
//                   transition={{ duration: 0.5, delay: 1.2 }}
//                   style={{
//                     boxShadow: "inset 0 0 10px rgba(0,0,0,0.8), 0 0 20px rgba(255,50,50,0.5)",
//                   }}
//                 >
//                   {[...Array(6)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-gray-700"
//                       initial={{ scaleX: 0, opacity: 0 }}
//                       animate={{ scaleX: 1, opacity: 0.6 }}
//                       transition={{ duration: 0.3, delay: 1.3 + i * 0.05 }}
//                       style={{
//                         transformOrigin: "left center",
//                         rotate: `${(i * 60)}deg`,
//                       }}
//                     />
//                   ))}
//                 </motion.span>
//               </motion.span>
//             </motion.h1>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 1.8 }}
//           className="relative"
//         >
//           <motion.div
//             className="absolute -left-8 top-1/2 w-6 h-6 bg-orange-500 rounded-full blur-md"
//             animate={{
//               opacity: [0, 1, 0],
//               scale: [0.5, 1.5, 0.5],
//             }}
//             transition={{ duration: 0.3, delay: 1.8 }}
//           />
//           <motion.p
//             className="text-gray-300 text-xs sm:text-lg md:text-2xl lg:text-3xl mb-12 font-mono tracking-widest overflow-hidden"
//             initial={{ width: 0, opacity: 0 }}
//             animate={{ width: "auto", opacity: 1 }}
//             transition={{ duration: 1.5, delay: 1.8 }}
//             style={{ whiteSpace: "nowrap", display: "inline-block" }}
//           >
//             {"[ ADVANCED FIREARMS & AMMUNITION SYSTEMS ]"}
//           </motion.p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 2.2 }}
//           className="flex flex-col sm:flex-row gap-6 justify-center items-center"
//         >
//           <motion.button
//             whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255, 50, 50, 0.8)" }}
//             whileTap={{ scale: 0.9 }}
//             animate={{
//               boxShadow: [
//                 "0 0 0px rgba(255, 50, 50, 0)",
//                 "0 0 20px rgba(255, 50, 50, 0.5)",
//                 "0 0 0px rgba(255, 50, 50, 0)",
//               ],
//             }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="relative px-8 sm:px-12 py-3 sm:py-5 bg-red-600 text-white font-bold text-base sm:text-lg tracking-widest hover:bg-red-700 border-2 border-red-600 clip-path-button overflow-hidden group"
//           >
//             <motion.span
//               className="absolute inset-0 bg-white"
//               initial={{ x: "-100%" }}
//               whileHover={{ x: "100%" }}
//               transition={{ duration: 0.5 }}
//               style={{ opacity: 0.1 }}
//             />
//             EXPLORE CATALOG
//           </motion.button>
          
//           <motion.button
//             whileHover={{ scale: 1.1, borderColor: "#ef4444" }}
//             whileTap={{ scale: 0.9 }}
//             className="relative px-8 sm:px-12 py-3 sm:py-5 bg-transparent text-white font-bold text-base sm:text-lg tracking-widest border-2 border-white hover:bg-white hover:text-black transition-all duration-300 overflow-hidden group"
//           >
//             <motion.span
//               className="absolute top-0 left-0 w-full h-0.5 bg-red-500"
//               initial={{ scaleX: 0 }}
//               whileHover={{ scaleX: 1 }}
//               transition={{ duration: 0.3 }}
//               style={{ transformOrigin: "left" }}
//             />
//             CONTACT US
//           </motion.button>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1, delay: 2.8 }}
//           className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 md:gap-8 border-t border-gray-800 pt-12"
//         >
//           {[
//             { value: "50+", label: "Years Experience" },
//             { value: "100K+", label: "Units Manufactured" },
//             { value: "99.9%", label: "Quality Rating" },
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ duration: 0.6, delay: 2.8 + i * 0.2, type: "spring" }}
//               whileHover={{ scale: 1.1, y: -5 }}
//               className="relative"
//             >
//               <motion.div
//                 className="text-4xl sm:text-5xl font-black text-red-600 mb-2"
//                 animate={{
//                   textShadow: [
//                     "0 0 10px rgba(255, 50, 50, 0.5)",
//                     "0 0 20px rgba(255, 50, 50, 0.8)",
//                     "0 0 10px rgba(255, 50, 50, 0.5)",
//                   ],
//                 }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               >
//                 {stat.value}
//               </motion.div>
//               <div className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
//                 {stat.label}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {[
//         { top: true, left: true },
//         { top: true, right: true },
//         { bottom: true, left: true },
//         { bottom: true, right: true },
//       ].map((pos, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-red-600 opacity-60"
//           style={{
//             ...(pos.top && { top: 0 }),
//             ...(pos.bottom && { bottom: 0 }),
//             ...(pos.left && { left: 0 }),
//             ...(pos.right && { right: 0 }),
//             ...(pos.top && pos.left && { borderTop: "2px solid", borderLeft: "2px solid" }),
//             ...(pos.top && pos.right && { borderTop: "2px solid", borderRight: "2px solid" }),
//             ...(pos.bottom && pos.left && { borderBottom: "2px solid", borderLeft: "2px solid" }),
//             ...(pos.bottom && pos.right && { borderBottom: "2px solid", borderRight: "2px solid" }),
//           }}
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 0.6 }}
//           transition={{ duration: 0.8, delay: 3 + i * 0.1 }}
//         />
//       ))}
      
//     </div>
//   );
// }

// "use client";

// import { motion, useAnimation, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import Image from "next/image";

// // --- Image Carousel Setup ---
// const heroImages = [
//   '/Hero_images/hero_img_1.png',
//   // e.g., '/Hero_images/hero_img_2.png',
//   // e.g., '/Hero_images/hero_img_3.png',
// ];

// const carouselVariants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
//   exit: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }
// } as const;

// // --- Animation Variants for Hero Text ---
// const textContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.3, 
//       delayChildren: 1.2,
//     }
//   }
// } as const;

// const textItemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { ease: "easeOut", duration: 0.8 }
//   }
// } as const;


// export default function Home() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [impactPoints, setImpactPoints] = useState<{ x: number; y: number; id: number }[]>([]);
//   const [isClient, setIsClient] = useState(false);
//   const controls = useAnimation();

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     setIsClient(true);

//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     if (heroImages.length > 1) {
//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) =>
//           (prevIndex + 1) % heroImages.length
//         );
//       }, 5000); 

//       return () => clearInterval(interval);
//     }
//   }, []);


//   const createImpact = (x: number, y: number) => {
//     const id = Date.now();
//     setImpactPoints((prev) => [...prev, { x, y, id }]);
//     setTimeout(() => {
//       setImpactPoints((prev) => prev.filter((point) => point.id !== id));
//     }, 1000);
//   };

//   return (
//     <div 
//       className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden"
//       onClick={(e) => createImpact(e.clientX, e.clientY)}
//     >
//       {/* --- Hero Image Carousel --- */}
//       <AnimatePresence initial={false}>
//         <motion.div
//           key={currentIndex}
//           className="absolute inset-0 z-0"
//           variants={carouselVariants} 
//           initial="initial"
//           animate="animate"
//           exit="exit"
//         >
//           <Image
//             src={heroImages[currentIndex]}
//             alt="Hero background"
//             layout="fill"
//             objectFit="cover"
//             quality={90}
//             priority={true}
//           />
//           {/* Dark overlay for text readability */}
//           <div className="absolute inset-0 bg-black opacity-50" />
//         </motion.div>
//       </AnimatePresence>
      
//       {/* --- Visual Effects (Scanlines, Grid, etc.) --- */}
      
//       {/* Animated Scanlines - REMOVED */}
//       {/* Dynamic Grid Background - REMOVED */}

//       {/* Bullet Impact Effects (z-40) */}
//       {impactPoints.map((point) => (
//         <div key={point.id}>
//           <motion.div
//             className="absolute w-4 h-4 border-2 border-red-500 rounded-full pointer-events-none z-40"
//             style={{ left: point.x - 8, top: point.y - 8 }}
//             initial={{ scale: 0, opacity: 1 }}
//             animate={{ scale: 8, opacity: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           />
//           <motion.div
//             className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none z-40"
//             style={{ left: point.x - 4, top: point.y - 4 }}
//             initial={{ scale: 1, opacity: 1 }}
//             animate={{ scale: 0, opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           />
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-orange-500 rounded-full pointer-events-none z-40"
//               style={{ left: point.x, top: point.y }}
//               initial={{ x: 0, y: 0, opacity: 1 }}
//               animate={{
//                 x: Math.cos((i * Math.PI * 2) / 8) * 50,
//                 y: Math.sin((i * Math.PI * 2) / 8) * 50,
//                 opacity: 0,
//               }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             />
//           ))}
//         </div>
//       ))}

//       {/* Floating Bullets/Shells - REMOVED */}

//       {/* Crosshair Following Mouse (z-50) */}
//       <motion.div
//         className="absolute pointer-events-none z-50 mix-blend-screen"
//         animate={{ x: mousePosition.x - 25, y: mousePosition.y - 25 }}
//         transition={{ type: "spring", damping: 30, stiffness: 200 }}
//       >
//         <div className="relative w-12 h-12">
//           <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
//           <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
//           <div className="absolute left-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
//           <div className="absolute right-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
//           <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-50" />
//         </div>
//       </motion.div>

//       {/* Spotlight Effect (z-20) */}
//       <div
//         className="absolute inset-0 pointer-events-none z-20"
//         style={{
//           background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 50, 50, 0.2), transparent 50%)`,
//         }}
//       />

//       {/* --- Animated Hero Text (Bottom Right) --- */}
//       <motion.div 
//         className="absolute bottom-10 right-10 sm:bottom-16 sm:right-16 z-30 text-right text-white pointer-events-none"
//         variants={textContainerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.p
//           className="text-lg sm:text-xl font-sans"
//           variants={textItemVariants}
//         >
//           9x19mm
//         </motion.p>
        
//         <motion.h1
//           className="text-6xl sm:text-8xl font-black tracking-tighter -my-1 sm:-my-2"
//           variants={textItemVariants}
//         >
//           G72-P
//         </motion.h1>

//         <motion.p
//           className="text-2xl sm:text-3xl font-mono tracking-[0.2em]"
//           variants={textItemVariants}
//         >
//           PISTOL
//         </motion.p>
//       </motion.div>

//       {/* Corner Targeting Brackets (z-20) */}
//       {[
//         { top: true, left: true },
//         { top: true, right: true },
//         { bottom: true, left: true },
//         { bottom: true, right: true },
//       ].map((pos, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-red-600 opacity-60 z-20"
//           style={{
//             ...(pos.top && { top: 0 }),
//             ...(pos.bottom && { bottom: 0 }),
//             ...(pos.left && { left: 0 }),
//             ...(pos.right && { right: 0 }),
//             ...(pos.top && pos.left && { borderTop: "2px solid", borderLeft: "2px solid" }),
//             ...(pos.top && pos.right && { borderTop: "2px solid", borderRight: "2px solid" }),
//             ...(pos.bottom && pos.left && { borderBottom: "2px solid", borderLeft: "2px solid" }),
//             ...(pos.bottom && pos.right && { borderBottom: "2px solid", borderRight: "2px solid" }),
//           }}
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 0.6 }}
//           transition={{ duration: 0.8, delay: 3 + i * 0.1 }}
//         />
//       ))}
      
//     </div>
//   );
// }

import Footer from "@/components/Footer";
import AboutSection from "./home_components/AboutSection";
import HomeProducts from "./home_components/HomeProducts";
import Landing from "./home_components/Landing";
import Varaha_Home from "./home_components/Varaha_Home";
import NewsEvents from "./home_components/NewsEvents";

export default function Home() {
  return (
    <main>
      <Landing />
      <AboutSection />
      <HomeProducts />
      <Varaha_Home />
      <NewsEvents />
      <Footer />
      
    </main>
  );
}