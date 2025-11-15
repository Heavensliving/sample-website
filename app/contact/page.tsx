// "use client";

// import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar'; // Added Navbar
// import Footer from '@/components/Footer';
// import { motion, Variants } from 'framer-motion';

// // --- Form State Types ---

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   organization: string;
//   purpose: string;
//   isGov: string;
//   message: string;
//   confirmAccuracy: boolean;
//   confirmContact: boolean;
// }

// type FormErrors = Partial<Record<keyof FormData, string>>;

// // --- ANIMATION VARIANTS ---
// const heroVariants: Variants = {
//   hidden: { opacity: 0, scale: 1.15 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 1.5,
//       ease: [0.22, 1, 0.36, 1]
//     }
//   },
// };

// const titleVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 100,
//     rotateX: -25,
//     filter: "blur(10px)"
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     rotateX: 0,
//     filter: "blur(0px)",
//     transition: {
//       duration: 1.2,
//       delay: 0.4,
//       ease: [0.22, 1, 0.36, 1]
//     }
//   },
// };

// // --- Page Component ---

// export default function ContactPage() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     organization: '',
//     purpose: '',
//     isGov: '',
//     message: '',
//     confirmAccuracy: false,
//     confirmContact: false,
//   });

//   const [errors, setErrors] = useState<FormErrors>({});

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // --- MODIFIED handleChange ---
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const fieldName = name as keyof FormData;

//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setFormData((prev) => ({ ...prev, [fieldName]: checked }));
//     } else {
//       let processedValue = value;
//       // Only allow numbers for the phone field
//       if (name === 'phone') {
//         processedValue = value.replace(/[^0-9]/g, '');
//       }
//       setFormData((prev) => ({ ...prev, [fieldName]: processedValue }));
//     }

//     if (errors[fieldName]) {
//       setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
//     }
//   };

//   const validateForm = (): FormErrors => {
//     const newErrors: FormErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]+$/; // Optional: Add a validation rule

//     if (!formData.name) newErrors.name = 'Name is required.';
//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Email is invalid. Please use a valid format.';
//     }
//     if (!formData.phone) {
//       newErrors.phone = 'Phone No. is required.';
//     } else if (!phoneRegex.test(formData.phone)) {
//        // You can add more specific validation if you want
//       newErrors.phone = 'Phone No. is invalid.';
//     }
//     if (!formData.purpose) newErrors.purpose = 'Purpose of Enquiry is required.';
//     if (!formData.isGov) newErrors.isGov = 'Please select an option.';
//     if (!formData.message) newErrors.message = 'Message is required.';
//     if (!formData.confirmAccuracy) {
//       newErrors.confirmAccuracy = 'You must confirm this information.';
//     }
//     if (!formData.confirmContact) {
//       newErrors.confirmContact = 'You must agree to be contacted.';
//     }

//     return newErrors;
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log('Form Submitted:', formData);
//       setFormSubmitted(true);
//       setTimeout(() => {
//         setFormSubmitted(false);
//         setFormData({
//           name: '', email: '', phone: '', organization: '',
//           purpose: '', isGov: '', message: '',
//           confirmAccuracy: false, confirmContact: false,
//         });
//       }, 3000);
//     } else {
//       console.log('Validation failed');
//     }
//   };

//   const errorClass = (field: keyof FormData) => {
//     return 'border-gray-700 focus:ring-gray-500 hover:border-gray-500';
//   };

