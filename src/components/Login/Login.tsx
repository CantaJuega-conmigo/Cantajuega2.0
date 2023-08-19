"use client";
import { IoMdClose } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import styles from "../../styles/login.module.css";
import { useEffect, useState } from "react";
// import { loginUser, loginwithGoogle } from "@/functions/user.query";
import { loginError } from "../../utils/FormsErrors";
import { AUTH_MODAL_TYPE } from "../../utils/constants";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { loginUser } from "@/libs/functions";

interface LoginProps {
  handleOpen: (name: AUTH_MODAL_TYPE) => void;
}

interface InputProps {
  email: string;
  password: string;
  type?: string;
}
interface ErrorProps {
  email?: string;
  password?: string;
  global?: string;
}

const Login: React.FC<LoginProps> = ({ handleOpen }) => {
  const [input, setInput] = useState<InputProps>({
    email: "",
    password: "",
  });

  // const [login, { data, isLoading }] = useLoginUserMutation();
  const [error, setError] = useState<ErrorProps>({
    global: "Todos los campos son obligatorios",
  });
  const [visibleErrors, setVisibleErrors] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError(
      loginError({
        ...input,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(error).length) {
      error.global && alert(error.global);
      return setVisibleErrors(true);
    }
    loginUser(input);
  };

  const showPassword = () => {
    const passwordInput = document.getElementById(
      "passwordlogin"
    ) as HTMLInputElement;
    setVisiblePassword(!visiblePassword);
    setTimeout(() => {
      passwordInput.type = visiblePassword ?  "text":"password" ;
    }, 0);
  };

  useEffect(() => {
    const body = document.getElementById("Body") as HTMLBodyElement;
    const mainhome = document.getElementById("mainhome") as HTMLElement;
    const nav = document.getElementById("menunav") as HTMLElement;
    const CancioneroPage = document.getElementById(
      "CancioneroPage"
    ) as HTMLElement;
    const MisCursosPage = document.getElementById(
      "MisCursosPage"
    ) as HTMLElement;
    const MembresiasPage = document.getElementById(
      "MembresiasPage"
    ) as HTMLElement;
    const CursosPage = document.getElementById("CursosPage") as HTMLElement;

    body.style.overflow = "hidden";
    mainhome &&
      ((mainhome.style.position = "relative"), (mainhome.style.zIndex = "-1"));
    CancioneroPage &&
      ((CancioneroPage.style.position = "relative"),
      (CancioneroPage.style.zIndex = "-1"));
    MisCursosPage &&
      ((MisCursosPage.style.position = "relative"),
      (MisCursosPage.style.zIndex = "-1"));
    MembresiasPage &&
      ((MembresiasPage.style.position = "relative"),
      (MembresiasPage.style.zIndex = "-1"));
    CursosPage &&
      ((CursosPage.style.position = "relative"),
      (CursosPage.style.zIndex = "-1"));

    nav.style.zIndex = "-1";
    return () => {
      body.style.overflow = "auto";
      mainhome &&
        ((mainhome.style.position = "static"), (mainhome.style.zIndex = "50"));
      CancioneroPage &&
        ((CancioneroPage.style.position = "static"),
        (CancioneroPage.style.zIndex = "50"));
      MembresiasPage &&
        ((MembresiasPage.style.position = "static"),
        (MembresiasPage.style.zIndex = "50"));
      MisCursosPage &&
        ((MisCursosPage.style.position = "static"),
        (MisCursosPage.style.zIndex = "50"));
      CursosPage &&
        ((CursosPage.style.position = "static"),
        (CursosPage.style.zIndex = "50"));
      nav.style.zIndex = "50";
    };
  }, []);

  return (
    <div
      className={`${styles.Container} fixed h-full w-full z-50 flex top-0 justify-center items-center overflow-auto`}>
      <div
        className={`${styles.FormContainer}  bg-slate-300 border border-solid border-black rounded-xl overflow-hidden  flex flex-col items-center `}>
        <div className="flex justify-end w-full">
          <button
            className="text-black"
            onClick={() => handleOpen(AUTH_MODAL_TYPE.LOGIN)}>
            <IoMdClose
              className="text-3xl cursor-pointer hover:text-blue hover:scale-110
              ease-in-out transition-all"
            />
          </button>
        </div>

        <section className="w-full p-2">
          <h1 className=" text-2xl  text-black ml-3">Inicia sesion: </h1>
        </section>
        <form
          className={`${styles.Form}  flex flex-col  w-5/6 justify-evenly`}
          onSubmit={handleSubmit}>
          <label className="text-sm text-black" htmlFor="">
            CORREO ELECTRÓNICO
          </label>
          <input
            className=""
            type="text"
            name="email"
            value={input.email}
            onChange={handleChange}
          />

          {visibleErrors && error.email && (
            <span className="text-red-500">{error.email}</span>
          )}
          <label className="text-sm text-black" htmlFor="">
            CONTRASEÑA
          </label>
          <section className="flex items-center relative">
            <input
              type="password"
              className=" w-full"
              onChange={handleChange}
              name="password"
              id="passwordlogin"
              style={{ appearance: "none" }}
            />

            {visiblePassword ? (
              <IoMdEye
                className=" h-4/5 w-1/12 p-1 bg-gray absolute right-1 cursor-pointer"
                onClick={showPassword}
              />
            ) : (
              <IoMdEyeOff
                className=" h-4/5 w-1/12 p-1 bg-gray absolute right-1 cursor-pointer"
                onClick={showPassword}
              />
            )}
          </section>
          {visibleErrors && error.password && (
            <span className="text-red-500">{error.password}</span>
          )}

          <section className={`${styles.pwforgot} flex justify-between`}>
            <article>
              <input type="checkbox" name="" id="recurdame" />
              <label htmlFor="">recuerdame </label>
            </article>
            <article className={`flex items-center`}>
              <span className="cursor-pointer ">Olvidaste tu contraseña</span>
            </article>
          </section>

          <section
            className={`${styles.SubmitSection} flex justify-center items-center h-1/6`}>
            <button
              type="submit"
              className="bg-secondOrange w-3/4 h-5/6 rounded-md hover:bg-yellow-300">
              {" "}
              LOGIN{" "}
            </button>
          </section>
        </form>

        <div className="flex justify-center items-center   w-3/4">
          <section className=" border-b border-solid w-full border-black"></section>
          <h5>O</h5>
          <section className=" border-b border-solid w-full  border-black"></section>
        </div>

        <section
          className={`${styles.googleButtonSection} w-full flex justify-center  items-center m-1`}>
          <button
            type="button"
            className="border border-solid rounded-md border-black w-7/12 h-3/4 flex justify-center items-center ">
            <FcGoogle className="text-3xl" />
            <span className="text-black font-bold">Login with google</span>
          </button>
        </section>

        <section className=" bg-secondOrange w-full flex justify-center hover:bg-yellow-300">
          <button
            className=""
            onClick={() => {
              handleOpen(AUTH_MODAL_TYPE.LOGIN);
              handleOpen(AUTH_MODAL_TYPE.REGISTER);
            }}>
            <span className="text-black text-3xl"> o Registrate</span>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Login;
