import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { useEffect, useState, MouseEvent, ChangeEvent } from "react";
import styles from "../../styles/Cancionero.module.css";
import {
  BsFastForwardFill,
  BsPlayCircle,
  BsRewindFill,
  BsStopBtn,
} from "react-icons/bs";
import { Music } from "@/types";
interface props {
  Musics?: object[];
}
export default function MusicsPlayers({ Musics }: { Musics: Music[] }) {
  const [mute, setMute] = useState<boolean>(false);
  const [actualAudio, setActualAudio] = useState<string>("");

  useEffect(() => {
    const musicsDurations = Array.from(
      document.getElementsByClassName("AudioDurations")
    ) as HTMLSpanElement[];
    const allaudios = Array.from(
      document.getElementsByClassName("audios")
    ) as HTMLAudioElement[];
    allaudios.forEach((audio, index) => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.round(audio.duration % 60);
        musicsDurations[index].textContent = `${minutes} : ${seconds}`;
      } else {
        musicsDurations[index].textContent = "--:--";
      }
    });
  }, []);

  const stopallaudios = () => {
    const allaudios = document.getElementsByClassName(
      "audios"
    ) as HTMLCollectionOf<HTMLAudioElement>;
    for (var i = 0; i < allaudios.length; i++) {
      allaudios[i].pause();
    }
  };

  const silenceAudios = () => {
    let allaudiosSounds = document.getElementsByClassName(
      "audiocontrols"
    ) as HTMLCollectionOf<HTMLElement>;
    for (var i = 0; i < allaudiosSounds.length; i++) {
      allaudiosSounds[i].style.display = "none";
    }
  };

  const formatTime = (time: number) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.round(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const colors = ["#FF3D00", "#FFC172", "#26798E", "#9510B8"];

  const play = (key: string) => {
    stopallaudios(); ///parar audios anteriores

    const audio = document.getElementById(`cancion ${key}`) as HTMLAudioElement; ///seleccionamos el audio actual,
    const controlssound = document.getElementById(
      `audiocontrols ${key}`
    ) as HTMLElement; ///seleccionamos la seccion se iconos de audio
    const soundtime = document.getElementById(`time ${key}`) as HTMLSpanElement;

    silenceAudios(); //ocultamos los iconos de sonido de los otros audios para que solo se vea el actual

    controlssound.style.display = "block"; //ponemos la seccion de iconos de sonido en block para que sea visible el actual
    const progressInput = document.getElementById(
      `progreso ${key}`
    ) as HTMLInputElement; //seleccionamos el input del audio actual que muestra el progreso de la musica
    audio.play(); //ponemos en play el audio actual
    setActualAudio(`${key}`); // actualizamos nuestro audio actual

    audio &&
      audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100; //tomamos el progreso de la musica actual
        progressInput.value = `${progress}`; ///actualizamos el porcentaje en del input que muestra el progreso y que se actualize conforme al progreso de la musica
        const gradient = `linear-gradient(to right, #FF3D00 ${progress}%,#000000 0%,#000000 50%, #000000 100%)`; //le damos un color naranja al progreso y un color negro a lo que falta
        progressInput.style.background = gradient; //aqui le pasamos el color al input del progreso

        let duration = audio.duration;
        console.log(duration);

        let timer = setInterval(() => {
          let remainingTime = duration - audio.currentTime;
          let formattedTime = formatTime(remainingTime);
          soundtime.textContent = formattedTime;
          if (audio.ended) {
            clearInterval(timer);
          }
        }, 1000);
      });

    setMute(false); ///para evitar bug que muestra mal iconos del sonido/mute
  };

  const updateAudioProgress = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = document.getElementById(
      `cancion ${event.currentTarget.name}`
    ) as HTMLAudioElement;
    const progress = parseInt(event.currentTarget.value) / 100;
    audio.currentTime = progress * audio.duration;
  };

  const pause = (key: string) => {
    let audio = document.getElementById(`cancion ${key}`) as HTMLAudioElement;
    audio.pause();
    setActualAudio(``);
  };

  const SoundMute = (id: string) => {
    setMute(!mute);
    let actualmusic = document.getElementById(
      `cancion ${id}`
    ) as HTMLAudioElement;
    console.log(mute);
    console.log(actualAudio);

    actualmusic.muted = !mute;
  };

  return (
    <div
      className={`${styles.LoggedContainer} border  w-full h-full overflow-x-auto flex justify-center  `}>
      <ul className=" flex flex-col  w-full items-center ">
        {Musics?.map((i: Music, key) => (
          <div
            key={key}
            className=" bg-[#FFFFFF] flex max-w-[28rem] w-full sm:w-11/12 h-[4rem]  items-center relative  mt-8 mb-8">
            <section
              className="h-[4rem] p-1 w-4/12 flex items-center rounded-xl justify-center"
              style={{ backgroundColor: [...colors, ...colors][key] }}>
              <span key={key} className=" text-center text-sm sm:text-base">
                {i.name}
              </span>
            </section>

            <section
              id={`audiocontrols ${i.name}`}
              style={{ display: "none" }}
              className="audiocontrols absolute right-0 top-0">
              {mute ? (
                <HiVolumeOff onClick={() => SoundMute(i.name)} />
              ) : (
                <HiVolumeUp onClick={() => SoundMute(i.name)} />
              )}
            </section>

            <span
              id={`time ${i.name}`}
              className="AudioDurations hidden min-[360px]:block absolute right-0 bottom-0 text-xs">
              {" "}
            </span>

            <section className="flex flex-col w-6/12 justify-between h-full relative">
              <article className="flex justify-evenly bg-slate-50 absolute bottom-[40%] w-full left-[15%]">
                <BsRewindFill className=" text-[1.3rem]" />
                {actualAudio !== `${i.name}` ? (
                  <BsPlayCircle
                    onClick={() => play(i.name)}
                    className=" text-[1.3rem]"
                  />
                ) : (
                  <BsStopBtn
                    onClick={() => pause(i.name)}
                    className=" text-[1.3rem]"
                  />
                )}

                <BsFastForwardFill className=" text-[1.3rem]" />
              </article>

              <audio
                src={i.url}
                id={`cancion ${i.name}`}
                className="audios"></audio>
              <section className="absolute bg-orangeicons bottom-0 w-full  ">
                <input
                  type="range"
                  className={`${styles.ProgresBar} absolute w-full bottom-1 left-[15%]`}
                  name={i.name}
                  id={`progreso ${i.name}`}
                  min="0"
                  max="100"
                  value="0"
                  step="1"
                  onChange={updateAudioProgress}
                />
              </section>
            </section>
          </div>
        ))}
      </ul>
    </div>
  );
}
