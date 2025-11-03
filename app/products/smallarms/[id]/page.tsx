"use client";

// app/products/smallarms/[id]/page.tsx

import React, { Suspense, use } from 'react'; // Import 'Suspense' AND 'use'
import { motion, Variants } from 'framer-motion';
// import { notFound } from 'next/navigation'; // <-- REMOVED this import
import { Canvas } from '@react-three/fiber'; // Import Canvas
import { OrbitControls, useGLTF, Html, useProgress } from '@react-three/drei'; // Import helpers

// --- Product Data (UPDATED) ---
// This should be imported from a shared file, but is here for the example
const smallArms = [
  { 
    id: 1, 
    name: '.338 SABER', 
    spec: '.338 Lapua Magnum', 
    imagePath: '/small_arms/SABER1.png',
    modelPath: '/small_arms/SABER1.glb'
  },
  { 
    id: 2, 
    name: '.308 VIPER', 
    spec: '7.62 x 51mm', 
    imagePath: '/small_arms/VIPER.png',
    modelPath: '/small_arms/VIPER.glb'
  },
  { 
    id: 3, 
    name: 'M72 CARBINE', 
    spec: '5.56 x 45mm', 
    imagePath: '/small_arms/CARBINE.png',
    modelPath: '/small_arms/CARBINE.glb'
  },
  { 
    id: 4, 
    name: 'P72 ASSAULT', 
    spec: '7.62 x 39mm', 
    imagePath: '/small_arms/P72 ASSAULT.png',
    modelPath: '/small_arms/P72 ASSAULT.glb'
  },
  { 
    id: 5, 
    name: 'T72 DMR/ASSAULT RIFLE', 
    spec: '7.62 x 51mm', 
    imagePath: '/small_arms/DMRASSAULT.png',
    modelPath: '/small_arms/DMRASSAULT.glb'
  },
  { 
    id: 6, 
    name: 'RAPTOR', 
    spec: '.300 Blackout', 
    imagePath: '/small_arms/RAPTOR.png',
    modelPath: '/small_arms/RAPTOR.glb'
  },
  { 
    id: 7, 
    name: 'G72 SMC & CSMC', 
    spec: '9 x 19mm', 
    imagePath: '/small_arms/SMC & CSMC.png',
    modelPath: '/small_arms/SMC & CSMC.glb'
  },
  { 
    id: 8, 
    name: 'C72 P', 
    spec: '9 x 19mm', 
    imagePath: '/small_arms/C72 P.png',
    modelPath: '/small_arms/C72 P.glb'
  },
];

// Define a type for a single product (UPDATED)
interface Product {
  id: number;
  name: string;
  spec: string;
  imagePath: string;
  modelPath: string; // <-- ADDED
}

// --- 3D Model Component ---
// This component loads and displays the GLB model
function Model({ modelPath }: { modelPath: string }) {
  // useGLTF hooks into Suspense automatically
  const { scene } = useGLTF(modelPath);
  // --- UPDATED SCALE ---
  return <primitive object={scene} scale={1.5} />; // <-- Increased scale from 1 to 1.5
}

// --- 3D Loader Component ---
// This component shows a loading percentage while the model is downloaded
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white font-mono text-lg">
        {Math.round(progress)}% LOADED
      </div>
    </Html>
  );
}

// --- Animation Variants ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Animated Background Component ---
// This is the same as before, but modified to be a self-contained component
const TargetingBackground: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden"> 
      {/* Grid lines */}
      <div className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Pulsing rings */}
      {[0, 0.5, 1].map((delay) => (
        <motion.div
          key={delay}
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-2 border-red-600/50 rounded-full"
          style={{ x: '-50%', y: '-50%' }}
          animate={{ scale: [0.5, 1.5, 0.5], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: delay }}
        />
      ))}
      {/* Rotating crosshair */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] md:w-[550px] md:h-[550px] border-2 border-dashed border-red-600/30 rounded-full"
        style={{ x: '-50%', y: '-50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[352px] h-[352px] md:w-[552px] md:h-[552px] "
        style={{ x: '-50%', y: '-50%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 w-px h-4 -translate-x-1/2 bg-red-600" />
        <div className="absolute bottom-0 left-1/2 w-px h-4 -translate-x-1/2 bg-red-600" />
        <div className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-red-600" />
        <div className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-red-600" />
      </motion.div>{/* <-- FIX 1: Corrected closing tag */}
    </div> 
  );
};

// --- Product Not Found Component ---
const NotFoundComponent: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <TargetingBackground />
      </div>
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.2em] text-red-500 mb-4">
          404 - NOT FOUND
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-mono tracking-wide mb-8">
          The requested product could not be located.
        </p>
      </motion.div>
    </section>
  );
};


// --- Product Detail Page ---
interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  // FIX for params promise: We MUST unwrap the promise
  // We use `params as any` to bypass the incorrect type-hint 
  // and `as { id: string }` to type the result.
  const resolvedParams = use(params as any) as { id: string };
  const productId = parseInt(resolvedParams.id, 10); // <-- Use the unwrapped params
  const product = smallArms.find(p => p.id === productId);

  // Handle case where product is not found
  if (!product) {
    return <NotFoundComponent />; // <-- REPLACED notFound()
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 px-6 overflow-hidden bg-black">
      
      {/* Main Content: Two-column layout with top padding */}
      <motion.div
        className="relative z-10 flex flex-col lg:grid lg:grid-cols-5 items-center justify-center lg:gap-x-16 w-full max-w-7xl px-4 pt-16 lg:pt-24"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Left Section (3D MODEL + BG) - UPDATED SIZE */}
        <motion.div
          className="relative w-full h-[50vh] lg:col-span-3 lg:min-h-[70vh] flex-shrink-0" // <-- Updated class
          variants={itemVariants}
        >
          {/* Targeting BG is in the back */}
          <div className="absolute inset-0 z-0">
            <TargetingBackground />
          </div> 
          
          {/* --- THIS IS THE 3D VIEWER --- */}
          {/* Replaced the <img> motion.div */}
          <div className="relative w-full h-full z-10 cursor-grab active:cursor-grabbing">
            {/* --- UPDATED CAMERA POSITION (to match minDistance) --- */}
            <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}> {/* <-- Camera position set to 1.5 */}
              {/* Added lights for the model */}
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <directionalLight position={[-10, -10, -5]} intensity={1} />
              
              <Suspense fallback={<Loader />}>
                <Model modelPath={product.modelPath} />
              </Suspense>
              
              {/* --- UPDATED MIN DISTANCE --- */}
              <OrbitControls 
                enableZoom={true} 
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.5}
                minDistance={1.5} // <-- This is the max zoom
                maxDistance={10} // This is the max zoom out
              />
            </Canvas>
          </div>

          {/* Background Image Glow (still here, behind canvas) */}
          <motion.div
            className="absolute inset-0 bg-red-600/10 rounded-full blur-3xl -z-10"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div> 

        {/* 2. Right Section (Text) */}
        <motion.div 
            className="flex flex-col items-center lg:items-start text-center lg:text-left mt-12 lg:mt-0 lg:col-span-2 pr-0 lg:pr-16"
        >
            {/* Product Name */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-[0.2em] text-white mb-4"
              variants={itemVariants}
            >
              {product.name}
            </motion.h1> 

            {/* Product Spec */}
            <motion.p
              className="text-lg sm:text-xl text-red-500 font-mono tracking-wide mb-8"
              variants={itemVariants}
            >
              {product.spec}
            </motion.p>{/* <-- FIX 2: Corrected closing tag */}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default ProductDetailPage;


