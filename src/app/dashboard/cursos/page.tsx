"use client";
import DashboardGrid from "@/components/DashBoard/DashBoardGrid";
import Modal from "@/components/DashBoard/Modal";
import RowColumn from "@/components/DashBoard/RowColumnDashboard";
import { useGetStageQuery } from "@/store/apis/CantajuegaApi";
import { stageWithChilds } from "@/types/Models/Stage.type";
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
      <RowColumn
        className={" font-bold w-[98%] border-b border-black "}
        numberOfColumns={"6"}
        column1={{ text: "nombre" }}
        column2={{ text: "Descripcion" }}
        column3={{ text: "Edad min" }}
        column4={{ text: "Edad max" }}
        column5={{ text: "Total Alumnos" }}
        column6={{ text: "  " }}
      />
      <section className="flex flex-col w-full gap-8 overflow-y-scroll   ">
        {stages?.data?.map((stage:stageWithChilds,key:number) => (
          <RowColumn
            key={key}
            numberOfColumns={"6"}
            column1={{ text: stage.name }}
            column2={{ text: stage.description }}
            column3={{ text: stage.minAge.toString() }}
            column4={{ text: stage.maxAge.toString() }}
            column5={{text: stage.Children?.length.toString()!}}
            linkColumn={{text:'mas informacion',linkto:`/dashboard/cursos/${stage.id}`}}
            />
        ))}
      </section>     
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
