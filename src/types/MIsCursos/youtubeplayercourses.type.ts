import { progress } from "..";
import { youtubePlayer } from "../YoutubePlayer/youtubeplayer.type";
import { videostypes } from "../step.type";
export interface youtubeplayercourses extends youtubePlayer{
  Progress?:progress|null,
  ChildExists?:boolean,
  select:videostypes
}