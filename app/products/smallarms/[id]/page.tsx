// "use client";

// import React, { Suspense, use, useState } from 'react'; // --- MODIFIED --- (useState)
// import { motion, Variants, AnimatePresence } from 'framer-motion';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
// import Footer from '@/components/Footer';

// // --- START: MODIFIED IMPORTS ---
// // Data and interface are now imported from your external file
// import { Product, smallArms } from './data';

// // --- 3D Model Component ---
// function Model({ modelPath }: { modelPath: string }) {
//   const { scene } = useGLTF(modelPath);
//   return <primitive object={scene} scale={1.5} />;
// }

// // --- 3D Loader Component ---
// function Loader() {
//   const { progress } = useProgress();
//   return (
//     <Html center>
//       <motion.div 
//         className="flex flex-col items-center gap-4"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >
//         <div className="relative w-40 h-40">
//           <svg className="w-full h-full" viewBox="0 0 100 100">
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke="rgba(220, 38, 38, 0.1)"
//               strokeWidth="2"
//             />
//             <motion.circle
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke="rgb(220, 38, 38)"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeDasharray="283"
//               strokeDashoffset={283 - (283 * progress) / 100}
//               transform="rotate(-90 50 50)"
//             />
//           </svg>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <span className="text-2xl font-bold text-red-500 font-mono">
//               {Math.round(progress)}%
//             </span>
//           </div>
//         </div>
//         <div className="text-white font-mono text-sm tracking-wider">LOADING MODEL</div>
//       </motion.div>
//     </Html>
//   );
// }

// // --- Hexagonal Background ---
// const HexagonalBackground: React.FC = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
//       <div 
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23dc2626' stroke-width='0.5'/%3E%3C/svg%3E")`,
//           backgroundSize: '60px 60px',
//         }}
//       />
//       {[...Array(5)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute h-full w-1 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"
//           style={{ left: `${20 + i * 20}%` }}
//           animate={{
//             opacity: [0, 1, 0],
//             y: ['-100%', '200%'],
//           }}
//           transition={{
//             duration: 3 + i,
//             repeat: Infinity,
//             ease: 'linear',
//             delay: i * 0.5,
//           }}
//         />
//       ))}
//       <div className="absolute inset-0 bg-radial-gradient opacity-50" 
//         style={{
//           background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 70%)'
//         }}
//       />
//     </div>
//   );
// };

// // --- Product Not Found Component ---
// const NotFoundComponent: React.FC = () => {
//   return (
//     <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden bg-black">
//       <div className="absolute inset-0 z-0">
//         <HexagonalBackground />
//       </div>
//       <motion.div
//         className="relative z-10 flex flex-col items-center text-center max-w-2xl"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <motion.div
//           className="relative mb-8"
//           animate={{ 
//             filter: [
//               'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
//               'drop-shadow(0 0 40px rgba(220, 38, 38, 0.8))',
//               'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
//             ]
//           }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800">
//             404
//           </span>
//         </motion.div>
//         <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-4">
//           WEAPON NOT FOUND
//         </h1>
//         <p className="text-lg text-gray-400 font-mono">
//           Target does not exist in database
//         </p>
//       </motion.div>
//     </section>
//   );
// };

// // --- 3D Carousel for Related Products ---
// interface CarouselProps {
//   products: Product[];
//   currentProductId: number;
// }

// const RelatedProductsCarousel: React.FC<CarouselProps> = ({ products, currentProductId }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % products.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
//   };

//   // Get 5 visible items (2 left, center, 2 right)
//   const getVisibleProducts = () => {
//     const visible = [];
//     for (let i = -2; i <= 2; i++) {
//       const index = (currentIndex + i + products.length) % products.length;
//       visible.push({ product: products[index], position: i });
//     }
//     return visible;
//   };

//   const handleCardClick = (product: Product, position: number) => {
//     if (position === 0) {
//       // Use client-side navigation instead of full page reload
//       window.location.href = `/products/smallarms/${product.id}`;
//     } else if (position > 0) {
//       handleNext();
//     } else {
//       handlePrev();
//     }
//   };

