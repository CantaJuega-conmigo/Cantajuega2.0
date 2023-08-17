

export default function Stages({name,color,minAge,maxAge}:any){

   return(
<section className="flex  m-auto  justify-center w-11/12  sm:justify-start  h-[5.5rem] ">
    <article style={{backgroundColor:color}} className=" w-[6rem] h-[3rem]  min-[400px]:h-[3.5rem]  sm:h-[4.5rem] sm:h-15 flex justify-center items-center rounded-[10px]">
        <span>{name}</span>
    </article>
    <article className=" bg-[#FFFFFF] h-[3rem]  min-[400px]:h-[3.5rem] sm:h-[4.5rem] flex justify-center items-center w-8/12">
        <span>{minAge} a {maxAge} meses.</span>
    </article>
 </section>
   )
}