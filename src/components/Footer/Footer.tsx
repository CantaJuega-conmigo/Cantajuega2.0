import React from "react";
import Image from "next/image";
import { BsInstagram, BsTelephone } from "react-icons/bs";
import logo from "../../../public/img/Logo.png";
import { IoMdMail } from "react-icons/io";
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import style from "../../styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      id="footer"
      className={`${style.Footer} bg-white flex justify-between items-center pt-10 pb-1 w-full flex-wrap `}
    >
      <section className=" w-fit">
        <Link href={"/"}>
          <Image
            priority={true}
            src={logo}
            alt="logo"
            className=" w-56 2xl:w-96 xl:w-64 lg:w-72 md:w-64 sm:w-60 "
          />
        </Link>
      </section>

      <section className="flex  justify-evenly text-sm  w-5/12 flex-wrap 2xl:text-2xl  2xl:w-6/12 xl:w-5/12 xl:text-xl lg:text-lg  sm:text-sm  ">
        <article className="flex">
          <a
            className="flex items-center"
            href="https://wa.me/+50254301174?"
            target="_blank"
          >
            <BsTelephone className=" text-orangeicons" />
            <span>+502 5430-1174</span>
          </a>
        </article>
        <article className="flex">
          <a
            className="flex items-center"
            href="mailto:info@cantajuegaconmigo.com"
          >
            <IoMdMail className=" text-orangeicons" />
            <span>info@cantajuegaconmigo.com</span>
          </a>
        </article>
      </section>

      <section className="flex  justify-evenly font-sans w-3/12 ">
        <a
          href="https://www.facebook.com/cantajuegaconmigo"
          className=" text-4xl lg:text-5xl sm:text-4xl "
        >
          <AiFillFacebook className=" text-grayicons rounded-3xl" />
        </a>
        <a
          href="https://www.youtube.com/@cantajuegaconmigo1543"
          className=" text-4xl lg:text-5xl sm:text-4xl "
        >
          <AiFillYoutube className=" text-grayicons" />
        </a>
        <a
          href="https://www.instagram.com/cantajuega_conmigo/"
          className=" text-4xl lg:text-5xl sm:text-4xl "
        >
          <BsInstagram className=" text-grayicons" />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