//   return (
//     <div className="relative py-32 px-4 md:px-6 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div
//             className="inline-block mb-6"
//             animate={{ 
//               boxShadow: [
//                 '0 0 20px rgba(220, 38, 38, 0.3)',
//                 '0 0 40px rgba(220, 38, 38, 0.6)',
//                 '0 0 20px rgba(220, 38, 38, 0.3)',
//               ]
//             }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <div className="px-6 py-2 border border-red-500 bg-red-500/10 rounded-full">
//               <span className="text-sm text-red-500 font-mono uppercase tracking-widest">
//                 More Arsenal
//               </span>
//             </div>
//           </motion.div>
          
//           <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider mb-4">
//             EXPLORE MORE
//           </h2>
          
//           <motion.div
//             className="mt-6 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent max-w-md mx-auto"
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//           />
//         </motion.div>

//         {/* Carousel Container */}
//         <div className="relative h-[500px] flex items-center justify-center">
          
//           {/* Navigation Buttons (Visible on all screens) */}
//           <motion.button
//             onClick={handlePrev}
//             className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center group shadow-lg shadow-red-500/50"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.svg
//               className="w-6 h-6 md:w-8 md:h-8 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               animate={{ x: [-2, 0, -2] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
//             </motion.svg>
//           </motion.button>

//           <motion.button
//             onClick={handleNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center group shadow-lg shadow-red-500/50"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <motion.svg
//               className="w-6 h-6 md:w-8 md:h-8 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               animate={{ x: [0, 2, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
//             </motion.svg>
//           </motion.button>

//           {/* Cards Container */}
//           <div className="relative w-full h-full flex items-center justify-center perspective-1000">
//             <AnimatePresence mode="popLayout">
//               {getVisibleProducts().map(({ product, position }) => {
//                 const isCenter = position === 0;
//                 const distance = Math.abs(position);
                
//                 const xOffset = position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 280); // Tighter spacing on mobile
//                 const scale = isCenter ? 1.2 : 1 - distance * 0.15;
//                 const opacity = isCenter ? 1 : 0.3;
//                 const zIndex = 50 - Math.abs(position);
//                 const rotateY = position * -8;
//                 const blur = distance > 0 ? distance * 2 : 0;
                
//                 return (
//                   <motion.div
//                     key={product.id}
//                     className="absolute cursor-pointer"
//                     style={{ 
//                       zIndex,
//                       filter: `blur(${blur}px)`,
//                     }}
//                     initial={{ 
//                       x: position * 500,
//                       scale: 0.5,
//                       opacity: 0,
//                       rotateY: position * -20,
//                     }}
//                     animate={{
//                       x: xOffset,
//                       scale,
//                       opacity,
//                       rotateY,
//                     }}
//                     exit={{ 
//                       x: position * 500,
//                       scale: 0.5,
//                       opacity: 0,
//                       rotateY: position * -20,
//                     }}
//                     transition={{
//                       type: 'spring',
//                       stiffness: 260,
//                       damping: 20,
//                     }}
//                     onClick={() => handleCardClick(product, position)}
//                     whileHover={isCenter ? { 
//                       scale: 1.25,
//                       y: -10,
//                       transition: { duration: 0.2 }
//                     } : {}}
//                   >
//                     <motion.div
//                       className="relative w-[200px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden" // Responsive card width
//                       style={{
//                         transformStyle: 'preserve-3d',
//                       }}
//                     >
//                       {/* Glowing border for center card */}
//                       {isCenter && (
//                         <motion.div
//                           className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur-lg"
//                           animate={{
//                             opacity: [0.5, 1, 0.5],
//                           }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}

//                       {/* Card content */}
//                       <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden border-2 border-red-500/30">
                        
//                         <div className="absolute inset-0 opacity-10"
//                           style={{
//                             backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill='none' stroke='%23dc2626' stroke-width='0.5'/%3E%3C/svg%3E")`,
//                             backgroundSize: '40px 40px',
//                           }}
//                         />

//                         {/* Image */}
//                         <div className="relative h-[75%] flex items-center justify-center p-4 md:p-8">
//                           <img
//                             src={product.imagePath}
//                             alt={product.name}
//                             className="w-full h-full object-contain"
//                           />
                          
