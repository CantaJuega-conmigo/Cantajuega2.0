import { videostypes } from "./Stage.type";

export interface First_Video {
  PdfCompleted: boolean;
  Total: number;
  Ready_to_Next_Video: boolean;
}
export interface Final_Video {
  Last_Video_Completed: boolean;
  Total: number;
  Ready_to_Test: boolean;
}
export interface Other_Video {
  Last_Video_Completed: boolean;
  Total: number;
  Ready_to_Next_Video: boolean;
}
export interface Test_Status {
  Month_Passed: boolean;
  Ready_to_Test: boolean;
}
export interface videoprogresses{
  First_Video: First_Video;
  Second_Video: Other_Video;
  Third_Video: Other_Video;
  Fourth_Video: Other_Video;
  Final_Video: Final_Video;
}
export interface progress {
  id: string;
  Progress_Start: string;
  Pdf_Viewed: boolean;
  First_Video: First_Video;
  Second_Video: Other_Video;
  Third_Video: Other_Video;
  Fourth_Video: Other_Video;
  Final_Video: Final_Video;
  Test_Status: Test_Status;
  isAproved: boolean;
}
export enum selectProgressTypes {
  Progress_Start = "Progress_Start",
  Pdf_Viewed = "Pdf_Viewed",
  First_Video = "First_Video",
  Second_Video = "Second_Video",
  Third_Video = "Third_Video",
  Fourth_Video = "Fourth_Video",
  Final_Video = "Final_Video",
  Test_Status = "Test_Status",
  isAproved = "isAproved",
}
export interface progressResquest {
  ProgressId: string;
  select?: selectProgressTypes|videostypes;
}
export interface progressResquestMutation{
  ProgressId: string;
  select?: selectProgressTypes|videostypes;
  newprogress:First_Video|Other_Video|Final_Video
}
export interface progressPdfUpdateMutation{
  ProgressId: string;
  Pdf_Viewed: {
    Pdf_Viewed:true
  },
}
