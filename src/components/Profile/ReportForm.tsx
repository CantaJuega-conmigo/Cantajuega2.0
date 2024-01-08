import { useCreateReportMutation } from "@/store/apis/CantajuegaApi";
import { useState } from "react";

export default function ReportForm({ UserId }: { UserId: string }) {
  const [report, setReport] = useState<string>("");
  const [createReport] = useCreateReportMutation();
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReport(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReport({ UserId: UserId, Description: report }).unwrap();
  };
  return (
    <form
      action=""
      className=" flex flex-col gap-2 w-full "
      onSubmit={handleSubmit}>
      <textarea
        name="newReport"
        id="newReport"
        onChange={handleChange}
        value={report}
        className="w-full h-24 border-2 border-orange rounded-lg p-2"
      />
      <button className="p-2 bg-orange">Enviar reporte</button>
    </form>
  );
}