//   return (
//     <>
//       <style jsx>{`
//         /* ... (Your existing keyframes) ... */
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes slideInLeft {
//           from { opacity: 0; transform: translateX(-50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideInRight {
//           from { opacity: 0; transform: translateX(50px); }
//           to { opacity: 1; transform: translateX(0); }
//         }
//         .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
//         .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
//         .animate-slideInRight { animation: slideInRight 0.8s ease-out; }

//         /* --- STYLES FOR CHECKBOX/RADIO (Unchanged) --- */
//         .custom-radio,
//         .custom-checkbox {
//           -webkit-appearance: none;
//           appearance: none;
//           background-color: black;
//           border: 1px solid #374151; /* gray-700 */
//           transition: all 0.2s;
//           display: inline-block;
//           vertical-align: middle;
//         }

//         .custom-radio:focus,
//         .custom-checkbox:focus {
//           box-shadow: 0 0 0 2px #dc2626; /* ring-2 ring-red-600 */
//           border-color: #dc2626; /* Use red border on focus */
//           outline: none;
//         }

//         /* --- Radio Button Styles --- */
//         .custom-radio {
//           border-radius: 50%;
//         }

//         .custom-radio:checked {
//           border-color: #dc2626; /* red-600 */
//           background-image: radial-gradient(#dc2626 55%, transparent 60%);
//         }

//         /* --- Checkbox Styles --- */
//         .custom-checkbox {
//           border-radius: 3px; /* rounded-sm */
//         }

//         .custom-checkbox:checked {
//           background-color: #dc2626; /* red-600 */
//           border-color: #dc2626;
//           background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
//           background-size: 100% 100%;
//           background-position: center;
//           background-repeat: no-repeat;
//         }

//         {/* --- MODIFIED --- Removed red border, but kept red border for focus on error */}
//         .custom-radio.error,
//         .custom-checkbox.error {
//           border-color: #374151; /* Back to gray-700 */
//         }
//         .custom-radio.error:focus,
//         .custom-checkbox.error:focus {
//           box-shadow: 0 0 0 2px #ef4444; /* ring-2 ring-red-500 */
//           border-color: #ef4444;
//         }
//       `}</style>

//       <Navbar />

//       <main className="bg-black text-white min-h-screen">

//         {/* --- HERO SECTION --- */}
//         <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden mt-20">
//           <motion.div
//             variants={heroVariants}
//             initial="hidden"
//             animate="visible"
//             className="relative w-full h-full"
//           >
//             <Image
//               src="/contact.png"
//               alt="SSS Defence site"
//               layout="fill"
//               objectFit="cover"
//               priority
//               className="brightness-[0.75] md:brightness-[0.8]"
//             />
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1.5, delay: 0.5 }}
//             />
//           </motion.div>
//           <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
//             <motion.div
//               variants={titleVariants}
//               initial="hidden"
//               animate="visible"
//               className="relative"
//             >
//               <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
//                 CONTACT US
//               </h1>

//               {/* --- MODIFIED --- Red Glitch DIV removed */}

//               <motion.div
//                 className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
//               />
//             </motion.div>
//           </div>
//         </section>

//         {/* Use `px-4 sm:px-6 lg:px-8` for responsive padding */}
//         <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

//           {/* --- EMAIL SECTION --- */}
//           <section className="mb-16 md:mb-24">
//             <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12 md:gap-16">

//               {/* Left Side: International Sales */}
//               <div
//                 className={`group ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}
//                 style={{ animationDelay: '200ms' }}
//               >
//                 <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 mb-2 transition-colors duration-300 group-hover:text-gray-300">
//                   INTERNATIONAL SALES
//                 </h3>
//                 <a
//                   href="mailto:sales@sssdefence.com"
//                   className="text-md sm:text-lg text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wide inline-block"
//                 >
//                   sales@sssdefence.com
//                 </a>
//               </div>

//               {/* Right Side: Media & Press */}
//               <div
//                 className={`group md:text-right ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}
//                 style={{ animationDelay: '200ms' }}
//               >
//                 <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 mb-2 transition-colors duration-300 group-hover:text-gray-300">
//                   MEDIA & PRESS
//                 </h3>
//                 <a
//                   href="mailto:media@sssdefence.com"
//                   className="text-md sm:text-lg text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wide inline-block"
//                 >
//                   media@sssdefence.com
//                 </a>
//               </div>
//             </div>
//           </section>

//           {/* Connect With Us Form (Unchanged) */}
//           <section className="max-w-3xl mx-auto">
//             <div
//               className="opacity-0 animate-fadeInUp"
//               style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
//             >
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
//                 Connect with us!
//               </h2>
//               <p className="text-center text-gray-400 mb-10 px-0 sm:px-6">
//                 We value every enquiry and look forward to connecting with you. Whether
//                 you are seeking product information, partnership opportunities, or support,
//                 our team is ready to assist you.
//               </p>
//             </div>

//             {/* --- VALIDATED FORM --- */}
//             <form onSubmit={handleSubmit} noValidate className="space-y-8">

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="name" className="block text-sm text-gray-300 mb-2">Name*</label>
//                   <input
//                     type="text" id="name" name="name"
//                     value={formData.name} onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('name')}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                 </div>

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="email" className="block text-sm text-gray-300 mb-2">E-mail*</label>
//                   <input
//                     type="email" id="email" name="email"
//                     value={formData.email} onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('email')}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                 </div>

