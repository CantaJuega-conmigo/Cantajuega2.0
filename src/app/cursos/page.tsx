"use client"
import Image from "next/image";
import image1 from "../../../public/img/Untitled_Artwork 5.png";
import image2 from "../../../public/img/img-2.png";
import image3 from "../../../public/img/Ellipse 13.png";
import image4 from "../../../public/img/Rectangle 167.png";
import styles from "../../styles/Cursos.module.css";
import { stage } from "@/types/step.type";
import Stages from "@/components/stages/Stages";
import { useGetStageQuery } from "@/store/apis/CantajuegaApi";
import Loading from "../loading";
interface state extends stage {
  isLoading?: boolean;
}
export default  function Cursos() {

  const {data:steps,isLoading}=useGetStageQuery(null)
  const colors: string[] = [
    "#FF0303",
    "#FF0303",
    "#63CAA7",
    "#63CAA7",
    "#9510B8",
    "#9510B8",
    "#FF0303",
    "#FF0303",
    "#63CAA7",
    "#63CAA7",
    "#9510B8",
    "#9510B8",
  ];
  if(isLoading){
    return <Loading/>
  }

  return (
    <div
      id="CursosPage"
      className={`${styles.Container} min-h-[80vh] flex flex-col items-center bg-white md:gap-8`}
    >
      <section className="h-[10rem] bg-blue relative w-[99%] flex items-center justify-center text-white  2xl:text-2xl  xl:text-6xl lg:text-lg  sm:text-sm ">
        <Image src={image1} alt="cjimg" className={`${styles.Image1}`} />
        <Image src={image2} alt="cjimg" className={`${styles.Image2}`} />

        <h1 className="  z-30 text-4xl 2xl:text-8xl   xl:text-6xl lg:text-5xl  sm:text-5xl">
          Cursos
        </h1>
        <div className={`${styles.Imageblue} absolute`}>
          <Image
            src={image4}
            alt="cjimg"
            className=" w-[auto] absolute bottom-[2.7rem]  right-6  h-[3rem] "
          />
          <Image
            src={image3}
            alt="cjimg"
            className=" w-[auto] absolute bottom-[3.2rem]  right-[1.2rem] h-[3rem]  min-[400px]:h-[3.5rem] "
          />
          <Image
            src={image3}
            alt="cjimg"
            className=" w-[auto] absolute bottom-4 right-[5rem] h-[3rem]  min-[400px]:h-[3.5rem] "
          />
        </div>
      </section>

      <section className="">
        <div className=" flex justify-center  p-5">
          <p
            className={`${styles.Text}  text-xs p-4 min-[500px]:text-sm min-[500px]:p-0 flex min-[500px]:w-[80%] 2xl:text-2xl   xl:text-xl lg:text-lg  sm:text-sm`}
          >
            Nuestra metodología terapéutica es una experiencia única y
            emocionante que se adapta a las diferentes etapas de desarrollo de
            cada niña y niño. En cada etapa las niñas y niños explorarán
            canciones infantiles que estimularán su lenguaje y enriquecerán su
            vocabulario, perfeccionarán su pronunciación y modulación, y tendrán
            la oportunidad de tener ejemplos de socialización en entornos
            seguros y acogedores. Además, nuestras actividades artísticas harán
            que el proceso de aprendizaje sea divertido e integral, convirtiendo
            en un viaje lleno de emociones y descubrimientos para el crecimiento
            personal de cada infante.
          </p>
        </div>
      </section>

      <section
        className={`${styles.CoursesSection}   h-full overflow-auto min-[300px]:h-auto w-full flex  justify-center text text-xs
                           2xl:text-2xl   xl:text-xl lg:text-lg  sm:text-sm
                           sm:justify-center sm:items-center sm:h-[30rem]`}
      >
        <div className=" flex    h-5/6 md:h-full  w-full items-center  flex-col min-[300px]:flex-row  sm:justify-evenly min-[400px]:w-full  sm:w-11/12 ">
          <div className="grid grid-cols-2 h-full md:gap-8 grid-flow-row-dense  w-full  md:w-[40rem] xl:w-[43rem] ">
            {steps?.map((item, key) => (
              <Stages
                id={item.id}
                key={key}
                name={item.name}
                maxAge={item.maxAge}
                minAge={item.minAge}
                color={colors[key]}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
