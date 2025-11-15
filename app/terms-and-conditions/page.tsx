"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// --- Reused Hero Title Variants ---
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

// --- Variants for the text content ---
const contentContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const contentItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


// --- Reused Background Effects ---
// (In a real app, you'd import these from a shared components folder)

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

// --- TERMS & CONDITIONS PAGE COMPONENT ---
const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <TacticalGrid />
      <ParticlesBackground />
      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        
        {/* HERO SECTION - Simplified for a text page */}
        <section className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden mt-20">
          
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
          
          {/* Title */}
          <div className="relative z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* 🎯 CHANGED: Reduced font sizes */}
              <h1 className="text-xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl text-center">
                TERMS & <br className="md:hidden" /> CONDITIONS
              </h1>
              
              {/* Glitch effect (reused) */}
              {/* 🎯 CHANGED: Reduced font sizes to match h1 */}
              <motion.div
                className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-red-600 mix-blend-screen pointer-events-none text-center"
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
                TERMS & <br className="md:hidden" /> CONDITIONS
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

        {/* CONTENT SECTION */}
        <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto" // Using max-w-4xl for better text readability
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              variants={contentItemVariants} 
              className="text-gray-300 leading-relaxed mb-6"
            >
              The information on this site has been included in good faith and is for general purposes only. It should not be relied upon for any specific purpose and no representation or warranty is given as regards its accuracy or completeness.
            </motion.p>
            
            <motion.p 
              variants={contentItemVariants} 
              className="text-gray-300 leading-relaxed mb-6"
            >
              Every user who visits this website does so at his or her own risk and by accessing this site, you agree to the terms and conditions as outlined herein below. SSS Defence reserves its right to disallow accesses to the site to all or any of its users without any prior notice and without any liability of any nature whatsoever, arising out of such disallowance of access to Site.
            </motion.p>
            
            <motion.p 
              variants={contentItemVariants} 
              className="text-gray-300 leading-relaxed mb-6"
            >
              No reproduction of any part of the site may be sold or distributed for commercial gain, nor shall it be modified or incorporated in any other work, publication or site, whether in hard copy or electronic format, including postings to any other site.
            </motion.p>
            
            <motion.p 
              variants={contentItemVariants} 
              className="text-gray-300 leading-relaxed mb-6"
            >
              SSS Defence does not make any warranty, expressed or implied and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for any particular purpose. The entire risk as to the results and performance obtained from using the information on this site is assumed by user and SSS Defence does not assume any liability for any errors or omissions in the information or documents which are referenced by or linked to this site. In no event, SSS Defence shall be liable for any loss, damage or expense whatsoever, arising out of any access to or use of this site or any site linked to it, including, without limitation, any loss of profit, indirect, punitive, incidental or consequential loss.
            </motion.p>
            
            <motion.p 
              variants={contentItemVariants} 
              className="text-gray-300 leading-relaxed mb-6"
            >
              The foregoing are subject to the laws of the Republic of India and you hereby irrevocably consent to the exclusive jurisdiction of courts in Bangalore, India only concerning any dispute that may arise out of the use of this site.
            </motion.p>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;