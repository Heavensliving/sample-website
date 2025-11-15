

// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';

// // This component was formerly AmmunitionGrid
// const AmmunitionList: React.FC = () => (
//     <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-6 lg:px-8 xl:px-16 2xl:px-24 relative">
//         <motion.div
//             className="max-w-7xl mx-auto mb-12 sm:mb-16 relative"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//         >
//             <div className="flex items-center justify-center gap-4 sm:gap-6">
//               <motion.div 
//                 className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600/30 to-red-600/50"
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1, delay: 0.4 }}
//               />
//               <motion.span 
//                   className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-red-600 font-bold"
//                   animate={{ opacity: [0.7, 1, 0.7] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//               >
//                   AMMUNITION
//               </motion.span>
//               <motion.div 
//                 className="h-px flex-1 bg-gradient-to-l from-transparent via-red-600/30 to-red-600/50"
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 1, delay: 0.4 }}
//               />
//             </div>
//         </motion.div>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-20">
//             {/* Image paths */}
//             {[
//               {id: 1, name: '9 x 19mm', spec: '124gr FMJ', img: '/Ammunition/9 x 19mm.png'},
//               {id: 2, name: '5.56 x 45mm', spec: 'M855 Ball', img: '/Ammunition/5.56 x 45mm.png'},
//               {id: 3, name: '.300 Blackout', spec: '150gr HPBT', img: '/Ammunition/300 Blackout.png'},
//               {id: 4, name: '7.62 x 39mm', spec: '123gr FMJ', img: '/Ammunition/7.62 x 39mm.png'},
//               {id: 5, name: '7.62 x 51mm', spec: '168gr BTHP', img: '/Ammunition/7.62 x 51mm.png'},
//               {id: 6, name: '.338', spec: '250gr Scenar', img: '/Ammunition/338.png'},
//               {id: 7, name: '12.7mm (.50)', spec: 'M33 Ball', img: '/Ammunition/12.7mm (.50).png'},
//             ].map((item, index) => (
//                 <motion.div 
//                     key={item.id} 
//                     className="flex flex-col items-center text-center group relative p-6 bg-transparent rounded-xl"
//                     initial={{ opacity: 0, y: 50 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, margin: "-100px" }}
//                     transition={{ duration: 0.6, delay: index * 0.1 }}
//                     whileHover={{ y: -8 }}
//                 >
//                       <motion.div 
//                           className="w-full aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative border border-zinc-700/50 shadow-lg"
//                           whileHover={{ 
//                               boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
//                               borderColor: "rgba(239, 68, 68, 0.5)"
//                           }}
//                           transition={{ duration: 0.3 }}
//                       >
//                         <motion.div
//                             className="absolute inset-0 bg-gradient-to-tr from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                         />
//                         <motion.img 
//                             src={item.img} 
//                             alt={item.name} 
//                             className="w-full h-full object-contain relative z-10 p-4"
//                             whileHover={{ scale: 1.05 }}
//                             transition={{ duration: 0.3 }}
//                         />
//                         <motion.div
//                             className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100"
//                             initial={{ scaleX: 0 }}
//                             whileHover={{ scaleX: 1 }}
//                             transition={{ duration: 0.5 }}
//                         />
//                       </motion.div>
//                       <motion.h2 
//                           className="text-lg font-medium uppercase tracking-widest text-white group-hover:text-red-500 transition-colors duration-300"
//                           whileHover={{ scale: 1.05 }}
//                       >
//                           {item.name}
//                       </motion.h2>
//                       <motion.div
//                           className="mt-2 h-px w-0 bg-red-600 group-hover:w-full transition-all duration-500"
//                       />
//                 </motion.div>
//             ))}
//         </div>
//     </section>
// );

// export default AmmunitionList;

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Using lucide-react for a clean X icon, or you can use your own

// --- NEW IMPORTS ---
// Import the data and types from the new file
import { ammunitionData } from './ammunitionData';
import type { AmmunitionItem } from './ammunitionData';


// --- SPEC TABLE COMPONENT ---
// A small helper component to render the spec table nicely
const SpecTable: React.FC<{ specs: Record<string, string> }> = ({ specs }) => (
  <div className="mt-6 flow-root">
    <ul className="-my-4 divide-y divide-zinc-700">
      {Object.entries(specs).map(([key, value]) => (
        <li key={key} className="flex items-center justify-between gap-4 py-4">
          <span className="text-sm font-medium text-zinc-400">{key}</span>
          <span className="text-sm font-semibold text-white text-right">{value}</span>
        </li>
      ))}
    </ul>
  </div>
);


