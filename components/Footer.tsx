"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link'; // Link is imported

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
      className="bg-black text-gray-400 pt-30 pb-10 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24" 
    >
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
              {/* --- Using <Link> instead of <a> --- */}
              <li><Link href="/products/smallarms" className="hover:text-white transition-colors">SMALL ARMS</Link></li>
              <li><Link href="/products/ammunition" className="hover:text-white transition-colors">AMMUNITION</Link></li>
              <li><Link href="/products/accessories" className="hover:text-white transition-colors">ACCESSORIES</Link></li>
              <li><Link href="/varaha" className="hover:text-white transition-colors">CUAS</Link></li>
            </ul>
          </div>

          {/* COMPANY --- MODIFIED --- */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">COMPANY</h3>
            <ul className="space-y-1.5 text-xs"> 
              {/* --- Changed href to "/company" --- */}
              <li><Link href="/company" className="hover:text-white transition-colors">ABOUT US</Link></li>
              <li><Link href="/company" className="hover:text-white transition-colors">WHAT WE DO</Link></li>
            </ul>
          </div>

          {/* SUPPORT --- MODIFIED --- */}
          <div className="lg:col-span-1"> 
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">SUPPORT</h3> 
            <ul className="space-y-1.5 text-xs"> 
              {/* --- Changed href to "/support" --- */}
              <li><Link href="/support" className="hover:text-white transition-colors">CATALOGS</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">SERVICES</Link></li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-xs font-bold uppercase mb-3 tracking-wider">CONTACTS</h3> 
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/contact" className="hover:text-white transition-colors">INTERNATIONAL</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">MEDIA & PRESS</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">HQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Separator Line */}
        <hr className="border-gray-700 my-8" />

        {/* Terms & Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs space-y-2 sm:space-y-0">
          <Link 
            href="/terms-and-conditions" 
            className="text-gray-500 hover:text-white transition-colors"
          >
            Terms & Condition
          </Link>
          {/* --- Also changed this to a Link as good practice --- */}
          <Link href="/legal" className="text-gray-500 hover:text-white transition-colors">Legal Terms</Link>
        </div>
      </motion.div>
    </footer>
  );
};

// This default export is correct and crucial for avoiding the error you saw earlier.
export default Footer;