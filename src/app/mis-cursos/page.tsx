"use client";
import styles from "../../styles/Miscursos.module.css";
import { useAuthQuery } from "@/store/apis/CantajuegaApi";

import MisCursosContent from "@/components/MisCursos/MisCursosContent";

export default function Miscursos() {
  const { data, isLoading, isError, isSuccess } = useAuthQuery(null);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1>Cargando....</h1>;
      </div>
    );
  }

  return (
    <div
      id="MisCursosPage"
      className={`${styles.Container} flex justify-between bg-white min-h-screen `}>
  
        <MisCursosContent />

    </div>
  );
}
