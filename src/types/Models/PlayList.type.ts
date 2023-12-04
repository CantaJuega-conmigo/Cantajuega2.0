import { Music } from "./Music.type";

export interface PlayList{
    id:string,
    name:string,
    Music:Music[],
    createdAt:string,
}