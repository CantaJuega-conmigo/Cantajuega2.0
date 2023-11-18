import Boxinfo from "./BoxInfo";

export default function UserCard({
  Name,
  lastName,
  age,
  id,
  admin
}: {
  Name: string;
  lastName: string;
  age: number;
  admin:string
  id: string;
}) {
  return (
    <div className=" bg-green flex flex-col items-center gap-4  text-center w-10/12 rounded-3xl pt-4 overflow-hidden border border-black">
      <Boxinfo title="Estado" info={'Activo'} BoxStyle="  md:w-8/12 " BoxTitle="bg-orange  p-2 rounded-xl " />
      <Boxinfo title="Id" info={id} BoxStyle="  md:w-8/12 " BoxTitle="bg-orange  p-2 rounded-xl " />
      <Boxinfo title="Nombre" info={Name} BoxStyle="  md:w-8/12 " BoxTitle="bg-orange  p-2 rounded-xl " />
      <Boxinfo title="Apellido" info={lastName} BoxStyle="  md:w-8/12 " BoxTitle="bg-orange  p-2 rounded-xl " />
      <Boxinfo title="Tipo" info={admin} BoxStyle="  md:w-8/12 " BoxTitle="bg-orange  p-2 rounded-xl " />
      <section className="flex flex-col gap-4 bg-[rgb(201,120,120)] w-full pb-4">
        <h3>Zona de peligro</h3>
        <article className="flex flex-col gap-4  w-full items-center">
          <button className=" bg-red p-2 text-white rounded-xl border  border-black">Eliminar usuario</button>
          <button className="bg-red p-2 text-white rounded-xl border  border-black">Desactivar usuario</button>
        </article>
      </section>
    </div>
  );
}
