import { youtubePlayer } from "@/types";
import Youtube from "react-youtube";

export default function YoutubePlayer({ videoId ,styles}: youtubePlayer) {
  const options ={
    height: "100%",
    width: "100%",
    playerVars: {},
    origin:'http://localhost:3000'
  }

  return (

      <Youtube videoId={videoId} className={styles??''} opts={options} />
  
  );
}
