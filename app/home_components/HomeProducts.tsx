

// "use client";

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion'; // Added useScroll, useTransform
// import Image from 'next/image';

// // --- TYPE DEFINITIONS ---
// interface Product {
//   id: number;
//   title: string;
//   imagePath: string;
// }

// interface ProductCardProps {
//   product: Product;
//   index: number;
//   isInView: boolean;
//   isHovered: boolean;
//   onHover: () => void;
//   onLeave: () => void;
//   scrollYProgress: any; // Pass scroll progress to card
// }

// // --- PRODUCT CARD COMPONENT ---
// const ProductCard: React.FC<ProductCardProps> = ({ product, index, isInView, isHovered, onHover, onLeave, scrollYProgress }) => {
//   const [showBullet, setShowBullet] = useState(false);
//   const [shattered, setShattered] = useState(false);
//   const cardRef = useRef(null); // Ref for individual card if needed

//   // --- 3D Scroll Effect ---
//   // Map scroll progress (0 to 1) to a rotation range (e.g., -10deg to 10deg)
//   // Apply slightly different ranges for a parallax effect
//   const rotateX = useTransform(scrollYProgress, [0, 1], index === 0 ? [-8, 5] : [5, -8]); 
//   const rotateY = useTransform(scrollYProgress, [0, 1], index === 0 ? [-5, 5] : [5, -5]);
  
//   // --- NEW: Add "going back" transforms ---
//   // As scrollYProgress goes 0 -> 1, scale from 100% to 85%
//   const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
//   // As scrollYProgress goes 0 -> 1, move 150px "back"
//   const z = useTransform(scrollYProgress, [0, 1], [0, -150]);
//   // ------------------------------------

//   useEffect(() => {
//     if (isInView) {
//       const timer = setTimeout(() => {
//         setShowBullet(true);
//         setTimeout(() => setShattered(true), 800);
//       }, 1500 + index * 500);
//       return () => {
//         clearTimeout(timer);
//         setShowBullet(false);
//         setShattered(false);
//       };
//     } else {
//       setShowBullet(false);
//       setShattered(false);
//     }
//   }, [isInView, index]);

//   return (
//     <motion.div
//       ref={cardRef} // Add ref if needed for more complex effects
//       className="relative h-64 sm:h-80 md:h-96 w-full group overflow-hidden rounded-lg cursor-pointer"
//       initial={{ opacity: 0, scale: 0.8 }} // Simplified initial
//       animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
//       transition={{ 
//         duration: 0.8, 
//         delay: 0.6 + index * 0.3,
//         type: "spring",
//         stiffness: 80
//       }}
//       whileHover={{ 
//         scale: 1.03, // This hover scale will now apply *on top of* the scroll-driven scale
//         boxShadow: "0 25px 50px -12px rgba(255, 215, 0, 0.4)" // Enhanced shadow
//       }}
//       onHoverStart={onHover}
//       onHoverEnd={onLeave}
//       // Apply scroll-linked rotation and preserve 3D transformations
//       // --- CHANGED: Added scale and z to style ---
//       style={{ 
//         transformStyle: 'preserve-3d',
//         rotateX, // Apply scroll-linked rotation
//         rotateY, // Apply scroll-linked rotation
//         scale,   // <-- ADDED
//         z,       // <-- ADDED
//       }}
//       // ------------------------------------------
//     >
//       {/* Image with parallax effect */}
//       <motion.div
//         className="absolute inset-0"
//         // Apply slight counter-rotation or different scale on hover for depth
//         style={{ transformStyle: 'preserve-3d' }}
//         animate={isHovered ? { scale: 1.15, z: 20 } : { scale: 1, z: 0 }} 
//         transition={{ duration: 0.4 }}
//       >
//         <Image
//           src={product.imagePath}
//           alt={product.title}
//           layout="fill"
//           objectFit="cover"
//           className="transition-all duration-700 rounded-lg" // Added rounded-lg
//         />
//       </motion.div>

//       {/* Vignette Overlay */}
//       <div 
//         className="absolute inset-0 z-10 rounded-lg" // Added rounded-lg
//         style={{
//           background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)'
//         }}
//       />

