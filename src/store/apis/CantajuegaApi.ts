import {
  Child,
  Final_Video,
  First_Video,
  Other_Video,
  User,
  authUser,
  progress,
  progressPdfUpdateMutation,
  progressResquest,
  progressResquestMutation,
  responses,
  videoprogresses,
} from "@/types";
import { stage } from "@/types/Models/Stage.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../userSlice";
import { setChild } from "../childSlice";
import { setProgress, setActualProgress } from "../child_progress_slice";
import { Membership } from "@/types/Models/Membership.type";

interface id {
  id: number;
}

export const CantajuegaService = createApi({
  reducerPath: "Cantajuegapi", //nombre del estado/cache

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL, ///url a donde se hacen las peticiones
    prepareHeaders: (headers) => {
      return headers;
    },
    fetchFn: (input, init) => {
      return fetch(input, { ...init, credentials: "include" }); ///esto incluira las cookies del servidor en cada respuesta y peticion.
    },
  }),
  tagTypes: ["Progress", "User", "Child"],

  endpoints: (builder) => ({
    //aqui creamos funciones para comunicarse con los endpoints del back
    ///etapas/cursos
    getStage: builder.query<responses<stage>, {childs?:boolean|null}>({
      query: ({childs}) => childs? "stage?childs=yes":"stage", ///ruta /stage del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    getStageById: builder.query<stage, string>({
      query: (id) => `stage/${id}`, ///ruta /stage del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
      transformResponse:(response:responses<stage>, meta, arg)=> {
        return response.data![0]
      },
    }),
    //----------------------------------------------------------------------------------
    ///membresias
    getMembership: builder.query<responses<Membership>, null>({
      query: () => "membership", ///ruta /membership del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
    }),
    getMembershipById: builder.query<Membership, string>({
      query: (id) => `membership/${id}`, ///ruta /membership del back
      keepUnusedDataFor: 600, ///configuramos cada cuanto se elimina la cache
      transformResponse: (response: responses<Membership>, meta) => {///achicamos la respuesta de la api
        return response.data![0]
      },
    }),
    //----------------------------------------------------------------------------------
    //authenticacion
    auth: builder.query<responses<authUser>, null>({
      query: () => "/user/auth",
      keepUnusedDataFor: 600,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        //es lo que hara con la respuesta
        try {
          const data = (await queryFulfilled).data.data; //en data viene informacion del usuario y el token
          const { user } = data![0];
          const { id, firstName, lastName, email, Reports, MembershipId } =
            user;
          const UserChild = user.Children[0] ?? null;
          ///actualizamos nuestros estados globales
          dispatch(
            setUser({ id, firstName, lastName, email, Reports, MembershipId })
          );
          dispatch(setChild(UserChild));
        } catch (err) {
          dispatch(setUser(null));
          dispatch(setChild(null));
        }
      },
    }),
    //-----------------------------------------------
    //deslogueo
    logOut: builder.mutation({
      query: ({}) => ({
        url: "user/logout",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(none, { dispatch, queryFulfilled }) {
        dispatch(setUser(null));
        const response: responses<null> = (await queryFulfilled).data;
        alert(response.message);
      },
    }),
    //-----------------------------
    ///obtener todos los childs
    getChild: builder.query<responses<Child>, null>({
      query: () => "child",
      keepUnusedDataFor: 600,
    }),
    //----------------------------
    ////obtener child por id
    getChildById: builder.query<responses<Child>, null>({
      query: (id) => `child/${id}`,
      keepUnusedDataFor: 600,
      async onQueryStarted(nose, { dispatch, queryFulfilled }) {
        const { data } = (await queryFulfilled).data;
        const [child] = data!;
        dispatch(setChild(child));
      },
    }),
    ///---------------------
    //obtener progresos del chic@
    getProgressChild: builder.query<responses<progress>, progressResquest>({
      query: ({ ProgressId }) => `progress/${ProgressId}`,
      keepUnusedDataFor: 600,
      providesTags: ["Progress"],
      async onQueryStarted(any, { dispatch, queryFulfilled }) {
        const { data } = (await queryFulfilled).data;
        const [progress] = data!;
        dispatch(setProgress(progress));
      },
    }),
    ///////----------------------------
    //obtener info de los progresos de videos
    getProgressChildBySelect: builder.query<
      responses<First_Video | Other_Video | Final_Video | null>,
      progressResquest
    >({
      query: ({ ProgressId, select }) =>
        `progress/${ProgressId}?select=${select}`,
      keepUnusedDataFor: 600,
      providesTags: ["Progress"],
      async onQueryStarted(none, { dispatch, queryFulfilled }) {
        try {
          console.log("en try front");
          const { data } = (await queryFulfilled).data;
          const [progress] = data!;
          dispatch(setActualProgress(progress));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //--------------------------------------------------------
    //actualizar el progreso de los videos
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
    //------------------------------------------------
    //actualizar el progreso del pdf(para cuando se mire el pdf)
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
  useLogOutMutation,
  useGetChildByIdQuery,
  useGetMembershipByIdQuery,
  useGetStageByIdQuery
} = CantajuegaService;
