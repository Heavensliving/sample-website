"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Download } from 'lucide-react'; // <-- Import Download icon

// 1. Data transcribed from your image
const partsData = [
  {
    id: 'sight',
    name: 'HOLOGRAPHIC SIGHT',
    description: [
      'Rapid target acquisition with illuminated reticle technology',
      'Multi-brightness settings for varied lighting conditions',
      'Shockproof and water-resistant housing ensures reliability in combat environments',
    ],
    position: { top: '22%', left: '48%' }, // Position of the hotspot
  },
  {
    id: 'dustCover',
    name: 'DUST COVER',
    description: [
      'Precision-machined from Steel alloys for rigidity and zero retention',
      'Integral Picatinny rail for mounting optics',
    ],
    position: { top: '35%', left: '30%' },
  },
  {
    id: 'buttstock',
    name: 'BUTTSTOCK',
    description: [
      'Integrated cheek rest for improved eye alignment with optics',
      'Built-in rubberized recoil pad for shooter comfort and control',
      'Collapsible design for customizable length of pull',
    ],
    position: { top: '45%', left: '15%' },
  },
  {
    id: 'pistolGrip',
    name: 'PISTOL GRIP',
    description: [
      'Designed for optimal trigger reach and wrist alignment',
      'Anti-slip surface with finger grooves for a secure hold',
      'Durable composite build for field-tough performance',
    ],
    position: { top: '55%', left: '40%' },
  },
  {
    id: 'verticalGrip',
    name: 'VERTICAL HAND GRIP',
    description: [
      'Ergonomic design for superior weapon control',
      'Reduces recoil fatigue during extended engagements',
      'Tapered space ensures solid grip in wet or gloved conditions',
    ],
    position: { top: '60%', left: '55%' },
  },
  {
    id: 'handGuard',
    name: 'HAND GUARD',
    description: [
      'Milled 6061 aluminum with hard anodizing',
      'Coplanar top rail for aligned optics and devices',
      'Picatinny rails at 3, 6, 9 & 12 o\'clock',
      'Lightweight (~290g) with quick cooling and tool-free fit',
    ],
    position: { top: '38%', left: '60%' },
  },
  {
    id: 'slingSwivel',
    name: 'SLING SWIVEL',
    description: [
      'Heavy-duty sling swivel for single- or two-point sling setups',
      'Quick-detach (QD) compatible for rapid transitions',
    ],
    position: { top: '40%', left: '85%' },
  },
];

type Part = typeof partsData[0];

// 2. The Hotspot Component (No change)
const Hotspot: React.FC<{
  part: Part;
  onClick: () => void;
  isActive: boolean;
}> = ({ part, onClick, isActive }) => (
  <motion.button
    className="absolute z-20"
    style={{ ...part.position }}
    onClick={onClick}
    whileHover={{ scale: 1.2 }}
  >
    <motion.div
      className={`w-5 h-5 rounded-full border-2 bg-black/40 backdrop-blur-sm transition-colors ${
        isActive ? 'border-red-500' : 'border-white/50'
      }`}
      animate={{
        scale: isActive ? [1, 1.3, 1] : [1, 1.1, 1],
      }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <motion.div
      className={`absolute w-3 h-3 rounded-full bg-red-500 transition-colors ${
        isActive ? 'opacity-100' : 'opacity-50'
      }`}
      style={{ top: '50%', left: '50%', x: '-50%', y: '-50%' }}
      animate={{
        scale: isActive ? 1 : 0.8,
      }}
    />
  </motion.button>
);

// 3. The Main Detail Component
const AkUpgradeKitDetail: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedPart, setSelectedPart] = useState<Part>(partsData[0]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Close Button (No change) */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/50 hover:text-red-500 transition-colors"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <X size={40} />
      </motion.button>

      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 gap-8 relative overflow-hidden">
        
        {/* Image & Hotspots (Left/Top) (No change) */}
        <motion.div
          className="w-full lg:w-3/5 h-auto relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <Image
            src="/Accessories/Ak.png" // This path is from your original code
            alt="AK Upgrade Kit"
            width={1200}
            height={600}
            layout="responsive"
            objectFit="contain"
          />
          {partsData.map((part) => (
            <Hotspot
              key={part.id}
              part={part}
              isActive={selectedPart.id === part.id}
              onClick={() => setSelectedPart(part)}
            />
          ))}
        </motion.div>

        {/* Info Panel (Right/Bottom) */}
        <motion.div
          className="w-full lg:w-2/5 h-full flex flex-col justify-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          {/* This part animates on hotspot click */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPart.id} // This key is crucial for AnimatePresence
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-wider text-red-500 mb-4">
                {selectedPart.name}
              </h2>
              <ul className="space-y-3">
                {selectedPart.description.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1.5">&#9679;</span>
                    <span className="text-white/80 text-sm lg:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* --- UPDATED DOWNLOAD BUTTON --- */}
          <motion.a
            href="/downloadable/AK 47 Upgrade Kit Flyer.pdf"
            download
            className="mt-6 flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-transparent border border-red-500 text-red-500 
                       font-semibold uppercase tracking-wider rounded-lg transition-all 
                       hover:bg-red-500 hover:text-white active:scale-95"
            // This animation makes it fade in with the panel
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }} // Delayed fade-in
          >
            <Download size={18} />
            Download Brochure
          </motion.a>
          {/* --- END OF UPDATED BUTTON --- */}

        </motion.div>

      </div>
    </motion.div>
  );
};

export default AkUpgradeKitDetail;