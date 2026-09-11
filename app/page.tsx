import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Reviews from "@/components/sections/Reviews";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import PriceList from "@/components/PriceList/Prices";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Services />
        <PriceList />
        <WhyUs />
        <Gallery />
        {/* <Team /> */}
        {/* <Reviews /> */}
        <CTA />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}