//                           {isCenter && (
//                             <motion.div
//                               className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
//                               animate={{ y: ['-100%', '200%'] }}
//                               transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
//                             />
//                           )}
//                         </div>

//                         {/* Name section */}
//                         <div className="relative h-[25%] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm border-t border-red-500/30">
//                           <div className="text-center">
//                             <h3 className={`font-bold uppercase tracking-wider transition-all duration-300 ${
//                               isCenter 
//                                 ? 'text-lg md:text-2xl text-white' // Responsive text
//                                 : 'text-xs md:text-sm text-gray-400' // Responsive text
//                             }`}>
//                               {product.name}
//                             </h3>
                            
//                             {isCenter && (
//                               <motion.div
//                                 className="mt-2 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
//                                 initial={{ scaleX: 0 }}
//                                 animate={{ scaleX: 1 }}
//                                 transition={{ duration: 0.5 }}
//                               />
//                             )}
//                           </div>
//                         </div>

//                         {isCenter && (
//                           <>
//                             {[
//                               'top-0 left-0 border-t-4 border-l-4',
//                               'top-0 right-0 border-t-4 border-r-4',
//                               'bottom-0 left-0 border-b-4 border-l-4',
//                               'bottom-0 right-0 border-b-4 border-r-4',
//                             ].map((position, i) => (
//                               <motion.div
//                                 key={i}
//                                 className={`absolute w-8 h-8 md:w-10 md:h-10 border-red-500 ${position}`} // Responsive corners
//                                 animate={{ opacity: [0.3, 1, 0.3] }}
//                                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
//                               />
//                             ))}
//                           </>
//                         )}
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>

//           {/* Progress Indicators */}
//           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40"> 
//             {products.map((_, index) => (
//               <motion.button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className="relative"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//               >
//                 <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                   index === currentIndex 
//                     ? 'bg-red-500 w-10 shadow-lg shadow-red-500/50' 
//                     : 'bg-white/30 hover:bg-white/50'
//                 }`} />
//               </motion.button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Product Detail Page ---
// interface ProductDetailPageProps {
//   params: {
//     id: string;
//   };
// }

// const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
//   const resolvedParams = use(params as any) as { id: string };
//   const productId = parseInt(resolvedParams.id, 10);
  
//   // This 'smallArms' variable is now the one imported from './data.ts'
//   const product = smallArms.find(p => p.id === productId);
//   const relatedProducts = smallArms.filter(p => p.id !== productId);

//   // --- MODIFIED --- Added state for 3D/Image toggle, default to '3d'
//   const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');

//   if (!product) {
//     return <NotFoundComponent />;
//   }

//   return (
//     <section className="relative min-h-screen w-full overflow-hidden bg-black">
//       <div className="absolute inset-0 z-0">
//         <HexagonalBackground />
//       </div>

//       <div className="relative z-10 min-h-screen flex flex-col">
        
//         {/* Main Content Area */}
//         <main className="flex-grow">
          
//           {/* Hero Section with 3D Model */}
//           <div className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
//             <div className="w-full max-w-7xl">
              
//               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-28 lg:pt-20"> 
                
//                 {/* --- 3D Model / Image (Left) --- */}
//                 <motion.div
//                   className="lg:col-span-5 order-1 lg:order-1"
//                   initial={{ opacity: 0, x: -50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.4 }}
//                 >
//                   <div className="relative">
//                     <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 z-10 pointer-events-none">
//                       {[
//                         'top-0 left-0 border-t-4 border-l-4',
//                         'top-0 right-0 border-t-4 border-r-4',
//                         'bottom-0 left-0 border-b-4 border-l-4',
//                         'bottom-0 right-0 border-b-4 border-r-4',
//                       ].map((position, i) => (
//                         <motion.div
//                           key={i}
//                           className={`absolute w-8 h-8 md:w-12 md:h-12 border-red-500 ${position}`} // Responsive corners
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: [0.5, 1, 0.5] }}
//                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
//                         />
//                       ))}
//                     </div>

//                     <div className="relative h-[400px] sm:h-[500px] md:h-[700px] rounded-2xl overflow-hidden backdrop-blur-sm bg-black/20">
                      
