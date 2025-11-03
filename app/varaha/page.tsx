
// "use client";

// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//     }
//   }
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//       delay: 3.8
//     }
//   }
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//     }
//   }
// };

// const VarahaPage: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.2 });
//   const router = useRouter();

//   const [particles, setParticles] = useState<Particle[]>([]);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const generatedParticles = Array.from({ length: 150 }).map((_, i) => ({
//       id: i,
//       x: randomValue(0, 100),
//       y: randomValue(0, 100),
//       duration: randomValue(8, 16),
//       delay: randomValue(0, 10),
//     }));
//     setParticles(generatedParticles);
//   }, []);

//   useEffect(() => {
//     setIsVisible(isInView);
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col items-center justify-start min-h-[150vh] overflow-hidden"
//     >
//       {/* --- BACKGROUND --- */}
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)'
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: "easeInOut" }}
//         >
//           {/* Particles */}
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)'
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0]
//                     }
//                   : {
//                       opacity: 0
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear'
//               }}
//             />
//           ))}

//           {/* Grid lines */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px'
//             }}
//           />
//         </motion.div>
//       </div>

//       {/* --- FLOOR GRID AREA --- */}
//       <div
//         className="absolute left-0 w-full z-0 overflow-hidden"
//         style={{
//           top: '90vh',
//           height: '200vh',
//           perspective: '1200px'
//         }}
//       >
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top'
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 1 } }}
//         >
//           {/* Grid Floor */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: '60px 60px',
//               backgroundPosition: 'center top'
//             }}
//           />

//           {/* SVG: Dots and Comets */}
//           <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
//             <defs>
//               <radialGradient id="dotGlow">
//                 <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
//                 <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
//               </radialGradient>
//               <filter id="cometGlowSvg" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             {/* Glowing Dots */}
//             {Array.from({ length: 60 }).map((_, row) =>
//               Array.from({ length: 30 }).map((_, col) => (
//                 <motion.circle
//                   key={`${row}-${col}`}
//                   cx={col * 60}
//                   cy={row * 60}
//                   r="3"
//                   fill="url(#dotGlow)"
//                   initial={{ opacity: 0 }}
//                   animate={
//                     isInView
//                       ? {
//                           opacity: [0, 0.6, 0.8, 0.6],
//                           r: [2, 3, 4, 3]
//                         }
//                       : { opacity: 0 }
//                   }
//                   transition={{
//                     duration: 2,
//                     delay: (row + col) * 0.02,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                     ease: 'easeInOut'
//                   }}
//                 />
//               ))
//             )}

//             {/* Comets with CSS variable animation (No warning) */}
//             {isInView && (
//               <>
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 0 180 H 1800")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 6,
//                     delay: 1.5,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 300 0 V 1200")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 7,
//                     delay: 3.0,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 600 60 L 1200 660")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 8,
//                     delay: 4.5,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />
//               </>
//             )}
//           </svg>

//           {/* Gradient Fade */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)'
//             }}
//           />
//         </motion.div>
//       </div>

//       {/* --- FOREGROUND CONTENT --- */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0]
//               }}
//               exit={{
//                 scale: 0.2,
//                 y: -300,
//                 opacity: 0,
//                 transition: { duration: 1.0, ease: 'easeIn' }
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror'
//                 }
//               }}
//             >
//               <img
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear'
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// export default VarahaPage;


// "use client";

// import React, { useRef, useState, useEffect } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//     }
//   }
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//       delay: 3.8
//     }
//   }
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1]
//     }
//   }
// };

// const VarahaPage: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.2 });
//   const router = useRouter();

//   const [particles, setParticles] = useState<Particle[]>([]);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const generatedParticles = Array.from({ length: 150 }).map((_, i) => ({
//       id: i,
//       x: randomValue(0, 100),
//       y: randomValue(0, 100),
//       duration: randomValue(8, 16),
//       delay: randomValue(0, 10),
//     }));
//     setParticles(generatedParticles);
//   }, []);

//   useEffect(() => {
//     setIsVisible(isInView);
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col items-center justify-start min-h-[200vh] overflow-hidden" // <-- THIS VALUE WAS CHANGED
//     >
//       {/* --- BACKGROUND --- */}
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)'
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: "easeInOut" }}
//         >
//           {/* Particles */}
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)'
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0]
//                     }
//                   : {
//                       opacity: 0
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear'
//               }}
//             />
//           ))}

//           {/* Grid lines */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px'
//             }}
//           />
//         </motion.div>
//       </div>

//       {/* --- FLOOR GRID AREA --- */}
//       <div
//         className="absolute left-0 w-full z-0 overflow-hidden"
//         style={{
//           top: '140vh', // Your desired spacing
//           height: '200vh',
//           perspective: '1200px'
//         }}
//       >
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top'
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 1 } }}
//         >
//           {/* Grid Floor */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: '60px 60px',
//               backgroundPosition: 'center top'
//             }}
//           />

//           {/* SVG: Dots and Comets */}
//           <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
//             <defs>
//               <radialGradient id="dotGlow">
//                 <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
//                 <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
//               </radialGradient>
//               <filter id="cometGlowSvg" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             {/* Glowing Dots */}
//             {Array.from({ length: 60 }).map((_, row) =>
//               Array.from({ length: 30 }).map((_, col) => (
//                 <motion.circle
//                   key={`${row}-${col}`}
//                   cx={col * 60}
//                   cy={row * 60}
//                   r="3"
//                   fill="url(#dotGlow)"
//                   initial={{ opacity: 0 }}
//                   animate={
//                     isInView
//                       ? {
//                           opacity: [0, 0.6, 0.8, 0.6],
//                           r: [2, 3, 4, 3]
//                         }
//                       : { opacity: 0 }
//                   }
//                   transition={{
//                     duration: 2,
//                     delay: (row + col) * 0.02,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                     ease: 'easeInOut'
//                   }}
//                 />
//               ))
//             )}

//             {/* Comets with CSS variable animation (No warning) */}
//             {isInView && (
//               <>
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 0 180 H 1800")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 6,
//                     delay: 1.5,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 300 0 V 1200")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 7,
//                     delay: 3.0,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={{
//                     offsetPath: `path("M 600 60 L 1200 660")`,
//                     '--offset': '0%',
//                     offsetDistance: 'var(--offset)'
//                   } as React.CSSProperties}
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 8,
//                     delay: 4.5,
//                     repeat: Infinity,
//                     ease: 'linear'
//                   }}
//                 />
//               </>
//             )}
//           </svg>

//           {/* Gradient Fade */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)'
//             }}
//           />
//         </motion.div>
//       </div>

//       {/* --- FOREGROUND CONTENT --- */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0]
//               }}
//               exit={{
//                 scale: 0.2,
//                 y: -300,
//                 opacity: 0,
//                 transition: { duration: 1.0, ease: 'easeIn' }
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror'
//                 }
//               }}
//             >
//               <img
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isVisible && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear'
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useMemo,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- MemoizedParticles Component (Hydration Error Fixed) ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     // Start with an empty array and generate particles on client
//     const [particles, setParticles] = useState<Particle[]>([]);

//     useEffect(() => {
//       // This code now runs ONLY on the client, after hydration
//       const generatedParticles = Array.from({ length: 75 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []); // Empty dependency array ensures this runs only once on mount

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {/* Particles */}
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}

//           {/* Grid lines */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- MemoizedFloorGrid Component ---
// const MemoizedFloorGrid: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     // Drastically reduced dot count (60x30=1800 -> 25x15=375)
//     const gridRows = 25;
//     const gridCols = 15;

//     const dots = useMemo(() => {
//       return Array.from({ length: gridRows }).map((_, row) =>
//         Array.from({ length: gridCols }).map((_, col) => ({
//           id: `${row}-${col}`,
//           cx: col * 60,
//           cy: row * 60,
//           delay: (row + col) * 0.02,
//         }))
//       );
//     }, []);

//     return (
//       <div
//         className="absolute left-0 w-full z-0 overflow-hidden"
//         style={{
//           top: '140vh',
//           height: '200vh',
//           perspective: '1200px',
//         }}
//       >
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top',
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 1 } }}
//         >
//           {/* Grid Floor */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: '60px 60px',
//               backgroundPosition: 'center top',
//             }}
//           />

//           {/* SVG: Dots and Comets */}
//           <svg
//             className="absolute inset-0 w-full h-full"
//             style={{ overflow: 'visible' }}
//           >
//             <defs>
//               <radialGradient id="dotGlow">
//                 <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
//                 <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
//               </radialGradient>
//               <filter
//                 id="cometGlowSvg"
//                 x="-50%"
//                 y="-50%"
//                 width="200%"
//                 height="200%"
//               >
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             {/* Glowing Dots */}
//             {dots.flat().map((dot) => (
//               <motion.circle
//                 key={dot.id}
//                 cx={dot.cx}
//                 cy={dot.cy}
//                 r="3"
//                 fill="url(#dotGlow)"
//                 initial={{ opacity: 0 }}
//                 animate={
//                   isInView
//                     ? {
//                         opacity: [0, 0.6, 0.8, 0.6],
//                         r: [2, 3, 4, 3],
//                       }
//                     : { opacity: 0 }
//                 }
//                 transition={{
//                   duration: 2,
//                   delay: dot.delay,
//                   repeat: Infinity,
//                   repeatType: 'reverse',
//                   ease: 'easeInOut',
//                 }}
//               />
//             ))}

//             {/* Comets with CSS variable animation */}
//             {isInView && (
//               <>
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 0 180 H 1800")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 6,
//                     delay: 1.5,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 300 0 V 1200")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 7,
//                     delay: 3.0,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />

//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 600 60 L 1200 660")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 8,
//                     delay: 4.5,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//               </>
//             )}
//           </svg>

//           {/* Gradient Fade */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedFloorGrid.displayName = 'MemoizedFloorGrid';

// // --- Main Page Component ---
// const VarahaPage: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col items-center justify-start min-h-[200vh] overflow-hidden"
//     >
//       {/* --- BACKGROUND --- */}
//       <MemoizedParticles isInView={isInView} />

//       {/* --- FLOOR GRID AREA --- */}
//       <MemoizedFloorGrid isInView={isInView} />

