import { useState, MouseEvent, useEffect } from "react";
import {
  Alertsprops,
  MiscursosAlerts,
  MembresiasAlerts,
  PagosAlerts,
  CuestionarioAlerts,
} from "./types";
import Login from "../Login/Login";
import { AUTH_MODAL_TYPE } from "@/utils/constants";
import Register from "../Register/Register";
import Link from "next/link";
import { Alertaux } from "@/utils/auxfunctions";
///importar el componente Alerts donde vayamos a usarlo ej: import Alerts from "@/components/alerts/Alerts";
/*    s
declarar un estado para poder usar como modal al alert que querramos, si vamos a usar mas de un alerta agregaremos mas alert al estado en false inicialmente
const [seeAlert,setSeeAlerts]=useState<alertsState>({///Traer la interface alertsState para tipar 
  alert1:false,
  alert2:false,
  texte1:'',///esto podemos agregar si deseamos un alert personalizado
 })

 --  const closeAlert=()=>{//crear la funcion reset para cerrar los alerts
    setSeeAlerts({})
  }
  Cuando usamos el componente , le indicamos el tipo de alerta como propiedad(Miscursos,Membresias,Personalizado,Pagos,Cuestionario)
  Y le pasamos algun ENUM del archivo type, que indica el El alerta espesifico del tipo de alerta que que queremos usar ej:
  {seeAlert.alert1&&<Alerts close={closeAlert} Miscursos={MiscursosAlerts.Alert1} /> ejemplo de renderizado 

*/

