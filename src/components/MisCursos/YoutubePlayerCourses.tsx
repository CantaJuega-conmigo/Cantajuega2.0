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
import { videostypes } from "@/types/step.type";
import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubePlayerCourses({
  videoId,
  styles,
  Progress,
  ChildExists,
  select,
}: youtubeplayercourses) {
  const options = {
    height: "100%",
    width: "100%",
    playerVars: {},
    origin: "http://localhost:3000",
  };

  const { data } = useGetProgressChildBySelectQuery(
    { ProgressId: Progress?.id!, select: select ?? videostypes.First_Video },
    {
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
    const resquest: progressResquestMutation = {
      ProgressId: Progress?.id!,
      select: select,
      newprogress: newProgres,
    };
    update(resquest)
      .unwrap()
      .then((resp) =>
        data?.Total === 1
          ? alert("Felicidades ya puedes acceder al proximo video")
          : null
      )
      .catch((err) => console.log(err));
  };
  const verestado = () => {
    console.log(data);
  };
  return (
    <div>
      <YouTube
        videoId={videoId}
        className={styles ?? ""}
        opts={options}
        onPlay={onPlay}
        onEnd={onFinished}
        onReady={onReady}
      />
      <button onClick={verestado}>Ver estado</button>
      <button onClick={updateProgress}>actualizar este video</button>
    </div>
  );
}
