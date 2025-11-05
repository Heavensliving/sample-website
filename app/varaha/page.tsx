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
// import DomeCanvas from './domeCanvas';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

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

// // --- HeroSection Component ---
// // (This section is unchanged)
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
//       <MemoizedParticles isInView={isInView} />
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         {/* ... All HeroSection animations are unchanged ... */}
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
// // (This section is unchanged)
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

// // --- NEW SignalBeam Component ---
// const SignalBeam: React.FC = memo(() => {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ overflow: 'visible' }}
//     >
//       <defs>
//         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
//           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
//         </linearGradient>
//       </defs>
      
//       {/* This is the main beam */}
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="url(#beam-gradient)"
//         strokeWidth="2"
//       />
      
//       {/* This is the animated dash */}
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="#fff"
//         strokeWidth="2"
//         strokeDasharray="10 15" // 10px dash, 15px gap
//         initial={{ strokeDashoffset: 0 }}
//         animate={{ strokeDashoffset: -25 }} // Animate by the total length (10+15)
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: 'linear',
//         }}
//       />
//     </svg>
//   );
// });
// SignalBeam.displayName = 'SignalBeam';


// // --- NEW SceneWithSensors Component ---
// const SceneWithSensors: React.FC = memo(() => {
//   const ref = useRef(null);
  
//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//       style={{ perspective: '1000px' }} // Use a gentler perspective
//     >
//       {/* 1. The Earth on the right */}
//       <div 
//         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
//       >
//         <EarthCanvas />
//       </div>

//       {/* 2. The Sensors on the bottom-left */}
//       <div className="absolute bottom-4 left-4 flex items-end">
//         {/* The "longer one" (small size, further back) */}
//         <div className="w-32 h-32 lg:w-40 lg:h-40">
//           <DomeCanvas />
//         </div>
        
//         {/* The "closer one" (large size, in front) */}
//         {/* Using z-10 to ensure it overlaps */}
//         <div className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10">
//           <DomeCanvas />
//         </div>
//       </div>

//       {/* 3. The Signal Beam */}
//       <SignalBeam />

//     </section>
//   );
// });
// SceneWithSensors.displayName = 'SceneWithSensors';


// // --- Main Page Component ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main className="bg-black">
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {/* --- MODIFICATION ---
//         Replaced the old sections with your new SceneWithSensors
//       */}
//       {isHeroComplete && <SceneWithSensors />}
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
// import DomeCanvas from './domeCanvas';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

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

// // --- HeroSection Component ---
// // (This section IS UPDATED)
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
//       <MemoizedParticles isInView={isInView} />
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         {/* ... All HeroSection animations are unchanged ... */}
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
              
//               {/* --- MODIFIED START --- */}
//               {/* Wrapper for the two buttons */}
//               <motion.div
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10" // Use flex-row on sm screens, add gap
//               >
//                 {/* Button 1: Explore Capabilities */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                   onClick={() => router.push('/')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.span
//                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                     initial={{ x: '-150%' }}
//                     animate={{ x: '250%' }}
//                     transition={{
//                       duration: 1.5,
//                       delay: 5.0,
//                       repeat: Infinity,
//                       repeatDelay: 5,
//                       ease: 'linear',
//                     }}
//                   />
//                   {/* Text Updated */}
//                   <span className="relative z-10">Explore Capabilities</span>
//                 </motion.button>
                
//                 {/* Button 2: Request Demo */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
//                   onClick={() => router.push('/request-demo')} // You can change this link
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span className="relative z-10">Request Demo</span>
//                 </motion.button>
//               </motion.div>
//               {/* --- MODIFIED END --- */}

//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };
// HeroSection.displayName = "HeroSection";

// // --- MemoizedParticles Component ---
// // (This section is unchanged)
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

// // --- NEW SignalBeam Component ---
// const SignalBeam: React.FC = memo(() => {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ overflow: 'visible' }}
//     >
//       <defs>
//         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
//           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
//         </linearGradient>
//       </defs>
      
//       {/* This is the main beam */}
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="url(#beam-gradient)"
//         strokeWidth="2"
//       />
      
//       {/* This is the animated dash */}
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="#fff"
//         strokeWidth="2"
//         strokeDasharray="10 15" // 10px dash, 15px gap
//         initial={{ strokeDashoffset: 0 }}
//         animate={{ strokeDashoffset: -25 }} // Animate by the total length (10+15)
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: 'linear',
//         }}
//       />
//     </svg>
//   );
// });
// SignalBeam.displayName = 'SignalBeam';


