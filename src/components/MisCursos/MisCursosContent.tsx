"use client";

import {
  useGetProgressChildBySelectQuery,
  useGetProgressChildQuery,
  useGetStageQuery,
} from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";
import { videos, videostypes } from "@/types/step.type";
import { useState, MouseEvent } from "react";
import YoutubePlayerCourses from "./YoutubePlayerCourses";
import {
  selectProgressTypes,
  miscursosprops,
  progress,
  videoprogresses,
} from "@/types";
import { ValidateFirstVideo, ValidateOthersVideo } from "@/helpers";

export default function MisCursosContent({
  Stage,
  ProgressId,
  ChildExists,
}: miscursosprops) {
  const GeneralProgress = useAppSelector(
    (state) => state.progressReducer.progress
  );

  const [actualVideo, setActualVideo] = useState<videos>({
    order: videostypes.First_Video,
    content: "",
    title: "",
  });
  const [select, setSelect] = useState<selectProgressTypes | null>();

  const { data } = useGetProgressChildBySelectQuery(
    { ProgressId: ProgressId!, select: select ?? actualVideo.order },
    {
      skip: !ChildExists,
    }
  );

  const ActualProgress = useAppSelector(
    (state) => state.progressReducer.actualprogress
  );

  const selectVideo = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as videostypes;
    const videoselected = Stage?.content.videos.filter(
      ///selecciona el video a ver
      (index) => index.order === value
    )[0]!;

    /////validaciones
    ///para los videos que no sean el primero
    if (value !== "First_Video") {
      const lastVideoCompleted = ValidateOthersVideo(GeneralProgress![value]);
      if (lastVideoCompleted) {
        return setActualVideo(videoselected);
      }
    }
    ////para el primer video
    if (value == "First_Video") {
      const PdfCompleted = ValidateFirstVideo(
        GeneralProgress![videostypes[value]]
      );

      if (PdfCompleted) {
        return setActualVideo(videoselected);
      }
    }
  };

  const seestate = () => {
    console.log(GeneralProgress);
    console.log(ActualProgress);
  };

  const notavaliableTitles = ():videostypes[] => {
    let titles: videostypes[] = [];
    if (GeneralProgress) {
      for (const key in GeneralProgress) {
        if (key in videostypes) {
          const propertye = key as videostypes;
          if (
            propertye !== videostypes.First_Video &&
            !GeneralProgress[propertye].Last_Video_Completed
          ) {
            titles.push(propertye);
          }
          if (
            propertye == videostypes.First_Video &&
            !GeneralProgress[propertye].PdfCompleted
          ) {
            titles.push(propertye);
          }
        }
      }
    }
    return titles
  };
  return (
    <>
      <section className="flex flex-col gap-4 w-2/12">
        <article className="flex justify-center">
          <h1 className="text-2xl">{Stage?.name}</h1>
        </article>
        <button onClick={notavaliableTitles}>ver estados</button>
        <article className="flex flex-col gap-4 items-center">
          {GeneralProgress &&
            Stage?.content.videos.map((i, key) => (
              <button
                className={notavaliableTitles().includes(i.order)?'text-red' :'text-green'}
                key={key}
                value={i.order}
                onClick={selectVideo}>
                {i.title}
              </button>
            ))}
        </article>
      </section>

      <section className="w-10/12 flex flex-col items-center gap-4">
        <h1>AQUI va el video,{actualVideo.title}</h1>
        <article className="flex">
          {actualVideo.content ? (
            <YoutubePlayerCourses styles="" videoId={actualVideo.content} />
          ) : (
            <h1>Elija un video</h1>
          )}
        </article>
      </section>
    </>
  );
}
