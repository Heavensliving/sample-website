// "use client";

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, Variants } from 'framer-motion';

// // --- Product Data ---
// const smallArms = [
//   { id: 1, name: '.338 SABER', spec: '.338 Lapua Magnum', imagePath: '/small_arms/SABER1.png' },
//   { id: 2, name: '.308 VIPER', spec: '7.62 x 51mm', imagePath: '/small_arms/VIPER.png' },
//   { id: 3, name: 'M72 CARBINE', spec: '5.56 x 45mm', imagePath: '/small_arms/CARBINE.png' },
//   { id: 4, name: 'P72 ASSAULT', spec: '7.62 x 39mm', imagePath: '/small_arms/P72 ASSAULT.png' },
//   { id: 5, name: 'T72 DMR/ASSAULT RIFLE', spec: '7.62 x 51mm', imagePath: '/small_arms/DMRASSAULT.png' },
//   { id: 6, name: 'RAPTOR', spec: '.300 Blackout', imagePath: '/small_arms/RAPTOR.png' },
//   { id: 7, name: 'G72 SMC & CSMC', spec: '9 x 19mm', imagePath: '/small_arms/SMC & CSMC.png' },
//   { id: 8, name: 'C72 P', spec: '9 x 19mm', imagePath: '/small_arms/C72 P.png' },
// ];

// // --- Animation Variants ---
// const staggerContainer: Variants = {
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { 
//       staggerChildren: 0.12,
//       delayChildren: 0.2
//     } 
//   },
// };

// const cardVariants: Variants = {
//   hidden: { 
//     opacity: 0, 
//     y: 60,
//     rotateX: -15,
//     scale: 0.9,
//     filter: "blur(8px)"
//   },
//   visible: { 
//     opacity: 1, 
//     y: 0,
//     rotateX: 0,
//     scale: 1,
//     filter: "blur(0px)",
//     transition: { 
//       duration: 0.8, 
//       ease: [0.22, 1, 0.36, 1]
//     }
//   },
// };

// const imageVariants: Variants = {
//   loading: { 
//     scale: 0.85, 
//     opacity: 0.2,
//     filter: "blur(10px)"
//   },
//   loaded: { 
//     scale: 1, 
//     opacity: 1,
//     filter: "blur(0px)",
//     transition: { 
//       duration: 0.7, 
//       ease: [0.22, 1, 0.36, 1]
//     }
//   }
// };


// const Arsenal: React.FC = () => {
//   const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

//   const handleImageLoad = (id: number) => {
//     setLoadedImages(prev => new Set(prev).add(id));
//   };

//   return (
//     // PRODUCTS GRID SECTION
//     <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 relative">
//       {/* Enhanced Section header */}
//       <motion.div
//         className="max-w-7xl mx-auto mb-12 sm:mb-16 relative" // Responsive margin
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//       >
//         <div className="flex items-center justify-center gap-4 sm:gap-6">
//           <motion.div 
//             className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600/30 to-red-600/50"
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.4 }}
//           />
          
//           <div className="relative">
//             {/* Animated reticle */}
//             <motion.div
//               className="w-4 h-4 border-2 border-red-600 rotate-45"
//               animate={{ rotate: [45, 225, 45] }}
//               transition={{ duration: 3, repeat: Infinity }}
//             />
//             <motion.div 
//               className="absolute inset-0 w-4 h-4 border-2 border-red-600/30 rotate-45"
//               animate={{ 
//                 scale: [1, 1.5, 1],
//                 opacity: [1, 0, 1]
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//             />
//           </div>
          
//           <motion.span 
//             className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-red-600 font-bold" // Responsive text
//             animate={{ opacity: [0.7, 1, 0.7] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             ARSENAL
//           </motion.span>
          
//           <div className="relative">
//             <motion.div
//               className="w-4 h-4 border-2 border-red-600 rotate-45"
//               animate={{ rotate: [45, 225, 45] }}
//               transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
//             />
//             <motion.div 
//               className="absolute inset-0 w-4 h-4 border-2 border-red-600/30 rotate-45"
//               animate={{ 
//                 scale: [1, 1.5, 1],
//                 opacity: [1, 0, 1]
//               }}
//               transition={{ duration: 2, repeat: Infinity, delay: 1 }}
//             />
//           </div>
          
