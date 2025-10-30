"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  // Define animation props for the content wrapper
  const contentAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.5 },
  };

  return (
    <footer 
      // ✅ FIX: Changed py-10 to pt-20 pb-10 to increase top padding
      className="bg-black text-gray-400 pt-30 pb-10 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24" 
    >
      {/* 2. Added motion.div wrapper for content animation */}
      <motion.div 
        className="max-w-7xl mx-auto"
        {...contentAnimation} // Apply all animation props here
      >
        {/* Main Grid for Logo/Address and Nav Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8 xl:gap-12"> 
          {/* Logo and Address Column */}
          <div className="md:col-span-2 lg:col-span-2 mb-8 md:mb-0"> 
            <div className="mb-4">
              <Image
                src="/sssdefence_logo.png" // Path to your logo in the public folder
                alt="SSS Defence Logo"
                width={180} // Adjust width
                height={40} // Adjust height
                className="h-9 w-auto" // Slightly smaller logo rendering
              />
            </div>
            <p className="text-xs leading-relaxed max-w-xs md:max-w-none"> 
              Plot No 283/B, Bommasandra Jigani <br />
              Link Road, K.I.A.D.B Industrial Area <br />
              Bengaluru Karnataka- 560105
            </p>
          </div>

          {/* Navigation Link Columns */}
          {/* PRODUCTS */}
          <div className="lg:col-span-1"> 
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">PRODUCTS</h3> 
            <ul className="space-y-1.5 text-xs"> 
              <li><a href="#" className="hover:text-white transition-colors">SMALL ARMS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">AMMUNITION</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ACCESSORIES</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CUAS</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">COMPANY</h3>
            <ul className="space-y-1.5 text-xs"> 
              <li><a href="#" className="hover:text-white transition-colors">ABOUT US</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WHAT WE DO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">NEWS & EVENTS</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="lg:col-span-1"> 
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">SUPPORT</h3> 
            <ul className="space-y-1.5 text-xs"> 
              <li><a href="#" className="hover:text-white transition-colors">CATALOGS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">WARRANTY</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SERVICES</a></li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">CONTACTS</h3> 
            <ul className="space-y-1.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">INTERNATIONAL</a></li>
              <li><a href="#" className="hover:text-white transition-colors">MEDIA & PRESS</a></li>
              <li><a href="#" className="hover:text-white transition-colors">HQ</a></li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-700 my-8" />

        {/* Terms & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs space-y-2 sm:space-y-0">
          <p className="text-gray-500 hover:text-white transition-colors cursor-pointer">Terms & Condition</p>
          <p className="text-gray-500 hover:text-white transition-colors cursor-pointer">Legal Terms</p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;