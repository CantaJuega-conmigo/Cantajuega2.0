import { User } from "@/types";
import { authResponse } from "@/types/auth.type";
import { Membership } from "@/types/membership.type";
import { stage } from "@/types/step.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../userSlice";
import Cookies from "js-cookie";
interface id {
  id: number;
}

export const CantajuegaService = createApi({
  reducerPath: "Cantajuegapi", //nombre del estado/cache

  baseQuery: fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/", ///url a donde se hacen las peticiones
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
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
    authq: builder.query({
      query: () => "/user/auth",
      keepUnusedDataFor: 600,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const data = (await queryFulfilled).data;
          const { id, firstName, lastName, email } = data.user as User;
          dispatch(setUser({ id, firstName, lastName, email }));
        } catch (err) {
          console.log("algo salio mal en auth",err);
          Cookies.remove('accessToken')
          dispatch(setUser(null));
        }
      },
    }),
  }),
});

export const { useGetStageQuery, useGetMembershipQuery, useAuthqQuery } =
  CantajuegaService;
