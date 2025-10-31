// "use client";

// import React, { FormEvent } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Footer from '@/components/Footer'; // Updated path
// import Navbar from '@/components/Navbar'; // Updated path

// // --- Prop Types ---

// interface FormInputProps {
//   label: string;
//   id: string;
//   type: string;
//   required?: boolean;
// }

// interface RadioOptionProps {
//   label: string;
//   id: string;
//   name: string;
// }

// interface CheckboxOptionProps {
//   label: string;
//   id: string;
//   required?: boolean;
// }

// // --- Helper Components with Types ---

// // Helper component for form inputs
// const FormInput = ({ label, id, type, required = false }: FormInputProps) => (
//   <div>
//     <label htmlFor={id} className="block text-sm text-gray-300 mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={id}
//       name={id}
//       required={required}
//       className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:ring-gray-500 focus:border-gray-500"
//     />
//   </div>
// );

// // Helper component for radio buttons
// const RadioOption = ({ label, id, name }: RadioOptionProps) => (
//   <div className="flex items-center gap-2">
//     <input
//       id={id}
//       name={name}
//       type="radio"
//       className="h-4 w-4 text-gray-400 bg-black border-gray-700 focus:ring-gray-500"
//     />
//     <label htmlFor={id} className="text-sm text-gray-300">
//       {label}
//     </label>
//   </div>
// );

// // Helper component for checkboxes
// const CheckboxOption = ({ label, id, required = false }: CheckboxOptionProps) => (
//   <div className="flex items-center gap-3">
//     <input
//       id={id}
//       name={id}
//       type="checkbox"
//       required={required}
//       className="h-5 w-5 text-gray-400 bg-black border-gray-700 rounded-full focus:ring-offset-black focus:ring-gray-500"
//     />
//     <label htmlFor={id} className="text-sm text-gray-300">
//       {label}
//     </label>
//   </div>
// );

// // --- Page Component ---

// export default function ContactPage() {
  
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     // e.g., get data with new FormData(e.currentTarget)
//     console.log('Form submitted');
//   };

//   return (
//     <>
//       <Head>
//         <title>Contact Us</title>
//         <meta name="description" content="Get in touch with us." />
//       </Head>
      
//       <Navbar />

//       <main className="bg-black text-white">
//         {/* Top Landing Image */}
//         <div className="relative w-full h-64 md:h-96">
//           <Image
//             src="/contact.png"
//             alt="SSS Defence site"
//             layout="fill"
//             objectFit="cover"
//             priority
//           />
//         </div>

//         <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          
//           {/* 1. Contacts Header & 2. Email Section (Combined) */}
//           <section className="flex flex-col md:flex-row justify-between md:items-start mb-16 md:mb-24">
//             {/* Left Side */}
//             <div className="text-left mb-16 md:mb-0">
//               <h1 className="text-4xl md:text-5xl font-bold mb-2">CONTACTS</h1>
//               <p className="text-lg text-gray-400 tracking-wider">
//                 WE ARE HERE FOR YOU!
//               </p>
//             </div>
//             {/* Right Side */}
//             <div className="flex flex-col md:flex-row gap-12 md:gap-16">
//               <div>
//                 <h3 className="text-sm font-semibold tracking-widest text-gray-500 mb-2">
//                   INTERNATIONAL SALES
//                 </h3>
//                 <a
//                   href="mailto:sales@sssdefence.com"
//                   className="text-lg text-gray-200 hover:text-white"
//                 >
//                   sales@sssdefence.com
//                 </a>
//               </div>
//               <div>
//                 <h3 className="text-sm font-semibold tracking-widest text-gray-500 mb-2">
//                   MEDIA & PRESS
//                 </h3>
//                 <a
//                   href="mailto:media@sssdefence.com"
//                   className="text-lg text-gray-200 hover:text-white"
//                 >
//                   media@sssdefence.com
//                 </a>
//               </div>
//             </div>
//           </section>

//           {/* 3. Connect With Us Form */}
//           <section className="max-w-3xl mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
//               Connect with us!
//             </h2>
//             <p className="text-center text-gray-400 mb-10 px-6">
//               We value every enquiry and look forward to connecting with you. Whether
//               you are seeking product information, partnership opportunities, or support,
//               our team is ready to assist you.
//             </p>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* --- MODIFIED: 2-Column Grid for Inputs --- */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <FormInput label="Name" id="name" type="text" />
//                 <FormInput label="E-mail" id="email" type="email" required />
//                 <FormInput label="Phone No." id="phone" type="tel" />
//                 <FormInput label="Organization" id="organization" type="text" />
//                 {/* This input spans 2 columns */}
//                 <div className="md:col-span-2">
//                   <FormInput
//                     label="Purpose of Enquiry*"
//                     id="purpose"
//                     type="text"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* --- MODIFIED: Radio Group (Label Left, Inputs Right) --- */}
//               <div className="flex flex-col md:flex-row text-gray-300 md:items-center">
//                 <div className="md:w-1/3 mb-2 md:mb-0">
//                   <label className="block text-sm">
//                     Are you representing a government department, defence
//                     organization, or registered company?
//                   </label>
//                 </div>
//                 <div className="md:w-2/3 flex gap-6">
//                   <RadioOption label="Yes" id="gov_yes" name="is_gov" />
//                   <RadioOption label="No" id="gov_no" name="is_gov" />
//                 </div>
//               </div>

