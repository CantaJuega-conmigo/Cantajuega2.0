import { HiOutlineLogout, HiUserAdd } from "react-icons/hi";
import { BsTelephone, BsYoutube } from "react-icons/bs";
import { TiSocialFacebook } from "react-icons/ti";
import { IoMdMail } from "react-icons/io";
import Login from "../Login/Login";
import Resgister from "../Register/Register";
import { AUTH_MODAL_TYPE } from "../../utils/constants";
import { MouseEvent, useState } from "react";
// import { useAppSelector } from "@/context/store";
// import { logoutUser } from "@/functions/user.query";
import Alerts from "../alerts/Alerts";
import { alertsState } from "../alerts/types";
import Link from "next/link";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useSession, signOut } from "next-auth/react";

interface OpenInterface {
  LOGIN: boolean;
  REGISTER: boolean;
}
export default function Topnav() {
  const { data: auth, status } = useSession();

  const [seeAlert, setSeeAlerts] = useState<alertsState>({
    ///Traer la interface alertsState para tipar
    alert1: false,
  });
  const user = "joakig6@gmail.com";
  const isAdmin = user === "joakig6@gmail.com";
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
  const logoutUser = () => {
    signOut()
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
  const preconfirmLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSeeAlerts({
      text1: "Esta a punto de cerrar su sesión.",
      text2: "desea continuar?",
      alert1: true,
      CancelText: "Permanecer",
      AcceptTText: "Cerrar sesión",
    });
  };
  const closeAlert = () => {
    setSeeAlerts({
      alert1: false,
    });
  };
  return (
    <div
      id="TopNav"
      className=" bg-white w-full flex items-end sm:items-center font-sans font-normal
         border-b-2 border-dashed border-orangeicons h-full ">
      <section className="flex w-full justify-between ">
        <div className="flex justify-center gap-5  min-[490px]:gap-8 w-3/12   min-[490px]:w-5/12 md:w-7/12 sm:justify-evenly">
          <a
            href="https://wa.me/+50254301174?"
            target="_blank"
            className="flex items-center gap-2">
            <BsTelephone className="fill-current text-lg text-orangeicons" />
            <span className=" hidden min-[490px]:flex">+502 5430-1174 </span>
          </a>

          <a
            href="mailto:info@cantajuegaconmigo.com"
            target="_blank"
            className={`flex  items-center  gap-2`}>
            <IoMdMail className="fill-current  text-2xl   text-orangeicons" />
            <span className=" hidden md:flex">info@cantajuegaconmigo</span>
          </a>
        </div>

        <div className=" flex justify-around items-center w-8/12 md:w-5/12  min-[490px]:w-7/12    ">
          <div className="flex justify-between items-center w-5/12 min-[390px]:w-3/12  min-[490px]:w-3/12 md:w-4/12 ">
            <a
              href="https://www.youtube.com/@cantajuegaconmigo1543"
              target="_blank">
              <BsYoutube className="text-[#FF0302] text-2xl  md:text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/cantajuegaconmigo"
              target="_blank">
              <TiSocialFacebook className="text-[#1877F2] text-4xl  md:text-3xl" />
            </a>
          </div>

          {!auth && (
            <span
              className="hover:text-[#FFC172] cursor-pointer flex items-center text-xs md:text-base sm:text-sm "
              onClick={() => handleOpen(AUTH_MODAL_TYPE.LOGIN)}>
              <HiUserAdd className=" text-orangeicons transform scale-x-[-1] text-2xl" />
              Iniciar Sesión
            </span>
          )}
          {auth && (
            <span
              onClick={preconfirmLogout}
              className=" cursor-pointer flex items-center gap-2 text-sm sm:text-base">
              <span className="hidden min-[390px]:flex">Cerrar sesion</span>
              <HiOutlineLogout className=" text-orangeicons text-xl" />
            </span>
          )}
          {isAdmin && (
            <Link href={"/Admin"} className="flex items-center gap-2">
              <span>Admin</span>
              <AiOutlineUserSwitch className=" text-orangeicons text-xl" />
            </Link>
          )}
        </div>
      </section>
      {open.LOGIN && <Login handleOpen={handleOpen} />}
      {open.REGISTER && <Resgister handleOpen={handleOpen} />}
      {seeAlert.alert1 && (
        <Alerts
          Personalizado={seeAlert}
          onClick={() => logoutUser()}
          close={closeAlert}
        />
      )}
    </div>
  );
}
