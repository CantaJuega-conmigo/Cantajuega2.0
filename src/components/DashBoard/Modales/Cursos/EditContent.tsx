import { videos } from "@/types/Models/Stage.type";
import BoxInfoLayout from "../../BoxInfoLayout";
import LayoutModal from "../LayoutModal";
import { useState, MouseEvent, useEffect } from "react";
import ButtonForms from "./ButtonForms";
export default function EditContent({
  dataContent,
  openEditModal,
}: {
  dataContent: videos;
  openEditModal: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const [content, setContent] = useState(dataContent);
  const [contentCache, setContentCache] = useState(dataContent);
  const [startEdit, setStartEdit] = useState(false);
  useEffect(() => {//set video format to https://www.youtube.com/watch?v=codeofvideo
    setContent({
      ...content,
      content: `https://www.youtube.com/watch?v=${content.content}`,
    });
    setContentCache({
      ...contentCache,
      content: `https://www.youtube.com/watch?v=${contentCache.content}`,
    });
  }, []);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !startEdit && setStartEdit(true); // set startEdit to true if it's false
    const name = e.target.name as keyof videos;
    const value = e.target.value;
    const newValue = {
      ...content,
      [name]: value,
    };
    setContent((prev) => ({ ...prev, [name]: value }));

    if (JSON.stringify(newValue) == JSON.stringify(contentCache) || !newValue.content) {
      // compare if the new value is the same as the old value
      setStartEdit(false);
    }
  };
  return (
    <LayoutModal>
      <form
        action=""
        className="w-5/12 bg-blue p-8 flex flex-col gap-4 rounded-xl shadow-lg  shadow-black ">
        <BoxInfoLayout title="Editar contenido">
          <article className=" grow flex flex-col  gap-2">
          <section className=" grow flex flex-col ">
            <label htmlFor="">Titulo</label>
            <input
              type="text"
              className="p-2 rounded-xl"
              value={content.title}
              name="title"
              onChange={onChange}
              placeholder="Ingrese el nombre del video"
            />
          </section>
            <section>
              <span>Actual url:</span>
              <i>
                <a
                  href={`https://www.youtube.com/watch?v=${contentCache.content}`}
                  target="_blank"
                  className="underline text-violet">
                  ir al video
                </a>
              </i>
            </section>
            <label htmlFor="">{contentCache.title}</label>
            <input
              type="text"
              className="p-2 rounded-xl"
              name="content"
              placeholder="Ingrese url del video (youtube)"
              value={content.content}
              onChange={onChange}
            />
          </article>
        </BoxInfoLayout>
        <ButtonForms startEdit={startEdit} openEditModal={openEditModal} />
      </form>
    </LayoutModal>
  );
}
