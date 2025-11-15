// // "use client";

// // import React, {
// //   useRef,
// //   useState,
// //   useEffect,
// //   memo,
// //   useLayoutEffect,
// // } from 'react';
// // import {
// //   motion,
// //   useInView,
// //   Variants,
// //   AnimatePresence,
// //   useScroll,
// //   useTransform,
// //   MotionValue
// // } from 'framer-motion';
// // import { useRouter } from 'next/navigation';
// // import Image from 'next/image';
// // import EarthCanvas from './earthCanvas';
// // import DomeCanvas from './domeCanvas';

// // // --- Text Content ---
// // const title = "VARAHA";
// // const description =
// //   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// // // --- Particle Type ---
// // interface Particle {
// //   id: number;
// //   x: number;
// //   y: number;
// //   duration: number;
// //   delay: number;
// // }

// // // --- Random Value Function ---
// // const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // // --- Glitch Variant for VARAHA Title ---
// // const glitchTextVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 3.5,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- Variants for Description and Button ---
// // const descriptionVariants: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.8,
// //       ease: 'easeOut',
// //       delay: 3.8,
// //     },
// //   },
// // };

// // const buttonVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 4.0,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- HeroSection Component ---
// // const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
// //   onAnimationComplete,
// // }) => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.2 });
// //   const router = useRouter();

// //   return (
// //     <section
// //       ref={ref}
// //       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
// //     >
// //       <MemoizedParticles isInView={isInView} />
// //       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-title"
// //               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
// //               variants={glitchTextVariants}
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
// //                 {title}
// //               </h1>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-image"
// //               className="relative z-20 mb-8"
// //               initial={{ scale: 0.3, y: 200, opacity: 0 }}
// //               animate={{
// //                 scale: 1,
// //                 y: [20, 20, 0],
// //                 opacity: 1,
// //                 x: [0, -2, 2, -1, 1, 0],
// //               }}
// //               transition={{
// //                 scale: { duration: 1.5, ease: 'easeOut' },
// //                 y: { duration: 3.5, ease: 'easeOut' },
// //                 opacity: { duration: 1, ease: 'easeIn' },
// //                 x: {
// //                   duration: 4,
// //                   delay: 3.5,
// //                   repeat: Infinity,
// //                   repeatType: 'mirror',
// //                 },
// //               }}
// //             >
// //               <Image
// //                 src="/drone_varaha.png"
// //                 alt="Varaha Drone"
// //                 width={800}
// //                 height={600}
// //                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
// //                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
// //                 priority
// //               />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-info"
// //               className="relative z-20 flex flex-col items-center w-full px-4"
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <motion.p
// //                 variants={descriptionVariants}
// //                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
// //               >
// //                 {description}
// //               </motion.p>

// //               <motion.div
// //                 variants={buttonVariants}
// //                 onAnimationComplete={onAnimationComplete}
// //                 className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10"
// //               >
// //                 {/* Button 1: Explore Capabilities */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
// //                   onClick={() => router.push('/')}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <motion.span
// //                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
// //                     initial={{ x: '-150%' }}
// //                     animate={{ x: '250%' }}
// //                     transition={{
// //                       duration: 1.5,
// //                       delay: 5.0,
// //                       repeat: Infinity,
// //                       repeatDelay: 5,
// //                       ease: 'linear',
// //                     }}
// //                   />
// //                   <span className="relative z-10">Explore Capabilities</span>
// //                 </motion.button>

// //                 {/* Button 2: Request Demo */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
// //                   onClick={() => router.push('/request-demo')}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <span className="relative z-10">Request Demo</span>
// //                 </motion.button>
// //               </motion.div>

// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </motion.div>
// //     </section>
// //   );
// // };
// // HeroSection.displayName = "HeroSection";

// // // --- MemoizedParticles Component ---
// // const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
// //   ({ isInView }) => {
// //     const [particles, setParticles] = useState<Particle[]>([]);
// //     useEffect(() => {
// //       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
// //         id: i,
// //         x: randomValue(0, 100),
// //         y: randomValue(0, 100),
// //         duration: randomValue(8, 16),
// //         delay: randomValue(0, 10),
// //       }));
// //       setParticles(generatedParticles);
// //     }, []);

// //     return (
// //       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
// //         <motion.div
// //           className="absolute w-full h-full"
// //           style={{
// //             transformStyle: 'preserve-3d',
// //             transform: 'translateY(50%) rotateX(75deg)',
// //           }}
// //           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
// //           transition={{ duration: 2, ease: 'easeInOut' }}
// //         >
// //           {particles.map((particle) => (
// //             <motion.div
// //               key={particle.id}
// //               className="absolute w-1 h-1 bg-blue-500 rounded-full"
// //               style={{
// //                 left: `${particle.x}%`,
// //                 top: `${particle.y}%`,
// //                 boxShadow:
// //                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
// //               }}
// //               initial={{ opacity: 0 }}
// //               animate={
// //                 isInView
// //                   ? {
// //                       transform: ['translateY(0px)', 'translateY(300px)'],
// //                       opacity: [0, 0.6, 0.6, 0],
// //                     }
// //                   : {
// //                       opacity: 0,
// //                     }
// //               }
// //               transition={{
// //                 duration: particle.duration,
// //                 delay: particle.delay,
// //                 repeat: Infinity,
// //                 ease: 'linear',
// //               }}
// //             />
// //           ))}
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage: `
// //                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
// //                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
// //               `,
// //               backgroundSize: '40px 40px',
// //             }}
// //           />
// //         </motion.div>
// //       </div>
// //     );
// //   }
// // );
// // MemoizedParticles.displayName = 'MemoizedParticles';

// // // --- Animated Drone Icon Component ---
// // const DroneIcon: React.FC = () => (
// //   <motion.svg
// //     width="40"
// //     height="40"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="#00BFFF"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //     style={{
// //       filter: 'drop-shadow(0 0 8px #00BFFF)',
// //     }}
// //     initial={{ scale: 0.8, opacity: 0.8 }}
// //     animate={{ scale: 1, opacity: 1 }}
// //     transition={{
// //       duration: 0.8,
// //       repeat: Infinity,
// //       repeatType: 'mirror',
// //     }}
// //   >
// //     <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M12 12L6 6" />
// //     <path d="M12 12l6 6" />
// //     <path d="M12 12L6 18" />
// //     <path d="M12 12l6-6" />
// //     <path d="M6 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M6 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //   </motion.svg>
// // );

// // // --- Animated SVG Path Component ---
// // const AnimatedPathComponent: React.FC<{
// //   containerRef: React.RefObject<HTMLDivElement | null>
// // }> = ({ containerRef }) => {
// //   const pathRef = useRef<SVGPathElement>(null);
// //   const [pathLength, setPathLength] = useState(0);

// //   const { scrollYProgress } = useScroll({ target: containerRef });

// //   const pathProgress = useTransform(
// //     scrollYProgress,
// //     [0.1, 0.9],
// //     [0, 1]
// //   );

// //   useLayoutEffect(() => {
// //     if (pathRef.current) {
// //       setPathLength(pathRef.current.getTotalLength());
// //     }
// //   }, []);

// //   const offsetDistance = useTransform(pathProgress, val => `${val * pathLength}px`);

// //   return (
// //     <div className="absolute inset-0 z-10 overflow-visible">
// //       <svg width="100%" height="100%" viewBox="0 0 1000 3000" preserveAspectRatio="none" className="overflow-visible">
// //         <motion.path
// //           ref={pathRef}
// //           d="M 950 150
// //              C 700 250, 200 350, 200 600
// //              L 200 900
// //              C 200 1150, 800 1250, 800 1500
// //              L 800 1700
// //              C 800 1950, 200 2050, 200 2300
// //              L 200 2800"
// //           fill="none"
// //           stroke="#00BFFF"
// //           strokeWidth="2"
// //           strokeDasharray="4 12"
// //           opacity={0.5}
// //         />
// //       </svg>
// //     </div>
// //   );
// // };

// // // --- CheckListItem Component ---
// // const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
// //   <li className="flex items-start gap-3">
// //     <svg
// //       className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //       />
// //     </svg>
// //     <span className="text-gray-300">{children}</span>
// //   </li>
// // );

// // // --- ContentSections Component ---
// // const ContentSections: React.FC = memo(() => {
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   const AnimatedSection: React.FC<{
// //     children: React.ReactNode;
// //     className?: string;
// //     delay?: number;
// //   }> = ({
// //     children,
// //     className = "",
// //     delay = 0
// //   }) => {
// //     const ref = useRef(null);
// //     const isInView = useInView(ref, { once: true, amount: 0.15 });

// //     return (
// //       <motion.div
// //         ref={ref}
// //         className={`relative z-20 ${className}`}
// //         initial={{ opacity: 0, y: 80, scale: 0.95 }}
// //         animate={isInView ? {
// //           opacity: 1,
// //           y: 0,
// //           scale: 1
// //         } : {}}
// //         transition={{
// //           duration: 0.9,
// //           delay: delay,
// //           ease: [0.25, 0.46, 0.45, 0.94]
// //         }}
// //       >
// //         {children}
// //       </motion.div>
// //     );
// //   };

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="relative py-20 sm:py-32 text-white overflow-hidden"
// //     >
// //       <AnimatedPathComponent containerRef={containerRef} />

// //       <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">

// //         {/* Section 1: Born in Bharat */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //           <motion.div
// //             className="space-y-6 lg:col-start-1"
// //             initial={{ opacity: 0, x: -60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               Born in Bharat. Built for the Battlefield.
// //             </motion.h2>
// //             <motion.p
// //               className="text-lg text-gray-300 leading-relaxed"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               The changing face of warfare has turned drones into one of the most pervasive asymmetric threats. Small, low-cost, and often resistant to jamming, these systems challenge traditional radar and RF-based defences.
// //             </motion.p>
// //             <motion.p
// //               className="text-gray-300 leading-relaxed"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.5 }}
// //             >
// //               VARAHA redefines counter-drone strategy through an acoustic-driven detection architecture that listens before others can see. By harnessing directional acoustic arrays, distributed AI compute, and multi-sensor fusion, it provides early-warning, precise localization, and seamless cueing for hard-kill or electronic-warfare countermeasures — all while remaining completely passive and undetectable.
// //             </motion.p>
// //           </motion.div>
// //           <div className="lg:col-start-2"></div>
// //         </AnimatedSection>

// //         {/* Section 2: Why Acoustic Detection */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <div className="lg:col-start-1"></div>
// //           <motion.div
// //             className="space-y-6 lg:col-start-2"
// //             initial={{ opacity: 0, x: 60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               WHY ACOUSTIC DETECTION MATTERS
// //             </motion.h2>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 { title: 'Detects the undetectable', desc: 'Operates independently of RF signatures or radar reflections.' },
// //                 { title: 'Stealth-first architecture', desc: 'Emits no electronic signal; immune to jamming and detection.' },
// //                 { title: 'AI-driven accuracy', desc: 'Neural-network models identify drone signatures in real time.' },
// //                 { title: 'Scalable deployment', desc: 'From compact man-portable units to perimeter-wide networks.' },
// //                 { title: 'All-weather reliability', desc: 'Functions in radar-shadowed, cluttered, or GPS-denied zones.' }
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: 30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>
// //                     <strong>{item.title}</strong> – {item.desc}
// //                   </CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 3: Mission Profiles */}
// //         <AnimatedSection className="flex flex-col items-center" delay={0.15}>
// //           <motion.h2
// //             className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             MISSION PROFILES
// //           </motion.h2>
// //           <motion.div
// //             className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
// //             initial={{ opacity: 0, y: 40 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, amount: 0.2 }}
// //             transition={{ duration: 0.8, delay: 0.3 }}
// //             whileHover={{
// //               boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
// //               borderColor: "rgba(59, 130, 246, 0.5)"
// //             }}
// //           >
// //             <table className="w-full min-w-[700px] border-collapse text-left">
// //               <thead>
// //                 <tr className="border-b border-blue-500/30">
// //                   <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Scenario</th>
// //                   <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Capability</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-blue-500/30">
// //                 {[
// //                   { scenario: 'Base & Airfield Protection', capability: 'Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.' },
// //                   { scenario: 'Special Forces', capability: 'Miniaturized variant provides hemispheric passive detection via body-worn UI.' },
// //                   { scenario: 'Advanced Perimeter Defence', capability: '360° sensor fusion array detects anomalies and cues hard-kill platforms.' },
// //                   { scenario: 'Naval Operations', capability: 'Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.' },
// //                   { scenario: 'Mobile/Mechanized Units', capability: 'Vehicle-mounted variant for on-the-move protection against aerial threats.' }
// //                 ].map((row, index) => (
// //                   <motion.tr
// //                     key={index}
// //                     initial={{ opacity: 0, x: -20 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
// //                     whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
// //                   >
// //                     <td className="p-4 sm:p-5 font-semibold">{row.scenario}</td>
// //                     <td className="p-4 sm:p-5 text-gray-300">{row.capability}</td>
// //                   </motion.tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 4: Interface & Control */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <motion.div
// //             className="space-y-6 lg:col-start-1"
// //             initial={{ opacity: 0, x: -60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h3
// //               className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               INTERFACE & CONTROL
// //             </motion.h3>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 { title: 'Browser Dashboard:', desc: 'Real-time map, sensor feed, and threat visualization.' },
// //                 { title: 'API Integration:', desc: 'Machine-to-Machine communication for C2 systems.' },
// //                 { title: 'Multi-Platform Access:', desc: 'Optimized for laptops, tablets, and soldier-worn devices.' },
// //                 { title: 'Operator Modes:', desc: 'Manual verification, semi-autonomous cueing, and policy-driven automation.' }
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: -30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>
// //                     <strong>{item.title}</strong> {item.desc}
// //                   </CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //           <div className="lg:col-start-2"></div>
// //         </AnimatedSection>

// //         {/* Section 5: System Highlights */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <div className="lg:col-start-1"></div>
// //           <motion.div
// //             className="space-y-6 lg:col-start-2"
// //             initial={{ opacity: 0, x: 60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h3
// //               className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               SYSTEM HIGHLIGHTS
// //             </motion.h3>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 '100% Passive Detection System',
// //                 'AI-Enabled Acoustic Intelligence',
// //                 'Radar & EO Cueing Integration',
// //                 'Hard-Kill Ready Architecture',
// //                 'Miniaturized Special-Forces Variant',
// //                 'Naval Adaptability',
// //                 'Scalable Deployment Network'
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: 30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>{item}</CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 6: Mission Advantage */}
// //         <AnimatedSection className="text-center flex flex-col items-center" delay={0.15}>
// //           <motion.h3
// //             className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //             initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //             whileInView={{ opacity: 1, scale: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             MISSION ADVANTAGE
// //           </motion.h3>
// //           <motion.p
// //             className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8, delay: 0.4 }}
// //           >
// //             When milliseconds define survival, VARAHA ensures the operator hears first — and acts faster.
// //           </motion.p>
// //         </AnimatedSection>
// //       </div>
// //     </div>
// //   );
// // });
// // ContentSections.displayName = 'ContentSections';

// // // --- SignalBeam Component ---
// // const SignalBeam: React.FC = memo(() => {
// //   return (
// //     <svg
// //       className="absolute inset-0 w-full h-full pointer-events-none"
// //       style={{ overflow: 'visible' }}
// //     >
// //       <defs>
// //         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
// //           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
// //         </linearGradient>
// //       </defs>

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="url(#beam-gradient)"
// //         strokeWidth="2"
// //       />

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="#fff"
// //         strokeWidth="2"
// //         strokeDasharray="10 15"
// //         initial={{ strokeDashoffset: 0 }}
// //         animate={{ strokeDashoffset: -25 }}
// //         transition={{
// //           duration: 1,
// //           repeat: Infinity,
// //           ease: 'linear',
// //         }}
// //       />
// //     </svg>
// //   );
// // });
// // SignalBeam.displayName = 'SignalBeam';

// // // --- SceneWithSensors Component ---
// // const SceneWithSensors: React.FC = memo(() => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.3 });

// //   return (
// //     <motion.section
// //       ref={ref}
// //       className="relative w-full h-screen overflow-hidden bg-black"
// //       style={{ perspective: '1000px' }}
// //       initial={{ opacity: 0 }}
// //       animate={isInView ? { opacity: 1 } : {}}
// //       transition={{ duration: 1.2 }}
// //     >
// //       {/* 1. The Earth on the right */}
// //       <motion.div
// //         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
// //         initial={{ opacity: 0, x: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         <EarthCanvas />
// //       </motion.div>

