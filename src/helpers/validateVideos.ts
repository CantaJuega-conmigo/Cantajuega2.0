import { Final_Video, First_Video, Other_Video, progress } from "@/types";
import { videostypes } from "@/types/Models/Stage.type";
export const notavaliableTitles=(Progress:progress):videostypes[]=>{
    let titles: videostypes[] = [];
    if (Progress) {
      for (const key in Progress) {
        if (key in videostypes) {
          const propertye = key as videostypes;
          if (
            propertye !== videostypes.First_Video &&
            !Progress[propertye].Last_Video_Completed
          ) {
            titles.push(propertye);
          }
          if (
            propertye == videostypes.First_Video &&
            !Progress[propertye].PdfCompleted
          ) {
            titles.push(propertye);
          }
        }
      }
    }
    return titles
}
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