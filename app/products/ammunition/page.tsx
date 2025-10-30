"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
// import Link from 'next/link'; // This import was unused
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmmunitionList from './Ammunitionlist';
import AccessoriesExplore from './AccessoriesExplore';

// --- AmmunitionGrid component definition removed from here ---

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
        const initialX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0);
        const initialY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 0);
        const animateX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 0);
        const animateY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 0);

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

// Renamed component
const AmmunitionPage: React.FC = () => {
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
        className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black z-[200] flex items-center justify-center" // Increased z-index
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
      >
        <div className="relative">
          {/* Multi-layer Crosshair Loader */}
          <motion.div className="relative w-32 h-32">
            <motion.div
              className="absolute inset-0 border-2 border-red-600/20 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-3 border-2 border-red-600/40 rounded-full"
              animate={{ rotate: -360, scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-6 border-2 border-red-600/60 rounded-full"
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-10 border-2 border-red-600 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-600 to-transparent" />
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
            {/* Updated loading text */}
            <motion.p
              className="text-red-600 font-bold tracking-[0.4em] text-lg"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              LOADING ORDNANCE
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

      {/* ✅ Navbar component is called here (from placeholder) */}
      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        
        {/* ✅ --- HERO SECTION UPDATED --- */}
        {/* Changed layout to center text like in the reference image */}
        <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden">
          {/* NOTE: Removed mt-20 to allow image to go under transparent navbar */}
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
              {/* ✅ Replaced Next.js Image with standard <img> tag */}
              {/* ✅ --- THIS IS THE UPDATED LINE --- */}
              <img
                src="/Ammunition/amunitionhme.jpg" 
                alt="SSS Defence rifle, magazine, and ammunition on tactical foam"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.65] md:brightness-[0.75]"
                onError={(e) => e.currentTarget.src = 'https://placehold.co/1920x1080/000000/FF0000?text=Ammunition+Hero'}
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" // Darkened gradient slightly
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
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
          
          {/* ✅ Text Overlay: Changed to items-center and removed bottom padding */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Updated hero title */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                AMMUNITION
              </h1>
              
              {/* Glitch effect text */}
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
                {/* Updated hero title (glitch) */}
                AMMUNITION
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

        {/* ✅ Component is now imported and called */}
        <AmmunitionList />
      </main>

      <AccessoriesExplore />

      <Footer />
    </div>
  );
};

export default AmmunitionPage;