// //       {/* 2. The Sensors on the bottom-left */}
// //       <motion.div
// //         className="absolute bottom-4 left-4 flex items-end"
// //         initial={{ opacity: 0, y: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         {/* The "longer one" (small size, further back) */}
// //         <motion.div
// //           className="w-32 h-32 lg:w-40 lg:h-40"
// //           initial={{ opacity: 0, x: -30 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.7 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>

// //         {/* The "closer one" (large size, in front) */}
// //         <motion.div
// //           className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.9 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>
// //       </motion.div>

// //       {/* 3. The Signal Beam */}
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={isInView ? { opacity: 1 } : {}}
// //         transition={{ duration: 0.8, delay: 1.1 }}
// //       >
// //         <SignalBeam />
// //       </motion.div>

// //     </motion.section>
// //   );
// // });
// // SceneWithSensors.displayName = 'SceneWithSensors';

// // // --- Main Page Component ---
// // const VarahaPage: React.FC = () => {
// //   const [isHeroComplete, setIsHeroComplete] = useState(false);

// //   useEffect(() => {
// //     const htmlElement = document.documentElement;
// //     const bodyElement = document.body;

// //     if (isHeroComplete) {
// //       htmlElement.style.overflow = '';
// //       bodyElement.style.overflow = '';
// //     } else {
// //       htmlElement.style.overflow = 'hidden';
// //       bodyElement.style.overflow = 'hidden';
// //     }

// //     return () => {
// //       htmlElement.style.overflow = '';
// //       bodyElement.style.overflow = '';
// //     };
// //   }, [isHeroComplete]);

// //   return (
// //     <main className="bg-black">
// //       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />

// //       {isHeroComplete && <ContentSections />}

// //       {isHeroComplete && <SceneWithSensors />}
// //     </main>
// //   );
// // };

// // export default VarahaPage;

// // "use client";

// // import React, {
// //   useRef,
// //   useState,
// //   useEffect,
// //   memo,
// //   useLayoutEffect,
// // } from 'react';
// // import {
// //   motion,
// //   useInView,
// //   Variants,
// //   AnimatePresence,
// //   useScroll,
// //   useTransform,
// //   MotionValue
// // } from 'framer-motion';
// // import { useRouter } from 'next/navigation';
// // import Image from 'next/image';
// // import EarthCanvas from './earthCanvas';
// // import DomeCanvas from './domeCanvas';
// // // --- ADDED IMPORT ---
// // import DetectionSequenceSection from './DetectionSequenceSection';

// // // --- Text Content ---
// // const title = "VARAHA";
// // const description =
// //   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// // // --- Particle Type ---
// // interface Particle {
// //   id: number;
// //   x: number;
// //   y: number;
// //   duration: number;
// //   delay: number;
// // }

// // // --- Random Value Function ---
// // const randomValue = (min: number, max: number) => Math.random() * (max - min) + min;

// // // --- Glitch Variant for VARAHA Title ---
// // const glitchTextVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 3.5,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- Variants for Description and Button ---
// // const descriptionVariants: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.8,
// //       ease: 'easeOut',
// //       delay: 3.8,
// //     },
// //   },
// // };

// // const buttonVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 4.0,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- HeroSection Component ---
// // const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
// //   onAnimationComplete,
// // }) => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.2 });
// //   const router = useRouter();

// //   return (
// //     <section
// //       ref={ref}
// //       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
// //     >
// //       <MemoizedParticles isInView={isInView} />
// //       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-title"
// //               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
// //               variants={glitchTextVariants}
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
// //                 {title}
// //               </h1>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-image"
// //               className="relative z-20 mb-8"
// //               initial={{ scale: 0.3, y: 200, opacity: 0 }}
// //               animate={{
// //                 scale: 1,
// //                 y: [20, 20, 0],
// //                 opacity: 1,
// //                 x: [0, -2, 2, -1, 1, 0],
// //               }}
// //               transition={{
// //                 scale: { duration: 1.5, ease: 'easeOut' },
// //                 y: { duration: 3.5, ease: 'easeOut' },
// //                 opacity: { duration: 1, ease: 'easeIn' },
// //                 x: {
// //                   duration: 4,
// //                   delay: 3.5,
// //                   repeat: Infinity,
// //                   repeatType: 'mirror',
// //                 },
// //               }}
// //             >
// //               <Image
// //                 src="/drone_varaha.png"
// //                 alt="Varaha Drone"
// //                 width={800}
// //                 height={600}
// //                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
// //                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
// //                 priority
// //               />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-info"
// //               className="relative z-20 flex flex-col items-center w-full px-4"
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <motion.p
// //                 variants={descriptionVariants}
// //                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
// //               >
// //                 {description}
// //               </motion.p>

// //               <motion.div
// //                 variants={buttonVariants}
// //                 onAnimationComplete={onAnimationComplete}
// //                 className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10"
// //               >
// //                 {/* Button 1: Explore Capabilities */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
// //                   onClick={() => router.push('/')}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <motion.span
// //                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
// //                     initial={{ x: '-150%' }}
// //                     animate={{ x: '250%' }}
// //                     transition={{
// //                       duration: 1.5,
// //                       delay: 5.0,
// //                       repeat: Infinity,
// //                       repeatDelay: 5,
// //                       ease: 'linear',
// //                     }}
// //                   />
// //                   <span className="relative z-10">Explore Capabilities</span>
// //                 </motion.button>

// //                 {/* Button 2: Request Demo */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
// //                   onClick={() => router.push('/request-demo')}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <span className="relative z-10">Request Demo</span>
// //                 </motion.button>
// //               </motion.div>

// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </motion.div>
// //     </section>
// //   );
// // };
// // HeroSection.displayName = "HeroSection";

// // // --- MemoizedParticles Component ---
// // const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
// //   ({ isInView }) => {
// //     const [particles, setParticles] = useState<Particle[]>([]);
// //     useEffect(() => {
// //       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
// //         id: i,
// //         x: randomValue(0, 100),
// //         y: randomValue(0, 100),
// //         duration: randomValue(8, 16),
// //         delay: randomValue(0, 10),
// //       }));
// //       setParticles(generatedParticles);
// //     }, []);

// //     return (
// //       <div className="absolute inset-0 z-0" style={{ perspective: '800px' }}>
// //         <motion.div
// //           className="absolute w-full h-full"
// //           style={{
// //             transformStyle: 'preserve-3d',
// //             transform: 'translateY(50%) rotateX(75deg)',
// //           }}
// //           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
// //           transition={{ duration: 2, ease: 'easeInOut' }}
// //         >
// //           {particles.map((particle) => (
// //             <motion.div
// //               key={particle.id}
// //               className="absolute w-1 h-1 bg-blue-500 rounded-full"
// //               style={{
// //                 left: `${particle.x}%`,
// //                 top: `${particle.y}%`,
// //                 boxShadow:
// //                   '0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)',
// //               }}
// //               initial={{ opacity: 0 }}
// //               animate={
// //                 isInView
// //                   ? {
// //                       transform: ['translateY(0px)', 'translateY(300px)'],
// //                       opacity: [0, 0.6, 0.6, 0],
// //                     }
// //                   : {
// //                       opacity: 0,
// //                     }
// //               }
// //               transition={{
// //                 duration: particle.duration,
// //                 delay: particle.delay,
// //                 repeat: Infinity,
// //                 ease: 'linear',
// //               }}
// //             />
// //           ))}
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage: `
// //                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
// //                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
// //               `,
// //               backgroundSize: '40px 40px',
// //             }}
// //           />
// //         </motion.div>
// //       </div>
// //     );
// //   }
// // );
// // MemoizedParticles.displayName = 'MemoizedParticles';

// // // --- Animated Drone Icon Component ---
// // const DroneIcon: React.FC = () => (
// //   <motion.svg
// //     width="40"
// //     height="40"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="#00BFFF"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //     style={{
// //       filter: 'drop-shadow(0 0 8px #00BFFF)',
// //     }}
// //     initial={{ scale: 0.8, opacity: 0.8 }}
// //     animate={{ scale: 1, opacity: 1 }}
// //     transition={{
// //       duration: 0.8,
// //       repeat: Infinity,
// //       repeatType: 'mirror',
// //     }}
// //   >
// //     <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M12 12L6 6" />
// //     <path d="M12 12l6 6" />
// //     <path d="M12 12L6 18" />
// //     <path d="M12 12l6-6" />
// //     <path d="M6 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M6 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //   </motion.svg>
// // );

// // // --- Animated SVG Path Component ---
// // const AnimatedPathComponent: React.FC<{
// //   containerRef: React.RefObject<HTMLDivElement | null>
// // }> = ({ containerRef }) => {
// //   const pathRef = useRef<SVGPathElement>(null);
// //   const [pathLength, setPathLength] = useState(0);

// //   const { scrollYProgress } = useScroll({ target: containerRef });

// //   const pathProgress = useTransform(
// //     scrollYProgress,
// //     [0.1, 0.9],
// //     [0, 1]
// //   );

// //   useLayoutEffect(() => {
// //     if (pathRef.current) {
// //       setPathLength(pathRef.current.getTotalLength());
// //     }
// //   }, []);

// //   const offsetDistance = useTransform(pathProgress, val => `${val * pathLength}px`);

// //   return (
// //     <div className="absolute inset-0 z-10 overflow-visible">
// //       <svg width="100%" height="100%" viewBox="0 0 1000 3000" preserveAspectRatio="none" className="overflow-visible">
// //         <motion.path
// //           ref={pathRef}
// //           d="M 950 150
// //              C 700 250, 200 350, 200 600
// //              L 200 900
// //              C 200 1150, 800 1250, 800 1500
// //              L 800 1700
// //              C 800 1950, 200 2050, 200 2300
// //              L 200 2800"
// //           fill="none"
// //           stroke="#00BFFF"
// //           strokeWidth="2"
// //           strokeDasharray="4 12"
// //           opacity={0.5}
// //         />
// //       </svg>
// //     </div>
// //   );
// // };

// // // --- CheckListItem Component ---
// // const CheckListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
// //   <li className="flex items-start gap-3">
// //     <svg
// //       className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //       />
// //     </svg>
// //     <span className="text-gray-300">{children}</span>
// //   </li>
// // );

