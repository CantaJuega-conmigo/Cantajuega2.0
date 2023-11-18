import { Other_Video } from "@/types";
import BoxInfoLayout from "../BoxInfoLayout";
import Boxinfo from "../BoxInfo";
export default function BoxVideoSection({
  videos,
  title,
  isLoading,
}: {
  videos: Other_Video;
  title?: string;
  isLoading: boolean;
}) {
  return (
    <BoxInfoLayout title={title ?? ""} className="w-8/12">
      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="estado"
          info={videos?.Ready_to_Next_Video ? "completos" : "incompleto"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Veces que vio el video"
          info={videos?.Total.toString() ?? ""}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Cumplio las 4 vistas"
          info={videos?.day_Started ? "Fecha" : "aun no"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Listo para avanzar."
          info={videos?.Ready_to_Next_Video ? "Si" : "No" ?? ""}
        />
      )}
    </BoxInfoLayout>
  );
}
