"use client";

import React, { useState, useEffect } from 'react'; // Imports are still needed for ParticlesBackground
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

// Radar Sweep Effect (Definition can stay, it's just not called anymore)
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
  // const [isLoading, setIsLoading] = useState(true); // <-- REMOVED
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  /* // <-- REMOVED
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  */

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Tactical Grid Background */}
      <TacticalGrid />
      <ParticlesBackground />

      {/* Enhanced Loading Screen -- REMOVED BLOCK */}

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