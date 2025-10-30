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
//             ].map(item => (
//                 <div key={item.id} className="flex flex-col items-center text-center group relative p-6 bg-transparent rounded-xl">
//                       <div className="w-full aspect-[4/3] bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
//                         {/* The img tag automatically works with the new paths */}
//                         <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
//                       </div>
//                       <h2 className="text-lg font-medium uppercase tracking-widest text-white group-hover:text-red-500">{item.name}</h2>
//                       {/* ✅ REMOVED THIS LINE: <p className="text-sm text-gray-400 font-mono">{item.spec}</p> */}
//                 </div>
//             ))}
//         </div>
//     </section>
// );

// export default AmmunitionList;

"use client";

import React from 'react';
import { motion } from 'framer-motion';

// This component was formerly AmmunitionGrid
const AmmunitionList: React.FC = () => (
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 md:gap-y-20">
            {/* Image paths */}
            {[
              {id: 1, name: '9 x 19mm', spec: '124gr FMJ', img: '/Ammunition/9 x 19mm.png'},
              {id: 2, name: '5.56 x 45mm', spec: 'M855 Ball', img: '/Ammunition/5.56 x 45mm.png'},
              {id: 3, name: '.300 Blackout', spec: '150gr HPBT', img: '/Ammunition/300 Blackout.png'},
              {id: 4, name: '7.62 x 39mm', spec: '123gr FMJ', img: '/Ammunition/7.62 x 39mm.png'},
              {id: 5, name: '7.62 x 51mm', spec: '168gr BTHP', img: '/Ammunition/7.62 x 51mm.png'},
              {id: 6, name: '.338', spec: '250gr Scenar', img: '/Ammunition/338.png'},
              {id: 7, name: '12.7mm (.50)', spec: 'M33 Ball', img: '/Ammunition/12.7mm (.50).png'},
            ].map((item, index) => (
                <motion.div 
                    key={item.id} 
                    className="flex flex-col items-center text-center group relative p-6 bg-transparent rounded-xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                >
                      <motion.div 
                          className="w-full aspect-[4/3] bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative border border-zinc-700/50 shadow-lg"
                          whileHover={{ 
                              boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)",
                              borderColor: "rgba(239, 68, 68, 0.5)"
                          }}
                          transition={{ duration: 0.3 }}
                      >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-red-600/0 via-red-600/0 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <motion.img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-full object-contain relative z-10 p-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-0 group-hover:opacity-100"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                      <motion.h2 
                          className="text-lg font-medium uppercase tracking-widest text-white group-hover:text-red-500 transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                      >
                          {item.name}
                      </motion.h2>
                      <motion.div
                          className="mt-2 h-px w-0 bg-red-600 group-hover:w-full transition-all duration-500"
                      />
                </motion.div>
            ))}
        </div>
    </section>
);

export default AmmunitionList;