import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Nav";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">Error 404 - Pagina no encontrada</h1>
      </div>
      <Footer />
    </>
  );
}
