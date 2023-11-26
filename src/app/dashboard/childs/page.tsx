"use client";
import { useGetChildQuery } from "@/store/apis/CantajuegaApi";
import Link from "next/link";

export default function Page() {
  const { data: childs } = useGetChildQuery(null);

  return (
    <>
      <table className="text-center w-11/12 border border-blue ">
        <thead className="bg-blue text-white">
          <tr>
            <th className="border border-blue p-2">Nombre</th>
            <th className="border border-blue p-2">Genero</th>
            <th className="border border-blue p-2">Apellido</th>
            <th className="border border-blue p-2">Edad</th>
            <th className="border border-blue p-2">Etapa</th>
            <th className="border border-blue p-2"></th>
          </tr>
        </thead>
        <tbody>
          {childs?.map((child) => (
            <tr key={child.id}>
              <td className="border border-blue p-2">{child.firstName}</td>
              <td className="border border-blue p-2">{child.gender}</td>
              <td className="border border-blue p-2">{child.lastName}</td>
              <td className="border border-blue p-2">{child.age}</td>
              <td className="border border-blue p-2">{child.Stage?.name??"Sin Etapa"}</td>
              <td className="border border-blue p-2">
                <Link href={`/dashboard/childs/${child.id}`}>
                  <button className="bg-blue text-white p-1 text-sm rounded-xl">
                    Mas informacion
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