// // // --- ContentSections Component ---
// // const ContentSections: React.FC = memo(() => {
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   const AnimatedSection: React.FC<{
// //     children: React.ReactNode;
// //     className?: string;
// //     delay?: number;
// //   }> = ({
// //     children,
// //     className = "",
// //     delay = 0
// //   }) => {
// //     const ref = useRef(null);
// //     const isInView = useInView(ref, { once: true, amount: 0.15 });

// //     return (
// //       <motion.div
// //         ref={ref}
// //         className={`relative z-20 ${className}`}
// //         initial={{ opacity: 0, y: 80, scale: 0.95 }}
// //         animate={isInView ? {
// //           opacity: 1,
// //           y: 0,
// //           scale: 1
// //         } : {}}
// //         transition={{
// //           duration: 0.9,
// //           delay: delay,
// //           ease: [0.25, 0.46, 0.45, 0.94]
// //         }}
// //       >
// //         {children}
// //       </motion.div>
// //     );
// //   };

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="relative py-20 sm:py-32 text-white overflow-hidden"
// //     >
// //       <AnimatedPathComponent containerRef={containerRef} />

// //       <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">

// //         {/* Section 1: Born in Bharat */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //           <motion.div
// //             className="space-y-6 lg:col-start-1"
// //             initial={{ opacity: 0, x: -60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               Born in Bharat. Built for the Battlefield.
// //             </motion.h2>
// //             <motion.p
// //               className="text-lg text-gray-300 leading-relaxed"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               The changing face of warfare has turned drones into one of the most pervasive asymmetric threats. Small, low-cost, and often resistant to jamming, these systems challenge traditional radar and RF-based defences.
// //             </motion.p>
// //             <motion.p
// //               className="text-gray-300 leading-relaxed"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.5 }}
// //             >
// //               VARAHA redefines counter-drone strategy through an acoustic-driven detection architecture that listens before others can see. By harnessing directional acoustic arrays, distributed AI compute, and multi-sensor fusion, it provides early-warning, precise localization, and seamless cueing for hard-kill or electronic-warfare countermeasures — all while remaining completely passive and undetectable.
// //             </motion.p>
// //           </motion.div>
// //           <div className="lg:col-start-2"></div>
// //         </AnimatedSection>

// //         {/* Section 2: Why Acoustic Detection */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <div className="lg:col-start-1"></div>
// //           <motion.div
// //             className="space-y-6 lg:col-start-2"
// //             initial={{ opacity: 0, x: 60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               WHY ACOUSTIC DETECTION MATTERS
// //             </motion.h2>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 { title: 'Detects the undetectable', desc: 'Operates independently of RF signatures or radar reflections.' },
// //                 { title: 'Stealth-first architecture', desc: 'Emits no electronic signal; immune to jamming and detection.' },
// //                 { title: 'AI-driven accuracy', desc: 'Neural-network models identify drone signatures in real time.' },
// //                 { title: 'Scalable deployment', desc: 'From compact man-portable units to perimeter-wide networks.' },
// //                 { title: 'All-weather reliability', desc: 'Functions in radar-shadowed, cluttered, or GPS-denied zones.' }
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: 30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>
// //                     <strong>{item.title}</strong> – {item.desc}
// //                   </CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 3: Mission Profiles */}
// //         <AnimatedSection className="flex flex-col items-center" delay={0.15}>
// //           <motion.h2
// //             className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             whileInView={{ opacity: 1, scale: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.6, delay: 0.2 }}
// //           >
// //             MISSION PROFILES
// //           </motion.h2>
// //           <motion.div
// //             className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
// //             initial={{ opacity: 0, y: 40 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true, amount: 0.2 }}
// //             transition={{ duration: 0.8, delay: 0.3 }}
// //             whileHover={{
// //               boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
// //               borderColor: "rgba(59, 130, 246, 0.5)"
// //             }}
// //           >
// //             <table className="w-full min-w-[700px] border-collapse text-left">
// //               <thead>
// //                 <tr className="border-b border-blue-500/30">
// //                   <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Scenario</th>
// //                   <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">Capability</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-blue-500/30">
// //                 {[
// //                   { scenario: 'Base & Airfield Protection', capability: 'Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.' },
// //                   { scenario: 'Special Forces', capability: 'Miniaturized variant provides hemispheric passive detection via body-worn UI.' },
// //                   { scenario: 'Advanced Perimeter Defence', capability: '360° sensor fusion array detects anomalies and cues hard-kill platforms.' },
// //                   { scenario: 'Naval Operations', capability: 'Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.' },
// //                   { scenario: 'Mobile/Mechanized Units', capability: 'Vehicle-mounted variant for on-the-move protection against aerial threats.' }
// //                 ].map((row, index) => (
// //                   <motion.tr
// //                     key={index}
// //                     initial={{ opacity: 0, x: -20 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
// //                     whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
// //                   >
// //                     <td className="p-4 sm:p-5 font-semibold">{row.scenario}</td>
// //                     <td className="p-4 sm:p-5 text-gray-300">{row.capability}</td>
// //                   </motion.tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 4: Interface & Control */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <motion.div
// //             className="space-y-6 lg:col-start-1"
// //             initial={{ opacity: 0, x: -60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h3
// //               className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               INTERFACE & CONTROL
// //             </motion.h3>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 { title: 'Browser Dashboard:', desc: 'Real-time map, sensor feed, and threat visualization.' },
// //                 { title: 'API Integration:', desc: 'Machine-to-Machine communication for C2 systems.' },
// //                 { title: 'Multi-Platform Access:', desc: 'Optimized for laptops, tablets, and soldier-worn devices.' },
// //                 { title: 'Operator Modes:', desc: 'Manual verification, semi-autonomous cueing, and policy-driven automation.' }
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: -30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>
// //                     <strong>{item.title}</strong> {item.desc}
// //                   </CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //           <div className="lg:col-start-2"></div>
// //         </AnimatedSection>

// //         {/* Section 5: System Highlights */}
// //         <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" delay={0.1}>
// //           <div className="lg:col-start-1"></div>
// //           <motion.div
// //             className="space-y-6 lg:col-start-2"
// //             initial={{ opacity: 0, x: 60 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             <motion.h3
// //               className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //             >
// //               SYSTEM HIGHLIGHTS
// //             </motion.h3>
// //             <motion.ul
// //               className="space-y-4 text-lg"
// //               initial={{ opacity: 0 }}
// //               whileInView={{ opacity: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.4 }}
// //             >
// //               {[
// //                 '100% Passive Detection System',
// //                 'AI-Enabled Acoustic Intelligence',
// //                 'Radar & EO Cueing Integration',
// //                 'Hard-Kill Ready Architecture',
// //                 'Miniaturized Special-Forces Variant',
// //                 'Naval Adaptability',
// //                 'Scalable Deployment Network'
// //               ].map((item, index) => (
// //                 <motion.div
// //                   key={index}
// //                   initial={{ opacity: 0, x: 30 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   viewport={{ once: true }}
// //                   transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                 >
// //                   <CheckListItem>{item}</CheckListItem>
// //                 </motion.div>
// //               ))}
// //             </motion.ul>
// //           </motion.div>
// //         </AnimatedSection>

// //         {/* Section 6: Mission Advantage */}
// //         <AnimatedSection className="text-center flex flex-col items-center" delay={0.15}>
// //           <motion.h3
// //             className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //             initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //             whileInView={{ opacity: 1, scale: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8, delay: 0.2 }}
// //           >
// //             MISSION ADVANTAGE
// //           </motion.h3>
// //           <motion.p
// //             className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8, delay: 0.4 }}
// //           >
// //             When milliseconds define survival, VARAHA ensures the operator hears first — and acts faster.
// //           </motion.p>
// //         </AnimatedSection>
// //       </div>
// //     </div>
// //   );
// // });
// // ContentSections.displayName = 'ContentSections';

// // // --- SignalBeam Component ---
// // const SignalBeam: React.FC = memo(() => {
// //   return (
// //     <svg
// //       className="absolute inset-0 w-full h-full pointer-events-none"
// //       style={{ overflow: 'visible' }}
// //     >
// //       <defs>
// //         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
// //           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
// //         </linearGradient>
// //       </defs>

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="url(#beam-gradient)"
// //         strokeWidth="2"
// //       />

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="#fff"
// //         strokeWidth="2"
// //         strokeDasharray="10 15"
// //         initial={{ strokeDashoffset: 0 }}
// //         animate={{ strokeDashoffset: -25 }}
// //         transition={{
// //           duration: 1,
// //           repeat: Infinity,
// //           ease: 'linear',
// //         }}
// //       />
// //     </svg>
// //   );
// // });
// // SignalBeam.displayName = 'SignalBeam';

// // // --- SceneWithSensors Component ---
// // const SceneWithSensors: React.FC = memo(() => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.3 });

// //   return (
// //     <motion.section
// //       ref={ref}
// //       className="relative w-full h-screen overflow-hidden bg-black"
// //       style={{ perspective: '1000px' }}
// //       initial={{ opacity: 0 }}
// //       animate={isInView ? { opacity: 1 } : {}}
// //       transition={{ duration: 1.2 }}
// //     >
// //       {/* 1. The Earth on the right */}
// //       <motion.div
// //         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
// //         initial={{ opacity: 0, x: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         <EarthCanvas />
// //       </motion.div>

// //       {/* 2. The Sensors on the bottom-left */}
// //       <motion.div
// //         className="absolute bottom-4 left-4 flex items-end"
// //         initial={{ opacity: 0, y: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         {/* The "longer one" (small size, further back) */}
// //         <motion.div
// //           className="w-32 h-32 lg:w-40 lg:h-40"
// //           initial={{ opacity: 0, x: -30 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.7 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>

// //         {/* The "closer one" (large size, in front) */}
// //         <motion.div
// //           className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.9 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>
// //       </motion.div>

// //       {/* 3. The Signal Beam */}
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={isInView ? { opacity: 1 } : {}}
// //         transition={{ duration: 0.8, delay: 1.1 }}
// //       >
// //         <SignalBeam />
// //       </motion.div>

// //     </motion.section>
// //   );
// // });
// // SceneWithSensors.displayName = 'SceneWithSensors';

// // // --- Main Page Component ---
// // const VarahaPage: React.FC = () => {
// //   const [isHeroComplete, setIsHeroComplete] = useState(false);

// //   useEffect(() => {
// //     const htmlElement = document.documentElement;
// //     const bodyElement = document.body;

// //     if (isHeroComplete) {
// //       htmlElement.style.overflow = '';
// //       bodyElement.style.overflow = '';
// //     } else {
// //       htmlElement.style.overflow = 'hidden';
// //       bodyElement.style.overflow = 'hidden';
// //     }

// //     return () => {
// //       htmlElement.style.overflow = '';
// //       bodyElement.style.overflow = '';
// //     };
// //   }, [isHeroComplete]);

// //   return (
// //     <main className="bg-black">
// //       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />

// //       {isHeroComplete && <ContentSections />}

// //       {/* --- ADDED SECTION --- */}
// //       {isHeroComplete && <DetectionSequenceSection />}

// //       {isHeroComplete && <SceneWithSensors />}
// //     </main>
// //   );
// // };

// // export default VarahaPage;

// // "use client";

// // import React, {
// //   useRef,
// //   useState,
// //   useEffect,
// //   memo,
// //   useLayoutEffect,
// // } from "react";
// // import {
// //   motion,
// //   useInView,
// //   Variants,
// //   AnimatePresence,
// //   useScroll,
// //   useTransform,
// //   MotionValue,
// // } from "framer-motion";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import EarthCanvas from "./earthCanvas";
// // import DomeCanvas from "./domeCanvas";
// // import DetectionSequenceSection from "./DetectionSequenceSection";

// // // --- Text Content (Unchanged) ---
// // const title = "VARAHA";
// // const description =
// //   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// // // --- Particle Type (Unchanged) ---
// // interface Particle {
// //   id: number;
// //   x: number;
// //   y: number;
// //   duration: number;
// //   delay: number;
// // }

// // // --- Random Value Function (Unchanged) ---
// // const randomValue = (min: number, max: number) =>
// //   Math.random() * (max - min) + min;

// // // --- Glitch Variant for VARAHA Title (Unchanged) ---
// // const glitchTextVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 3.5,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- Variants for Description and Button (Unchanged) ---
// // const descriptionVariants: Variants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.8,
// //       ease: "easeOut",
// //       delay: 3.8,
// //     },
// //   },
// // };

// // const buttonVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
// //     x: [0, -2, 2, -4, 4, 0],
// //     skewX: [0, 3, -2, 5, -3, 0],
// //     transition: {
// //       delay: 4.0,
// //       duration: 0.4,
// //       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
// //     },
// //   },
// // };

// // // --- HeroSection Component (MODIFIED) ---
// // const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
// //   onAnimationComplete,
// // }) => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.2 });
// //   const router = useRouter();

// //   const { scrollY } = useScroll();

// //   // Fade the hero drone from 1 (visible) to 0 (hidden)
// //   const heroDroneOpacity = useTransform(scrollY, [0, 200], [1, 0]);

// //   // ✅ MODIFIED: Scale down to 0.9 to match the new, larger parallax drone
// //   const heroDroneScale = useTransform(scrollY, [0, 200], [1, 0.9]);

// //   return (
// //     <section
// //       ref={ref}
// //       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
// //     >
// //       <MemoizedParticles isInView={isInView} />
// //       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-title"
// //               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
// //               variants={glitchTextVariants}
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
// //                 {title}
// //               </h1>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-image"
// //               className="relative z-20 mb-8"
// //               style={{
// //                 opacity: heroDroneOpacity,
// //                 scale: heroDroneScale,
// //               }}
// //               initial={{ scale: 0.3, y: 200, opacity: 0 }}
// //               animate={{
// //                 scale: 1,
// //                 y: [20, 20, 0],
// //                 opacity: 1,
// //                 x: [0, -2, 2, -1, 1, 0],
// //               }}
// //               transition={{
// //                 scale: { duration: 1.5, ease: "easeOut" },
// //                 y: { duration: 3.5, ease: "easeOut" },
// //                 opacity: { duration: 1, ease: "easeIn" },
// //                 x: {
// //                   duration: 4,
// //                   delay: 3.5,
// //                   repeat: Infinity,
// //                   repeatType: "mirror",
// //                 },
// //               }}
// //             >
// //               <Image
// //                 src="/drone_varaha.png"
// //                 alt="Varaha Drone"
// //                 width={800}
// //                 height={600}
// //                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
// //                 className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] 2xl:w-[36rem] h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
// //                 priority
// //               />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //         <AnimatePresence>
// //           {isInView && (
// //             <motion.div
// //               key="drone-info"
// //               className="relative z-20 flex flex-col items-center w-full px-4"
// //               initial="hidden"
// //               animate="visible"
// //             >
// //               <motion.p
// //                 variants={descriptionVariants}
// //                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
// //               >
// //                 {description}
// //               </motion.p>

// //               <motion.div
// //                 variants={buttonVariants}
// //                 onAnimationComplete={onAnimationComplete}
// //                 className="flex flex-col sm:flex-row items-center gap-6 mt-8 sm:mt-10"
// //               >
// //                 {/* Button 1: Explore Capabilities */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
// //                   onClick={() => router.push("/")}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <motion.span
// //                     className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
// //                     initial={{ x: "-150%" }}
// //                     animate={{ x: "250%" }}
// //                     transition={{
// //                       duration: 1.5,
// //                       delay: 5.0,
// //                       repeat: Infinity,
// //                       repeatDelay: 5,
// //                       ease: "linear",
// //                     }}
// //                   />
// //                   <span className="relative z-10">Explore Capabilities</span>
// //                 </motion.button>

// //                 {/* Button 2: Request Demo */}
// //                 <motion.button
// //                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
// //                   onClick={() => router.push("/request-demo")}
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                 >
// //                   <span className="relative z-10">Request Demo</span>
// //                 </motion.button>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </motion.div>
// //     </section>
// //   );
// // };
// // HeroSection.displayName = "HeroSection";

// // // --- MemoizedParticles Component (Unchanged) ---
// // const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
// //   ({ isInView }) => {
// //     const [particles, setParticles] = useState<Particle[]>([]);
// //     useEffect(() => {
// //       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
// //         id: i,
// //         x: randomValue(0, 100),
// //         y: randomValue(0, 100),
// //         duration: randomValue(8, 16),
// //         delay: randomValue(0, 10),
// //       }));
// //       setParticles(generatedParticles);
// //     }, []);

// //     return (
// //       <div className="absolute inset-0 z-0" style={{ perspective: "800px" }}>
// //         <motion.div
// //           className="absolute w-full h-full"
// //           style={{
// //             transformStyle: "preserve-3d",
// //             transform: "translateY(50%) rotateX(75deg)",
// //           }}
// //           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
// //           transition={{ duration: 2, ease: "easeInOut" }}
// //         >
// //           {particles.map((particle) => (
// //             <motion.div
// //               key={particle.id}
// //               className="absolute w-1 h-1 bg-blue-500 rounded-full"
// //               style={{
// //                 left: `${particle.x}%`,
// //                 top: `${particle.y}%`,
// //                 boxShadow:
// //                   "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)",
// //               }}
// //               initial={{ opacity: 0 }}
// //               animate={
// //                 isInView
// //                   ? {
// //                       transform: ["translateY(0px)", "translateY(300px)"],
// //                       opacity: [0, 0.6, 0.6, 0],
// //                     }
// //                   : {
// //                       opacity: 0,
// //                     }
// //               }
// //               transition={{
// //                 duration: particle.duration,
// //                 delay: particle.delay,
// //                 repeat: Infinity,
// //                 ease: "linear",
// //               }}
// //             />
// //           ))}
// //           <div
// //             className="absolute inset-0"
// //             style={{
// //               backgroundImage: `
// //                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
// //                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
// //               `,
// //               backgroundSize: "40px 40px",
// //             }}
// //           />
// //         </motion.div>
// //       </div>
// //     );
// //   }
// // );
// // MemoizedParticles.displayName = "MemoizedParticles";

// // // --- Animated Drone Icon Component (Unchanged) ---
// // const DroneIcon: React.FC = () => (
// //   <motion.svg
// //     width="40"
// //     height="40"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="#00BFFF"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //     style={{
// //       filter: "drop-shadow(0 0 8px #00BFFF)",
// //     }}
// //     initial={{ scale: 0.8, opacity: 0.8 }}
// //     animate={{ scale: 1, opacity: 1 }}
// //     transition={{
// //       duration: 0.8,
// //       repeat: Infinity,
// //       repeatType: "mirror",
// //     }}
// //   >
// //     <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M12 12L6 6" />
// //     <path d="M12 12l6 6" />
// //     <path d="M12 12L6 18" />
// //     <path d="M12 12l6-6" />
// //     <path d="M6 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M6 18m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //     <path d="M18 6m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
// //   </motion.svg>
// // );

// // // --- Animated SVG Path Component (Unchanged) ---
// // const AnimatedPathComponent: React.FC<{
// //   containerRef: React.RefObject<HTMLDivElement | null>;
// // }> = ({ containerRef }) => {
// //   const pathRef = useRef<SVGPathElement>(null);
// //   const [pathLength, setPathLength] = useState(0);

// //   const { scrollYProgress } = useScroll({
// //     target: containerRef,
// //     offset: ["start end", "end start"],
// //   });

// //   const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

// //   useLayoutEffect(() => {
// //     if (pathRef.current) {
// //       setPathLength(pathRef.current.getTotalLength());
// //     }
// //   }, []);

// //   const offsetDistance = useTransform(
// //     pathProgress,
// //     (val) => `${val * pathLength}px`
// //   );

// //   return (
// //     <div className="absolute inset-0 z-10 overflow-visible">
// //       <svg
// //         width="100%"
// //         height="100%"
// //         viewBox="0 0 1000 3000"
// //         preserveAspectRatio="none"
// //         className="overflow-visible"
// //       >
// //         <motion.path
// //           ref={pathRef}
// //           d="M 950 150
// //              C 700 250, 200 350, 200 600
// //              L 200 900
// //              C 200 1150, 800 1250, 800 1500
// //              L 800 1700
// //              C 800 1950, 200 2050, 200 2300
// //              L 200 2800"
// //           fill="none"
// //           stroke="#00BFFF"
// //           strokeWidth="2"
// //           strokeDasharray="4 12"
// //           opacity={0.5}
// //         />
// //       </svg>
// //     </div>
// //   );
// // };

// // // --- CheckListItem Component (Unchanged) ---
// // const CheckListItem: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => (
// //   <li className="flex items-start gap-3">
// //     <svg
// //       className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
// //       fill="none"
// //       stroke="currentColor"
// //       viewBox="0 0 24 24"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //         strokeWidth={2}
// //         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //       />
// //     </svg>
// //     <span className="text-gray-300">{children}</span>
// //   </li>
// // );

// // // --- ContentSections Component (MODIFIED) ---
// // const ContentSections = memo(
// //   React.forwardRef<
// //     HTMLDivElement,
// //     {} // Props are removed
// //   >((props, ref) => {
// //     const containerRef = ref as React.RefObject<HTMLDivElement>;

// //     // Get scroll progress of the container
// //     const { scrollYProgress } = useScroll({
// //       target: containerRef,
// //       offset: ["start end", "end end"],
// //     });

// //     // ✅ --- RE-MAPPED SECTION-BASED ANIMATION ---
// //     // These arrays map the scroll progress (0-1) to the 6 sections
// //     // This is a "guess" at the spacing, but it's far better than a linear 0-1
// //     const sectionScrollPoints = [0.1, 0.2, 0.35, 0.5, 0.65, 0.8, 0.9];

// //     // Y transform based on section mapping
// //     const droneY = useTransform(scrollYProgress, sectionScrollPoints, [
// //       "150px",
// //       "600px",
// //       "1500px",
// //       "1700px",
// //       "2300px",
// //       "2800px",
// //       "2800px",
// //     ]);

// //     // X transform based on section mapping
// //     const droneX = useTransform(scrollYProgress, sectionScrollPoints, [
// //       "95%",
// //       "20%",
// //       "80%",
// //       "80%",
// //       "20%",
// //       "20%",
// //       "20%",
// //     ]);

// //     // Handoff opacity
// //     const parallaxOpacity = useTransform(
// //       scrollYProgress,
// //       [0, 0.05, 0.1], // Fade in between 0% and 10%
// //       [0, 0.9, 0.9]
// //     );

// //     // ✅ MODIFIED: Handoff scale to match the new larger size
// //     const parallaxScale = useTransform(
// //       scrollYProgress,
// //       [0, 0.1],
// //       [0.7, 0.9] // Start at 0.7 scale, end at 0.9
// //     );
// //     // --- END MAPPING ---

// //     const AnimatedSection: React.FC<{
// //       children: React.ReactNode;
// //       className?: string;
// //       delay?: number;
// //     }> = ({ children, className = "", delay = 0 }) => {
// //       const sectionRef = useRef(null);
// //       const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

// //       return (
// //         <motion.div
// //           ref={sectionRef}
// //           className={`relative z-20 ${className}`}
// //           initial={{ opacity: 0, y: 80, scale: 0.95 }}
// //           animate={
// //             isInView
// //               ? {
// //                   opacity: 1,
// //                   y: 0,
// //                   scale: 1,
// //                 }
// //               : {}
// //           }
// //           transition={{
// //             duration: 0.9,
// //             delay: delay,
// //             ease: [0.25, 0.46, 0.45, 0.94],
// //           }}
// //         >
// //           {children}
// //         </motion.div>
// //       );
// //     };

// //     return (
// //       <div
// //         ref={containerRef}
// //         className="relative py-20 sm:py-32 text-white overflow-hidden"
// //       >
// //         <AnimatedPathComponent containerRef={containerRef} />

// //         {/* --- MODIFIED PARALLAX DRONE --- */}
// //         <motion.div
// //           className="absolute top-0 left-0 z-30 pointer-events-none"
// //           style={{
// //             x: droneX,
// //             y: droneY,
// //             opacity: parallaxOpacity,
// //             scale: parallaxScale,
// //             translateX: "-50%",
// //           }}
// //         >
// //           <motion.div
// //             style={{
// //               filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
// //             }}
// //           >
// //             {/* ✅ MODIFIED: Increased size */}
// //             <Image
// //               src="/drone_varaha.png"
// //               alt="Parallax Varaha Drone"
// //               width={600}
// //               height={450}
// //               className="w-64 sm:w-80 h-auto object-contain"
// //             />
// //           </motion.div>
// //         </motion.div>
// //         {/* --- END PARALLAX DRONE --- */}

// //         <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
// //           {/* Section 1: Born in Bharat */}
// //           <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               className="space-y-6 lg:col-start-1"
// //               initial={{ opacity: 0, x: 60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h2
// //                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 Born in Bharat. Built for the Battlefield.
// //               </motion.h2>
// //               <motion.p
// //                 className="text-lg text-gray-300 leading-relaxed"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 The changing face of warfare has turned drones into one of the
// //                 most pervasive asymmetric threats. Small, low-cost, and often
// //                 resistant to jamming, these systems challenge traditional radar
// //                 and RF-based defences.
// //               </motion.p>
// //               <motion.p
// //                 className="text-gray-300 leading-relaxed"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.5 }}
// //               >
// //                 VARAHA redefines counter-drone strategy through an
// //                 acoustic-driven detection architecture that listens before
// //                 others can see. By harnessing directional acoustic arrays,
// //                 distributed AI compute, and multi-sensor fusion, it provides
// //                 early-warning, precise localization, and seamless cueing for
// //                 hard-kill or electronic-warfare countermeasures — all while
// //                 remaining completely passive and undetectable.
// //               </motion.p>
// //             </motion.div>
// //             <div className="lg:col-start-2"></div>
// //           </AnimatedSection>

// //           {/* Section 2: Why Acoustic Detection */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <div className="lg:col-start-1"></div>
// //             <motion.div
// //               className="space-y-6 lg:col-start-2"
// //               initial={{ opacity: 0, x: -60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h2
// //                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 WHY ACOUSTIC DETECTION MATTERS
// //               </motion.h2>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   {
// //                     title: "Detects the undetectable",
// //                     desc: "Operates independently of RF signatures or radar reflections.",
// //                   },
// //                   {
// //                     title: "Stealth-first architecture",
// //                     desc: "Emits no electronic signal; immune to jamming and detection.",
// //                   },
// //                   {
// //                     title: "AI-driven accuracy",
// //                     desc: "Neural-network models identify drone signatures in real time.",
// //                   },
// //                   {
// //                     title: "Scalable deployment",
// //                     desc: "From compact man-portable units to perimeter-wide networks.",
// //                   },
// //                   {
// //                     title: "All-weather reliability",
// //                     desc: "Functions in radar-shadowed, cluttered, or GPS-denied zones.",
// //                   },
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: 30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>
// //                       <strong>{item.title}</strong> – {item.desc}
// //                     </CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 3: Mission Profiles */}
// //           <AnimatedSection className="flex flex-col items-center" delay={0.15}>
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               whileInView={{ opacity: 1, scale: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //             >
// //               MISSION PROFILES
// //             </motion.h2>
// //             <motion.div
// //               className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
// //               initial={{ opacity: 0, y: 40 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true, amount: 0.2 }}
// //               transition={{ duration: 0.8, delay: 0.3 }}
// //               whileHover={{
// //                 boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
// //                 borderColor: "rgba(59, 130, 246, 0.5)",
// //               }}
// //             >
// //               <table className="w-full min-w-[700px] border-collapse text-left">
// //                 <thead>
// //                   <tr className="border-b border-blue-500/30">
// //                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
// //                       Scenario
// //                     </th>
// //                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
// //                       Capability
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-blue-500/30">
// //                   {[
// //                     {
// //                       scenario: "Base & Airfield Protection",
// //                       capability:
// //                         "Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.",
// //                     },
// //                     {
// //                       scenario: "Special Forces",
// //                       capability:
// //                         "Miniaturized variant provides hemispheric passive detection via body-worn UI.",
// //                     },
// //                     {
// //                       scenario: "Advanced Perimeter Defence",
// //                       capability:
// //                         "360° sensor fusion array detects anomalies and cues hard-kill platforms.",
// //                     },
// //                     {
// //                       scenario: "Naval Operations",
// //                       capability:
// //                         "Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.",
// //                     },
// //                     {
// //                       scenario: "Mobile/Mechanized Units",
// //                       capability:
// //                         "Vehicle-mounted variant for on-the-move protection against aerial threats.",
// //                     },
// //                   ].map((row, index) => (
// //                     <motion.tr
// //                       key={index}
// //                       initial={{ opacity: 0, x: -20 }}
// //                       whileInView={{ opacity: 1, x: 0 }}
// //                       viewport={{ once: true }}
// //                       transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
// //                       whileHover={{
// //                         backgroundColor: "rgba(59, 130, 246, 0.05)",
// //                       }}
// //                     >
// //                       <td className="p-4 sm:p-5 font-semibold">
// //                         {row.scenario}
// //                       </td>
// //                       <td className="p-4 sm:p-5 text-gray-300">
// //                         {row.capability}
// //                       </td>
// //                     </motion.tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 4: Interface & Control */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <motion.div
// //               className="space-y-6 lg:col-start-1"
// //               initial={{ opacity: 0, x: 60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h3
// //                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 INTERFACE & CONTROL
// //               </motion.h3>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   {
// //                     title: "Browser Dashboard:",
// //                     desc: "Real-time map, sensor feed, and threat visualization.",
// //                   },
// //                   {
// //                     title: "API Integration:",
// //                     desc: "Machine-to-Machine communication for C2 systems.",
// //                   },
// //                   {
// //                     title: "Multi-Platform Access:",
// //                     desc: "Optimized for laptops, tablets, and soldier-worn devices.",
// //                   },
// //                   {
// //                     title: "Operator Modes:",
// //                     desc: "Manual verification, semi-autonomous cueing, and policy-driven automation.",
// //                   },
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: -30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>
// //                       <strong>{item.title}</strong> {item.desc}
// //                     </CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //             <div className="lg:col-start-2"></div>
// //           </AnimatedSection>

// //           {/* Section 5: System Highlights */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <div className="lg:col-start-1"></div>
// //             <motion.div
// //               className="space-y-6 lg:col-start-2"
// //               initial={{ opacity: 0, x: -60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h3
// //                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 SYSTEM HIGHLIGHTS
// //               </motion.h3>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   "100% Passive Detection System",
// //                   "AI-Enabled Acoustic Intelligence",
// //                   "Radar & EO Cueing Integration",
// //                   "Hard-Kill Ready Architecture",
// //                   "Miniaturized Special-Forces Variant",
// //                   "Naval Adaptability",
// //                   "Scalable Deployment Network",
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: 30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>{item}</CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 6: Mission Advantage */}
// //           <AnimatedSection
// //             className="text-center flex flex-col items-center"
// //             delay={0.15}
// //           >
// //             <motion.h3
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //               whileInView={{ opacity: 1, scale: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               MISSION ADVANTAGE
// //             </motion.h3>
// //             <motion.p
// //               className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
// //               initial={{ opacity: 0, y: 30 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.8, delay: 0.4 }}
// //             >
// //               When milliseconds define survival, VARAHA ensures the operator
// //               hears first — and acts faster.
// //             </motion.p>
// //           </AnimatedSection>
// //         </div>
// //       </div>
// //     );
// //   })
// // );
// // ContentSections.displayName = "ContentSections";

// // // --- SignalBeam Component (Unchanged) ---
// // const SignalBeam: React.FC = memo(() => {
// //   return (
// //     <svg
// //       className="absolute inset-0 w-full h-full pointer-events-none"
// //       style={{ overflow: "visible" }}
// //     >
// //       <defs>
// //         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
// //           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
// //           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
// //         </linearGradient>
// //       </defs>

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="url(#beam-gradient)"
// //         strokeWidth="2"
// //       />

// //       <motion.line
// //         x1="calc(10% + 5rem)"
// //         y1="calc(100% - 7rem)"
// //         x2="calc(100% - 10rem)"
// //         y2="50%"
// //         stroke="#fff"
// //         strokeWidth="2"
// //         strokeDasharray="10 15"
// //         initial={{ strokeDashoffset: 0 }}
// //         animate={{ strokeDashoffset: -25 }}
// //         transition={{
// //           duration: 1,
// //           repeat: Infinity,
// //           ease: "linear",
// //         }}
// //       />
// //     </svg>
// //   );
// // });
// // SignalBeam.displayName = "SignalBeam";

// // // --- SceneWithSensors Component (Unchanged) ---
// // const SceneWithSensors: React.FC = memo(() => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.3 });

// //   return (
// //     <motion.section
// //       ref={ref}
// //       className="relative w-full h-screen overflow-hidden bg-black"
// //       style={{ perspective: "1000px" }}
// //       initial={{ opacity: 0 }}
// //       animate={isInView ? { opacity: 1 } : {}}
// //       transition={{ duration: 1.2 }}
// //     >
// //       {/* 1. The Earth on the right */}
// //       <motion.div
// //         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
// //         initial={{ opacity: 0, x: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         <EarthCanvas />
// //       </motion.div>

// //       {/* 2. The Sensors on the bottom-left */}
// //       <motion.div
// //         className="absolute bottom-4 left-4 flex items-end"
// //         initial={{ opacity: 0, y: 100, scale: 0.8 }}
// //         animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
// //         transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
// //       >
// //         {/* The "longer one" (small size, further back) */}
// //         <motion.div
// //           className="w-32 h-32 lg:w-40 lg:h-40"
// //           initial={{ opacity: 0, x: -30 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.7 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>

// //         {/* The "closer one" (large size, in front) */}
// //         <motion.div
// //           className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={isInView ? { opacity: 1, x: 0 } : {}}
// //           transition={{ duration: 0.8, delay: 0.9 }}
// //         >
// //           <DomeCanvas />
// //         </motion.div>
// //       </motion.div>

// //       {/* 3. The Signal Beam */}
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={isInView ? { opacity: 1 } : {}}
// //         transition={{ duration: 0.8, delay: 1.1 }}
// //       >
// //         <SignalBeam />
// //       </motion.div>
// //     </motion.section>
// //   );
// // });
// // SceneWithSensors.displayName = "SceneWithSensors";

// // // --- Main Page Component (MODIFIED) ---

// // /**
// //  * ScrollableContent component
// //  * This component just holds the ref and passes it down.
// //  */
// // const ScrollableContent: React.FC = () => {
// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.75 }}
// //     >
// //       <ContentSections
// //         ref={scrollRef} // Pass the ref
// //       />
// //       <DetectionSequenceSection />
// //       <SceneWithSensors />
// //     </motion.div>
// //   );
// // };

// // const VarahaPage: React.FC = () => {
// //   const [isHeroComplete, setIsHeroComplete] = useState(false);

// //   // Lock/unlock body scroll
// //   useEffect(() => {
// //     const htmlElement = document.documentElement;
// //     const bodyElement = document.body;

// //     if (isHeroComplete) {
// //       htmlElement.style.overflow = "";
// //       bodyElement.style.overflow = "";
// //     } else {
// //       htmlElement.style.overflow = "hidden";
// //       bodyElement.style.overflow = "hidden";
// //     }

// //     return () => {
// //       htmlElement.style.overflow = "";
// //       bodyElement.style.overflow = "";
// //     };
// //   }, [isHeroComplete]);

// //   return (
// //     <main className="bg-black">
// //       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />

// //       {isHeroComplete && <ScrollableContent />}
// //     </main>
// //   );
// // };

// // export default VarahaPage;
// "use client";

// import React, {
//   useRef,
//   useState,
//   useEffect,
//   memo,
//   useLayoutEffect,
//   forwardRef,
// } from "react";
// import {
//   motion,
//   useInView,
//   Variants,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   MotionValue,
//   useMotionValue,
// } from "framer-motion";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import EarthCanvas from "./earthCanvas";
// import DomeCanvas from "./domeCanvas";
// import DetectionSequenceSection from "./DetectionSequenceSection";
// import ThreeDrone from "./ThreeDrone";

// // --- Text Content (Unchanged) ---
// const title = "VARAHA";
// const description =
//   "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// // --- Particle Type (Unchanged) ---
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   duration: number;
//   delay: number;
// }

// // --- Random Value Function (Unchanged) ---
// const randomValue = (min: number, max: number) =>
//   Math.random() * (max - min) + min;

// // --- Glitch Variant for VARAHA Title (Unchanged) ---
// const glitchTextVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 3.5,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- Variants for Description and Button (Unchanged) ---
// const descriptionVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//       delay: 3.8,
//     },
//   },
// };

// const buttonVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 0.8, 0.5, 1, 0.7, 1],
//     x: [0, -2, 2, -4, 4, 0],
//     skewX: [0, 3, -2, 5, -3, 0],
//     transition: {
//       delay: 4.0,
//       duration: 0.4,
//       times: [0, 0.2, 0.4, 0.6, 0.8, 1],
//     },
//   },
// };

// // --- HeroSection Component (Unchanged from your version) ---
// const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
//   onAnimationComplete,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.2 });
//   const router = useRouter();

//   const { scrollY } = useScroll();

//   // Fade the hero drone from 1 (visible) to 0 (hidden)
//   const heroDroneOpacity = useTransform(scrollY, [0, 200], [1, 0]);

//   // Scale down to 0.9 to match the new, larger parallax drone
//   const heroDroneScale = useTransform(scrollY, [0, 200], [1, 0.9]);

//   return (
//     <section
//       ref={ref}
//       className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
//     >
//       <MemoizedParticles isInView={isInView} />
//       <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-title"
//               className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
//               variants={glitchTextVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
//                 {title}
//               </h1>
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-image"
//               className="relative z-20"
//               style={{
//                 opacity: heroDroneOpacity,
//                 scale: heroDroneScale,
//               }}
//               initial={{ scale: 0.3, y: 200, opacity: 0 }}
//               animate={{
//                 scale: 1,
//                 y: [20, 20, 0],
//                 opacity: 1,
//                 x: [0, -2, 2, -1, 1, 0],
//               }}
//               transition={{
//                 scale: { duration: 1.5, ease: "easeOut" },
//                 y: { duration: 3.5, ease: "easeOut" },
//                 opacity: { duration: 1, ease: "easeIn" },
//                 x: {
//                   duration: 4,
//                   delay: 3.5,
//                   repeat: Infinity,
//                   repeatType: "mirror",
//                 },
//               }}
//             >
//               <Image
//                 src="/drone_varaha.png"
//                 alt="Varaha Drone"
//                 width={800}
//                 height={600}
//                 sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
//                 className="w-64 sm:w-80 md:w-96 lg:w-md xl:w-lg 2xl:w-xl h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
//                 priority
//               />
//             </motion.div>
//           )}
//         </AnimatePresence>
//         <AnimatePresence>
//           {isInView && (
//             <motion.div
//               key="drone-info"
//               className="relative z-20 flex flex-col items-center w-full px-4"
//               initial="hidden"
//               animate="visible"
//             >
//               <motion.p
//                 variants={descriptionVariants}
//                 className="max-w-xl text-center text-sm text-gray-300 md:text-base"
//               >
//                 {description}
//               </motion.p>

//               <motion.div
//                 variants={buttonVariants}
//                 onAnimationComplete={onAnimationComplete}
//                 className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-8"
//               >
//                 {/* Button 1: Explore Capabilities */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
//                   onClick={() => router.push("/")}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.span
//                     className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
//                     initial={{ x: "-150%" }}
//                     animate={{ x: "250%" }}
//                     transition={{
//                       duration: 1.5,
//                       delay: 5.0,
//                       repeat: Infinity,
//                       repeatDelay: 5,
//                       ease: "linear",
//                     }}
//                   />
//                   <span className="relative z-10">Explore Capabilities</span>
//                 </motion.button>

//                 {/* Button 2: Request Demo */}
//                 <motion.button
//                   className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
//                   onClick={() => router.push("/request-demo")}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span className="relative z-10">Request Demo</span>
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };
// HeroSection.displayName = "HeroSection";

// // --- MemoizedParticles Component (Unchanged) ---
// const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
//   ({ isInView }) => {
//     const [particles, setParticles] = useState<Particle[]>([]);
//     useEffect(() => {
//       const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
//         id: i,
//         x: randomValue(0, 100),
//         y: randomValue(0, 100),
//         duration: randomValue(8, 16),
//         delay: randomValue(0, 10),
//       }));
//       setParticles(generatedParticles);
//     }, []);

//     return (
//       <div className="absolute inset-0 z-0" style={{ perspective: "800px" }}>
//         <motion.div
//           className="absolute w-full h-full"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "translateY(50%) rotateX(75deg)",
//           }}
//           animate={isInView ? { scale: 1.2 } : { scale: 1 }}
//           transition={{ duration: 2, ease: "easeInOut" }}
//         >
//           {particles.map((particle) => (
//             <motion.div
//               key={particle.id}
//               className="absolute w-1 h-1 bg-blue-500 rounded-full"
//               style={{
//                 left: `${particle.x}%`,
//                 top: `${particle.y}%`,
//                 boxShadow:
//                   "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)",
//               }}
//               initial={{ opacity: 0 }}
//               animate={
//                 isInView
//                   ? {
//                       transform: ["translateY(0px)", "translateY(300px)"],
//                       opacity: [0, 0.6, 0.6, 0],
//                     }
//                   : {
//                       opacity: 0,
//                     }
//               }
//               transition={{
//                 duration: particle.duration,
//                 delay: particle.delay,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             />
//           ))}
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: "40px 40px",
//             }}
//           />
//         </motion.div>
//       </div>
//     );
//   }
// );
// MemoizedParticles.displayName = "MemoizedParticles";

// // --- ❌ REMOVED Unused DroneIcon Component ---

// // --- Animated SVG Path Component (MODIFIED) ---
// const AnimatedPathComponent: React.FC<{
//   // ✅ MODIFIED: Prop name changed for clarity
//   scrollContainerRef: React.RefObject<HTMLDivElement | null>;
//   pathRef: React.RefObject<HTMLDivElement | null>;
// }> = ({ scrollContainerRef, pathRef }) => {
//   // const pathRef = useRef<SVGPathElement>(null);
//   const [pathLength, setPathLength] = useState(0);

//   const { scrollYProgress } = useScroll({
//     // ✅ MODIFIED: Now targets the main scroll container for accurate progress
//     target: scrollContainerRef,
//     offset: ["start end", "end start"],
//   });

//   // This progress mapping remains, it's for the *visual* dashed line animation
//   const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

//   useLayoutEffect(() => {
//     if (pathRef.current) {
//       setPathLength(pathRef.current.getTotalLength());
//     }
//   }, []);

//   // This is unused, but harmless.
//   // const offsetDistance = useTransform(
//   //   pathProgress,
//   //   (val) => `${val * pathLength}px`
//   // );

//   return (
//     <div className="absolute inset-0 z-10 overflow-visible">
//       <svg
//         width="100%"
//         height="100%"
//         viewBox="0 0 1000 3000"
//         preserveAspectRatio="none"
//         className="overflow-visible"
//       >
//         <motion.path
//           ref={pathRef}
//           d="M 950 150
//              C 700 250, 200 350, 200 600
//              L 200 900
//              C 200 1150, 800 1250, 800 1500
//              L 800 1700
//              C 800 1950, 200 2050, 200 2300
//              L 200 2800"
//           fill="none"
//           stroke="#00BFFF"
//           strokeWidth="2"
//           strokeDasharray="4 12"
//           opacity={0.5}
//         />
//       </svg>
//     </div>
//   );
// };

// // --- CheckListItem Component (Unchanged) ---
// const CheckListItem: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => (
//   <li className="flex items-start gap-3">
//     <svg
//       className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//     <span className="text-gray-300">{children}</span>
//   </li>
// );

// // --- ContentSections Component (MODIFIED) ---
// // const ContentSections = memo(
// //   forwardRef<
// //     HTMLDivElement,
// //     // ✅ MODIFIED: Added prop to receive the main scroll container ref
// //     { scrollContainerRef: React.RefObject<HTMLDivElement> }
// //   >(({ scrollContainerRef }, ref) => {
// //     // This ref is for the ContentSections div itself
// //     const containerRef = ref as React.RefObject<HTMLDivElement>;

// //     const pathRef = useRef<SVGPathElement>(null);
// //     const [pathLength, setPathLength] = useState(0);

// //     // 1. Get the path length once it's rendered
// //     useLayoutEffect(() => {
// //       if (pathRef.current) {
// //         setPathLength(pathRef.current.getTotalLength());
// //       }
// //     }, []);

// //     // Get scroll progress of the *main scroll container*
// //     const { scrollYProgress } = useScroll({
// //       // ✅ MODIFIED: Targets the main scroll container
// //       target: scrollContainerRef,
// //       offset: ["start end", "end end"],
// //     });

// //     // ✅ --- SMOOTHER ANIMATION MAPPING ---
// //     // These points map the scroll progress to the 6 sections
// //     const dronePathLength = useTransform(
// //       scrollYProgress,
// //       [0.1, 0.9], // Start/end points of the animation
// //       [0, pathLength] // Map to 0 -> total path length
// //     );

// //     // 4. Create motion values to store the drone's x/y percentage
// //     // We start at 95% 5% (M 950 150)
// //     const droneX = useMotionValue(95);
// //     const droneY = useMotionValue(5);

// //     // Handoff opacity (Unchanged)
// //     useLayoutEffect(() => {
// //       // Subscribe to changes in dronePathLength
// //       const unsubscribe = dronePathLength.onChange((latest) => {
// //         if (pathRef.current && pathLength > 0) {
// //           // Get the (x, y) coordinates at that exact length
// //           const point = pathRef.current.getPointAtLength(latest);

// //           // Convert SVG viewBox units (1000x3000) to percentages
// //           droneX.set((point.x / 1000) * 100);
// //           droneY.set((point.y / 3000) * 100);
// //         }
// //       });

// //       return () => unsubscribe(); // Cleanup subscription
// //     }, [pathRef, pathLength, dronePathLength, droneX, droneY]);

// //     // 6. We must convert the raw numbers (e.g., 95) into strings ("95%")
// //     // for the CSS style prop.
// //     const xPercent = useTransform(droneX, (v) => `${v}%`);
// //     const yPercent = useTransform(droneY, (v) => `${v}%`);

// //     // 7. Opacity & Scale transforms (unchanged)
// //     const parallaxOpacity = useTransform(
// //       scrollYProgress,
// //       [0, 0.05, 0.1],
// //       [0, 0.9, 0.9]
// //     );
// //     const parallaxScale = useTransform(scrollYProgress, [0, 0.1], [0.7, 0.9]);
// //     // --- END MAPPING ---

// //     const AnimatedSection: React.FC<{
// //       children: React.ReactNode;
// //       className?: string;
// //       delay?: number;
// //     }> = ({ children, className = "", delay = 0 }) => {
// //       const sectionRef = useRef(null);
// //       const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

// //       return (
// //         <motion.div
// //           ref={sectionRef}
// //           className={`relative z-20 ${className}`}
// //           initial={{ opacity: 0, y: 80, scale: 0.95 }}
// //           animate={
// //             isInView
// //               ? {
// //                   opacity: 1,
// //                   y: 0,
// //                   scale: 1,
// //                 }
// //               : {}
// //           }
// //           transition={{
// //             duration: 0.9,
// //             delay: delay,
// //             ease: [0.25, 0.46, 0.45, 0.94],
// //           }}
// //         >
// //           {children}
// //         </motion.div>
// //       );
// //     };

// //     return (
// //       <div
// //         ref={containerRef} // Apply the forwarded ref here
// //         className="relative py-20 sm:py-32 text-white overflow-hidden"
// //       >
// //         {/* ✅ MODIFIED: Pass the correct scroll container ref */}
// //         <AnimatedPathComponent
// //           scrollContainerRef={scrollContainerRef}
// //           pathRef={pathRef}
// //         />

// //         {/* --- MODIFIED PARALLAX DRONE --- */}
// //         <motion.div
// //           className="absolute top-0 left-0 z-30 pointer-events-none w-64 sm:w-80"
// //           style={{
// //             x: xPercent,
// //             y: yPercent, // Now using smooth percentage-based Y
// //             opacity: parallaxOpacity,
// //             scale: parallaxScale,
// //             translateX: "-50%",
// //           }}
// //         >
// //           <motion.div
// //             style={{
// //               filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
// //             }}
// //           >
// //             {/* Increased size (Unchanged from your version) */}
// //             {/* <Image
// //               src="/drone_varaha.png"
// //               alt="Parallax Varaha Drone"
// //               width={600}
// //               height={450}
// //               className="w-64 sm:w-80 h-auto object-contain"
// //             /> */}
// //             <ThreeDrone />
// //           </motion.div>
// //         </motion.div>
// //         {/* --- END PARALLAX DRONE --- */}

// //         {/* --- All content sections below are unchanged --- */}
// //         <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
// //           {/* Section 1: Born in Bharat */}
// //           <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               className="space-y-6 lg:col-start-1"
// //               initial={{ opacity: 0, x: 60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h2
// //                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 Born in Bharat. Built for the Battlefield.
// //               </motion.h2>
// //               <motion.p
// //                 className="text-lg text-gray-300 leading-relaxed"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 The changing face of warfare has turned drones into one of the
// //                 most pervasive asymmetric threats. Small, low-cost, and often
// //                 resistant to jamming, these systems challenge traditional radar
// //                 and RF-based defences.
// //               </motion.p>
// //               <motion.p
// //                 className="text-gray-300 leading-relaxed"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.5 }}
// //               >
// //                 VARAHA redefines counter-drone strategy through an
// //                 acoustic-driven detection architecture that listens before
// //                 others can see. By harnessing directional acoustic arrays,
// //                 distributed AI compute, and multi-sensor fusion, it provides
// //                 early-warning, precise localization, and seamless cueing for
// //                 hard-kill or electronic-warfare countermeasures — all while
// //                 remaining completely passive and undetectable.
// //               </motion.p>
// //             </motion.div>
// //             <div className="lg:col-start-2"></div>
// //           </AnimatedSection>

// //           {/* Section 2: Why Acoustic Detection */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <div className="lg:col-start-1"></div>
// //             <motion.div
// //               className="space-y-6 lg:col-start-2"
// //               initial={{ opacity: 0, x: -60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h2
// //                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 WHY ACOUSTIC DETECTION MATTERS
// //               </motion.h2>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   {
// //                     title: "Detects the undetectable",
// //                     desc: "Operates independently of RF signatures or radar reflections.",
// //                   },
// //                   {
// //                     title: "Stealth-first architecture",
// //                     desc: "Emits no electronic signal; immune to jamming and detection.",
// //                   },
// //                   {
// //                     title: "AI-driven accuracy",
// //                     desc: "Neural-network models identify drone signatures in real time.",
// //                   },
// //                   {
// //                     title: "Scalable deployment",
// //                     desc: "From compact man-portable units to perimeter-wide networks.",
// //                   },
// //                   {
// //                     title: "All-weather reliability",
// //                     desc: "Functions in radar-shadowed, cluttered, or GPS-denied zones.",
// //                   },
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: 30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>
// //                       <strong>{item.title}</strong> – {item.desc}
// //                     </CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 3: Mission Profiles */}
// //           <AnimatedSection className="flex flex-col items-center" delay={0.15}>
// //             <motion.h2
// //               className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               whileInView={{ opacity: 1, scale: 1 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //             >
// //               MISSION PROFILES
// //             </motion.h2>
// //             <motion.div
// //               className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
// //               initial={{ opacity: 0, y: 40 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true, amount: 0.2 }}
// //               transition={{ duration: 0.8, delay: 0.3 }}
// //               whileHover={{
// //                 boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
// //                 borderColor: "rgba(59, 130, 246, 0.5)",
// //               }}
// //             >
// //               <table className="w-full min-w-[700px] border-collapse text-left">
// //                 <thead>
// //                   <tr className="border-b border-blue-500/30">
// //                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
// //                       Scenario
// //                     </th>
// //                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
// //                       Capability
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-blue-500/30">
// //                   {[
// //                     {
// //                       scenario: "Base & Airfield Protection",
// //                       capability:
// //                         "Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.",
// //                     },
// //                     {
// //                       scenario: "Special Forces",
// //                       capability:
// //                         "Miniaturized variant provides hemispheric passive detection via body-worn UI.",
// //                     },
// //                     {
// //                       scenario: "Advanced Perimeter Defence",
// //                       capability:
// //                         "360° sensor fusion array detects anomalies and cues hard-kill platforms.",
// //                     },
// //                     {
// //                       scenario: "Naval Operations",
// //                       capability:
// //                         "Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.",
// //                     },
// //                     {
// //                       scenario: "Mobile/Mechanized Units",
// //                       capability:
// //                         "Vehicle-mounted variant for on-the-move protection against aerial threats.",
// //                     },
// //                   ].map((row, index) => (
// //                     <motion.tr
// //                       key={index}
// //                       initial={{ opacity: 0, x: -20 }}
// //                       whileInView={{ opacity: 1, x: 0 }}
// //                       viewport={{ once: true }}
// //                       transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
// //                       whileHover={{
// //                         backgroundColor: "rgba(59, 130, 246, 0.05)",
// //                       }}
// //                     >
// //                       <td className="p-4 sm:p-5 font-semibold">
// //                         {row.scenario}
// //                       </td>
// //                       <td className="p-4 sm:p-5 text-gray-300">
// //                         {row.capability}
// //                       </td>
// //                     </motion.tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 4: Interface & Control */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <motion.div
// //               className="space-y-6 lg:col-start-1"
// //               initial={{ opacity: 0, x: 60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h3
// //                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 INTERFACE & CONTROL
// //               </motion.h3>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   {
// //                     title: "Browser Dashboard:",
// //                     desc: "Real-time map, sensor feed, and threat visualization.",
// //                   },
// //                   {
// //                     title: "API Integration:",
// //                     desc: "Machine-to-Machine communication for C2 systems.",
// //                   },
// //                   {
// //                     title: "Multi-Platform Access:",
// //                     desc: "Optimized for laptops, tablets, and soldier-worn devices.",
// //                   },
// //                   {
// //                     title: "Operator Modes:",
// //                     desc: "Manual verification, semi-autonomous cueing, and policy-driven automation.",
// //                   },
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: -30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>
// //                       <strong>{item.title}</strong> {item.desc}
// //                     </CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //             <div className="lg:col-start-2"></div>
// //           </AnimatedSection>

// //           {/* Section 5: System Highlights */}
// //           <AnimatedSection
// //             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //             delay={0.1}
// //           >
// //             <div className="lg:col-start-1"></div>
// //             <motion.div
// //               className="space-y-6 lg:col-start-2"
// //               initial={{ opacity: 0, x: -60 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               viewport={{ once: true, amount: 0.3 }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               <motion.h3
// //                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.3 }}
// //               >
// //                 SYSTEM HIGHLIGHTS
// //               </motion.h3>
// //               <motion.ul
// //                 className="space-y-4 text-lg"
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.6, delay: 0.4 }}
// //               >
// //                 {[
// //                   "100% Passive Detection System",
// //                   "AI-Enabled Acoustic Intelligence",
// //                   "Radar & EO Cueing Integration",
// //                   "Hard-Kill Ready Architecture",
// //                   "Miniaturized Special-Forces Variant",
// //                   "Naval Adaptability",
// //                   "Scalable Deployment Network",
// //                 ].map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ opacity: 0, x: 30 }}
// //                     whileInView={{ opacity: 1, x: 0 }}
// //                     viewport={{ once: true }}
// //                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
// //                   >
// //                     <CheckListItem>{item}</CheckListItem>
// //                   </motion.div>
// //                 ))}
// //               </motion.ul>
// //             </motion.div>
// //           </AnimatedSection>

