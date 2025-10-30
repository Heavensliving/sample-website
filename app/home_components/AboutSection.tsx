// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useInView, Variants } from 'framer-motion';

// const AboutSection: React.FC = () => {
//   const [bulletImpacts, setBulletImpacts] = useState<{ x: number; y: number; id: number; boxIndex: number }[]>([]);
//   const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });

//   useEffect(() => {
//     if (isInView) {
//       const timers = [
//         setTimeout(() => createBoxImpact(0), 800),
//         setTimeout(() => createBoxImpact(1), 1200),
//         setTimeout(() => createBoxImpact(2), 1600),
//       ];
//       return () => timers.forEach(clearTimeout);
//     }
//   }, [isInView]);

//   useEffect(() => {
//     const moveCrosshair = () => {
//       setCrosshairPosition({
//         x: Math.random() * 100,
//         y: Math.random() * 100
//       });
//     };
    
//     if (isInView) {
//       const interval = setInterval(moveCrosshair, 3000);
//       return () => clearInterval(interval);
//     }
//   }, [isInView]);

//   const createBoxImpact = (boxIndex: number) => {
//     const id = Date.now() + boxIndex;
//     const x = 50 + Math.random() * 100;
//     const y = 50 + Math.random() * 60;
//     setBulletImpacts((prev) => [...prev, { x, y, id, boxIndex }]);
//     setTimeout(() => {
//       setBulletImpacts((prev) => prev.filter((impact) => impact.id !== id));
//     }, 1500);
//   };

//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const textVariants: Variants = {
//     hidden: { opacity: 0, x: -30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: { duration: 0.6, ease: "easeOut" }
//     }
//   };

//   const wordVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.4,
//         ease: "easeOut"
//       }
//     })
//   };

//   const boxVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
//     visible: (i: number) => ({
//       opacity: 1,
//       scale: 1,
//       rotateX: 0,
//       transition: {
//         delay: 0.4 + i * 0.15,
//         duration: 0.6,
//         ease: [0.34, 1.56, 0.64, 1]
//       }
//     })
//   };

//   const title = "BORN IN BHARAT. BUILT FOR THE WORLD.";
//   const words = title.split(' ');

//   const boxes = [
//     {
//       number: "70+",
//       text: "YEARS OF MANUFACTURING\nEXCELLENCE"
//     },
//     {
//       number: "LICENSED",
//       text: "TO MANUFACTURE BOTH SMALL\nARMS & AMMUNITION"
//     },
//     {
//       number: "HOME GROWN",
//       highlight: "R&D.",
//       text: "EXPORT-READY INDIGENOUS\nWEAPON SYSTEMS"
//     }
//   ];

//   return (
//     <section 
//       ref={ref}
//       className="relative bg-black text-white py-16 px-4 md:px-8 lg:px-16 2xl:px-24 flex flex-col lg:flex-row items-center justify-between min-h-[85vh] md:min-h-screen overflow-hidden"
//     >
//       {/* Animated background grid */}
//       <motion.div
//         className="absolute inset-0 opacity-5 pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 0.05 } : {}}
//         transition={{ duration: 1 }}
//       >
//         <svg className="w-full h-full">
//           <defs>
//             <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#about-grid)" />
//         </svg>
//       </motion.div>

//       {/* Left Content Area */}
//       <motion.div 
//         className="flex-1 lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-center lg:text-left mb-12 lg:mb-0 lg:mr-12 relative z-10"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         {/* Tactical Background Elements - Left Side */}
//         <motion.div 
//           className="absolute -left-12 top-0 w-full h-full opacity-10 pointer-events-none hidden lg:block"
//           initial={{ opacity: 0 }}
//           animate={isInView ? { opacity: 0.1 } : {}}
//           transition={{ duration: 1, delay: 0.3 }}
//         >
//           {/* Crosshair targeting system */}
//           <motion.div
//             className="absolute"
//             style={{ left: `${crosshairPosition.x}%`, top: `${crosshairPosition.y}%` }}
//             animate={{
//               left: `${crosshairPosition.x}%`,
//               top: `${crosshairPosition.y}%`,
//             }}
//             transition={{ duration: 2, ease: "easeInOut" }}
//           >
//             <div className="relative w-16 h-16">
//               <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-60" />
//               <div className="absolute top-1/2 left-0 w-full h-px bg-red-500" />
//               <div className="absolute left-1/2 top-0 w-px h-full bg-red-500" />
//               <motion.div
//                 className="absolute inset-0 border-2 border-red-400 rounded-full"
//                 animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
//                 transition={{ duration: 2, repeat: Infinity }}
//               />
//             </div>
//           </motion.div>

