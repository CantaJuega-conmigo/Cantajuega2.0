"use client";
import Boxinfo from "@/components/DashBoard/BoxInfo";
import BoxInfoLayout from "@/components/DashBoard/BoxInfoLayout";

import AddMusicModal from "@/components/DashBoard/Modales/cancionero/AddMusicModal";
import { useGetPlayListQuery } from "@/store/apis/CantajuegaApi";
import { useState } from "react";

export default function Page() {
  const { isLoading, data: playList } = useGetPlayListQuery(null);

  const [seeModal, setSeeModal] = useState<boolean>(false);

  const openorclose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSeeModal(!seeModal);
  };

  return (
    <>
      <h1 className=" text-3xl font-bold  text-blue">Cancionero</h1>
      {seeModal && (
        <AddMusicModal openorclose={openorclose} setSeeModal={setSeeModal} />
      )}
      <BoxInfoLayout title="Canciones" className="w-full">
        {playList?.Music.map((music, index) => (
          <Boxinfo
            key={music.id}
            title={music.name}
            BoxStyle="items-center"
            BoxTitle="w-full">
            <audio src={music.url} controls />
          </Boxinfo>
        ))}
      </BoxInfoLayout>
      <button className="bg-blue text-white p-2 px-6" onClick={openorclose}>
        Agregar canciones
      </button>
    </>
  );
}