// // --- NEW SceneWithSensors Component ---
// const SceneWithSensors: React.FC = memo(() => {
//   const ref = useRef(null);
  
//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//       style={{ perspective: '1000px' }} // Use a gentler perspective
//     >
//       {/* 1. The Earth on the right */}
//       <div 
//         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
//       >
//         <EarthCanvas />
//       </div>

//       {/* 2. The Sensors on the bottom-left */}
//       <div className="absolute bottom-4 left-4 flex items-end">
//         {/* The "longer one" (small size, further back) */}
//         <div className="w-32 h-32 lg:w-40 lg:h-40">
//           <DomeCanvas />
//         </div>
        
//         {/* The "closer one" (large size, in front) */}
//         {/* Using z-10 to ensure it overlaps */}
//         <div className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10">
//           <DomeCanvas />
//         </div>
//       </div>

//       {/* 3. The Signal Beam */}
//       <SignalBeam />

//     </section>
//   );
// });
// SceneWithSensors.displayName = 'SceneWithSensors';


// // --- Main Page Component ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main className="bg-black">
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {/* --- MODIFICATION ---
//         Replaced the old sections with your new SceneWithSensors
//       */}
//       {isHeroComplete && <SceneWithSensors />}
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
// import DomeCanvas from './domeCanvas';

// // --- Text Content ---
// const title = "VARAHA";
// const description =
//   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

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

// // --- HeroSection Component ---
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
//       <MemoizedParticles isInView={isInView} />
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
              
//               <motion.div
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10" 
//               >
//                 {/* Button 1: Explore Capabilities */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                   onClick={() => router.push('/')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.span
//                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                     initial={{ x: '-150%' }}
//                     animate={{ x: '250%' }}
//                     transition={{
//                       duration: 1.5,
//                       delay: 5.0,
//                       repeat: Infinity,
//                       repeatDelay: 5,
//                       ease: 'linear',
//                     }}
//                   />
//                   <span className="relative z-10">Explore Capabilities</span>
//                 </motion.button>
                
//                 {/* Button 2: Request Demo */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
//                   onClick={() => router.push('/request-demo')}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span className="relative z-10">Request Demo</span>
//                 </motion.button>
//               </motion.div>

//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };
// HeroSection.displayName = "HeroSection";

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

