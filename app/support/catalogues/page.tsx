"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- PDF Data ---
const pdfData = [
  {
    title: 'AK 47 Upgrade Kit Flyer',
    filename: 'AK 47 Upgrade Kit Flyer.pdf',
  },
  {
    title: 'Ammunition Manual v4',
    filename: 'Ammunition Manual v4.pdf',
  },
  {
    title: 'SSS DEFENCE CATALOG v11',
    filename: 'SSS DEFENCE CATALOG v11.pdf',
  },
  {
    title: 'VARAHA - Brochure',
    filename: 'VARAHA - Brochure.pdf',
  },
];

// --- Reused Hero Variants ---
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

// --- Reused Background Effects ---
const ParticlesBackground = () => {
  const particles = Array.from({ length: 30 });
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
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
            initial={{ x: initialX, y: initialY }}
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

// --- Animation Variants for Cards ---
const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// --- Helper Icons ---
const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 0 0-1.875 1.875v17.25a1.875 1.875 0 0 0 1.875 1.875h12.75A1.875 1.875 0 0 0 20.25 21V8.625c0-.621-.258-1.227-.688-1.688l-3.75-3.75c-.46-.46-1.067-.688-1.688-.688Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 transition-transform duration-300 group-hover:translate-x-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);


// --- CATALOGUES PAGE COMPONENT ---
const CataloguesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <TacticalGrid />
      <ParticlesBackground />
      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        {/* HERO SECTION */}
        <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden mt-20">
          {/* Reusing hero elements, but with a new image and title */}
          <motion.div
            className="absolute inset-0"
          >
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              className="relative w-full h-full"
            >
              <Image
                // Using the same hero image as Support for consistency
                src="/Company/Company_Hero.png" 
                alt="Support Hero Image"
                layout="fill"
                objectFit="cover"
                priority
                className="brightness-[0.6] md:brightness-[0.7]"
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Scan lines effect (reused) */}
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
          
          {/* 🎯 Title (changed to CATALOGUES) */}
          <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                CATALOGUES
              </h1>
              
              {/* Glitch effect (reused) */}
              <motion.div
                className="absolute inset-0 text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-red-600 mix-blend-screen pointer-events-none"
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
                CATALOGUES
              </motion.div>
              
              {/* Underline (reused) */}
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>

        {/* 🎯 NEW: DOWNLOAD CARD SECTION */}
        <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {pdfData.map((pdf) => (
              // Use an <a> tag with the 'download' attribute
              <motion.a
                key={pdf.filename}
                href={`/downloadable/${pdf.filename}`}
                download // This attribute triggers the download
                className="group block h-full"
                variants={cardItemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  // Reusing the same card styling from SupportPage
                  className="relative h-full flex flex-col justify-between p-8 md:p-10 overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-3xl transition-all duration-300 cursor-pointer"
                >
                  {/* Glowing border effect on hover */}
                  <motion.div
                    className="absolute -inset-[1px] bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    aria-hidden="true"
                  />
                  
                  {/* Corner accents on hover */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-3xl transition-all duration-300 group-hover:border-red-600/40" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10 rounded-br-3xl transition-all duration-300 group-hover:border-red-600/40" />

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="mb-6 p-4 bg-black/20 border border-white/10 rounded-xl inline-block">
                      <PdfIcon />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                      {pdf.title}
                    </h3>
                  </div>
                  
                  {/* Download button */}
                  <div className="relative z-10 mt-8 flex justify-end items-center gap-2">
                    <span className="font-medium text-gray-300 group-hover:text-red-500 transition-colors duration-300">
                      Download
                    </span>
                    <DownloadIcon />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CataloguesPage;