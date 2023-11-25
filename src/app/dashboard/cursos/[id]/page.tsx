"use client";
import Boxinfo from "@/components/DashBoard/BoxInfo";
import BoxInfoLayout from "@/components/DashBoard/BoxInfoLayout";
import Modal from "@/components/DashBoard/Modal";
import EditContent from "@/components/DashBoard/Modales/Cursos/EditContent";
import EditStage from "@/components/DashBoard/Modales/Cursos/EditStage";
import YoutubePlayer from "@/components/YoutubePlayer/YoutubePlayer";
import { useGetStageByIdQuery } from "@/store/apis/CantajuegaApi";
import { videos } from "@/types/Models/Stage.type";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";
import { BsArrowUp } from "react-icons/bs";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const {
    data: stage,
    isLoading,
    isError,
  } = useGetStageByIdQuery({ id, childs: true });
  const [actualVideo, setActualVideo] = useState<string>("");
  const [actualContent, setActualContent] = useState<videos>();
  const [seeModal, setSeeModal] = useState<boolean>(false);
  const [editStage, setEditStage] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<boolean>(false);
  const openEditModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEditStage(!editStage);
  };
  if (isLoading) {
    return (
      <div>
        <h1>Cargando... xd</h1>
      </div>
    );
  }
  const openForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSeeModal(!seeModal);
  };
  const selectVideo = (e: MouseEvent<HTMLButtonElement>, data?: string) => {
    openForm(e);
    setActualVideo(data!);
  };
  const openEditContent = (e: MouseEvent<HTMLButtonElement>,video?:videos) => {
    e.preventDefault();
    setEditContent(!editContent);
    setActualContent(video);
  }
  return (
    <>
      <BoxInfoLayout title={stage?.name!} className="w-8/12">
        <Boxinfo title="Descripcion" info={stage?.description} />
        <Boxinfo title="Edad mínima" info={stage?.minAge.toString()} />
        <Boxinfo title="Edad máxima" info={stage?.maxAge.toString()} />
      </BoxInfoLayout>
      <button
        className=" flex items-center bg-blue text-white px-3 p-2 rounded-xl border  border-black text-sm"
        onClick={openEditModal}>
        Editar etapa
        <BsArrowUp className="text-xl text-orangeicons font-bold" />
      </button>
      <BoxInfoLayout title={"Contenido"} className="w-8/12">
        {stage?.content.videos.map((video, key) => {
          return (
            <Boxinfo key={key} title={video?.title}>
              <section className="flex justify-around">
                <button
                  className=" bg-blue p-1 w-[5rem] rounded-2xl text-sm text-white"
                  onClick={(e) => selectVideo(e, video?.content ?? "")}>
                  Ver video
                </button>
                <button
                  className=" bg-blue p-1 w-[5rem] rounded-2xl text-sm text-white"
                  onClick={(e) => openEditContent(e,video)}>
                  Editar
                </button>
              </section>
            </Boxinfo>
          );
        })}
      </BoxInfoLayout>
    
      <BoxInfoLayout title={"Alumnos"} className="w-8/12">
        <Boxinfo title="Total" info={stage?.Children?.length.toString()} />
        <Boxinfo title="Nombres">
          {stage?.Children?.map((child, key) => {
            return (
              <article key={key} className="flex  justify-center gap-2">
                <p>
                  {child?.firstName} {child?.lastName}{" "}
                </p>
                <Link href={`/dashboard/childs/${child?.id}`}>
                  <button className=" bg-cream px-3 rounded-xl border  border-black text-sm">
                    ver mas
                  </button>
                </Link>
              </article>
            );
          })}
        </Boxinfo>
      </BoxInfoLayout>
      {seeModal && <Modal actualVideo={actualVideo} openForm={openForm} />}
      {editStage && <EditStage openEditModal={openEditModal} stage={stage!} />}
      {editContent && <EditContent  dataContent={actualContent!} openEditModal={openEditContent}/>}
    </>
  );
}
