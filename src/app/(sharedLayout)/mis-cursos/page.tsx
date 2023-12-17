"use client";
import styles from "../../../styles/Miscursos.module.css";
import {
  useAuthQuery,
  useGetChildQuery,
  useGetStageQuery,
  useGetProgressChildQuery,
} from "@/store/apis/CantajuegaApi";

import MisCursosContent from "@/components/MisCursos/MisCursosContent";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export default function Miscursos() {
  const { data, isLoading, isError, isSuccess } = useAuthQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const Child = useAppSelector((state) => state.childReducer.child);
  const User = useAppSelector((state) => state.userReducer.user);

  const ChildExist = Child?.StageId ? true : false;

  const { stage } = useGetStageQuery(
    { childs: null },
    {
      selectFromResult: ({ data }) => ({
        stage: data?.data?.filter((item) => item.id === Child?.StageId)[0], //una vez recibida la data, la transformamos, y nos quedamos con la etapa del niño
      }),
      skip: !ChildExist,
    }
  );
  const { data: getProgress } = useGetProgressChildQuery(
    { ProgressId: Child?.ProgressId as string },
    {
      skip: !ChildExist,
      refetchOnFocus: true,
    }
  );
  console.log(User);
  return (
    <div
      id="MisCursosPage"
      className={`${styles.Container} flex justify-between bg-white min-h-screen `}>
      {User?.Membership && (
        <MisCursosContent
          Stage={stage}
          ChildExists={ChildExist}
          ProgressId={Child?.ProgressId}
        />
      )}
      {!User?.Membership && (
        <div className="flex flex-col  items-center w-full gap-24">
          <h1 className="text-4xl">
            Actualmente no tienes ninguna membresia adquirida
          </h1>
          <Link href={"/membresias"}>
            <button className="bg-blue text-white text-xl rounded-xl p-3 px-6 hover:bg-orange hover:text-black">
              Ver membresias
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
