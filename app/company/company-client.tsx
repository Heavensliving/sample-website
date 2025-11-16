"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, Variants, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// These imports must match the default exports in their respective files
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; 

// --- Hero Variants (Unchanged) ---
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

// --- Background Effects (Unchanged) ---
const ParticlesBackground = () => {
  const particles = Array.from({ length: 30 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {isClient && particles.map((_, i) => {
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        const animateX = Math.random() * window.innerWidth;
        const animateY = Math.random() * window.innerHeight;

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

// --- TAB DATA (Unchanged) ---
const tabData = [
  {
    id: 'about',
    title: 'ABOUT US',
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white mb-4">Who We Are</h3>
        <p className="text-gray-300 leading-relaxed">
          Founded in 2017 with the intent of elevating India's strong history of manufacturing to the next level, SSS Defence is not only a true example of Make in India but also a new breed of innovations dedicated to meeting specific requirements of Armed Forces, Law enforcement Agencies and their unique theatre of operations. 
        </p>
        <p className="text-gray-300 leading-relaxed">
          With a philosophy of Innovative and Smart, SSS Defence builds unique products at the highest standards of entrepreneurship. Committed to producing the highest quality products for customers in India and around the world, we refuse to settle for mediocrity. We are also investing in special projects that are defined by international standards like SOCOM without breaching Indian cost frontiers. 
        </p>
        <p className="text-gray-300 leading-relaxed">
          SSS Defence is among a rare league of companies in India to have the industrial license for operating in the realm of small arms and ammunition. From this humble starting point, SSS Defence sets out to envision a new future of defence technology that incorporates deep design thinking, precision engineering and operational excellence. 
        </p>
        <p className="text-gray-300 leading-relaxed">
          By investing in the creation of intellectual property and thereafter ensuring its translation into high performance products through our quality centric manufacturing, we are creating a new benchmark. We believe the strategic advantages of closer military-industry collaboration can only be harnessed as an OEM that aims for an international footprint and not simply as an integrator hamstrung by reliance on foreign technologies. 
        </p>
      </div>
    ),
  },
  {
    id: 'dna',
    title: 'SSS DEFENCE DNA',
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white mb-4">SSS Defence DNA</h3>
        <p className="text-gray-300 leading-relaxed">
          SSS Defence is a platform encompassing multiple verticals - Infantry & crew served weapons, Military ammunition, Precision optics integration & high performance tactical gear. Over the past 7 years, we have established ourselves as the only 100% India owned private sector OEM with proprietary designs, ownership of intellectual property and infrastructure to manufacture, test and certify our futuristic firearm products on exacting global protocols. However, we have a long history of manufacturing to mentor and guide us along the way. SSS Defence is part of the 70 year old Stumpp Schuele & Somappa Group of companies, India's largest spring manufacturing enterprise. It's in our DNA to make sure that every product engraved with the SSS Defence brand is the absolute best it can before landing up in the hands of our soldiers. Every one of us takes enormous pride in our drive toward an "Atmanirbhar Bharat". 
        </p>
      </div>
    ),
  },
  {
    id: 'bharat',
    title: 'BORN IN BHARAT',
    content: (
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-white mb-4">Born In Bharat</h3>
        <p className="text-gray-300 leading-relaxed">
          At SSS Defence, our sniper rifles, assault weapon systems and tactical gear are proudly designed and manufactured in Bharat. Our product development team represents a new generation of industrial designers, engineers, material scientists and machinists, all driven by a customer-centric mindset. For us, every design starts with a critical question: "What features of this design truly benefit our elite military and law enforcement users?"
        </p>
        <p className="text-gray-300 leading-relaxed">
          We also recognize that even the most innovative designs can fail if the materials don't meet the highest standards. That's why we never compromise on material quality. Only the finest materials are allowed on our shop floor:
        </p>
        <ul className="list-disc list-inside text-gray-300/90 space-y-1 pl-4">
          <li>Ultra-high strength stainless steel</li>
          <li>Aerospace-grade alloys</li>
          <li>Carbon-reinforced polymers</li>
          <li>Nickel-based superalloys</li>
          <li>Advanced high-performance coatings</li>
        </ul>
        <p className="text-gray-300 leading-relaxed">
          This unwavering commitment to design excellence and material integrity ensures that every SSS Defence product is built to withstand the most demanding operational environments. 
        </p>
      </div>
    ),
  },
];

// --- COMPANY PAGE COMPONENT ---
const CompanyPageClient: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabData.findIndex(tab => tab.id === activeTab);
    const activeButton = tabButtonRefs.current[activeIndex];

    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        inline: 'center', 
        block: 'nearest', 
      });
    }
  }, [activeTab]); 

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <TacticalGrid />
      <ParticlesBackground />
      <Navbar />

      <main className="flex-grow flex flex-col relative z-10">
        {/* HERO SECTION (Unchanged) */}
        <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[80vh] overflow-hidden mt-20">
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
                src="/Company/Company_Hero.png"
                alt="Company Hero Image"
                layout="fill"
                objectFit="cover"
                priority
                className="brightness-[0.65] md:brightness-[0.75]"
              />
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>
          
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
          
          <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                COMPANY
              </h1>
              
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
                COMPANY
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>

        {/* MODERN TAB SECTION (Unchanged) */}
        <section className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="relative max-w-6xl mx-auto mb-16">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-red-500/10 to-red-600/5 blur-3xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div
              ref={scrollContainerRef}
              className="hide-scrollbar relative flex overflow-x-auto whitespace-nowrap justify-start md:justify-center gap-3 md:gap-4 lg:gap-6 2xl:gap-8 p-4 pb-6 rounded-2xl backdrop-blur-sm bg-white/[0.02] border border-white/[0.05]"
            >
              {tabData.map((tab, index) => (
                <motion.button
                  key={tab.id}
                  ref={(el) => {
                    tabButtonRefs.current[index] = el;
                  }}
                  onClick={() => setActiveTab(tab.id)}
                  
                  className={`relative flex-shrink-0 uppercase font-black tracking-wider text-xs md:text-sm lg:text-base 2xl:text-lg py-4 px-6 md:px-8 rounded-xl transition-all duration-500 ease-out focus:outline-none group overflow-hidden ${
                    activeTab === tab.id 
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-red-800/30 to-red-700/20 border border-red-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {activeTab !== tab.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/[0.03] rounded-xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute inset-0 overflow-hidden rounded-xl"
                      initial={false}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                        animate={{
                          y: ['-200%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  )}
                  
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.title}
                    {activeTab === tab.id && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="inline-block w-1.5 h-1.5 bg-white rounded-full"
                      />
                    )}
                  </span>
                  
                  {activeTab === tab.id && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    </>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content with Modern Card Design (Unchanged) */}
          <div className="max-w-5xl mx-auto relative">
            <motion.div
              className="absolute -inset-[1px] bg-gradient-to-r from-red-600/20 via-red-500/30 to-red-600/20 rounded-3xl blur-xl"
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-md border border-white/[0.08] rounded-3xl p-8 md:p-12 lg:p-16 2xl:p-20 min-h-[400px] overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-red-600/20 rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-red-600/20 rounded-br-3xl" />
              
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="content-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#content-grid)" />
                </svg>
              </div>
              
              <AnimatePresence mode="wait">
                {tabData.map((tab) =>
                  activeTab === tab.id ? (
                    <motion.div
                      key={tab.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="relative text-base md:text-lg 2xl:text-xl"
                    >
                      {tab.content}
                    </motion.div>
                  ) : null
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

// This default export is correct
export default CompanyPageClient;