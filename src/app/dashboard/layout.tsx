import AsideNav1 from "@/components/DashBoard/AsideNav1";
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
          <article className="flex  items-center w-2/12 justify-evenly">
            <figure className=" bg-red h-20 w-20 rounded-full flex justify-center items-center">
              foto
            </figure>
            <h1>Kathy</h1>
          </article>
        </header>
        <main className=" bg-slate-300 w-full flex flex-col items-center h-full">
          {children}
        </main>
      </section>
    </div>
  );
}
