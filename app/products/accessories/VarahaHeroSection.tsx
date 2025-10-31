"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link'; // 1. Import Link

// Animation variants for text and button
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    // Removed transition from here to apply it on the element
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, delay: 0.8, ease: "easeOut" } 
  },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    // Removed transition from here to apply it on the element
  }
};

const VarahaHeroSection: React.FC = () => {
  const title = "VARAHA".split("");
  const subtitle = "COUNTER UNMANNED AERIAL SYSTEM".split(" ");

  return (
    <section className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center text-white overflow-hidden pt-32 pb-24 px-4">
      
      {/* ADDED: Light blue gradient shade from top */}
      <div className="absolute inset-x-0 top-0 h-1/3 z-0 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none"></div>

      {/* Background Grid Image */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-2/3 lg:h-3/4 z-0">
        <Image
          src="/gridbtm.png"
          alt="Abstract grid network"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="opacity-50" // Adjust opacity as needed
        />
      </div>

      {/* Content is now in a single flex column, centered */}
      
      <div className="relative z-20 flex flex-col items-center text-center">
        {/* VARAHA Title */}
        <div className="flex justify-center mb-2">
          {title.map((char, index) => (
            <motion.span
              key={char + index}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase mx-1"
              variants={titleWordVariants}
              initial="hidden"
              // ✅ MODIFIED: Added repeating textShadow animation
              animate={{
                ...titleWordVariants.visible,
                textShadow: [
                  "0 0 4px rgba(255, 255, 255, 0.3)",
                  "0 0 10px rgba(255, 255, 255, 0.6)",
                  "0 0 4px rgba(255, 255, 255, 0.3)"
                ]
              }}
              // ✅ MODIFIED: Added transition for repeating textShadow
              transition={{
                // Entrance transition
                type: "spring",
                damping: 10,
                stiffness: 100,
                delay: 1.2 + index * 0.05,
                
                // Repeating transition for textShadow
                textShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2.5 + index * 0.1 // Stagger the glow start
                }
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle now at the top */}
        <div className="flex justify-center mb-8">
          {subtitle.map((word, index) => (
            <motion.span
              key={word + index}
              className="text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase font-light mx-1 sm:mx-2"
              variants={textVariants}
              initial="hidden"
              // ✅ MODIFIED: Added repeating opacity animation
              animate={{
                ...textVariants.visible,
                opacity: [1, 0.6, 1] // Pulse opacity
              }}
              // ✅ MODIFIED: Added transition for repeating opacity
              transition={{ 
                // Entrance transition
                duration: 0.8, 
                ease: "easeOut",
                delay: 1.8 + index * 0.1,
                
                // Repeating transition for opacity
                opacity: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3 + index * 0.1
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Drone Image */}
      {/* ✅ MODIFIED: This div now only handles ENTRANCE animation */}
      <motion.div
        className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl px-4 mb-4 -mt-8" 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ✅ ADDED: This inner div handles the continuous HOVER animation */}
        <motion.div
          animate={{
            y: [0, -6, 0], // Gentle up-down motion
            x: [0, 3, 0, -3, 0], // Gentle side-to-side motion
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src="/drone_varaha.png"
            alt="VARAHA Drone"
            width={1000}
            height={600}
            layout="responsive"
            objectFit="contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* 2. Wrap the button with Link */}
      <Link href="/varaha">
        <motion.button 
          className="relative z-10 px-10 py-4 border border-white text-white uppercase tracking-widest text-base hover:bg-white hover:text-black transition-colors duration-300 bg-gray-600 -mt-4"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          EXPLORE
        </motion.button>
      </Link>
      
    </section>
  );
};

export default VarahaHeroSection;