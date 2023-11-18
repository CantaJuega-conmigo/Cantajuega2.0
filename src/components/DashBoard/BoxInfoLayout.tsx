export default function BoxInfoLayout({children, title}: {children: React.ReactNode, title: string}) {
    return (
        <div className="flex flex-wrap  gap-4 border-b border-blue ">
            <section className="bg-orange  text-center w-full rounded-full">
              <h1>{title}</h1>
            </section>
            {children}
        </div>
    )
}