// //           {/* Section 6: Mission Advantage */}
// //           <AnimatedSection
// //             className="text-center flex flex-col items-center"
// //             delay={0.15}
// //           >
// //             <motion.h3
// //               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
// //               initial={{ opacity: 0, scale: 0.9, y: 30 }}
// //               whileInView={{ opacity: 1, scale: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.8, delay: 0.2 }}
// //             >
// //               MISSION ADVANTAGE
// //             </motion.h3>
// //             <motion.p
// //               className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
// //               initial={{ opacity: 0, y: 30 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.8, delay: 0.4 }}
// //             >
// //               When milliseconds define survival, VARAHA ensures the operator
// //               hears first — and acts faster.
// //             </motion.p>
// //           </AnimatedSection>
// //         </div>
// //       </div>
// //     );
// //   })
// // );
// // ContentSections.displayName = "ContentSections";
// // --- ContentSections Component (MODIFIED) ---
// const ContentSections = memo(
//   forwardRef<
//     HTMLDivElement,
//     { scrollContainerRef: React.RefObject<HTMLDivElement> }
//   >(({ scrollContainerRef }, ref) => {
//     // This ref is for the ContentSections div itself
//     const containerRef = ref as React.RefObject<HTMLDivElement>;

//     const pathRef = useRef<SVGPathElement>(null);
//     const [pathLength, setPathLength] = useState(0);

