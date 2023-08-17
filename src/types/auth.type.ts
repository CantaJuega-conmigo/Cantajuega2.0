import { User } from "./user.type";

export interface authenticated{
    user:User,
    token:string
}
export interface errorauthenticated{
    message:string
}
export type authResponse = {
    data: authenticated;
  } | {
    data: errorauthenticated;
  };