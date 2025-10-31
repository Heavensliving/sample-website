"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const productCategories = [
  {
    id: 'small-arms',
    title: 'SMALL ARMS',
    imagePath: '/products_images/smallarm_product.png',
    link: '/products/smallarms',
  },
  {
    id: 'ammunition',
    title: 'AMMUNITION',
    imagePath: '/products_images/amminition_product.jpg',
    link: '/products/ammunition',
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    imagePath: '/products_images/accessories_product.png',
    link: '/products/accessories',
  },
  {
    id: 'varaha',
    title: 'VARAHA',
    imagePath: '/products_images/varaha_product.png',
    link: '/varaha',
  },
];

const ProductsPage: React.FC = () => {
  // Stagger animation variants for cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as any, 
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      {/* 🎯 FIX 1: Removed pt-40 and items-start. Let flex-grow and justify-center handle the space. */}
      {/* Horizontal padding remains for general content safety. */}
      <main className="flex-grow flex justify-center p-6 lg:p-8 xl:p-12">
        <motion.div 
          // 🎯 FIX 2: Added mt-40 directly to the content grid to push it below the fixed Navbar.
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto w-full mt-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {productCategories.map((category, index) => {
            
            const isEven = index % 2 === 0;
            const isVaraha = category.id === 'varaha';
            
            const objectPositionStyle = isVaraha ? '90% center' : 'center center';
            
            // Position adjustment: Apply mt-8 ONLY from the 'lg' breakpoint onward.
            const verticalOffset = isEven ? 'mt-0' : 'lg:mt-8';
            
            return (
              <motion.a
                key={category.id}
                href={category.link}
                className={`relative aspect-[3/4] overflow-hidden group cursor-pointer ${verticalOffset}`}
                style={{
                  clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)',
                }}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Conditional wrapper for Varaha's animated image */}
                {isVaraha ? (
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Image
                      src={category.imagePath}
                      alt={category.title}
                      layout="fill"
                      objectFit="cover"
                      style={{ objectPosition: objectPositionStyle }}
                      className="transition-all duration-700 ease-out group-hover:brightness-75"
                    />
                  </motion.div>
                ) : (
                  <Image
                    src={category.imagePath}
                    alt={category.title}
                    layout="fill"
                    objectFit="cover"
                    style={{ objectPosition: objectPositionStyle }}
                    className="transition-all duration-700 ease-out group-hover:scale-115 group-hover:brightness-75 group-hover:rotate-1"
                  />
                )}
                
                {/* Subtle glow effect for Varaha */}
                {isVaraha && (
                  <motion.div
                    className="absolute inset-0 bg-blue-500/10"
                    animate={{
                      opacity: [0.05, 0.15, 0.05],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                {/* Animated overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Alternating title position */}
                <div className={`absolute inset-x-0 ${isEven ? 'bottom-0' : 'top-0'} p-6 flex ${isEven ? 'items-end' : 'items-start'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: isEven ? 20 : -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    className="w-full"
                  >
                    {/* Accent line - blue for Varaha, red for others */}
                    <motion.div 
                      className={`h-1 ${isVaraha ? 'bg-blue-500' : 'bg-red-600'} mb-3`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '60px' }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
                    />
                    
                    <h2 className={`text-xl sm:text-2xl font-bold uppercase tracking-wider text-white ${isVaraha ? 'group-hover:text-blue-400' : 'group-hover:text-red-500'} transition-colors duration-300 drop-shadow-lg`}>
                      {category.title}
                    </h2>
                    
                    {/* Hover indicator */}
                    <motion.div
                      className={`flex items-center gap-2 mt-2 text-sm text-gray-300 ${isVaraha ? 'group-hover:text-blue-400' : 'group-hover:text-red-400'}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span>Explore</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Animated border on hover - blue for Varaha, red for others */}
                <motion.div
                  className={`absolute inset-0 border-2 ${isVaraha ? 'border-blue-500' : 'border-red-600'} opacity-0 group-hover:opacity-100`}
                  style={{
                    clipPath: 'polygon(0 0, 90% 0, 100% 10%, 100% 100%, 10% 100%, 0 90%)',
                  }}
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;