//       {/* --- FOREGROUND CONTENT --- */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               exit={{
//                 scale: 0.2,
//                 y: -300,
//                 opacity: 0,
//                 transition: { duration: 1.0, ease: 'easeIn' },
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               {/* Replaced <img> with next/image `Image` */}
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800} // Set the INTRINSIC width of your source image
//                 height={600} // Set the INTRINSIC height of your source image
//                 // These sizes match your responsive `w-` classes
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority // Add priority if this image is Above The Fold
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useMemo,
//   memo,
//   Suspense, // For 3D model loading
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// // Imports for 3D rendering
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, Environment } from '@react-three/drei';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- MemoizedParticles Component (Hydration Error Fixed) ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     // Start with an empty array and generate particles on client
//     const [particles, setParticles] = useState<Particle[]>([]);

//     useEffect(() => {
//       // This code now runs ONLY on the client, after hydration
//       const generatedParticles = Array.from({ length: 75 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []); // Empty dependency array ensures this runs only once on mount

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {/* Particles */}
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}

//           {/* Grid lines */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 3D Sensor Component ---
// const Sensor: React.FC<any> = (props) => {
//   const { scene } = useGLTF('/varaha/CUAS-Sensor.glb');
//   return <primitive object={scene.clone()} {...props} />;
// };
// useGLTF.preload('/varaha/CUAS-Sensor.glb');
// const MemoizedSensor = React.memo(Sensor);

// // --- Test Cube Component (For Debugging) ---
// const TestCube: React.FC = () => {
//   return (
//     <mesh position={[0, 50, 0]}> {/* Position it slightly up */}
//       <boxGeometry args={[50, 50, 50]} /> {/* Make it 50x50x50 */}
//       <meshStandardMaterial color="red" />
//     </mesh>
//   );
// };

// // --- MemoizedFloorGrid Component ---
// const MemoizedFloorGrid: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     // Drastically reduced dot count (60x30=1800 -> 25x15=375)
//     const gridRows = 25;
//     const gridCols = 15;

//     const dots = useMemo(() => {
//       return Array.from({ length: gridRows }).map((_, row) =>
//         Array.from({ length: gridCols }).map((_, col) => ({
//           id: `${row}-${col}`,
//           cx: col * 60,
//           cy: row * 60,
//           delay: (row + col) * 0.02,
//         }))
//       );
//     }, []);

//     return (
//       <div
//         className="absolute left-0 w-full z-0 overflow-hidden"
//         style={{
//           top: '140vh',
//           height: '200vh',
//           perspective: '1200px',
//         }}
//       >
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top',
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 1 } }}
//         >
//           {/* Grid Floor */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: '60px 60px',
//               backgroundPosition: 'center top',
//             }}
//           />

//           {/* SVG: Dots and Comets */}
//           <svg
//             className="absolute inset-0 w-full h-full"
//             style={{ overflow: 'visible', zIndex: 0 }}
//           >
//             <defs>
//               <radialGradient id="dotGlow">
//                 <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
//                 <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
//               </radialGradient>
//               <filter
//                 id="cometGlowSvg"
//                 x="-50%"
//                 y="-50%"
//                 width="200%"
//                 height="200%"
//               >
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             {/* Glowing Dots */}
//             {dots.flat().map((dot) => (
//               <motion.circle
//                 key={dot.id}
//                 cx={dot.cx}
//                 cy={dot.cy}
//                 r="3"
//                 fill="url(#dotGlow)"
//                 initial={{ opacity: 0 }}
//                 animate={
//                   isInView
//                     ? {
//                         opacity: [0, 0.6, 0.8, 0.6],
//                         r: [2, 3, 4, 3],
//                       }
//                     : { opacity: 0 }
//                 }
//                 transition={{
//                   duration: 2,
//                   delay: dot.delay,
//                   repeat: Infinity,
//                   repeatType: 'reverse',
//                   ease: 'easeInOut',
//                 }}
//               />
//             ))}

//             {/* Comets with CSS variable animation */}
//             {isInView && (
//               <>
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 0 180 H 1800")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 6,
//                     delay: 1.5,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 300 0 V 1200")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 7,
//                     delay: 3.0,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 600 60 L 1200 660")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 8,
//                     delay: 4.5,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//               </>
//             )}
//           </svg>

//           {/* --- 3D SENSOR CANVAS --- */}
//           <Suspense fallback={null}>
//             <Canvas
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 zIndex: 1, // Place sensors on top of grid/dots
//               }}
//               // Camera position to test the cube
//               camera={{ position: [0, 200, 400], fov: 50 }}
//             >
//               {/* Basic lighting */}
//               <ambientLight intensity={1} />
//               <directionalLight position={[10, 10, 5]} intensity={1.5} />
//               {/* Environment for nice reflections */}
//               <Environment preset="night" />

//               {/* --- ADDED: The test cube for debugging --- */}
//               <TestCube />

//               {/* --- COMMENTED OUT: Hide sensors until cube is visible ---
//               <MemoizedSensor
//                 scale={150} 
//                 position={[-200, 0, 300]} 
//                 rotation={[0, 0.5, 0]} 
//               />
//               <MemoizedSensor
//                 scale={120} 
//                 position={[150, 0, 100]} 
//                 rotation={[0, -0.3, 0]}
//               />
//               */}
//             </Canvas>
//           </Suspense>

//           {/* Gradient Fade */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)',
//               zIndex: 2, // Ensure it's on top of 3D models
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedFloorGrid.displayName = 'MemoizedFloorGrid';

// // --- Main Page Component ---
// const VarahaPage: React.FC = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col items-center justify-start min-h-[200vh] overflow-hidden"
//     >
//       {/* --- BACKGROUND --- */}
//       <MemoizedParticles isInView={isInView} />

//       {/* --- FLOOR GRID AREA --- */}
//       <MemoizedFloorGrid isInView={isInView} />

//       {/* --- FOREGROUND CONTENT --- */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               exit={{
//                 scale: 0.2,
//                 y: -300,
//                 opacity: 0,
//                 transition: { duration: 1.0, ease: 'easeIn' },
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               {/* Replaced <img> with next/image `Image` */}
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800} // Set the INTRINSIC width of your source image
//                 height={600} // Set the INTRINSIC height of your source image
//                 // These sizes match your responsive `w-` classes
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority // Add priority if this image is Above The Fold
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//               exit={{ opacity: 0, transition: { duration: 0.2 } }}
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useMemo,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// // --- MemoizedParticles Component ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 75 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component ---
// // This section is MODIFIED to make the images "stand up"
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   const gridRows = 25;
//   const gridCols = 15;
//   const dots = useMemo(() => {
//     return Array.from({ length: gridRows }).map((_, row) =>
//       Array.from({ length: gridCols }).map((_, col) => ({
//         id: `${row}-${col}`,
//         cx: col * 60,
//         cy: row * 60,
//         delay: (row + col) * 0.02,
//       }))
//     );
//   }, []);

//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//     >
//       <div
//         className="absolute w-full h-full"
//         style={{
//           perspective: '1200px',
//           top: '20vh',
//         }}
//       >
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top',
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 0.5 } }}
//         >
//           {/* Grid Floor */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
//                 linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
//               `,
//               backgroundSize: '60px 60px',
//               backgroundPosition: 'center top',
//             }}
//           />

//           {/* SVG: Dots and Comets */}
//           <svg
//             className="absolute inset-0 w-full h-full"
//             style={{ overflow: 'visible', zIndex: 0 }}
//           >
//             <defs>
//               <radialGradient id="dotGlow">
//                 <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
//                 <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
//               </radialGradient>
//               <filter
//                 id="cometGlowSvg"
//                 x="-50%"
//                 y="-50%"
//                 width="200%"
//                 height="200%"
//               >
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>
//             {dots.flat().map((dot) => (
//               <motion.circle
//                 key={dot.id}
//                 cx={dot.cx}
//                 cy={dot.cy}
//                 r="3"
//                 fill="url(#dotGlow)"
//                 initial={{ opacity: 0 }}
//                 animate={
//                   isInView
//                     ? {
//                         opacity: [0, 0.6, 0.8, 0.6],
//                         r: [2, 3, 4, 3],
//                       }
//                     : { opacity: 0 }
//                 }
//                 transition={{
//                   duration: 2,
//                   delay: dot.delay,
//                   repeat: Infinity,
//                   repeatType: 'reverse',
//                   ease: 'easeInOut',
//                 }}
//               />
//             ))}
//             {isInView && (
//               <>
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 0 180 H 1800")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 6,
//                     delay: 1.5,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//                 <motion.circle
//                   r="4"
//                   fill="rgba(14, 165, 233, 1)"
//                   filter="url(#cometGlowSvg)"
//                   style={
//                     {
//                       offsetPath: `path("M 300 0 V 1200")`,
//                       '--offset': '0%',
//                       offsetDistance: 'var(--offset)',
//                     } as React.CSSProperties
//                   }
//                   animate={{ '--offset': ['0%', '100%'] }}
//                   transition={{
//                     duration: 7,
//                     delay: 3.0,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />
//               </>
//             )}
//           </svg>
          
//           {/* --- 2D SENSOR IMAGES - NOW STANDING UPRIGHT --- */}
//           <div className="absolute inset-0" style={{ zIndex: 1 }}>
//             {/* Sensor 1 (Closer, Left) */}
//             <motion.div
//               className="absolute"
//               style={{ 
//                 top: '25%', // Adjust vertical position
//                 left: '18%', // Adjust horizontal position
//                 transformOrigin: 'center bottom', // Important for rotation
//               }} 
//               initial={{ opacity: 0, y: 50 }}
//               animate={isInView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 1, delay: 0.8 }}
//             >
//               <motion.div
//                 // Apply inverse rotation to make it stand upright
//                 style={{ transform: 'rotateX(-60deg) translateZ(20px)' }} // Lift slightly from grid
//               >
//                 <Image
//                   src="/varaha/CUAS-Sensor.png"
//                   alt="CUAS Sensor"
//                   width={512} 
//                   height={512} 
//                   className="w-56 h-auto drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" 
//                 />
//               </motion.div>
//             </motion.div>

