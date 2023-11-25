import { MouseEvent } from "react";
export default function ButtonForms({
  openEditModal,
  startEdit,
}: {
  openEditModal: (e: MouseEvent<HTMLButtonElement>) => void;
  startEdit: boolean;
}) {
  return (
    <section className="flex gap-4 justify-center">
      <button
        className=" bg-red  p-2 grow text-white font-bold rounded-xl hover:bg-orangeicons hover:text-white"
        onClick={openEditModal}
        type="button">
        Cancelar
      </button>
      <button
        type="button"
        disabled={!startEdit}
        className={` bg-green p-2 grow text-black font-bold rounded-xl hover:bg-orange hover:text-white ${
          !startEdit && "opacity-50 cursor-not-allowed"
        }`}
        onClick={openEditModal}>
        Confirmar cambios
      </button>
    </section>
  );
}
