import { stage } from "../Models/Stage.type";

import { Final_Video, First_Video, Other_Video, progress } from "..";
import { youtubePlayer } from "../YoutubePlayer/youtubeplayer.type";
import { videostypes } from "../Models/Stage.type";
import { MouseEvent } from "react";
export interface miscursosprops {
  ProgressId?: string;
  // Progress:progress,
  Stage?: stage;
  ChildExists: boolean;
}
export interface youtubeplayercourses extends youtubePlayer {
  Progress?: progress | null;
  ChildExists?: boolean;
  select: videostypes;
  ActualProgress: First_Video | Other_Video | Final_Video;
}

export interface ButtonsBox{
    videos:videostypes[]
    nextvideo:videostypes,
    lastvideo:videostypes,
    selectvideo:(event: MouseEvent<HTMLButtonElement>) => void,
    ActualProgress: First_Video | Other_Video | Final_Video;
}