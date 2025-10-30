"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// --- Placeholder News Data ---
const newsItems = [
  {
    id: 1,
    imagePath: "/News/news1.png",
    title: "DefExpo India 2022 Highlights",
    date: "October 20, 2022",
    description: "Showcasing our latest innovations and engaging with industry leaders at DefExpo 2022 in Gandhinagar.",
  },
  {
    id: 2,
    imagePath: "/News/news2.png",
    title: "International Police Expo Participation",
    date: "July 15, 2023",
    description: "Presenting advanced security solutions tailored for law enforcement at the International Police Expo.",
  },
  {
    id: 3,
    imagePath: "/News/news3.png",
    title: "Milipol Paris 2025 Announcement",
    date: "November 18, 2025", // Future date
    description: "Join us at Milipol Paris 2025 for the leading event dedicated to homeland security and safety.",
  }
];
// ----------------------------

// --- Animation Variants ---
// We will still use these, but apply them to the content wrapper and cards.
const contentVariants: Variants = { // Renamed from sectionVariants for clarity
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Simple fade-in variant for the title characters before the cut
const initialCharVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// ----------------------------

const NewsEvents: React.FC = () => {
  const ref = useRef(null);
  // This ref is now for detecting when the whole component area is in view
  const isInView = useInView(ref, { once: false, amount: 0.3 }); 
  
  // --- State for Title Shot Effect ---
  const [bulletFired, setBulletFired] = useState(false);
  const titleText = "NEWS & EVENTS";
  const bulletDelay = 0.8; // Delay after section appears before bullet fires
  const bulletDuration = 0.5; // How long the bullet takes to cross
  const cutDelay = bulletDelay + bulletDuration * 0.5; // Start cutting shortly after bullet passes midpoint

  // --- Trigger Shot Animation ---
  useEffect(() => {
    let shotTimer: NodeJS.Timeout | null = null;
    if (isInView) {
      // Trigger the shot effect after a delay
      shotTimer = setTimeout(() => {
        setBulletFired(true);
      }, bulletDelay * 1000); 
    } else {
      // Reset when out of view
      setBulletFired(false); 
    }
    
    // Cleanup timer
    return () => {
      if (shotTimer) clearTimeout(shotTimer);
    };
  }, [isInView]);
  // ------------------------------------

  return (
    // 1. Convert to a standard <section>
    // 2. KEEP the background class here (bg-black)
    <section 
      ref={ref}
      className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 overflow-hidden"
    >
      {/* Optional: Subtle background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
      }} />

      {/* 3. NEW: motion.div to wrap all content and handle animation */}
      <motion.div
        className="relative z-10" // Keep z-index for content above pattern
        initial="hidden" 
        animate={isInView ? "visible" : "hidden"} 
        variants={contentVariants} // Apply animation here
      >
        {/* Title with Shot Effect */}
        <div className="text-center relative z-10 mb-12 sm:mb-16">
          {/* Container to hold the two clipped versions and the bullet */}
          <div className="relative inline-block align-middle">
            {/* Base Title (for initial fade-in) & Top Half after cut */}
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide relative"
              initial={{ clipPath: 'inset(0 0 0 0)' }} // Initially show everything
              animate={isInView && bulletFired ? { 
                clipPath: 'inset(0 0 50% 0)', // Show only top half
                y: -2, // Push slightly up
                rotate: -0.3 // Rotate slightly
              } : { 
                clipPath: 'inset(0 0 0 0)',
                y: 0,
                rotate: 0 
              }}
              transition={{ delay: cutDelay, duration: 0.4, ease: "easeOut" }}
            >
              {titleText.split("").map((char, index) => (
                <motion.span
                  key={`top-${index}`}
                  variants={initialCharVariants} // Use simple fade-in variant
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h2>

            {/* Bottom Half (Overlayed, revealed by clip-path after cut) */}
            <motion.h2 
              aria-hidden="true" // Hide from screen readers
              className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-wide"
              initial={{ clipPath: 'inset(100% 0 0 0)' }} // Initially hide everything (clip from top)
              animate={isInView && bulletFired ? { 
                clipPath: 'inset(50% 0 0 0)', // Show only bottom half
                y: 2, // Push slightly down
                rotate: 0.3 // Rotate slightly
              } : { 
                clipPath: 'inset(100% 0 0 0)',
                y: 0,
                rotate: 0 
              }}
              transition={{ delay: cutDelay, duration: 0.4, ease: "easeOut" }}
            >
              {/* Need to render the text here too for the clip-path to work */}
              {titleText.split("").map((char, index) => (
                <span key={`bottom-${index}`} className="inline-block opacity-100"> 
                  {/* Opacity 100 ensures it's visible when clipped */}
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </motion.h2>
              
            {/* Bullet Tracer Line */}
            {isInView && ( 
              <motion.div
                className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 origin-left pointer-events-none z-20"
                style={{ 
                  y: '-50%', 
                  boxShadow: '0 0 8px 2px rgba(239, 68, 68, 0.7)',
                  filter: 'blur(0.5px)'
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={bulletFired ? { 
                  scaleX: 1, 
                  opacity: [0, 1, 1, 0] 
                } : { 
                  scaleX: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: bulletDuration, 
                  delay: bulletDelay, 
                  ease: [0.85, 0, 0.15, 1] 
                }}
              />
            )}
          </div>
        </div>


        {/* News Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12 max-w-7xl mx-auto"
          // We removed the initial/animate/variants from here because the parent motion.div handles the stagger
        >
          {newsItems.map((item) => (
            <motion.div
              key={item.id}
              className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800/50 shadow-lg transition-all duration-300 hover:shadow-red-500/30"
              variants={cardVariants} 
              whileHover={{ y: -5, scale: 1.02 }} 
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                {/* Image overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"/>
              </div>

              {/* Content Area */}
              <div className="p-4 sm:p-6">
                <p className="text-xs text-red-400 mb-1 tracking-wider uppercase">{item.date}</p>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-tight group-hover:text-red-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3"> 
                  {item.description}
                </p>
              </div>
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-lg" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NewsEvents;