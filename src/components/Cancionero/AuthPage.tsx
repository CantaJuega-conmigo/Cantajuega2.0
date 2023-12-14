import { useGetPlayListQuery } from "@/store/apis/CantajuegaApi";
import MusicsPlayers from "../MusicPlayer/MusicsPlayers";
import bg from "../../../public/img/Untitled_Artwork-3-1.png";
import Image from "next/image";
import { IoMdDownload } from "react-icons/io";
import { Music } from "@/types";
export default function AuthPage({
  playList,
}: {
  playList: { Music: Music[] };
}) {
  return (
    <div className="flex md:flex-row flex-col h-screen  ">
      <section className=" w-full md:w-6/12 max-h-[20rem] md:max-h-full flex flex-col ">
        <MusicsPlayers Musics={playList?.Music!} />
      </section>

      <section className=" w-full  md:w-6/12 flex flex-col items-center h-full justify-between  ">
        <p className="text-center p-4 md:text-lg text-base">
          Nuestro cancionero es una colección de canciones únicas y originales
          creadas por nuestro talentoso equipo de cantantes y nuestro productor
          musical. Cada letra y melodía ha sido escrita específicamente para
          adaptarse a la etapa de desarrollo en la que se encuentran las niñas y
          niños, lo que las hace hermosas, divertidas y sobre todo educativas.
          Nos enorgullece decir que nuestras canciones están llenas de amor y
          pasión por lo que hacemos, y esperamos que puedan disfrutarlas tanto
          como nosotros disfrutamos en su creación.
        </p>
        <div className=" w-full grow h-full flex flex-col items-center">
          <Image
            alt="cancionerobg"
            src={bg}
            className=" md:block hidden w-5/12 max-w-[30rem]"
          />
          <button className="flex items-center justify-center border-[2px] m-auto bg-[#FFFFFF] border-orangeicons w-5/6 min-w-[15rem] max-w-[18rem]  rounded-lg p-2 ">
            <span className=" w-8/12">Descargar cancionero</span>
            <span className=" text-black  w-1/12">
              <IoMdDownload className=" text-2xl" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
