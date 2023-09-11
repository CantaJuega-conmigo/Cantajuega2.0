"use client";

import { useGetStageQuery } from "@/store/apis/CantajuegaApi";
import { useAppSelector } from "@/store/hooks";

export default function MisCursosContent() {
  const Child = useAppSelector((state) => state.childReducer.child);
  const ChildExist = Child?.StageId ? true : false;
  const { stage } = useGetStageQuery(null, {
    selectFromResult: ({ data }) => ({
      stage: data?.filter((item) => item.id === Child?.StageId)[0],
    }),
    skip: !ChildExist,
  });
  return (
    <>

      <section>
        <article>
          <h1>{stage?.name}</h1>
        </article>
        
        <article>
          <button>videos</button>
          <button>videos</button>
          <button>videos</button>
          <button>videos</button>
        </article>
      </section>

      <section>
        <h1>AQUI va el video</h1>
      </section>
    </>
  );
}
