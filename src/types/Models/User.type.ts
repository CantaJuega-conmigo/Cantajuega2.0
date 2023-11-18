import { Child, Report } from ".."
import { Membership } from "./Membership.type"

export interface User{
    id:string,
    firstName:string,
    lastName:string,
    email:string,
    phone?:number,
    is_Admin:boolean,
    recurrenteId:string,
    MembershipId:string,
    Reports?:Report[],
    email_verified:boolean|'verificado'|'no verificado'
    Membership:Membership,
    Children:Child[],
    createdAt:string,
    updatedAt:string
}
interface UserAuthResponse extends User{
    Children:Child[]
  
}
export interface authUser{
    error:boolean
    auth:boolean,
    user:UserAuthResponse
}
