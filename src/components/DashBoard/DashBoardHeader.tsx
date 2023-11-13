"use client";
import { IoMdNotifications } from "react-icons/io";
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
  const [show, setShow] = useState<boolean>(false);
  const openNotifications = (e: MouseEvent< HTMLButtonElement>) => {
    e.preventDefault();
    setShow(!show);
  }
  return (
    <article className="flex  items-center w-3/12 justify-evenly relative">
      {show && (
        <Notifications closeModal={() => setShow(false)} />
      )}
      <div className="relative flex items-center gap-2">
        <IoMdNotifications className="text-4xl text-blue cursor-pointer hover:text-[#423579] "  onClick={openNotifications}/>
        <span className="absolute -top-1 -right-1 text-white bg-red w-5 h-5 rounded-full flex justify-center items-center">
          {notifications ?? "1"}
        </span>
      </div>

      <figure className=" bg-red h-20 w-20 rounded-full flex justify-center items-center">
        foto
      </figure>
      <h1>{name}</h1>
    </article>
  );
}