// // --- SectionWrapper Component ---
// const SectionWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
//   children, 
//   className = "" 
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   return (
//     <motion.section
//       ref={ref}
//       className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//     >
//       {children}
//     </motion.section>
//   );
// };

// // --- CheckListItem Component ---
// const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <li className="flex items-start gap-3">
//     <svg
//       className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//     <span className="text-gray-300">{children}</span>
//   </li>
// );

// // --- ContentSections Component ---
// const ContentSections: React.FC = memo(() => {
//   return (
//     <div className="py-20 sm:py-32 space-y-20 sm:space-y-32 text-white">
      
//       {/* Section 1: Born in Bharat */}
//       <SectionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         <div className="space-y-6">
//           <h2 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//             Born in Bharat. Built for the Battlefield.
//           </h2>
//           <p className="text-lg text-gray-300 leading-relaxed">
//             The changing face of warfare has turned drones into one of the most pervasive asymmetric threats. Small, low-cost, and often resistant to jamming, these systems challenge traditional radar and RF-based defences.
//           </p>
//           <p className="text-gray-300 leading-relaxed">
//             VARAHA redefines counter-drone strategy through an acoustic-driven detection architecture that listens before others can see. By harnessing directional acoustic arrays, distributed AI compute, and multi-sensor fusion, it provides early-warning, precise localization, and seamless cueing for hard-kill or electronic-warfare countermeasures — all while remaining completely passive and undetectable.
//           </p>
//         </div>
//         <div className="relative w-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center bg-black/30 border-2 border-blue-500/30 rounded-xl p-4">
//           <span className="text-gray-500 font-mono">[Image Placeholder]</span>
//           {/* You can replace the span above with: */}
//           {/* <Image src="/path-to-your-image.jpg" alt="VARAHA Hardware" layout="fill" objectFit="cover" className="rounded-lg" /> */}
//         </div>
//       </SectionWrapper>

//       {/* Section 2: Why Acoustic Detection */}
//       <SectionWrapper className="flex flex-col lg:items-end">
//         <div className="w-full lg:w-3/5 xl:w-1/2 space-y-6">
//           <h2 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//             WHY ACOUSTIC DETECTION MATTERS
//           </h2>
//           <ul className="space-y-4 text-lg">
//             <CheckListItem>
//               <strong>Detects the undetectable</strong> – Operates independently of RF signatures or radar reflections.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>Stealth-first architecture</strong> – Emits no electronic signal; immune to jamming and detection.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>AI-driven accuracy</strong> – Neural-network models identify drone signatures in real time.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>Scalable deployment</strong> – From compact man-portable units to perimeter-wide networks.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>All-weather reliability</strong> – Functions in radar-shadowed, cluttered, or GPS-denied zones.
//             </CheckListItem>
//           </ul>
//         </div>
//       </SectionWrapper>

//       {/* Section 3: Mission Profiles */}
//       <SectionWrapper className="flex flex-col items-center">
//         <h2 className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//           MISSION PROFILES
//         </h2>
//         <div className="w-full overflow-x-auto">
//           <table className="w-full min-w-[700px] border-collapse text-left bg-gray-900/50 border border-blue-500/30">
//             <thead>
//               <tr className="border-b border-blue-500/30">
//                 <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Scenario</th>
//                 <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Capability</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-blue-500/30">
//               <tr>
//                 <td className="p-4 sm:p-5 font-semibold">Base & Airfield Protection</td>
//                 <td className="p-4 sm:p-5 text-gray-300">Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.</td>
//               </tr>
//               <tr>
//                 <td className="p-4 sm:p-5 font-semibold">Special Forces</td>
//                 <td className="p-4 sm:p-5 text-gray-300">Miniaturized variant provides hemispheric passive detection via body-worn UI.</td>
//               </tr>
//               <tr>
//                 <td className="p-4 sm:p-5 font-semibold">Advanced Perimeter Defence</td>
//                 <td className="p-4 sm:p-5 text-gray-300">360° sensor fusion array detects anomalies and cues hard-kill platforms.</td>
//               </tr>
//               <tr>
//                 <td className="p-4 sm:p-5 font-semibold">Naval Operations</td>
//                 <td className="p-4 sm:p-5 text-gray-300">Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.</td>
//               </tr>
//               <tr>
//                 <td className="p-4 sm:p-5 font-semibold">Mobile/Mechanized Units</td>
//                 <td className="p-4 sm:p-5 text-gray-300">Vehicle-mounted variant for on-the-move protection against aerial threats.</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </SectionWrapper>

//       {/* --- MODIFIED START --- */}
//       {/* Section 4: Interface & Control (Left side) */}
//       <SectionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//         {/* Left Side Content */}
//         <div className="space-y-6">
//           <h3 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300">INTERFACE & CONTROL</h3>
//           <ul className="space-y-4 text-lg">
//             <CheckListItem>
//               <strong>Browser Dashboard:</strong> Real-time map, sensor feed, and threat visualization.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>API Integration:</strong> Machine-to-Machine communication for C2 systems.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>Multi-Platform Access:</strong> Optimized for laptops, tablets, and soldier-worn devices.
//             </CheckListItem>
//             <CheckListItem>
//               <strong>Operator Modes:</strong> Manual verification, semi-autonomous cueing, and policy-driven automation.
//             </CheckListItem>
//           </ul>
//         </div>
//         {/* Right Side Image Placeholder */}
//         <div className="relative w-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center bg-black/30 border-2 border-blue-500/30 rounded-xl p-4">
//           <span className="text-gray-500 font-mono">[Image Placeholder 2]</span>
//         </div>
//       </SectionWrapper>

//       {/* Section 5: System Highlights (Right side) */}
//       <SectionWrapper className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//         {/* Left Side Image Placeholder */}
//         <div className="relative w-full min-h-[350px] lg:min-h-[450px] flex items-center justify-center bg-black/30 border-2 border-blue-500/30 rounded-xl p-4">
//            <span className="text-gray-500 font-mono">[Image Placeholder 3]</span>
//         </div>
//         {/* Right Side Content */}
//         <div className="space-y-6">
//           <h3 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300">SYSTEM HIGHLIGHTS</h3>
//           <ul className="space-y-4 text-lg">
//             <CheckListItem>100% Passive Detection System</CheckListItem>
//             <CheckListItem>AI-Enabled Acoustic Intelligence</CheckListItem>
//             <CheckListItem>Radar & EO Cueing Integration</CheckListItem>
//             <CheckListItem>Hard-Kill Ready Architecture</CheckListItem>
//             <CheckListItem>Miniaturized Special-Forces Variant</CheckListItem>
//             <CheckListItem>Naval Adaptability</CheckListItem>
//             <CheckListItem>Scalable Deployment Network</CheckListItem>
//           </ul>
//         </div>
//       </SectionWrapper>
//       {/* --- MODIFIED END --- */}


//       {/* Section 6: Mission Advantage (was Section 5) */}
//       <SectionWrapper className="text-center flex flex-col items-center">
//         <h3 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
//           MISSION ADVANTAGE
//         </h3>
//         <p className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed">
//           When milliseconds define survival, VARAHA ensures the operator hears first — and acts faster.
//         </p>
//       </SectionWrapper>

//     </div>
//   );
// });
// ContentSections.displayName = 'ContentSections';


// // --- SignalBeam Component ---
// const SignalBeam: React.FC = memo(() => {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ overflow: 'visible' }}
//     >
//       <defs>
//         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
//           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
//         </linearGradient>
//       </defs>
      
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="url(#beam-gradient)"
//         strokeWidth="2"
//       />
      
//       <motion.line
//         x1="calc(10% + 5rem)" // Start from the large sensor (approx)
//         y1="calc(100% - 7rem)" // Start from the large sensor (approx)
//         x2="calc(100% - 10rem)" // End at the Earth (approx)
//         y2="50%" // End at the Earth (approx)
//         stroke="#fff"
//         strokeWidth="2"
//         strokeDasharray="10 15" // 10px dash, 15px gap
//         initial={{ strokeDashoffset: 0 }}
//         animate={{ strokeDashoffset: -25 }} // Animate by the total length (10+15)
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: 'linear',
//         }}
//       />
//     </svg>
//   );
// });
// SignalBeam.displayName = 'SignalBeam';


// // --- SceneWithSensors Component ---
// const SceneWithSensors: React.FC = memo(() => {
//   const ref = useRef(null);
  
//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//       style={{ perspective: '1000px' }} // Use a gentler perspective
//     >
//       {/* 1. The Earth on the right */}
//       <div 
//         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
//       >
//         <EarthCanvas />
//       </div>

//       {/* 2. The Sensors on the bottom-left */}
//       <div className="absolute bottom-4 left-4 flex items-end">
//         {/* The "longer one" (small size, further back) */}
//         <div className="w-32 h-32 lg:w-40 lg:h-40">
//           <DomeCanvas />
//         </div>
        
//         {/* The "closer one" (large size, in front) */}
//         <div className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10">
//           <DomeCanvas />
//         </div>
//       </div>

//       {/* 3. The Signal Beam */}
//       <SignalBeam />

//     </section>
//   );
// });
// SceneWithSensors.displayName = 'SceneWithSensors';


// // --- Main Page Component ---
// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);

//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     } else {
//       htmlElement.style.overflow = 'hidden';
//       bodyElement.style.overflow = 'hidden';
//     }
    
//     return () => {
//       htmlElement.style.overflow = '';
//       bodyElement.style.overflow = '';
//     };
//   }, [isHeroComplete]);

//   return (
//     <main className="bg-black">
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
//       {/* --- MODIFIED --- */}
//       {/* Added the new ContentSections component here */}
//       {isHeroComplete && <ContentSections />}
      
//       {/* The SceneWithSensors component now comes after the new content */}
//       {isHeroComplete && <SceneWithSensors />}
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
  useLayoutEffect,
} from 'react';
import { 
  motion, 
  useInView, 
  Variants, 
  AnimatePresence, 
  useScroll, 
  useTransform,
  MotionValue
} from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EarthCanvas from './earthCanvas';
import DomeCanvas from './domeCanvas';