//           {/* Scanning lines */}
//           <motion.div
//             className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
//             animate={{ top: ["0%", "100%"] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//           />
          
//           {/* Tactical grid overlay */}
//           <svg className="absolute inset-0 w-full h-full">
//             <defs>
//               <pattern id="tactical-grid" width="60" height="60" patternUnits="userSpaceOnUse">
//                 <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-red-600"/>
//                 <circle cx="0" cy="0" r="2" fill="currentColor" className="text-red-600"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#tactical-grid)" />
//           </svg>

//           {/* Ranging markers */}
//           <div className="absolute left-0 top-1/4 space-y-8">
//             {[...Array(5)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="flex items-center space-x-2"
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={isInView ? { x: 0, opacity: 0.6 } : {}}
//                 transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
//               >
//                 <div className="w-8 h-px bg-red-500" />
//                 <div className="w-2 h-2 border border-red-500 rotate-45" />
//               </motion.div>
//             ))}
//           </div>

//           {/* Corner brackets */}
//           <motion.div
//             className="absolute top-0 left-0 w-24 h-24"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 0.8 } : {}}
//             transition={{ delay: 0.8 }}
//           >
//             <div className="absolute top-0 left-0 w-12 h-1 bg-red-500" />
//             <div className="absolute top-0 left-0 w-1 h-12 bg-red-500" />
//           </motion.div>
//           <motion.div
//             className="absolute bottom-0 right-0 w-24 h-24"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 0.8 } : {}}
//             transition={{ delay: 1 }}
//           >
//             <div className="absolute bottom-0 right-0 w-12 h-1 bg-red-500" />
//             <div className="absolute bottom-0 right-0 w-1 h-12 bg-red-500" />
//           </motion.div>

//           {/* Distance indicators */}
//           <div className="absolute right-0 top-1/3 space-y-6 text-red-500 font-mono text-xs">
//             {['250M', '500M', '750M', '1000M'].map((dist, i) => (
//               <motion.div
//                 key={dist}
//                 className="flex items-center justify-end space-x-2"
//                 initial={{ x: 20, opacity: 0 }}
//                 animate={isInView ? { x: 0, opacity: 0.5 } : {}}
//                 transition={{ delay: i * 0.1 + 0.7 }}
//               >
//                 <span>{dist}</span>
//                 <div className="w-6 h-px bg-red-500" />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Animated Title */}
//         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-black mb-6 leading-tight relative">
//           {words.map((word, i) => (
//             <motion.span
//               key={i}
//               custom={i}
//               variants={wordVariants}
//               whileHover={{ 
//                 scale: 1.05, 
//                 textShadow: "0 0 20px rgba(220, 38, 38, 0.8)",
//                 transition: { duration: 0.2 }
//               }}
//               className={`inline-block mr-2 cursor-default ${
//                 word === 'BHARAT.' ? 'text-white' : 
//                 word === 'THE' || word === 'WORLD.' ? 'text-red-600' : ''
//               }`}
//             >
//               {word}
//             </motion.span>
//           ))}
//           {/* Glitch effect overlay */}
//           <motion.span
//             className="absolute inset-0 text-red-600 opacity-0 pointer-events-none"
//             animate={isInView ? {
//               opacity: [0, 0.3, 0],
//               x: [0, -2, 2, 0],
//             } : {}}
//             transition={{
//               duration: 0.3,
//               repeat: 2,
//               delay: 2,
//               repeatDelay: 4
//             }}
//           >
//             {title}
//           </motion.span>
//         </h2>

