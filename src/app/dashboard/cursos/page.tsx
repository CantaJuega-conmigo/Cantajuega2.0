"use client";
import DashboardGrid from "@/components/DashBoard/DashBoardGrid";
import { useGetStageQuery } from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";

export default function Page() {
  const { data: stages } = useGetStageQuery(null);

  return (
    <>
      <h1>Cursoos</h1>
      <DashboardGrid
        numberOfColumns={5}
        numberOfLinks={8}
        column1={{
          data: stages?.data!,
          title: "nombres",
          dataProperty: "name" as keyof object,
        }}
        column2={{
          data: stages?.data!,
          title: "descripcion",
          dataProperty: "description" as keyof object,
        }}
        column3={{
          data: stages?.data!,
          title: "Edad min",
          dataProperty: "minAge" as keyof object,
        }}
        column4={{
          data: stages?.data!,
          title: "Edad max",
          dataProperty: "maxAge" as keyof object,
        }}
      />
    </>
  );
}