//             {/* Sensor 2 (Further, Right) */}
//             <motion.div
//               className="absolute"
//               style={{ 
//                 top: '15%', // Adjust vertical position
//                 left: '55%', // Adjust horizontal position
//                 transformOrigin: 'center bottom', // Important for rotation
//               }} 
//               initial={{ opacity: 0, y: 50 }}
//               animate={isInView ? { opacity: 0.8, y: 0 } : {}} 
//               transition={{ duration: 1, delay: 1.0 }}
//             >
//               <motion.div
//                 // Apply inverse rotation to make it stand upright
//                 style={{ transform: 'rotateX(-60deg) translateZ(15px)' }} // Lift slightly from grid
//               >
//                 <Image
//                   src="/varaha/CUAS-Sensor.png"
//                   alt="CUAS Sensor"
//                   width={512} 
//                   height={512} 
//                   className="w-40 h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
//                 />
//               </motion.div>
//             </motion.div>
//           </div>
//           {/* --- END OF 2D SENSOR IMAGES --- */}

//           {/* Gradient Fade */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)',
//               zIndex: 2, // Must be on top of sensors
//             }}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   useEffect(() => {
//     const htmlElement = document.documentElement;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = '';
//       htmlElement.style.position = '';
//       htmlElement.style.width = '';
//       htmlElement.style.top = '';
//     } else {
//       htmlElement.style.overflow = 'hidden';
//       htmlElement.style.position = 'fixed';
//       htmlElement.style.width = '100%';
//       htmlElement.style.top = '0';
//     }
    