//         <motion.p 
//           className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl leading-relaxed max-w-xl 2xl:max-w-3xl mx-auto lg:mx-0 font-light tracking-wide text-gray-300"
//           variants={textVariants}
//         >
//           SSS Defence is premier defence weapon systems company focused on
//           manufacturing of small arms, ammunition and high-end optics for
//           military and law enforcement. The company is backed by a legacy of 70
//           years of manufacturing experience. We incorporate a design thinking
//           philosophy into our product development process to create highly
//           innovative systems that are{' '}
//           <motion.span 
//             className="font-bold text-red-500"
//             initial={{ opacity: 0 }}
//             animate={isInView ? { opacity: 1 } : {}}
//             transition={{ delay: 1, duration: 0.5 }}
//             whileHover={{ 
//               scale: 1.05,
//               textShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
//             }}
//           >
//             Engineered To Advance.
//           </motion.span>
//         </motion.p>

//         {/* Bullet tracer line */}
//         <motion.div
//           className="absolute -left-8 top-1/2 w-6 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
//           initial={{ scaleX: 0, opacity: 0 }}
//           animate={isInView ? { scaleX: 1, opacity: [0, 1, 0] } : {}}
//           transition={{ duration: 0.6, delay: 0.5 }}
//         />
        
//         {/* Additional bullet tracers */}
//         {[...Array(3)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute -left-4 h-px bg-gradient-to-r from-red-500 via-yellow-400 to-transparent hidden lg:block"
//             style={{ top: `${30 + i * 20}%`, width: '200px' }}
//             initial={{ scaleX: 0, x: -100, opacity: 0 }}
//             animate={isInView ? { 
//               scaleX: [0, 1, 1],
//               x: [0, 150],
//               opacity: [0, 1, 0] 
//             } : {}}
//             transition={{ 
//               duration: 1.5, 
//               delay: 1.5 + i * 0.5,
//               repeat: Infinity,
//               repeatDelay: 5
//             }}
//           />
//         ))}
//       </motion.div>

//       {/* Right Feature Boxes */}
//       <div className="flex-1 lg:max-w-md xl:max-w-lg 2xl:max-w-xl w-full grid gap-6 relative z-10">
//         {boxes.map((box, index) => (
//           <motion.div
//             key={index}
//             custom={index}
//             variants={boxVariants}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             className="relative bg-red-800 p-6 md:p-8 flex flex-col justify-center items-center text-center h-36 md:h-40 xl:h-48 2xl:h-56 overflow-hidden group"
//             whileHover={{ 
//               scale: 1.02,
//               boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)",
//               transition: { duration: 0.3 }
//             }}
//           >
//             {/* Box background effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-0"
//               whileHover={{ opacity: 1 }}
//               transition={{ duration: 0.3 }}
//             />

//             {/* Animated scan line on hover */}
//             <motion.div
//               className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-70"
//               animate={{ top: ["-10%", "110%"] }}
//               transition={{ 
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "linear"
//               }}
//             />

//             {/* Bullet impact effects for this box */}
//             {bulletImpacts
//               .filter(impact => impact.boxIndex === index)
//               .map((impact) => (
//                 <div key={impact.id} className="absolute inset-0 pointer-events-none">
//                   {/* Impact flash */}
//                   <motion.div
//                     className="absolute w-8 h-8 rounded-full bg-yellow-400"
//                     style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
//                     initial={{ scale: 0, opacity: 1 }}
//                     animate={{ scale: 3, opacity: 0 }}
//                     transition={{ duration: 0.4, ease: "easeOut" }}
//                   />
                  
//                   {/* Bullet hole */}
//                   <motion.div
//                     className="absolute w-4 h-4 rounded-full bg-black border border-gray-600"
//                     style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
//                     initial={{ scale: 0, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.2, delay: 0.1 }}
//                   />

//                   {/* Impact ring */}
//                   <motion.div
//                     className="absolute w-6 h-6 rounded-full border-2 border-white"
//                     style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
//                     initial={{ scale: 0, opacity: 1 }}
//                     animate={{ scale: 4, opacity: 0 }}
//                     transition={{ duration: 0.6, ease: "easeOut" }}
//                   />

