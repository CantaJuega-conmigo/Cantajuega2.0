"use client";
import { useAppSelector } from "@/store/hooks";
import { videos, videostypes } from "@/types/step.type";
import { useState, MouseEvent } from "react";
import YoutubePlayerCourses from "./YoutubePlayerCourses";
import { miscursosprops } from "@/types";
import {
  ValidateFirstVideo,
  ValidateOthersVideo,
  notavaliableTitles,
} from "@/helpers";
import { useUpdatePdfProgressStatusMutation } from "@/store/apis/CantajuegaApi";

export default function MisCursosContent({
  Stage,
  ProgressId,
  ChildExists,
}: miscursosprops) {
  const [seePdf] = useUpdatePdfProgressStatusMutation();
  const GeneralProgress = useAppSelector(
    (state) => state.progressReducer.progress
  );

  const [actualVideo, setActualVideo] = useState<videos>({
    order: videostypes.First_Video,
    content: "",
    title: "",
  });

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

  const invalidTitles = (): videostypes[] => {
    if (GeneralProgress) {
      const titles = notavaliableTitles(GeneralProgress);
      return titles;
    }
    return [];
  };
  const openPdf = () => {
    if (!GeneralProgress?.Pdf_Viewed) {
      seePdf({ ProgressId: ProgressId!, Pdf_Viewed: { Pdf_Viewed: true } })
        .unwrap()
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <section className="flex flex-col gap-4 w-2/12">
        <article className="flex justify-center">
          <h1 className="text-2xl">{Stage?.name}</h1>
        </article>

        <article className="flex flex-col gap-4 items-center">
          <button
            onClick={openPdf}
            className={GeneralProgress?.Pdf_Viewed ? "text-green" : "text-red"}>
            {Stage?.content.pdf.name}
          </button>
          {GeneralProgress &&
            Stage?.content.videos.map((i, key) => (
              <button
                className={
                  invalidTitles().includes(i.order) ? "text-red" : "text-green"
                }
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
        <article className="flex flex-col">
          {actualVideo.content ? (
            <YoutubePlayerCourses
              styles=""
              videoId={actualVideo.content}
              ChildExists={ChildExists}
              Progress={GeneralProgress}
              select={actualVideo.order}
              ActualProgress={ActualProgress!}
            />
          ) : (
            <h1>Elija un video</h1>
          )}
        </article>
      </section>
    </>
  );
}
