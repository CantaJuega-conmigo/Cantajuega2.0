'use client';
import styles from '../../styles/register.module.css';
import Image from 'next/image';
import img1 from '../../../public/img/login/Ellipse 15.png';
import img2 from '../../../public/img/login/Ellipse 17.png';
import img3 from '../../../public/img/login/Ellipse 18.png';
import img4 from '../../../public/img/login/Ellipse 19.png';
import { FcGoogle } from 'react-icons/fc';
import { GoAlert } from 'react-icons/go';
import { FaArrowLeft } from 'react-icons/fa';
import { RotatingLines } from 'react-loader-spinner';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { registerError } from '@/utils/FormsErrors';
import { registerUser } from '@/libs/functions';
import { useRouter } from 'next/navigation';

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

  const [registerValues, setRegisterValues] = useState<IRegister>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setErrors(registerError(registerValues));

    if (
      !Object.keys(registerError(registerValues)).length &&
      registerValues.firstName.length &&
      registerValues.lastName.length &&
      registerValues.email.length &&
      registerValues.password.length
    ) {
      try {
        setLoading(true);
        await registerUser(registerValues);
        setLoading(false);
        router.push('/');
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
      <Image className={styles.img1} src={img1} alt='decoration1' />
      <Image className={styles.img2} src={img2} alt='decoration2' />
      <Image className={styles.img3} src={img3} alt='decoration3' />
      <Image className={styles.img4} src={img4} alt='decoration4' />
      <div className={styles.tittleContainer}>
        <div
          className={`${styles.backContainer} ${hoverBack && styles.hovered}`}
          onClick={() => router.push('/')}
          onMouseOver={() => setHoverBack(true)}
          onMouseLeave={() => setHoverBack(false)}
        >
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
          <div className={styles.inputsContainer}>
            <label htmlFor='firstName'>Nombre</label>
            <input
              className={`${styles.inputs} ${
                errors.firstName && styles.inputError
              }`}
              onChange={handleInputChange}
              type='text'
              name='firstName'
              id='firstName'
              placeholder='Introduce tu nombre...'
            />
            <div className={styles.errorInputsContainer}>
              {errors.email && (
                <p className={styles.errorParagraph}>{errors.firstName}</p>
              )}
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <label htmlFor='lastName'>Apellido</label>
            <input
              className={`${styles.inputs} ${
                errors.lastName && styles.inputError
              }`}
              onChange={handleInputChange}
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Introduce tu apellido...'
            />
            <div className={styles.errorInputsContainer}>
              {errors.email && (
                <p className={styles.errorParagraph}>{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <label htmlFor='email'>Correo electronico</label>
            <input
              onChange={handleInputChange}
              className={`${styles.inputs} ${
                errors.email && styles.inputError
              }`}
              type='text'
              id='email'
              name='email'
              placeholder='Introduce tu correo...'
              autoComplete='on'
            />
            <div className={styles.errorInputsContainer}>
              {errors.email && (
                <p className={styles.errorParagraph}>{errors.email}</p>
              )}
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <label htmlFor='password'>Contraseña</label>
            <input
              onChange={handleInputChange}
              className={`${styles.inputs} ${styles.inputPassword} ${
                errors.password && styles.inputError
              }`}
              type='password'
              id='password'
              name='password'
              placeholder='Introduce tu contraseña...'
              autoComplete='on'
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
            <input className={styles.check} type='checkbox' id='remember' />
            <label htmlFor='remember'>Recordarme</label>
          </div>
        </section>
        <section className={styles.sectionButtons}>
          <button className={styles.normalBtn} type='submit'>
            Registrarse
          </button>
          <button className={styles.googleBtn}>
            <FcGoogle />
            Registrar con Google
          </button>
        </section>
      </form>
    </div>
  );
}
