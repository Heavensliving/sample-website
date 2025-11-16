import type { Metadata } from 'next';

import Footer from "@/components/Footer";
import AboutSection from "./home_components/AboutSection";
import HomeProducts from "./home_components/HomeProducts";
import Landing from "./home_components/Landing";
import Varaha_Home from "./home_components/Varaha_Home";
import NewsEvents from "./home_components/NewsEvents";


export const metadata: Metadata = {
  title: 'SSS Defence | Leading Defence and Aerospace Manufacturer',
  description: 'SSS Defence is a premier Indian company specializing in the design, development, and manufacture of advanced defence systems and aerospace technology.',
  openGraph: {
    title: 'SSS Defence | Leading Defence and Aerospace Manufacturer',
    description: 'India’s premier private-sector defence technology company.',
    images: ['/images/sss-defence-og-image.jpg'], 
  },
};


export default function Home() {
  return (
    <main>
      <Landing />
      <AboutSection />
      <HomeProducts />
      <Varaha_Home />
      <NewsEvents />
      <Footer />
      
    </main>
  );
}