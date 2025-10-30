"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Animation variants for the section
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

const AmmunitionExplore: React.FC = () => {
  return (
    <motion.section
      className="relative w-full h-[50vh] md:h-[60vh] bg-black overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is in view
    >
      {/* Background Image (z-0) */}
      <Image
        src="/small_arms/ammunitionex.jpg"
        alt="Ammunition belt"
        layout="fill"
        objectFit="cover"
        className="z-0" 
      />

      {/* ✅ UPDATED: Glowing Dark Overlay */}
      <motion.div
        // Removed "mix-blend-overlay" to create a simple dark tint
        className="absolute inset-0 bg-black z-10" 
        initial={{ opacity: 0.4 }} 
        animate={{ opacity: [0.6, 0.6, 0.6] }} // Pulses opacity from 40% to 60%
        transition={{
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* ✅ END: Glowing Dark Overlay */}

      {/* Overlay Content (z-20, on top of both image and dark overlay) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-4">
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] drop-shadow-lg">
          AMMUNITION
        </h2>
        
        <Link href="/products/ammunition">
          <motion.div
            className="mt-4 md:mt-6 py-2 px-8 text-white text-sm border border-white uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
          </motion.div>
        </Link>
      </div>
    </motion.section>
  );
};

export default AmmunitionExplore;