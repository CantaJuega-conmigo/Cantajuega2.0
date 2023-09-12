export enum videostypes{
  First_Video = "First_Video",
  Second_Video = "Second_Video",
  Third_Video = "Third_Video",
  Fourth_Video = "Fourth_Video",
  Final_Video = "Final_Video",
}

export interface videos{
  order:videostypes,
  title:string,
  content:string
}
interface music{
  order:string,
  title:string,
  content:string
}
interface pdf{
  name:string,
  content:string
}
interface content{
  pdf:pdf,
  videos:videos[],
  music:music[]
}
export interface stage {
    id:string,
    name: string,
    description: string,
    minAge: number,
    maxAge: number,
    content:content
}


export interface GetAllStepsError {
    //fataria tipar el error
    error: string;
    status: number;
}

export type GetAllMembreshipsQuery = {
    data: stage[];
  } | {
    data: GetAllMembreshipsQuery;
  };