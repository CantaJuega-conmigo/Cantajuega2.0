"use client";
import { useAppSelector } from "@/store/hooks";
import { videos, videostypes } from "@/types/Models/Stage.type";
import { useState, MouseEvent, useEffect } from "react";
import YoutubePlayerCourses from "./YoutubePlayerCourses";
import { miscursosprops } from "@/types";
import {
  ValidateFirstVideo,
  ValidateOthersVideo,
  notavaliableTitles,
} from "@/helpers";
import { useUpdatePdfProgressStatusMutation } from "@/store/apis/CantajuegaApi";
import ButtonsBox from "./ButtonsBox";

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
  useEffect(() => {
    setActualVideo({
      //when the page was charged, set the first video
      ...actualVideo,
      content: Stage?.content.videos[0].content!,
      title: Stage?.content.videos[0].title!,
    });
  }, [Stage]);
  const [indexOfActualvideo, setIndexOfActualVideo] = useState(1);
  const ActualProgress = useAppSelector(
    (state) => state.progressReducer.actualprogress
  );

  const allvideostypes: videostypes[] = [
    videostypes.First_Video,
    videostypes.Second_Video,
    videostypes.Third_Video,
    videostypes.Fourth_Video,
    videostypes.Final_Video,
  ];
  const selectVideo = (event: MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value as videostypes;
    const videoselected = Stage?.content.videos.filter(
      ///selecciona el video a ver
      (index) => index.order === value
    )[0]!;

    /////validaciones
    ///para los videos que no sean el primero
    if (value !== "First_Video") {
      const nameOfLastVideo = allvideostypes[allvideostypes.indexOf(value) - 1]; //to verify if one day passed
      const lastVideoCompleted = ValidateOthersVideo(
        GeneralProgress![value],
        GeneralProgress![nameOfLastVideo]
      ); //verify here
      if (lastVideoCompleted) {
        setIndexOfActualVideo(allvideostypes.indexOf(value));
        return setActualVideo(videoselected);
      }
    }
    ////para el primer video
    if (value == "First_Video") {
      setIndexOfActualVideo(allvideostypes.indexOf(value));
      return setActualVideo(videoselected);
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
  return (
    <>
      <section className="flex flex-col gap-2 w-2/12 items-center border-r-2 border-orangeicons border-dashed">
        <article className="flex  flex-col items-center gap-2">
          <h1 className="text-3xl">Mi progreso</h1>
          <h2 className="text-2xl">{Stage?.name}</h2>
        </article>
        <article className="flex flex-col gap-2  text-xl items-start">
          {GeneralProgress &&
            Stage?.content.videos.map((i, key) => (
              <button
                className={`
                  p-2 rounded-lg
                  ${
                    invalidTitles().includes(i.order)
                      ? " text-gray-500 hover:bg-[#fc3434] cursor-not-allowed"
                      : `${
                          i.title === actualVideo.title && "bg-orange "
                        }  hover:bg-orange`
                  }
            `}
                key={key}
                value={i.order}
                onClick={selectVideo}>
                {`${key + 1}- ${i.title}`}
              </button>
            ))}
        </article>
      </section>

      <section className="w-10/12 flex flex-col items-center gap-4 ">
        <h1 className="text-3xl">{actualVideo.title}</h1>
        <article className="flex flex-col w-9/12 max-w-[70rem]  h-full gap-6">
          <YoutubePlayerCourses
            styles="h-5/6 max-h-[30rem]"
            videoId={actualVideo.content}
            ChildExists={ChildExists}
            Progress={GeneralProgress}
            select={actualVideo.order}
            ActualProgress={ActualProgress!}
          />
          <ButtonsBox
            videos={allvideostypes}
            lastvideo={allvideostypes[indexOfActualvideo - 1]}
            nextvideo={allvideostypes[indexOfActualvideo + 1]}
            selectvideo={selectVideo}
            ActualProgress={ActualProgress!}
          />
        </article>
      </section>
    </>
  );
}