//               {/* --- MODIFIED: Message (Label Left, Input Right) --- */}
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-1/3 mb-2 md:mb-0">
//                   <label htmlFor="message" className="block text-sm text-gray-300">
//                     Message
//                   </label>
//                 </div>
//                 <div className="md:w-2/3">
//                   <textarea
//                     id="message"
//                     name="message"
//                     rows={6}
//                     className="w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:ring-gray-500 focus:border-gray-500"
//                   ></textarea>
//                 </div>
//               </div>

//               {/* Checkboxes */}
//               <div className="space-y-5 pt-4">
//                 <CheckboxOption
//                   label="*I confirm that the information provided is accurate and relevant to defence manufacturing."
//                   id="confirm_accuracy"
//                   required
//                 />
//                 <CheckboxOption
//                   label="*I agree to be contacted by [Your Company Name] for the purpose of this enquiry."
//                   id="confirm_contact"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="text-center pt-6">
//                 <button
//                   type="submit"
//                   className="bg-gray-800 text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-700 transition-colors tracking-wider"
//                 >
//                   SUBMIT
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

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value, type } = e.target;
//     const fieldName = name as keyof FormData; 

//     if (type === 'checkbox') {
//       const { checked } = e.target as HTMLInputElement;
//       setFormData((prev) => ({ ...prev, [fieldName]: checked }));
//     } else {
//       setFormData((prev) => ({ ...prev, [fieldName]: value }));
//     }
    
//     if (errors[fieldName]) {
//       setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
//     }
//   };

//   const validateForm = (): FormErrors => {
//     const newErrors: FormErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.name) newErrors.name = 'Name is required.';
//     if (!formData.email) {
//       newErrors.email = 'Email is required.';
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = 'Email is invalid. Please use a valid format.';
//     }
//     if (!formData.phone) newErrors.phone = 'Phone No. is required.';
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

//           {/* Text Overlay */}
//           <div className="absolute inset-0 flex items-end justify-center pb-12 sm:pb-24 lg:pb-32 z-20">
//             <motion.div
//               variants={titleVariants}
//               initial="hidden"
//               animate="visible"
//               className="relative"
//             >
//               {/* --- MODIFIED LINE --- Updated font sizes */}
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

//             {/* --- VALIDATED FORM (Unchanged) --- */}
//             <form onSubmit={handleSubmit} noValidate className="space-y-8">
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                
//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="name" className="block text-sm text-gray-300 mb-2">Name*</label>
//                   <input
//                     type="text" id="name" name="name"
//                     value={formData.name} onChange={handleChange}
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('name')}`}
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                 </div>

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="email" className="block text-sm text-gray-300 mb-2">E-mail*</label>
//                   <input
//                     type="email" id="email" name="email"
//                     value={formData.email} onChange={handleChange}
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('email')}`}
//                   />
//                   {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                 </div>

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">Phone No.*</label>
//                   <input
//                     type="tel" id="phone" name="phone"
//                     value={formData.phone} onChange={handleChange}
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('phone')}`}
//                   />
//                   {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//                 </div>

//                 <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="organization" className="block text-sm text-gray-300 mb-2">Organization</label>
//                   <input
//                     type="text" id="organization" name="organization"
//                     value={formData.organization} onChange={handleChange}
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('organization')}`}
//                   />
//                 </div>
                
