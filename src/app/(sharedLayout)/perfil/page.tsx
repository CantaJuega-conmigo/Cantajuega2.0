"use client";
import {
  useGetMembershipByIdQuery,
  useGetProgressChildQuery,
  useGetStageByIdQuery,
} from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";
import { Suspense } from "react";
import { RotatingLines } from 'react-loader-spinner';

export default function Page() {
  const user = useAppSelector((state) => state.userReducer.user);
  const userMembershipexist = user?.MembershipId ? true : false;
  const child = useAppSelector((state) => state.childReducer.child);
  const childStageExist = child?.StageId ? true : false;
  const { data: membership, error ,isLoading,isFetching} = useGetMembershipByIdQuery(
    user?.MembershipId!,
    {
      skip: !userMembershipexist,
    }
  );
  const { data: stage } = useGetStageByIdQuery({id:child?.StageId!,}, {
    skip: !childStageExist,
  });
  const {data:progress,isLoading:progresloading}=useGetProgressChildQuery({ProgressId:child?.ProgressId!})
  
  return (
    <div className="min-h-screen  flex  ">
      <section className="flex flex-col gap-4 pt-4 w-6/12 items-center bg-stone-300">
        <article className=" w-full flex justify-center">
          <h1 className=" text-3xl">
            Hola {user?.firstName} {user?.lastName}
          </h1>
        </article>

        <article className="  w-11/12 flex flex-col gap-2">
          <h2 className=" text-2xl">Mis datos</h2>
          <p>
            <b>Mi email</b>: {user?.email}
          </p>
          <span>*email no verificado, verificar ahora ?</span>
          <p>
            <b>Mi telefono</b>: {user?.phone ?? <i>agregar un numero</i>}
          </p>
        </article>

        <article className=" w-11/12 flex flex-col gap-2">
          <h1 className=" text-2xl ">Membresia actual</h1>
          <i>{membership?.name}</i>
        </article>

        <article className=" w-11/12 flex flex-col gap-2">
          <h3 className="text-2xl">Mis reportes:</h3>
           
          <RotatingLines strokeColor='#000'
                strokeWidth='5'
                animationDuration='0.5'
                width='50'
                visible={isLoading || isFetching}/>
          {user?.Reports?.map((report, key) => (
          
              <div key={key} className=" bg-slate-200 p-2 flex flex-col gap-2">
                <p>
                  <b>detalles</b>:{report.Description}
                </p>
                <p>
                  <b>Respuesta</b>:{report.Response ?? "Sin respuestas aun."}
                </p>
                <p>
                  <b>Fecha de envio</b>:{report.createdAt}
                </p>
                <p>
                  <b>Estado</b>:{report.is_Resolved?'Cerrado':'Abierto'}
                </p>
              </div>
        
          ))}
  
          <h3 className=" text-2xl">Crear nuevo reporte</h3>
          <form action="" className=" flex flex-col gap-2 w-full ">
            <label htmlFor="newReport"> Detalles:</label>
            <textarea name="newReport" id="newReport" />
            <button className="p-2 bg-orange">Enviar reporte</button>
          </form>
        </article>
      </section>

      <section className="flex flex-col w-6/12 gap-5 items-center bg-blue text-white pt-4 ">
        <article className="w-11/12 text-center">
          <h1 className="text-3xl">Datos de mi hijo {child?.firstName} </h1>
        </article>

        <section className="w-11/12 flex flex-col gap-2">
          <p>
            Nombre completo:{child?.firstName} {child?.lastName}
          </p>
          <p>Genero:{child?.gender}</p>
          <p>Edad:{child?.age}</p>
          <p>
            <b>Cumpleaños:</b> {child?.birthDate}
          </p>
        </section>

        <section className=" w-11/12 flex flex-col gap-2">
          <h3 className="text-2xl">Etapa:</h3>
          <p>{stage?.name}</p>
        </section>
        <section className=" w-11/12 flex flex-col gap-2">
          <h3 className="text-2xl">Progreso actual en la etapa:</h3>
          <p>{progresloading&&'Cargando...'}</p>
          <p>Video1: {progress?.data![0]?.First_Video.Ready_to_Next_Video?'Completo':'Sin completar'}</p>
          <p>Video2: {progress?.data![0]?.Second_Video.Ready_to_Next_Video?'Completo':'Sin completar'}</p>
          <p>Video3: {progress?.data![0]?.Third_Video.Ready_to_Next_Video?'Completo':'Sin completar'}</p>
          <p>Video4: {progress?.data![0]?.Fourth_Video.Ready_to_Next_Video?'Completo':'Sin completar'}</p>
          <p>Video5: {progress?.data![0]?.Final_Video.Ready_to_Test?'Completo':'Sin completar'}</p>
          <p>Examen: {progress?.data![0]?.Test_Status.Month_Passed?'Listo para el examen':'No listo'}</p>
        </section>
      </section>
    </div>
  );
}