// --- Text Content ---
const title = "VARAHA";
const description =
  "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

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

// --- HeroSection Component ---
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
              
              <motion.div
                variants={buttonVariants}
                onAnimationComplete={onAnimationComplete}
                className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10" 
              >
                {/* Button 1: Explore Capabilities */}
                <motion.button
                  className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
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
                  <span className="relative z-10">Explore Capabilities</span>
                </motion.button>
                
                {/* Button 2: Request Demo */}
                <motion.button
                  className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
                  onClick={() => router.push('/request-demo')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Request Demo</span>
                </motion.button>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
HeroSection.displayName = "HeroSection";

// --- MemoizedParticles Component ---
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

// --- Animated Drone Icon Component ---
const DroneIcon: React.FC = () => (
  <motion.svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#00BFFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      filter: 'drop-shadow(0 0 8px #00BFFF)',
    }}
    initial={{ scale: 0.8, opacity: 0.8 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'mirror',
    }}
  >
    <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M12 12L6 6" />
    <path d="M12 12l6 6" />
    <path d="M12 12L6 18" />
    <path d="M12 12l6-6" />
    <path d="M6 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M18 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M6 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M18 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
  </motion.svg>
);

// --- Animated SVG Path Component ---
const AnimatedPathComponent: React.FC<{ 
  containerRef: React.RefObject<HTMLDivElement | null> 
}> = ({ containerRef }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const pathProgress = useTransform(
    scrollYProgress, 
    [0.1, 0.9],
    [0, 1]
  );

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const offsetDistance = useTransform(pathProgress, val => `${val * pathLength}px`);

  return (
    <div className="absolute inset-0 z-10 overflow-visible">
      <svg width="100%" height="100%" viewBox="0 0 1000 3000" preserveAspectRatio="none" className="overflow-visible">
        <motion.path
          ref={pathRef}
          d="M 950 150 
             C 700 250, 200 350, 200 600
             L 200 900
             C 200 1150, 800 1250, 800 1500 
             L 800 1700
             C 800 1950, 200 2050, 200 2300
             L 200 2800"
          fill="none"
          stroke="#00BFFF"
          strokeWidth="2"
          strokeDasharray="4 12"
          opacity={0.5}
        />
      </svg>
    </div>
  );
};

