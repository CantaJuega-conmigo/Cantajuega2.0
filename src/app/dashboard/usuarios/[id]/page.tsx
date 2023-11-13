"use client";
import { useGetUserbyIdQuery } from "@/store/apis/CantajuegaApi";

export default function Page({ params }: { params: { id: string } }) {
  const { data: user } = useGetUserbyIdQuery(params.id);
  console.log(user?.Reports);
  return (
    <>
      <h1>Informacion del usuario:{user?.firstName}</h1>
      <section className="flex flex-col">
        <article className="flex flex-col bg-blue">
          <p>Nombre Completo: {`${user?.firstName} ${user?.lastName}`}</p>
          <p>Email:{user?.email}</p>
          <p>Email verificado: {user?.email_verified}</p>
          <p>Telefono de contacto:{user?.phone ?? "Sin telefono."}</p>
          <p>Membresia:{user?.Membership?.name ?? "Sin membresia."}</p>
        </article>
        <article className="flex flex-col bg-emerald-500">
          <h1>Informacion del niño/a a cargo:</h1>
          <p>Nombre:{user?.Children[0].firstName}</p>
          <p>Edad:{user?.Children[0].age}</p>
        </article>
        <article className="flex flex-col bg-green">
          <h1>Reportes:</h1>
          {user?.Reports?.map((report) => {
            return (
              <div
                key={report.id}
                className="flex flex-col  text-white">
                <h2>fecha:{report.createdAt}</h2>
                <p>{report.Description}</p>
              </div>
            );
          })}
        </article>
      </section>
      <section></section>
    </>
  );
}