//                   {/* Spark particles */}
//                   {[...Array(8)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute w-1 h-1 bg-orange-400 rounded-full"
//                       style={{ left: impact.x, top: impact.y }}
//                       initial={{ x: 0, y: 0, opacity: 1 }}
//                       animate={{
//                         x: Math.cos((i * Math.PI * 2) / 8) * 40,
//                         y: Math.sin((i * Math.PI * 2) / 8) * 40,
//                         opacity: 0,
//                       }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     />
//                   ))}
//                 </div>
//               ))}

//             {/* Content */}
//             <div className="relative z-10">
//               <motion.p 
//                 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-black text-white mb-2 leading-none"
//                 whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
//               >
//                 {box.number}
//                 {box.highlight && (
//                   <span className="text-red-300"> {box.highlight}</span>
//                 )}
//               </motion.p>
//               <p className="text-xs sm:text-sm md:text-base xl:text-base font-light tracking-widest text-white opacity-80 uppercase whitespace-pre-line">
//                 {box.text}
//               </p>
//             </div>

//             {/* Corner accents */}
//             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white opacity-20 group-hover:opacity-40 transition-opacity" />
//             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white opacity-20 group-hover:opacity-40 transition-opacity" />
//           </motion.div>
//         ))}
//       </div>

//       {/* Decorative targeting elements */}
//       <motion.div
//         className="absolute top-8 right-8 w-12 h-12 border border-red-600 opacity-30"
//         initial={{ rotate: 0, scale: 0 }}
//         animate={isInView ? { rotate: 45, scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.5 }}
//       >
//         <motion.div
//           className="absolute inset-2 border border-red-600"
//           animate={{ rotate: -90 }}
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//         />
//       </motion.div>
      
//       <motion.div
//         className="absolute bottom-8 left-8 w-16 h-16 border border-red-600 opacity-20 rounded-full"
//         initial={{ scale: 0 }}
//         animate={isInView ? { scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.7 }}
//       >
//         <motion.div
//           className="absolute inset-0 border-2 border-red-500 rounded-full"
//           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
//           transition={{ duration: 2, repeat: Infinity }}
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default AboutSection;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useInView, 
  Variants,
  animate,
  useMotionValue,
  useTransform
} from 'framer-motion';

// --- COMPONENT: Animated Counter ---
interface CounterProps {
  from: number;
  to: number;
  isInView: boolean;
}

const Counter: React.FC<CounterProps> = ({ from, to, isInView }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration: 2,
        ease: "easeOut",
        delay: 0.8
      });
      return () => controls.stop();
    } else {
      count.set(from);
    }
  }, [isInView, count, to, from]);

  return <motion.span>{rounded}</motion.span>;
};

