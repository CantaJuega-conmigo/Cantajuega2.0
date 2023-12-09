'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './NuevaEtapa.module.css';
import { useCreateStageMutation } from '@/store/apis/CantajuegaApi';
import { useAppSelector } from '../../../../store/hooks';
import { createStageErrors } from '../../../../utils/FormsErrors';
import { RotatingLines } from 'react-loader-spinner';
import { GoAlert } from 'react-icons/go';
import { useRouter } from 'next/navigation';

export default function NuevaEtapa() {
  const router = useRouter();

  const { dashboardNavHeight } = useAppSelector((state) => state.uiReducer);

  const [createStage, { isLoading, isSuccess }] = useCreateStageMutation();

  const ORDER_VIDEOS = [
    {
      label: 'Primer video',
      api: 'First_Video',
    },
    {
      label: 'Segundo video',
      api: 'Second_Video',
    },
    {
      label: 'Tercer video',
      api: 'Third_Video',
    },
    {
      label: 'Cuarto video',
      api: 'Fourth_Video',
    },
    {
      label: 'Video final',
      api: 'Final_Video',
    },
  ];

  const [easyValues, setEasyValues] = useState({
    name: '',
    description: '',
    minAge: 0,
    maxAge: 0,
  });

  const [pdfValues, setPdfValues] = useState({ name: '', content: '' });
  const [videoValues, setVideoValues] = useState<any[]>([]);

  const handleInputsChange = (
    event: ChangeEvent<HTMLInputElement>,
    type?: string
  ): void => {
    const { name, value } = event.target;
    if (type === 'pdf') {
      setPdfValues({ ...pdfValues, [name]: value });
    } else {
      setEasyValues({ ...easyValues, [name]: value });
    }
  };

  const handleVideoValues = (
    event: ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const { name, value } = event.target;
    if (type === 'title') {
      let copyVideos = [...videoValues];
      const searchVideo = copyVideos.find((video) => video.order === name);
      if (!searchVideo) {
        setVideoValues([...videoValues, { order: name, title: value }]);
      } else {
        const updateCopy = copyVideos.map((obj) => {
          if (obj.order === name) {
            obj.title = value;
          }
          return obj;
        });
        setVideoValues(updateCopy);
      }
    }
    if (type === 'link') {
      let copyVideos = [...videoValues];
      const searchVideo = copyVideos.find((video) => video.order === name);
      if (!searchVideo) {
        setVideoValues([...videoValues, { order: name, content: value }]);
      } else {
        const updateCopy = copyVideos.map((obj) => {
          if (obj.order === name) {
            obj.content = value;
          }
          return obj;
        });
        setVideoValues(updateCopy);
      }
    }
  };

  const [errors, setErrors] = useState({
    global: '',
    stageName: '',
    stageDescription: '',
    minAge: '',
    maxAge: '',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const BODY = {
      name: easyValues.name,
      description: easyValues.description,
      minAge: easyValues.minAge,
      maxAge: easyValues.maxAge,
      content: {
        pdf: pdfValues,
        videos: videoValues,
        musics: [],
      },
    };

    const ERRORS = createStageErrors(BODY);
    setErrors(ERRORS);

    if (!Object.values(ERRORS).filter((values) => values !== '').length) {
      //Compruevo que el objeto ERRORS tenga los valores vacios
      try {
        await createStage(BODY).unwrap();
        router.push('/dashboard/cursos');
      } catch (error: any) {
        if (error.data.message) {
          setErrors({ ...errors, global: error.data.message });
        } else {
          setErrors({ ...errors, global: 'Error en el servidor' });
        }
      }
    }
  };

  return (
    <div
      style={{ maxHeight: `calc(100vh - ${dashboardNavHeight}px)` }}
      className={styles.createContainer}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.errorsContainer}>
          {errors.global && (
            <p className={styles.globalError}>
              <GoAlert />
              {errors.global}
            </p>
          )}
        </div>

        <section className={styles.firstSection}>
          <div className={styles.inputContainer}>
            <label htmlFor='name'>Nombre De la etapa</label>
            <input
              onChange={handleInputsChange}
              type='text'
              name='name'
              id='name'
              placeholder='Introduce el nombre'
            />
            <div className={styles.errorsContainer}>
              {errors.stageName && (
                <p className={styles.error}>{errors.stageName}</p>
              )}
            </div>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='description'>Descripción de la etapa</label>
            <input
              onChange={handleInputsChange}
              type='text'
              name='description'
              id='description'
              placeholder='Introduce la descripción'
            />
            <div className={styles.errorsContainer}>
              {errors.stageDescription && (
                <p className={styles.error}>{errors.stageDescription}</p>
              )}
            </div>
          </div>
          <section className={styles.sectionAge}>
            <div className={styles.inputContainer}>
              <label htmlFor='minAge'>Edad minima</label>
              <input
                onChange={handleInputsChange}
                type='number'
                name='minAge'
                id='minAge'
                placeholder='E.Minima'
              />
              <div className={styles.errorsContainer}>
                {errors.minAge && (
                  <p className={styles.error}>{errors.minAge}</p>
                )}
              </div>
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor='maxAge'>Edad Maxima</label>
              <input
                onChange={handleInputsChange}
                type='number'
                name='maxAge'
                id='maxAge'
                placeholder='E.maxima'
              />
              <div className={styles.errorsContainer}>
                {errors.maxAge && (
                  <p className={styles.error}>{errors.maxAge}</p>
                )}
              </div>
            </div>
          </section>
        </section>

        <section className={styles.sectionPdf}>
          <div className={styles.inputContainer}>
            <label htmlFor='pdfName'>Nombre del PDF</label>
            <input
              type='text'
              id='pdfName'
              name='name'
              placeholder='Nombre aqui...'
              onChange={(e) => handleInputsChange(e, 'pdf')}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='content'>Contenido del PDF</label>
            <input
              type='text'
              id='content'
              name='content'
              placeholder='Contenido aqui...'
              onChange={(e) => handleInputsChange(e, 'pdf')}
            />
          </div>
        </section>

        <div className={styles.musicsContainer}>
          {ORDER_VIDEOS.map((element) => (
            <div key={element.api} className={styles.inputContainer}>
              <label htmlFor={element.api}>{element.label}</label>
              <input
                style={{ marginBottom: '5px' }}
                type='text'
                name={element.api}
                placeholder='Titulo del video'
                onChange={(e) => handleVideoValues(e, 'title')}
              />
              <input
                type='text'
                name={element.api}
                id={element.api}
                placeholder='Link del video...'
                onChange={(e) => handleVideoValues(e, 'link')}
              />
            </div>
          ))}
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.btnSubmit} type='submit'>
            {isLoading ? (
              <RotatingLines
                strokeColor='grey'
                strokeWidth='5'
                animationDuration='0.75'
                width='35'
                visible={true}
              />
            ) : (
              'Crear Etapa'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
