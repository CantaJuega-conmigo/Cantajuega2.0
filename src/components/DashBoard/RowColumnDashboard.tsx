"use client";
import { useState } from "react";
import Link from "next/link";
interface RowColumn {
    className?: string;
    column1?: {
        text: string;
        style?: string;
    };
    column2?: {
        text: string;
        style?: string;
    };
    column3?: {
        text: string;
        style?: string;
    };
    column4?: {
        text: string;
        style?: string;
    };
    column5?: {
        text: string;
        style?: string;
    };
    column6?: {
        text: string;
        style?: string;
    };
    numberOfColumns?: number|string;
    linkColumn?: {
        text: string;
        linkto?: string;
    };
}
export default function RowColumn({
  className,
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  numberOfColumns,
  linkColumn,
}: RowColumn) {
  const [loading, setLoading]=useState(true)
  
  if(loading){
    setTimeout(() => {
      setLoading(false)
    }, 3000);
    return(
     <h1>Cargando...</h1>
    )
  }
  return (
    <article
      className={` w-full grid ${numberOfColumns&&`grid-cols-${ numberOfColumns}`}  grid-cols-6   ${className ?? ""
        }`}>
      <article className={column1?.style ?? ""}>
        <p>{column1?.text ?? ""}</p>
      </article>
      <article className={column2?.style ?? ""}>
        <p>{column2?.text ?? ""}</p>
      </article>
      <article className={column3?.style ?? ""}>
        <p>{column3?.text ?? ""}</p>
      </article>
      <article className={column4?.style ?? ""}>
        <p>{column4?.text ?? ""}</p>
      </article>
      {column5 && (
        <article className={column5?.style ?? ""}>
          <p>{column5?.text ?? ""}</p>
        </article>
      )}
      {column6 && (
        <article className={column6?.style ?? ""}>
          <p>{column6?.text ?? ""}</p>
        </article>
      )}
      {linkColumn && (
        <article className={""}>
          <Link href={`${linkColumn?.linkto ?? ""}`}>
            <button className=" bg-orangebg p-1  rounded-lg  bg-orange ">
              {linkColumn?.text}
            </button>
          </Link>
        </article>
      )}
    </article>
  )
}


