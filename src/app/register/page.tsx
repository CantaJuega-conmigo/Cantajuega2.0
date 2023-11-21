"use client";
import styles from "../../styles/register.module.css";
import Image from "next/image";
import img1 from "../../../public/img/login/Ellipse 15.png";
import img2 from "../../../public/img/login/Ellipse 17.png";
import img3 from "../../../public/img/login/Ellipse 18.png";
import img4 from "../../../public/img/login/Ellipse 19.png";
import { FcGoogle } from "react-icons/fc";
import { GoAlert } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { ChangeEvent, FormEvent, useEffect, useState, MouseEvent } from "react";
import {
  InputChilds,
  inputErrorChilds,
  registerErrorChild,
  registerErrorUser,
} from "@/utils/FormsErrors";
import { registerUser } from "@/libs/functions";
import { useRouter } from "next/navigation";
import AcountConfirmation from "@/components/AcountConfirmation/AcountConfirmation";
import StepOne from "@/components/Register/StepOne";
import StepTwo from "@/components/Register/StepTwo";

interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface IRegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: string;
}

export default function Register() {
  const router = useRouter();
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [errorsChild, setErrorsChild] = useState<inputErrorChilds>({});
  const [childData, setChildData] = useState<InputChilds>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "male",
  });
  const [registerValues, setRegisterValues] = useState<IRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState({
    stepOne: true,
    stepTwo: false,
  });
  const handleInputChange = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>,type:'user' | 'child'): void => {
    const { name, value } = event.target;
    if(type === 'user'){
      setRegisterValues({ ...registerValues, [name]: value });
    }else{
      setChildData({ ...childData, [name]: value });
    }
  };

  const [verificationModal, setVerificationModal] = useState<boolean>(false);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const { errors, anyError } = registerErrorUser(registerValues);
    const { errors: childErrors, anyError: anyErrorChild } =
    registerErrorChild(childData);
    setErrorsChild(childErrors);
    console.log(childData);
    if (!anyError && !anyErrorChild) {
      try {
        setLoading(true);
        await registerUser({ user: registerValues, child: childData });
        setLoading(false);
        setVerificationModal(true);
        // router.push('/');
      } catch (error: any) {
        setErrors({
          ...errors,
          firstName: "",
          lastName: "",
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
  const changeStep = (e: MouseEvent<HTMLButtonElement>) => {
    const { errors, anyError } = registerErrorUser(registerValues);
    setErrors(errors);
    const { name } = e.currentTarget;
    if (!anyError && name === "next") {
      return setStep({ stepOne: false, stepTwo: true });
    }
    if ( name === "back")
      return setStep({ stepOne: true, stepTwo: false });
  };
  return (
    <div className={styles.container}>
      {verificationModal && (
        <AcountConfirmation
          email={registerValues.email}
          name={registerValues.firstName}
        />
      )}
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
        <h2 className={styles.tittle}>Crea un usuario</h2>
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
          {/* {Registro padres} */}
          {step.stepOne && (
            <StepOne errors={errors} handleInputChange={handleInputChange} />
          )}
          {step.stepTwo && (
            <StepTwo errorsChild={errorsChild} handleInputChange={handleInputChange} setChildData={setChildData}  childData={childData}/>
          )}
        </section>

        <section className={styles.sectionButtons}>
          {step.stepOne && (
            <>
              <button
                className={styles.normalBtn}
                type="button"
                name="next"
                onClick={changeStep}>
                Siguiente paso
              </button>

              <button className={styles.googleBtn}>
                <FcGoogle />
                Registrarse con Google
              </button>
            </>
          )}
          {step.stepTwo && (
            <>
              <button
                className={styles.normalBtn}
                type="submit"
                name="next"
                >
                Completar el registro
              </button>
              <button
                className={styles.normalBtn}
                type="button"
                name="back"
                onClick={changeStep}>
                volver
              </button>
            </>
          )}
        </section>
      </form>
    </div>
  );
}
