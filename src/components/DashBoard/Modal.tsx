import React from "react";

export default function Modal({children}:{children:React.ReactNode}){
   return(
    <div className="  h-full bg-[#2d99a186] fixed z-10 w-full top-0 flex flex-col items-center justify-center">
       {children}
    </div>
   )
}