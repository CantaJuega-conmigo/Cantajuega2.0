import React from "react";
import {MetodologiasProps} from './Interfaces'
import {MouseEvent,useEffect} from 'react'
const Modal = ({ closeModal, text, title }: MetodologiasProps) => {
  useEffect(()=>{
    const body= document.getElementById('Body') as HTMLBodyElement;
    body.style.overflow='hidden';
    return()=>{
       body.style.overflow='auto'
      }
  },[])

  const closeModalBgClick = (e:MouseEvent  <HTMLDivElement>) => {
    if (e.currentTarget.id === "modal-bg") {
      closeModal();
    }
  };

  return (
    <div
      id="modal-bg"
      className="fixed z-50 top-0 left-0 w-screen h-screen bg-zinc-700/50 flex flex-col justify-center items-center"
      onClick={closeModalBgClick}
    >
      <div className=" w-[99%] h-auto justify-between p-8
       landscape:h-5/6
      min-h-[18rem]   min-[250px]:max-h-[23rem]
      min-[400px]:min-h-[15rem] min-[400px]:h-auto
      sm:h-[20rem] 
      sm:w-11/12 
      md:w-10/12 lg:w-[50rem] md:h-[17rem] lg:h-[18rem] xl:h-[19rem] 
      2xl:h-[25rem]  2xl:w-[65%] max-w-[67rem]
      text-center flex flex-col bg-white items-center sm:p-2 sm:justify-normal">
      
        <section className=" h-auto border-b-2   xl:w-[22rem]  2xl:w-[30rem]   2xl:h-auto sm:border-b-4 border-yellow ">
          <h1 className="  text-2xl sm:text-3xl md:text-3xl 2xl:text-5xl xl:text-4xl lg:text-3xl">{title}</h1>
        </section>
        <section className="w-full  h-5/6 flex justify-center items-center">
          <p className=" w-full   sm:w-11/12 text-xs sm:text-base text-center 2xl:text-2xl xl:text-xl lg:text-lg md:text-base">{text}</p>
        </section>
      </div>
    </div>
  );
};

export default Modal;
