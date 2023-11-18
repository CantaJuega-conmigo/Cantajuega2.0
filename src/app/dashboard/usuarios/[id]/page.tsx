"use client";
import Boxinfo from "@/components/DashBoard/BoxInfo";
import BoxInfoLayout from "@/components/DashBoard/BoxInfoLayout";
import UserCard from "@/components/DashBoard/UserCard";
import { useGetUserbyIdQuery } from "@/store/apis/CantajuegaApi";
import { transformDate } from "@/utils/general";

export default function Page({ params }: { params: { id: string } }) {
  const { data: user } = useGetUserbyIdQuery(params.id);

  return (
    <>
      <div className="flex ">
        <section className="flex flex-col w-8/12 gap-2 ">
          <BoxInfoLayout title="Registro /actualizacion">
            <Boxinfo
              title="fecha de registro"
              info={transformDate(user?.createdAt ?? "")}
            />
            <Boxinfo
              title="fecha actualizacion"
              info={transformDate(user?.updatedAt ?? "")}
            />
          </BoxInfoLayout>

          <BoxInfoLayout title="Datos">
            <Boxinfo
              title="Telefono"
              info={user?.phone?.toString() ?? "Sin registrar"}
            />
            <Boxinfo title="email" info={user?.email} />
            <Boxinfo
              title="¿email verificado?"
              info={user?.email_verified + ""}
            />
          </BoxInfoLayout>

          <BoxInfoLayout title="Membresia">
            <Boxinfo title="Fecha adquirida" info="05/06/1999" />
            <Boxinfo title="Nombre" info={user?.Membership.name ?? ""} />
            <Boxinfo title="Etapa habilitada" info="Etapa inicial" />
            <Boxinfo title="Vence" info="05/06/1999" />
          </BoxInfoLayout>

          <BoxInfoLayout title="Mas informacion">
            <Boxinfo
              title="Hijo/a"
              seeMoreButton={true}
              seeMorePath={`/dashboard/childs/${user?.Children[0].id}`}
            />
            <Boxinfo
              title="Reportes"
              seeMoreButton={true}
              seeMorePath={`/dashboard/reportes/${user?.id}`}
            />
          </BoxInfoLayout>
        </section>

        <section className=" w-4/12 flex justify-center ">
          <UserCard
            Name={user?.firstName ?? ""}
            lastName={user?.lastName ?? ""}
            admin={user?.is_Admin ? "admin" : "Usuario"}
            id={user?.id ?? ""}
            age={5151551}
          />
        </section>
      </div>
    </>
  );
}