// --- DETAIL MODAL COMPONENT ---
// This component displays the selected item in an overlay.
const AmmunitionDetail: React.FC<{ item: AmmunitionItem, onClose: () => void }> = ({ item, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { details } = item;
  const hasVariants = details && details.variants && details.variants.length > 0;
  const activeVariant = hasVariants ? details.variants[activeTab] : null;

  return (
    // Backdrop
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Modal Panel */}
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the panel
        className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-700/50 rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.1 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-zinc-500 hover:text-red-500 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Image Panel */}
        <div className="w-full md:w-1/3 flex-shrink-0 bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 sm:p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-zinc-700/50">
          <motion.img
            src={item.img}
            alt={item.name}
            className="w-full h-full object-contain max-h-[200px] md:max-h-full"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        {/* Content Panel */}
        <div className="w-full md:w-2/3 p-6 sm:p-8 overflow-y-auto">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-red-500">{item.name}</h1>
          <p className="mt-2 text-base text-zinc-300">
            {details?.description || 'No description available.'}
          </p>

          {hasVariants && (
            <div className="mt-6">
              {/* Tab Headers */}
              {details.variants.length > 1 && (
                <div className="flex border-b border-zinc-700 space-x-4">
                  {details.variants.map((variant, index) => (
                    <button
                      key={variant.name}
                      onClick={() => setActiveTab(index)}
                      className={`relative py-3 px-1 text-sm font-medium transition-colors ${
                        activeTab === index 
                          ? 'text-red-500' 
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {variant.name}
                      {activeTab === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                          layoutId="tab-underline"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVariant?.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* We can safely use '!' since we check 'hasVariants' */}
                  <SpecTable specs={activeVariant!.specs} /> 
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- MAIN AMMUNITION LIST COMPONENT ---
const AmmunitionList: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<AmmunitionItem | null>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-6 lg:px-8 xl:px-16 2xl:px-24 relative">
      <motion.div
          className="max-w-7xl mx-auto mb-12 sm:mb-16 relative"
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
            <motion.span 
                className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] text-red-600 font-bold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                AMMUNITION
            </motion.span>
            <motion.div 
              className="h-px flex-1 bg-gradient-to-l from-transparent via-red-600/30 to-red-600/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </div>
      </motion.div>

      {/* Ammunition Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-20">
          
          {ammunitionData.map((item, index) => (
              <motion.div 
                  key={item.id} 
                  // --- MODIFIED ---
                  // Conditionally add cursor-pointer
                  className={`flex flex-col items-center text-center group relative p-6 bg-transparent rounded-xl ${
                    item.clickable ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  // --- MODIFIED ---
                  // Conditionally add hover animation
                  whileHover={item.clickable ? { y: -8 } : {}}
                  // --- MODIFIED ---
                  // Conditionally set the item
                  onClick={() => {
                    if (item.clickable) {
                      setSelectedItem(item);
                    }
                  }}
              >
                    <motion.div 
                        // --- MODIFIED ---
                        // Use item.clickable to control hover effects
                        className="w-full aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative border border-zinc-700/50 shadow-lg"
                        whileHover={item.clickable ? { 
                            boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
                            borderColor: "rgba(239, 68, 68, 0.5)"
                        } : {}}
                        transition={{ duration: 0.3 }}
                    >
                      <motion.div
                          className="absolute inset-0 bg-gradient-to-tr from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 transition-opacity duration-500"
                          // --- MODIFIED ---
                          // Only show hover effect if clickable
                          style={{ opacity: item.clickable ? undefined : 0 }}
                      />
                      <motion.img 
                          src={item.img} 
                          alt={item.name} 
                          className="w-full h-full object-contain relative z-10 p-4"
                          whileHover={item.clickable ? { scale: 1.05 } : {}}
                          transition={{ duration: 0.3 }}
                      />
                      <motion.div
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0"
                          // --- MODIFIED ---
                          // Only show hover effect if clickable
                          style={{ opacity: item.clickable ? undefined : 0 }}
                      />
                    </motion.div>
                    <motion.h2 
                        className={`text-lg font-medium uppercase tracking-widest text-white transition-colors duration-300 ${
                          item.clickable && 'group-hover:text-red-500'
                        }`}
                        whileHover={item.clickable ? { scale: 1.05 } : {}}
                    >
                        {item.name}
                    </motion.h2>
                    <motion.p className={`text-sm text-zinc-400 transition-colors ${
                      item.clickable && 'group-hover:text-zinc-300'
                    }`}>
                      {item.spec}
                    </motion.p>
                    <motion.div
                        className="mt-2 h-px w-0 bg-red-600 transition-all duration-500"
                        // --- MODIFIED ---
                        // Only show hover effect if clickable
                        style={{ width: item.clickable ? undefined : 0 }}
                    />
              </motion.div>
          ))}
      </div>

      {/* Modal Display */}
      <AnimatePresence>
        {selectedItem && (
          <AmmunitionDetail 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>

    </section>
  );
};

export default AmmunitionList;