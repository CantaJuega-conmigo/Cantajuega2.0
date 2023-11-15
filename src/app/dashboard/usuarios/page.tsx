"use client";
import { useGetAllUsersQuery } from "@/store/apis/CantajuegaApi";
import DashBoardGrid from "../../../components/DashBoard/DashBoardGrid";
import RowColumn from "@/components/DashBoard/RowColumnDashboard";
export default function Page() {
  const { data: users } = useGetAllUsersQuery(null);
  return (
    <>
      <h1>
        Usuarios de la app,se veria una lista de todos los usuarios, con
        opciones de paginado, al hacer click a un usuarios redirige a otra
        pestaña con info del usuario
      </h1>
      <RowColumn
        className={" font-bold w-[98.8%] border-b border-black "}
        numberOfColumns={"6"}
        column1={{ text: "nombre" }}
        column2={{ text: "Apellido" }}
        column3={{ text: "email" }}
        column4={{ text: "etapa" }}
        column5={{ text: "verificado" }}
        column6={{ text: "" }}
      />

      <section className="flex flex-col w-full gap-8 overflow-y-scroll   ">
        {users?.data?.map((user) => (
          <RowColumn
            key={user.id}
            numberOfColumns={"6"}
            column1={{ text: user.firstName, style: "underline" }}
            column2={{ text: user.lastName, style: "underline" }}
            column3={{ text: user.email }}
            column4={{ text: user.Membership?.name }}
            column5={{ text: user.email_verified as string }}
            linkColumn={{
              text: "Mas informacion",
              linkto: `/dashboard/usuarios/${user.id}`,
            }}
          />
        ))}
        
      </section>
    </>
  );
}
