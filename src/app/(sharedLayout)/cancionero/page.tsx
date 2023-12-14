"use client";
import Image from "next/image";
import image1 from "../../../../public/img/image 12.png";
import image2 from "../../../../public/img/Star 9.png";
import image3 from "../../../../public/img/Untitled_Artwork-3-1.png";
import styles from "../../../styles/Cancionero.module.css";
import { useAppSelector } from "@/store/hooks";
import { useGetPlayListQuery } from "@/store/apis/CantajuegaApi";
import NormalPage from "@/components/Cancionero/NormalPage";
import AuthPage from "@/components/Cancionero/AuthPage";

export default function Cancionero() {
  const { isLoading, data: playList, isError } = useGetPlayListQuery(null);
  const user = useAppSelector((state) => state.userReducer.user);
  const isAuth = user;

  return (
    <div
      id="CancioneroPage"
      className={` relative bg-white ${styles.Container}`}>
      <header className=" relative bg-violet  h-[7rem] min-[520px]:h-[8rem] sm:h-[10rem] w-full flex justify-center items-center ">
        <Image
          src={image1}
          alt="blueimage"
          className={`absolute top-0 h-full w-auto left-0 hidden min-[475px]:block lg:left-[9%] xl:left-[12%] 2xl:left-[15%]`}
        />

        <div
          className={` absolute hidden w-[5rem] min-[360px]:block h-[70%] min-[450px]:w-[8rem] min-[450px]:h-[85%] right-[0%] sm:w-[10rem] sm:h-full sm:right-[5%] 
                                 md:right-[10%] lg:right-[13%] xl:right-[15%] 2xl:right-[20%]  `}>
          <Image className={`${styles.Star1}`} src={image2} alt="stars" />
          <Image className={`${styles.Star2}`} src={image2} alt="stars" />
          <Image className={`${styles.Star3}`} src={image2} alt="stars" />
        </div>
        <h1 className="  z-30 text-[#FFFFFF] text-4xl 2xl:text-8xl   xl:text-6xl lg:text-5xl  sm:text-5xl">
          Cancionero
        </h1>
      </header>
      <div className="  max-h-screen h-auto  relative">
        {!isAuth || isLoading || (isError && <NormalPage />)}
        {isAuth && !isError && <AuthPage playList={playList!} />}
      </div>
    </div>
  );
}
