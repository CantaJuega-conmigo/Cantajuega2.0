import { youtubeplayercourses } from "@/types";
import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export default function YoutubePlayerCourses({
  videoId,
  styles,
}: youtubeplayercourses) {
  const options = {
    height: "100%",
    width: "100%",
    playerVars: {},
    origin: "http://localhost:3000",
  };
  const [videoDuration, setVideoDuration] = useState<number>();
  const [firstPlay, setFirstPlay] = useState<number>(0);
  const onReady = (event: YouTubeEvent) => {
    const Duration = event.target.getDuration();
    setVideoDuration(Duration);
   
  };
  const onPlay = () => {
    setFirstPlay(firstPlay + 1);
    if (firstPlay ===0) {
      console.log("el video es reproducido por primera vez");
    } else {
      console.log("el video se da play varias veces", videoDuration);
    }
  };
  const onPaused = () => {
    console.log("el video fue pausado");
  };
  const onFinished = () => {
    console.log("el video fue visto");
  };

  return (
    <YouTube
      videoId={videoId}
      className={styles ?? ""}
      opts={options}
      onPlay={onPlay}
      onEnd={onFinished}
      onReady={onReady}
    />
  );
}
