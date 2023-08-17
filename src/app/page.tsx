"use client";
import NewsletterSuscription from "@/components/home/NewsLetter";
import Hero from "../components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import Metodologias from "@/components/home/metodologia/Metodologias";
import { useEffect } from "react";
import { authUser } from "@/libs/functions";

export default function Home() {
  // useEffect(()=>{
  //   console.log('me ejecuto');
    
  //  authUser()
  // },[])
  return (
    <main id="mainhome" className="flex min-h-screen flex-col ">
      <Hero />
      <Metodologias/>
      <AboutUs/>
      <NewsletterSuscription />
    </main>
  );
}
