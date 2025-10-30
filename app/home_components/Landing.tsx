"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// --- Image Carousel Setup ---
const heroImages = [
  '/Hero_images/hero_img_1.png',
  // e.g., '/Hero_images/hero_img_2.png',
  // e.g., '/Hero_images/hero_img_3.png',
];

const carouselVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1.5, ease: "easeInOut" } },
  exit: { opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }
} as const;

// --- Animation Variants for Hero Text ---
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    }
  }
} as const;

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeOut", duration: 0.5 }
  }
} as const;

// IMPORTANT: Renamed from Home to Landing
export default function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [impactPoints, setImpactPoints] = useState<{ x: number; y: number; id: number }[]>([]);
  const [muzzleFlashes, setMuzzleFlashes] = useState<{ x: number; y: number; id: number }[]>([]);
  const [centerTextShot, setCenterTextShot] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // State to track if the screen is desktop (>= 768px)
  const [isDesktop, setIsDesktop] = useState(true); 

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    const checkDesktop = () => {
      // 768px is Tailwind's 'md' breakpoint
      const isLargeScreen = window.innerWidth >= 768;
      setIsDesktop(isLargeScreen);
      return isLargeScreen;
    };

    // Initial check and setup listeners
    checkDesktop(); 

    const handleMouseMove = (e: MouseEvent) => {
      if (checkDesktop()) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", checkDesktop);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % heroImages.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    // Show text with typing effect
    const timer1 = setTimeout(() => {
      setShowText(true);
    }, 300);
    
    // Trigger shot effect after text appears
    const timer2 = setTimeout(() => {
      setCenterTextShot(true);
    }, 1800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const createImpact = (e: React.MouseEvent<HTMLDivElement>) => {
    // For mobile, use touch events if available, otherwise click
    const x = e.clientX;
    const y = e.clientY;
    
    const id = Date.now();
    setImpactPoints((prev) => [...prev, { x, y, id }]);
    
    // Add muzzle flash effect
    setMuzzleFlashes((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setMuzzleFlashes((prev) => prev.filter((flash) => flash.id !== id));
    }, 150);
    
    setTimeout(() => {
      setImpactPoints((prev) => prev.filter((point) => point.id !== id));
    }, 1000);
  };

  const text1 = "DEFENCE SYSTEMS";
  const text2 = "THAT DEFY ALL ODDS";

  return (
    <div 
      // Height is adjusted for mobile
      className="relative flex items-center justify-center h-[75vh] md:h-screen bg-black overflow-hidden cursor-pointer md:cursor-none"
      onClick={createImpact}
    >
      {/* --- Hero Image Carousel --- */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          variants={carouselVariants} 
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <img
            src={heroImages[currentIndex]}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-60" />
        </motion.div>
      </AnimatePresence>

      {/* Muzzle Flash Effects */}
      {muzzleFlashes.map((flash) => (
        <motion.div
          key={flash.id}
          className="absolute pointer-events-none z-40"
          style={{ left: flash.x - 40, top: flash.y - 40 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-80" />
            <div className="absolute inset-2 bg-orange-500 rounded-full blur-lg opacity-90" />
            <div className="absolute inset-4 bg-white rounded-full blur-md" />
          </div>
        </motion.div>
      ))}

      {/* Bullet Impact Effects */}
      {impactPoints.map((point) => (
        <div key={point.id}>
          <motion.div
            className="absolute w-4 h-4 border-2 border-red-500 rounded-full pointer-events-none z-40"
            style={{ left: point.x - 8, top: point.y - 8 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-red-500 rounded-full pointer-events-none z-40"
            style={{ left: point.x - 4, top: point.y - 4 }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full pointer-events-none z-40"
              style={{ left: point.x, top: point.y }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: Math.cos((i * Math.PI * 2) / 12) * 60,
                y: Math.sin((i * Math.PI * 2) / 12) * 60,
                opacity: 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </div>
      ))}

      {/* Crosshair Following Mouse (The Target Reticle) */}
      <motion.div
        className={`absolute pointer-events-none z-50 mix-blend-screen w-12 h-12 ${!isDesktop ? 'inset-0 m-auto' : ''}`} 
        // Only apply follow animation on desktop
        animate={isDesktop ? { x: mousePosition.x - 25, y: mousePosition.y - 25 } : {}}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      >
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-red-500 -translate-x-1/2" />
          <div className="absolute left-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-3 h-0.5 bg-red-500 -translate-y-1/2" />
          <div className="absolute inset-0 border-2 border-red-500 rounded-full opacity-50" />
        </div>
      </motion.div>

      {/* --- Center Text with Animated Loading & Cracked Effect --- */}
      <div className="absolute z-30 text-center pointer-events-none px-4">
        <div className="relative inline-block">
          {/* First line - DEFENCE SYSTEMS */}
          {/* RESPONSIVE CHANGE: Rescaled fonts from mobile up to xl */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white mb-2">
            {showText && text1.split('').map((char, i) => (
              <motion.span
                key={`char1-${i}`}
                initial={{ opacity: 0, y: -20, rotateX: 90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                  ease: "easeOut"
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Second line - THAT DEFY ALL ODDS (Red text) */}
          {/* RESPONSIVE CHANGE: Rescaled fonts from mobile up to xl */}
          <div className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-red-600">
            {showText && text2.split('').map((char, i) => (
              <motion.span
                key={`char2-${i}`}
                initial={{ opacity: 0, x: -20, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.03,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            
            {/* Crack/Shatter overlays when shot - positioned on red text */}
            {centerTextShot && (
              <>
                {/* Bullet hole in center */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="w-full h-full rounded-full bg-black border-2 border-gray-600" />
                  <div className="absolute inset-1 rounded-full bg-gray-800" />
                </motion.div>

                {/* Cracks radiating from center */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 h-0.5 bg-gray-700 origin-left"
                    style={{
                      width: `${80 + Math.random() * 100}px`,
                      transform: `rotate(${(i * 45) + (Math.random() * 20 - 10)}deg)`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.8 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.1 + i * 0.02,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Secondary smaller cracks */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`sub-${i}`}
                    className="absolute top-1/2 left-1/2 h-px bg-gray-600 origin-left"
                    style={{
                      width: `${30 + Math.random() * 50}px`,
                      transform: `rotate(${(i * 30) + (Math.random() * 30)}deg) translate(${30 + Math.random() * 40}px, 0)`,
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.6 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.15 + i * 0.015,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Impact particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full"
                    initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                    animate={{
                      scale: [1, 0],
                      opacity: [1, 0],
                      x: (Math.random() - 0.5) * 150,
                      y: (Math.random() - 0.5) * 150,
                    }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}

                {/* Shockwave effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-red-500 rounded-full"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Animated Product Text (Bottom Right) --- */}
      <motion.div 
        // RESPONSIVE CHANGE: Rescaled positioning (smaller on mobile)
        className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 md:bottom-16 md:right-16 z-30 text-right text-white pointer-events-none"
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          // RESPONSIVE CHANGE: Rescaled font
          className="text-base sm:text-lg md:text-xl font-sans"
          variants={textItemVariants}
        >
          9x19mm
        </motion.p>
        
        <motion.h1
          // RESPONSIVE CHANGE: Rescaled font
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter -my-1 sm:-my-2"
          variants={textItemVariants}
        >
          G72-P
        </motion.h1>

        <motion.p
          // RESPONSIVE CHANGE: Rescaled font
          className="text-xl sm:text-2xl md:text-3xl font-mono tracking-[0.2em]"
          variants={textItemVariants}
        >
          PISTOL
        </motion.p>
      </motion.div>

      {/* Corner Targeting Brackets */}
      {[
        { top: true, left: true },
        { top: true, right: true },
        { bottom: true, left: true },
        { bottom: true, right: true },
      ].map((pos, i) => (
        <motion.div
          key={i}
          // RESPONSIVE CHANGE: Rescaled sizes
          className="absolute w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 border-red-600 opacity-60 z-20"
          style={{
            ...(pos.top && { top: 0 }),
            ...(pos.bottom && { bottom: 0 }),
            ...(pos.left && { left: 0 }),
            ...(pos.right && { right: 0 }),
            ...(pos.top && pos.left && { borderTop: "2px solid", borderLeft: "2px solid" }),
            ...(pos.top && pos.right && { borderTop: "2px solid", borderRight: "2px solid" }),
            ...(pos.bottom && pos.left && { borderBottom: "2px solid", borderLeft: "2px solid" }),
            ...(pos.bottom && pos.right && { borderBottom: "2px solid", borderRight: "2px solid" }),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 1.5 + i * 0.1 }}
        />
      ))}
      
    </div>
  );
}