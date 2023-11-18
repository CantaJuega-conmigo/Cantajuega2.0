import { progress, First_Video } from "@/types";
import BoxInfoLayout from "../BoxInfoLayout";
import Boxinfo from "../BoxInfo";
export default function FirstVideoSection({
  First_Video,
  isLoading,
}: {
  First_Video: First_Video;
  isLoading: boolean;
}) {
  return (
    <BoxInfoLayout title="Primer video" className="w-8/12">
      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="estado"
          info={First_Video?.Ready_to_Next_Video ? "completos" : "incompleto"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Veces que vio el video"
          info={First_Video?.Total.toString() ?? ""}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Cumplio las 4 vistas"
          info={First_Video?.day_Started ? "Fecha" : "aun no"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Listo para avanzar."
          info={
            First_Video?.Ready_to_Next_Video && First_Video?.PdfCompleted
              ? "Si"
              : "No" ?? ""
          }
        />
      )}
    </BoxInfoLayout>
  );
}
