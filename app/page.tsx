import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import PriceList from "@/components/PriceList/Prices";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "TY KRASO | BEAUTY STUDIO",
  description:
    "TY KRASO Beauty Studio nabízí laserovou epilaci, elektroepilaci, voskovou depilaci, kadeřnické služby, manikúru, pedikúru, masáže, kosmetiku, řasy a obočí.",

  alternates: {
    canonical: "https://tykraso.com",
  },

  openGraph: {
    title: "TY KRASO — Kosmetický salon a Beauty Studio",
    description:
      "Profesionální beauty studio — laserová epilace, vlasy, manikúra, pedikúra, masáže, kosmetika, řasy a obočí.",
    url: "https://tykraso.com",
    siteName: "TY KRASO Beauty Studio",
    locale: "cs_CZ",
    type: "website",
  },
};

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