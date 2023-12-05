import { BiPlusCircle } from "react-icons/bi";
import ButtonForms from "../Cursos/ButtonForms";
import LayoutModal from "../LayoutModal";
import { useState } from "react";
import { useAddMusicInPlayListMutation } from "@/store/apis/CantajuegaApi";

export default function AddMusicModal({
  openorclose,
  setSeeModal,
}: {
  openorclose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSeeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [createMusic] = useAddMusicInPlayListMutation();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    console.log(file);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file!);
    try {
      const response = await createMusic(formData).unwrap();
      alert(response.message);
      return setSeeModal(false);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <LayoutModal>
      <form
        className="bg-blue border p-8 flex flex-col gap-4 items-center border-black overflow-hidden  text-center rounded-2xl shadow-lg  shadow-black text-white "
        onSubmit={handleSubmit}>
        <section>
          <label htmlFor="name">Nombre de la cancion</label>
          <input
            type="text"
            name="name"
            id="name"
            className="border p-2 rounded-2xl w-full text-black"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            value={name}
          />
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFile}
            className="hidden"
            accept=".mp3"
          />
        </section>
        <label htmlFor="file">
          <BiPlusCircle className="text-4xl hover:text-orange cursor-pointer" />
        </label>
        {!file ? <span>Selecciona una cancion</span> : null}
        <ButtonForms
          startEdit={name.length>0 && file!==null }
          openEditModal={openorclose}
          onSubmit={handleSubmit}
        />
      </form>
    </LayoutModal>
  );
}
