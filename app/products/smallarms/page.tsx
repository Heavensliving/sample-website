// "use client";

// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, Variants } from 'framer-motion';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// // --- Placeholder Product Data ---
// const smallArms = [
//   { id: 1, name: '.338 SABER', spec: '.338 Lapua Magnum', imagePath: '/products_images/smallarm_placeholder_1.png' },
//   { id: 2, name: '.308 VIPER', spec: '7.62 x 51mm', imagePath: '/products_images/smallarm_placeholder_2.png' },
//   { id: 3, name: 'M72 CARBINE', spec: '5.56 x 45mm', imagePath: '/products_images/smallarm_placeholder_3.png' },
//   { id: 4, name: 'P72 ASSAULT', spec: '7.62 x 39mm', imagePath: '/products_images/smallarm_placeholder_4.png' },
//   { id: 5, name: 'T72 DMR/ASSAULT RIFLE', spec: '7.62 x 51mm', imagePath: '/products_images/smallarm_placeholder_5.png' },
//   { id: 6, name: 'RAPTOR', spec: '.300 Blackout', imagePath: '/products_images/smallarm_placeholder_6.png' },
//   { id: 7, name: 'G72 SMC & CSMC', spec: '9 x 19mm', imagePath: '/products_images/smallarm_placeholder_7.png' },
//   { id: 8, name: 'C72 P', spec: '9 x 19mm', imagePath: '/products_images/smallarm_placeholder_8.png' },
// ];
// // ------------------------------

// // --- Animation Variants ---
// const staggerContainer: Variants = {
//   visible: { transition: { staggerChildren: 0.1 } },
// };

// const itemVariant: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
// };
// // --------------------------

// const SmallArmsPage: React.FC = () => {
//   return (
//     // min-h-screen and flex-col for proper footer positioning
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col">
//       <Navbar />

//       <main className="flex-grow flex flex-col">
//         {/* 1. HERO SECTION: Full-width Image with Text Overlay (Fixed height on mobile, expands on desktop) */}
//         {/* pt-20 added to main element's wrapper in the previous file ensures content clears Navbar */}
//         <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden mt-20"> 
//           <Image
//             src="/products_images/smarmpage.png" 
//             alt="Elite soldier with a rifle on patrol"
//             layout="fill"
//             objectFit="cover"
//             priority // Load hero image immediately
//             className="brightness-[0.7] md:brightness-[0.8]" // Darker overlay for text contrast
//           />
          
//           {/* Text Overlay */}
//           <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-10">
//             <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-white drop-shadow-2xl">
//               SMALL ARMS
//             </h1>
//           </div>
//         </section>

//         {/* 2. PRODUCTS GRID SECTION */}
//         <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
//           <motion.div
//             className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-16"
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//           >
//             {smallArms.map((product) => (
//               <motion.div
//                 key={product.id}
//                 variants={itemVariant}
//                 className="flex flex-col items-center text-center group"
//               >
//                 {/* Product Image Container */}
//                 <Link href={`/products/small-arms/${product.id}`} className="relative w-full aspect-square mb-4 md:mb-6">
//                   {/* Aspect square for uniform size, max width container */}
//                   <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-4 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-red-600/30">
//                     <Image
//                       src={product.imagePath}
//                       alt={product.name}
//                       layout="fill"
//                       objectFit="contain"
//                       className="transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>
//                 </Link>

//                 {/* Product Details */}
//                 <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white group-hover:text-red-500 transition-colors duration-200">
//                   {product.name}
//                 </h2>
//                 <p className="text-sm text-gray-400">{product.spec}</p>
                
//                 {/* Accent Line */}
//                 <div className="h-0.5 w-10 bg-red-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.div>
//             ))}
//           </motion.div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default SmallArmsPage;

"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmmunitionExplore from './AmmunitionExplore'; 
// ✅ 1. Import the new Arsenal component
import Arsenal from './Arsenal'; 

// --- Advanced Animation Variants ---
const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    rotateX: -25,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      delay: 0.4, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

