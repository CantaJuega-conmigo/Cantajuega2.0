'use client';
import styles from '../../styles/AcountConfirmation.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import img1 from '../../../public/img/Untitled_Artwork 1.png';
import img2 from '../../../public/img/img-2.png';
import { ChangeEvent, useEffect, useState } from 'react';
import { acountConfirmation } from '../../libs/functions';
import { RotatingLines } from 'react-loader-spinner';
import { ThreeDots } from 'react-loader-spinner';

export default function AcountConfirmation({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const [error, setError] = useState(false);
  const router = useRouter();

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [spinner, setSpinner] = useState(false);

  const [verifycated, setVerifycated] = useState(false);

  const handleVerify = async () => {
    setError(false);
    setSpinner(true);
    const verify = await acountConfirmation(email, inputValue);
    if (verify) {
      setSpinner(false);
      setError(false);
      setVerifycated(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      setSpinner(false);
      setError(true);
    }
  };

  return (
    <div className={`${styles.modalContainer}`}>
      <div className={styles.modal}>
        <Image className={styles.img1} src={img1} alt='decoration1' />
        <Image className={styles.img2} src={img2} alt='decoration2' />
        <h3 className={styles.tittle}>{`Bienvenid@ ${name} 😄`} </h3>
        <p className={styles.paragraph}>
          Hemos enviado un código de verificación a tu correo
        </p>
        <div className={styles.inputContainer}>
          <label htmlFor='code'>Código de verificación aquí ⬇️</label>
          <input
            onChange={handleInputChange}
            type='text'
            id='code'
            placeholder='introduce el código recibido'
          />
          <div className={styles.errorContainer}>
            {error && (
              <p className={styles.error}>
                ¡Código incorrecto!, revisa de nuevo el código recivido e
                intenta nuevamente.
              </p>
            )}
            {verifycated && (
              <p className={styles.verifycated}>
                ¡Correo verificado! <br />
                Redirigiendo al inicio
                <div className={styles.cosoContainer}>
                  <ThreeDots
                    height='40'
                    width='40'
                    radius='9'
                    color='#4fa94d'
                    ariaLabel='three-dots-loading'
                    wrapperStyle={{}}
                    visible={true}
                  />
                </div>
              </p>
            )}
          </div>
        </div>
        {spinner && (
          <div className={styles.spinnerContainer}>
            <RotatingLines
              strokeColor='#ff3d00'
              strokeWidth='5'
              animationDuration='0.75'
              width='70'
              visible={true}
            />
          </div>
        )}
        <button onClick={handleVerify} className={styles.confirmBtn}>
          Verificar ahora
        </button>
        <button onClick={() => router.push('/')} className={styles.cancelBtn}>
          Verificar mas tarde
        </button>
      </div>
    </div>
  );
}
