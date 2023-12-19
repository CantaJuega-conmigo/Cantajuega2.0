import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <section className="w-full py-4 ">
        <h1 className="text-3xl">Panel de administrador de Cantajuega</h1>
      </section>
      <h1 className="text-3xl">Estadisticas generales</h1>
      <h2>Usuarios</h2>
      <section className=" py-4 flex text-lg gap-4 flex-wrap w-11/12">
        <article className=" min-w-[10rem] bg-blue text-white rounded-xl p-2 py-3 grow ">
          <h3>Usuarios Totales</h3>
          <span>5</span>
        </article>
      </section>
      <h2>Etapas</h2>
      <section className=" py-4 flex text-lg gap-4 flex-wrap w-11/12">
        <article className=" min-w-[10rem] bg-blue text-white rounded-xl p-2 py-3 grow ">
          <h3>Etapas totales</h3>
          <span>5</span>
        </article>
        <article className=" min-w-[10rem] bg-blue text-white rounded-xl p-2 py-3 grow ">
          <h3>Etapas Finalizadas</h3>
          <span>5</span>
        </article>
        <article className=" min-w-[10rem] bg-blue text-white rounded-xl p-2 py-3 grow ">
          <h3>Etapas en progreso</h3>
          <span>5</span>
        </article>
        <Link href={""}>
          <button className="bg-orange text-white rounded-xl p-2 grow hover:bg-orangeicons hover:text-black">
            Ver mas{" "}
          </button>
        </Link>
      </section>
    </div>
  );
}