//                 <div className="md:col-span-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
//                   <label htmlFor="purpose" className="block text-sm text-gray-300 mb-2">Purpose of Enquiry*</label>
//                   <input
//                     type="text" id="purpose" name="purpose"
//                     value={formData.purpose} onChange={handleChange}
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('purpose')}`}
//                   />
//                   {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
//                 </div>
//               </div>

//               {/* --- MODIFIED Radio Button Section --- */}
//               {/* Removed md:flex-row and md:items-center from parent, and md:w-* from children */}
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
//                       className="h-4 w-4 cursor-pointer transition-all duration-200"
//                     />
//                     <label htmlFor="gov_yes" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                       Yes
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2 group">
//                     <input
//                       type="radio" id="gov_no" name="isGov" value="No"
//                       checked={formData.isGov === 'No'} onChange={handleChange}
//                       className="h-4 w-4 cursor-pointer transition-all duration-200"
//                     />
//                     <label htmlFor="gov_no" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
//                       No
//                     </label>
//                   </div>
//                 </div>
//               </div>
//               {/* Adjusted error margin */}
//               {errors.isGov && <p className="text-red-500 text-xs mt-2 -mt-6">{errors.isGov}</p>}


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
//                     className={`w-full bg-black border rounded-md p-3 text-white focus:ring-2 focus:border-transparent transition-all duration-300 ${errorClass('message')}`}
//                   ></textarea>
//                   {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
//                 </div>
//               </div>
//               {/* --- END OF MODIFIED SECTIONS --- */}


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

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar'; // Added Navbar
import Footer from '@/components/Footer';
import { motion, Variants } from 'framer-motion';

// --- Form State Types ---

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  isGov: string;
  message: string;
  confirmAccuracy: boolean;
  confirmContact: boolean;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

// --- ANIMATION VARIANTS ---
const heroVariants: Variants = {
  hidden: { opacity: 0, scale: 1.15 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

const titleVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 100,
    rotateX: -25,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      delay: 0.4, 
      ease: [0.22, 1, 0.36, 1]
    }
  },
};

// --- Page Component ---

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    purpose: '',
    isGov: '',
    message: '',
    confirmAccuracy: false,
    confirmContact: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // --- MODIFIED handleChange ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof FormData; 

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [fieldName]: checked }));
    } else {
      let processedValue = value;
      // Only allow numbers for the phone field
      if (name === 'phone') {
        processedValue = value.replace(/[^0-9]/g, '');
      }
      setFormData((prev) => ({ ...prev, [fieldName]: processedValue }));
    }
    
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]+$/; // Optional: Add a validation rule

    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is invalid. Please use a valid format.';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone No. is required.';
    } else if (!phoneRegex.test(formData.phone)) {
       // You can add more specific validation if you want
      newErrors.phone = 'Phone No. is invalid.';
    }
    if (!formData.purpose) newErrors.purpose = 'Purpose of Enquiry is required.';
    if (!formData.isGov) newErrors.isGov = 'Please select an option.';
    if (!formData.message) newErrors.message = 'Message is required.';
    if (!formData.confirmAccuracy) {
      newErrors.confirmAccuracy = 'You must confirm this information.';
    }
    if (!formData.confirmContact) {
      newErrors.confirmContact = 'You must agree to be contacted.';
    }
    
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Submitted:', formData);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '', email: '', phone: '', organization: '',
          purpose: '', isGov: '', message: '',
          confirmAccuracy: false, confirmContact: false,
        });
      }, 3000);
    } else {
      console.log('Validation failed');
    }
  };
  
  // --- MODIFIED fieldStateClasses ---
  const fieldStateClasses = (field: keyof FormData) => {
    // Base classes for all text inputs
    const base = 'border focus:ring-2 focus:outline-none transition-all duration-300';
    
    // Removed the if(errors[field]) block to stop the border from turning red
    
    // Normal state: gray border, gray hover, red focus
    return `${base} border-gray-700 hover:border-gray-500 focus:ring-gray-600 focus:border-gray-600`;
  };

  return (
    <>
      <style jsx>{`
        /* ... (Your existing keyframes) ... */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }

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

        /* --- Radio Button Styles --- */
        .custom-radio {
          border-radius: 50%;
        }

        .custom-radio:checked {
          border-color: #dc2626; /* red-600 */
          background-image: radial-gradient(#dc2626 55%, transparent 60%);
        }

        /* --- Checkbox Styles --- */
        .custom-checkbox {
          border-radius: 3px; /* rounded-sm */
        }

        .custom-checkbox:checked {
          background-color: #dc2626; /* red-600 */
          border-color: #dc2626;
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        {/* --- MODIFIED --- Removed red border, but kept red border for focus on error */}
        .custom-radio.error,
        .custom-checkbox.error {
          border-color: #374151; /* Back to gray-700 */
        }
        .custom-radio.error:focus,
        .custom-checkbox.error:focus {
          box-shadow: 0 0 0 2px #ef4444; /* ring-2 ring-red-500 */
          border-color: #ef4444;
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
                className={`group ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}
                style={{ animationDelay: '200ms' }}
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
                className={`group md:text-right ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}
                style={{ animationDelay: '200ms' }}
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
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
                Connect with us!
              </h2>
              <p className="text-center text-gray-400 mb-10 px-0 sm:px-6">
                We value every enquiry and look forward to connecting with you. Whether
                you are seeking product information, partnership opportunities, or support,
                our team is ready to assist you.
              </p>
            </div>

            {/* --- VALIDATED FORM --- */}
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              
              {/* --- Text Inputs (Unchanged but will use the updated function) --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                
                <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
                  <label htmlFor="name" className="block text-sm text-gray-300 mb-2">Name*</label>
                  <input
                    type="text" id="name" name="name"
                    value={formData.name} onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('name')}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '550ms', animationFillMode: 'forwards' }}>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-2">E-mail*</label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('email')}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* --- MODIFIED Phone Input --- */}
                <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                  <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">Phone No.*</label>
                  <input
                    type="tel" // Keep type="tel" for mobile keyboards
                    id="phone" 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('phone')}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '650ms', animationFillMode: 'forwards' }}>
                  <label htmlFor="organization" className="block text-sm text-gray-300 mb-2">Organization</label>
                  <input
                    type="text" id="organization" name="organization"
                    value={formData.organization} onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('organization')}`}
                  />
                </div>
                
                <div className="md:col-span-2 opacity-0 animate-fadeInUp" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
                  <label htmlFor="purpose" className="block text-sm text-gray-300 mb-2">Purpose of Enquiry*</label>
                  <input
                    type="text" id="purpose" name="purpose"
                    value={formData.purpose} onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('purpose')}`}
                  />
                  {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                </div>
              </div>

              {/* --- Radio Button Section (Unchanged) --- */}
              <div className="flex flex-col text-gray-300 opacity-0 animate-fadeInUp" style={{ animationDelay: '750ms', animationFillMode: 'forwards' }}>
                <div className="mb-2">
                  <label className="block text-sm">
                    Are you representing a government department, defence organization, or registered company?*
                  </label>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 group">
                    <input
                      type="radio" id="gov_yes" name="isGov" value="Yes"
                      checked={formData.isGov === 'Yes'} onChange={handleChange}
                      className={`custom-radio h-4 w-4 cursor-pointer ${errors.isGov ? 'error' : ''}`}
                    />
                    <label htmlFor="gov_yes" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center gap-2 group">
                    <input
                      type="radio" id="gov_no" name="isGov" value="No"
                      checked={formData.isGov === 'No'} onChange={handleChange}
                      className={`custom-radio h-4 w-4 cursor-pointer ${errors.isGov ? 'error' : ''}`}
                    />
                    <label htmlFor="gov_no" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
                      No
                    </label>
                  </div>
                </div>
              </div>
              {errors.isGov && <p className="text-red-500 text-xs -mt-6">{errors.isGov}</p>}


              {/* --- Message Section (Unchanged) --- */}
              <div className="flex flex-col opacity-0 animate-fadeInUp" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                <div className="mb-2">
                  <label htmlFor="message" className="block text-sm text-gray-300">Message*</label>
                </div>
                <div>
                  <textarea
                    id="message" name="message" rows={6}
                    value={formData.message} onChange={handleChange}
                    className={`w-full bg-black rounded-md p-3 text-white ${fieldStateClasses('message')}`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>


              {/* --- Checkbox Section (Unchanged) --- */}
              <div className="space-y-5 pt-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '850ms', animationFillMode: 'forwards' }}>
                <div className="flex items-center gap-3 group">
                  <input
                    type="checkbox" id="confirmAccuracy" name="confirmAccuracy"
                    checked={formData.confirmAccuracy} onChange={handleChange}
                    className={`custom-checkbox h-5 w-5 cursor-pointer ${errors.confirmAccuracy ? 'error' : ''}`} 
                  />
                  <label htmlFor="confirmAccuracy" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
                    *I confirm that the information provided is accurate and relevant to defence manufacturing.
                  </label>
                </div>
                {errors.confirmAccuracy && <p className="text-red-500 text-xs -mt-3 ml-8">{errors.confirmAccuracy}</p>}

                <div className="flex items-center gap-3 group">
                  <input
                    type="checkbox" id="confirmContact" name="confirmContact"
                    checked={formData.confirmContact} onChange={handleChange}
                    className={`custom-checkbox h-5 w-5 cursor-pointer ${errors.confirmContact ? 'error' : ''}`} 
                  />
                  <label htmlFor="confirmContact" className="text-sm text-gray-300 cursor-pointer group-hover:text-white transition-colors duration-200">
                    *I agree to be contacted by SSS Defence for the purpose of this enquiry.
                  </label>
                </div>
                {errors.confirmContact && <p className="text-red-500 text-xs -mt-3 ml-8">{errors.confirmContact}</p>}
              </div>


              {/* --- Submit Button (Unchanged) --- */}
              <div className="text-center pt-6 opacity-0 animate-fadeInUp" style={{ animationDelay: '900ms', animationFillMode: 'forwards' }}>
                <button
                  type="submit"
                  disabled={formSubmitted}
                  className="relative bg-gray-800 text-white font-semibold py-3 px-12 rounded-md hover:bg-gray-700 transition-all duration-300 tracking-wider overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {formSubmitted ? 'SUBMITTED ✓' : 'SUBMIT'}
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