//     return () => {
//       htmlElement.style.overflow = '';
//       htmlElement.style.position = '';
//       htmlElement.style.width = '';
//       htmlElement.style.top = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useMemo,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Network Point Interface ---
// interface NetworkPoint {
//   id: number;
//   x: number;
//   y: number;
//   connections: number[];
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// // (This section is unchanged and correct)
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// // --- MemoizedParticles Component ---
// // (This component is unchanged and correct)
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component with Animated Network ---
// // --- THIS COMPONENT IS MODIFIED ---
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   const networkPoints = useMemo<NetworkPoint[]>(() => {
//     const numPoints = 50;
//     const points: NetworkPoint[] = Array.from({ length: numPoints }, (_, i) => ({
//       id: i,
//       x: randomValue(5, 95),
//       y: randomValue(5, 95),
//       connections: [],
//     }));
    
//     points.forEach((point) => {
//       point.connections = points
//         .map((p, i) => ({
//           index: i,
//           distance: Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2)),
//         }))
//         .filter((p) => p.index !== point.id && p.distance < 15)
//         .sort((a, b) => a.distance - b.distance)
//         .slice(0, 3)
//         .map((p) => p.index);
//     });

//     return points;
//   }, []);

//   return (
//     // --- MODIFICATION: Removed 'h-screen' and added padding ---
//     <section
//       ref={ref}
//       className="relative w-full overflow-hidden bg-black pt-16" // No h-screen, added padding-top
//     >
//       {/* --- MODIFICATION: Removed 'absolute inset-0' --- */}
//       <div className="relative" style={{ perspective: '1200px' }}>
//         {/* --- MODIFICATION: Removed 'absolute w-full h-full', added fixed height to style --- */}
//         <motion.div
//           className="relative w-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'rotateX(60deg) translateZ(-100px)',
//             transformOrigin: 'center top',
//             height: '100vh', // Give the grid a fixed length
//           }}
//           animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
//           transition={{ opacity: { duration: 1.5, delay: 0.5 } }}
//         >
//           {/* Grid Lines */}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(0, 220, 255, 0.3) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(0, 220, 255, 0.3) 1px, transparent 1px)
//               `,
//               backgroundSize: '50px 50px',
//               backgroundPosition: 'center top',
//             }}
//           />

//           {/* Animated Network Points */}
//           <svg
//             className="absolute inset-0 w-full h-full"
//             style={{ overflow: 'visible', zIndex: 0 }}
//           >
//             <defs>
//               <radialGradient id="pointGlow">
//                 <stop offset="0%" stopColor="rgba(0, 255, 255, 1)" />
//                 <stop offset="100%" stopColor="rgba(0, 200, 255, 0)" />
//               </radialGradient>
//               <filter id="connectionGlow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="3" result="coloredBlur" />
//                 <feMerge>
//                   <feMergeNode in="coloredBlur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>
            
//             {/* Network Points */}
//             {networkPoints.map((point) => (
//               <g key={point.id}>
//                 <motion.circle
//                   cx={`${point.x}%`}
//                   cy={`${point.y}%`}
//                   r="4"
//                   fill="rgba(0, 255, 255, 0.9)"
//                   filter="url(#connectionGlow)"
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={
//                     isInView
//                       ? {
//                           opacity: [0, 1, 0.8, 1],
//                           scale: [0, 1.2, 0.8, 1],
//                         }
//                       : { opacity: 0 }
//                   }
//                   transition={{
//                     duration: 2,
//                     delay: point.id * 0.02,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                     ease: 'easeInOut',
//                   }}
//                 />
//                 <motion.circle
//                   cx={`${point.x}%`}
//                   cy={`${point.y}%`}
//                   r="2"
//                   fill="rgba(255, 255, 255, 1)"
//                   initial={{ opacity: 0 }}
//                   animate={
//                     isInView
//                       ? {
//                           opacity: [0, 1, 1],
//                         }
//                       : { opacity: 0 }
//                   }
//                   transition={{
//                     duration: 1,
//                     delay: point.id * 0.02,
//                   }}
//                 />
//               </g>
//             ))}
//           </svg>

//           {/* Sensor Images Standing Upright */}
//           <div className="absolute inset-0" style={{ zIndex: 1 }}>
//             {/* Left Sensor */}
//             <motion.div
//               className="absolute"
//               style={{
//                 bottom: '45%',
//                 left: '25%',
//                 transformOrigin: 'center bottom',
//               }}
//               initial={{ opacity: 0, y: 100, scale: 0.5 }}
//               animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//               transition={{ duration: 1.2, delay: 1, ease: 'easeOut' }}
//             >
//               <motion.div
//                 style={{
//                   transform: 'rotateX(-60deg) translateZ(50px)',
//                   transformStyle: 'preserve-3d',
//                 }}
//                 animate={{
//                   y: [0, -10, 0],
//                 }}
//                 transition={{
//                   duration: 3,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                 }}
//               >
//                 <Image
//                   src="/varaha/CUAS-Sensor.png"
//                   alt="CUAS Sensor"
//                   width={6082}
//                   height={512}
//                   className="w-32 sm:w-48 h-auto drop-shadow-[0_0_30px_rgba(0,200,255,0.8)]"
//                 />
//                 {/* Circular Pulse Effect */}
//                 <motion.div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 border-2 border-cyan-400 rounded-full"
//                   animate={{
//                     scale: [1, 2, 2],
//                     opacity: [0.8, 0.2, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     ease: 'easeOut',
//                   }}
//                 />
//               </motion.div>
//             </motion.div>

//             {/* Right Sensor */}
//             <motion.div
//               className="absolute"
//               style={{
//                 bottom: '35%',
//                 right: '20%',
//                 transformOrigin: 'center bottom',
//               }}
//               initial={{ opacity: 0, y: 100, scale: 0.5 }}
//               animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//               transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
//             >
//               <motion.div
//                 style={{
//                   transform: 'rotateX(-60deg) translateZ(70px)',
//                   transformStyle: 'preserve-3d',
//                 }}
//                 animate={{
//                   y: [0, -12, 0],
//                 }}
//                 transition={{
//                   duration: 3.5,
//                   repeat: Infinity,
//                   ease: 'easeInOut',
//                   delay: 0.5,
//                 }}
//               >
//                 <Image
//                   src="/varaha/CUAS-Sensor.png"
//                   alt="CUAS Sensor"
//                   width={512}
//                   height={512}
//                   className="w-40 sm:w-56 h-auto drop-shadow-[0_0_35px_rgba(0,200,255,0.9)]"
//                 />
//                 {/* Circular Pulse Effect */}
//                 <motion.div
//                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40 h-32 sm:h-40 border-2 border-cyan-400 rounded-full"
//                   animate={{
//                     scale: [1, 2.2, 2.2],
//                     opacity: [0.8, 0.2, 0],
//                   }}
//                   transition={{
//                     duration: 2.2,
//                     repeat: Infinity,
//                     ease: 'easeOut',
//                     delay: 0.5,
//                   }}
//                 />
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Gradient Fade Overlay */}
//           <div
//             className="absolute inset-0"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)',
//               zIndex: 2,
//             }}
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// // (This component is unchanged and correct)
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   useEffect(() => {
//     const htmlElement = document.documentElement;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = '';
//       htmlElement.style.position = '';
//       htmlElement.style.width = '';
//       htmlElement.style.top = '';
//     } else {
//       htmlElement.style.overflow = 'hidden';
//       htmlElement.style.position = 'fixed';
//       htmlElement.style.width = '100%';
//       htmlElement.style.top = '0';
//     }
    
//     return () => {
//       htmlElement.style.overflow = '';
//       htmlElement.style.position = '';
//       htmlElement.style.width = '';
//       htmlElement.style.top = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;
// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {/* --- CHANGED --- Standardized font size */}
//               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// // --- MemoizedParticles Component ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component with Rotating Globe ---
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

//   return (
//     <section
//       ref={ref}
//       // --- CHANGED --- Made responsive: center on mobile, bottom-right on desktop
//       className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center sm:items-end sm:justify-end"
//       style={{ perspective: '2000px' }}
//     >
//       {/* Globe Container - Bottom Right with 3D perspective */}
//       <motion.div
//         // --- CHANGED --- Made responsive: removed base mr-12 to prevent overflow
//         className="relative mb-12 sm:mb-16 sm:mr-16 lg:mb-20 lg:mr-24"
//         initial={{ opacity: 0, scale: 0.7, y: 80 }}
//         animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//         transition={{ duration: 1.4, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
//         style={{ 
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* Main Globe Container */}
//         <div 
//           // --- CHANGED --- Made responsive: reduced base size from w-80 to w-72
//           className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]"
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           {/* Earth Globe - Core */}
//           <motion.div
//             className="relative w-full h-full rounded-full overflow-hidden"
//             style={{
//               background: 'radial-gradient(circle at 35% 35%, #2a5f8f 0%, #1a4566 30%, #0d2438 60%, #000000 100%)',
//               boxShadow: `
//                 0 0 100px rgba(30, 144, 255, 0.4),
//                 inset -80px -80px 150px rgba(0, 0, 0, 0.95),
//                 inset 40px 40px 100px rgba(100, 180, 255, 0.2)
//               `,
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [0, 360],
//             }}
//             transition={{
//               duration: 80,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//           >
//             {/* Enhanced Realistic Continents */}
//             <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 200">
//               <defs>
//                 <filter id="land-depth">
//                   <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
//                   <feOffset dx="2" dy="3" result="offsetblur"/>
//                   <feComponentTransfer>
//                     <feFuncA type="linear" slope="0.4"/>
//                   </feComponentTransfer>
//                   <feMerge>
//                     <feMergeNode/>
//                     <feMergeNode in="SourceGraphic"/>
//                   </feMerge>
//                 </filter>
//               </defs>
              
//               {/* North America */}
//               <path d="M40,45 Q50,40 60,42 L65,46 Q70,44 75,48 L78,52 Q82,50 85,55 L88,62 Q85,70 78,72 L70,68 Q65,72 58,70 L52,66 Q48,68 42,65 Z" 
//                 fill="#2d6b9f" opacity="0.8" filter="url(#land-depth)"/>
              
//               {/* Europe */}
//               <path d="M95,38 Q102,36 108,40 L112,44 Q115,42 118,46 L120,52 Q118,58 112,60 L106,58 Q102,60 98,57 Z" 
//                 fill="#2d6b9f" opacity="0.75" filter="url(#land-depth)"/>
              
//               {/* Africa */}
//               <path d="M90,65 Q100,62 110,68 L114,75 Q118,73 122,80 L124,90 Q122,98 115,102 L108,100 Q103,104 96,102 L92,96 Q88,98 85,92 Z" 
//                 fill="#2d6b9f" opacity="0.8" filter="url(#land-depth)"/>
              
//               {/* Asia */}
//               <path d="M120,45 Q135,42 148,48 L155,55 Q160,52 165,58 L168,68 Q172,65 175,72 L176,82 Q170,90 160,92 L150,88 Q142,92 135,88 L128,82 Q125,85 120,80 Z" 
//                 fill="#2d6b9f" opacity="0.78" filter="url(#land-depth)"/>
              
//               {/* South America */}
//               <path d="M55,95 Q65,92 72,98 L76,108 Q80,105 83,112 L85,125 Q82,135 74,138 L68,134 Q63,138 58,134 L54,125 Q52,120 55,115 Z" 
//                 fill="#2d6b9f" opacity="0.8" filter="url(#land-depth)"/>
              
//               {/* Australia */}
//               <path d="M145,115 Q155,113 162,118 L165,125 Q168,123 170,128 L171,135 Q168,140 160,141 L153,138 Q148,140 145,136 Z" 
//                 fill="#2d6b9f" opacity="0.75" filter="url(#land-depth)"/>
//             </svg>

//             {/* Realistic Grid with Depth */}
//             <div className="absolute inset-0">
//               {[12, 28, 44, 60, 76, 92].map((top) => (
//                 <motion.div
//                   key={`lat-${top}`}
//                   className="absolute left-0 right-0 h-px"
//                   style={{ 
//                     top: `${top}%`,
//                     background: `linear-gradient(90deg, transparent 0%, rgba(0, 220, 255, ${0.08 + (top / 1000)}) 20%, rgba(0, 220, 255, ${0.15 + (top / 800)}) 50%, rgba(0, 220, 255, ${0.08 + (top / 1000)}) 80%, transparent 100%)`,
//                   }}
//                   animate={{
//                     opacity: [0.3, 0.6, 0.3],
//                   }}
//                   transition={{
//                     duration: 5 + (top * 0.03),
//                     repeat: Infinity,
//                     delay: top * 0.015,
//                   }}
//                 />
//               ))}
//               {[12, 28, 44, 60, 76, 92].map((left) => (
//                 <motion.div
//                   key={`long-${left}`}
//                   className="absolute top-0 bottom-0 w-px"
//                   style={{ 
//                     left: `${left}%`,
//                     background: `linear-gradient(180deg, transparent 0%, rgba(0, 220, 255, ${0.08 + (left / 1000)}) 20%, rgba(0, 220, 255, ${0.15 + (left / 800)}) 50%, rgba(0, 220, 255, ${0.08 + (left / 1000)}) 80%, transparent 100%)`,
//                   }}
//                   animate={{
//                     opacity: [0.3, 0.6, 0.3],
//                   }}
//                   transition={{
//                     duration: 5 + (left * 0.03),
//                     repeat: Infinity,
//                     delay: left * 0.015,
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Atmospheric Glow with Animation */}
//             <motion.div 
//               className="absolute inset-0 rounded-full pointer-events-none"
//               style={{
//                 background: 'radial-gradient(circle at 38% 38%, rgba(120, 200, 255, 0.25) 0%, rgba(80, 160, 255, 0.12) 35%, transparent 65%)',
//               }}
//               animate={{
//                 opacity: [0.5, 0.9, 0.5],
//                 scale: [1, 1.02, 1],
//               }}
//               transition={{
//                 duration: 6,
//                 repeat: Infinity,
//                 ease: 'easeInOut',
//               }}
//             />

//             {/* City Lights with Realistic Distribution */}
//             {Array.from({ length: 25 }).map((_, i) => {
//               const positions = [
//                 {x: 55, y: 52}, {x: 72, y: 58}, {x: 48, y: 62}, // North America
//                 {x: 105, y: 48}, {x: 112, y: 52}, {x: 98, y: 55}, // Europe
//                 {x: 142, y: 65}, {x: 155, y: 72}, {x: 165, y: 68}, // Asia
//                 {x: 105, y: 82}, {x: 115, y: 88}, {x: 110, y: 78}, // Africa
//                 {x: 68, y: 115}, {x: 74, y: 122}, {x: 62, y: 108}, // South America
//                 {x: 158, y: 128}, {x: 163, y: 132}, // Australia
//                 {x: 85, y: 58}, {x: 128, y: 76}, {x: 148, y: 82}, // Additional cities
//                 {x: 58, y: 68}, {x: 77, y: 110}, {x: 152, y: 125}, {x: 118, y: 90}, {x: 135, y: 72}
//               ];
//               const pos = positions[i] || {x: 20 + Math.random() * 160, y: 20 + Math.random() * 160};
              
//               return (
//                 <motion.div
//                   key={`city-${i}`}
//                   className="absolute w-1 h-1 rounded-full"
//                   style={{
//                     top: `${pos.y}%`,
//                     left: `${pos.x}%`,
//                     backgroundColor: '#ffeb3b',
//                     boxShadow: '0 0 6px rgba(255, 235, 59, 0.9), 0 0 3px rgba(255, 200, 0, 0.7)',
//                   }}
//                   animate={{
//                     opacity: [0.4, 0.9, 0.4],
//                     scale: [0.7, 1.3, 0.7],
//                   }}
//                   transition={{
//                     duration: 2 + Math.random() * 3,
//                     repeat: Infinity,
//                     delay: Math.random() * 2,
//                   }}
//                 />
//               );
//             })}

//             {/* Cloud Layer */}
//             <motion.div
//               className="absolute inset-0 rounded-full"
//               style={{
//                 background: 'radial-gradient(ellipse at 60% 45%, rgba(255, 255, 255, 0.08) 0%, transparent 40%)',
//               }}
//               animate={{
//                 opacity: [0.3, 0.5, 0.3],
//                 scale: [1, 1.05, 1],
//               }}
//               transition={{
//                 duration: 8,
//                 repeat: Infinity,
//               }}
//             />
//           </motion.div>

//           {/* Layer 1: Inner Detection Ring - Fastest */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '112%',
//               height: '112%',
//               top: '-6%',
//               left: '-6%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [0, 360],
//             }}
//             transition={{
//               duration: 18,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(1)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `2px solid ${hoveredLayer === 1 ? 'rgba(0, 255, 255, 0.7)' : 'rgba(0, 220, 255, 0.35)'}`,
//                 boxShadow: hoveredLayer === 1 
//                   ? '0 0 50px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.3)' 
//                   : '0 0 25px rgba(0, 220, 255, 0.25), inset 0 0 15px rgba(0, 220, 255, 0.15)',
//               }}
//             >
//               {/* Radar Sweep */}
//               <motion.div
//                 className="absolute inset-0 rounded-full overflow-hidden"
//                 style={{
//                   background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 220, 255, 0.5) 25deg, rgba(0, 255, 255, 0.3) 45deg, transparent 70deg)',
//                 }}
//                 animate={{
//                   rotate: [0, 360],
//                 }}
//                 transition={{
//                   duration: 3.5,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//               />

//               {/* Grid lines on ring */}
//               {Array.from({ length: 16 }).map((_, i) => (
//                 <div
//                   key={`ring1-line-${i}`}
//                   className="absolute top-1/2 left-1/2 w-full h-px origin-left"
//                   style={{
//                     background: 'linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.25), transparent)',
//                     transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Layer 2: Mid Shield - Medium Speed */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '128%',
//               height: '128%',
//               top: '-14%',
//               left: '-14%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [360, 0],
//             }}
//             transition={{
//               duration: 32,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(2)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `1.5px solid ${hoveredLayer === 2 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.28)'}`,
//                 boxShadow: hoveredLayer === 2 
//                   ? '0 0 45px rgba(59, 130, 246, 0.5)' 
//                   : '0 0 22px rgba(59, 130, 246, 0.22)',
//               }}
//             >
//               {/* Hexagonal Pattern */}
//               <svg className="w-full h-full" viewBox="0 0 200 200">
//                 <defs>
//                   <filter id="hex-glow-enhanced">
//                     <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
//                     <feMerge>
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>
//                 {Array.from({ length: 30 }).map((_, i) => {
//                   const angle = (i * 12) * (Math.PI / 180);
//                   const radius = 78 + (i % 5) * 5;
//                   const cx = 100 + Math.cos(angle) * radius;
//                   const cy = 100 + Math.sin(angle) * radius;
//                   return (
//                     <motion.g key={`hex-${i}`}>
//                       <motion.polygon
//                         points={`${cx},${cy-5.5} ${cx+4.8},${cy-2.75} ${cx+4.8},${cy+2.75} ${cx},${cy+5.5} ${cx-4.8},${cy+2.75} ${cx-4.8},${cy-2.75}`}
//                         fill="none"
//                         stroke={hoveredLayer === 2 ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.3)"}
//                         strokeWidth="1.2"
//                         filter="url(#hex-glow-enhanced)"
//                         animate={{
//                           opacity: [0.25, 0.75, 0.25],
//                           scale: [0.92, 1.08, 0.92],
//                         }}
//                         transition={{
//                           duration: 3.5 + (i % 4) * 0.5,
//                           repeat: Infinity,
//                           delay: i * 0.06,
//                         }}
//                       />
//                     </motion.g>
//                   );
//                 })}
//               </svg>
//             </div>
//           </motion.div>

//           {/* Layer 3: Outer Defense - Slowest */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '148%',
//               height: '148%',
//               top: '-24%',
//               left: '-24%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [0, -360],
//             }}
//             transition={{
//               duration: 50,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(3)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `1px solid ${hoveredLayer === 3 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.22)'}`,
//                 boxShadow: hoveredLayer === 3 
//                   ? '0 0 55px rgba(99, 102, 241, 0.45)' 
//                   : '0 0 28px rgba(99, 102, 241, 0.2)',
//               }}
//             >
//               {/* Orbital Satellites */}
//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <motion.div
//                   key={`satellite-${angle}`}
//                   className="absolute w-3.5 h-3.5 rounded-sm"
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                     transformOrigin: '0 0',
//                     backgroundColor: 'rgba(99, 102, 241, 0.9)',
//                     boxShadow: '0 0 15px rgba(99, 102, 241, 0.9), 0 0 8px rgba(139, 92, 246, 0.7)',
//                   }}
//                   animate={{
//                     rotate: [angle, angle + 360],
//                     scale: [1, 1.35, 1],
//                   }}
//                   transition={{
//                     rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
//                     scale: { duration: 2.5, repeat: Infinity, delay: i * 0.5 },
//                   }}
//                 >
//                   {/* Satellite antenna */}
//                   <div 
//                     className="absolute w-10 h-px left-0 top-1/2 -translate-y-1/2"
//                     style={{
//                       background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.8), transparent)',
//                     }}
//                   />
//                 </motion.div>
//               ))}

//               {/* Connection nodes */}
//               {Array.from({ length: 20 }).map((_, i) => {
//                 const angle = (i * 18) * (Math.PI / 180);
//                 return (
//                   <motion.div
//                     key={`node-${i}`}
//                     className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(90px)`,
//                       boxShadow: '0 0 6px rgba(99, 102, 241, 0.8)',
//                     }}
//                     animate={{
//                       opacity: [0.4, 0.9, 0.4],
//                       scale: [0.8, 1.3, 0.8],
//                     }}
//                     transition={{
//                       duration: 2.8,
//                       repeat: Infinity,
//                       delay: i * 0.14,
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* --- REMOVED --- Enhanced Vertical Scanner block was here */}

//           {/* Interactive Data Points */}
//           {Array.from({ length: 16 }).map((_, i) => {
//             const angle = (i * 22.5) * (Math.PI / 180);
//             const radius = 50;
//             return (
//               <motion.div
//                 key={`datapoint-${i}`}
//                 className="absolute w-3 h-3 bg-cyan-400 rounded-full cursor-pointer"
//                 style={{
//                   top: '50%',
//                   left: '50%',
//                   transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`,
//                   boxShadow: '0 0 12px rgba(0, 255, 255, 0.9)',
//                 }}
//                 animate={{
//                   scale: [1, 1.6, 1],
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 2.8,
//                   repeat: Infinity,
//                   delay: i * 0.175,
//                 }}
//                 whileHover={{ 
//                   scale: 2.2, 
//                   boxShadow: '0 0 25px rgba(0, 255, 255, 1)',
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 {/* Data connection lines */}
//                 <motion.div
//                   className="absolute w-20 h-px bg-cyan-400/50 origin-left"
//                   style={{
//                     left: '50%',
//                     top: '50%',
//                     transform: `rotate(${-angle * (180 / Math.PI)}deg)`,
//                   }}
//                   animate={{
//                     scaleX: [0, 1, 0],
//                     opacity: [0, 0.7, 0],
//                   }}
//                   transition={{
//                     duration: 3.5,
//                     repeat: Infinity,
//                     delay: i * 0.175,
//                   }}
//                 />
//               </motion.div>
//             );
//           })}

//           {/* Enhanced Pulse Rings */}
//           {[0, 1, 2, 3].map((i) => (
//             <motion.div
//               key={`pulse-${i}`}
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: '2px solid rgba(0, 220, 255, 0.4)',
//               }}
//               animate={{
//                 scale: [1, 1.7],
//                 opacity: [0.7, 0],
//               }}
//               transition={{
//                 duration: 4.5,
//                 repeat: Infinity,
//                 delay: i * 1.125,
//                 ease: 'easeOut',
//               }}
//             />
//           ))}

//           {/* Threat Detection Markers */}
//           {[30, 110, 190, 270, 340].map((angle, i) => (
//             <motion.div
//               key={`threat-${angle}`}
//               className="absolute"
//               style={{
//                 top: '50%',
//                 left: '50%',
//                 transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-72%)`,
//               }}
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: [0, 1, 1, 0],
//                 scale: [0.6, 1.2, 1.2, 0.6],
//               }}
//               transition={{
//                 duration: 3.5,
//                 repeat: Infinity,
//                 delay: i * 0.7,
//               }}
//             >
//               <div className="relative w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
//                 <div className="w-2 h-2 bg-red-500 rounded-full" />
//                 <motion.div 
//                   className="absolute inset-0 bg-red-500/40 rounded-full"
//                   animate={{
//                     scale: [1, 1.8, 1.8],
//                     opacity: [0.6, 0, 0],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                   }}
//                 />
//               </div>
//             </motion.div>
//           ))}

//           {/* Info Labels (appear on hover) */}
//           <AnimatePresence>
//             {hoveredLayer !== null && (
//               <motion.div
//                 className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-400/50"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <p className="text-cyan-300 text-sm font-semibold whitespace-nowrap">
//                   {hoveredLayer === 1 && 'Detection Layer - Active Scanning'}
//                   {hoveredLayer === 2 && 'Shield Layer - Energy Barrier'}
//                   {hoveredLayer === 3 && 'Defense Perimeter - Satellite Network'}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   // --- CHANGED --- Improved scroll lock logic
//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       // Restore scrolling
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       // Prevent scrolling
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     // Cleanup function to ensure scrolling is restored if component unmounts
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import EarthCanvas from './earthCanvas';


// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {/* --- CHANGED --- Standardized font size */}
//               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// // --- MemoizedParticles Component ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component with Rotating Globe ---
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   // --- MODIFICATION ---
//   // Removed the 'hoveredLayer' state as it's no longer used
//   // const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

//   return (
//     <section
//       ref={ref}
//       // --- CHANGED --- Made responsive: center on mobile, bottom-right on desktop
//       className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center sm:items-end sm:justify-end"
//       style={{ perspective: '2000px' }}
//     >
//       {/* Globe Container - Bottom Right with 3D perspective */}
//       <motion.div
//         // --- CHANGED --- Made responsive: removed base mr-12 to prevent overflow
//         className="relative mb-12 sm:mb-16 sm:mr-16 lg:mb-20 lg:mr-24"
//         initial={{ opacity: 0, scale: 0.7, y: 80 }}
//         animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//         transition={{ duration: 1.4, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
//         style={{ 
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* Main Globe Container */}
//         <div 
//           // --- CHANGED --- Made responsive: reduced base size from w-80 to w-72
//           // This div now acts as the container that sizes your 3D canvas
//           className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]"
//         >
//           {/* --- MODIFICATION ---
//             All the old globe code (over 400 lines) was removed 
//             and replaced with your EarthCanvas component.
//           */}
//           <EarthCanvas />
          
