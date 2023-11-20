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
        className={" font-bold w-[94%] border-b border-black "}
        numberOfColumns={"6"}
        column1={{ text: "nombre" }}
        column2={{ text: "Descripcion" }}
        column3={{ text: "Edad min" }}
        column4={{ text: "Edad max" }}
        column5={{ text: "Total Alumnos" }}
        column6={{ text: "  " }}
      />
      <section className="flex flex-col w-full gap-8 overflow-y-scroll   ">
        {stages?.data?.map((stage,key:number) => (
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
     
      
    </>
  );
}
