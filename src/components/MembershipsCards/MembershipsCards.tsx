import { Membership } from "@/types/Models/Membership.type";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";

interface Props {
  membership: Membership;
  color: string;
  image: any;
  Admin?: boolean;
  onClick?: MouseEventHandler<SVGAElement>;
  userHasMembership?: boolean;
  userIsLogged?: boolean;
}

const MembershipCard = ({
  membership,
  color,
  image,
  Admin,
  onClick,
  userHasMembership,
  userIsLogged,
}: Props) => {
  return (
    <div
      className={` p-2 flex flex-col w-full max-w-[18rem] h-[25rem] relative`}
      style={{ backgroundColor: color }}>
      {Admin && (
        <BsFillPencilFill className="  z-30 absolute cursor-pointer right-0 top-0" />
      )}

      {Admin && (
        <BsTrash3Fill
          onClick={onClick}
          id={membership?.id}
          className="absolute cursor-pointer left-0 top-0"
        />
      )}

      <section className="w-full h-[20%]  flex items-center relative">
        <h1 className=" w-3/6 text-white text-center text-2xl font-[Kristen ITC]">
          {membership?.name}
        </h1>
        {image && (
          <Image
            src={image}
            alt="background"
            className="h-[115%] bottom-0 w-auto absolute right-0"
          />
        )}
      </section>

      <section className="bg-white flex flex-col w-full h-full justify-between">
        <article className="h-[55%]">
          {membership?.description && (
            <p className="text-base h-[33%] text-center w-full justify-center flex items-center  border-b-2 border-dashed border-gray-400">
              {membership?.description}
            </p>
          )}
          {membership?.text1 && (
            <p className="text-base h-[33%] text-center w-full justify-center flex items-center  border-b-2 border-dashed border-gray-400">
              {membership?.text1}
            </p>
          )}
          {membership?.text2 && (
            <p className="text-base h-[33%] text-center w-full justify-center flex items-center  border-b-2 border-dashed border-gray-400">
              {membership?.text2}
            </p>
          )}
        </article>

        <article
          className={`flex h-[45%] text-[${color}] flex-col justify-center gap-2 items-center`}>
          <b className={` text-4xl text-[${color}]`}>Q {membership?.price}</b>
          <h3>Cada cierto tiempo</h3>
          {userIsLogged && !userHasMembership && (
            <button className=" bg-[#2C98F0]  text-white w-[50%] p-2">
              <a href={membership?.checkout}>seleccionar</a>
            </button>
          )}

          {userIsLogged && userHasMembership && (
            <button
              className=" bg-[grey]  text-white w-[50%] p-2 cursor-not-allowed "
              disabled={true}>
              seleccionar
            </button>
          )}
          {!userIsLogged && (
            <button
              className=" bg-[#2C98F0]  text-white w-[50%] p-2"
              onClick={() => alert("Inicia sesion para continuar")}>
              seleccionar
            </button>
          )}
        </article>
      </section>
    </div>
  );
};

export default MembershipCard;
