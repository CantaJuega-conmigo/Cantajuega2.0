import { User } from ".."

export interface loginbody{
    email:string,
    password:string
}
export interface loginResponse{
    token:string,
    user:User
}