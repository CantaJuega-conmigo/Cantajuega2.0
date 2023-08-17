"use client";
import React, { useState } from "react";
import { HiArrowRight } from "react-icons/hi";

import artwork from "../../../public/img/Untitled_Artwork-4-6.png";
import artwork2 from "../../../public/img/Untitled_Artwork-3-1.png";
import Image from "next/image";
import styles from "../../styles/Hero.module.css";

const Hero = () => {
  const [texto, setTexto] = useState({
    N: 1,
    title: "Aprende jugando",
    text: " Entendemos el juego como una actividad esencial para estimular la creatividad, la imaginación y el pensamiento crítico.",
  });

  const [reloadAnimation, setReloadAnimation] = useState<boolean>(true);

  const cambiarTexto = () => {
    const firstText = {
      N: 1,
      title: "Aprende jugando",
      text: " Entendemos el juego como una actividad esencial para estimular la creatividad, la imaginación y el pensamiento crítico.",
    };
    const secondText = {
      N: 2,
      title: "Aprende cantando",
      text: "La música es la herramienta principal que empleamos para impulsar el aprendizaje.",
    };
    const changeText = texto.N === 1 ? secondText : firstText;
    setReloadAnimation(false);
    setTimeout(() => {
      ///para que la animacion vuelva a funcionar al cambiar de texto/seccion
      setTexto(changeText);
      setReloadAnimation(true);
    }, 1);
  };

  return (
    <div
      className={` ${styles.Container} h-[27rem]  min-[380px]:h-[24rem] min-[940px]:h-[20rem] xl:h-[25rem] flex flex-col items-center relative  `}>
      {reloadAnimation && (
        <article
          className={`z-20 w-full flex items-center justify-center
                            min-[940px]:h-[8rem] max-[940px]:h-[3rem] `}>
          <h1 className=" text-2xl sm:text-3xl md:text-4xl 2xl:text-7xl xl:text-6xl lg:text-5xl ">
            {texto.title}
          </h1>
        </article>
      )}
      {reloadAnimation && (
        <article className=" z-20 w-full h-[3rem] flex justify-center ">
          <span className=" w-5/6 min-[940px]:w-[35rem] text-base text-center 2xl:text-2xl xl:text-xl lg:text-lg">
            {texto.text}
          </span>
        </article>
      )}

      <article
        className="z-20 absolute bottom-[5%] xl:bottom-[30%] min-[940px]:bottom-[10%] 
         min-[380px]:bottom-[7%]
          2xl:bottom-[20%]">
        <button
          className="relative bg-white w-44   rounded-full text-black p-2
             min-[940px]:h-16 min-[940px]:w-[13rem] 
              2xl:h-[4.5rem]">
          <HiArrowRight className="absolute top-[35%] text-orangeicons" />
          <span className="text-base text-center 2xl:text-2xl xl:text-xl lg:text-lg">
            Inscribete ahora
          </span>
        </button>
      </article>
      {texto.N === 2 && (
        <button
          onClick={cambiarTexto}
          className="z-20 bg-black text-white absolute left-[1%] top-[45%] rounded-full w-[2.5rem] h-[2.5rem] text-xl flex items-center justify-center">
          &lt;
        </button>
      )}

      {texto.N === 1 && (
        <button
          onClick={cambiarTexto}
          className="z-20 bg-black text-white absolute  right-[1%] top-[45%] rounded-full w-[2.5rem] h-[2.5rem] text-xl flex items-center justify-center">
          &gt;
        </button>
      )}

      {texto.N === 1 && (
        <Image
          alt="Cjimage"
          src={artwork}
          className={`${styles.Image} absolute w-auto  z-10 h-[45%] mt-16  right-[2%]  top-0

     min-[390px]:mt-5  min-[390px]:h-[55%]
     min-[940px]:w-[26%] min-[940px]:h-auto  min-[940px]:top-[12%] min-[1050px]:top-[5%] min-[940px]:right-[0%] min-[945px]:mt-0
     max-[940px]:static 
     xl:right-[0%]  xl:w-auto xl:h-full xl:top-0
     2xl:h-[105%] 2xl:right-[5%] `}
        />
      )}

      {texto.N === 2 && (
        <Image
          alt="Cjimage"
          src={artwork2}
          className={`${styles.Image}  absolute w-auto  z-10 h-[50%] mt-10  right-[2%]  top-0

      min-[390px]:mt-0  min-[390px]:h-[55%]
      min-[940px]:w-[26%] min-[940px]:h-auto  min-[940px]:top-[12%] min-[1050px]:top-[5%] min-[1120px]:top-[0%] min-[940px]:right-[0%] min-[945px]:mt-0
      max-[940px]:static 
      xl:right-[0%]  xl:w-auto xl:h-full xl:top-0
      2xl:h-[105%] 2xl:right-[5%]`}
        />
      )}
      <div className="absolute bottom-0 flex">
        <figure
          onClick={cambiarTexto}
          className={` cursor-pointer h-2 w-2 min-[380px]:h-[0.7rem] min-[380px]:w-[0.7rem]
        
       ${texto.N === 1 ? "bg-white" : "bg-black"} rounded-full m-2 `}
        />
        <figure
          onClick={cambiarTexto}
          className={` cursor-pointer h-2 w-2 min-[380px]:h-[0.7rem] min-[380px]:w-[0.7rem]
        
       ${texto.N === 2 ? "bg-white" : "bg-black"} rounded-full m-2 `}
        />
      </div>
    </div>
  );
};

export default Hero;
