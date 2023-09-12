import { Final_Video, First_Video, Other_Video } from "@/types";

export const ValidateFirstVideo=(FirstVideoProgress:First_Video)=>{
  if(!FirstVideoProgress.PdfCompleted){
      alert('No puedes avanzar aun , el pdf deber ser visto.');
      return false
  }
   return true
}
export const ValidateOthersVideo=(FirstVideoProgress:Other_Video|Final_Video)=>{
  if(!FirstVideoProgress.Last_Video_Completed){
      alert('No puedes avanzar aun , debes ver el video anterior.');
      return false
  }
   return true
}