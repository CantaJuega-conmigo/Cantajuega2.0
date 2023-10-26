"use client";
import {
  useGetChildByIdQuery,
  useGetMembershipByIdQuery,
  useGetMembershipQuery,
  useGetStageByIdQuery,
} from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";

export default function Page() {
  const user = useAppSelector((state) => state.userReducer.user);
  const userMembershipexist = user?.MembershipId ? true : false;
  const child = useAppSelector((state) => state.childReducer.child);
  const childStageExist = child?.StageId ? true : false;
  const { data: membership, error } = useGetMembershipByIdQuery(
    user?.MembershipId!,
    {
      skip: !userMembershipexist,
    }
  );
  const {data:stage} = useGetStageByIdQuery(child?.StageId!, {
    skip: !childStageExist,
  });

  return (
    <div className="min-h-screen  flex  ">
      <section className="flex flex-col w-6/12 items-center bg-orange">
        <h1>
          Hola {user?.firstName} {user?.lastName}
        </h1>
        <article className=" text-center">
          <h2>Mis datos</h2>
          <p>
            <b>Mi email</b>: {user?.email}
          </p>
          <p>
            <b>Mi telefono</b>: {user?.phone ?? <i>agregar un numero</i>}
          </p>
        </article>
        <article className=" bg-red text-white">
          <h1>Membresia actual</h1>
          <h3>{membership?.name}</h3>
        </article>
        <article>
          <h3>Mis reportes:</h3>
          {user?.Reports?.map((report, key) => (
            <div key={key} className=" bg-slate-500 ">
              <p>
                <b>detalles</b>:{report.Description}
              </p>
              <p>
                <b>Respuesta</b>:{report.Response ?? "Sin respuestas aun."}
              </p>
              <p>
                <b>Fecha de envio</b>:{report.createdAt}
              </p>
            </div>
          ))}
          <h3>Crear nuevo reporte</h3>
          <form action="" className=" flex items-start">
            <label htmlFor="newReport"> Detalles</label>
            <textarea name="newReport" id="newReport" />
          </form>
        </article>
      </section>
      <section className="flex flex-col w-6/12 items-center bg-blue">
        <h1>Datos de mi hijo {child?.firstName} </h1>
        <section>
          <p>
            Nombre completo:{child?.firstName} {child?.lastName}
          </p>
          <p>Genero:{child?.gender}</p>
          <p>Edad:{child?.age}</p>
          <p>
            <b>Cumpleaños:</b> {child?.birthDate}
          </p>
        </section>
        <section>
          <h3>Etapa:</h3>
          <p>{stage?.name}</p>
        </section>
      </section>
    </div>
  );
}
