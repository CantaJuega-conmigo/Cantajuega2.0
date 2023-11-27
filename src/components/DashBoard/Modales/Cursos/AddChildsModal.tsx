import {
  useAddChildInStageMutation,
  useGetChildQuery,
} from "@/store/apis/CantajuegaApi";
import LayoutModal from "../LayoutModal";
import TableChilds from "./TableChilds";

export default function AddChildsModal({
  openAddChildModal,
  stageId,
}: {
  openAddChildModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
  stageId: string;
}) {
  const { data: childrens } = useGetChildQuery({
    name: "exclude",
    value: "stages",
  });
  const [addChildStage] = useAddChildInStageMutation();
  const addChild = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.value);
    addChildStage({ id: stageId, body: { childId: e.currentTarget.value } })
      .unwrap()
      .then(() => openAddChildModal(e))
      .catch((err) =>
        alert("Error al agregar el niño. Intenta de nuevo o contacta a joa :)")
      );
  };
  return (
    <LayoutModal>
      <form className="w-5/12 bg-blue p-8 flex flex-col gap-4 rounded-xl shadow-lg  shadow-black  relative">
        <button
          className="absolute top-0 right-0 p-2"
          onClick={openAddChildModal}
          type="button">
          X
        </button>
        <section className="flex">
          <article>
            <label htmlFor="">Nombre</label>
            <input type="search" name="search" id="" />
          </article>
          <article>
            <button>Buscar</button>
          </article>
        </section>
        <TableChilds
          childrens={childrens!}
          className="w-full"
          addChildButton={true}
          addChildFunction={addChild}
        />
      </form>
    </LayoutModal>
  );
}