//                       {/* --- MODIFIED --- Conditional Rendering for 3D or Image */}
//                       {viewMode === '3d' ? (
//                         <>
//                           {/* 3D View Content */}
//                           <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
//                             {[0, 0.7, 1.4].map((delay) => (
//                               <motion.div
//                                 key={delay}
//                                 className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] border-2 border-red-600/40 rounded-full" // Responsive circles
//                                 animate={{ 
//                                   scale: [0.6, 1.5, 0.6], 
//                                   opacity: [0.8, 0, 0.8] 
//                                 }}
//                                 transition={{ 
//                                   duration: 3, 
//                                   repeat: Infinity, 
//                                   ease: 'easeInOut', 
//                                   delay: delay 
//                                 }}
//                               />
//                             ))}
                            
//                             <motion.div
//                               className="absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] border-2 border-dashed border-red-600/20 rounded-full" // Responsive circles
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//                             >
//                               <div className="absolute top-0 left-1/2 w-px h-6 -translate-x-1/2 bg-red-600" />
//                               <div className="absolute bottom-0 left-1/2 w-px h-6 -translate-x-1/2 bg-red-600" />
//                               <div className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-red-600" />
//                               <div className="absolute right-0 top-1/2 h-px w-6 -translate-y-1/2 bg-red-600" />
//                             </motion.div>
//                           </div>

//                           <div className="cursor-grab active:cursor-grabbing w-full h-full">
//                             <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
//                               <ambientLight intensity={1.5} />
//                               <directionalLight position={[10, 10, 5]} intensity={2.5} />
//                               <directionalLight position={[-10, -10, -5]} intensity={1.5} />
//                               <pointLight position={[0, 5, 0]} intensity={2} color="#dc2626" />
//                               <pointLight position={[0, -5, 0]} intensity={1} color="#3b82f6" />
                              
//                               <Suspense fallback={<Loader />}>
//                                 <Model modelPath={product.modelPath} />
//                               </Suspense>
                              
//                               <OrbitControls 
//                                 enableZoom={false} 
//                                 enablePan={false}
//                                 autoRotate
//                                 autoRotateSpeed={2}
//                                 minDistance={1.5}
//                                 maxDistance={10}
//                               />
//                             </Canvas>
//                           </div>
//                         </>
//                       ) : (
//                         // --- MODIFIED --- Image View Content
//                         <img
//                           src={product.imagePath}
//                           alt={product.name}
//                           className="w-full h-full object-contain p-8"
//                         />
//                       )}
//                     </div>

//                     <motion.div 
//                       className="absolute bottom-6 left-6 right-6 hidden sm:flex justify-between items-center"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 1.5 }}
//                     >
//                       {/* --- MODIFIED --- Only show DRAG text in 3D mode */}
//                       <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-red-500/30">
//                         {viewMode === '3d' && (
//                           <span className="text-xs text-gray-300 font-mono">DRAG TO ROTATE</span>
//                         )}
//                         {/* --- MODIFIED --- Show placeholder text in image mode */}
//                         {viewMode === 'image' && (
//                           <span className="text-xs text-gray-300 font-mono">IMAGE VIEW</span>
//                         )}
//                       </div>
                      
//                       {/* --- MODIFIED --- Toggle Button */}
//                       <button
//                         onClick={() => setViewMode(viewMode === '3d' ? 'image' : '3d')}
//                         className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-red-500/30 text-xs text-gray-300 font-mono hover:bg-red-500/20 hover:text-white transition-all"
//                       >
//                         {viewMode === '3d' ? 'VIEW AS IMAGE' : 'VIEW AS 3D'}
//                       </button>
                      
//                     </motion.div>
//                   </div>
//                 </motion.div>