// --- CheckListItem Component ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <svg
      className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="text-gray-300">{children}</span>
  </li>
);

// --- ContentSections Component ---
const ContentSections: React.FC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  const AnimatedSection: React.FC<{ 
    children: React.ReactNode; 
    className?: string;
    delay?: number;
  }> = ({ 
    children, 
    className = "",
    delay = 0
  }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    return (
      <motion.div
        ref={ref}
        className={`relative z-20 ${className}`}
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1 
        } : {}}
        transition={{ 
          duration: 0.9, 
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="relative py-20 sm:py-32 text-white overflow-hidden"
    >
      <AnimatedPathComponent containerRef={containerRef} />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
        
        {/* Section 1: Born in Bharat */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6 lg:col-start-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Born in Bharat. Built for the Battlefield.
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              The changing face of warfare has turned drones into one of the most pervasive asymmetric threats. Small, low-cost, and often resistant to jamming, these systems challenge traditional radar and RF-based defences.
            </motion.p>
            <motion.p 
              className="text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              VARAHA redefines counter-drone strategy through an acoustic-driven detection architecture that listens before others can see. By harnessing directional acoustic arrays, distributed AI compute, and multi-sensor fusion, it provides early-warning, precise localization, and seamless cueing for hard-kill or electronic-warfare countermeasures — all while remaining completely passive and undetectable.
            </motion.p>
          </motion.div>
          <div className="lg:col-start-2"></div>
        </AnimatedSection>

        {/* Section 2: Why Acoustic Detection */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
          <div className="lg:col-start-1"></div>
          <motion.div 
            className="space-y-6 lg:col-start-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              WHY ACOUSTIC DETECTION MATTERS
            </motion.h2>
            <motion.ul 
              className="space-y-4 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { title: 'Detects the undetectable', desc: 'Operates independently of RF signatures or radar reflections.' },
                { title: 'Stealth-first architecture', desc: 'Emits no electronic signal; immune to jamming and detection.' },
                { title: 'AI-driven accuracy', desc: 'Neural-network models identify drone signatures in real time.' },
                { title: 'Scalable deployment', desc: 'From compact man-portable units to perimeter-wide networks.' },
                { title: 'All-weather reliability', desc: 'Functions in radar-shadowed, cluttered, or GPS-denied zones.' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <CheckListItem>
                    <strong>{item.title}</strong> – {item.desc}
                  </CheckListItem>
                </motion.div>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatedSection>

        {/* Section 3: Mission Profiles */}
        <AnimatedSection className="flex flex-col items-center" delay={0.15}>
          <motion.h2 
            className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            MISSION PROFILES
          </motion.h2>
          <motion.div 
            className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ 
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
              borderColor: "rgba(59, 130, 246, 0.5)"
            }}
          >
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-blue-500/30">
                  <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Scenario</th>
                  <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/30">
                {[
                  { scenario: 'Base & Airfield Protection', capability: 'Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.' },
                  { scenario: 'Special Forces', capability: 'Miniaturized variant provides hemispheric passive detection via body-worn UI.' },
                  { scenario: 'Advanced Perimeter Defence', capability: '360° sensor fusion array detects anomalies and cues hard-kill platforms.' },
                  { scenario: 'Naval Operations', capability: 'Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.' },
                  { scenario: 'Mobile/Mechanized Units', capability: 'Vehicle-mounted variant for on-the-move protection against aerial threats.' }
                ].map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  >
                    <td className="p-4 sm:p-5 font-semibold">{row.scenario}</td>
                    <td className="p-4 sm:p-5 text-gray-300">{row.capability}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </AnimatedSection>

        {/* Section 4: Interface & Control */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
          <motion.div 
            className="space-y-6 lg:col-start-1"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              INTERFACE & CONTROL
            </motion.h3>
            <motion.ul 
              className="space-y-4 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { title: 'Browser Dashboard:', desc: 'Real-time map, sensor feed, and threat visualization.' },
                { title: 'API Integration:', desc: 'Machine-to-Machine communication for C2 systems.' },
                { title: 'Multi-Platform Access:', desc: 'Optimized for laptops, tablets, and soldier-worn devices.' },
                { title: 'Operator Modes:', desc: 'Manual verification, semi-autonomous cueing, and policy-driven automation.' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <CheckListItem>
                    <strong>{item.title}</strong> {item.desc}
                  </CheckListItem>
                </motion.div>
              ))}
            </motion.ul>
          </motion.div>
          <div className="lg:col-start-2"></div>
        </AnimatedSection>

        {/* Section 5: System Highlights */}
        <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
          <div className="lg:col-start-1"></div>
          <motion.div 
            className="space-y-6 lg:col-start-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              SYSTEM HIGHLIGHTS
            </motion.h3>
            <motion.ul 
              className="space-y-4 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                '100% Passive Detection System',
                'AI-Enabled Acoustic Intelligence',
                'Radar & EO Cueing Integration',
                'Hard-Kill Ready Architecture',
                'Miniaturized Special-Forces Variant',
                'Naval Adaptability',
                'Scalable Deployment Network'
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <CheckListItem>{item}</CheckListItem>
                </motion.div>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatedSection>

        {/* Section 6: Mission Advantage */}
        <AnimatedSection className="text-center flex flex-col items-center" delay={0.15}>
          <motion.h3 
            className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MISSION ADVANTAGE
          </motion.h3>
          <motion.p 
            className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            When milliseconds define survival, VARAHA ensures the operator hears first — and acts faster.
          </motion.p>
        </AnimatedSection>
      </div>
    </div>
  );
});
ContentSections.displayName = 'ContentSections';

