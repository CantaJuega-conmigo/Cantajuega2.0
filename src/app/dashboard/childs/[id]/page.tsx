"use client";
import Boxinfo from "@/components/DashBoard/BoxInfo";
import BoxInfoLayout from "@/components/DashBoard/BoxInfoLayout";
import BoxVideoSection from "@/components/DashBoard/Progress/BoxVideoSection";
import FinalVideoSection from "@/components/DashBoard/Progress/FinalVideoSection";
import FirstVideoSection from "@/components/DashBoard/Progress/FirstVideoSection";
import {
  useGetChildByIdQuery,
  useGetProgressChildQuery,
} from "@/store/apis/CantajuegaApi";

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetChildByIdQuery(params.id);
  const child = data?.data![0];

  const { data: progress, isFetching } = useGetProgressChildQuery(
    { ProgressId: child?.ProgressId! },
    {
      skip: !child,
      selectFromResult: ({ data, isLoading, isError, isFetching }) => ({
        data: data?.data![0],
        isFetching: isFetching || isLoading,
      }),
      refetchOnReconnect: true,
    }
  );
  return (
    <>
      <BoxInfoLayout title="Alumno/a" className="w-8/12">
        <Boxinfo title="Nombre" info={child?.firstName} />
        <Boxinfo title="Apellido" info={child?.lastName} />
        <Boxinfo title="Edad" info={child?.age.toString() ?? ""} />
        <Boxinfo
          title="Genero"
          info={child?.gender === "male" ? "masculino" : "femenino"}
        />
      </BoxInfoLayout>
      <BoxInfoLayout title="Etapa" className="w-8/12">
        <Boxinfo title="Nombre" info={child?.Stage?.name ?? "Ninguna"} />
      </BoxInfoLayout>

      <FirstVideoSection
        First_Video={progress?.First_Video!}
        isLoading={isFetching || isLoading}
      />
      <BoxVideoSection
        title="Segundo video"
        videos={progress?.Second_Video!}
        isLoading={isFetching || isLoading}
      />
      <BoxVideoSection
        title="Tercer video"
        videos={progress?.Third_Video!}
        isLoading={isFetching || isLoading}
      />
      <BoxVideoSection
        title="Cuarto video"
        videos={progress?.Fourth_Video!}
        isLoading={isFetching || isLoading}
      />
      <FinalVideoSection
        isLoading={isFetching || isLoading}
        Final_Video={progress?.Final_Video!}
        title="Ultimo video"
      />
    </>
  );
}
