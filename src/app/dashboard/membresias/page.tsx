"use client"
import RowColumn from "@/components/DashBoard/RowColumnDashboard";
import { useGetMembershipQuery } from "@/store/apis/CantajuegaApi";

export default function Page (){
    const {data:memberships}=useGetMembershipQuery(null);

    return (
        <>
          <h1>Membresias</h1>

          <RowColumn
        className={" font-bold w-[98%] border-b border-black "}
        numberOfColumns={"6"}
        column1={{ text: "Nombre" }}
        column2={{ text: "Descripcion" }}
        column3={{ text: "recurrente id" }}
        column4={{ text: "Total usuarios" }}
        column5={{ text: "Etapa" }}
      />
      <section className="flex flex-col w-full gap-8 overflow-y-scroll   ">
        {memberships?.data?.map((membership) => (
          <RowColumn
            key={membership.id}
            numberOfColumns={"6"}
            column1={{ text: membership.name }}
            column2={{ text: membership.description }}
            column3={{ text: membership.recurrenteId }}
            column4={{text:membership.Users?.length.toString()}}
            column5={{text:'nombre de etapa'}}
            linkColumn={{
              text: "mas informacion",
              linkto: `/dashboard/membresias/${membership.id}`,
            }}
          />
        ))}
      </section>

        </>
    )
}