//         </div>
//       </motion.div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   // --- CHANGED --- Improved scroll lock logic
//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       // Restore scrolling
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       // Prevent scrolling
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     // Cleanup function to ensure scrolling is restored if component unmounts
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import EarthCanvas from './earthCanvas';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// // --- MemoizedParticles Component ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component with Rotating Globe ---
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

//   return (
//     <section
//       ref={ref}
//       // --- CHANGED --- Made responsive: center on mobile, bottom-right on desktop
//       className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center sm:items-end sm:justify-end"
//       style={{ perspective: '2000px' }}
//     >
//       {/* Globe Container - Bottom Right with 3D perspective */}
//       <motion.div
//         // --- CHANGED --- Made responsive: removed base mr-12 to prevent overflow
//         className="relative mb-12 sm:mb-16 sm:mr-16 lg:mb-20 lg:mr-24"
//         initial={{ opacity: 0, scale: 0.7, y: 80 }}
//         animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//         transition={{ duration: 1.4, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
//         style={{ 
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* Main Globe Container */}
//         <div 
//           // --- CHANGED --- Made responsive: reduced base size from w-80 to w-72
//           className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]"
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           {/* --- MODIFICATION ---
//             The 2D div globe was removed and replaced with your 3D EarthCanvas.
//             The canvas will fill the size of this parent div.
//           */}
//           <div className="absolute inset-0 w-full h-full">
//             <EarthCanvas />
//           </div>

//           {/* Layer 1: Inner Detection Ring - Fastest (Kept) */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '112%',
//               height: '112%',
//               top: '-6%',
//               left: '-6%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [0, 360],
//             }}
//             transition={{
//               duration: 18,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(1)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `2px solid ${hoveredLayer === 1 ? 'rgba(0, 255, 255, 0.7)' : 'rgba(0, 220, 255, 0.35)'}`,
//                 boxShadow: hoveredLayer === 1 
//                   ? '0 0 50px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.3)' 
//                   : '0 0 25px rgba(0, 220, 255, 0.25), inset 0 0 15px rgba(0, 220, 255, 0.15)',
//               }}
//             >
//               {/* Radar Sweep */}
//               <motion.div
//                 className="absolute inset-0 rounded-full overflow-hidden"
//                 style={{
//                   background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 220, 255, 0.5) 25deg, rgba(0, 255, 255, 0.3) 45deg, transparent 70deg)',
//                 }}
//                 animate={{
//                   rotate: [0, 360],
//                 }}
//                 transition={{
//                   duration: 3.5,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//               />