//       {/* Bullet Trail Effect */}
//       {showBullet && (
//         <motion.div
//           className="absolute top-1/2 z-30 pointer-events-none"
//           initial={{ left: '-10%', opacity: 0 }}
//           animate={{ 
//             left: '110%', 
//             opacity: [0, 1, 1, 0],
//           }}
//           transition={{ 
//             duration: 1.2,
//             ease: "easeInOut"
//           }}
//         >
//           {/* ... (bullet effect code remains the same) ... */}
//            <div className="relative">
//             <motion.div 
//               className="w-8 h-2 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 rounded-full"
//               animate={{ 
//                 boxShadow: [
//                   "0 0 10px rgba(255, 215, 0, 0.8)",
//                   "0 0 20px rgba(255, 215, 0, 1)",
//                   "0 0 10px rgba(255, 215, 0, 0.8)"
//                 ]
//               }}
//               transition={{ duration: 0.3, repeat: Infinity }}
//             />
//             <motion.div 
//               className="absolute left-0 top-0 h-2 bg-gradient-to-l from-yellow-500 to-transparent"
//               style={{ width: '40px', marginLeft: '-40px' }}
//               animate={{ opacity: [0.8, 0.4, 0.8] }}
//               transition={{ duration: 0.2, repeat: Infinity }}
//             />
//           </div>
//         </motion.div>
//       )}

//       {/* Title with Shatter Effect */}
//       <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 text-center px-4">
//         <motion.div 
//           className="relative inline-block"
//           // Add subtle 3D lift to text on hover
//           style={{ transformStyle: 'preserve-3d' }}
//           animate={ isHovered ? { z: 30 } : { z: 0 } }
//           transition={{ duration: 0.4 }}
//         >
//           {product.title.split("").map((char: string, i: number) => (
//             <motion.span
//               key={i}
//               className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-widest"
//               initial={{ opacity: 0, y: 20 }}
//               animate={shattered ? {
//                 opacity: 1, y: 0,
//                 x: (i - product.title.length / 2) * (Math.random() * 4),
//                 rotate: (Math.random() - 0.5) * 10,
//               } : { opacity: 1, y: 0 }}
//               transition={{ 
//                 duration: 0.6,
//                 delay: shattered ? i * 0.03 : 0.3 + index * 0.2 + i * 0.05,
//                 type: "spring", stiffness: shattered ? 200 : 100
//               }}
//               style={{
//                 textShadow: shattered 
//                   ? `0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.6)`
//                   : '0 2px 10px rgba(0,0,0,0.8)'
//               }}
//             >
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           ))}
//         </motion.div>

//         {/* Impact shockwave */}
//         {shattered && (
//           // ... (shockwave code remains the same) ...
//            <motion.div
//             className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-yellow-500 rounded-full"
//             style={{ x: '-50%', y: '-50%' }}
//             initial={{ scale: 0, opacity: 1 }}
//             animate={{ scale: 3, opacity: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//           />
//         )}
//       </div>

//       {/* Hover glow effect (subtler) */}
//       <motion.div
//         className="absolute inset-0 z-5 pointer-events-none rounded-lg" // Added rounded-lg
//         animate={isHovered ? {
//           background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent 60%)'
//         } : { background: 'transparent' }}
//         transition={{ duration: 0.4 }}
//       />

//       {/* Removed Corner accents */}
//     </motion.div>
//   );
// };


// // --- MAIN HOME PRODUCTS COMPONENT ---
// // (This component remains unchanged)

// const HomeProducts = () => {
//   const sectionRef = useRef(null); // Changed ref name for clarity
//   const isInView = useInView(sectionRef, { once: true, amount: 0.2 }); 
//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

//   // --- Scroll Progress within the section ---
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"] // Animate from when section starts entering to when it fully leaves
//   });
//   // ----------------------------------------

//   // --- 3D Scroll transforms for background ---
//   const bgScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]); 
//   const bgZ = useTransform(scrollYProgress, [0, 1], [0, -600]);     


//   const products: Product[] = [ 
//     { id: 1, title: "SMALL ARMS", imagePath: "/Hero_images/small_arms.png" },
//     { id: 2, title: "AMMUNITION", imagePath: "/Hero_images/ammunation.png" }
//   ];