//           <motion.div 
//             className="h-px flex-1 bg-gradient-to-l from-transparent via-red-600/30 to-red-600/50"
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1, delay: 0.4 }}
//           />
//         </div>
//       </motion.div>

//       <motion.div
//         // This grid is the core of the responsiveness: 1, 2, 3, and 4 columns
//         className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-20"
//         variants={staggerContainer}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//       >
//         {smallArms.map((product, index) => (
//           <motion.div
//             key={product.id}
//             variants={cardVariants}
//             className="flex flex-col items-center text-center group relative perspective-1000"
//             whileHover={{ scale: 1.05, z: 50 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Animated product number tag */}
//             <motion.div
//               className="absolute -top-6 -left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1.5 shadow-lg"
//               initial={{ scale: 0, rotate: -180 }}
//               whileInView={{ scale: 1, rotate: 0 }}
//               viewport={{ once: true }}
//               transition={{ 
//                 delay: index * 0.12 + 0.4, 
//                 type: "spring",
//                 stiffness: 200
//               }}
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               style={{
//                 clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)'
//               }}
//             >
//               #{String(product.id).padStart(2, '0')}
//             </motion.div>

//             {/* Product Image Container */}
//             <Link href={`/products/small-arms/${product.id}`} className="relative w-full aspect-square mb-6 md:mb-8">
//               <motion.div 
//                 className="relative w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-800 group-hover:border-red-600/70 transition-all duration-500 shadow-xl"
//                 whileHover={{ 
//                   boxShadow: "0 20px 60px rgba(220, 38, 38, 0.3)",
//                   y: -5
//                 }}
//               >
//                 {/* Animated corner accents */}
//                 {[
//                   { pos: 'top-3 left-3', border: 'border-l-2 border-t-2' },
//                   { pos: 'top-3 right-3', border: 'border-r-2 border-t-2' },
//                   { pos: 'bottom-3 left-3', border: 'border-l-2 border-b-2' },
//                   { pos: 'bottom-3 right-3', border: 'border-r-2 border-b-2' },
//                 ].map((corner, i) => (
//                   <motion.div
//                     key={i}
//                     className={`absolute ${corner.pos} w-6 h-6 ${corner.border} border-red-600/0 group-hover:border-red-600 transition-all duration-500`}
//                     initial={{ opacity: 0, scale: 0 }}
//                     whileInView={{ opacity: 1, scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: index * 0.12 + 0.5 + i * 0.05 }}
//                   />
//                 ))}

//                 {/* Product image with advanced loading state */}
//                 <motion.div
//                   className="relative w-full h-full z-10"
//                   variants={imageVariants}
//                   initial="loading"
//                   animate={loadedImages.has(product.id) ? "loaded" : "loading"}
//                 >
//                   <Image
//                     src={product.imagePath}
//                     alt={product.name}
//                     layout="fill"
//                     objectFit="contain"
//                     className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 drop-shadow-2xl"
//                     onLoadingComplete={() => handleImageLoad(product.id)}
//                   />
//                 </motion.div>

//                 {/* Enhanced loading overlay */}
//                 {!loadedImages.has(product.id) && (
//                   <>
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/15 to-transparent"
//                       animate={{ x: ['-200%', '200%'] }}
//                       transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//                     />
//                     <motion.div
//                       className="absolute inset-0 flex items-center justify-center"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: [0.3, 0.6, 0.3] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
//                     </motion.div>
//                   </>
//                 )}

//                 {/* Hover glow effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-t from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:via-transparent group-hover:to-red-600/10 transition-all duration-500 pointer-events-none"
//                 />
//               </motion.div>
//             </Link>

//             {/* Product Details with staggered animations */}
//             <motion.h2
//               className="text-lg sm:text-xl font-bold uppercase tracking-[0.15em] text-white group-hover:text-red-500 transition-colors duration-300 mb-2"
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.12 + 0.6 }}
//             >
//               {product.name}
//             </motion.h2>
            
//             <motion.p
//               className="text-sm text-gray-400 font-mono tracking-wide mb-3"
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.12 + 0.7 }}
//             >
//               {product.spec}
//             </motion.p>
            
//             {/* Enhanced accent line */}
//             <motion.div
//               className="relative h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-2 overflow-hidden"
//               initial={{ width: 0, opacity: 0 }}
//               whileInView={{ width: 60, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.12 + 0.8, duration: 0.6 }}
//             >
//               <motion.div
//                 className="absolute inset-0 bg-white"
//                 animate={{ x: ['-100%', '100%'] }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   repeatDelay: 3,
//                   ease: "easeInOut"
//                 }}
//               />
//             </motion.div>

