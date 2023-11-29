'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './NuevaEtapa.module.css';
import { useCreateStageMutation } from '@/store/apis/CantajuegaApi';

export default function NuevaEtapa() {
  const [createStage, { isLoading, isSuccess, error }] =
    useCreateStageMutation();

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
  type Video = { order?: string; title?: string; content?: string };
  const [pdfValues, setPdfValues] = useState({ name: '', content: '' });
  const [videoValues, setVideoValues] = useState<Video[]>([]);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
    createStage(BODY);
  };
  if (error) console.log(error);

  return (
    <div className={styles.createContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor='name'>Nombre</label>
          <input
            onChange={handleInputsChange}
            type='text'
            name='name'
            id='name'
            placeholder='Introduce el nombre'
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='description'>Descripción</label>
          <input
            onChange={handleInputsChange}
            type='text'
            name='description'
            id='description'
            placeholder='Introduce la descripción'
          />
        </div>
        <section className={styles.sectionAge}>
          <div className={styles.inputContainer}>
            <label htmlFor='minAge'>Edad minima</label>
            <input
              onChange={handleInputsChange}
              type='number'
              name='minAge'
              id='minAge'
              placeholder='Edad Minima'
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='maxAge'>Edad Maxima</label>
            <input
              onChange={handleInputsChange}
              type='number'
              name='maxAge'
              id='maxAge'
              placeholder='Edad maxima'
            />
          </div>
        </section>

        <h5>Contenido</h5>

        <p>PDF</p>
        <div className={styles.inputContainer}>
          <label htmlFor='pdfName'>Nombre</label>
          <input
            type='text'
            id='pdfName'
            name='name'
            placeholder='Nombre aqui...'
            onChange={(e) => handleInputsChange(e, 'pdf')}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='content'>Contenido</label>
          <input
            type='text'
            id='content'
            name='content'
            placeholder='Contenido aqui...'
            onChange={(e) => handleInputsChange(e, 'pdf')}
          />
        </div>

        <p>Videos</p>
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

        <button className={styles.btnSubmit} type='submit'>
          Crear Etapa
        </button>
      </form>
    </div>
  );
}
