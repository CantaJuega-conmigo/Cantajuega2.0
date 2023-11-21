"use client";
import styles from "../../styles/login.module.css";
import Image from "next/image";
import img1 from "../../../public/img/login/Ellipse 15.png";
import img2 from "../../../public/img/login/Ellipse 17.png";
import img3 from "../../../public/img/login/Ellipse 18.png";
import img4 from "../../../public/img/login/Ellipse 19.png";
import { FcGoogle } from "react-icons/fc";
import { GoAlert } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { loginError } from "@/utils/FormsErrors";
import { loginUser } from "@/libs/functions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ILogin {
  email: string;
  password: string;
}
interface ILoginErrors {
  email?: string;
  password?: string;
  global?: string;
}

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState<ILoginErrors>({});

  const [loginValues, setLoginValues] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { errors, anyError } = loginError(loginValues);
    setErrors(errors);

    if (!anyError) {
      try {
        setLoading(true);
        await loginUser(loginValues);
        setLoading(false);
        router.push("/");
      } catch (error: any) {
        setErrors({
          ...errors,
          email: "",
          password: "",
          global: error.message,
        });
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({});
    }, 10000);
    // Limpio el temporizador si el componente se desmonta o si los errores cambian
    return () => clearTimeout(timer);
  }, [errors]);

  const [hoverBack, setHoverBack] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <Image className={styles.img1} src={img1} alt="decoration1" />
      <Image className={styles.img2} src={img2} alt="decoration2" />
      <Image className={styles.img3} src={img3} alt="decoration3" />
      <Image className={styles.img4} src={img4} alt="decoration4" />
      <div className={styles.tittleContainer}>
        <div
          className={`${styles.backContainer} ${hoverBack && styles.hovered}`}
          onClick={() => router.push("/")}
          onMouseOver={() => setHoverBack(true)}
          onMouseLeave={() => setHoverBack(false)}>
          <FaArrowLeft />
        </div>
        <h2 className={styles.tittle}>Inicio de sesion</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.sectionErrors}>
          {errors.global && (
            <div className={styles.errorContainer}>
              <GoAlert />
              <p className={styles.errorDescription}>{errors.global}</p>
            </div>
          )}

          {loading && (
            <div className={styles.spinnerContainer}>
              <RotatingLines
                strokeColor="#ff3d00"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />{" "}
              Verificando cuenta...
            </div>
          )}
        </section>
        <section className={styles.sectionInputs}>
          <div className={styles.inputsContainer}>
            <label htmlFor="email">Usuario/correo electronico</label>
            <input
              onChange={handleInputChange}
              className={`${styles.inputs} ${
                errors.email && styles.inputError
              }`}
              type="text"
              id="email"
              name="email"
              placeholder="Escribe aquí..."
              autoComplete="on"
            />
            <div className={styles.errorInputsContainer}>
              {errors.email && (
                <p className={styles.errorParagraph}>{errors.email}</p>
              )}
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <label htmlFor="password">Contraseña</label>
            <input
              onChange={handleInputChange}
              className={`${styles.inputs} ${styles.inputPassword} ${
                errors.password && styles.inputError
              }`}
              type="password"
              id="password"
              name="password"
              placeholder="Introduce tu contraseña..."
              autoComplete="on"
            />
            <div className={styles.errorInputsContainer}>
              {errors.password && (
                <p className={styles.errorParagraph}>{errors.password}</p>
              )}
            </div>
          </div>
        </section>
        <section className={styles.sectionRememberme}>
          <div className={styles.checkRememberme}>
            <input className={styles.check} type="checkbox" id="remember" />
            <label htmlFor="remember">Recordarme</label>
          </div>
          <span>¿Olvidaste tu contraseña?</span>
        </section>
        <section className={styles.sectionButtons}>
          <button className={styles.normalBtn} type="submit">
            Iniciar
          </button>
          <button className={styles.googleBtn}>
            <FcGoogle />
            Iniciar con Google
          </button>
        </section>
        <section className=" flex justify-center text-blue pt-4">
          <Link href={"/register"}>
            <h1>no tienes cuenta?</h1>
          </Link>
        </section>
      </form>
    </div>
  );
}