//             {/* Enhanced hover target lock effect */}
//             <motion.div
//               className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               initial={false}
//             >
//               {/* Crosshair lines */}
//               <motion.div 
//                 className="absolute top-0 left-1/2 w-px h-6 bg-gradient-to-b from-red-600 to-transparent -translate-x-1/2"
//                 initial={{ height: 0 }}
//                 whileInView={{ height: 24 }}
//               />
//               <motion.div 
//                 className="absolute bottom-0 left-1/2 w-px h-6 bg-gradient-to-t from-red-600 to-transparent -translate-x-1/2"
//                 initial={{ height: 0 }}
//                 whileInView={{ height: 24 }}
//               />
//               <motion.div 
//                 className="absolute left-0 top-1/2 w-6 h-px bg-gradient-to-r from-red-600 to-transparent -translate-y-1/2"
//                 initial={{ width: 0 }}
//                 whileInView={{ width: 24 }}
//               />
//               <motion.div 
//                 className="absolute right-0 top-1/2 w-6 h-px bg-gradient-to-l from-red-600 to-transparent -translate-y-1/2"
//                 initial={{ width: 0 }}
//                 whileInView={{ width: 24 }}
//               />
              
//               {/* Circular targeting ring */}
//               <motion.div
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-red-600/30 rounded-full"
//                 initial={{ scale: 0, rotate: 0 }}
//                 whileInView={{ scale: 1, rotate: 360 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//               />
//             </motion.div>

//             {/* Background glow on hover */}
//             <motion.div
//               className="absolute -inset-4 bg-red-600/0 group-hover:bg-red-600/5 rounded-2xl blur-xl transition-all duration-500 -z-10"
//             />
//           </motion.div>
//         ))}
//       </motion.div>
      
//     </section>
//   );
// };

// export default Arsenal;



"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

// --- Product Data ---
const smallArms = [
  { id: 1, name: '.338 SABER', spec: '.338 Lapua Magnum', imagePath: '/small_arms/SABER1.png' },
  { id: 2, name: '.308 VIPER', spec: '7.62 x 51mm', imagePath: '/small_arms/VIPER.png' },
  { id: 3, name: 'M72 CARBINE', spec: '5.56 x 45mm', imagePath: '/small_arms/CARBINE.png' },
  { id: 4, name: 'P72 ASSAULT', spec: '7.62 x 39mm', imagePath: '/small_arms/P72 ASSAULT.png' },
  { id: 5, name: 'T72 DMR/ASSAULT RIFLE', spec: '7.62 x 51mm', imagePath: '/small_arms/DMRASSAULT.png' },
  { id: 6, name: 'RAPTOR', spec: '.300 Blackout', imagePath: '/small_arms/RAPTOR.png' },
  { id: 7, name: 'G72 SMC & CSMC', spec: '9 x 19mm', imagePath: '/small_arms/SMC & CSMC.png' },
  { id: 8, name: 'C72 P', spec: '9 x 19mm', imagePath: '/small_arms/C72 P.png' },
];

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12,
      delayChildren: 0.2
    } 
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    rotateX: -15,
    scale: 0.9,
    filter: "blur(8px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