//     // 1. Get the path length once it's rendered
//     useLayoutEffect(() => {
//       if (pathRef.current) {
//         setPathLength(pathRef.current.getTotalLength());
//       }
//     }, []);

//     // Get scroll progress of the *main scroll container*
//     const { scrollYProgress } = useScroll({
//       // ✅ MODIFIED: Targets the main scroll container
//       target: scrollContainerRef,
//       offset: ["start end", "end end"],
//     });

//     // ✅ --- SMOOTHER ANIMATION MAPPING ---
//     // These points map the scroll progress to the 6 sections
//     const dronePathLength = useTransform(
//       scrollYProgress,
//       [0.1, 0.9], // Start/end points of the animation
//       [0, pathLength] // Map to 0 -> total path length
//     );

//     // 4. Create motion values to store the drone's x/y percentage
//     // We start at 95% 5% (M 950 150)
//     const droneX = useMotionValue(95);
//     const droneY = useMotionValue(5);

//     // Handoff opacity (Unchanged)
//     useLayoutEffect(() => {
//       // Subscribe to changes in dronePathLength
//       const unsubscribe = dronePathLength.onChange((latest) => {
//         if (pathRef.current && pathLength > 0) {
//           // Get the (x, y) coordinates at that exact length
//           const point = pathRef.current.getPointAtLength(latest);