//                 {/* --- Product Info (Right) --- */}
//                 <motion.div
//                   className="lg:col-span-7 space-y-8 order-2 lg:order-2"
//                   initial={{ opacity: 0, x: 50 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.8, delay: 0.3 }}
//                 >
//                   <div>
//                     <motion.h1
//                       className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white mb-4 relative" // Responsive text
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       {product.name.split(' ').map((word, i) => (
//                         <motion.div
//                           key={i}
//                           className="inline-block mr-4"
//                           initial={{ x: -20, opacity: 0 }}
//                           animate={{ x: 0, opacity: 1 }}
//                           transition={{ delay: 0.6 + i * 0.1 }}
//                         >
//                           {word}
//                         </motion.div>
//                       ))}
//                     </motion.h1>
                    
//                     <motion.div
//                       className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent"
//                       initial={{ width: 0 }}
//                       animate={{ width: '100%' }}
//                       transition={{ delay: 1, duration: 0.8 }}
//                     />
//                   </div>

//                   <motion.div
//                     className="relative"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.9 }}
//                   >
//                     <div className="absolute -left-4 top-0 bottom-0 w-1 bg-red-600" />
//                     <div className="pl-6">
//                       <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
//                         Caliber
//                       </div>
//                       <div className="text-2xl sm:text-3xl font-bold text-red-500 font-mono tracking-wider"> {/* Responsive text */}
//                         {product.spec}
//                       </div>
//                     </div>
//                   </motion.div>

//                   {product.description && (
//                     <motion.div
//                       className="relative p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg backdrop-blur-sm"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1.1 }}
//                     >
//                       <div className="absolute top-0 left-0 w-full h-full border-2 border-red-500/0 rounded-lg transition-all duration-300 hover:border-red-500/30" />
//                       <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10">
//                         {product.description}
//                       </p>
//                     </motion.div>
//                   )}
//                 </motion.div>

//               </div>
//             </div>
//           </div>

//           {/* Technical Specifications Section */}
//           {product.features && product.features.length > 0 && (
//             <div className="relative py-20 px-4 md:px-6">
//               <div className="max-w-7xl mx-auto">
                
//                 <motion.div
//                   className="text-center mb-16"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider">
//                     SPECIFICATIONS
//                   </h2>
                  
//                   <motion.div
//                     className="mt-6 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent max-w-md mx-auto"
//                     initial={{ scaleX: 0 }}
//                     whileInView={{ scaleX: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: 0.3, duration: 0.8 }}
//                   />
//                 </motion.div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {product.features.map((feature, index) => (
//                     <motion.div
//                       key={feature.key}
//                       className="group relative"
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.05, duration: 0.5 }}
//                       whileHover={{ scale: 1.05, zIndex: 10 }}
//                     >
//                       <div className="relative h-full p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20">
                        
//                         <motion.div
//                           className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         />

//                         <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

//                         <div className="relative z-10 flex flex-col h-full">
//                           <div className="flex items-start justify-between mb-4">
//                             <div className="flex-1">
//                               <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">
//                                 {feature.key}
//                               </div>
//                               <div className="h-0.5 w-12 bg-red-500 group-hover:w-full transition-all duration-500" />
//                             </div>
//                           </div>

//                           <div className="flex-1 flex items-end">
//                             <motion.div
//                               className="text-xl md:text-2xl font-bold text-white font-mono group-hover:text-red-400 transition-colors"
//                               whileHover={{ x: 5 }}
//                             >
//                               {feature.value}
//                             </motion.div>
//                           </div>

//                           <div className="absolute top-2 right-2 text-6xl font-black text-white/5 group-hover:text-red-500/10 transition-colors">
//                             {String(index + 1).padStart(2, '0')}
//                           </div>
//                         </div>

//                         <motion.div
//                           className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400"
//                           initial={{ width: 0 }}
//                           whileInView={{ width: '100%' }}
//                           viewport={{ once: true }}
//                           transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
//                         />
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Related Products Carousel */}
//           <RelatedProductsCarousel products={relatedProducts} currentProductId={productId} />

//         </main> 
        
//         <Footer />
        
//       </div>
//     </section>
//   );
// };

// export default ProductDetailPage;

"use client";

import React, { Suspense, use, useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei';
import Footer from '@/components/Footer';

// --- START: MODIFIED IMPORTS ---
// Data and interface are now imported from your external file
import { Product, smallArms } from './data';
// --- END: MODIFIED IMPORTS ---

// --- 3D Model Component ---
function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.5} />;
}

// --- 3D Loader Component ---
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <motion.div 
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(220, 38, 38, 0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(220, 38, 38)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-red-500 font-mono">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        <div className="text-white font-mono text-sm tracking-wider">LOADING MODEL</div>
      </motion.div>
    </Html>
  );
}