//               {/* Grid lines on ring */}
//               {Array.from({ length: 16 }).map((_, i) => (
//                 <div
//                   key={`ring1-line-${i}`}
//                   className="absolute top-1/2 left-1/2 w-full h-px origin-left"
//                   style={{
//                     background: 'linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.25), transparent)',
//                     transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Layer 2: Mid Shield - Medium Speed (Kept) */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '128%',
//               height: '128%',
//               top: '-14%',
//               left: '-14%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [360, 0],
//             }}
//             transition={{
//               duration: 32,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(2)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `1.5px solid ${hoveredLayer === 2 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.28)'}`,
//                 boxShadow: hoveredLayer === 2 
//                   ? '0 0 45px rgba(59, 130, 246, 0.5)' 
//                   : '0 0 22px rgba(59, 130, 246, 0.22)',
//               }}
//             >
//               {/* Hexagonal Pattern */}
//               <svg className="w-full h-full" viewBox="0 0 200 200">
//                 <defs>
//                   <filter id="hex-glow-enhanced">
//                     <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
//                     <feMerge>
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>
//                 {Array.from({ length: 30 }).map((_, i) => {
//                   const angle = (i * 12) * (Math.PI / 180);
//                   const radius = 78 + (i % 5) * 5;
//                   const cx = 100 + Math.cos(angle) * radius;
//                   const cy = 100 + Math.sin(angle) * radius;
//                   return (
//                     <motion.g key={`hex-${i}`}>
//                       <motion.polygon
//                         points={`${cx},${cy-5.5} ${cx+4.8},${cy-2.75} ${cx+4.8},${cy+2.75} ${cx},${cy+5.5} ${cx-4.8},${cy+2.75} ${cx-4.8},${cy-2.75}`}
//                         fill="none"
//                         stroke={hoveredLayer === 2 ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.3)"}
//                         strokeWidth="1.2"
//                         filter="url(#hex-glow-enhanced)"
//                         animate={{
//                           opacity: [0.25, 0.75, 0.25],
//                           scale: [0.92, 1.08, 0.92],
//                         }}
//                         transition={{
//                           duration: 3.5 + (i % 4) * 0.5,
//                           repeat: Infinity,
//                           delay: i * 0.06,
//                         }}
//                       />
//                     </motion.g>
//                   );
//                 })}
//               </svg>
//             </div>
//           </motion.div>

//           {/* Layer 3: Outer Defense - Slowest (Kept) */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '148%',
//               height: '148%',
//               top: '-24%',
//               left: '-24%',
//               transformStyle: 'preserve-3d',
//             }}
//             animate={{
//               rotateZ: [0, -360],
//             }}
//             transition={{
//               duration: 50,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             onMouseEnter={() => setHoveredLayer(3)}
//             onMouseLeave={() => setHoveredLayer(null)}
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               style={{
//                 border: `1px solid ${hoveredLayer === 3 ? 'rgba(99, 102, 241, 0.5)' : 'rgba(99, 102, 241, 0.22)'}`,
//                 boxShadow: hoveredLayer === 3 
//                   ? '0 0 55px rgba(99, 102, 241, 0.45)' 
//                   : '0 0 28px rgba(99, 102, 241, 0.2)',
//               }}
//             >
//               {/* Orbital Satellites */}
//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <motion.div
//                   key={`satellite-${angle}`}
//                   className="absolute w-3.5 h-3.5 rounded-sm"
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                     transformOrigin: '0 0',
//                     backgroundColor: 'rgba(99, 102, 241, 0.9)',
//                     boxShadow: '0 0 15px rgba(99, 102, 241, 0.9), 0 0 8px rgba(139, 92, 246, 0.7)',
//                   }}
//                   animate={{
//                     rotate: [angle, angle + 360],
//                     scale: [1, 1.35, 1],
//                   }}
//                   transition={{
//                     rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
//                     scale: { duration: 2.5, repeat: Infinity, delay: i * 0.5 },
//                   }}
//                 >
//                   {/* Satellite antenna */}
//                   <div 
//                     className="absolute w-10 h-px left-0 top-1/2 -translate-y-1/2"
//                     style={{
//                       background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.8), transparent)',
//                     }}
//                   />
//                 </motion.div>
//               ))}

//               {/* Connection nodes */}
//               {Array.from({ length: 20 }).map((_, i) => {
//                 const angle = (i * 18) * (Math.PI / 180);
//                 return (
//                   <motion.div
//                     key={`node-${i}`}
//                     className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(90px)`,
//                       boxShadow: '0 0 6px rgba(99, 102, 241, 0.8)',
//                     }}
//                     animate={{
//                       opacity: [0.4, 0.9, 0.4],
//                       scale: [0.8, 1.3, 0.8],
//                     }}
//                     transition={{
//                       duration: 2.8,
//                       repeat: Infinity,
//                       delay: i * 0.14,
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Interactive Data Points (Kept) */}
//           {Array.from({ length: 16 }).map((_, i) => {
//             const angle = (i * 22.5) * (Math.PI / 180);
//             const radius = 50;
//             return (
//               <motion.div
//                 key={`datapoint-${i}`}
//                 className="absolute w-3 h-3 bg-cyan-400 rounded-full cursor-pointer"
//                 style={{
//                   top: '50%',
//                   left: '50%',
//                   transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`,
//                   boxShadow: '0 0 12px rgba(0, 255, 255, 0.9)',
//                 }}
//                 animate={{
//                   scale: [1, 1.6, 1],
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 2.8,
//                   repeat: Infinity,
//                   delay: i * 0.175,
//                 }}
//                 whileHover={{ 
//                   scale: 2.2, 
//                   boxShadow: '0 0 25px rgba(0, 255, 255, 1)',
//                   transition: { duration: 0.2 }
//                 }}
//               >
//                 {/* Data connection lines */}
//                 <motion.div
//                   className="absolute w-20 h-px bg-cyan-400/50 origin-left"
//                   style={{
//                     left: '50%',
//                     top: '50%',
//                     transform: `rotate(${-angle * (180 / Math.PI)}deg)`,
//                   }}
//                   animate={{
//                     scaleX: [0, 1, 0],
//                     opacity: [0, 0.7, 0],
//                   }}
//                   transition={{
//                     duration: 3.5,
//                     repeat: Infinity,
//                     delay: i * 0.175,
//                   }}
//                 />
//               </motion.div>
//             );
//           })}

//           {/* Enhanced Pulse Rings (Kept) */}
//           {[0, 1, 2, 3].map((i) => (
//             <motion.div
//               key={`pulse-${i}`}
//               className="absolute inset-0 rounded-full"
//               style={{
//                 border: '2px solid rgba(0, 220, 255, 0.4)',
//               }}
//               animate={{
//                 scale: [1, 1.7],
//                 opacity: [0.7, 0],
//               }}
//               transition={{
//                 duration: 4.5,
//                 repeat: Infinity,
//                 delay: i * 1.125,
//                 ease: 'easeOut',
//               }}
//             />
//           ))}

//           {/* Threat Detection Markers (Kept) */}
//           {[30, 110, 190, 270, 340].map((angle, i) => (
//             <motion.div
//               key={`threat-${angle}`}
//               className="absolute"
//               style={{
//                 top: '50%',
//                 left: '50%',
//                 transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-72%)`,
//               }}
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: [0, 1, 1, 0],
//                 scale: [0.6, 1.2, 1.2, 0.6],
//               }}
//               transition={{
//                 duration: 3.5,
//                 repeat: Infinity,
//                 delay: i * 0.7,
//               }}
//             >
//               <div className="relative w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
//                 <div className="w-2 h-2 bg-red-500 rounded-full" />
//                 <motion.div 
//                   className="absolute inset-0 bg-red-500/40 rounded-full"
//                   animate={{
//                     scale: [1, 1.8, 1.8],
//                     opacity: [0.6, 0, 0],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                   }}
//                 />
//               </div>
//             </motion.div>
//           ))}

//           {/* Info Labels (appear on hover) (Kept) */}
//           <AnimatePresence>
//             {hoveredLayer !== null && (
//               <motion.div
//                 className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-400/50"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <p className="text-cyan-300 text-sm font-semibold whitespace-nowrap">
//                   {hoveredLayer === 1 && 'Detection Layer - Active Scanning'}
//                   {hoveredLayer === 2 && 'Shield Layer - Energy Barrier'}
//                   {hoveredLayer === 3 && 'Defense Perimeter - Satellite Network'}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   // --- CHANGED --- Improved scroll lock logic
//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       // Restore scrolling
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       // Prevent scrolling
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     // Cleanup function to ensure scrolling is restored if component unmounts
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;

// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   memo,
// } from 'react';
// import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import EarthCanvas from './earthCanvas'; // Make sure this path is correct

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// // --- Particle Type ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function ---
// const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: 'easeOut',
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- 1. HeroSection Component ---
// // (This section is 100% identical to your original, no changes)
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       {/* Background Particles */}
//       <MemoizedParticles isInView={isInView} />

//       {/* Foreground Content */}
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20 mb-8"
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: 'easeOut' },
//                 y: { duration: 3.5, ease: 'easeOut' },
//                 opacity: { duration: 1, ease: 'easeIn' },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: 'mirror',
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.button
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                 onClick={() => router.push('/')}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.span
//                   className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                   initial={{ x: '-150%' }}
//                   animate={{ x: '250%' }}
//                   transition={{
//                     duration: 1.5,
//                     delay: 5.0,
//                     repeat: Infinity,
//                     repeatDelay: 5,
//                     ease: 'linear',
//                   }}
//                 />
//                 <span className="relative z-10">Explore</span>
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };
// HeroSection.displayName = "HeroSection";


// // --- MemoizedParticles Component ---
// // (This section is 100% identical to your original, no changes)
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: 'preserve-3d',
//             transform: 'translateY(50%) rotateX(75deg)',
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: 'easeInOut' }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ['translateY(0px)', 'translateY(300px)'],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: 'linear',
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '40px 40px',
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = 'MemoizedParticles';

// // --- 2. GridSection Component with Rotating Globe ---
// // (This section contains all the fixes)
// const GridSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
  
//   // MODIFICATION: Removed hoveredLayer state, as it's no longer needed
//   // const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center sm:items-end sm:justify-end"
//       style={{ perspective: '2000px' }}
//     >
//       <motion.div
//         className="relative mb-12 sm:mb-16 sm:mr-16 lg:mb-20 lg:mr-24"
//         initial={{ opacity: 0, scale: 0.7, y: 80 }}
//         animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
//         transition={{ duration: 1.4, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
//         style={{ 
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         <div 
//           className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]"
//           style={{ transformStyle: 'preserve-3d' }}
//         >
//           {/* This is your 3D EarthCanvas. It correctly sits here. */}
//           <div className="absolute inset-0 w-full h-full">
//             <EarthCanvas />
//           </div>

