
export interface User {
    id: string;
    firstName: string;
    lastName: string; 
    email: string;
}
export interface UserAuth{
    id: string;
    firstName: string;
    lastName: string; 
    email: string;
}
export interface RegisterBody {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface loginBody {
    email: string;
    password: string;
}

export interface UserQueryData {
    user: User;
    token: string;
  }

export interface UserQueryError {
    //fataria tipar el error
    error: string;
    status: number;
}

export type UserQueryResponse = {
    data: UserQueryData;
  } | {
    data: UserQueryError;
  };