// Updated ParticlesBackground component
const ParticlesBackground = () => {
  const particles = Array.from({ length: 30 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isClient && particles.map((_, i) => {
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        const animateX = Math.random() * window.innerWidth;
        const animateY = Math.random() * window.innerHeight;

        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-600/20 rounded-full"
            initial={{
              x: initialX,
              y: initialY,
            }}
            animate={{
              x: animateX,
              y: animateY,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

// Tactical Grid Lines Background
const TacticalGrid = () => (
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="0" cy="0" r="1" fill="currentColor"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Radar Sweep Effect
const RadarSweep = () => (
  <motion.div
    className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    initial={{ rotate: 0, opacity: 0.3 }}
    animate={{ rotate: 360, opacity: [0.3, 0.1, 0.3] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <div className="absolute inset-0 rounded-full border border-red-600/20" />
    <div className="absolute inset-4 rounded-full border border-red-600/20" />
    <div className="absolute inset-8 rounded-full border border-red-600/20" />
    <motion.div
      className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-red-600/60 to-transparent origin-left"
      style={{ transformOrigin: "left center" }}
    />
  </motion.div>
);

const SmallArmsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Tactical Grid Background */}
      <TacticalGrid />
      <ParticlesBackground />

      {/* Enhanced Loading Screen */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="relative">
          {/* Multi-layer Crosshair Loader */}
          <motion.div className="relative w-32 h-32">
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 border-2 border-red-600/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-3 border-2 border-red-600/40 rounded-full"
              animate={{ rotate: -360, scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner ring */}
            <motion.div
              className="absolute inset-6 border-2 border-red-600/60 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Core */}
            <motion.div
              className="absolute inset-10 border-2 border-red-600 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            {/* Crosshair lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-600 to-transparent" />
            
            {/* Corner brackets */}
            {[0, 90, 180, 270].map((rotation) => (
              <motion.div
                key={rotation}
                className="absolute top-0 left-0 w-8 h-8"
                style={{ 
                  rotate: rotation,
                  transformOrigin: "16px 16px"
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  delay: rotation / 360
                }}
              >
                <div className="border-t-2 border-l-2 border-red-600 w-full h-full" />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Loading text with typing effect */}
          <motion.div className="mt-12 text-center">
            <motion.p
              className="text-red-600 font-bold tracking-[0.4em] text-lg"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING ARSENAL
            </motion.p>
            
            {/* Progress bar */}
            <div className="mt-4 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Radar sweep in background */}
          <RadarSweep />
        </div>
      </motion.div>

      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        {/* HERO SECTION with Parallax */}
        {/* Responsive height and top margin */}
        <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden mt-20">
          <motion.div
            className="absolute inset-0"
            style={{ scale: heroScale, opacity: heroOpacity }}
          >
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full h-full"
            >
              <Image
                src="/products_images/smarmpage.png"
                alt="Elite soldier with a rifle on patrol"
                layout="fill"
                objectFit="cover"
                priority
                className="brightness-[0.65] md:brightness-[0.75]"
              />
              
              {/* Animated overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Multiple scan line effects */}
          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              className="absolute inset-0 pointer-events-none z-10"
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 6,
                delay: delay,
                ease: "linear"
              }}
            >
              <div className="w-full h-2 bg-gradient-to-r from-transparent via-red-500/30 to-transparent blur-md" />
            </motion.div>
          ))}
          
          {/* Text Overlay with enhanced effects */}
          {/* Responsive padding */}
          <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Responsive text size and tracking */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                SMALL ARMS
              </h1>
              
              {/* Enhanced glitch effect (responsive size) */}
              <motion.div
                className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-red-600 mix-blend-screen pointer-events-none"
                animate={{
                  x: [0, -3, 3, -2, 2, 0],
                  y: [0, 2, -2, 1, -1, 0],
                  opacity: [0, 0.7, 0, 0.5, 0]
                }}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              >
                SMALL ARMS
              </motion.div>
              
              {/* Underline animation */}
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>
        <Arsenal />

        <AmmunitionExplore />
      </main>

      <Footer />
    </div>
  );
};

export default SmallArmsPage;