import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-blue flex flex-col ">
      <header className="w-full flex justify-center">Opciones de navegacion del admin <Link href={'/'} className="bg-white p-3">volver a home</Link></header>
      <main className="w-full">{children}</main>
    </div>
  );
}
