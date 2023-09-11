import {HiArrowDown } from "react-icons/hi";
import {useState} from 'react'
import styles from '../../styles/Nosotros.module.css'
import YouTube from "react-youtube";
import YoutubePlayer from "../YoutubePlayer/YoutubePlayer";
const videoId = "jqLaRv0fuXc";
export default function AboutUs(){
    const [seeAbout,setSeeAbout]=useState(false);
    const [seeUsDream,setSeeUsDream]=useState(false);

    const setAbout=()=>{
        setSeeUsDream(false)
        setSeeAbout(!seeAbout)
    }
    const setUsDream=()=>{
        setSeeAbout(false)
        setSeeUsDream(!seeUsDream)
    }
   

    return (
        <div className={`${styles.Container} mt-2  h-[30rem] w-full flex flex-col items-center justify-between
        min-[500px]:h-[25rem] min-[500px]:items-stretch min-[500px]:justify-between  min-[500px]:flex-row `} id="Nosotros">
            
            <section className="flex flex-col w-full h-[50%] justify-around  items-center  
            min-[500px]:w-6/12 min-[500px]:h-auto min-[500px]:justify-evenly ">
                <div className="relative  max-[400px]:w-11/12">
                    <button value={'About'} onClick={setAbout}
                    className="w-full h-[4rem] rounded-xl relative bg-blue text-white hover:text-white
                    min-[400px]:w-[15rem] 
                    sm:w-[18rem] 
                    md:w-[20rem]
                    lg:w-[28rem] lg:h-[5rem] 
                    xl:w-[33rem]
                    2xl:w-[35rem] 
                     ">
                        <span className=" text-2xl sm:text-3xl md:text-4xl  xl:text-6xl lg:text-5xl">
                        Nosotros
                        </span>
                    <HiArrowDown className="absolute right-0 bottom-[20%] text-4xl text-orangeicons "/>
                    </button>
                    
                { seeAbout&&
                    <article className="absolute bg-[#FAFAFA] z-30  h-auto lg:h-[12rem] border flex justify-center items-center">
                        <span className=" w-10/12 p-1 lg:p-0 lg:w-9/12 text-center text-black">
                        CantaJuega Conmigo ha sido creado a partir del interés por el desarrollo y 
                        estimulación oportuna de la primera infancia con dificultades de aprendizaje 
                        y socialización debidos a una condición que afecta o altera su capacidad de hablar y comunicar. 
                        </span>
                    </article>}
                </div>
                
                <div className="relative max-[400px]:w-11/12">
                    <button value={'Us-dream'}  onClick={setUsDream}
                    className="w-full h-[4rem] rounded-xl relative bg-green text-white
                    min-[400px]:w-[15rem] 
                    sm:w-[18rem] 
                    md:w-[20rem]
                    lg:w-[28rem]  lg:h-[5rem] 
                    xl:w-[33rem]
                    2xl:w-[35rem] 
                    ">
                        <span className=" text-2xl sm:text-3xl md:text-4xl  xl:text-6xl lg:text-5xl">
                        Nuestro sueño
                        </span>
                        <HiArrowDown className="absolute right-0 bottom-[20%] text-4xl text-orangeicons "/>
                    </button>
                    { seeUsDream&&
                    <article className="absolute bg-[#FAFAFA] z-30  h-auto lg:h-[12rem] border flex justify-center items-center">
                        <span className="w-9/12 text-center ">
                        Teniendo como sueño grupal proporcionar un novedoso método terapéutico especializado, 
                        con el más alto nivel en neuro educación,música, arte y el modelado 
                        de video para la atención de niños y niñas con dificultades en el desarrollo del lenguaje y/o aprendizaje.             
                        </span>
                    </article>}
                </div>

            </section>

            <section className="  flex justify-center items-center w-full h-[50%] bg-white
            min-[500px]:items-center 
            min-[500px]:h-full
            min-[500px]:justify-center
            min-[500px]:w-6/12">
                {/* <Image alt="cjimage" src={image}  className="h-5/6 w-10/12" /> */}
            
              <YoutubePlayer videoId={videoId} styles="h-full w-[95%] min-[500px]:w-[90%]" />
            </section>
        </div>
    )
}