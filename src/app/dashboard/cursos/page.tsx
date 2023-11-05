"use client";
import DashboardGrid from "@/components/DashBoard/DashBoardGrid";
import Modal from "@/components/DashBoard/Modal";
import { useGetStageQuery } from "@/store/apis/CantajuegaApi";
import { MouseEvent, useState } from "react";

export default function Page() {
  const {
    data: stages,
    isLoading,
    isError,
  } = useGetStageQuery({ childs: true });
  const [seeModal, setSeeModal] = useState<boolean>(false);
  if (isLoading) {
    return (
      <>
        <div className=" min-h-[20rem] flex justify-center items-center">
          <h1 className="text-2xl">soy un loader xd.....</h1>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div className=" min-h-[20rem] flex justify-center items-center">
          <h1 className="text-2xl"> Algo salio mal mi rey.....</h1>
        </div>
      </>
    );
  }
  const openForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSeeModal(!seeModal);
  };
  return (
    <>
      <h1>Cursoos</h1>
      <DashboardGrid
        numberOfColumns={6}
        numberOfLinks={8}
        column1={{
          data: stages?.data!,
          title: "nombres",
          dataProperty: "name" as keyof object,
        }}
        column2={{
          data: stages?.data!,
          title: "descripcion",
          dataProperty: "description" as keyof object,
        }}
        column3={{
          data: stages?.data!,
          title: "Edad min",
          dataProperty: "minAge" as keyof object,
        }}
        column4={{
          data: stages?.data!,
          title: "Edad max",
          dataProperty: "maxAge" as keyof object,
        }}
        columnOfTotal={{
          title: "Total alumnos",
          data: stages?.data!,
          dataProperty: "Childrens" as keyof object,
        }}
      />
      <section className="w-full flex justify-center">
        <button className="bg-blue text-white p-2" onClick={openForm}>
          Crear una nueva etapa.
        </button>
      </section>
      {seeModal && (
        <Modal>
          <div className="w-5/12 h-5/6 bg-blue flex flex-col gap-4 overflow-auto transition-shadow translate-x-2">
            <article className="relative h-[2rem]">
              <button
                onClick={openForm}
                type="button"
                className=" absolute right-0 top-0">
                X
              </button>
            </article>
            <form action="" className="flex flex-col gap-2">
              <h1 className=" text-white text-center">Detalles</h1>
              <article>
                <label htmlFor="">Titulo</label>
                <input type="text" name="" id="" />
              </article>
              <article>
                <label htmlFor="">Descripcion</label>
                <input type="text" name="" id="" />
              </article>
              <article>
                <label htmlFor="">Edad minima</label>
                <input type="text" name="" id="" />
              </article>
              <article>
                <label htmlFor="">Edad maxima</label>
                <input type="text" name="" id="" />
              </article>
               <h1 className=" text-white text-center">Contenido, Videos</h1>
               <article>
                <label htmlFor="">Primer video, (enlace de youtube)</label>
                <input type="text" />
               </article>
               <article>
                <label htmlFor="">Segundo video, (enlace de youtube)</label>
                <input type="text" />
               </article>
               <article>
                <label htmlFor="">Tercer video, (enlace de youtube)</label>
                <input type="text" />
               </article>
               <article>
                <label htmlFor="">Cuarto video, (enlace de youtube)</label>
                <input type="text" />
               </article>
               <article>
                <label htmlFor="">Quinto video, (enlace de youtube)</label>
                <input type="text" />
               </article>
              
               <h1 className=" text-white text-center">Contenido, Musicas</h1>
               <article>
                <label htmlFor="">Primer musica</label>
                <input type="file" />
               </article>
               <article>
                <label htmlFor="">Segunda musica</label>
                <input type="file" />
               </article>
               <article>
                <label htmlFor="">Tercera musica</label>
                <input type="file" />
               </article>
               <article>
                <label htmlFor="">Cuarta musica</label>
                <input type="file" />
               </article>
               <article>
                <label htmlFor="">Quinta musica</label>
                <input type="file" />
               </article>
               <article className=" flex justify-center">
                <button className=" p-2 bg-orange text-white">
                  Crear nueva etapa
                </button>
               </article>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
