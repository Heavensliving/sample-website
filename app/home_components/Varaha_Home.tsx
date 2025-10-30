"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// --- Text Content ---
const title = "VARAHA";
const subtitle = "COUNTER-UNMANNED AIRCRAFT SYSTEM";
const description = "VARAHA is SSS Defence's next-generation Counter-Unmannanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion.";

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

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 }
  })
};

const titleCharVariants: Variants = {
  hidden: { opacity: 0, y: 20, textShadow: '0 0 0px rgba(59, 130, 246, 0)' },
  visible: {
    opacity: [0, 0.5, 1, 0.8, 1],
    y: 0,
    textShadow: [
      '0 0 10px rgba(59, 130, 246, 0.8)',
      '0 0 20px rgba(59, 130, 246, 0.6)',
      '0 0 5px rgba(255, 255, 255, 0.7)',
      '0 0 15px rgba(59, 130, 246, 1)',
      '0 0 10px rgba(59, 130, 246, 0.8)',
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.2, 0.5, 0.8, 1]
    }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

// --- NEW: Glitch Button Variant ---
const glitchButtonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],   // Flicker opacity
    x: [0, -2, 2, -4, 4, 0],          // Jitter horizontally
    skewX: [0, 3, -2, 5, -3, 0],      // Jitter skew
    transition: {
      delay: 2.5, // <-- Wait for text content to load
      duration: 0.4, // <-- Duration of the glitch effect
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};
// ----------------------------


const Varaha_Home: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const router = useRouter();

  // --- Generate particles on client side using state ---
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles only once on the client after initial mount
    const generatedParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: randomValue(0, 100),
      y: randomValue(0, 100),
      duration: randomValue(8, 16),
      delay: randomValue(0, 10),
    }));
    setParticles(generatedParticles);
  }, []); // Empty dependency array ensures this runs only once client-side

  return (
    <section
      ref={ref}
      // --- RESPONSIVE: Section padding ---
      className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col lg:flex-row items-center justify-between min-h-screen overflow-hidden"
    >
      {/* 3D Molecule Floor Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ perspective: '800px' }}
      >
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateY(50%) rotateX(75deg)'
          }}
          animate={isInView ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? {
                transform: ['translateY(0px)', 'translateY(300px)'],
                opacity: [0, 1, 1, 0],
              } : {
                opacity: 0
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}

          {/* Faint grid lines on the floor */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px' // Slightly smaller grid size
          }} />
        </motion.div>
      </div>

      {/* --- MODIFIED: LEFT COLUMN WRAPPER --- */}
      {/* This new div wraps both the text box and the button
          to keep them grouped on the left side */}
      <div className="relative z-10 w-full lg:flex-1 lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mb-16 lg:mb-0 lg:mr-8 xl:mr-12 flex flex-col items-start">

        {/* --- LEFT COLUMN: TEXT CONTENT (Unchanged) --- */}
        <motion.div
          // --- RESPONSIVE: Width and margin (Removed margin) ---
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Animated Corner Brackets */}
          <motion.div
            // --- RESPONSIVE: Bracket size ---
            className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-blue-500 opacity-50"
            initial={{ opacity: 0, x: -10, y: -10 }}
            animate={isInView ? { opacity: 0.5, x: 0, y: 0 } : { opacity: 0, x: -10, y: -10 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.div
            // --- RESPONSIVE: Bracket size ---
            className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-blue-500 opacity-50"
            initial={{ opacity: 0, x: 10, y: 10 }}
            animate={isInView ? { opacity: 0.5, x: 0, y: 0 } : { opacity: 0, x: 10, y: 10 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />

          {/* VARAHA Title (Staggered) */}
          <motion.h1
            // --- RESPONSIVE: Title font size ---
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 tracking-widest"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={titleCharVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle (Typing effect) */}
          <motion.h2
            // --- RESPONSIVE: Subtitle font size and margin ---
            className="text-xs sm:text-sm md:text-base font-light text-blue-300 tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-4 sm:mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: '100%', opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {subtitle}
          </motion.h2>

          {/* Description (Word stagger) */}
          <motion.p
            // --- RESPONSIVE: Description font size ---
            className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed max-w-lg"
            variants={containerVariants}
            custom={1.5} // Custom delay for stagger
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {description.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="inline-block mr-1 sm:mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* Animated Scanning Line */}
          <motion.div
            // --- RESPONSIVE: Scanning line position ---
            className="absolute -bottom-6 sm:-bottom-8 left-0 w-1/2 h-px bg-gradient-to-r from-blue-500 to-transparent"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '100%' } : { x: '-100%' }}
            transition={{
              duration: 1.5,
              delay: 1.5,
              ease: "easeInOut",
              repeat: isInView ? 2 : 0, // Only repeat when in view
              repeatDelay: 1
            }}
          />
        </motion.div>
        {/* --- END OF TEXT CONTENT BOX --- */}


        {/* --- NEW: GLITCH BUTTON (OUTSIDE BOX) --- */}
        <motion.button
          variants={glitchButtonVariants} // <-- Applied new glitch variant
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          onClick={() => router.push('/varaha')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated Glint Effect (Unchanged) */}
          <motion.span
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
            initial={{ x: '-150%' }}
            animate={isInView ? { x: '250%' } : { x: '-150%' }}
            transition={{
              duration: 1.5,
              delay: 3.5, // Delayed this to start after the glitch-in
              repeat: isInView ? Infinity : 0,
              repeatDelay: 5,
              ease: 'linear'
            }}
          />
          <span className="relative z-10">Explore Varaha</span>
        </motion.button>
        {/* --- END OF GLITCH BUTTON --- */}

      </div>
      {/* --- END OF LEFT COLUMN WRAPPER --- */}


      {/* --- RIGHT COLUMN: IMAGE CONTENT (Unchanged) --- */}
      <motion.div
        // --- RESPONSIVE: Image height and width ---
        className="relative z-10 flex-1 w-full h-64 sm:h-80 md:h-96 lg:h-[60vh] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{
          duration: 1,
          delay: 0.5,
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Varaha Image */}
        <Image
          src="/Hero_images/varaha_home.png"
          alt="Varaha Anti-Drone System"
          layout="fill"
          objectFit="contain"
        />

        {/* Pulsing Sonar/Radar Rings from the center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32" // Adjusted size
          style={{ x: '-50%', y: '-50%' }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-blue-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? {
                scale: [0, 3, 5],
                opacity: [0.8, 0.3, 0]
              } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 4,
                delay: i * 1,
                repeat: isInView ? Infinity : 0, // Only repeat when in view
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Varaha_Home;