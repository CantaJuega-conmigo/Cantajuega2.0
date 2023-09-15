import { Final_Video, First_Video, Other_Video, progress } from "..";
import { youtubePlayer } from "../YoutubePlayer/youtubeplayer.type";
import { videostypes } from "../step.type";
export interface youtubeplayercourses extends youtubePlayer{
  Progress?:progress|null,
  ChildExists?:boolean,
  select:videostypes,
  ActualProgress:First_Video|Other_Video|Final_Video
}