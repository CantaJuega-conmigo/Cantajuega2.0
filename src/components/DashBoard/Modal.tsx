import React, { useEffect,MouseEvent } from "react";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";

export default function Modal({actualVideo,openForm}:{actualVideo:string,openForm:(e:MouseEvent<HTMLButtonElement>)=>void}){

   return(
    <div className="  h-full bg-[#2d99a186] fixed z-10 w-full top-0 flex flex-col items-center justify-center">
        <section className=" text-white relative min-w-[70%] h-[90%]">
            <button
              className=" absolute top-0 right-0 bg-red p-2"
              onClick={openForm}>
              X
            </button>
         {actualVideo&&<YoutubePlayer videoId={actualVideo} styles="h-full" />}
      
          </section>
    </div>
   )
}