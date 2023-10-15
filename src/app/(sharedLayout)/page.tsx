"use client";
import NewsletterSuscription from "@/components/home/NewsLetter";
import Hero from "../../components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import Metodologias from "@/components/home/metodologia/Metodologias";
export default function Home() {

  return (
    <main id="mainhome" className="flex min-h-screen flex-col ">
      <Hero />
      <Metodologias/>
      <AboutUs/>
      <NewsletterSuscription />
    </main>
  );
}
