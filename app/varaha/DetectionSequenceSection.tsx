"use client";

import React, { memo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import DomeCanvas from './domeCanvas'; // Importing the sensor model

// --- Helper SVG Icons ---

const IconControlRoom = () => (
  <svg 
    className="w-12 h-12 text-blue-400" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
    <path d="M4 6h16v12H4z" />
    <path d="M4 10h16" />
    <path d="M4 14h16" />
    <path d="M8 18h8" />
  </svg>
);

const IconEffector = () => (
  <svg 
    className="w-10 h-10 text-red-400" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14v-2a7 7 0 10-14 0v2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 22h8" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l4-4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4V2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10V8" />
  </svg>
);


// --- Main Animation Component ---

const DetectionSequenceSection: React.FC = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  
  // Animation stages:
  // 0: Idle
  // 1: Drone approaching border
  // 2: Drone near border, detection waves + sensor-to-control pulse (tracking)
  // 3: Control-to-gun pulse + gun fires
  // 4: Drone hit (explosion)
  // 5: Drone disappears
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isInView && stage === 0) {
      const sequence = async () => {
        // Start drone approach
        setStage(1);
        await new Promise(r => setTimeout(r, 3500)); // Drone moves for 3.5s
        
        // Start detection & tracking
        setStage(2);
        await new Promise(r => setTimeout(r, 4000)); // Track for 4s
        
        // Fire
        setStage(3);
        await new Promise(r => setTimeout(r, 700)); // Firing sequence 0.7s
        
        // Hit
        setStage(4);
        await new Promise(r => setTimeout(r, 500)); // Explosion 0.5s

        // Done
        setStage(5);
      };
      sequence();
    }
  }, [isInView, stage]);

  return (
    <section 
      ref={ref} 
      className="relative w-full h-screen bg-black text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2 
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Live Detection Sequence
      </motion.h2>
      
      {/* The Animation "Stage" */}
      <motion.div 
        className="relative w-full h-[70vh] max-w-7xl mx-auto bg-gray-900/50 border border-blue-500/30 rounded-lg p-4 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* --- Scenery --- */}
        <motion.div 
          className="absolute top-0 bottom-0 w-1 border-l-2 border-dashed border-red-500/70"
          style={{ left: '50%' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-red-500 font-bold text-xs uppercase whitespace-nowrap">Border</div>
        </motion.div>
        
        <div className="absolute right-4 top-2 text-green-500 font-bold text-sm uppercase">Secure Zone</div>
        <div className="absolute left-4 top-2 text-red-500 font-bold text-sm uppercase">Hostile Zone</div>

        {/* --- Static Assets --- */}
        <motion.div
          className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24"
          style={{ right: '35%', bottom: '20%' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          <DomeCanvas />
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">Sensor 1</span>
        </motion.div>
        
        <motion.div
          className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24"
          style={{ right: '30%', bottom: '45%' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <DomeCanvas />
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400">Sensor 2</span>
        </motion.div>

        <motion.div
          className="absolute z-10 flex flex-col items-center"
          style={{ right: '10%', bottom: '10%' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
        >
          <IconControlRoom />
          <span className="text-sm">Control Room</span>
        </motion.div>

        <motion.div
          className="absolute z-10 flex flex-col items-center"
          style={{ right: '40%', bottom: '10%' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
        >
          <IconEffector />
          <span className="text-sm">Effector</span>
        </motion.div>

        {/* --- Animated Elements --- */}
        
        {/* 1. The Drone */}
        <motion.div
          className="absolute z-20 w-24 h-auto sm:w-32"
          style={{ top: '30%', left: '5%' }} // Start position
          animate={{
            // Stage 1: Approach border
            left: stage >= 1 ? '40%' : '5%', 
            // Stage 2: Cross border
            right: stage >= 2 ? '52%' : '40%', 
            top: stage >= 2 ? '35%' : '30%',
            // Stage 5: Disappear
            opacity: stage >= 5 ? 0 : 1,
            scale: stage >= 5 ? 0.5 : 1,
          }}
          transition={{ duration: 3.5, ease: 'linear' }}
        >
          <Image src="/drone_varaha.png" alt="Varaha Drone" width={150} height={100} />
        </motion.div>

        <AnimatePresence>
          {/* 2. Acoustic Waves (while tracking) */}
          {stage === 2 && (
            <motion.div
              className="absolute"
              style={{ top: '35%', left: '52%' }} // Drone's tracked position
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute w-4 h-4 rounded-full border-2 border-cyan-500"
                style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 8, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                className="absolute w-4 h-4 rounded-full border-2 border-cyan-500"
                style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 8, opacity: 0 }}
                transition={{ duration: 2, delay: 1, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>
          )}

          {/* 3. Sensor-to-Control Pulse (while tracking) */}
          {stage === 2 && (
            <>
              {/* From Sensor 1 */}
              <motion.div
                className="absolute w-3 h-3 bg-blue-500 rounded-full z-30"
                style={{ right: '37%', bottom: '26%' }} // Start at sensor 1
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  right: ['37%', '12%'],
                  bottom: ['26%', '15%'],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                exit={{ opacity: 0 }}
              />
              {/* From Sensor 2 */}
              <motion.div
                className="absolute w-3 h-3 bg-blue-500 rounded-full z-30"
                style={{ right: '32%', bottom: '51%' }} // Start at sensor 2
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  right: ['32%', '12%'],
                  bottom: ['51%', '15%'],
                }}
                transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'linear' }}
                exit={{ opacity: 0 }}
              />
            </>
          )}

          {/* 4. Control-to-Gun Pulse */}
          {stage === 3 && (
            <motion.div
              className="absolute w-3 h-3 bg-red-500 rounded-full z-30"
              style={{ right: '12%', bottom: '15%' }} // Start at control room
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                right: ['12%', '41%'],
                bottom: ['15%', '15%'],
              }}
              transition={{ duration: 0.5, ease: 'linear' }}
            />
          )}

          {/* 5. Gun Fire */}
          {stage === 3 && (
            <motion.svg className="absolute inset-0 z-30 pointer-events-none">
              <motion.line
                x1="60%" y1="88%" // Gun position (right: 40%, bottom: 12%)
                x2="55%" y2="40%" // Drone position (left: 52%, top: 35%)
                stroke="yellow"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.2, ease: 'linear', delay: 0.5 }}
              />
            </motion.svg>
          )}

          {/* 6. Explosion */}
          {stage === 4 && (
            <motion.div
              className="absolute w-16 h-16 bg-red-600 rounded-full z-40"
              style={{ top: '35%', left: '52%' }} // Drone position
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}

        </AnimatePresence>
      </motion.div>
    </section>
  );
});

DetectionSequenceSection.displayName = 'DetectionSequenceSection';
export default DetectionSequenceSection;