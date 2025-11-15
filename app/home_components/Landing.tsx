

// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";

// // --- 🎯 1. Upgraded to a "carousel data" structure ---
// // This now holds the image AND the text for each slide.
// const carouselData = [
//   {
//     src: '/Hero_images/hero_img_1.png',
//     line1: '9x19mm',
//     line2: 'G72-P',
//     line3: 'PISTOL',
//   },
//   {
//     src: '/Hero_images/hero_img_2.png',
//     line1: '7.62x39mm',
//     line2: 'AK-203',
//     line3: 'RIFLE',
//   },
//   {
//     src: '/Hero_images/hero_img_3.png',
//     line1: '.338 LAPUA MAG',
//     line2: 'VIPER',
//     line3: 'SNIPER',
//   },
// ];

// // --- Animation Variants for Hero Text ---
// const textContainerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.3,
//     }
//   },
//   exit: {
//     opacity: 0,
//     transition: {
//       staggerChildren: 0.1, // Stagger out faster
//       staggerDirection: -1 // Stagger out in reverse
//     }
//   }
// } as const;

// const textItemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { ease: "easeOut", duration: 0.5 }
//   }
// } as const;

// export default function Landing() {
//   // --- 🎯 2. Removed `mousePosition`, `isClient`, and `isDesktop` state ---
//   // They were only needed for the target icon.
//   const [impactPoints, setImpactPoints] = useState<{ x: number; y: number; id: number }[]>([]);
//   const [muzzleFlashes, setMuzzleFlashes] = useState<{ x: number; y: number; id: number }[]>([]);
//   const [centerTextShot, setCenterTextShot] = useState(false);
//   const [showText, setShowText] = useState(false);
  
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // --- 🎯 3. Removed the `useEffect` that managed mouse/desktop state ---
//   // This `useEffect` is just for the text/shot animation
//   useEffect(() => {
//     // Show text with typing effect
//     const timer1 = setTimeout(() => {
//       setShowText(true);
//     }, 300);
    
//     // Trigger shot effect after text appears
//     const timer2 = setTimeout(() => {
//       setCenterTextShot(true);
//     }, 1800);
    
//     return () => {
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, []);

//   const createImpact = (e: React.MouseEvent<HTMLDivElement>) => {
//     const x = e.clientX;
//     const y = e.clientY;
    
//     const id = Date.now();
//     setImpactPoints((prev) => [...prev, { x, y, id }]);
    
//     setMuzzleFlashes((prev) => [...prev, { x, y, id }]);
//     setTimeout(() => {
//       setMuzzleFlashes((prev) => prev.filter((flash) => flash.id !== id));
//     }, 150);
    
//     setTimeout(() => {
//       setImpactPoints((prev) => prev.filter((point) => point.id !== id));
//     }, 1000);
//   };

//   // --- 🎯 4. Updated navigation functions to use `carouselData.length` ---
//   const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setCurrentIndex((prevIndex) =>
//       (prevIndex + 1) % carouselData.length
//     );
//   };

//   const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.stopPropagation();
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + carouselData.length) % carouselData.length
//     );
//   };

//   const text1 = "DEFENCE SYSTEMS";
//   const text2 = "THAT DEFY ALL ODDS";

//   return (
//     <div 
//       // --- 🎯 5. Removed `md:cursor-none` to make cursor visible ---
//       className="relative flex items-center justify-center h-[75vh] md:h-screen bg-black overflow-hidden cursor-pointer"
//       onClick={createImpact}
//     >
//       {/* --- Hero Image Carousel (Now uses carouselData) --- */}
//       <motion.div
//         className="absolute inset-0 z-0 flex"
//         style={{ width: `${carouselData.length * 100}%` }}
//         animate={{ x: `-${currentIndex * (100 / carouselData.length)}%` }}
//         transition={{ duration: 1.5, ease: "easeInOut" }}
//       >
//         {carouselData.map((item, index) => (
//           <div
//             key={index}
//             className="relative w-full h-full"
//             style={{ width: `${100 / carouselData.length}%` }}
//           >
//             <img
//               src={item.src}
//               alt="Hero background"
//               className="w-full h-full object-cover"
//             />
//             {/* Dark overlay for text readability */}
//             <div className="absolute inset-0 bg-black opacity-60" />
//           </div>
//         ))}
//       </motion.div>


//       {/* Muzzle Flash Effects (Unchanged) */}
//       {muzzleFlashes.map((flash) => (
//         <motion.div
//           key={flash.id}
//           className="absolute pointer-events-none z-40"
//           style={{ left: flash.x - 40, top: flash.y - 40 }}
//           initial={{ scale: 0, opacity: 1 }}
//           animate={{ scale: 1, opacity: 0 }}
//           transition={{ duration: 0.15, ease: "easeOut" }}
//         >
//           <div className="relative w-20 h-20">
//             <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-80" />
//             <div className="absolute inset-2 bg-orange-500 rounded-full blur-lg opacity-90" />
//             <div className="absolute inset-4 bg-white rounded-full blur-md" />
//           </div>
//         </motion.div>
//       ))}

