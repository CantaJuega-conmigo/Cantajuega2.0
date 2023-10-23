"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function AsideNav1() {
  const pathname = usePathname().slice(10);
  const inInitialPage = usePathname().slice(1) === "dashboard";
  const actualpage = (path: string, style: string) =>
    pathname.includes(path) ? style : "";
  const initialPage = (style: string) => (inInitialPage ? style : "");

  return (
    <>
    
      <Link
        className={`${initialPage("bg-slate-400")} w-full`}
        href={"/dashboard"}>
        <button>Inicio</button>
      </Link>
      <Link
        className={`${actualpage("usuarios", "bg-slate-400")} w-full`}
        href={"/dashboard/usuarios"}>
        <button>Usuarios</button>
      </Link>
      <Link
        className={`${actualpage("membresias", "bg-slate-400")} w-full`}
        href={"/dashboard/membresias"}>
        <button>Membresias</button>
      </Link>
      <Link
        className={`${actualpage("cursos", "bg-slate-400")} w-full`}
        href={"/dashboard/cursos"}>
        <button>Cursos</button>
      </Link>
      <Link
        className={`${actualpage("reportes", "bg-slate-400")} w-full`}
        href={"/dashboard/reportes"}>
        <button>Reportes</button>
      </Link>
      <Link
        className={`${actualpage("estadisticas", "bg-slate-400")} w-full`}
        href={"/dashboard/estadisticas"}>
        <button>estadisticas</button>
      </Link>
      <Link className={`w-full`} href={"/"}>
        <button>Salir del panel</button>
      </Link>
    </>
  );
}
