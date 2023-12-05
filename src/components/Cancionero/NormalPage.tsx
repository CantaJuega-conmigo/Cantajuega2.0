import Image from "next/image";
import bg from "../../../public/img/Untitled_Artwork-3-1.png";
import { BsArrowLeft } from "react-icons/bs";
export default function NormalPage() {
  return (
    <div className="flex flex-col  md:flex-row  md:gap-0 gap-8  px-8 py-4 pb-14 ">
      <section
        className="w-full  text-center flex items-center text-sm min-[500px]:text-base 
       sm:text-lg  md:text-xl   md:leading-[2.3rem] md:w-7/12 ">
        <p>
          Nuestro cancionero es una colección de canciones únicas y originales
          creadas por nuestro talentoso equipo de cantantes y nuestro productor
          musical. Cada letra y melodía ha sido escrita específicamente para
          adaptarse a la etapa de desarrollo en la que se encuentran las niñas y
          niños, lo que las hace hermosas, divertidas y sobre todo educativas.
          Nos enorgullece decir que nuestras canciones están llenas de amor y
          pasión por lo que hacemos, y esperamos que puedan disfrutarlas tanto
          como nosotros disfrutamos en su creación.
        </p>
      </section>
      <section className="w-5/12   justify-center items-center md:flex hidden">
        <Image alt="cancionerobg" src={bg} className=" w-10/12 max-w-[30rem]" />
      </section>

      <article
        className={` md:absolute bottom-[0%] left-0  w-full  flex justify-center  text-white`}>
        <button className="flex items-center justify-center bg-blue w-[20rem] rounded-full text-[#FFFFFF]">
          <span className=" text-orangeicons w-1/12">
            <BsArrowLeft />{" "}
          </span>
          <span className=" w-10/12">
            Inscríbete para acceder a nuestro contenido
          </span>
        </button>
      </article>
    </div>
  );
}