//           {/* MODIFICATION: Added `pointerEvents: 'none'` to make this layer "click-through" */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '112%',
//               height: '112%',
//               top: '-6%',
//               left: '-6%',
//               transformStyle: 'preserve-3d',
//               pointerEvents: 'none', // <-- THE FIX
//             }}
//             animate={{
//               rotateZ: [0, 360],
//             }}
//             transition={{
//               duration: 18,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             // MODIFICATION: Removed onMouseEnter/onMouseLeave
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               // MODIFICATION: Set to non-hovered style directly
//               style={{
//                 border: `2px solid rgba(0, 220, 255, 0.35)`,
//                 boxShadow: '0 0 25px rgba(0, 220, 255, 0.25), inset 0 0 15px rgba(0, 220, 255, 0.15)',
//               }}
//             >
//               {/* Radar Sweep */}
//               <motion.div
//                 className="absolute inset-0 rounded-full overflow-hidden"
//                 style={{
//                   background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 220, 255, 0.5) 25deg, rgba(0, 255, 255, 0.3) 45deg, transparent 70deg)',
//                 }}
//                 animate={{
//                   rotate: [0, 360],
//                 }}
//                 transition={{
//                   duration: 3.5,
//                   repeat: Infinity,
//                   ease: 'linear',
//                 }}
//               />
//               {/* Grid lines on ring */}
//               {Array.from({ length: 16 }).map((_, i) => (
//                 <div
//                   key={`ring1-line-${i}`}
//                   className="absolute top-1/2 left-1/2 w-full h-px origin-left"
//                   style={{
//                     background: 'linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.25), transparent)',
//                     transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
//                   }}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* MODIFICATION: Added `pointerEvents: 'none'` */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '128%',
//               height: '128%',
//               top: '-14%',
//               left: '-14%',
//               transformStyle: 'preserve-3d',
//               pointerEvents: 'none', // <-- THE FIX
//             }}
//             animate={{
//               rotateZ: [360, 0],
//             }}
//             transition={{
//               duration: 32,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             // MODIFICATION: Removed onMouseEnter/onMouseLeave
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               // MODIFICATION: Set to non-hovered style directly
//               style={{
//                 border: `1.5px solid rgba(59, 130, 246, 0.28)`,
//                 boxShadow: '0 0 22px rgba(59, 130, 246, 0.22)',
//               }}
//             >
//               {/* Hexagonal Pattern */}
//               <svg className="w-full h-full" viewBox="0 0 200 200">
//                 <defs>
//                   <filter id="hex-glow-enhanced">
//                     <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
//                     <feMerge>
//                       <feMergeNode in="coloredBlur"/>
//                       <feMergeNode in="SourceGraphic"/>
//                     </feMerge>
//                   </filter>
//                 </defs>
//                 {Array.from({ length: 30 }).map((_, i) => {
//                   const angle = (i * 12) * (Math.PI / 180);
//                   const radius = 78 + (i % 5) * 5;
//                   const cx = 100 + Math.cos(angle) * radius;
//                   const cy = 100 + Math.sin(angle) * radius;
//                   return (
//                     <motion.g key={`hex-${i}`}>
//                       <motion.polygon
//                         points={`${cx},${cy-5.5} ${cx+4.8},${cy-2.75} ${cx+4.8},${cy+2.75} ${cx},${cy+5.5} ${cx-4.8},${cy+2.75} ${cx-4.8},${cy-2.75}`}
//                         fill="none"
//                         // MODIFICATION: Set to non-hovered style directly
//                         stroke={"rgba(59, 130, 246, 0.3)"}
//                         strokeWidth="1.2"
//                         filter="url(#hex-glow-enhanced)"
//                         animate={{
//                           opacity: [0.25, 0.75, 0.25],
//                           scale: [0.92, 1.08, 0.92],
//                         }}
//                         transition={{
//                           duration: 3.5 + (i % 4) * 0.5,
//                           repeat: Infinity,
//                           delay: i * 0.06,
//                         }}
//                       />
//                     </motion.g>
//                   );
//                 })}
//               </svg>
//             </div>
//           </motion.div>

//           {/* MODIFICATION: Added `pointerEvents: 'none'` */}
//           <motion.div
//             className="absolute inset-0"
//             style={{
//               width: '148%',
//               height: '148%',
//               top: '-24%',
//               left: '-24%',
//               transformStyle: 'preserve-3d',
//               pointerEvents: 'none', // <-- THE FIX
//             }}
//             animate={{
//               rotateZ: [0, -360],
//             }}
//             transition={{
//               duration: 50,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             // MODIFICATION: Removed onMouseEnter/onMouseLeave
//           >
//             <div 
//               className="w-full h-full rounded-full transition-all duration-500"
//               // MODIFICATION: Set to non-hovered style directly
//               style={{
//                 border: `1px solid rgba(99, 102, 241, 0.22)`,
//                 boxShadow: '0 0 28px rgba(99, 102, 241, 0.2)',
//               }}
//             >
//               {/* Orbital Satellites */}
//               {[0, 72, 144, 216, 288].map((angle, i) => (
//                 <motion.div
//                   key={`satellite-${angle}`}
//                   className="absolute w-3.5 h-3.5 rounded-sm"
//                   style={{
//                     top: '50%',
//                     left: '50%',
//                     transformOrigin: '0 0',
//                     backgroundColor: 'rgba(99, 102, 241, 0.9)',
//                     boxShadow: '0 0 15px rgba(99, 102, 241, 0.9), 0 0 8px rgba(139, 92, 246, 0.7)',
//                   }}
//                   animate={{
//                     rotate: [angle, angle + 360],
//                     scale: [1, 1.35, 1],
//                   }}
//                   transition={{
//                     rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
//                     scale: { duration: 2.5, repeat: Infinity, delay: i * 0.5 },
//                   }}
//                 >
//                   <div 
//                     className="absolute w-10 h-px left-0 top-1/2 -translate-y-1/2"
//                     style={{
//                       background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.8), transparent)',
//                     }}
//                   />
//                 </motion.div>
//               ))}
//               {/* Connection nodes */}
//               {Array.from({ length: 20 }).map((_, i) => {
//                 const angle = (i * 18) * (Math.PI / 180);
//                 return (
//                   <motion.div
//                     key={`node-${i}`}
//                     className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full"
//                     style={{
//                       top: '50%',
//                       left: '50%',
//                       transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(90px)`,
//                       boxShadow: '0 0 6px rgba(99, 102, 241, 0.8)',
//                     }}
//                     animate={{
//                       opacity: [0.4, 0.9, 0.4],
//                       scale: [0.8, 1.3, 0.8],
//                     }}
//                     transition={{
//                       duration: 2.8,
//                       repeat: Infinity,
//                       delay: i * 0.14,
//                     }}
//                   />
//                 );
//               })}
//             </div>
//           </motion.div>

//           {/* Interactive Data Points */}
//           {Array.from({ length: 16 }).map((_, i) => {
//             const angle = (i * 22.5) * (Math.PI / 180);
//             const radius = 50;
//             return (
//               <motion.div
//                 key={`datapoint-${i}`}
//                 className="absolute w-3 h-3 bg-cyan-400 rounded-full cursor-pointer"
//                 // MODIFICATION: Added `pointerEvents: 'none'`
//                 style={{
//                   top: '50%',
//                   left: '50%',
//                   transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`,
//                   boxShadow: '0 0 12px rgba(0, 255, 255, 0.9)',
//                   pointerEvents: 'none', // <-- THE FIX
//                 }}
//                 animate={{
//                   scale: [1, 1.6, 1],
//                   opacity: [0.5, 1, 0.5],
//                 }}
//                 transition={{
//                   duration: 2.8,
//                   repeat: Infinity,
//                   delay: i * 0.175,
//                 }}
//                 // MODIFICATION: Removed whileHover
//               >
//                 {/* Data connection lines */}
//                 <motion.div
//                   className="absolute w-20 h-px bg-cyan-400/50 origin-left"
//                   style={{
//                     left: '50%',
//                     top: '50%',
//                     transform: `rotate(${-angle * (180 / Math.PI)}deg)`,
//                   }}
//                   animate={{
//                     scaleX: [0, 1, 0],
//                     opacity: [0, 0.7, 0],
//                   }}
//                   transition={{
//                     duration: 3.5,
//                     repeat: Infinity,
//                     delay: i * 0.175,
//                   }}
//                 />
//               </motion.div>
//             );
//           })}

//           {/* Enhanced Pulse Rings */}
//           {[0, 1, 2, 3].map((i) => (
//             <motion.div
//               key={`pulse-${i}`}
//               className="absolute inset-0 rounded-full"
//               // MODIFICATION: Added `pointerEvents: 'none'`
//               style={{
//                 border: '2px solid rgba(0, 220, 255, 0.4)',
//                 pointerEvents: 'none', // <-- THE FIX
//               }}
//               animate={{
//                 scale: [1, 1.7],
//                 opacity: [0.7, 0],
//               }}
//               transition={{
//                 duration: 4.5,
//                 repeat: Infinity,
//                 delay: i * 1.125,
//                 ease: 'easeOut',
//               }}
//             />
//           ))}

//           {/* Threat Detection Markers */}
//           {[30, 110, 190, 270, 340].map((angle, i) => (
//             <motion.div
//               key={`threat-${angle}`}
//               className="absolute"
//               // MODIFICATION: Added `pointerEvents: 'none'`
//               style={{
//                 top: '50%',
//                 left: '50%',
//                 transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-72%)`,
//                 pointerEvents: 'none', // <-- THE FIX
//               }}
//               initial={{ opacity: 0 }}
//               animate={{
//                 opacity: [0, 1, 1, 0],
//                 scale: [0.6, 1.2, 1.2, 0.6],
//               }}
//               transition={{
//                 duration: 3.5,
//                 repeat: Infinity,
//                 delay: i * 0.7,
//               }}
//             >
//               <div className="relative w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
//                 <div className="w-2 h-2 bg-red-500 rounded-full" />
//                 <motion.div 
//                   className="absolute inset-0 bg-red-500/40 rounded-full"
//                   animate={{
//                     scale: [1, 1.8, 1.8],
//                     opacity: [0.6, 0, 0],
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     repeat: Infinity,
//                   }}
//                 />
//               </div>
//             </motion.div>
//           ))}