//           // Convert SVG viewBox units (1000x3000) to percentages
//           droneX.set((point.x / 1000) * 100);
//           droneY.set((point.y / 3000) * 100);
//         }
//       });

//       return () => unsubscribe(); // Cleanup subscription
//     }, [pathRef, pathLength, dronePathLength, droneX, droneY]);

//     // 6. We must convert the raw numbers (e.g., 95) into strings ("95%")
//     // for the CSS style prop.
//     const xPercent = useTransform(droneX, (v) => `${v}%`);
//     const yPercent = useTransform(droneY, (v) => `${v}%`);

//     // 7. Opacity & Scale transforms (unchanged)
//     const parallaxOpacity = useTransform(
//       scrollYProgress,
//       [0, 0.05, 0.1],
//       [0, 0.9, 0.9]
//     );
//     const parallaxScale = useTransform(scrollYProgress, [0, 0.1], [0.7, 0.9]);
//     // --- END MAPPING ---

//     // ✅ NEW: Add transforms for the parallax globe
//     const globeY = useTransform(
//       scrollYProgress,
//       [0.1, 0.9], // Animate from 10% to 90% of scroll
//       [0, 2000] // Move it 2000px down (adjust as needed)
//     );
//     const globeOpacity = useTransform(
//       scrollYProgress,
//       [0.1, 0.15, 0.85, 0.9], // Fade in/out at the edges
//       [0, 0.3, 0.3, 0] // Max 30% opacity (so it's a background element)
//     );

//     const AnimatedSection: React.FC<{
//       children: React.ReactNode;
//       className?: string;
//       delay?: number;
//     }> = ({ children, className = "", delay = 0 }) => {
//       const sectionRef = useRef(null);
//       const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

//       return (
//         <motion.div
//           ref={sectionRef}
//           className={`relative z-20 ${className}`}
//           initial={{ opacity: 0, y: 80, scale: 0.95 }}
//           animate={
//             isInView
//               ? {
//                   opacity: 1,
//                   y: 0,
//                   scale: 1,
//                 }
//               : {}
//           }
//           transition={{
//             duration: 0.9,
//             delay: delay,
//             ease: [0.25, 0.46, 0.45, 0.94],
//           }}
//         >
//           {children}
//         </motion.div>
//       );
//     };

//     return (
//       <div
//         ref={containerRef} // Apply the forwarded ref here
//         className="relative py-20 sm:py-32 text-white overflow-hidden"
//       >
//         {/* ✅ NEW: Background Parallax Globe */}
//         <motion.div
//           className="absolute top-0 right-4 sm:right-8 lg:right-16 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[32rem] lg:h-[32rem] z-0"
//           style={{
//             y: globeY,
//             opacity: globeOpacity,
//           }}
//         >
//           <EarthCanvas />
//         </motion.div>

//         {/* ✅ MODIFIED: Pass the correct scroll container ref */}
//         <AnimatedPathComponent
//           scrollContainerRef={scrollContainerRef}
//           pathRef={pathRef}
//         />

//         {/* --- MODIFIED PARALLAX DRONE --- */}
//         <motion.div
//           className="absolute top-0 left-0 z-30 pointer-events-none w-64 sm:w-80"
//           style={{
//             x: xPercent,
//             y: yPercent, // Now using smooth percentage-based Y
//             opacity: parallaxOpacity,
//             scale: parallaxScale,
//             translateX: "-50%",
//           }}
//         >
//           <motion.div
//             style={{
//               filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
//             }}
//           >
//             <ThreeDrone />
//           </motion.div>
//         </motion.div>
//         {/* --- END PARALLAX DRONE --- */}

//         {/* --- All content sections below are unchanged --- */}
//         <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
//           {/* Section 1: Born in Bharat */}
//           <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               className="space-y-6 lg:col-start-1"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h2
//                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 Born in Bharat. Built for the Battlefield.
//               </motion.h2>
//               <motion.p
//                 className="text-lg text-gray-300 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 The changing face of warfare has turned drones into one of the
//                 most pervasive asymmetric threats. Small, low-cost, and often
//                 resistant to jamming, these systems challenge traditional radar
//                 and RF-based defences.
//               </motion.p>
//               <motion.p
//                 className="text-gray-300 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//               >
//                 VARAHA redefines counter-drone strategy through an
//                 acoustic-driven detection architecture that listens before
//                 others can see. By harnessing directional acoustic arrays,
//                 distributed AI compute, and multi-sensor fusion, it provides
//                 early-warning, precise localization, and seamless cueing for
//                 hard-kill or electronic-warfare countermeasures — all while
//                 remaining completely passive and undetectable.
//               </motion.p>
//             </motion.div>
//             <div className="lg:col-start-2"></div>
//           </AnimatedSection>

//           {/* Section 2: Why Acoustic Detection */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <div className="lg:col-start-1"></div>
//             <motion.div
//               className="space-y-6 lg:col-start-2"
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h2
//                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 WHY ACOUSTIC DETECTION MATTERS
//               </motion.h2>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   {
//                     title: "Detects the undetectable",
//                     desc: "Operates independently of RF signatures or radar reflections.",
//                   },
//                   {
//                     title: "Stealth-first architecture",
//                     desc: "Emits no electronic signal; immune to jamming and detection.",
//                   },
//                   {
//                     title: "AI-driven accuracy",
//                     desc: "Neural-network models identify drone signatures in real time.",
//                   },
//                   {
//                     title: "Scalable deployment",
//                     desc: "From compact man-portable units to perimeter-wide networks.",
//                   },
//                   {
//                     title: "All-weather reliability",
//                     desc: "Functions in radar-shadowed, cluttered, or GPS-denied zones.",
//                   },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: 30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>
//                       <strong>{item.title}</strong> – {item.desc}
//                     </CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 3: Mission Profiles */}
//           <AnimatedSection className="flex flex-col items-center" delay={0.15}>
//             <motion.h2
//               className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               MISSION PROFILES
//             </motion.h2>
//             <motion.div
//               className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               whileHover={{
//                 boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
//                 borderColor: "rgba(59, 130, 246, 0.5)",
//               }}
//             >
//               <table className="w-full min-w-[700px] border-collapse text-left">
//                 <thead>
//                   <tr className="border-b border-blue-500/30">
//                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
//                       Scenario
//                     </th>
//                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
//                       Capability
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-blue-500/30">
//                   {[
//                     {
//                       scenario: "Base & Airfield Protection",
//                       capability:
//                         "Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.",
//                     },
//                     {
//                       scenario: "Special Forces",
//                       capability:
//                         "Miniaturized variant provides hemispheric passive detection via body-worn UI.",
//                     },
//                     {
//                       scenario: "Advanced Perimeter Defence",
//                       capability:
//                         "360° sensor fusion array detects anomalies and cues hard-kill platforms.",
//                     },
//                     {
//                       scenario: "Naval Operations",
//                       capability:
//                         "Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.",
//                     },
//                     {
//                       scenario: "Mobile/Mechanized Units",
//                       capability:
//                         "Vehicle-mounted variant for on-the-move protection against aerial threats.",
//                     },
//                   ].map((row, index) => (
//                     <motion.tr
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
//                       whileHover={{
//                         backgroundColor: "rgba(59, 130, 246, 0.05)",
//                       }}
//                     >
//                       <td className="p-4 sm:p-5 font-semibold">
//                         {row.scenario}
//                       </td>
//                       <td className="p-4 sm:p-5 text-gray-300">
//                         {row.capability}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 4: Interface & Control */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <motion.div
//               className="space-y-6 lg:col-start-1"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h3
//                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 INTERFACE & CONTROL
//               </motion.h3>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   {
//                     title: "Browser Dashboard:",
//                     desc: "Real-time map, sensor feed, and threat visualization.",
//                   },
//                   {
//                     title: "API Integration:",
//                     desc: "Machine-to-Machine communication for C2 systems.",
//                   },
//                   {
//                     title: "Multi-Platform Access:",
//                     desc: "Optimized for laptops, tablets, and soldier-worn devices.",
//                   },
//                   {
//                     title: "Operator Modes:",
//                     desc: "Manual verification, semi-autonomous cueing, and policy-driven automation.",
//                   },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>
//                       <strong>{item.title}</strong> {item.desc}
//                     </CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//             <div className="lg:col-start-2"></div>
//           </AnimatedSection>

//           {/* Section 5: System Highlights */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <div className="lg:col-start-1"></div>
//             <motion.div
//               className="space-y-6 lg:col-start-2"
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h3
//                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 SYSTEM HIGHLIGHTS
//               </motion.h3>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   "100% Passive Detection System",
//                   "AI-Enabled Acoustic Intelligence",
//                   "Radar & EO Cueing Integration",
//                   "Hard-Kill Ready Architecture",
//                   "Miniaturized Special-Forces Variant",
//                   "Naval Adaptability",
//                   "Scalable Deployment Network",
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: 30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>{item}</CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 6: Mission Advantage */}
//           <AnimatedSection
//             className="text-center flex flex-col items-center"
//             delay={0.15}
//           >
//             <motion.h3
//               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//               initial={{ opacity: 0, scale: 0.9, y: 30 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               MISSION ADVANTAGE
//             </motion.h3>
//             <motion.p
//               className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               When milliseconds define survival, VARAHA ensures the operator
//               hears first — and acts faster.
//             </motion.p>
//           </AnimatedSection>
//         </div>
//       </div>
//     );
//   })
// );
// ContentSections.displayName = "ContentSections";

// // --- SignalBeam Component (Unchanged) ---
// const SignalBeam: React.FC = memo(() => {
//   return (
//     <svg
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ overflow: "visible" }}
//     >
//       <defs>
//         <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
//           <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
//         </linearGradient>
//       </defs>

//       <motion.line
//         x1="calc(10% + 5rem)"
//         y1="calc(100% - 7rem)"
//         x2="calc(100% - 10rem)"
//         y2="50%"
//         stroke="url(#beam-gradient)"
//         strokeWidth="2"
//       />

//       <motion.line
//         x1="calc(10% + 5rem)"
//         y1="calc(100% - 7rem)"
//         x2="calc(100% - 10rem)"
//         y2="50%"
//         stroke="#fff"
//         strokeWidth="2"
//         strokeDasharray="10 15"
//         initial={{ strokeDashoffset: 0 }}
//         animate={{ strokeDashoffset: -25 }}
//         transition={{
//           duration: 1,
//           repeat: Infinity,
//           ease: "linear",
//         }}
//       />
//     </svg>
//   );
// });
// SignalBeam.displayName = "SignalBeam";

// // --- SceneWithSensors Component (Unchanged) ---
// const SceneWithSensors: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   return (
//     <motion.section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//       style={{ perspective: "1000px" }}
//       initial={{ opacity: 0 }}
//       animate={isInView ? { opacity: 1 } : {}}
//       transition={{ duration: 1.2 }}
//     >
//       {/* 1. The Earth on the right */}
//       <motion.div
//         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
//         initial={{ opacity: 0, x: 100, scale: 0.8 }}
//         animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
//       >
//         <EarthCanvas />
//       </motion.div>

//       {/* 2. The Sensors on the bottom-left */}
//       <motion.div
//         className="absolute bottom-4 left-4 flex items-end"
//         initial={{ opacity: 0, y: 100, scale: 0.8 }}
//         animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//       >
//         {/* The "longer one" (small size, further back) */}
//         <motion.div
//           className="w-32 h-32 lg:w-40 lg:h-40"
//           initial={{ opacity: 0, x: -30 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.7 }}
//         >
//           <DomeCanvas />
//         </motion.div>

//         {/* The "closer one" (large size, in front) */}
//         <motion.div
//           className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
//           initial={{ opacity: 0, x: -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.9 }}
//         >
//           <DomeCanvas />
//         </motion.div>
//       </motion.div>

//       {/* 3. The Signal Beam */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8, delay: 1.1 }}
//       >
//         <SignalBeam />
//       </motion.div>
//     </motion.section>
//   );
// });
// SceneWithSensors.displayName = "SceneWithSensors";

// // --- Main Page Component (MODIFIED) ---

// /**
//  * ScrollableContent component (MODIFIED)
//  * This component now uses forwardRef to get the ref from VarahaPage
//  * and passes it down to ContentSections.
//  */
// const ScrollableContent = forwardRef<HTMLDivElement>((props, ref) => {
//   const contentRef = useRef<HTMLDivElement>(null);