interface OpenInterface {
  LOGIN: boolean;
  REGISTER: boolean;
}
interface props extends Alertsprops {
  Page?: string;
}
export default function Alerts({
  Miscursos,
  Membresias,
  Personalizado,
  Pagos,
  Cuestionario,
  close,
  onClick,
  Admin,
  Page,
}: props) {
  const [open, setOpen] = useState<OpenInterface>({
    LOGIN: false,
    REGISTER: false,
  });

  const handleOpen = (name: AUTH_MODAL_TYPE) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [name]: !prevOpen[name],
    }));
  };

  const submit = (event: MouseEvent<HTMLButtonElement>, callback: Function) => {
    onClick && onClick(event);
    setTimeout(() => {
      callback();
    }, 1000);
  };
  useEffect(() => {
    const list = ["mainhome", "CancioneroPage", "CursosPage", "MembresiasPage"];
    const exptionspages = [{ id: "MisCursosPage", pagename: "Miscursos" }];

    Alertaux({
      effect: true,
      elementsid: list,
      page: Page,
      exeptionspages: exptionspages,
    });
    return () => {
      Alertaux({
        effect: false,
        elementsid: list,
        page: Page,
        exeptionspages: exptionspages,
      });
    };
  }, []);
  return (
    <div
      id="alert"
      className="bg-[#D9D9D9A1] fixed w-full h-full justify-center items-center top-0 z-[500000] flex"
    >
      {Miscursos === MiscursosAlerts.Alert1 && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>¡Recuerda!</h1>
          <h1>AUN NO PUEDES AVANZAR</h1>
          <button
            className="bg-orangeicons text-[#ffffff]  w-3/12 max-w-[10rem] p-2  rounded-xl m-2 h-[2.8rem]"
            onClick={close}
          >
            CONTINUAR
          </button>
        </section>
      )}

      {Membresias === MembresiasAlerts.Alert1 && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>UPS ALGO HA SALIDO MAL :(</h1>
          <h1 className="w-7/12 text-center leading-6 font-medium ">
            AL PARECER NO TIENES UNA CUENTA. SI DESEAS SUSCRIBIRTE A UNA
            MEMBRESIA NECESITAS CREAR UN PERFIL.
          </h1>
          <div className="flex  w-full justify-center ">
            <button
              className="p-2 rounded-lg m-2 border border-orangeicons w-3/12 max-w-[10rem]"
              onClick={close}
            >
              CANCELAR
            </button>
            <button
              className="bg-orange  w-3/12 max-w-[10rem] p-2 rounded-lg m-2"
              onClick={() => handleOpen(AUTH_MODAL_TYPE.REGISTER)}
            >
              INSCRIBIRSE
            </button>
          </div>
          {open.LOGIN && <Login handleOpen={handleOpen} />}
          {open.REGISTER && <Register handleOpen={handleOpen} />}
        </section>
      )}

      {Pagos === PagosAlerts.SALDOINSUFICIENTE && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>SALDO INSUFICIENTE</h1>
          <h1 className="w-7/12 text-center leading-6 font-medium ">
            AL PARECER NO TIENES UNA CUENTA. INTENTA PROBANDO POR OTRO MEDIO DE
            PAGO
          </h1>
          <div className="flex  w-full justify-center ">
            <button
              className="p-2 rounded-lg m-2 border border-orangeicons w-3/12 max-w-[10rem]"
              onClick={close}
            >
              CANCELAR
            </button>
            <button
              className="bg-orange  w-3/12 max-w-[10rem] p-2 rounded-lg m-2"
              onClick={() => console.log("Reintentar pago")}
            >
              Reintentar
            </button>
          </div>
        </section>
      )}

      {Pagos === PagosAlerts.ERRORDEPAGO && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>UPS EN ESTOS MOMENTOS NO PODEMOS PROCESAR EL PAGO</h1>
          <h1 className="w-7/12 text-center leading-6 font-medium ">
            INTENTA DE NUEVO MAS TARDE. <br />
            LO SENTIMOS
          </h1>
          <div className="flex  w-full justify-center ">
            <button
              className="p-2 rounded-lg m-2 border border-orangeicons w-3/12 max-w-[10rem]"
              onClick={close}
            >
              CANCELAR
            </button>
            <button
              className="bg-orange  w-3/12 max-w-[10rem] p-2 rounded-lg m-2"
              onClick={() => console.log("Reintentar pago")}
            >
              Reintentar
            </button>
          </div>
        </section>
      )}

      {Pagos === PagosAlerts.ERROR3 && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>NO PUEDES ACCEDER A ESTE SERVICIO</h1>
          <h1 className="w-7/12 text-center leading-6 font-medium ">
            AL PARECER YA ESTAS SUSCRIPTO A UNA MEMBRESIA.
          </h1>
          <div className="flex  w-full justify-center ">
            <button
              className="p-2 rounded-lg m-2 border border-orangeicons w-3/12 max-w-[10rem]"
              onClick={close}
            >
              CANCELAR
            </button>
            <Link href={"/"}>
              <button className="bg-orange  w-3/12 max-w-[10rem] p-2 rounded-lg m-2">
                Home
              </button>
            </Link>
          </div>
        </section>
      )}
      {Cuestionario === CuestionarioAlerts.Confirm && (
        <section className="bg-white w-6/12 max-w-[40rem] h-3/6 max-h-[20rem] flex flex-col items-center justify-evenly">
          <h1>ATENCIÓN</h1>
          <h1 className="w-10/12 text-center leading-6 font-medium ">
            ¿DESEA USTED GUARDAR Y ENVIAR LOS DATOS?
          </h1>
          <div className="flex  w-full justify-evenly ">
            <button
              className="p-2  rounded-xl m-2 border border-orangeicons w-3/12 max-w-[10rem]"
              onClick={close}
            >
              No
            </button>
            <button
              className="bg-orangeicons text-[#ffffff]  w-3/12 max-w-[10rem] p-2  rounded-xl m-2"
              onClick={(event) => submit(event, close)}
            >
              SI
            </button>
          </div>
        </section>
      )}

      {Personalizado && (
        <section
          className="bg-white w-11/12 h-3/6  min-h-[15rem] flex flex-col items-center max-h-[20rem] justify-evenly md:w-[40rem] 
         text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl  2xl:text-2xl  "
        >
          <h1>{Personalizado.text1}</h1>
          <h1>{Personalizado.text2}</h1>
          <div className="flex justify-center gap-3 w-full xl:text-lg 2xl:text-xl">
            <button
              className="bg-orange   min-[400px]:w-4/12 max-w-[10rem] p-2  rounded-xl m-2"
              onClick={close}
            >
              {Personalizado.CancelText}
            </button>
            {onClick && (
              <button
                className="bg-orangeicons text-[#ffffff]   min-[400px]:w-4/12 max-w-[10rem] p-2  rounded-xl m-2"
                onClick={(event) => submit(event, close)}
              >
                {Personalizado.AcceptTText}
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
