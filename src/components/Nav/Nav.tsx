"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Navbar.module.css";
import Topnav from "./Topnav";
import { TiArrowDown } from "react-icons/ti";
import logo from "../../../public/img/Logo.png";
import { HiOutlineMenu } from "react-icons/hi";
import { useAppSelector } from "@/store/hooks";

const Navbar = () => {
  const user=useAppSelector(state=>state.userReducer.user)
  const auth = user
  const items = [
    { name: "Nosotros", href: "/#Nosotros" },
    { name: "Metodología", href: "/#metodologia" },
    { name: "Contacto", href: "/#contacto" },
    { name: "cancionero", href: "/cancionero" },
    { name: "membresías", href: "/membresias" },
    { name: "cursos", href: "/cursos" },
  ];
  const itemsauth = auth
    ? [
        { name: "Nosotros", href: "/#Nosotros" },
        { name: "Metodología", href: "/#metodologia" },
        { name: "Contacto", href: "/#contacto", subhref: "/Cuestionario" },
        { name: "cancionero", href: "/cancionero" },
        { name: "membresías", href: "/membresias" },
        { name: "cursos", href: "/cursos" },
        { name: "Mis cursos", href: "/mis-cursos" },
      ]
    : items;
  const [menu, setMenu] = useState(false); // -> Menu hamburguesa

  useEffect(() => {
    const body = document.getElementById("Body") as HTMLBodyElement;
    menu ? (body.style.overflow = "hidden") : (body.style.overflow = "auto");

    const getIdElements = (e: any) => {
      const element = e.target.id;

      const menunav = ["openmenu", "MenuOptions", "menupath"];
      !menunav.includes(element) && menu && setMenu(!menu);
    };
    document.addEventListener("click", getIdElements);

    !menu && document.removeEventListener("click", getIdElements);

    return () => {
      body.style.overflow = "auto";
      document.removeEventListener("click", getIdElements);
    };
  }, [menu]);

  useEffect(() => {
    //para evitar pequenio bug al tener abierto el menu hamburguesa y pasar a pantalla grande(estado menu quedaba en true, y por lo tanto desaparecia barra scroll)
    let controlate = menu;
    const ejecutarEnPantallaCompleta = () => {
      if (window.innerWidth > 945 && controlate) {
        setMenu(false);
      }
    };
    window.addEventListener("resize", ejecutarEnPantallaCompleta);
    return () => {
      window.removeEventListener("resize", ejecutarEnPantallaCompleta);
    };
  }, [menu]);
  const openMenu = () => {
    setMenu(!menu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  let visiblemenu = menu ? "left-0 z-50" : "left-[-200%] ";

  return (
    <nav
      id="NavMenu"
      className={`${styles.Container}  w-full h-[8rem]
       lg:h-[9rem] flex flex-col  `}
    >
      <div
        className="w-full h-2/6 flex flex-col z-50
      min-[940px]:h-2/6 min-[940px]:flex min-[940px]:flex-col
      landscape:min-[500px]:z-0"
      >
        <Topnav />
      </div>

      <div id="menucontainer"
        className="flex w-full h-4/6 items-center relative
         min-[940px]:hidden  "
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          id="openmenu"
          className=" text-5xl cursor-pointer"
          onClick={openMenu}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/*tuve que usar este modo xq el path interferia en el onclick al momento de usar el menu*/}
          <path
            id="menupath"
            strokeLinecap="round"
             strokeLinejoin="round"
          
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>

        <Image
          priority
          src={logo}
          alt="logo-cj"
          className="absolute  right-0 h-5/6 w-auto z-[-1100]"
        />
      </div>

      <div
        id="menunav"
        className={`fixed  z-40 w-11/12  h-full bg-blue bg-opacity-70  ${visiblemenu} transition-all duration-500
       min-[930px]:transition-none min-[930px]:duration-0
       min-[940px]:relative min-[940px]:left-0 min-[940px]:flex min-[940px]:justify-end min-[940px]:w-full min-[940px]:h-4/6 min-[940px]:bg-white
       md:w-6/12
       sm:w-6/12
       text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl  2xl:text-3xl`}
      >
        <button
          onClick={openMenu}
          className="absolute right-5  text-white text-4xl top-[10%] min-[940px]:hidden"
        >
          &lt;
        </button>
        <Link href={"/"}>
          <Image
            priority
            src={logo}
            alt="cj-logo"
            className="absolute left-0  top-0 hidden 
          min-[940px]:absolute  min-[940px]:left-0  min-[940px]:top-0  min-[940px]:block
          md:w-[24%] md:top-[3%] md:h-auto md:max-h-[100%] 
          xl:w-auto xl:h-full xl:left-[5%] 2xl:left-[5%]  "
          />
        </Link>

        <section
          id="MenuOptions"
          className=" flex flex-col justify-end items-center  h-full  
          min-[940px]:w-full min-[940px]:flex min-[940px]:justify-end min-[940px]:flex-row"
        >
          <div
            className="  h-5/6  w-4/6 flex flex-col items-center justify-evenly 
             landscape:min-[500px]:h-full
             min-[940px]:w-[76%] min-[940px]:h-full min-[940px]:flex min-[940px]:flex-row 
             min-[940px]:items-center min-[940px]:justify-between
             xl:w-[70%] 2xl:w-[73%] min-[1930px]:w-[70%]"
          >
            {itemsauth.map((i, key) => (
              <article
                key={key}
                className={`  w-full flex justify-center h-[7%] min-h-[2.5rem] group
                min-[940px]:w-auto min-[940px]:flex min-[940px]:h-auto min-[940px]:items-center
             ${
               auth && `min-[940px]:last:bg-orangeicons`
             }  min-[940px]:last:p-2 min-[940px]:last:rounded-xl 
                max-[940px]  `}
              >
                <button
                  className="border  relative font-fredoka font-semibold border-orangeicons w-4/5 max-w-[12rem] max-h-[4rem] flex
                max-[940px]:bg-white 
                min-[940px]:border-0 min-[940px]:w-auto min-[940px]:bg-auto
                landscape:min-[500px]:h-5/6
                "
                >
                  <Link
                    href={i.href}
                    onClick={closeMenu}
                    className="  w-full h-full flex items-center justify-center"
                  >
                    {i.name}
                  </Link>
                  {i.subhref && (
                    <TiArrowDown className="absolute right-[40%] top-[100%] hidden min-[940px]:block " />
                  )}
                </button>
                {i.subhref && (
                  <button
                    className="absolute  bg-white h-fit border rounded-lg hidden 
                  min-[940px]:group-hover:block min-[940px]:h-full min-[940px]:top-[70%] "
                  >
                    <Link
                      href={i.subhref}
                      className="border border-orangeicons rounded-lg p-1"
                    >
                      Cuestionario
                    </Link>
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
