export interface Membership {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    therapeuticTools: boolean;
    music: boolean;
    videos: boolean;
    recurrenteId: string;
    status: string;
}


export interface GetAllMembreshipsError {
    //fataria tipar el error
    error: string;
    status: number;
}

export type GetAllMembreshipsQuery = {
    data: Membership[];
  } | {
    data: GetAllMembreshipsError;
  };