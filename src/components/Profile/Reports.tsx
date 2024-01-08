import { Report } from "@/types";
import { transformDate } from "@/utils/general";

export default function Reports({
  key,
  report,
}: {
  key: string;
  report: Report;
}) {
  return (
    <div
      key={key}
      className=" bg-slate-200 p-2 flex flex-col gap-2 border-orange border text-sm">
      <p>
        <b>Fecha de envio</b>:
        {transformDate(report.createdAt) ?? report.createdAt}
      </p>
      <p>
        <b>Problema</b>:{report.Description}
      </p>
      <p>
        <b>Estado</b>:{report.is_Resolved ? "Resuelto" : "Pendiente"}
      </p>
      <p>
        <b>Respuesta</b>:{report.Response ?? "Sin respuestas aun."}
      </p>
    </div>
  );
}
