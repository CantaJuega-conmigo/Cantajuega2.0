"use client";

import { ColumnGrid } from "@/types";
import Link from "next/link";
export default function ColumnGrid({
  columndata,
  normalColumn,
  LinkColumn,
  numberOfLinks,
  linksRedirectTo,
  TotalDataColumn,
  dataOfTotalColumn,
}: ColumnGrid) {
  const generateTagP = [];
  for (let i = 0; i < numberOfLinks! ?? 1; i++) {
    generateTagP.push(i);
  }

  return (
    <>
      {normalColumn && (
        <section className="bg-white border-l border-y border-black flex flex-col">
          <article className="h-[3rem]  flex items-center justify-center">
            <h2>{columndata?.title}</h2>
          </article>
          <article className=" h-full flex flex-col items-center gap-5">
            {columndata?.data?.map((i, key) => (
              <p key={key}>{i[columndata.dataProperty]}</p>
            ))}
          </article>
        </section>
      )}

      {LinkColumn && (
        <section className="bg-white border-l border-y border-black flex flex-col">
          <article className="h-[3rem]  flex items-center justify-center"></article>
          <article className=" h-full flex flex-col items-center gap-5">
            {columndata?.data?.map((i, key) => (
              <Link
                key={key}
                href={`${linksRedirectTo}/${i["id" as keyof object]}`}>
                <p>Mas informacion</p>
              </Link>
            ))}
          </article>
        </section>
      )}
      {TotalDataColumn && (
        <section className="bg-white border-l border-y border-black flex flex-col">
          <article className="h-[3rem]  flex items-center justify-center">
            <h1>{dataOfTotalColumn?.title}</h1>
          </article>
          <article className=" h-full flex flex-col items-center gap-5">
            {dataOfTotalColumn?.data.map((i, key) => (
              <p key={key}>{[].concat(i["Childrens" as keyof object]).length}</p>
            ))}
          </article>
        </section>
      )}
    </>
  );
}
