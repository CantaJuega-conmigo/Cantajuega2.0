"use client";
import { useState, MouseEvent } from "react";
import Notifications from "./Notifications";
export default function DashBoardHeader({
  image,
  name,
  notifications,
}: {
  image?: string;
  name?: string;
  notifications?: any;
}) {
  return (
    <>
      <article className="flex  items-center w-3/12 justify-evenly ">
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <Notifications />
          </div>
        </div>

        <figure className=" bg-red h-20 w-20 rounded-full flex justify-center items-center">
          foto
        </figure>
        <h1>{name}</h1>
      </article>
    </>
  );
}
