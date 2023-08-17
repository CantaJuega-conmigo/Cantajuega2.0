export interface stage {
    id:string,
    name: string,
    description: string,
    minAge: number,
    maxAge: number
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