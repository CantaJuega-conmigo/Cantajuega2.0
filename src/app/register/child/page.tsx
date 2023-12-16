"use client";
import styles from "../../../styles/register.module.css";
import Image from "next/image";
import img1 from "../../../../public/img/login/Ellipse 15.png";
import img2 from "../../../../public/img/login/Ellipse 17.png";
import img3 from "../../../../public/img/login/Ellipse 18.png";
import img4 from "../../../../public/img/login/Ellipse 19.png";
import { GoAlert } from "react-icons/go";
import { RotatingLines } from "react-loader-spinner";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  InputChilds,
  inputErrorChilds,
  registerErrorChild,
} from "@/utils/FormsErrors";
import { CompleteChildRegister } from "@/libs/functions";
import { useRouter } from "next/navigation";
import StepTwo from "@/components/Register/StepTwo";
import Cookies from "js-cookie";

interface IRegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: string;
}

export default function RegisterChild() {
  const router = useRouter();
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [errorsChild, setErrorsChild] = useState<inputErrorChilds>({});
  const [temporalUser, setTemporalUser] = useState({
    firstName: "",
  });
  const [childData, setChildData] = useState<InputChilds>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "male",
  });

  useEffect(() => {
    const cookie = Cookies.get("register");
    const object = JSON.parse(cookie || "{}");
    const user = {
      firstName: object.user,
    };
    setTemporalUser(user);

    () => Cookies.remove("register");
  }, []);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "user" | "child"
  ): void => {
    const { name, value } = event.target;

    setChildData({ ...childData, [name]: value });
  };

  const [verificationModal, setVerificationModal] = useState<boolean>(false);
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    console.log("me ejecuto");
    event.preventDefault();
    const { errors: childErrors, anyError: anyErrorChild } =
      registerErrorChild(childData);
    setErrorsChild(childErrors);
    if (!anyErrorChild) {
      try {
        setLoading(true);

        console.log(childData);
        await CompleteChildRegister(childData);
        setLoading(false);
        setVerificationModal(true);
        router.push('/');
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
  return (
    <div className={styles.container}>
      <Image className={styles.img1} src={img1} alt="decoration1" />
      <Image className={styles.img2} src={img2} alt="decoration2" />
      <Image className={styles.img3} src={img3} alt="decoration3" />
      <Image className={styles.img4} src={img4} alt="decoration4" />
      <div className={styles.tittleContainer}>
        <h2 className={`${styles.tittle} text-white`}>
          Hola {temporalUser.firstName}
        </h2>
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
          <StepTwo
            errorsChild={errorsChild}
            handleInputChange={handleInputChange}
            setChildData={setChildData}
            childData={childData}
          />
        </section>
      </form>
    </div>
  );
}