//       {/* Bullet Impact Effects (Unchanged) */}
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
//           {[...Array(12)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none z-40"
//               style={{ left: point.x, top: point.y }}
//               initial={{ x: 0, y: 0, opacity: 1 }}
//               animate={{
//                 x: Math.cos((i * Math.PI * 2) / 12) * 60,
//                 y: Math.sin((i * Math.PI * 2) / 12) * 60,
//                 opacity: 0,
//               }}
//               transition={{ duration: 0.6, ease: "easeOut" }}
//             />
//           ))}
//         </div>
//       ))}

//       {/* --- 🎯 6. Removed the Crosshair/Target Icon JSX --- */}


//       {/* --- Center Text with Animated Loading & Cracked Effect (Unchanged) --- */}
//       <div className="absolute z-30 text-center pointer-events-none px-4">
//         <div className="relative inline-block">
//           {/* First line - DEFENCE SYSTEMS */}
//           <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white mb-2">
//             {showText && text1.split('').map((char, i) => (
//               <motion.span
//                 key={`char1-${i}`}
//                 initial={{ opacity: 0, y: -20, rotateX: 90 }}
//                 animate={{ opacity: 1, y: 0, rotateX: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: i * 0.03,
//                   ease: "easeOut"
//                 }}
//                 className="inline-block"
//               >
//                 {char === ' ' ? '\u00A0' : char}
//               </motion.span>
//             ))}
//           </div>

//           {/* Second line - THAT DEFY ALL ODDS (Red text) */}
//           <div className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-red-600">
//             {showText && text2.split('').map((char, i) => (
//               <motion.span
//                 key={`char2-${i}`}
//                 initial={{ opacity: 0, x: -20, scale: 0.5 }}
//                 animate={{ opacity: 1, x: 0, scale: 1 }}
//                 transition={{
//                   duration: 0.4,
//                   delay: 0.5 + i * 0.03,
//                   ease: [0.34, 1.56, 0.64, 1]
//                 }}
//                 className="inline-block"
//               >
//                 {char === ' ' ? '\u00A0' : char}
//               </motion.span>
//             ))}
            
//             {/* Crack/Shatter overlays when shot (Unchanged) */}
//             {centerTextShot && (
//               <>
//                 <motion.div
//                   className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.1 }}
//                 >
//                   <div className="w-full h-full rounded-full bg-black border-2 border-gray-600" />
//                   <div className="absolute inset-1 rounded-full bg-gray-800" />
//                 </motion.div>
//                 {[...Array(8)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute top-1/2 left-1/2 h-0.5 bg-gray-700 origin-left"
//                     style={{
//                       width: `${80 + Math.random() * 100}px`,
//                       transform: `rotate(${(i * 45) + (Math.random() * 20 - 10)}deg)`,
//                     }}
//                     initial={{ scaleX: 0, opacity: 0 }}
//                     animate={{ scaleX: 1, opacity: 0.8 }}
//                     transition={{ 
//                       duration: 0.3, 
//                       delay: 0.1 + i * 0.02,
//                       ease: "easeOut"
//                     }}
//                   />
//                 ))}
//                 {[...Array(12)].map((_, i) => (
//                   <motion.div
//                     key={`sub-${i}`}
//                     className="absolute top-1/2 left-1/2 h-px bg-gray-600 origin-left"
//                     style={{
//                       width: `${30 + Math.random() * 50}px`,
//                       transform: `rotate(${(i * 30) + (Math.random() * 30)}deg) translate(${30 + Math.random() * 40}px, 0)`,
//                     }}
//                     initial={{ scaleX: 0, opacity: 0 }}
//                     animate={{ scaleX: 1, opacity: 0.6 }}
//                     transition={{ 
//                       duration: 0.2, 
//                       delay: 0.15 + i * 0.015,
//                       ease: "easeOut"
//                     }}
//                   />
//                 ))}
//                 {[...Array(20)].map((_, i) => (
//                   <motion.div
//                     key={`particle-${i}`}
//                     className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full"
//                     initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
//                     animate={{
//                       scale: [1, 0],
//                       opacity: [1, 0],
//                       x: (Math.random() - 0.5) * 150,
//                       y: (Math.random() - 0.5) * 150,
//                     }}
//                     transition={{ 
//                       duration: 0.6, 
//                       delay: 0.1,
//                       ease: "easeOut"
//                     }}
//                   />
//                 ))}
//                 <motion.div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-red-500 rounded-full"
//                   initial={{ scale: 0, opacity: 0.8 }}
//                   animate={{ scale: 4, opacity: 0 }}
//                   transition={{ duration: 0.6, ease: "easeOut" }}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* --- 🎯 7. MODIFIED Animated Product Text (Bottom Right) --- */}
//       {/* This now animates based on the `currentIndex` key */}
//       <AnimatePresence mode="wait">
//         <motion.div 
//           // Using `currentIndex` as a key tells Framer Motion
//           // to exit the old one and enter the new one on change.
//           key={currentIndex} 
//           className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-16 md:right-16 z-30 text-right text-white pointer-events-none"
//           variants={textContainerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <motion.p
//             className="text-base sm:text-lg md:text-xl font-sans"
//             variants={textItemVariants}
//           >
//             {carouselData[currentIndex].line1}
//           </motion.p>
          
