"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer
import VarahaHeroSection from './VarahaHeroSection';

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

// ParticlesBackground component (re-used)
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

// Tactical Grid Lines Background (re-used)
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

const AccessoriesPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Tactical Grid Background and Particles */}
      <TacticalGrid />
      <ParticlesBackground />

      {/* Navbar */}
      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        {/* HERO SECTION */}
        <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden">
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
                src="/products_images/accessories_product.png" // Landing section image path
                alt="Tactical Accessories"
                layout="fill"
                objectFit="cover"
                priority
                className="brightness-[0.65] md:brightness-[0.75]"
              />
              
              {/* Overlay gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Scan line effects */}
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
          
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                ACCESSORIES
              </h1>
              
              {/* Glitch effect */}
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
                ACCESSORIES
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

        {/* Product Grid Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* AK Upgrade Kit */}
            <motion.div 
              className="relative bg-zinc-900/50 rounded-lg overflow-hidden group border border-zinc-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src="/Accessories/Ak.png" // Your image path
                alt="AK Upgrade Kit"
                width={700}
                height={400}
                layout="responsive"
                objectFit="contain"
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out p-4"
              />
              {/* ✅ MODIFIED: Darker gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">AK Upgrade Kit</h2>
                {/* ✅ REMOVED: Subtitle */}
              </div>
              {/* ✅ MODIFIED: Light black hover overlay, button removed */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Button removed */}
              </div>
            </motion.div>

            {/* Suppressors */}
            <motion.div 
              className="relative bg-zinc-900/50 rounded-lg overflow-hidden group border border-zinc-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/Accessories/suprsr.png" // Your image path
                alt="Suppressors"
                width={700}
                height={400}
                layout="responsive"
                objectFit="contain"
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out p-4"
              />
              {/* ✅ MODIFIED: Darker gradient */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-white">Suppressors</h2>
                {/* ✅ REMOVED: Subtitle */}
              </div>
              {/* ✅ MODIFIED: Light black hover overlay, button removed */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Button removed */}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <VarahaHeroSection />
      <Footer />
    </div>
  );
};

export default AccessoriesPage;