//   // We use the forwarded ref for the root scrollable div
//   const scrollContainerRef = ref as React.RefObject<HTMLDivElement>;

//   return (
//     <motion.div
//       ref={scrollContainerRef} // ✅ MODIFIED: Apply the forwarded ref here
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.75 }}
//     >
//       <ContentSections
//         ref={contentRef} // This ref is for the ContentSections component itself
//         scrollContainerRef={scrollContainerRef} // ✅ MODIFIED: Pass the main scroll ref down
//       />
//       <DetectionSequenceSection />
//       {/* <SceneWithSensors /> */}
//     </motion.div>
//   );
// });
// ScrollableContent.displayName = "ScrollableContent";

// const VarahaPage: React.FC = () => {
//   const [isHeroComplete, setIsHeroComplete] = useState(false);
//   // ✅ MODIFIED: The ref for the main scrollable area is created here
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Lock/unlock body scroll (Unchanged)
//   useEffect(() => {
//     const htmlElement = document.documentElement;
//     const bodyElement = document.body;

//     if (isHeroComplete) {
//       htmlElement.style.overflow = "";
//       bodyElement.style.overflow = "";
//     } else {
//       htmlElement.style.overflow = "hidden";
//       bodyElement.style.overflow = "hidden";
//     }

//     return () => {
//       htmlElement.style.overflow = "";
//       bodyElement.style.overflow = "";
//     };
//   }, [isHeroComplete]);

//   return (
//     <main className="bg-black">
//       <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />

//       {/* ✅ MODIFIED: Pass the ref to the scrollable content */}
//       {isHeroComplete && <ScrollableContent ref={scrollRef} />}
//     </main>
//   );
// };

// export default VarahaPage;
"use client";

import React, {
  useRef,
  useState,
  useEffect,
  memo,
  useLayoutEffect,
  forwardRef,
} from "react";
import {
  motion,
  useInView,
  Variants,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  useSpring, // ✅ ADDED: Import useSpring for smooth motion
} from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import EarthCanvas from "./earthCanvas";
import DomeCanvas from "./domeCanvas";
import DetectionSequenceSection from "./DetectionSequenceSection";
import ThreeDrone from "./ThreeDrone";
import Link from "next/link";

// --- Text Content (Unchanged) ---
const title = "VARAHA";
const description =
  "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// --- Particle Type (Unchanged) ---
interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

// --- Random Value Function (Unchanged) ---
const randomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// --- Glitch Variant for VARAHA Title (Unchanged) ---
const glitchTextVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 0.8, 0.5, 1, 0.7, 1],
    x: [0, -2, 2, -4, 4, 0],
    skewX: [0, 3, -2, 5, -3, 0],
    transition: {
      delay: 3.5,
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// --- Variants for Description and Button (Unchanged) ---
const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 3.8,
    },
  },
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
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

// --- HeroSection Component (Unchanged from your version) ---
const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
  onAnimationComplete,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const router = useRouter();

  const { scrollY } = useScroll();

  // Fade the hero drone from 1 (visible) to 0 (hidden)
  const heroDroneOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Scale down to 0.9 to match the new, larger parallax drone
  const heroDroneScale = useTransform(scrollY, [0, 200], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-start w-full h-screen overflow-hidden bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24"
    >
      <MemoizedParticles isInView={isInView} />
      <motion.div className="relative z-10 flex flex-col items-center justify-start pt-8 w-full min-h-[500px]">
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-title"
              className="absolute z-10 translate-y-4 sm:translate-y-6 md:translate-y-10"
              variants={glitchTextVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white relative">
                {title}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-image"
              className="relative z-20"
              style={{
                opacity: heroDroneOpacity,
                scale: heroDroneScale,
              }}
              initial={{ scale: 0.3, y: 200, opacity: 0 }}
              animate={{
                scale: 1,
                y: [20, 20, 0],
                opacity: 1,
                x: [0, -2, 2, -1, 1, 0],
              }}
              transition={{
                scale: { duration: 1.5, ease: "easeOut" },
                y: { duration: 3.5, ease: "easeOut" },
                opacity: { duration: 1, ease: "easeIn" },
                x: {
                  duration: 4,
                  delay: 3.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                },
              }}
            >
              <Image
                src="/drone_varaha.png"
                alt="Varaha Drone"
                width={800}
                height={600}
                sizes="(max-width: 640px) 16rem, (max-width: 768px) 20rem, (max-width: 1024px) 24rem, (max-width: 1280px) 28rem, (max-width: 1536px) 32rem, 36rem"
                className="w-64 sm:w-80 md:w-96 lg:w-md xl:w-lg 2xl:w-xl h-auto object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isInView && (
            <motion.div
              key="drone-info"
              className="relative z-20 flex flex-col items-center w-full px-4"
              initial="hidden"
              animate="visible"
            >
              <motion.p
                variants={descriptionVariants}
                className="max-w-xl text-center text-sm text-gray-300 md:text-base"
              >
                {description}
              </motion.p>

              <motion.div
                variants={buttonVariants}
                onAnimationComplete={onAnimationComplete}
                className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-8"
              >
                {/* Button 1: Explore Capabilities */}
                <motion.button
                  className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)]"
                  onClick={() => router.push("/")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-20"
                    initial={{ x: "-150%" }}
                    animate={{ x: "250%" }}
                    transition={{
                      duration: 1.5,
                      delay: 5.0,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">Download Brochure</span>
                </motion.button>

                {/* Button 2: Request Demo */}
                <motion.button
                  className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500"
                  onClick={() => router.push("/contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Request Demo</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
HeroSection.displayName = "HeroSection";

// --- MemoizedParticles Component (Unchanged) ---
const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
  ({ isInView }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
      const generatedParticles = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: randomValue(0, 100),
        y: randomValue(0, 100),
        duration: randomValue(8, 16),
        delay: randomValue(0, 10),
      }));
      setParticles(generatedParticles);
    }, []);

    return (
      <div className="absolute inset-0 z-0" style={{ perspective: "800px" }}>
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateY(50%) rotateX(75deg)",
          }}
          animate={isInView ? { scale: 1.2 } : { scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                boxShadow:
                  "0 0 8px rgba(59, 130, 246, 0.8), 0 0 16px rgba(59, 130, 246, 0.6)",
              }}
              initial={{ opacity: 0 }}
              animate={
                isInView
                  ? {
                      transform: ["translateY(0px)", "translateY(300px)"],
                      opacity: [0, 0.6, 0.6, 0],
                    }
                  : {
                      opacity: 0,
                    }
              }
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>
      </div>
    );
  }
);
MemoizedParticles.displayName = "MemoizedParticles";

// --- Animated SVG Path Component (Unchanged) ---
const AnimatedPathComponent: React.FC<{
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  pathRef: React.RefObject<SVGPathElement | null>; // ✅ MODIFIED: Corrected type
}> = ({ scrollContainerRef, pathRef }) => {
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start end", "end start"],
  });

  const pathProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef]); // ✅ ADDED: Dependency array

  return (
    <div className="absolute inset-0 z-10 overflow-visible">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 3000"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <motion.path
          ref={pathRef}
          d="M 950 150 
             C 700 250, 200 350, 200 600
             L 200 900
             C 200 1150, 800 1250, 800 1500 
             L 800 1700
             C 800 1950, 200 2050, 200 2300
             L 200 2800"
          fill="none"
          stroke="#00BFFF"
          strokeWidth="2"
          strokeDasharray="4 12"
          opacity={0.5}
        />
      </svg>
    </div>
  );
};

// --- CheckListItem Component (Unchanged) ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <li className="flex items-start gap-3">
    <svg
      className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span className="text-gray-300">{children}</span>
  </li>
);

// --- ContentSections Component (MODIFIED) ---
// const ContentSections = memo(
//   forwardRef<
//     HTMLDivElement,
//     { scrollContainerRef: React.RefObject<HTMLDivElement> }
//   >(({ scrollContainerRef }, ref) => {
//     const containerRef = ref as React.RefObject<HTMLDivElement>;
//     const pathRef = useRef<SVGPathElement>(null);
//     const [pathLength, setPathLength] = useState(0);

//     useLayoutEffect(() => {
//       if (pathRef.current) {
//         setPathLength(pathRef.current.getTotalLength());
//       }
//     }, []);

//     const { scrollYProgress } = useScroll({
//       target: scrollContainerRef,
//       offset: ["start end", "end end"],
//     });

//     const dronePathLength = useTransform(
//       scrollYProgress,
//       [0.1, 0.9], // Start/end points of the animation
//       [0, pathLength] // Map to 0 -> total path length
//     );

//     // 1. ✅ MODIFIED: Create raw motion values (the "target")
//     const droneX = useMotionValue(95);
//     const droneY = useMotionValue(5);

//     // 2. ✅ ADDED: Create smoothed values using useSpring
//     // Tweak stiffness and damping to get the perfect "buttery" feel
//     const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
//     const smoothDroneX = useSpring(droneX, springConfig);
//     const smoothDroneY = useSpring(droneY, springConfig);

//     useLayoutEffect(() => {
//       const unsubscribe = dronePathLength.onChange((latest) => {
//         if (pathRef.current && pathLength > 0) {
//           const point = pathRef.current.getPointAtLength(latest);
//           // 3. ✅ MODIFIED: Set the "target" values
//           droneX.set((point.x / 1000) * 100);
//           droneY.set((point.y / 3000) * 100);
//         }
//       });

//       return () => unsubscribe();
//     }, [pathRef, pathLength, dronePathLength, droneX, droneY]);

//     // 4. ✅ MODIFIED: Use the *smoothed* values for the CSS transform
//     const xPercent = useTransform(smoothDroneX, (v) => `${v}%`);
//     const yPercent = useTransform(smoothDroneY, (v) => `${v}%`);

//     // Opacity & Scale transforms (unchanged)
//     const parallaxOpacity = useTransform(
//       scrollYProgress,
//       [0, 0.05, 0.1],
//       [0, 0.9, 0.9]
//     );
//     const parallaxScale = useTransform(scrollYProgress, [0, 0.1], [0.7, 0.9]);

//     const AnimatedSection: React.FC<{
//       children: React.ReactNode;
//       className?: string;
//       delay?: number;
//     }> = ({ children, className = "", delay = 0 }) => {
//       const sectionRef = useRef(null);
//       const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

//       return (
//         <motion.div
//           ref={sectionRef}
//           className={`relative z-20 ${className}`}
//           initial={{ opacity: 0, y: 80, scale: 0.95 }}
//           animate={
//             isInView
//               ? {
//                   opacity: 1,
//                   y: 0,
//                   scale: 1,
//                 }
//               : {}
//           }
//           transition={{
//             duration: 0.9,
//             delay: delay,
//             ease: [0.25, 0.46, 0.45, 0.94],
//           }}
//         >
//           {children}
//         </motion.div>
//       );
//     };

//     return (
//       <div
//         ref={containerRef}
//         className="relative py-20 sm:py-32 text-white overflow-hidden" // ✅ ADDED: overflow-hidden
//       >
//         {/* ✅ MODIFIED: Full-size background Earth */}
//         <motion.div
//           className="absolute inset-0 z-0"
//           style={{
//             opacity: 0.15, // Subtle background opacity
//           }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 0.15 }}
//           transition={{ duration: 1.5, delay: 0.5 }}
//         >
//           <EarthCanvas />
//         </motion.div>

//         {/* Dotted Path (Now z-10, above Earth) */}
//         <AnimatedPathComponent
//           scrollContainerRef={scrollContainerRef}
//           pathRef={pathRef}
//         />

//         {/* Parallax Drone (Now z-30, above everything) */}
//         <motion.div
//           className="absolute top-0 left-0 z-30 pointer-events-none w-64 sm:w-80"
//           style={{
//             x: xPercent, // ✅ USING SMOOTH VALUE
//             y: yPercent, // ✅ USING SMOOTH VALUE
//             opacity: parallaxOpacity,
//             scale: parallaxScale,
//             translateX: "-50%",
//           }}
//         >
//           <motion.div
//             style={{
//               filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
//             }}
//           >
//             <ThreeDrone />
//           </motion.div>
//         </motion.div>
//         {/* --- END PARALLAX DRONE --- */}

//         {/* --- Content (Now z-20, above Earth, below drone) --- */}
//         <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
//           {/* Section 1: Born in Bharat */}
//           <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               className="space-y-6 lg:col-start-1"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h2
//                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 Born in Bharat. Built for the Battlefield.
//               </motion.h2>
//               <motion.p
//                 className="text-lg text-gray-300 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 The changing face of warfare has turned drones into one of the
//                 most pervasive asymmetric threats. Small, low-cost, and often
//                 resistant to jamming, these systems challenge traditional radar
//                 and RF-based defences.
//               </motion.p>
//               <motion.p
//                 className="text-gray-300 leading-relaxed"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//               >
//                 VARAHA redefines counter-drone strategy through an
//                 acoustic-driven detection architecture that listens before
//                 others can see. By harnessing directional acoustic arrays,
//                 distributed AI compute, and multi-sensor fusion, it provides
//                 early-warning, precise localization, and seamless cueing for
//                 hard-kill or electronic-warfare countermeasures — all while
//                 remaining completely passive and undetectable.
//               </motion.p>
//             </motion.div>
//             <div className="lg:col-start-2"></div>
//           </AnimatedSection>

//           {/* Section 2: Why Acoustic Detection */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <div className="lg:col-start-1"></div>
//             <motion.div
//               className="space-y-6 lg:col-start-2"
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h2
//                 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 WHY ACOUSTIC DETECTION MATTERS
//               </motion.h2>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   {
//                     title: "Detects the undetectable",
//                     desc: "Operates independently of RF signatures or radar reflections.",
//                   },
//                   {
//                     title: "Stealth-first architecture",
//                     desc: "Emits no electronic signal; immune to jamming and detection.",
//                   },
//                   {
//                     title: "AI-driven accuracy",
//                     desc: "Neural-network models identify drone signatures in real time.",
//                   },
//                   {
//                     title: "Scalable deployment",
//                     desc: "From compact man-portable units to perimeter-wide networks.",
//                   },
//                   {
//                     title: "All-weather reliability",
//                     desc: "Functions in radar-shadowed, cluttered, or GPS-denied zones.",
//                   },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: 30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>
//                       <strong>{item.title}</strong> – {item.desc}
//                     </CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 3: Mission Profiles */}
//           <AnimatedSection className="flex flex-col items-center" delay={0.15}>
//             <motion.h2
//               className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//             >
//               MISSION PROFILES
//             </motion.h2>
//             <motion.div
//               className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               whileHover={{
//                 boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
//                 borderColor: "rgba(59, 130, 246, 0.5)",
//               }}
//             >
//               <table className="w-full min-w-[700px] border-collapse text-left">
//                 <thead>
//                   <tr className="border-b border-blue-500/30">
//                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
//                       Scenario
//                     </th>
//                     <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
//                       Capability
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-blue-500/30">
//                   {[
//                     {
//                       scenario: "Base & Airfield Protection",
//                       capability:
//                         "Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.",
//                     },
//                     {
//                       scenario: "Special Forces",
//                       capability:
//                         "Miniaturized variant provides hemispheric passive detection via body-worn UI.",
//                     },
//                     {
//                       scenario: "Advanced Perimeter Defence",
//                       capability:
//                         "360° sensor fusion array detects anomalies and cues hard-kill platforms.",
//                     },
//                     {
//                       scenario: "Naval Operations",
//                       capability:
//                         "Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.",
//                     },
//                     {
//                       scenario: "Mobile/Mechanized Units",
//                       capability:
//                         "Vehicle-mounted variant for on-the-move protection against aerial threats.",
//                     },
//                   ].map((row, index) => (
//                     <motion.tr
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
//                       whileHover={{
//                         backgroundColor: "rgba(59, 130, 246, 0.05)",
//                       }}
//                     >
//                       <td className="p-4 sm:p-5 font-semibold">
//                         {row.scenario}
//                       </td>
//                       <td className="p-4 sm:p-5 text-gray-300">
//                         {row.capability}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 4: Interface & Control */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <motion.div
//               className="space-y-6 lg:col-start-1"
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h3
//                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 INTERFACE & CONTROL
//               </motion.h3>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   {
//                     title: "Browser Dashboard:",
//                     desc: "Real-time map, sensor feed, and threat visualization.",
//                   },
//                   {
//                     title: "API Integration:",
//                     desc: "Machine-to-Machine communication for C2 systems.",
//                   },
//                   {
//                     title: "Multi-Platform Access:",
//                     desc: "Optimized for laptops, tablets, and soldier-worn devices.",
//                   },
//                   {
//                     title: "Operator Modes:",
//                     desc: "Manual verification, semi-autonomous cueing, and policy-driven automation.",
//                   },
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>
//                       <strong>{item.title}</strong> {item.desc}
//                     </CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//             <div className="lg:col-start-2"></div>
//           </AnimatedSection>