const AboutSection: React.FC = () => {
  const [bulletImpacts, setBulletImpacts] = useState<{ x: number; y: number; id: number; boxIndex: number }[]>([]);
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });
  const [networkNodes, setNetworkNodes] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  // Generate random network nodes
  useEffect(() => {
    const nodes = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: i
    }));
    setNetworkNodes(nodes);
  }, []);

  useEffect(() => {
    if (isInView) {
      setBulletImpacts([]);
      const timers = [
        setTimeout(() => createBoxImpact(0), 800),
        setTimeout(() => createBoxImpact(1), 1200),
        setTimeout(() => createBoxImpact(2), 1600),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isInView]);

  useEffect(() => {
    const moveCrosshair = () => {
      setCrosshairPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    };
    
    if (isInView) {
      const interval = setInterval(moveCrosshair, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const createBoxImpact = (boxIndex: number) => {
    const id = Date.now() + boxIndex;
    const x = 50 + Math.random() * 100;
    const y = 50 + Math.random() * 60;
    setBulletImpacts((prev) => [...prev, { x, y, id, boxIndex }]);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const boxVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: 0.4 + i * 0.15,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    })
  };

  const title = "BORN IN BHARAT. BUILT FOR THE WORLD.";
  const words = title.split(' ');

  const boxes = [
    {
      number: 70,
      suffix: "+",
      text: "YEARS OF MANUFACTURING\nEXCELLENCE"
    },
    {
      number: "LICENSED",
      text: "TO MANUFACTURE BOTH SMALL\nARMS & AMMUNITION"
    },
    {
      number: "HOME GROWN",
      highlight: "R&D.",
      text: "EXPORT-READY INDIGENOUS\nWEAPON SYSTEMS"
    }
  ];

  // Generate crack lines from center point
  const generateCrackLines = (centerX: number, centerY: number) => {
    const numCracks = 6;
    return Array.from({ length: numCracks }, (_, i) => {
      const angle = (i * 360) / numCracks + Math.random() * 30 - 15;
      const length = 20 + Math.random() * 30;
      const endX = centerX + Math.cos((angle * Math.PI) / 180) * length;
      const endY = centerY + Math.sin((angle * Math.PI) / 180) * length;
      return { startX: centerX, startY: centerY, endX, endY, id: i };
    });
  };

  return (
    <section 
      ref={ref}
      className="relative bg-black text-white py-16 px-4 md:px-8 lg:px-16 2xl:px-24 flex flex-col lg:flex-row items-center justify-between min-h-[85vh] md:min-h-screen overflow-hidden"
    >
      {/* Left Content Area */}
      <motion.div 
        className="flex-1 lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl text-center lg:text-left mb-12 lg:mb-0 lg:mr-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Animated Network Background - Left Side */}
        <motion.div 
          className="absolute -left-12 top-0 w-full h-full opacity-5 pointer-events-none hidden lg:block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.08 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <svg className="absolute inset-0 w-full h-full">
            {/* Draw connections between nodes */}
            {networkNodes.map((node, i) => 
              networkNodes.slice(i + 1).map((otherNode, j) => {
                const distance = Math.sqrt(
                  Math.pow(node.x - otherNode.x, 2) + 
                  Math.pow(node.y - otherNode.y, 2)
                );
                // Only connect nearby nodes
                if (distance < 25) {
                  return (
                    <motion.line
                      key={`${node.id}-${otherNode.id}`}
                      x1={`${node.x}%`}
                      y1={`${node.y}%`}
                      x2={`${otherNode.x}%`}
                      y2={`${otherNode.y}%`}
                      stroke="white"
                      strokeWidth="1"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={isInView ? { 
                        pathLength: 1, 
                        opacity: [0.3, 0.6, 0.3] 
                      } : { pathLength: 0, opacity: 0 }}
                      transition={{
                        pathLength: { duration: 2, delay: i * 0.05 },
                        opacity: { duration: 3, repeat: Infinity, delay: i * 0.1 }
                      }}
                    />
                  );
                }
                return null;
              })
            )}

            {/* Draw nodes */}
            {networkNodes.map((node) => (
              <motion.circle
                key={node.id}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="2"
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { 
                  scale: [1, 1.5, 1], 
                  opacity: [0.5, 1, 0.5] 
                } : { scale: 0, opacity: 0 }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, delay: node.id * 0.1 },
                  opacity: { duration: 2, repeat: Infinity, delay: node.id * 0.1 }
                }}
              />
            ))}

            {/* Animated data packets moving along connections */}
            {networkNodes.slice(0, 5).map((node, i) => {
              const targetNode = networkNodes[(i + 3) % networkNodes.length];
              return (
                <motion.circle
                  key={`packet-${node.id}`}
                  r="1.5"
                  fill="red"
                  initial={{ opacity: 0 }}
                  animate={isInView ? {
                    cx: [`${node.x}%`, `${targetNode.x}%`],
                    cy: [`${node.y}%`, `${targetNode.y}%`],
                    opacity: [0, 1, 0]
                  } : { opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "linear"
                  }}
                />
              );
            })}
          </svg>

          {/* Crosshair targeting system */}
          <motion.div
            className="absolute"
            style={{ left: `${crosshairPosition.x}%`, top: `${crosshairPosition.y}%` }}
            animate={{
              left: `${crosshairPosition.x}%`,
              top: `${crosshairPosition.y}%`,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-60" />
              <div className="absolute top-1/2 left-0 w-full h-px bg-red-500" />
              <div className="absolute left-1/2 top-0 w-px h-full bg-red-500" />
              <motion.div
                className="absolute inset-0 border-2 border-red-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Corner brackets */}
          <motion.div
            className="absolute top-0 left-0 w-24 h-24"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-12 h-1 bg-red-500" />
            <div className="absolute top-0 left-0 w-1 h-12 bg-red-500" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.8 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="absolute bottom-0 right-0 w-12 h-1 bg-red-500" />
            <div className="absolute bottom-0 right-0 w-1 h-12 bg-red-500" />
          </motion.div>
        </motion.div>

        {/* Animated Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl font-black mb-6 leading-tight relative">
          {words.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              whileHover={{ 
                scale: 1.05, 
                textShadow: "0 0 20px rgba(220, 38, 38, 0.8)",
                transition: { duration: 0.2 }
              }}
              className={`inline-block mr-2 cursor-default ${
                word === 'BHARAT.' ? 'text-white' : 
                word === 'THE' || word === 'WORLD.' ? 'text-red-600' : ''
              }`}
            >
              {word}
            </motion.span>
          ))}
          {/* Glitch effect overlay */}
          <motion.span
            className="absolute inset-0 text-red-600 opacity-0 pointer-events-none"
            animate={isInView ? {
              opacity: [0, 0.3, 0],
              x: [0, -2, 2, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 0.3,
              repeat: 2,
              delay: 2,
              repeatDelay: 4
            }}
          >
            {title}
          </motion.span>
        </h2>

        <motion.p 
          className="text-sm sm:text-base md:text-lg xl:text-lg 2xl:text-xl leading-relaxed max-w-xl 2xl:max-w-3xl mx-auto lg:mx-0 font-light tracking-wide text-gray-300"
          variants={textVariants}
        >
          SSS Defence is premier defence weapon systems company focused on
          manufacturing of small arms, ammunition and high-end optics for
          military and law enforcement. The company is backed by a legacy of 70
          years of manufacturing experience. We incorporate a design thinking
          philosophy into our product development process to create highly
          innovative systems that are{' '}
          <motion.span 
            className="font-bold text-red-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
            }}
          >
            Engineered To Advance.
          </motion.span>
        </motion.p>

        {/* Bullet tracer line */}
        <motion.div
          className="absolute -left-8 top-1/2 w-6 h-0.5 bg-gradient-to-r from-red-600 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </motion.div>

      {/* Right Feature Boxes */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg 2xl:max-w-xl w-full grid gap-6 relative z-10">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={boxVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative bg-red-800 p-6 md:p-8 flex flex-col justify-center items-center text-center h-36 md:h-40 xl:h-48 2xl:h-56 overflow-hidden group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Box background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Animated scan line on hover */}
            <motion.div
              className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-70"
              animate={{ top: ["-10%", "110%"] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Enhanced Bullet impact effects with cracks */}
            {bulletImpacts
              .filter(impact => impact.boxIndex === index)
              .map((impact) => {
                const crackLines = generateCrackLines(impact.x, impact.y);
                return (
                  <div key={impact.id} className="absolute inset-0 pointer-events-none">
                    {/* Impact flash */}
                    <motion.div
                      className="absolute w-12 h-12 rounded-full bg-yellow-400"
                      style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />

                    {/* Shockwave ring */}
                    <motion.div
                      className="absolute w-16 h-16 rounded-full border-2 border-yellow-300"
                      style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    
                    {/* Central bullet hole */}
                    <motion.div
                      className="absolute w-5 h-5 rounded-full bg-black border-2 border-gray-700"
                      style={{ 
                        left: impact.x, 
                        top: impact.y, 
                        transform: 'translate(-50%, -50%)',
                        boxShadow: 'inset 0 0 8px rgba(0,0,0,0.9)'
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.15 }}
                    />

                    {/* Crack lines radiating from center */}
                    <svg className="absolute inset-0 w-full h-full">
                      {crackLines.map((crack) => (
                        <motion.line
                          key={crack.id}
                          x1={crack.startX}
                          y1={crack.startY}
                          x2={crack.startX}
                          y2={crack.startY}
                          stroke="rgba(0, 0, 0, 0.4)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={{ 
                            x2: crack.startX,
                            y2: crack.startY,
                            opacity: 0
                          }}
                          animate={{ 
                            x2: crack.endX,
                            y2: crack.endY,
                            opacity: 1
                          }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.1 + crack.id * 0.02,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                      
                      {/* Secondary smaller cracks */}
                      {crackLines.slice(0, 3).map((crack) => {
                        const midX = (crack.startX + crack.endX) / 2;
                        const midY = (crack.startY + crack.endY) / 2;
                        const branchAngle = Math.random() * 60 - 30;
                        const branchLength = 10 + Math.random() * 10;
                        const branchEndX = midX + Math.cos((branchAngle * Math.PI) / 180) * branchLength;
                        const branchEndY = midY + Math.sin((branchAngle * Math.PI) / 180) * branchLength;
                        
                        return (
                          <motion.line
                            key={`branch-${crack.id}`}
                            x1={midX}
                            y1={midY}
                            x2={midX}
                            y2={midY}
                            stroke="rgba(0, 0, 0, 0.3)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            initial={{ 
                              x2: midX,
                              y2: midY,
                              opacity: 0
                            }}
                            animate={{ 
                              x2: branchEndX,
                              y2: branchEndY,
                              opacity: 1
                            }}
                            transition={{ 
                              duration: 0.2, 
                              delay: 0.3 + crack.id * 0.03,
                              ease: "easeOut"
                            }}
                          />
                        );
                      })}
                    </svg>

                    {/* Impact ring */}
                    <motion.div
                      className="absolute w-8 h-8 rounded-full border-2 border-white"
                      style={{ left: impact.x, top: impact.y, transform: 'translate(-50%, -50%)' }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 5, opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />

                    {/* Spark particles */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-orange-400 rounded-full"
                        style={{ left: impact.x, top: impact.y }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 12) * (30 + Math.random() * 20),
                          y: Math.sin((i * Math.PI * 2) / 12) * (30 + Math.random() * 20),
                          opacity: 0,
                          scale: [1, 1.5, 0]
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    ))}

                    {/* Debris particles */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`debris-${i}`}
                        className="absolute w-1.5 h-1.5 bg-gray-600 rounded-sm"
                        style={{ left: impact.x, top: impact.y }}
                        initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                        animate={{
                          x: Math.cos((i * Math.PI * 2) / 6 + Math.PI / 6) * (20 + Math.random() * 15),
                          y: Math.sin((i * Math.PI * 2) / 6 + Math.PI / 6) * (20 + Math.random() * 15),
                          opacity: 0,
                          rotate: Math.random() * 360
                        }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
                      />
                    ))}
                  </div>
                );
              })}

            {/* Content */}
            <div className="relative z-10">
              <motion.p 
                className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-black text-white mb-2 leading-none"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                {typeof box.number === 'number' ? (
                  <>
                    <Counter from={0} to={box.number} isInView={isInView} />
                    {box.suffix}
                  </>
                ) : (
                  box.number
                )}
                
                {box.highlight && (
                  <span className="text-red-300"> {box.highlight}</span>
                )}
              </motion.p>
              <p className="text-xs sm:text-sm md:text-base xl:text-base font-light tracking-widest text-white opacity-80 uppercase whitespace-pre-line">
                {box.text}
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white opacity-20 group-hover:opacity-40 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Decorative targeting elements */}
      <motion.div
        className="absolute top-8 right-8 w-12 h-12 border border-red-600 opacity-30"
        initial={{ rotate: 0, scale: 0 }}
        animate={isInView ? { rotate: 45, scale: 1 } : { rotate: 0, scale: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-2 border border-red-600"
          animate={{ rotate: -90 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border border-red-600 opacity-20 rounded-full"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <motion.div
          className="absolute inset-0 border-2 border-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;