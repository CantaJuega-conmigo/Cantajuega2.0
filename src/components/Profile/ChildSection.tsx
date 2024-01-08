import { Child, progress, responses } from "@/types";
import { stage } from "@/types/Models/Stage.type";
import { getAge } from "@/utils/general";

export default function ChildSection({
  child: child,
  stage: stage,
  progresloading,
  progress: progress,
}: {
  child: Child;
  stage: stage;
  progresloading: boolean;
  progress: responses<progress>;
}) {
  return (
    <section className="flex flex-col w-6/12 gap-5 items-center bg-blue text-white pt-4 h-screen">
      <article className="w-11/12 text-center">
        <h1 className="text-3xl">
          Datos de mi {child?.gender === "male" ? "hijo " : "hija "}
          {child?.firstName}
        </h1>
      </article>

      <section className="w-11/12 flex flex-col gap-2">
        <p>
          Nombre completo:{child?.firstName} {child?.lastName}
        </p>
        <p>Genero:{child?.gender==="male"?"niño":"niña"}</p>
        <p>Edad:{getAge(child?.age)}</p>
        <p>
          <b>Cumpleaños:</b> {child?.birthDate.split("-").reverse().join("-")}
        </p>
      </section>

      <section className=" w-11/12 flex flex-col gap-2">
        <h3 className="text-xl">Etapa:</h3>
        <p>{stage?.name}</p>
      </section>
      <section className=" w-11/12 flex flex-col gap-2">
        <h3 className="text-xl">Progreso actual en la etapa:</h3>
        <p>{progresloading && "Cargando..."}</p>
        <p>
          Video1:
          {progress?.data![0]?.First_Video.Ready_to_Next_Video
            ? "Completo"
            : "Sin completar"}
        </p>
        <p>
          Video2:
          {progress?.data![0]?.Second_Video.Ready_to_Next_Video
            ? "Completo"
            : "Sin completar"}
        </p>
        <p>
          Video3:
          {progress?.data![0]?.Third_Video.Ready_to_Next_Video
            ? "Completo"
            : "Sin completar"}
        </p>
        <p>
          Video4:
          {progress?.data![0]?.Fourth_Video.Ready_to_Next_Video
            ? "Completo"
            : "Sin completar"}
        </p>
        <p>
          Video5:
          {progress?.data![0]?.Final_Video.Ready_to_Test
            ? "Completo"
            : "Sin completar"}
        </p>
        <p>
          Examen:
          {progress?.data![0]?.Test_Status.Month_Passed
            ? "Listo para el examen"
            : "No listo"}
        </p>
      </section>
    </section>
  );
}
