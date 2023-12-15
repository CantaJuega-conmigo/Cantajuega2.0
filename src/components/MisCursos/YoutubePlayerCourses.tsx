import {
  useGetProgressChildBySelectQuery,
  useUpdateVideoProgressMutation,
} from "@/store/apis/CantajuegaApi";
import {
  Final_Video,
  First_Video,
  Other_Video,
  progressResquest,
  progressResquestMutation,
  selectProgressTypes,
  youtubeplayercourses,
} from "@/types";
import { videostypes } from "@/types/Models/Stage.type";
import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";
import ButtonsBox from "./ButtonsBox";

export default function YoutubePlayerCourses({
  videoId,
  styles,
  Progress,
  ChildExists,
  select,
  ActualProgress,
}: youtubeplayercourses) {
  const options = {
    height: "100%",
    width: "100%",
    playerVars: {},
    origin: "http://localhost:3000",
  };
  console.log(Progress?.id, select, "para ver en produccion",ChildExists);

  const { data } = useGetProgressChildBySelectQuery(
    { ProgressId: Progress?.id!, select: select ?? videostypes.First_Video },
    {
      selectFromResult: ({ data }) => {
        console.log('dentro de selectFromResult',data?.data,data)
        console.log('child exist en selectfromresult',ChildExists)
        return {
          data:data&& data?.data![0], //una vez recibida la data, la transformamos, y nos quedamos con la etapa del niño
        };
      },
      skip: !ChildExists,
    }
  );

  const [update] = useUpdateVideoProgressMutation();
  const [videoDuration, setVideoDuration] = useState<number>();
  const [firstPlay, setFirstPlay] = useState<number>(0);
  const onReady = (event: YouTubeEvent) => {
    const Duration = event.target.getDuration();
    setVideoDuration(Duration);
  };
  const onPlay = () => {
    ///con esto obtenemos cuando se de el primer play
    setFirstPlay(firstPlay + 1);
    if (firstPlay === 0) {
      console.log("el video es reproducido por primera vez");
    } else {
      console.log("el video se da play varias veces");
    }
  };
  const onPaused = () => {
    console.log("el video fue pausado");
  };
  const updateProgress = () => {
    const newProgres = {
      ...data,
      Total: data?.Total! + 1,
    };
    const resquest = {
      ProgressId: Progress?.id,
      select: select,
      newprogress: newProgres,
    };
  };
  const onFinished = () => {
    const newProgres: First_Video | Final_Video | Other_Video = {
      ...data!,
      Total: data?.Total! + 1,
    };
    console.log(newProgres,'newprogres')
    const resquest: progressResquestMutation = {
      ProgressId: Progress?.id!,
      select: select,
      newprogress: newProgres,
    };
    update(resquest)
      .unwrap()
      .then((resp) =>
        data?.Total === 3
          ? alert("Felicidades ya puedes acceder al proximo video")
          : null
      )
      .catch((err) => console.log(err));
  };
  const verestado = () => {
    console.log(data);
  };
  return (
    <>
      <YouTube
        videoId={videoId}
        className={styles ?? ""}
        opts={options}
        onPlay={onPlay}
        onEnd={onFinished}
        onReady={onReady}
      />
      <span>Total de vistas: {data?.Total}</span>
    </>
  );
}
