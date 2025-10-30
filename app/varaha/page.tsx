
"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- Text Content ---
const title = "VARAHA";
const description =
  "VARAHA is SSS Defence's next-generation Counter-Unmanned Aircraft System (CUAS), designed to detect, localize, and neutralize drone threats using AI-enabled acoustic signal processing and coherent sensor fusion";

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

// --- Glitch Variant for VARAHA Title ---
const glitchTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],
    x: [0, -2, 2, -4, 4, 0],
    skewX: [0, 3, -2, 5, -3, 0],
    transition: {
      delay: 3.5,
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

// --- Variants for Description and Button ---
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 3.8
    }
  }
};

const buttonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],
    x: [0, -2, 2, -4, 4, 0],
    skewX: [0, 3, -2, 5, -3, 0],
    transition: {
      delay: 4.0,
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

const VarahaPage: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const router = useRouter();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: randomValue(0, 100),
      y: randomValue(0, 100),
      duration: randomValue(8, 16),
      delay: randomValue(0, 10),
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    setIsVisible(isInView);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 flex flex-col items-center justify-start min-h-[150vh] overflow-hidden"
    >
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateY(50%) rotateX(75deg)'
          }}
          animate={isInView ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow:
                  '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)'
              }}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      transform: ['translateY(0px)', 'translateY(300px)'],
                      opacity: [0, 0.6, 0.6, 0]
                    }
                  : {
                      opacity: 0
                    }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}

          {/* Grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </motion.div>
      </div>

      {/* --- FLOOR GRID AREA --- */}
      <div
        className="absolute left-0 w-full z-0 overflow-hidden"
        style={{
          top: '90vh',
          height: '200vh',
          perspective: '1200px'
        }}
      >
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) translateZ(-100px)',
            transformOrigin: 'center top'
          }}
          animate={isInView ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ opacity: { duration: 1.5, delay: 1 } }}
        >
          {/* Grid Floor */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(14, 165, 233, 0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(14, 165, 233, 0.3) 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
              backgroundPosition: 'center top'
            }}
          />

          {/* SVG: Dots and Comets */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="dotGlow">
                <stop offset="0%" stopColor="rgba(14, 165, 233, 1)" />
                <stop offset="100%" stopColor="rgba(14, 165, 233, 0)" />
              </radialGradient>
              <filter id="cometGlowSvg" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Dots */}
            {Array.from({ length: 60 }).map((_, row) =>
              Array.from({ length: 30 }).map((_, col) => (
                <motion.circle
                  key={`${row}-${col}`}
                  cx={col * 60}
                  cy={row * 60}
                  r="3"
                  fill="url(#dotGlow)"
                  initial={{ opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: [0, 0.6, 0.8, 0.6],
                          r: [2, 3, 4, 3]
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 2,
                    delay: (row + col) * 0.02,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                />
              ))
            )}

            {/* Comets with CSS variable animation (No warning) */}
            {isInView && (
              <>
                <motion.circle
                  r="4"
                  fill="rgba(14, 165, 233, 1)"
                  filter="url(#cometGlowSvg)"
                  style={{
                    offsetPath: `path("M 0 180 H 1800")`,
                    '--offset': '0%',
                    offsetDistance: 'var(--offset)'
                  } as React.CSSProperties}
                  animate={{ '--offset': ['0%', '100%'] }}
                  transition={{
                    duration: 6,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />

                <motion.circle
                  r="4"
                  fill="rgba(14, 165, 233, 1)"
                  filter="url(#cometGlowSvg)"
                  style={{
                    offsetPath: `path("M 300 0 V 1200")`,
                    '--offset': '0%',
                    offsetDistance: 'var(--offset)'
                  } as React.CSSProperties}
                  animate={{ '--offset': ['0%', '100%'] }}
                  transition={{
                    duration: 7,
                    delay: 3.0,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />

                <motion.circle
                  r="4"
                  fill="rgba(14, 165, 233, 1)"
                  filter="url(#cometGlowSvg)"
                  style={{
                    offsetPath: `path("M 600 60 L 1200 660")`,
                    '--offset': '0%',
                    offsetDistance: 'var(--offset)'
                  } as React.CSSProperties}
                  animate={{ '--offset': ['0%', '100%'] }}
                  transition={{
                    duration: 8,
                    delay: 4.5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              </>
            )}
          </svg>

          {/* Gradient Fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.9) 100%)'
            }}
          />
        </motion.div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="drone-title"
              className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
              variants={glitchTextVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <h1 className="text-[50px] leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
                {title}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="drone-image"
              className="relative z-20 mb-8"
              initial={{ scale: 0.3, y: 200, opacity: 0 }}
              animate={{
                scale: 1,
                y: [20, 20, 0],
                opacity: 1,
                x: [0, -2, 2, -1, 1, 0]
              }}
              exit={{
                scale: 0.2,
                y: -300,
                opacity: 0,
                transition: { duration: 1.0, ease: 'easeIn' }
              }}
              transition={{
                scale: { duration: 1.5, ease: 'easeOut' },
                y: { duration: 3.5, ease: 'easeOut' },
                opacity: { duration: 1, ease: 'easeIn' },
                x: {
                  duration: 4,
                  delay: 3.5,
                  repeat: Infinity,
                  repeatType: 'mirror'
                }
              }}
            >
              <img
                src="/drone_varaha.png"
                alt="Varaha Drone"
                className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isVisible && (
            <motion.div
              key="drone-info"
              className="relative z-20 flex flex-col items-center w-full px-4"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <motion.p
                variants={descriptionVariants}
                className="max-w-xl text-center text-sm text-gray-300 md:text-base"
              >
                {description}
              </motion.p>

              <motion.button
                variants={buttonVariants}
                className="relative overflow-hidden px-6 py-3 mt-8 sm:mt-10 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                onClick={() => router.push('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
                  initial={{ x: '-150%' }}
                  animate={{ x: '250%' }}
                  transition={{
                    duration: 1.5,
                    delay: 5.0,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'linear'
                  }}
                />
                <span className="relative z-10">Explore</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default VarahaPage;

