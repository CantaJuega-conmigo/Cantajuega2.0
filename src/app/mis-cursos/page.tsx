"use client";
import styles from "../../styles/Miscursos.module.css";
import { useAuthQuery,useGetChildQuery, useGetStageQuery ,useGetProgressChildQuery} from "@/store/apis/CantajuegaApi";

import MisCursosContent from "@/components/MisCursos/MisCursosContent";
import { useAppSelector } from "@/store/hooks";

export default function Miscursos() {
  const { data, isLoading, isError, isSuccess } = useAuthQuery(null,{
    refetchOnMountOrArgChange:true,
  });
  const Child = useAppSelector((state) => state.childReducer.child);
  const ChildExist = Child?.StageId ? true : false;
  
  const { stage } = useGetStageQuery(null, {
    selectFromResult: ({ data }) => ({
      stage: data?.data?.filter((item) => item.id === Child?.StageId)[0], //una vez recibida la data, la transformamos, y nos quedamos con la etapa del niño
    }),
    skip: !ChildExist,
  });
  const {data:getProgress}=useGetProgressChildQuery({ProgressId:Child?.ProgressId as string},{
    skip:!ChildExist,
    refetchOnFocus:true
  })
  
  if(isError){
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Inicia sesion o registrate.</h1>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Cargando....</h1>;
      </div>
    );
  }
  console.log(ChildExist,Child,'en componente')

  return (
    <div
      id="MisCursosPage"
      className={`${styles.Container} flex justify-between bg-white min-h-screen `}>
  
        <MisCursosContent Stage={stage} ChildExists={ChildExist} ProgressId={Child?.ProgressId}/>

    </div>
  );
}