//           {/* MODIFICATION: Removed the Info Labels block entirely */}
//           {/* <AnimatePresence> ... </AnimatePresence> */}
//         </div>
//       </motion.div>
//     </section>
//   );
// });
// GridSection.displayName = 'GridSection';

// // --- 3. Main Page Component (Parent) ---
// // (This section is 100% identical to your original, no changes)
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   // --- CHANGED --- Improved scroll lock logic
//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       // Restore scrolling
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       // Prevent scrolling
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     // Cleanup function to ensure scrolling is restored if component unmounts
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main>
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {isHeroComplete && <GridSection />}
//     </main>
//   );
// };

// export default VarahaPage;

"use client";

import React, {
  useRef,
  useState,
  useEffect,
  memo,
} from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EarthCanvas from './earthCanvas'; // Make sure this path is correct

// --- Text Content ---
const title = "VARAHA";
const description =
  "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

// --- Particle Type ---
interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

// --- Random Value Function ---
const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// --- Glitch Variant for VARAHA Title ---
const glitchTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],
    x: [0, -2, 2, -4, 4, 0],
    skewX: [0, 3, -2, 5, -3, 0],
    transition: {
      delay: 3.5,
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// --- Variants for Description and Button ---
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 3.8,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],
    x: [0, -2, 2, -4, 4, 0],
    skewX: [0, 3, -2, 5, -3, 0],
    transition: {
      delay: 4.0,
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// --- 1. HeroSection Component ---
// (No changes here)
const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
  onAnimationComplete,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const router = useRouter();

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
    >
      <MemoizedParticles isInView={isInView} />
      <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
        {/* ... All HeroSection animations are unchanged ... */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-title"
              className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
              variants={glitchTextVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
                {title}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-image"
              className="relative z-20 mb-8"
              initial={{ scale: 0.3, y: 200, opacity: 0 }}
              animate={{
                scale: 1,
                y: [20, 20, 0],
                opacity: 1,
                x: [0, -2, 2, -1, 1, 0],
              }}
              transition={{
                scale: { duration: 1.5, ease: 'easeOut' },
                y: { duration: 3.5, ease: 'easeOut' },
                opacity: { duration: 1, ease: 'easeIn' },
                x: {
                  duration: 4,
                  delay: 3.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                },
              }}
            >
              <Image
                src="/drone_varaha.png"
                alt="Varaha Drone"
                width={800}
                height={600}
                sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
                className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-info"
              className="relative z-20 flex flex-col items-center w-full px-4"
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={descriptionVariants}
                className="max-w-xl text-center text-sm text-gray-300 md:text-base"
              >
                {description}
              </motion.p>
              <motion.button
                variants={buttonVariants}
                onAnimationComplete={onAnimationComplete}
                className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
                  initial={{ x: '-150%' }}
                  animate={{ x: '250%' }}
                  transition={{
                    duration: 1.5,
                    delay: 5.0,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10">Explore</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
HeroSection.displayName = "HeroSection";


// --- MemoizedParticles Component ---
// (No changes here)
const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
  ({ isInView }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
      const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: randomValue(0, 100),
        y: randomValue(0, 100),
        duration: randomValue(8, 16),
        delay: randomValue(0, 10),
      }));
      setParticles(generatedParticles);
    }, []);

    return (
      <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateY(50%) rotateX(75deg)',
          }}
          animate={isInView ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow:
                  '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
              }}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      transform: ['translateY(0px)', 'translateY(300px)'],
                      opacity: [0, 0.6, 0.6, 0],
                    }
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </motion.div>
      </div>
    );
  }
);
MemoizedParticles.displayName = 'MemoizedParticles';

// --- 2. GridSection Component with Rotating Globe ---
const GridSection: React.FC = memo(() => {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, amount: 0.2 }); // No longer needed for the container
  
  return (
    <section
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center sm:items-end sm:justify-end"
      style={{ perspective: '2000px' }}
    >
      {/* --- MODIFICATION ---
        Changed this from `motion.div` to `div` and removed all animation props
        (initial, animate, transition).
        This makes it load instantly in its final position.
      */}
      <div
        className="relative mb-12 sm:mb-16 sm:mr-16 lg:mb-20 lg:mr-24"
        style={{ 
          transformStyle: 'preserve-3d',
        }}
      >
        <div 
          className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Your EarthCanvas now loads inside a container that is already in position */}
          <div className="absolute inset-0 w-full h-full">
            <EarthCanvas />
          </div>

          {/* All the "tech" layers below are unchanged and will animate as before */}
          <motion.div
            className="absolute inset-0"
            style={{
              width: '112%',
              height: '112%',
              top: '-6%',
              left: '-6%',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
            }}
            animate={{
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="w-full h-full rounded-full transition-all duration-500"
              style={{
                border: `2px solid rgba(0, 220, 255, 0.35)`,
                boxShadow: '0 0 25px rgba(0, 220, 255, 0.25), inset 0 0 15px rgba(0, 220, 255, 0.15)',
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 220, 255, 0.5) 25deg, rgba(0, 255, 255, 0.3) 45deg, transparent 70deg)',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={`ring1-line-${i}`}
                  className="absolute top-1/2 left-1/2 w-full h-px origin-left"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0, 220, 255, 0.25), transparent)',
                    transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* ... All other tech layers ... */}
          <motion.div
            className="absolute inset-0"
            style={{
              width: '128%',
              height: '128%',
              top: '-14%',
              left: '-14%',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
            }}
            animate={{
              rotateZ: [360, 0],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="w-full h-full rounded-full transition-all duration-500"
              style={{
                border: `1.5px solid rgba(59, 130, 246, 0.28)`,
                boxShadow: '0 0 22px rgba(59, 130, 246, 0.22)',
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <filter id="hex-glow-enhanced">
                    <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {Array.from({ length: 30 }).map((_, i) => {
                  const angle = (i * 12) * (Math.PI / 180);
                  const radius = 78 + (i % 5) * 5;
                  const cx = 100 + Math.cos(angle) * radius;
                  const cy = 100 + Math.sin(angle) * radius;
                  return (
                    <motion.g key={`hex-${i}`}>
                      <motion.polygon
                        points={`${cx},${cy-5.5} ${cx+4.8},${cy-2.75} ${cx+4.8},${cy+2.75} ${cx},${cy+5.5} ${cx-4.8},${cy+2.75} ${cx-4.8},${cy-2.75}`}
                        fill="none"
                        stroke={"rgba(59, 130, 246, 0.3)"}
                        strokeWidth="1.2"
                        filter="url(#hex-glow-enhanced)"
                        animate={{
                          opacity: [0.25, 0.75, 0.25],
                          scale: [0.92, 1.08, 0.92],
                        }}
                        transition={{
                          duration: 3.5 + (i % 4) * 0.5,
                          repeat: Infinity,
                          delay: i * 0.06,
                        }}
                      />
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            style={{
              width: '148%',
              height: '148%',
              top: '-24%',
              left: '-24%',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
            }}
            animate={{
              rotateZ: [0, -360],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div 
              className="w-full h-full rounded-full transition-all duration-500"
              style={{
                border: `1px solid rgba(99, 102, 241, 0.22)`,
                boxShadow: '0 0 28px rgba(99, 102, 241, 0.2)',
              }}
            >
              {[0, 72, 144, 216, 288].map((angle, i) => (
                <motion.div
                  key={`satellite-${angle}`}
                  className="absolute w-3.5 h-3.5 rounded-sm"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    backgroundColor: 'rgba(99, 102, 241, 0.9)',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.9), 0 0 8px rgba(139, 92, 246, 0.7)',
                  }}
                  animate={{
                    rotate: [angle, angle + 360],
                    scale: [1, 1.35, 1],
                  }}
                  transition={{
                    rotate: { duration: 28, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 2.5, repeat: Infinity, delay: i * 0.5 },
                  }}
                >
                  <div 
                    className="absolute w-10 h-px left-0 top-1/2 -translate-y-1/2"
                    style={{
                      background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.8), transparent)',
                    }}
                  />
                </motion.div>
              ))}
              {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i * 18) * (Math.PI / 180);
                return (
                  <motion.div
                    key={`node-${i}`}
                    className="absolute w-1.5 h-1.5 bg-indigo-400 rounded-full"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(90px)`,
                      boxShadow: '0 0 6px rgba(99, 102, 241, 0.8)',
                    }}
                    animate={{
                      opacity: [0.4, 0.9, 0.4],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      delay: i * 0.14,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
          
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5) * (Math.PI / 180);
            const radius = 50;
            return (
              <motion.div
                key={`datapoint-${i}`}
                className="absolute w-3 h-3 bg-cyan-400 rounded-full cursor-pointer"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}%, ${Math.sin(angle) * radius}%)`,
                  boxShadow: '0 0 12px rgba(0, 255, 255, 0.9)',
                  pointerEvents: 'none',
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  delay: i * 0.175,
                }}
              >
                <motion.div
                  className="absolute w-20 h-px bg-cyan-400/50 origin-left"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${-angle * (180 / Math.PI)}deg)`,
                  }}
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.175,
                  }}
                />
              </motion.div>
            );
          })}
          
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid rgba(0, 220, 255, 0.4)',
                pointerEvents: 'none',
              }}
              animate={{
                scale: [1, 1.7],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                delay: i * 1.125,
                ease: 'easeOut',
              }}
            />
          ))}
          
          {[30, 110, 190, 270, 340].map((angle, i) => (
            <motion.div
              key={`threat-${angle}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-72%)`,
                pointerEvents: 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.2, 1.2, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            >
              <div className="relative w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <motion.div 
                  className="absolute inset-0 bg-red-500/40 rounded-full"
                  animate={{
                    scale: [1, 1.8, 1.8],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
});
GridSection.displayName = 'GridSection';

// --- 3. Main Page Component (Parent) ---
// (No changes here)
const VarahaPage: React.FC = () => {
  const [isHeroComplete, setIsHeroComplete] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isHeroComplete) {
      htmlElement.style.overflow = '';
      bodyElement.style.overflow = '';
    } else {
      htmlElement.style.overflow = 'hidden';
      bodyElement.style.overflow = 'hidden';
    }
    
    return () => {
      htmlElement.style.overflow = '';
      bodyElement.style.overflow = '';
    };
  }, [isHeroComplete]);

  return (
    <main>
      <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
      {isHeroComplete && <GridSection />}
    </main>
  );
};

export default VarahaPage;