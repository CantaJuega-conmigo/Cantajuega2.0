"use client";
import Alerts from "@/components/alerts/Alerts";
import { ChangeEvent, useState, MouseEvent, useEffect } from "react";
import styles from "../../styles/Miscursos.module.css";
import {
  Alertsprops,
  MiscursosAlerts,
  alertsState,
} from "@/components/alerts/types";
import { useAppSelector } from "@/store/hooks";
import { useAuthqQuery } from "@/store/apis/CantajuegaApi";

export default function Miscursos() {
  const { data, isLoading, isError } = useAuthqQuery(null);
  if (isError) {
    throw new Error("Auht falló");
  }
  const user = useAppSelector((state) => state.userReducer.user);
  const [actualProgress, setActualProgress] = useState<number>(0);
  const [actualVideo, setActualVideo] = useState<string>("");
  const [videoPlay, setvideoPlay] = useState<boolean>(false);

  const [seeAlert, setSeeAlerts] = useState<alertsState>({
    ///declarar el statte de alerts
    alert1: false,
    alert2: false,
  });
  const closeAlert = () => {
    //crear la funcion reset para cerrar los alerts
    setSeeAlerts({});
  };

  const [steps, setSteps] = useState<any>([
    {
      step: 0,
      name: "Introduccion",
      visto: false,
      video: "video 1 introduccion",
    },
    { step: 1, name: "1er cantajuego", visto: false, video: "video2" },
    { step: 2, name: "2do cantajuego", visto: false, video: "video3" },
    { step: 3, name: "Acercamiento", visto: false, video: "video4" },
    { step: 4, name: "Interaccion", visto: false, video: "video5" },
    { step: 5, name: "Artístico", visto: false, video: "video6" },
    { step: 6, name: "Formulario", visto: false, video: "video7" },
  ]);
  let vistos = steps
    .filter((i: any) => i.visto)
    .map((a: any) => a.step + 1)
    .concat([0]);

  const SelectStep = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    parseInt(event.currentTarget.value) < 1
      ? (setActualProgress(parseInt(event.currentTarget.value)),
        setvideoPlay(true))
      : steps[parseInt(event.currentTarget.value) - 1].visto
      ? (setActualProgress(parseInt(event.currentTarget.value)),
        setvideoPlay(true))
      : setSeeAlerts({
          text1: "Atencion.",
          text2: `Debe ver el video ${
            steps[vistos.length - 1].name
          } para avanzar`,
          CancelText: "Cerrar",
        }); //creamos alerts personalizados
  };

  const nextStep = () => {
    !steps[actualProgress].visto
      ? setSeeAlerts({ alert1: true }) //o usamos alerts espesificos
      : actualProgress < 6
      ? setActualProgress(actualProgress + 1)
      : alert("No hay mas");
  };
  // const updateAllows=()=>{
  //     let titles=document.getElementById()
  // }
  const play = () => {
    setActualVideo(`Reproduciendo ${steps[actualProgress].name}....`);
    setTimeout(() => {
      setActualVideo("Termino el video");
      let steeeps = steps;
      steeeps[actualProgress].visto = true;
      setSteps(steeeps);
      setvideoPlay(false);
    }, 10000);
  };
  const actualtitlecolor = { background: "#FFC172", borderRadius: "10px" };
  const auth = true;
  if (!auth) {
    return (
      <div className=" min-h-screen flex items-center justify-center">
        <h1>Solo para usuarios registrados.</h1>
      </div>
    );
  }

  return (
    <div id="MisCursosPage" className={`${styles.Container} flex bg-white `}>
      <button onClick={() => console.log(user)}>Ver estato</button>

      {seeAlert.alert1 && (
        <Alerts
          close={closeAlert}
          Miscursos={MiscursosAlerts.Alert1}
          Page={"Miscursos"}
        />
      )}

      {seeAlert.text1 && (
        <Alerts
          close={closeAlert}
          Personalizado={seeAlert}
          Page={"Miscursos"}
        />
      )}

      <section
        className={` w-full ${
          videoPlay ? "hidden" : "flex"
        } flex-col items-center  pt-[10%] sm:pt-0 sm:block sm:w-48 sm:border-r-2 border-orangeicons border-dashed`}>
        <h1 className=" text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
          Mi progreso
        </h1>
        <h2>etapa 1</h2>
        <ul>
          {steps.map((i: any, key: any) => (
            <li
              key={key}
              style={
                !vistos?.includes(key)
                  ? { color: "grey", cursor: "not-allowed" }
                  : { color: "black" }
              }>
              <button
                key={key}
                value={i.step}
                name={i.video}
                className={`${
                  !vistos?.includes(key)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } p-2`}
                onClick={(e) => SelectStep(e)}
                style={key === actualProgress ? actualtitlecolor : {}}>
                1.{i.step + 1}-{i.name}
              </button>
            </li>
          ))}
        </ul>
        <h2>etapa 2</h2>
        <ul>
          {steps.map((i: any, key: any) => (
            <li
              key={key}
              style={
                !vistos?.includes(key)
                  ? { color: "grey", cursor: "not-allowed" }
                  : { color: "black" }
              }>
              <button
                key={key}
                value={i.step}
                name={i.video}
                className={`${
                  !vistos?.includes(key)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } p-2`}
                onClick={(e) => SelectStep(e)}>
                1.{i.step + 1}-{i.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={` ${
          videoPlay ? "flex relative" : "hidden"
        } sm:flex flex-col w-full justify-center items-center`}>
        <div
          className={`flex flex-col justify-center items-center w-10/12 h-[24rem] max-w-[50rem] md:w-9/12  md:landscape:w-11/12 sm:w-9/12 sm:h-[20rem]  md:landscape:h-[23rem]`}>
          <h1 className="">{actualVideo}</h1>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
            {steps[actualProgress].video}
          </h1>
          <video src="" className=" bg-[#D9D9D9] w-full h-5/6 "></video>
          <button onClick={play}>play</button>
        </div>
        <div className={` w-full flex justify-center`}>
          <button className=" border rounded border-orangeicons h-6/6 p-2 w-[8rem] ml-10 mr-10 bg-[#FFFFFF]">
            Anterior
          </button>
          <button
            className=" rounded bg-orangeicons h-6/6 p-2 w-[8rem] ml-10 mr-10"
            onClick={nextStep}>
            Siguiente
          </button>
        </div>

        <button
          className=" block absolute bottom-[10%] sm:hidden border rounded bg-blue text-white  h-6/6 p-2 w-[8rem]"
          onClick={() => setvideoPlay(false)}>
          Volver
        </button>
      </section>
    </div>
  );
}