// --- Hexagonal Background ---
const HexagonalBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23dc2626' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-1 bg-gradient-to-b from-transparent via-red-500/30 to-transparent"
          style={{ left: `${20 + i * 20}%` }}
          animate={{
            opacity: [0, 1, 0],
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 0.5,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-radial-gradient opacity-50" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 70%)'
        }}
      />
    </div>
  );
};

// --- Product Not Found Component ---
const NotFoundComponent: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <HexagonalBackground />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="relative mb-8"
          animate={{ 
            filter: [
              'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
              'drop-shadow(0 0 40px rgba(220, 38, 38, 0.8))',
              'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800">
            404
          </span>
        </motion.div>
        <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-4">
          WEAPON NOT FOUND
        </h1>
        <p className="text-lg text-gray-400 font-mono">
          Target does not exist in database
        </p>
      </motion.div>
    </section>
  );
};

// --- 3D Carousel for Related Products ---
interface CarouselProps {
  products: Product[];
  currentProductId: number;
}

const RelatedProductsCarousel: React.FC<CarouselProps> = ({ products, currentProductId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Get 5 visible items (2 left, center, 2 right)
  const getVisibleProducts = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + products.length) % products.length;
      visible.push({ product: products[index], position: i });
    }
    return visible;
  };

  const handleCardClick = (product: Product, position: number) => {
    if (position === 0) {
      // Use client-side navigation instead of full page reload
      window.location.href = `/products/smallarms/${product.id}`;
    } else if (position > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div className="relative py-32 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(220, 38, 38, 0.3)',
                '0 0 40px rgba(220, 38, 38, 0.6)',
                '0 0 20px rgba(220, 38, 38, 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="px-6 py-2 border border-red-500 bg-red-500/10 rounded-full">
              <span className="text-sm text-red-500 font-mono uppercase tracking-widest">
                More Arsenal
              </span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider mb-4">
            EXPLORE MORE
          </h2>
          
          <motion.div
            className="mt-6 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent max-w-md mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Carousel Container */}
        <div className="relative h-[500px] flex items-center justify-center">
          
          {/* Navigation Buttons (Visible on all screens) */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center group shadow-lg shadow-red-500/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center group shadow-lg shadow-red-500/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>

          {/* Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            <AnimatePresence mode="popLayout">
              {getVisibleProducts().map(({ product, position }) => {
                const isCenter = position === 0;
                const distance = Math.abs(position);
                
                const xOffset = position * (typeof window !== 'undefined' && window.innerWidth < 768 ? 120 : 280); // Tighter spacing on mobile
                const scale = isCenter ? 1.2 : 1 - distance * 0.15;
                const opacity = isCenter ? 1 : 0.3;
                const zIndex = 50 - Math.abs(position);
                const rotateY = position * -8;
                const blur = distance > 0 ? distance * 2 : 0;
                
                return (
                  <motion.div
                    key={product.id}
                    className="absolute cursor-pointer"
                    style={{ 
                      zIndex,
                      filter: `blur(${blur}px)`,
                    }}
                    initial={{ 
                      x: position * 500,
                      scale: 0.5,
                      opacity: 0,
                      rotateY: position * -20,
                    }}
                    animate={{
                      x: xOffset,
                      scale,
                      opacity,
                      rotateY,
                    }}
                    exit={{ 
                      x: position * 500,
                      scale: 0.5,
                      opacity: 0,
                      rotateY: position * -20,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                    }}
                    onClick={() => handleCardClick(product, position)}
                    whileHover={isCenter ? { 
                      scale: 1.25,
                      y: -10,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <motion.div
                      className="relative w-[200px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden" // Responsive card width
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Glowing border for center card */}
                      {isCenter && (
                        <motion.div
                          className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur-lg"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Card content */}
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden border-2 border-red-500/30">
                        
                        <div className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l17.32 10v20L20 40 2.68 30V10z' fill='none' stroke='%23dc2626' stroke-width='0.5'/%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px',
                          }}
                        />

                        {/* Image */}
                        <div className="relative h-[75%] flex items-center justify-center p-4 md:p-8">
                          <img
                            src={product.imagePath}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                          
                          {isCenter && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"
                              animate={{ y: ['-100%', '200%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            />
                          )}
                        </div>

                        {/* Name section */}
                        <div className="relative h-[25%] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm border-t border-red-500/30">
                          <div className="text-center">
                            <h3 className={`font-bold uppercase tracking-wider transition-all duration-300 ${
                              isCenter 
                                ? 'text-lg md:text-2xl text-white' // Responsive text
                                : 'text-xs md:text-sm text-gray-400' // Responsive text
                            }`}>
                              {product.name}
                            </h3>
                            
                            {isCenter && (
                              <motion.div
                                className="mt-2 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.5 }}
                              />
                            )}
                          </div>
                        </div>

                        {isCenter && (
                          <>
                            {[
                              'top-0 left-0 border-t-4 border-l-4',
                              'top-0 right-0 border-t-4 border-r-4',
                              'bottom-0 left-0 border-b-4 border-l-4',
                              'bottom-0 right-0 border-b-4 border-r-4',
                            ].map((position, i) => (
                              <motion.div
                                key={i}
                                className={`absolute w-8 h-8 md:w-10 md:h-10 border-red-500 ${position}`} // Responsive corners
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress Indicators */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40"> 
            {products.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-red-500 w-10 shadow-lg shadow-red-500/50' 
                    : 'bg-white/30 hover:bg-white/50'
                }`} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Product Detail Page ---
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const resolvedParams = use(params as any) as { id: string };
  const productId = parseInt(resolvedParams.id, 10);
  
  // This 'smallArms' variable is now the one imported from './data.ts'
  const product = smallArms.find(p => p.id === productId);
  const relatedProducts = smallArms.filter(p => p.id !== productId);

  const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');

  if (!product) {
    return <NotFoundComponent />;
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <HexagonalBackground />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Main Content Area */}
        <main className="flex-grow">
          
          {/* Hero Section with 3D Model */}
          <div className="relative min-h-screen flex items-center justify-center px-4 md:px-6 py-20">
            <div className="w-full max-w-7xl">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start pt-28 lg:pt-20"> 
                
                {/* --- 3D Model / Image (Left) --- */}
                <motion.div
                  className="lg:col-span-5 lg:row-span-2 order-2 lg:order-1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl border-2 border-red-500/30 z-10 pointer-events-none">
                      {[
                        'top-0 left-0 border-t-4 border-l-4',
                        'top-0 right-0 border-t-4 border-r-4',
                        'bottom-0 left-0 border-b-4 border-l-4',
                        'bottom-0 right-0 border-b-4 border-r-4',
                      ].map((position, i) => (
                        <motion.div
                          key={i}
                          className={`absolute w-8 h-8 md:w-12 md:h-12 border-red-500 ${position}`} // Responsive corners
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>

                    {/* --- FIX 1: Removed backdrop-blur-sm --- */}
                    <div className="relative h-[400px] sm:h-[500px] md:h-[700px] rounded-2xl overflow-hidden bg-black/20">
                      
                      {viewMode === '3d' ? (
                        <>
                          {/* 3D View Content */}
                          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                            {[0, 0.7, 1.4].map((delay) => (
                              <motion.div
                                key={delay}
                                className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] border-2 border-red-600/40 rounded-full" // Responsive circles
                                animate={{ 
                                  scale: [0.6, 1.5, 0.6], 
                                  opacity: [0.8, 0, 0.8] 
                                }}
                                transition={{ 
                                  duration: 3, 
                                  repeat: Infinity, 
                                  ease: 'easeInOut', 
                                  delay: delay 
                                }}
                              />
                            ))}
                            
                            <motion.div
                              className="absolute w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] border-2 border-dashed border-red-600/20 rounded-full" // Responsive circles
                              animate={{ rotate: 360 }}
                              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            >
                              <div className="absolute top-0 left-1/2 w-px h-6 -translate-x-1/2 bg-red-600" />
                              <div className="absolute bottom-0 left-1/2 w-px h-6 -translate-x-1/2 bg-red-600" />
                              <div className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-red-600" />
                              <div className="absolute right-0 top-1/2 h-px w-6 -translate-y-1/2 bg-red-600" />
                            </motion.div>
                          </div>

                          <div className="cursor-grab active:cursor-grabbing w-full h-full">
                            <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                              <ambientLight intensity={1.5} />
                              <directionalLight position={[10, 10, 5]} intensity={2.5} />
                              <directionalLight position={[-10, -10, -5]} intensity={1.5} />
                              <pointLight position={[0, 5, 0]} intensity={2} color="#dc2626" />
                              <pointLight position={[0, -5, 0]} intensity={1} color="#3b82f6" />
                              
                              <Suspense fallback={<Loader />}>
                                <Model modelPath={product.modelPath} />
                              </Suspense>
                              
                              <OrbitControls 
                                // --- FIX 2: Enabled Zoom ---
                                enableZoom={true} 
                                enablePan={false}
                                autoRotate
                                autoRotateSpeed={2}
                                minDistance={1.5}
                                maxDistance={10}
                              />
                            </Canvas>
                          </div>
                        </>
                      ) : (
                        <img
                          src={product.imagePath}
                          alt={product.name}
                          className="w-full h-full object-contain p-8"
                        />
                      )}
                    </div>

                    <motion.div 
                      className="absolute bottom-6 left-6 right-6 flex justify-between items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-red-500/30">
                        {viewMode === '3d' && (
                          <span className="text-xs text-gray-300 font-mono">DRAG TO ROTATE</span>
                        )}
                        {viewMode === 'image' && (
                          <span className="text-xs text-gray-300 font-mono">IMAGE VIEW</span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setViewMode(viewMode === '3d' ? 'image' : '3d')}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-red-500/30 text-xs text-gray-300 font-mono hover:bg-red-500/20 hover:text-white transition-all"
                      >
                        {viewMode === '3d' ? 'VIEW AS IMAGE' : 'VIEW AS 3D'}
                      </button>
                      
                    </motion.div>
                  </div>
                </motion.div>

                {/* --- Product Info (Name & Caliber) --- */}
                <motion.div
                  className="lg:col-span-7 lg:col-start-6 lg:row-start-1 space-y-8 order-1 lg:order-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div>
                    <motion.h1
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white mb-4 relative" // Responsive text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {product.name.split(' ').map((word, i) => (
                        <motion.div
                          key={i}
                          className="inline-block mr-4"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          {word}
                        </motion.div>
                      ))}
                    </motion.h1>
                    
                    <motion.div
                      className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 0.8 }}
                    />
                  </div>

                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-red-600" />
                    <div className="pl-6">
                      <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                        Caliber
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-red-500 font-mono tracking-wider"> {/* Responsive text */}
                        {product.spec}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* --- Product Description --- */}
                {product.description && (
                  <motion.div
                    className="lg:col-span-7 lg:col-start-6 lg:row-start-2 order-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div
                      className="relative p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-lg backdrop-blur-sm"
                    >
                      <div className="absolute top-0 left-0 w-full h-full border-2 border-red-500/0 rounded-lg transition-all duration-300 hover:border-red-500/30" />
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10">
                        {product.description}
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          {product.features && product.features.length > 0 && (
            <div className="relative py-20 px-4 md:px-6">
              <div className="max-w-7xl mx-auto">
                
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-wider">
                    SPECIFICATIONS
                  </h2>
                  
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent max-w-md mx-auto"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.features.map((feature, index) => (
                    <motion.div
                      key={feature.key}
                      className="group relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                    >
                      <div className="relative h-full p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-red-500 group-hover:shadow-lg group-hover:shadow-red-500/20">
                        
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />

                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">
                                {feature.key}
                              </div>
                              <div className="h-0.5 w-12 bg-red-500 group-hover:w-full transition-all duration-500" />
                            </div>
                          </div>

                          <div className="flex-1 flex items-end">
                            <motion.div
                              className="text-xl md:text-2xl font-bold text-white font-mono group-hover:text-red-400 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {feature.value}
                            </motion.div>
                          </div>

                          <div className="absolute top-2 right-2 text-6xl font-black text-white/5 group-hover:text-red-500/10 transition-colors">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                        </div>

                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related Products Carousel */}
          <RelatedProductsCarousel products={relatedProducts} currentProductId={productId} />

        </main> 
        
        <Footer />
        
      </div>
    </section>
  );
};

export default ProductDetailPage;