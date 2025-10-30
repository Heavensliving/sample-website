"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// 1. Import usePathname for determining the active page
import { usePathname } from 'next/navigation'; 
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  
  // 2. Use usePathname to get the current URL path
  const pathname = usePathname(); 

  // --- Scroll Hide/Show Logic ---
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 10) {
      setHidden(difference > 0 && y > 50);
      lastYRef.current = y;
    }
  });
  // -----------------------------

  // Updated Nav Items
  const navItems = [
    { name: "HOME", href: "/" },
    { name: "PRODUCTS", href: "/products" },
    { name: "COMPANY", href: "/company" },
    { name: "SUPPORT", href: "/support" },
    { name: "CONTACTS", href: "/contacts" },
  ];

  // Helper function to check if a link is active
  const isActive = (href: string) => {
    // For Home, exact match is necessary. For others, check if the path starts with the href.
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, staggerChildren: 0.05 } },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const navbarVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <motion.nav
      className="bg-black fixed top-0 left-0 right-0 z-50 shadow-md"
      variants={navbarVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
           <Image
             src="/sssdefence_logo.png"
             alt="SSS Defence Logo"
             width={180}
             height={40}
             className="h-8 md:h-10 w-auto"
             priority
           />
        </div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex flex-grow items-center justify-center">
          <ul className="flex space-x-10">
            {navItems.map((item) => {
              const active = isActive(item.href); // Check active status using pathname
              return (
                <li key={item.name} className="relative">
                  <Link
                    href={item.href} 
                    // 3. Removed onClick handler for activeLink state update
                    className={`
                      ${active ? "text-white" : "text-gray-400"}
                      font-semibold hover:text-white transition-colors duration-200
                      text-sm uppercase tracking-wider pb-1
                    `}
                  >
                    {item.name}
                  </Link>
                  {/* --- Reticle uses the 'active' variable --- */}
                  {active && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 text-red-500"
                      style={{ x: "-50%", y: "50%" }}
                      layoutId="active-reticle"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0V4" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 12V16" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M16 8H12" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M4 8H0" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </motion.div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

         {/* Right Side Icons (Desktop) */}
         <div className="hidden md:flex items-center space-x-4">
           <button className="text-gray-400 hover:text-white transition-colors">
             <Search size={20} />
           </button>
         </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="x-icon"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={26} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={26} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black border-t border-gray-800 absolute top-20 left-0 w-full z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            layout
          >
            <motion.ul className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item) => {
                const active = isActive(item.href); // Check active status
                return (
                  <motion.li key={item.name} variants={mobileLinkVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)} // Only close the menu
                      className={`
                        ${active ? "text-white font-bold" : "text-gray-400"}
                        text-base font-medium hover:text-white transition-all duration-200
                        uppercase tracking-wider py-2
                      `}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;