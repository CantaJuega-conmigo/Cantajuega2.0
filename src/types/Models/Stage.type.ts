import { Child } from ".."

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
    Children?:Child[]
}
export interface stageWithChilds extends stage{
  Children:Child[]
}

export interface stageEditMutation{
  id:string,
  name?: string,
  description?: string,
  minAge?: number,
  maxAge?: number,
  content?:content
}
export interface videosEditMutation extends videos{
  id:string
}
export interface stageContentMutation {
    id:string,
    body:videos,
    querys:{
      content:'videos'|'musics',
      order:videostypes
    }
}