"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// Animation variants for the section (copied from AmmunitionExplore)
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

const AccessoriesExplore: React.FC = () => {
  return (
    <motion.section
      // ✅ Use same height and animations as reference
      className="relative w-full h-[50vh] md:h-[60vh] bg-black overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% is in view
    >
      {/* Background Image (z-0) - Using next/image */}
      <Image
        src="/products_images/accessories_product.png" // ✅ Content updated
        alt="Accessories product range" // ✅ Content updated
        layout="fill"
        objectFit="cover"
        className="z-0" 
        onError={(e) => e.currentTarget.src = 'https://placehold.co/1920x1080/000000/FFFFFF?text=Accessories+Product'}
      />

      {/* ✅ Glowing Dark Overlay (copied from reference) */}
      <motion.div
        className="absolute inset-0 bg-black z-10" 
        initial={{ opacity: 0.4 }} 
        animate={{ opacity: [0.4, 0.6, 0.4] }} // Corrected pulse
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
          ACCESSORIES 
        </h2>
        
        <Link href="/products/accessories"> 
          <motion.div
            // ✅ Use same smaller button style as reference
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

export default AccessoriesExplore;