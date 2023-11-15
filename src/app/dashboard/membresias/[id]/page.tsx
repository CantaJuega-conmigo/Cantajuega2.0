export default function Page( { params }: { params: { id: string } } ) {
    return (
        <>
            <section>
                <h1>Membresia {params.id}</h1>
            </section>
        </>
    )
}