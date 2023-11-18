import Boxinfo from "../BoxInfo";
import BoxInfoLayout from "../BoxInfoLayout";
import { Final_Video } from "@/types";
export default function FinalVideoSection({ title, Final_Video,isLoading }: { title: string; Final_Video: Final_Video ,isLoading: boolean}) {
    return (
        <BoxInfoLayout title={title} className="w-8/12">
                 {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="estado"
          info={Final_Video?.Ready_to_Test? "completo" : "incompleto"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Veces que vio el video final."
          info={Final_Video?.Total.toString() ?? ""}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Cumplio las 4 vistas"
          info={Final_Video?.Total ? "Fecha" : "aun no"}
        />
      )}

      {isLoading ? (
        <Boxinfo title="Cargando..." />
      ) : (
        <Boxinfo
          title="Listo para avanzar."
          info={
            Final_Video?.Ready_to_Test && Final_Video?.one_Day_Passed
              ? "Si"
              : "No" ?? ""
          }
        />
      )}
        </BoxInfoLayout>
    );
}