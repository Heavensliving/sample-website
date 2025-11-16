"use client";

import React, {
  useRef,
  useState,
  useEffect,
  memo,
  useLayoutEffect,
  forwardRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  useInView,
  Variants,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import EarthCanvas from "./earthCanvas";
import DetectionSequenceSection from "./DetectionSequenceSection";
import Image from "next/image";
import ThreeDrone from "./ThreeDrone";
import { useRouter } from "next/navigation";

// --- Text Content ---
const title = "VARAHA";
const description =
  "Next-generation Counter-Unmanned Aircraft System (CUAS) engineered by SSS Defence to detect, localize, and neutralize hostile drones through AI-enabled acoustic intelligence and coherent sensor fusion.";

// --- Particle Type ---
interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

// --- Random Value Function ---
const randomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// --- Animation Variants ---
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

// --- Optimized Particles Component ---
const MemoizedParticles: React.FC<{ isInView: boolean }> = memo(
  ({ isInView }) => {
    const particles = useMemo(
      () =>
        Array.from({ length: 20 }).map((_, i) => ({
          id: i,
          x: randomValue(0, 100),
          y: randomValue(0, 100),
          duration: randomValue(10, 18),
          delay: randomValue(0, 8),
        })),
      []
    );

    return (
      <div className="absolute inset-0 z-0" style={{ perspective: "800px" }}>
        <motion.div
          className="absolute w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateY(50%) rotateX(75deg)",
            willChange: "transform",
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

// --- Hero Section ---
const HeroSection: React.FC<{ onAnimationComplete: () => void }> = ({
  onAnimationComplete,
}) => {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollY } = useScroll();

  const heroDroneOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroDroneScale = useTransform(scrollY, [0, 300], [1, 0.85]);

  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/downloadable/VARAHA - Brochure.pdf";
    link.download = "VARAHA - Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

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
                willChange: "transform, opacity",
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
                <motion.button
                  className="relative overflow-hidden px-6 py-3 border-2 border-blue-500 text-blue-300 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500/20 hover:text-white hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] cursor-pointer"
                  onClick={handleDownload}
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

                <motion.button
                  onClick={() => router.push("/contact")}
                  className="relative overflow-hidden px-6 py-3 bg-blue-600 text-white font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_15px_rgba(59,100,246,0.5)] border-2 border-blue-600 hover:border-blue-500 cursor-pointer"
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

// --- Optimized Parallax Drone ---
const ParallaxDrone: React.FC<{ scrollYProgress: any }> = memo(
  ({ scrollYProgress }) => {
    const shouldReduceMotion = useReducedMotion();

    // Smooth path positions
    const droneX = useTransform(
      scrollYProgress,
      [0.05, 0.25, 0.45, 0.65, 0.85],
      ["95%", "20%", "20%", "80%", "20%"]
    );
    const droneY = useTransform(
      scrollYProgress,
      [0.05, 0.25, 0.45, 0.65, 0.85],
      ["8%", "28%", "48%", "68%", "88%"]
    );

    // Highly optimized spring settings
    const smoothX = useSpring(droneX, {
      stiffness: 40,
      damping: 25,
      mass: 0.3,
    });
    const smoothY = useSpring(droneY, {
      stiffness: 40,
      damping: 25,
      mass: 0.3,
    });

    const opacity = useTransform(
      scrollYProgress,
      [0, 0.05, 0.85, 0.95],
      [0, 1, 1, 0]
    );
    const scale = useTransform(scrollYProgress, [0.05, 0.85], [0.6, 1]);

    if (shouldReduceMotion) {
      return null;
    }

    return (
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          opacity,
          scale,
          translateX: "-50%",
          translateY: "-50%",
          width: "clamp(12rem, 20vw, 20rem)",
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          style={{
            filter: "drop-shadow(0 0 20px rgba(59,130,246,0.7))",
          }}
          animate={{
            rotateY: [0, 5, -5, 0],
            rotateZ: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ThreeDrone />
        </motion.div>
      </motion.div>
    );
  }
);
ParallaxDrone.displayName = "ParallaxDrone";

// --- Animated Path ---
const AnimatedPath: React.FC<{ scrollYProgress: any }> = memo(
  ({ scrollYProgress }) => {
    const pathProgress = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);

    return (
      <div className="absolute inset-0 z-10 overflow-visible pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 3000"
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <motion.path
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
            opacity={0.4}
            style={{
              pathLength: pathProgress,
            }}
          />
        </svg>
      </div>
    );
  }
);
AnimatedPath.displayName = "AnimatedPath";

// --- CheckListItem Component ---
const CheckListItem: React.FC<{ children: React.ReactNode }> = memo(
  ({ children }) => (
    <li className="flex items-start gap-3">
      <svg
        className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
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
  )
);
CheckListItem.displayName = "CheckListItem";

// --- Content Sections ---
const ContentSections = memo(
  forwardRef<
    HTMLDivElement,
    { scrollContainerRef: React.RefObject<HTMLDivElement> }
  >(({ scrollContainerRef }, ref) => {
    const containerRef = ref as React.RefObject<HTMLDivElement>;

    const { scrollYProgress } = useScroll({
      target: scrollContainerRef,
      offset: ["start end", "end end"],
    });

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
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      );
    };

    return (
      <div
        ref={containerRef}
        className="relative py-20 sm:py-32 text-white overflow-visible"
      >
        <AnimatedPath scrollYProgress={scrollYProgress} />
        <ParallaxDrone scrollYProgress={scrollYProgress} />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-36">
          {/* Section 1 */}
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:col-start-1">
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Born in Bharat. Built for the Battlefield.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                The changing face of warfare has turned drones into one of the
                most pervasive asymmetric threats. Small, low-cost, and often
                resistant to jamming, these systems challenge traditional radar
                and RF-based defences.
              </p>
              <p className="text-gray-300 leading-relaxed">
                VARAHA redefines counter-drone strategy through an
                acoustic-driven detection architecture that listens before
                others can see.
              </p>
            </div>
          </AnimatedSection>

          {/* Section 2 */}
          <AnimatedSection
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            delay={0.1}
          >
            <div className="lg:col-start-1"></div>
            <div className="space-y-6 lg:col-start-2">
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                WHY ACOUSTIC DETECTION MATTERS
              </h2>
              <ul className="space-y-4 text-lg">
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
                  <CheckListItem key={index}>
                    <strong>{item.title}</strong> – {item.desc}
                  </CheckListItem>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Section 3: Mission Profiles */}
          <AnimatedSection className="flex flex-col items-center" delay={0.15}>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              MISSION PROFILES
            </h2>
            <div className="w-full overflow-x-auto relative z-30 bg-black/80 backdrop-blur-sm border border-blue-500/30 rounded-lg">
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
                    <tr
                      key={index}
                      className="hover:bg-blue-500/5 transition-colors"
                    >
                      <td className="p-4 sm:p-5 font-semibold">
                        {row.scenario}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-300">
                        {row.capability}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