//   return (
//     <section 
//       ref={sectionRef} // Use the new ref name
//       className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start min-h-screen overflow-hidden"
//       style={{ perspective: '1000px' }}
//     >
//       {/* Animated Background Grid */}
//        <div className="absolute inset-0 z-0 opacity-20">
//         <motion.div 
//           className="w-full h-full"
//           style={{
//             backgroundImage: `
//               linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
//             `,
//             backgroundSize: '50px 50px',
//             transformStyle: 'preserve-3d', 
//             scale: bgScale,                 
//             z: bgZ,                         
//           }}
//           animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//         />
//       </div>


//       {/* Title */}
//       <motion.div
//         className="text-center relative z-10 mb-12 sm:mb-16" // Added margin bottom
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white">
//           {"OUR PRODUCTS".split("").map((char: string, index: number) => (
//             // ... (title stagger animation remains the same) ...
//              <motion.span
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//               transition={{ 
//                 duration: 0.5, 
//                 delay: index * 0.05,
//                 type: "spring", stiffness: 100
//               }}
//               className="inline-block"
//             >
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           ))}
//         </h2>
//       </motion.div>

//       {/* Product Cards Container - ADDED PERSPECTIVE */}
//       <div 
//         className="mt-8 w-full max-w-7xl relative z-10" 
//         style={{ perspective: '1200px' }} // This perspective is for the cards
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20"> {/* Increased gap */}
//           {products.map((product, index) => (
//             <ProductCard 
//               key={product.id}
//               product={product}
//               index={index}
//               isInView={isInView}
//               isHovered={hoveredProduct === product.id}
//               onHover={() => setHoveredProduct(product.id)} 
//               onLeave={() => setHoveredProduct(null)} 
//               scrollYProgress={scrollYProgress} // Pass progress down
//             />
//           ))}
//         </div>
//       </div>

//       {/* Floating particles effect */}
//        {isInView && (
//         <div className="absolute inset-0 z-0 pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-yellow-500 rounded-full"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
//               transition={{
//                 duration: 3 + Math.random() * 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>
//       )}

//     </section>
//   );
// };


// export default HomeProducts;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link'; // <-- 1. IMPORT LINK

// --- TYPE DEFINITIONS ---
interface Product {
  id: number;
  title: string;
  imagePath: string;
  href: string; // <-- 2. ADDED HREF
}

interface ProductCardProps {
  product: Product;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  scrollYProgress: any;
}

