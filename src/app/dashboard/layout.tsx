import AsideNav1 from "@/components/DashBoard/AsideNav1";
import DashBoardHeader from "@/components/DashBoard/DashBoardHeader";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex  ">
      <aside className="flex bg-blue text-white flex-col w-[20%] pt-6 gap-4 items-center text-center relative z-50">
        <AsideNav1 />
      </aside>
      <section className="w-full overflow-auto flex flex-col items-center">
        
        <header className=" flex justify-end w-full">
         <DashBoardHeader name="Kathy" image={""} notifications={"5"} />
        </header>
        <main className=" bg-slate-300 w-full flex flex-col items-center h-full">
          {children}
        </main>
      </section>
    </div>
  );
}