const imageVariants: Variants = {
  loading: { 
    scale: 0.85, 
    opacity: 0.2,
    filter: "blur(10px)"
  },
  loaded: { 
    scale: 1, 
    opacity: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};


const Arsenal: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => new Set(prev).add(id));
  };

  return (
    // PRODUCTS GRID SECTION
    // --- THIS IS THE UPDATED LINE ---
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-6 lg:px-8 xl:px-16 2xl:px-24 relative">
      {/* Enhanced Section header */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 sm:mb-16 relative" // Responsive margin
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <motion.div 
            className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600/30 to-red-600/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          
          <div className="relative">
            {/* Animated reticle */}
            <motion.div
              className="w-4 h-4 border-2 border-red-600 rotate-45"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-0 w-4 h-4 border-2 border-red-600/30 rotate-45"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          <motion.span 
            className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-red-600 font-bold" // Responsive text
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ARSENAL
          </motion.span>
          
          <div className="relative">
            <motion.div
              className="w-4 h-4 border-2 border-red-600 rotate-45"
              animate={{ rotate: [45, 225, 45] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
            <motion.div 
              className="absolute inset-0 w-4 h-4 border-2 border-red-600/30 rotate-45"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [1, 0, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <motion.div 
            className="h-px flex-1 bg-gradient-to-l from-transparent via-red-600/30 to-red-600/50"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </div>
      </motion.div>

      <motion.div
        // This grid is the core of the responsiveness: 1, 2, 3, and 4 columns
        className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {smallArms.map((product, index) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            className="flex flex-col items-center text-center group relative perspective-1000"
            whileHover={{ scale: 1.05, z: 50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated product number tag */}
            <motion.div
              className="absolute -top-6 -left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1.5 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.12 + 0.4, 
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)'
              }}
            >
              #{String(product.id).padStart(2, '0')}
            </motion.div>

            {/* Product Image Container */}
            <Link href={`/products/small-arms/${product.id}`} className="relative w-full aspect-square mb-6 md:mb-8">
              <motion.div 
                className="relative w-full h-full bg-white rounded-xl overflow-hidden flex items-center justify-center p-6 border border-gray-800 group-hover:border-red-600/70 transition-all duration-500 shadow-xl"
                whileHover={{ 
                  boxShadow: "0 20px 60px rgba(220, 38, 38, 0.3)",
                  y: -5
                }}
              >
                {/* Animated corner accents */}
                {[
                  { pos: 'top-3 left-3', border: 'border-l-2 border-t-2' },
                  { pos: 'top-3 right-3', border: 'border-r-2 border-t-2' },
                  { pos: 'bottom-3 left-3', border: 'border-l-2 border-b-2' },
                  { pos: 'bottom-3 right-3', border: 'border-r-2 border-b-2' },
                ].map((corner, i) => (
                  <motion.div
                    key={i}
                    className={`absolute ${corner.pos} w-6 h-6 ${corner.border} border-red-600/0 group-hover:border-red-600 transition-all duration-500`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.5 + i * 0.05 }}
                  />
                ))}

                {/* Product image with advanced loading state */}
                <motion.div
                  className="relative w-full h-full z-10"
                  variants={imageVariants}
                  initial="loading"
                  animate={loadedImages.has(product.id) ? "loaded" : "loading"}
                >
                  <Image
                    src={product.imagePath}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 drop-shadow-2xl"
                    onLoadingComplete={() => handleImageLoad(product.id)}
                  />
                </motion.div>

                {/* Enhanced loading overlay */}
                {!loadedImages.has(product.id) && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/15 to-transparent"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                    </motion.div>
                  </>
                )}

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-red-600/0 via-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:via-transparent group-hover:to-red-600/10 transition-all duration-500 pointer-events-none"
                />
              </motion.div>
            </Link>

            {/* Product Details with staggered animations */}
            <motion.h2
              className="text-lg sm:text-xl font-bold uppercase tracking-[0.15em] text-white group-hover:text-red-500 transition-colors duration-300 mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.6 }}
            >
              {product.name}
            </motion.h2>
            
            <motion.p
              className="text-sm text-gray-400 font-mono tracking-wide mb-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.7 }}
            >
              {product.spec}
            </motion.p>
            
            {/* Enhanced accent line */}
            <motion.div
              className="relative h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-2 overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 60, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.8, duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Enhanced hover target lock effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            >
              {/* Crosshair lines */}
              <motion.div 
                className="absolute top-0 left-1/2 w-px h-6 bg-gradient-to-b from-red-600 to-transparent -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: 24 }}
              />
              <motion.div 
                className="absolute bottom-0 left-1/2 w-px h-6 bg-gradient-to-t from-red-600 to-transparent -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: 24 }}
              />
              <motion.div 
                className="absolute left-0 top-1/2 w-6 h-px bg-gradient-to-r from-red-600 to-transparent -translate-y-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
              />
              <motion.div 
                className="absolute right-0 top-1/2 w-6 h-px bg-gradient-to-l from-red-600 to-transparent -translate-y-1/2"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
              />
              
              {/* Circular targeting ring */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-red-600/30 rounded-full"
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </motion.div>

            {/* Background glow on hover */}
            <motion.div
              className="absolute -inset-4 bg-red-600/0 group-hover:bg-red-600/5 rounded-2xl blur-xl transition-all duration-500 -z-10"
            />
          </motion.div>
        ))}
      </motion.div>
      
    </section>
  );
};

export default Arsenal;