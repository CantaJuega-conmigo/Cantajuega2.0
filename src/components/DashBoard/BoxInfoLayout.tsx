export default function BoxInfoLayout({children, title ,className}: {children: React.ReactNode, title: string, className?: string}) {
    return (
        <div className={`${className??''} flex flex-wrap  gap-4 border-b border-blue ` }>
            <section className="bg-orange  text-center w-full rounded-full">
              <h1>{title}</h1>
            </section>
            {children}
        </div>
    )
}