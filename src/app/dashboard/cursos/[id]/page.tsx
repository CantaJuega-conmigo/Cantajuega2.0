"use client";
import Modal from "@/components/DashBoard/Modal";
import YoutubePlayer from "@/components/YoutubePlayer/YoutubePlayer";
import { useGetStageByIdQuery } from "@/store/apis/CantajuegaApi";
import { MouseEvent, useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: stage, isLoading, isError } = useGetStageByIdQuery(id);
  const [actualVideo, setActualVideo] = useState<string>("");
  const [seeModal, setSeeModal] = useState<boolean>(false);
  if (isLoading) {
    return (
      <div>
        <h1>Cargando... xd</h1>
      </div>
    );
  }
  const selectVideo = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setActualVideo(value);
  };
  const openForm=(e:MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setSeeModal(!seeModal)
  }
  return (
    <>
      <div className=" bg-slate-500 w-full flex flex-col items-center ">
        <h1>Info del curso </h1>
        <h1>Curso : {stage?.name}</h1>
        <h1>Edad: {stage?.description}</h1>
        <h1>Edad minima: {stage?.minAge}</h1>
        <h1>Edad maxima: {stage?.maxAge}</h1>
      </div>

      <div className=" bg-gray-400 w-full flex flex-col items-center">
        <h2>Videos de la etapa</h2>
        {stage?.content.videos.map((i, key) => (
          <article className="" key={key}>
            <section>
              <button onClick={selectVideo} value={i.content}>
                {i.title}
              </button>
            </section>
          </article>
        ))}
      </div>
      <section className=" bg-yellow">
        {actualVideo ? (
          <YoutubePlayer videoId={actualVideo} />
        ) : (
          <h1 className=" text-2xl">Seleccione un video.</h1>
        )}
      </section>
      <section className="w-full bg-green ">
        <button>Editar curso</button>
      </section>
      {seeModal && (
        <Modal>
          <section className=" text-white">
            <h1>dentro del modal</h1>
          </section>
        </Modal>
      )}
    </>
  );
}