//                 {/* --- MODIFIED Phone Input --- */}
//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">Phone No.*</label>
//                   <input
//                     type="tel" // Keep type="tel" for mobile keyboards
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('phone')}`}
//                   />
//                   {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//                 </div>

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="organization" className="block text-sm text-gray-300 mb-2">Organization</label>
//                   <input
//                     type="text" id="organization" name="organization"
//                     value={formData.organization} onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('organization')}`}
//                   />
//                 </div>

//                 <div className="md:col-span-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="purpose" className="block text-sm text-gray-300 mb-2">Purpose of Enquiry*</label>
//                   <input
//                     type="text" id="purpose" name="purpose"
//                     value={formData.purpose} onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('purpose')}`}
//                   />
//                   {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
//                 </div>
//               </div>

//               {/* --- Radio Button Section (Unchanged) --- */}
//               <div className="flex flex-col text-gray-300 opacity-0 animate-fadeInUp" style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}>
//                 <div className="mb-2">
//                   <label className="block text-sm">
//                     Are you representing a government department, defence organization, or registered company?*
//                   </label>
//                 </div>
//                 <div className="flex gap-6">
//                   <div className="flex items-center gap-2 group">
//                     <input
//                       type="radio" id="gov_yes" name="isGov" value="Yes"
//                       checked={formData.isGov === 'Yes'} onChange={handleChange}
//                       className={`custom-radio h-4 w-4 cursor-pointer ${errors.isGov ? 'error' : ''}`}
//                     />
//                     <label htmlFor="gov_yes" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2 group">
//                     <input
//                       type="radio" id="gov_no" name="isGov" value="No"
//                       checked={formData.isGov === 'No'} onChange={handleChange}
//                       className={`custom-radio h-4 w-4 cursor-pointer ${errors.isGov ? 'error' : ''}`}
//                     />
//                     <label htmlFor="gov_no" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                       No
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               {errors.isGov && <p className="text-red-500 text-xs -mt-6">{errors.isGov}</p>}

//               {/* --- MODIFIED Message Section --- */}
//               {/* Removed md:flex-row from parent, and md:w-* from children */}
//               <div className="flex flex-col opacity-0 animate-fadeInUp" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
//                 <div className="mb-2">
//                   <label htmlFor="message" className="block text-sm text-gray-300">Message*</label>
//                 </div>
//                 <div>
//                   <textarea
//                     id="message" name="message" rows={6}
//                     value={formData.message} onChange={handleChange}
//                     className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('message')}`}
//                   ></textarea>
//                   {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
//                 </div>
//               </div>

//               <div className="space-y-5 pt-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '850ms', animationFillMode: 'forwards' }}>
//                 <div className="flex items-center gap-3 group">
//                   <input
//                     type="checkbox" id="confirmAccuracy" name="confirmAccuracy"
//                     checked={formData.confirmAccuracy} onChange={handleChange}
//                     className={`h-5 w-5 cursor-pointer transition-all duration-200`}
//                   />
//                   <label htmlFor="confirmAccuracy" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                     *I confirm that the information provided is accurate and relevant to defence manufacturing.
//                   </label>
//                 </div>
//                 {errors.confirmAccuracy && <p className="text-red-500 text-xs -mt-3 ml-8">{errors.confirmAccuracy}</p>}

//                 <div className="flex items-center gap-3 group">
//                   <input
//                     type="checkbox" id="confirmContact" name="confirmContact"
//                     checked={formData.confirmContact} onChange={handleChange}
//                     className={`h-5 w-5 cursor-pointer transition-all duration-200`}
//                   />
//                   <label htmlFor="confirmContact" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                     *I agree to be contacted by SSS Defence for the purpose of this enquiry.
//                   </label>
//                 </div>
//                 {errors.confirmContact && <p className="text-red-500 text-xs -mt-3 ml-8">{errors.confirmContact}</p>}
//               </div>

//               {/* --- Submit Button (Unchanged) --- */}
//               <div className="text-center pt-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
//                 <button
//                   type="submit"
//                   disabled={formSubmitted}
//                   className="relative bg-gray-800 text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-700 transition-all duration-300 tracking-wider overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
//                 >
//                   <span className="relative z-10">
//                     {formSubmitted ? 'SUBMITTED ✓' : 'SUBMIT'}
//                   </span>
//                   {!formSubmitted && (
//                     <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";