// --- PRODUCT CARD COMPONENT (No Changes Needed) ---
const ProductCard: React.FC<ProductCardProps> = ({ product, index, isInView, isHovered, onHover, onLeave, scrollYProgress }) => {
  const [showBullet, setShowBullet] = useState(false);
  const [shattered, setShattered] = useState(false);
  const cardRef = useRef(null);

  const rotateX = useTransform(scrollYProgress, [0, 1], index === 0 ? [-8, 5] : [5, -8]); 
  const rotateY = useTransform(scrollYProgress, [0, 1], index === 0 ? [-5, 5] : [5, -5]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const z = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShowBullet(true);
        setTimeout(() => setShattered(true), 800);
      }, 1500 + index * 500);
      return () => {
        clearTimeout(timer);
        setShowBullet(false);
        setShattered(false);
      };
    } else {
      setShowBullet(false);
      setShattered(false);
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-64 sm:h-80 md:h-96 w-full group overflow-hidden rounded-lg cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.6 + index * 0.3,
        type: "spring",
        stiffness: 80
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 25px 50px -12px rgba(255, 215, 0, 0.4)"
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      style={{ 
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
        z,
      }}
    >
      {/* Image with parallax effect */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d' }}
        animate={isHovered ? { scale: 1.15, z: 20 } : { scale: 1, z: 0 }} 
        transition={{ duration: 0.4 }}
      >
        <Image
          src={product.imagePath}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-700 rounded-lg"
        />
      </motion.div>

      {/* Vignette Overlay */}
      <div 
        className="absolute inset-0 z-10 rounded-lg"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)'
        }}
      />

      {/* Bullet Trail Effect */}
      {showBullet && (
        <motion.div
          className="absolute top-1/2 z-30 pointer-events-none"
          initial={{ left: '-10%', opacity: 0 }}
          animate={{ 
            left: '110%', 
            opacity: [0, 1, 1, 0],
          }}
          transition={{ 
            duration: 1.2,
            ease: "easeInOut"
          }}
        >
           <div className="relative">
            <motion.div 
              className="w-8 h-2 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 rounded-full"
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 1)",
                  "0 0 10px rgba(255, 215, 0, 0.8)"
                ]
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute left-0 top-0 h-2 bg-gradient-to-l from-yellow-500 to-transparent"
              style={{ width: '40px', marginLeft: '-40px' }}
              animate={{ opacity: [0.8, 0.4, 0.8] }}
              transition={{ duration: 0.2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}

      {/* Title with Shatter Effect */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 text-center px-4">
        <motion.div 
          className="relative inline-block"
          style={{ transformStyle: 'preserve-3d' }}
          animate={ isHovered ? { z: 30 } : { z: 0 } }
          transition={{ duration: 0.4 }}
        >
          {product.title.split("").map((char: string, i: number) => (
            <motion.span
              key={i}
              className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={shattered ? {
                opacity: 1, y: 0,
                x: (i - product.title.length / 2) * (Math.random() * 4),
                rotate: (Math.random() - 0.5) * 10,
              } : { opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: shattered ? i * 0.03 : 0.3 + index * 0.2 + i * 0.05,
                type: "spring", stiffness: shattered ? 200 : 100
              }}
              style={{
                textShadow: shattered 
                  ? `0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 165, 0, 0.6)`
                  : '0 2px 10px rgba(0,0,0,0.8)'
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Impact shockwave */}
        {shattered && (
           <motion.div
            className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-yellow-500 rounded-full"
            style={{ x: '-50%', y: '-50%' }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Hover glow effect (subtler) */}
      <motion.div
        className="absolute inset-0 z-5 pointer-events-none rounded-lg"
        animate={isHovered ? {
          background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.1), transparent 60%)'
        } : { background: 'transparent' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};


// --- MAIN HOME PRODUCTS COMPONENT ---
const HomeProducts = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 }); 
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 0.5]); 
  const bgZ = useTransform(scrollYProgress, [0, 1], [0, -600]);     

  // --- 3. UPDATED PRODUCTS ARRAY ---
  const products: Product[] = [ 
    { 
      id: 1, 
      title: "SMALL ARMS", 
      imagePath: "/Hero_images/small_arms.png", 
      href: "/products/smallarms" 
    },
    { 
      id: 2, 
      title: "AMMUNITION", 
      imagePath: "/Hero_images/ammunation.png", 
      href: "/products/ammunition" 
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-start min-h-screen overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Background Grid */}
       <div className="absolute inset-0 z-0 opacity-20">
        <motion.div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transformStyle: 'preserve-3d', 
            scale: bgScale,                 
            z: bgZ,                         
          }}
          animate={{ backgroundPosition: ['0px 0px', '50px 50px'] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>


      {/* Title */}
      <motion.div
        className="text-center relative z-10 mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white">
          {"OUR PRODUCTS".split("").map((char: string, index: number) => (
             <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                type: "spring", stiffness: 100
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </motion.div>

      {/* Product Cards Container */}
      <div 
        className="mt-8 w-full max-w-7xl relative z-10" 
        style={{ perspective: '1200px' }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {products.map((product, index) => (
            // --- 4. WRAPPED ProductCard WITH Link ---
            <Link key={product.id} href={product.href}>
              <ProductCard 
                product={product}
                index={index}
                isInView={isInView}
                isHovered={hoveredProduct === product.id}
                onHover={() => setHoveredProduct(product.id)} 
                onLeave={() => setHoveredProduct(null)} 
                scrollYProgress={scrollYProgress}
              />
            </Link>
            // ----------------------------------------
          ))}
        </div>
      </div>

      {/* Floating particles effect */}
       {isInView && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

    </section>
  );
};

export default HomeProducts;