import { Child } from "@/types";
import LayoutModal from "../LayoutModal";
import Link from "next/link";

export default function TableChilds({ childrens,closeModal }: { childrens: Child[] ,closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void}) {
  return (
    <LayoutModal>
      <table className="bg-blue w-6/12 border border-black overflow-hidden p-2 text-center rounded-2xl shadow-lg  shadow-black text-white ">
        <thead className="border border-black p-2">
          <tr>
            <th className="border border-black p-2">Nombre</th>
            <th className="border border-black p-2">Apellido</th>
            <th className="border border-black p-2">Edad</th>
            <th className="border border-black p-2 relative">
                <button className="absolute top-0 right-0 p-2" onClick={closeModal}>X</button>
            </th>
          </tr>
        </thead>

        <tbody>
          {childrens.map((child) => (
            <tr key={child.id}>
              <td className="border border-black p-2">{child.firstName}</td>
              <td className="border border-black p-2">{child.lastName}</td>
              <td className="border border-black p-2">{child.age}</td>
              <td className="border border-black p-2">
                <Link href={`/dashboard/childs/${child.id}`}>
                  <button className="bg-orange p-1 text-sm rounded-xl text-black">
                    mas informacion
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutModal>
  );
}
