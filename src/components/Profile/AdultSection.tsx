import { User } from "@/types";
import { Membership } from "@/types/Models/Membership.type";
import { transformDate } from "@/utils/general";
import { FcCellPhone } from "react-icons/fc";
import { MdClose, MdVerified } from "react-icons/md";
import { RotatingLines } from "react-loader-spinner";
import ReportForm from "./ReportForm";
import Reports from "./Reports";

export default function AdultSection({
  user: user,
  membership: membership,
  isLoading,
  isFetching,
}: {
  user: User;
  membership: Membership;
  isLoading: boolean;
  isFetching: boolean;
}) {
  return (
    <section className="flex  flex-col gap-4 pt-4 w-6/12 items-center bg-stone-300 h-screen overflow-y-auto pb-4">
      <article className=" w-full flex justify-center">
        <h1 className=" text-3xl">
          Hola {user?.firstName} {user?.lastName}
        </h1>
      </article>

      <article className="  w-11/12 flex flex-col gap-2">
        <h2 className=" text-xl">Mis datos</h2>
        <p>
          <b>Mi email</b>: {user?.email}
        </p>
        <article className="flex gap-1 items-center">
          <b>Email verificado:</b>
          {user?.email_verified ? (
            <div className="flex gap-3 items-center">
              <p>Si</p>
              <MdVerified className="text-[green]" />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <p>No</p>
              <MdClose className="text-[#FF0000]" />
              <button className=" bg-blue text-white p-1 rounded-lg px-4 hover:bg-orange hover:text-black  text-xs">
                Verificar ahora
              </button>
            </div>
          )}
        </article>

        <article className="flex gap-1 items-center">
          <b>Telefono:</b>
          {user?.phone ? (
            <div>
              <p>{user?.phone}</p> <FcCellPhone />
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <p>No</p>
              <FcCellPhone />
              <button className=" bg-blue text-white p-1 rounded-lg px-4 hover:bg-orange hover:text-black  text-xs">
                Agregar ahora
              </button>
            </div>
          )}
        </article>
      </article>

      <article className=" w-11/12 flex flex-col gap-2">
        <h1 className=" text-xl ">Membresia actual</h1>
        {user?.Membership ? (
          <article className="flex flex-col">
            <div>
              <p>
                <b>Nombre</b>: {membership?.name}
              </p>
            </div>
            <div>
              <p>
                <b>Fecha de expiración</b>: 00/00/0000
              </p>
            </div>
          </article>
        ) : (
          <article className="flex gap-3 ">
            <p>Sin membresia activa</p>
            <button className=" bg-blue text-white p-1 rounded-lg px-4 hover:bg-orange hover:text-black  text-xs">
              Ver membresias disponibles
            </button>
          </article>
        )}
      </article>

      <article className=" w-11/12 flex flex-col gap-2">
        <h3 className="text-xl">Mis reportes:</h3>
        {user?.Reports?.length === 0 && <p>No hay reportes</p>}
        <RotatingLines
          strokeColor="#000"
          strokeWidth="5"
          animationDuration="0.5"
          width="50"
          visible={isLoading || isFetching}
        />
        {user?.Reports?.map((report, key) => (
          <Reports key={key + ""} report={report} />
        ))}

        <h3 className=" text-xl">Crear nuevo reporte</h3>
        <ReportForm UserId={user?.id!} />
      </article>
    </section>
  );
}
