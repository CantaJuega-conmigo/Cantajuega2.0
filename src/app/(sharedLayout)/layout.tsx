"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Nav";
import { useAuthQuery } from "@/store/apis/CantajuegaApi";
import Loading from "../loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, data } = useAuthQuery(null);

  return (
    <>
      <Navbar />
      {isLoading && 
        <Loading />
        }
      <main>{children}</main>
      <Footer />
    </>
  );
}
