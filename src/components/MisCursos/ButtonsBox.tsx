import { ButtonsBox } from "@/types/MIsCursos";
import { videostypes } from "@/types/step.type";
import { MouseEvent } from "react";

export default function ButtonsBox({
  nextvideo,
  lastvideo,
  videos,
  selectvideo,
  ActualProgress,
}: ButtonsBox) {
  const gotonextvideo = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(nextvideo)
    if (!nextvideo) {
      alert("Ups! ya no hay mas videos");
    } else {
    return  selectvideo(event);
    }
  };
  const gotolastvideo = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(lastvideo)
    if (!lastvideo) {
      alert("Ups! ya no hay mas videos");
    } else {
    return  selectvideo(event);
    }
  };
  const isNextVideoAvaliable = () => {
    if ("Ready_to_Next_Video" in ActualProgress) {
      return ActualProgress.Ready_to_Next_Video;
    }
  };
  return (
    <>
      <article className="flex justify-center gap-[10%]">
        <button
          className={`bg-white p-2 w-[11rem] rounded-xl hover:bg-orange border-orange border-2 ${
            !lastvideo && "cursor-not-allowed"
          }`}
          value={lastvideo}
          onClick={gotolastvideo}>
          Anterior
        </button>
        {ActualProgress && (
          <button
            className={` bg-orangeicons p-2 w-[11rem] rounded-xl hover:bg-orange hover:border-none border-orangeicons border-2 ${
              !isNextVideoAvaliable() && "cursor-not-allowed"
            }`}
            value={nextvideo}
            onClick={gotonextvideo}>
            Siguiente
          </button>
        )}
      </article>
    </>
  );
}