//           {/* Section 5: System Highlights */}
//           <AnimatedSection
//             className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
//             delay={0.1}
//           >
//             <div className="lg:col-start-1"></div>
//             <motion.div
//               className="space-y-6 lg:col-start-2"
//               initial={{ opacity: 0, x: -60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <motion.h3
//                 className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 SYSTEM HIGHLIGHTS
//               </motion.h3>
//               <motion.ul
//                 className="space-y-4 text-lg"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 {[
//                   "100% Passive Detection System",
//                   "AI-Enabled Acoustic Intelligence",
//                   "Radar & EO Cueing Integration",
//                   "Hard-Kill Ready Architecture",
//                   "Miniaturized Special-Forces Variant",
//                   "Naval Adaptability",
//                   "Scalable Deployment Network",
//                 ].map((item, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: 30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
//                   >
//                     <CheckListItem>{item}</CheckListItem>
//                   </motion.div>
//                 ))}
//               </motion.ul>
//             </motion.div>
//           </AnimatedSection>

//           {/* Section 6: Mission Advantage */}
//           <AnimatedSection
//             className="text-center flex flex-col items-center"
//             delay={0.15}
//           >
//             <motion.h3
//               className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
//               initial={{ opacity: 0, scale: 0.9, y: 30 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               MISSION ADVANTAGE
//             </motion.h3>
//             <motion.p
//               className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//             >
//               When milliseconds define survival, VARAHA ensures the operator
//               hears first — and acts faster.
//             </motion.p>
//           </AnimatedSection>
//         </div>
//       </div>
//     );
//   })
// );
// ContentSections.displayName = "ContentSections";
// --- ContentSections Component (MODIFIED) ---
const ContentSections = memo(
  forwardRef<
    HTMLDivElement,
    { scrollContainerRef: React.RefObject<HTMLDivElement> }
  >(({ scrollContainerRef }, ref) => {
    const containerRef = ref as React.RefObject<HTMLDivElement>;
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    useLayoutEffect(() => {
      if (pathRef.current) {
        setPathLength(pathRef.current.getTotalLength());
      }
    }, []);

    const { scrollYProgress } = useScroll({
      target: scrollContainerRef,
      offset: ["start end", "end end"],
    });

    const dronePathLength = useTransform(
      scrollYProgress,
      [0.1, 0.9],
      [0, pathLength]
    );

    // --- Drone Position Logic ---
    // These will store the drone's final *on-screen pixel* coordinates
    const droneX = useMotionValue(95);
    const droneY = useMotionValue(5);

    // Smooth the pixel values
    const smoothDroneX = useSpring(droneX, {
      stiffness: 100,
      damping: 30,
    });
    const smoothDroneY = useSpring(droneY, {
      stiffness: 100,
      damping: 30,
    });

    // This effect recalculates the drone's *screen* position on scroll
    useLayoutEffect(() => {
      const svgElement = pathRef.current?.ownerSVGElement;
      if (!svgElement || pathLength === 0) return;

      const unsub = dronePathLength.onChange((latest) => {
        if (!pathRef.current) return;

        // A. Get the SVG's current on-screen position
        const svgRect = svgElement.getBoundingClientRect();

        // B. Get the target point *inside* the SVG's viewBox
        const point = pathRef.current.getPointAtLength(latest);

        // C. SVG's coordinate system
        const viewBoxWidth = 1000;
        const viewBoxHeight = 3000;

        // D. Convert viewBox coords to a (0-1) percentage
        const percentX = point.x / viewBoxWidth;
        const percentY = point.y / viewBoxHeight;

        // E. Convert percentage to a pixel position relative
        //    to the SVG's on-screen box
        const screenX = svgRect.left + percentX * svgRect.width;
        const screenY = svgRect.top + percentY * svgRect.height;

        // F. Set the motion values to the final screen position
        droneX.set(screenX);
        droneY.set(screenY);
      });

      return () => unsub();
    }, [pathLength, dronePathLength, droneX, droneY]); // Correct dependencies

    // Opacity fades in at 5%, out at 95%
    const parallaxOpacity = useTransform(
      scrollYProgress,
      [0.05, 0.1, 0.9, 0.95],
      [0, 0.9, 0.9, 0]
    );
    const parallaxScale = useTransform(scrollYProgress, [0.1, 0.9], [0.7, 1]);

    // Animated section wrapper (unchanged)
    const AnimatedSection: React.FC<{
      children: React.ReactNode;
      className?: string;
      delay?: number;
    }> = ({ children, className = "", delay = 0 }) => {
      const sectionRef = useRef(null);
      const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

      return (
        <motion.div
          ref={sectionRef}
          className={`relative z-20 ${className}`}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      );
    };

    return (
      <div
        ref={containerRef}
        // ✅ CRITICAL FIX: Set to `overflow-visible`
        // `overflow-hidden` was clipping the drone.
        className="relative py-20 sm:py-32 text-white overflow-visible"
      >
        {/* ❌ Earth Background is REMOVED from here */}

        {/* Dotted Path (z-10) */}
        <AnimatedPathComponent
          scrollContainerRef={scrollContainerRef}
          pathRef={pathRef}
        />

        {/* ✅ FIXED DRONE (z-50) */}
        <motion.div
          className="fixed top-0 left-0 z-100 pointer-events-none w-64 sm:w-80"
          style={{
            x: smoothDroneX, // Use smoothed pixel values
            y: smoothDroneY,
            opacity: parallaxOpacity,
            scale: parallaxScale,
            translateX: "-50%", // Center the drone
            translateY: "-50%",
          }}
        >
          <motion.div
            style={{
              filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
            }}
          >
            <ThreeDrone />
          </motion.div>
        </motion.div>
        {/* Content Sections */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
          {/* ---------- Section 1 ---------- */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6 lg:col-start-1"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Born in Bharat. Built for the Battlefield.
              </motion.h2>

              <motion.p
                className="text-lg text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The changing face of warfare has turned drones into one of the
                most pervasive asymmetric threats. Small, low-cost, and often
                resistant to jamming, these systems challenge traditional radar
                and RF-based defences.
              </motion.p>

              <motion.p
                className="text-gray-300 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                VARAHA redefines counter-drone strategy through an
                acoustic-driven detection architecture that listens before
                others can see. By harnessing directional acoustic arrays,
                distributed AI compute, and multi-sensor fusion, it provides
                early-warning, precise localization, and seamless cueing for
                hard-kill or electronic-warfare countermeasures — all while
                remaining completely passive and undetectable.
              </motion.p>
            </motion.div>
            <div className="lg:col-start-2"></div>
          </AnimatedSection>

          {/* ---------- Section 2 ---------- */}
          <AnimatedSection
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            delay={0.1}
          >
            <div className="lg:col-start-1"></div>

            <motion.div
              className="space-y-6 lg:col-start-2"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                WHY ACOUSTIC DETECTION MATTERS
              </motion.h2>

              <motion.ul
                className="space-y-4 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  {
                    title: "Detects the undetectable",
                    desc: "Operates independently of RF signatures or radar reflections.",
                  },
                  {
                    title: "Stealth-first architecture",
                    desc: "Emits no electronic signal; immune to jamming and detection.",
                  },
                  {
                    title: "AI-driven accuracy",
                    desc: "Neural-network models identify drone signatures in real time.",
                  },
                  {
                    title: "Scalable deployment",
                    desc: "From compact man-portable units to perimeter-wide networks.",
                  },
                  {
                    title: "All-weather reliability",
                    desc: "Functions in radar-shadowed, cluttered, or GPS-denied zones.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <CheckListItem>
                      <strong>{item.title}</strong> – {item.desc}
                    </CheckListItem>
                  </motion.div>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatedSection>

          {/* Section 3: Mission Profiles */}
          <AnimatedSection className="flex flex-col items-center" delay={0.15}>
            <motion.h2
              className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              MISSION PROFILES
            </motion.h2>
            <motion.div
              className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{
                boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                borderColor: "rgba(59, 130, 246, 0.5)",
              }}
            >
              <table className="w-full min-w-[700px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-blue-500/30">
                    <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
                      Scenario
                    </th>
                    <th className="p-4 sm:p-5 text-sm uppercase font-semibold text-blue-300 tracking-wider">
                      Capability
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-500/30">
                  {[
                    {
                      scenario: "Base & Airfield Protection",
                      capability:
                        "Early warning against low-RCS ISR/kamikaze drones; forms kill-chain when paired with EW or kinetic solutions.",
                    },
                    {
                      scenario: "Special Forces",
                      capability:
                        "Miniaturized variant provides hemispheric passive detection via body-worn UI.",
                    },
                    {
                      scenario: "Advanced Perimeter Defence",
                      capability:
                        "360° sensor fusion array detects anomalies and cues hard-kill platforms.",
                    },
                    {
                      scenario: "Naval Operations",
                      capability:
                        "Subsurface monitoring via passive/active variants; supports UUV and torpedo tracking.",
                    },
                    {
                      scenario: "Mobile/Mechanized Units",
                      capability:
                        "Vehicle-mounted variant for on-the-move protection against aerial threats.",
                    },
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                      }}
                    >
                      <td className="p-4 sm:p-5 font-semibold">
                        {row.scenario}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-300">
                        {row.capability}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </AnimatedSection>

          {/* Section 4: Interface & Control */}
          <AnimatedSection
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            delay={0.1}
          >
            <motion.div
              className="space-y-6 lg:col-start-1"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                INTERFACE & CONTROL
              </motion.h3>
              <motion.ul
                className="space-y-4 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  {
                    title: "Browser Dashboard:",
                    desc: "Real-time map, sensor feed, and threat visualization.",
                  },
                  {
                    title: "API Integration:",
                    desc: "Machine-to-Machine communication for C2 systems.",
                  },
                  {
                    title: "Multi-Platform Access:",
                    desc: "Optimized for laptops, tablets, and soldier-worn devices.",
                  },
                  {
                    title: "Operator Modes:",
                    desc: "Manual verification, semi-autonomous cueing, and policy-driven automation.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <CheckListItem>
                      <strong>{item.title}</strong> {item.desc}
                    </CheckListItem>
                  </motion.div>
                ))}
              </motion.ul>
            </motion.div>
            <div className="lg:col-start-2"></div>
          </AnimatedSection>

          {/* Section 5: System Highlights */}
          <AnimatedSection
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            delay={0.1}
          >
            <div className="lg:col-start-1"></div>
            <motion.div
              className="space-y-6 lg:col-start-2"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h3
                className="text-2xl sm:text-3xl font-bold uppercase text-blue-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                SYSTEM HIGHLIGHTS
              </motion.h3>
              <motion.ul
                className="space-y-4 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {[
                  "100% Passive Detection System",
                  "AI-Enabled Acoustic Intelligence",
                  "Radar & EO Cueing Integration",
                  "Hard-Kill Ready Architecture",
                  "Miniaturized Special-Forces Variant",
                  "Naval Adaptability",
                  "Scalable Deployment Network",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <CheckListItem>{item}</CheckListItem>
                  </motion.div>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatedSection>

          {/* Section 6: Mission Advantage */}
          <AnimatedSection
            className="text-center flex flex-col items-center"
            delay={0.15}
          >
            <motion.h3
              className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              MISSION ADVANTAGE
            </motion.h3>
            <motion.p
              className="mt-6 text-xl sm:text-2xl text-gray-300 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              When milliseconds define survival, VARAHA ensures the operator
              hears first — and acts faster.
            </motion.p>
          </AnimatedSection>
        </div>
      </div>
    );
  })
);
ContentSections.displayName = "ContentSections";

// --- SignalBeam Component (Unchanged) ---
const SignalBeam: React.FC = memo(() => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 220, 255, 0.8)" />
          <stop offset="100%" stopColor="rgba(0, 220, 255, 0)" />
        </linearGradient>
      </defs>

      <motion.line
        x1="calc(10% + 5rem)"
        y1="calc(100% - 7rem)"
        x2="calc(100% - 10rem)"
        y2="50%"
        stroke="url(#beam-gradient)"
        strokeWidth="2"
      />

      <motion.line
        x1="calc(10% + 5rem)"
        y1="calc(100% - 7rem)"
        x2="calc(100% - 10rem)"
        y2="50%"
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="10 15"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -25 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
});
SignalBeam.displayName = "SignalBeam";

// --- SceneWithSensors Component (Unchanged) ---
// const SceneWithSensors: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.3 });

//   return (
//     <motion.section
//       ref={ref}
//       className="relative w-full h-screen overflow-hidden bg-black"
//       style={{ perspective: "1000px" }}
//       initial={{ opacity: 0 }}
//       animate={isInView ? { opacity: 1 } : {}}
//       transition={{ duration: 1.2 }}
//     >
//       {/* 1. The Earth on the right */}
//       <motion.div
//         className="absolute top-1/2 -translate-y-1/2 right-0 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] lg:w-[40rem] lg:h-[40rem]"
//         initial={{ opacity: 0, x: 100, scale: 0.8 }}
//         animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
//       >
//         <EarthCanvas />
//       </motion.div>

//       {/* 2. The Sensors on the bottom-left */}
//       <motion.div
//         className="absolute bottom-4 left-4 flex items-end"
//         initial={{ opacity: 0, y: 100, scale: 0.8 }}
//         animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
//         transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//       >
//         {/* The "longer one" (small size, further back) */}
//         <motion.div
//           className="w-32 h-32 lg:w-40 lg:h-40"
//           initial={{ opacity: 0, x: -30 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.7 }}
//         >
//           <DomeCanvas />
//         </motion.div>

//         {/* The "closer one" (large size, in front) */}
//         <motion.div
//           className="w-48 h-48 lg:w-60 lg:h-60 -ml-16 z-10"
//           initial={{ opacity: 0, x: -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.9 }}
//         >
//           <DomeCanvas />
//         </motion.div>
//       </motion.div>

//       {/* 3. The Signal Beam */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8, delay: 1.1 }}
//       >
//         <SignalBeam />
//       </motion.div>
//     </motion.section>
//   );
// });
// SceneWithSensors.displayName = "SceneWithSensors";

// --- Main Page Component ---

/**
 * ScrollableContent component (Unchanged)
 */
const ScrollableContent = forwardRef<HTMLDivElement>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollContainerRef = ref as React.RefObject<HTMLDivElement>;

  return (
    <motion.div
      ref={scrollContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="relative z-0"
    >
      {/* ✅ EARTH BACKGROUND is here */}
      <motion.div
        // Fixed, fullscreen, and behind everything
        className="absolute inset-0 z-[-1]"
        style={{ opacity: 0.15 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <EarthCanvas />
      </motion.div>
      <ContentSections
        ref={contentRef}
        scrollContainerRef={scrollContainerRef}
      />
      <DetectionSequenceSection />
      {/* ❌ REMOVED: The SceneWithSensors is no longer needed here
          as the Earth is now in ContentSections */}
      {/* <SceneWithSensors /> */}
    </motion.div>
  );
});
ScrollableContent.displayName = "ScrollableContent";

const VarahaPage: React.FC = () => {
  const [isHeroComplete, setIsHeroComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock/unlock body scroll (Unchanged)
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isHeroComplete) {
      htmlElement.style.overflow = "";
      bodyElement.style.overflow = "";
    } else {
      htmlElement.style.overflow = "hidden";
      bodyElement.style.overflow = "hidden";
    }

    return () => {
      htmlElement.style.overflow = "";
      bodyElement.style.overflow = "";
    };
  }, [isHeroComplete]);

  return (
    <main className="bg-black">
      <HeroSection onAnimationComplete={() => setIsHeroComplete(true)} />
      {isHeroComplete && <ScrollableContent ref={scrollRef} />}
    </main>
  );
};

export default VarahaPage;
