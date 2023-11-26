"use client"
import { useGetMembershipQuery } from "@/store/apis/CantajuegaApi";
import Link from "next/link";

export default function Page (){
    const {data:memberships}=useGetMembershipQuery(null);

    return (
        <>
          <h1>Membresias</h1>
          
      
    <table className="text-center w-11/12 border border-blue">
      <thead className="bg-blue text-white">
        <tr>
          <th className="border border-blue p-2">Nombre</th>
          <th className="border border-blue p-2">Descripcion</th>
          <th className="border border-blue p-2">recurrente id</th>
          <th className="border border-blue p-2">Total usuarios</th>
          <th className="border border-blue p-2">Etapa</th>
          <th className="border border-blue p-2"></th>
        </tr>
      </thead>
      <tbody>
        { memberships?.data?.map((membership) =>  (
          <tr key={membership.id}>
            <td className="border border-blue p-2">{membership.name}</td>
            <td className="border border-blue p-2">{membership.description}</td>
            <td className="border border-blue p-2">{membership.recurrenteId}</td>
            <td className="border border-blue p-2">{membership.Users.length.toString()}</td>
            <td className="border border-blue p-2">{membership.Users.length}</td>
            <td className="border border-blue p-2">
              <Link href={`/dashboard/membresias/${membership.id}`}>
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
    )
}