// --- SignalBeam Component ---
const SignalBeam: React.FC = memo(() => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
        </linearGradient>
      </defs>
      
      <motion.line
        x1="calc(10% + 5rem)"
        y1="calc(100% - 7rem)"
        x2="calc(100% - 10rem)"
        y2="50%"
        stroke="url(#beam-gradient)"
        strokeWidth="2"
      />
      
      <motion.line
        x1="calc(10% + 5rem)"
        y1="calc(100% - 7rem)"
        x2="calc(100% - 10rem)"
        y2="50%"
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="10 15"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -25 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
});
SignalBeam.displayName = 'SignalBeam';

// --- SceneWithSensors Component ---
const SceneWithSensors: React.FC = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.section
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-black"
      style={{ perspective: '1000px' }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
    >
      {/* 1. The Earth on the right */}
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <EarthCanvas />
      </motion.div>

      {/* 2. The Sensors on the bottom-left */}
      <motion.div 
        className="absolute bottom-4 left-4 flex items-end"
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* The "longer one" (small size, further back) */}
        <motion.div 
          className="w-32 h-32 lg:w-40 lg:h-40"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <DomeCanvas />
        </motion.div>
        
        {/* The "closer one" (large size, in front) */}
        <motion.div 
          className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <DomeCanvas />
        </motion.div>
      </motion.div>

      {/* 3. The Signal Beam */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <SignalBeam />
      </motion.div>

    </motion.section>
  );
});
SceneWithSensors.displayName = 'SceneWithSensors';

// --- Main Page Component ---
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
    <main className="bg-black">
      <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      
      {isHeroComplete && <ContentSections />}
      
      {isHeroComplete && <SceneWithSensors />}
    </main>
  );
};

export default VarahaPage;