import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar"; // Added Navbar
import Footer from "@/components/Footer";
import emailjs from "@emailjs/browser";
import { motion, Variants } from "framer-motion";

// --- Form State Types ---
interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  // 🎯 1. Added new field to type
  enquiryType: string;
  isGov: string;
  message: string;
  confirmAccuracy: boolean;
  confirmContact: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// --- ANIMATION VARIANTS (Unchanged) ---
const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -25,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type formData = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  enquiryType: string;
  isGov: string; // ← FIXED
  message: string;
  confirmAccuracy: boolean;
  confirmContact: boolean;
};

// --- Page Component ---

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    purpose: "",
    enquiryType: "",
    isGov: "",
    message: "",
    confirmAccuracy: false,
    confirmContact: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- MODIFIED handleChange ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof formData;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [fieldName]: checked }));
    } else {
      let processedValue = value;
      // Only allow numbers for the phone field
      if (name === "phone") {
        processedValue = value.replace(/[^0-9]/g, "");
      }
      setFormData((prev) => ({ ...prev, [fieldName]: processedValue }));
    }

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  // 🎯 4. Updated validation logic
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid. Please use a valid format.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone No. is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      // You can add more specific validation if you want
      newErrors.phone = "Phone No. is invalid.";
    }
    if (!formData.purpose)
      newErrors.purpose = "Purpose of Enquiry is required.";
    if (!formData.isGov) newErrors.isGov = "Please select an option.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (!formData.confirmAccuracy) {
      newErrors.confirmAccuracy = "You must confirm this information.";
    }
    if (!formData.confirmContact) {
      newErrors.confirmContact = "You must agree to be contacted.";
    }

    return newErrors;
  };

  // 🎯 5. Updated form reset logic
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    setIsSubmitting(true);

    if (!form.current) {
      console.error("Form reference is null");
      return;
    }

    try {
      if (Object.keys(newErrors).length === 0) {
        console.log("Form Submitted:", formData);
        if (formData?.enquiryType === "Sales") {
          emailjs
            .sendForm(
              process.env.NEXT_PUBLIC_EMAILJS_SALES_SERVICE_ID!,
              process.env.NEXT_PUBLIC_EMAILJS_SALES_TEMPLATE_ID!,
              form.current!,
              {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_SALES_PUBLIC_KEY!,
              }
            )
            .then(
              (result) => {
                setFormSubmitted(true);
                setIsSubmitting(false);
              },
              (error) => {
                alert("An error occurred: " + error.text);
              }
            );
        } else {
          emailjs
            .sendForm(
              process.env.NEXT_PUBLIC_EMAILJS_MEDIA_SERVICE_ID!,
              process.env.NEXT_PUBLIC_EMAILJS_MEDIA_TEMPLATE_ID!,
              form.current!,
              {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_MEDIA_PUBLIC_KEY!,
              }
            )
            .then(
              (result) => {
                setFormSubmitted(true);
                setIsSubmitting(false);
              },
              (error) => {
                alert("An error occurred: " + error.text);
              }
            );
        }

        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            organization: "",
            purpose: "",
            enquiryType: "",
            isGov: "",
            message: "",
            confirmAccuracy: false,
            confirmContact: false,
          });
        }, 3000);
      } else {
        console.log("Validation failed");
      }
    } catch (error: any) {
      // --- Error Logic ---
      console.error("EMAILJS ERROR:", error);
      alert("An error occurred: " + error?.text);
    } finally {
      // --- Always run this ---
      // Stop the loading state
      setIsSubmitting(false);
    }
  };

  // --- MODIFIED fieldStateClasses ---
  const fieldStateClasses = (field: keyof FormData) => {
    // Base classes for all text inputs
    const base =
      "border focus:ring-2 focus:outline-none transition-all duration-300";

    // Removed the if(errors[field]) block to stop the border from turning red

    // Normal state: gray border, gray hover, red focus
    return `${base} border-gray-700 hover:border-gray-500 focus:ring-gray-600 focus:border-gray-600`;
  };

  return (
    <>
      {/* 🎯 6. Added styling for the new select dropdown */}
      <style jsx>{`
        /* ... (Your existing keyframes) ... */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }

        /* --- STYLES FOR CHECKBOX/RADIO (Unchanged) --- */
        .custom-radio,
        .custom-checkbox {
          -webkit-appearance: none;
          appearance: none;
          background-color: black;
          border: 1px solid #374151; /* gray-700 */
          transition: all 0.2s;
          display: inline-block;
          vertical-align: middle;
        }

        .custom-radio:focus,
        .custom-checkbox:focus {
          box-shadow: 0 0 0 2px #dc2626; /* ring-2 ring-red-600 */
          border-color: #dc2626; /* Use red border on focus */
          outline: none;
        }
        .custom-radio {
          border-radius: 50%;
        }
        .custom-radio:checked {
          border-color: #dc2626;
          background-image: radial-gradient(#dc2626 55%, transparent 60%);
        }
        .custom-checkbox {
          border-radius: 3px;
        }
        .custom-checkbox:checked {
          background-color: #dc2626;
          border-color: #dc2626;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

         {
          /* --- MODIFIED --- Removed red border, but kept red border for focus on error */
        }
        .custom-radio.error,
        .custom-checkbox.error {
          border-color: #374151;
        }
        .custom-radio.error:focus,
        .custom-checkbox.error:focus {
          box-shadow: 0 0 0 2px #ef4444;
          border-color: #ef4444;
        }

        /* --- NEW STYLES FOR SELECT DROPDOWN --- */
        .custom-select {
          -webkit-appearance: none;
          appearance: none;
          /* Custom arrow */
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1.25em 1.25em;
          padding-right: 2.5rem; /* Make room for the arrow */
        }

        /* Fix for Firefox not hiding the default arrow */
        select::-ms-expand {
          display: none;
        }

        /* Set placeholder text color for select */
        .custom-select:invalid {
          color: #6b7280; /* gray-500 */
        }
      `}</style>

      <Navbar />

      <main className="bg-black text-white min-h-screen">
        {/* --- HERO SECTION (Unchanged) --- */}
        <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden mt-20">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full h-full"
          >
            <Image
              src="/contact.png"
              alt="SSS Defence site"
              layout="fill"
              objectFit="cover"
              priority
              className="brightness-[0.75] md:brightness-[0.8]"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.div>
          <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white drop-shadow-2xl">
                CONTACT US
              </h1>
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>

        {/* --- Container (Unchanged) --- */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* --- EMAIL SECTION (Unchanged) --- */}
          <section className="mb-16 md:mb-24">
            <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-12 md:gap-16">
              <div
                className={`group ${
                  isVisible ? "animate-slideInLeft" : "opacity-0"
                }`}
                style={{ animationDelay: "200ms" }}
              >
                <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 mb-2 transition-colors duration-300 group-hover:text-gray-300">
                  INTERNATIONAL SALES
                </h3>
                <a
                  href="mailto:sales@sssdefence.com"
                  className="text-md sm:text-lg text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wide inline-block"
                >
                  sales@sssdefence.com
                </a>
              </div>
              <div
                className={`group md:text-right ${
                  isVisible ? "animate-slideInRight" : "opacity-0"
                }`}
                style={{ animationDelay: "200ms" }}
              >
                <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 mb-2 transition-colors duration-300 group-hover:text-gray-300">
                  MEDIA & PRESS
                </h3>
                <a
                  href="mailto:media@sssdefence.com"
                  className="text-md sm:text-lg text-gray-200 hover:text-white transition-all duration-300 hover:tracking-wide inline-block"
                >
                  media@sssdefence.com
                </a>
              </div>
            </div>
          </section>

          {/* Connect With Us Form (Unchanged) */}
          <section className="max-w-3xl mx-auto">
            <div
              className="opacity-0 animate-fadeInUp"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Connect with us!
              </h2>
              <p className="text-center text-gray-400 mb-10 px-0 sm:px-6">
                We value every enquiry and look forward to connecting with you.
                Whether you are seeking product information, partnership
                opportunities, or support, our team is ready to assist you.
              </p>
            </div>

            {/* --- VALIDATED FORM --- */}
            <form
              ref={form}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-8"
            >
              {/* --- Text Inputs (Unchanged but will use the updated function) --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "500ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "name"
                    )}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "550ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    E-mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "email"
                    )}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* --- MODIFIED Phone Input --- */}
                <div
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "600ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="phone"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Phone No.*
                  </label>
                  <input
                    type="tel" // Keep type="tel" for mobile keyboards
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "phone"
                    )}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "650ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="organization"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "organization"
                    )}`}
                  />
                </div>

                <div
                  className="md:col-span-2 opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "700ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="purpose"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Purpose of Enquiry*
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "purpose"
                    )}`}
                  />
                  {errors.purpose && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.purpose}
                    </p>
                  )}
                </div>

                {/* 🎯 7. Added the new dropdown field */}
                <div
                  className="md:col-span-2 opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: "750ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <label
                    htmlFor="enquiryType"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Where you need to connect*
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={formData.enquiryType}
                    onChange={handleChange}
                    required // Use 'invalid' state for placeholder color
                    className={`custom-select w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "enquiryType"
                    )}`}
                  >
                    <option value="" disabled>
                      Select an option...
                    </option>
                    <option value="Sales">Sales</option>
                    <option value="Media">Media</option>
                  </select>
                  {errors.enquiryType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.enquiryType}
                    </p>
                  )}
                </div>
              </div>

              {/* --- Radio Button Section (Unchanged) --- */}
              <div
                className="flex flex-col text-gray-300 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "750ms",
                  animationFillMode: "forwards",
                }}
              >
                <div className="mb-2">
                  <label className="block text-sm">
                    Are you representing a government department, defence
                    organization, or registered company?*
                  </label>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 group">
                    <input
                      type="radio"
                      id="gov_yes"
                      name="isGov"
                      value="Yes"
                      checked={formData.isGov === "Yes"}
                      onChange={handleChange}
                      className={`custom-radio h-4 w-4 cursor-pointer ${
                        errors.isGov ? "error" : ""
                      }`}
                    />
                    <label
                      htmlFor="gov_yes"
                      className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-2 group">
                    <input
                      type="radio"
                      id="gov_no"
                      name="isGov"
                      value="No"
                      checked={formData.isGov === "No"}
                      onChange={handleChange}
                      className={`custom-radio h-4 w-4 cursor-pointer ${
                        errors.isGov ? "error" : ""
                      }`}
                    />
                    <label
                      htmlFor="gov_no"
                      className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              {errors.isGov && (
                <p className="text-red-500 text-xs -mt-6">{errors.isGov}</p>
              )}

              {/* --- Message Section (Unchanged) --- */}
              <div
                className="flex flex-col opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                <div className="mb-2">
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-300"
                  >
                    Message*
                  </label>
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses(
                      "message"
                    )}`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {/* --- Checkbox Section (Unchanged) --- */}
              <div
                className="space-y-5 pt-4 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "850ms",
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex items-center gap-3 group">
                  <input
                    type="checkbox"
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    checked={formData.confirmAccuracy}
                    onChange={handleChange}
                    className={`custom-checkbox h-5 w-5 cursor-pointer ${
                      errors.confirmAccuracy ? "error" : ""
                    }`}
                  />
                  <label
                    htmlFor="confirmAccuracy"
                    className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200"
                  >
                    *I confirm that the information provided is accurate and
                    relevant to defence manufacturing.
                  </label>
                </div>
                {errors.confirmAccuracy && (
                  <p className="text-red-500 text-xs -mt-3 ml-8">
                    {errors.confirmAccuracy}
                  </p>
                )}

                <div className="flex items-center gap-3 group">
                  <input
                    type="checkbox"
                    id="confirmContact"
                    name="confirmContact"
                    checked={formData.confirmContact}
                    onChange={handleChange}
                    className={`custom-checkbox h-5 w-5 cursor-pointer ${
                      errors.confirmContact ? "error" : ""
                    }`}
                  />
                  <label
                    htmlFor="confirmContact"
                    className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200"
                  >
                    *I agree to be contacted by SSS Defence for the purpose of
                    this enquiry.
                  </label>
                </div>
                {errors.confirmContact && (
                  <p className="text-red-500 text-xs -mt-3 ml-8">
                    {errors.confirmContact}
                  </p>
                )}
              </div>

              {/* --- Submit Button (Unchanged) --- */}
              <div
                className="text-center pt-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "900ms",
                  animationFillMode: "forwards",
                }}
              >
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="relative bg-gray-800 text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-700 transition-all duration-300 tracking-wider overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {isSubmitting
                      ? "SUBMITTING..."
                      : formSubmitted
                      ? "SUBMITTED ✓"
                      : "SUBMIT"}
                  </span>
                  {!formSubmitted && (
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
