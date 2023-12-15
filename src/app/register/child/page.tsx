'use client';
import styles from '../../../styles/Register.module.css';
import Image from 'next/image';
import img1 from '../../../../public/img/login/Ellipse 15.png';
import img2 from '../../../../public/img/login/Ellipse 17.png';
import img3 from '../../../../public/img/login/Ellipse 18.png';
import img4 from '../../../../public/img/login/Ellipse 19.png';
import { GoAlert } from 'react-icons/go';
import { RotatingLines } from 'react-loader-spinner';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  InputChilds,
  inputErrorChilds,
  registerErrorChild,
  registerErrorUser,
} from '@/utils/FormsErrors';
import { registerUser } from '@/libs/functions';
import { useRouter } from 'next/navigation';
import AcountConfirmation from '@/components/AcountConfirmation/AcountConfirmation';
import StepTwo from '@/components/Register/StepTwo';

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

export default function RegisterChild() {
  const router = useRouter();
  const [errors, setErrors] = useState<IRegisterErrors>({});
  const [errorsChild, setErrorsChild] = useState<inputErrorChilds>({});
  const [childData, setChildData] = useState<InputChilds>({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'male',
  });
  const [registerValues, setRegisterValues] = useState<IRegister>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: 'user' | 'child'
  ): void => {
    const { name, value } = event.target;
    if (type === 'user') {
      setRegisterValues({ ...registerValues, [name]: value });
    } else {
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
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          global: error.message,
        });
        setLoading(false);
      }
    }
  };
  return (
    <div className={styles.container}>
      {verificationModal && (
        <AcountConfirmation
          email={registerValues.email}
          name={registerValues.firstName}
        />
      )}
      <Image className={styles.img1} src={img1} alt='decoration1' />
      <Image className={styles.img2} src={img2} alt='decoration2' />
      <Image className={styles.img3} src={img3} alt='decoration3' />
      <Image className={styles.img4} src={img4} alt='decoration4' />
      <div className={styles.tittleContainer}>
        <h2 className={styles.tittle}>Datos del niño/niña</h2>
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
                strokeColor='#ff3d00'
                strokeWidth='5'
                animationDuration='0.75'
                width='30'
                visible={true}
              />{' '}
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
