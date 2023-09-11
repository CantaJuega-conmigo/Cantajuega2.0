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
  const onReady = (event: YouTubeEvent) => {
    const Duration = event.target.getDuration();
    setVideoDuration(Duration);
    console.log("el video esta listo y dura", videoDuration);
  };
  const onPlay = () => {
    console.log("El video comenzo a reproducirse");
  };
  const onPaused = () => {
    console.log("el video fue pausado");
  };
  const onFinished = () => {
    console.log("el video fue visto");
  };

  return <YouTube videoId={videoId} className={styles??''} opts={options}/>;
}
