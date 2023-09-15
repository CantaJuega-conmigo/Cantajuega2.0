import {
  Child,
  Final_Video,
  First_Video,
  Other_Video,
  User,
  progress,
  progressPdfUpdateMutation,
  progressResquest,
  progressResquestMutation,
  responses,
  videoprogresses,
} from "@/types";
import { authResponse } from "@/types/auth.type";
import { Membership } from "@/types/membership.type";
import { stage } from "@/types/step.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../userSlice";
import { setChild } from "../childSlice";
import { setProgress, setActualProgress } from "../child_progress_slice";
import {NextRouter} from 'next/router'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface id {
  id: number;
}

export const CantajuegaService = createApi({
  reducerPath: "Cantajuegapi", //nombre del estado/cache

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, ///url a donde se hacen las peticiones
    prepareHeaders: (headers) => {
      //preparamos los headers para que se envien las credenciales en cada peticion
      // const token = Cookies.get('accesscookie'); //obtenemos el token de las cookies;
      // if (token) {
      //   headers.set("authorization", token);

      // }

      return headers;
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" });
    },
  }),
  tagTypes: ["Progress", "User", "Child"],
  endpoints: (builder) => ({
    getStage: builder.query<stage[], null>({
      ///etapas/cursos
      query: () => "stage", ///ruta /stage del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    getMembership: builder.query<Membership[], null>({
      ///membresias
      query: () => "membership", ///ruta /membership del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    auth: builder.query({
      query: () => "/user/auth",
      keepUnusedDataFor: 600,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //es lo que hara con la respuesta
        try {
          const data = (await queryFulfilled).data; //en data viene informacion del usuario y el token
          const { id, firstName, lastName, email } = data.user as any;
          const UserChild = (data.user.Children[0] as Child) ?? null;
          ///actualizamos nuestros estados globales
          dispatch(setUser({ id, firstName, lastName, email }));
          dispatch(setChild(UserChild));
        } catch (err) {
          // Cookies.remove("accessToken");
          dispatch(setUser(null));
        }
      },
    }),
    logOut: builder.query({
      query: (callback) => "user/logout",
      keepUnusedDataFor: 0,
      async onQueryStarted(router, { dispatch, queryFulfilled }) {
          dispatch(setUser(null));
          const response:responses= (await queryFulfilled).data;
          alert(response.message)
      },
    }),
    ///obtener todos los childs
    getChild: builder.query({
      query: () => "child",
      keepUnusedDataFor: 600,
      async onQueryStarted(nose, { dispatch, queryFulfilled }) {
        const response = await queryFulfilled;
      },
    }),
    ////obtener child por id
    getChildById: builder.query({
      query: (id) => `child/${id}`,
      keepUnusedDataFor: 600,
      async onQueryStarted(nose, { dispatch, queryFulfilled }) {
        const response = (await queryFulfilled).data as Child;
        dispatch(setChild(response));
      },
    }),
    getProgressChild: builder.query<progress, progressResquest>({
      query: ({ ProgressId }) => `progress/${ProgressId}`,
      keepUnusedDataFor: 600,
      providesTags: ["Progress"],
      async onQueryStarted(any, { dispatch, queryFulfilled }) {
        const data = (await queryFulfilled).data;
        dispatch(setProgress(data));
      },
    }),
    getProgressChildBySelect: builder.query<
      First_Video | Other_Video | Final_Video | null,
      progressResquest
    >({
      query: ({ ProgressId, select }) =>
        `progress/${ProgressId}?select=${select}`,
      keepUnusedDataFor: 600,
      providesTags: ["Progress"],
      async onQueryStarted(none, { dispatch, queryFulfilled }) {
        const data = (await queryFulfilled).data;
        dispatch(setActualProgress(data));
      },
    }),
    updateVideoProgress: builder.mutation({
      query: ({
        ProgressId,
        select,
        newprogress,
      }: progressResquestMutation) => ({
        url: `progress/${ProgressId}?select=${select}`,
        method: "PUT",
        body: newprogress,
      }),
      invalidatesTags: ["Progress"],
    }),
    updatePdfProgressStatus: builder.mutation({
      query: ({ ProgressId, Pdf_Viewed }: progressPdfUpdateMutation) => ({
        url: `progress/${ProgressId}`,
        method: "PUT",
        body: Pdf_Viewed,
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
  useGetStageQuery,
  useGetMembershipQuery,
  useAuthQuery,
  useGetChildQuery,
  useGetProgressChildQuery,
  useLazyGetProgressChildQuery,
  useGetProgressChildBySelectQuery,
  useUpdateVideoProgressMutation,
  useUpdatePdfProgressStatusMutation,
  useLazyLogOutQuery,
} = CantajuegaService;
