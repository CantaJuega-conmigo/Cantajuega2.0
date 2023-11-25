export default function LayoutModal ({children}: {children: React.ReactNode}) {
    return(
        <div className="absolute z-50 top-0 left-0 w-screen h-screen bg-zinc-700/50 flex justify-center items-center">
                {children}
        </div>
    )
}