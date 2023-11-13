export default function page({ params }: { params: { id: string } }) {
    return(
        <h1>Informacion del niño/a a cargo { params.id}</h1>
    )
}