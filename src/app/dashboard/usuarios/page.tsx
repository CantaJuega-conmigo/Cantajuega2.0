"use client";
import { useGetAllUsersQuery } from "@/store/apis/CantajuegaApi";
import Link from "next/link";
export default function Page() {
  const { data: users } = useGetAllUsersQuery(null);
  return (
    <>
      <table className="text-center w-11/12 border border-blue">
        <thead className="bg-blue text-white">
          <tr>
            <th className="border border-blue p-2">Nombres</th>
            <th className="border border-blue p-2">Apellidos</th>
            <th className="border border-blue p-2">Email</th>
            <th className="border border-blue p-2">Membresia</th>
            <th className="border border-blue p-2">Verificado</th>
            <th className="border border-blue p-2"></th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((user) => (
            <tr key={user.id}>
              <td className="border border-blue p-2">{user.firstName}</td>
              <td className="border border-blue p-2">{user.lastName}</td>
              <td className="border border-blue p-2">{user.email}</td>
              <td className="border border-blue p-2">{user.Membership?.name}</td>
              <td className="border border-blue p-2">
                {user.email_verified as string}
              </td>
              <td className="border border-blue p-2">
                <Link href={`/dashboard/usuarios/${user.id}`}>
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
