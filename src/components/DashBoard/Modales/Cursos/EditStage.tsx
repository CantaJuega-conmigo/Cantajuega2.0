import { stage } from "@/types/Models/Stage.type";
import BoxInfoLayout from "../../BoxInfoLayout";
import LayoutModal from "../LayoutModal";
import { MouseEvent, useState } from "react";
import ButtonForms from "./ButtonForms";
import { useUpdateStageMutation } from "@/store/apis/CantajuegaApi";
export default function EditStage({
  openEditModal,
  stage,
}: {
  openEditModal: (event: MouseEvent<HTMLButtonElement>) => void;
  stage: stage;
}) {
  const [data, setData] = useState<stage>(stage);
  const [dataCache, setDataCache] = useState<stage>(stage);
  const [startEdit, setStartEdit] = useState<boolean>(false);
  const [updateStage, { isLoading }] = useUpdateStageMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !startEdit && setStartEdit(true); // set startEdit to true if it's false
    const name = e.target.name as keyof stage;
    const value =
      name === "minAge" || name === "maxAge" // if the name is minAge or maxAge we need to convert it to a number
        ? Number(e.target.value)
        : e.target.value;
    const newValue = {
      ...data,
      [name]: value,
    };
    setData((prev) => ({ ...prev, [name]: value }));
    if (JSON.stringify(newValue) == JSON.stringify(dataCache)) {
      // compare if the new value is the same as the old value
      setStartEdit(false);
    }
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStage(data)
      .unwrap()
      .then(() => openEditModal(e as unknown as MouseEvent<HTMLButtonElement>))
      .catch((err) =>
        alert("Error al editar la etapa. Intenta de nuevo o contacta a joa :)")
      );
  };
  return (
    <LayoutModal>
      <form
        action=""
        className="w-5/12 bg-blue p-8 flex flex-col gap-4 rounded-xl shadow-lg  shadow-black "
        onSubmit={onSubmit}>
        <BoxInfoLayout title="Editar etapa" className="text-center">
          <article className=" grow flex flex-col ">
            <label htmlFor="">Edad minima</label>
            <input
              type="text"
              className="p-2 rounded-xl"
              value={data.minAge}
              name="minAge"
              onChange={onChange}
            />
          </article>
          <article className=" grow flex flex-col ">
            <label htmlFor="">Edad Maxima</label>
            <input
              type="text"
              className="p-2 rounded-xl"
              value={data.maxAge}
              name="maxAge"
              onChange={onChange}
            />
          </article>
          <article className=" grow flex flex-col ">
            <label htmlFor="">Descripcion</label>
            <input
              type="text"
              className="p-2 rounded-xl"
              value={data.description}
              name="description"
              onChange={onChange}
            />
          </article>
        </BoxInfoLayout>

        <ButtonForms
          startEdit={startEdit}
          openEditModal={openEditModal}
          onSubmit={onSubmit}
        />
      </form>
    </LayoutModal>
  );
}
