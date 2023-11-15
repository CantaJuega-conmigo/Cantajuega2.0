"use client"
import { useGetChildQuery } from '@/store/apis/CantajuegaApi';
import RowColumn from '@/components/DashBoard/RowColumnDashboard';

export default function Page() {
  const {data:childs}=useGetChildQuery(null)
  
  return (
    <>
      <h1>Alumnos</h1>
      <RowColumn
        className={" font-bold w-[98%] border-b border-black "}
        numberOfColumns={"6"}
        column1={{ text: "Nombre" }}
        column2={{ text: "Apellido" }}
        column3={{ text: "Edad" }}
        column4={{ text: "Genero" }}
        column5={{ text: "Etapa" }}
        column6={{ text: "  " }}
      />
      <section className="flex flex-col w-full gap-8 overflow-y-scroll ">
        {childs?.map(child=>{
          return(
            <RowColumn 
            key={child.id}
            column1={{ text: child.firstName }}
            column2={{ text: child.lastName }}
            column3={{ text: child?.age?.toString() }}
            column4={{ text: child.gender }}
            column5={{ text: child.Stage?.name}}
            linkColumn={{
              text: "mas informacion",
              linkto: `/dashboard/childs/${child.id}`,
            }}
            />
          )
        })}
      </section>
    </>
  );
}
