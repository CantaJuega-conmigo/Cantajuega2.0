"use client"
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Nav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </>
  );
}