//           <motion.h1
//             className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter -my-1 sm:-my-2"
//             variants={textItemVariants}
//           >
//             {carouselData[currentIndex].line2}
//           </motion.h1>

//           <motion.p
//             className="text-xl sm:text-2xl md:text-3xl font-mono tracking-[0.2em]"
//             variants={textItemVariants}
//           >
//             {carouselData[currentIndex].line3}
//           </motion.p>
//         </motion.div>
//       </AnimatePresence>
//       {/* --- END OF MODIFICATION --- */}


//       {/* Corner Targeting Brackets (Unchanged) */}
//       {[
//         { top: true, left: true },
//         { top: true, right: true },
//         { bottom: true, left: true },
//         { bottom: true, right: true },
//       ].map((pos, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border-red-600 opacity-60 z-20"
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
//           transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
//         />
//       ))}

//       {/* --- Carousel Navigation (Unchanged) --- */}
//       <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between items-center px-4 md:px-8 z-40">
//         {/* Left Arrow Button */}
//         <button
//           onClick={prevSlide}
//           className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-all duration-300 cursor-pointer"
//           aria-label="Previous slide"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
        
//         {/* Right Arrow Button */}
//         <button
//           onClick={nextSlide}
//           className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-all duration-300 cursor-pointer"
//           aria-label="Next slide"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
      
//     </div>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useState } from "react"; // No longer need useEffect

// --- 🎯 1. REMOVED all animation variants ---
// const textContainerVariants = ...
// const textItemVariants = ...

export default function Landing() {
  // --- 🎯 2. REMOVED all state ---
  // const [impactPoints, setImpactPoints] = useState([]);
  // const [muzzleFlashes, setMuzzleFlashes] = useState([]);
  // const [centerTextShot, setCenterTextShot] = useState(false);
  // const [showText, setShowText] = useState(false);

  // --- 🎯 3. REMOVED the useEffect for text animation ---
  // useEffect(() => { ... }, []);

  // --- 🎯 4. REMOVED the createImpact function ---
  // const createImpact = (e: React.MouseEvent<HTMLDivElement>) => { ... };

  // --- 🎯 5. REMOVED text consts ---
  // const text1 = "DEFENCE SYSTEMS";
  // const text2 = "THAT DEFY ALL ODDS";

  return (
    <div 
      // --- 🎯 6. REMOVED onClick and cursor-pointer ---
      className="relative flex items-center justify-center h-[75vh] md:h-screen bg-black overflow-hidden"
    >
      {/* --- Hero Video (Unchanged) --- */}
      <div className="absolute inset-0 z-0">
        <video
          src="/hero_video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60" />
      </div>
      {/* --- END OF VIDEO --- */}


      {/* --- 🎯 7. REMOVED Muzzle Flash Effects --- */}
      
      {/* --- 🎯 8. REMOVED Bullet Impact Effects --- */}

      {/* --- 🎯 9. REMOVED Center Text --- */}


      {/* Corner Targeting Brackets (Unchanged) */}
      {[
        { top: true, left: true },
        { top: true, right: true },
        { bottom: true, left: true },
        { bottom: true, right: true },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border-red-600 opacity-60 z-20"
          style={{
            ...(pos.top && { top: 0 }),
            ...(pos.bottom && { bottom: 0 }),
            ...(pos.left && { left: 0 }),
            ...(pos.right && { right: 0 }),
            ...(pos.top && pos.left && { borderTop: "2px solid", borderLeft: "2px solid" }),
            ...(pos.top && pos.right && { borderTop: "2px solid", borderRight: "2px solid" }),
            ...(pos.bottom && pos.left && { borderBottom: "2px solid", borderLeft: "2px solid" }),
            ...(pos.bottom && pos.right && { borderBottom: "2px solid", borderRight: "2px solid" }),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
        />
      ))}
      
    </div>
  );
}