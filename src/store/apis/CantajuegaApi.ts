import { RegisterBody, User, UserQueryData, UserQueryResponse, loginBody } from "@/types";
import { authResponse } from "@/types/auth.type";
import { Membership } from "@/types/membership.type";
import { stage } from "@/types/step.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "../store";
import { setUser } from "../userSlice";
interface id {
  id: number;
}
export const CantajuegaService = createApi({
  reducerPath: "Cantajuegapi", //nombre del estado/cache
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/", ///url a donde se hacen las peticiones
  }),
  endpoints: (builder) => ({
    getStage: builder.query<stage[], null>({
      ///etapas/cursos
      query: () => "stage", ///ruta /stage del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    getMembership: builder.query<Membership[], null>({
      ///membresias
      query: () => "membership", ///ruta /stage del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    registerUser: builder.mutation<null,RegisterBody>({
      query: (Data: RegisterBody) => ({
        url: "/user/register",
        method: "POST",
        body: Data,
      }),
      transformResponse: (response:UserQueryData) => {
        // Realizar alguna transformación en la respuesta antes de que se almacene en la caché
        const token=localStorage.getItem('tkn')
        if(!token){
            localStorage.setItem('tkn',response.token)
        }
        return null
      },
    }),
    loginUser: builder.mutation<null,loginBody>({
      query: (Data: loginBody) => ({
        url: "/user/login",
        method: "POST",
        body: Data,
      }),
      transformResponse: (response:UserQueryData) => {
        // Realizar alguna transformación en la respuesta antes de que se almacene en la caché
        const token=localStorage.getItem('tkn')
      
        if(!token){
            localStorage.setItem('tkn',response.token)
            store.dispatch(setUser(response.user))
        }
        return null
      },
    }),
  }),
});

export const { useGetStageQuery, useGetMembershipQuery ,useRegisterUserMutation,useLoginUserMutation} = CantajuegaService;

