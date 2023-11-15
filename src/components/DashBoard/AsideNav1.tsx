"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdCardMembership } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdCastForEducation } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { FaChildren } from "react-icons/fa6";
import { FcStatistics } from "react-icons/fc";
import { ImExit } from "react-icons/im";
import { FcHome } from "react-icons/fc";

export default function AsideNav1() {
  const pathname = usePathname().slice(10);
  const inInitialPage = usePathname().slice(1) === "dashboard";
  const actualpage = (path: string, style: string) =>
    pathname.includes(path) ? style : "";
  const initialPage = (style: string) => (inInitialPage ? style : "");

  return (
    <>
    
      <Link
        className={`${initialPage("bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard"}>
        <FcHome className=' text-2xl'/>
        <button className=" text-start  w-8/12">INICIO</button>
      </Link>
      <Link
        className={`${actualpage("usuarios", "bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard/usuarios"}>
        <FaUsers className=' text-2xl'/>
        <button className=" text-start  w-8/12">USUARIOS</button>
      </Link>
      <Link
        className={`${actualpage("membresias", "bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard/membresias"}>
        <MdCardMembership className=' text-2xl'/>
        <button className=" text-start  w-8/12">MEMBRESIAS</button>
        
      </Link>
      <Link
        className={`${actualpage("cursos", "bg-slate-400")} flex w-full justify-center gap-4 `}
        href={"/dashboard/cursos"}>
          <MdCastForEducation className=' text-2xl'/>
        <button className=" text-start  w-8/12">CURSOS</button>
      </Link>
      <Link
        className={`${actualpage("reportes", "bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard/reportes"}>
          <GoReport className=' text-2xl'/>
        <button className=" text-start  w-8/12">REPORTES</button>
      </Link>
      <Link
        className={`${actualpage("estadisticas", "bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard/estadisticas"}>
          <FcStatistics className=' text-2xl'/>
        <button className=" text-start  w-8/12">ESTADISTICAS</button>
      </Link>
      <Link
        className={`${actualpage("childs", "bg-slate-400")} flex w-full justify-center gap-4`}
        href={"/dashboard/childs"}>
          <FaChildren className=' text-2xl'/>
        <button className=" text-start  w-8/12">ALUMNOS</button>
      </Link>
      <Link className={` flex w-full justify-center gap-4`} href={"/"}>
        <ImExit className=' text-2xl'/>
        <button className="text-start  w-8/12">SALIR DEL PANEL</button>
      </Link>
    </>
  );
}
