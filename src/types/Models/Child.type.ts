export interface Child{
    id:string,
    firstName:string,
    lastName:string,
    gender:string,
    birthDate:string,
    age:number,
    ProgressId:string, 
    StageId:string
    Stages_Completed: object[] 
    User:{
        firstName:string
    },
    Stage:{
        name:string
    }
}