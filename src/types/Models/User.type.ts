import { Child, Report } from ".."

export interface User{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    phone?:number,
    is_Admin:boolean,
    recurrenteId:string,
    MembershipId:string,
    Reports?:Report[]
}
interface UserAuthResponse extends User{
    Children:Child[]
}
export interface authUser{
    error:boolean
    auth:boolean,
    user:UserAuthResponse
}
