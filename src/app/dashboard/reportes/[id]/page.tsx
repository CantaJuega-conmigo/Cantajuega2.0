'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IUser } from '@/types';
import styles from './ReportsUser.module.css';
import Image from 'next/image';
import fakeProfile from '../../../../../public/img/fakeProfile.png';
import { useGetUsersWithReportsQuery } from '@/store/apis/CantajuegaApi';
import { RotatingLines } from 'react-loader-spinner';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { BiChevronDown, BiChevronUp, BiMessageAdd } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/im';
import { transformDate } from '@/utils/general';
import { useEditReportMutation } from '@/store/apis/CantajuegaApi';
import { Oval } from 'react-loader-spinner';
import { useAppSelector } from '@/store/hooks';

interface Props {
  params: { id: string };
}

export default function ReportsUser({ params }: Props) {
  const { id } = params;
  const { dashboardNavHeight } = useAppSelector((state) => state.uiReducer);
  const height = dashboardNavHeight + 90;

  const [
    editResponse,
    { isLoading: isLoadingResponse, isError: isErrorResponse },
  ] = useEditReportMutation();

  const { data, isLoading } = useGetUsersWithReportsQuery(id);
  const user: IUser | undefined = data?.data && data.data[0];

  interface UniqueId {
    [key: string]: boolean; // Clave es el ID del informe (string UUIDv4), valor es un booleano
  }
  const [showAnswers, setShowAnswers] = useState<UniqueId>({});
  const toggleShowAnswer = (reportId: string): void => {
    setShowAnswers({
      ...showAnswers,
      [reportId]: !showAnswers[reportId],
    });
  };

  const [showResponse, setShowResponse] = useState<UniqueId>({});
  const toggleShowResponse = (reportId: string): void => {
    setShowResponse({
      // ...showResponse,
      [reportId]: !showResponse[reportId],
    });
  };

  const [responseValue, setResponseValue] = useState({
    id: '',
    value: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    id: string
  ): void => {
    const { value } = event.target;
    setResponseValue({ ...responseValue, id, value });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    realReportId: string
  ) => {
    event.preventDefault();
    const { id, value } = responseValue;
    if (id === realReportId && value) {
      editResponse({ id, Response: responseValue.value });
    }
  };
  return (
    <div className={styles.page}>
      {isLoading && (
        <div className={styles.spinnerContainer}>
          <RotatingLines
            strokeColor='#26798e'
            strokeWidth='5'
            animationDuration='0.75'
            width='200'
            visible={true}
          />
        </div>
      )}

      {user && (
        <div className={styles.container}>
          <div className={styles.userProfile}>
            {user.image ? (
              <img
                className={styles.realImg}
                src={user.image}
                alt={`Imagen de ${user.firstName} ${user.lastName}`}
              />
            ) : (
              <Image
                className={styles.fakeImg}
                src={fakeProfile}
                width={50}
                height={50}
                alt={'fakeImg'}
              />
            )}

            <h2 className={styles.tittle}>
              Reportes de {user.firstName + ' ' + user.lastName}
            </h2>
          </div>
          <div
            style={{
              height: `calc(100vh - ${height}px)`,
            }}
            className={styles.reportsContainer}
          >
            {user.Reports.map((report) => {
              return (
                <div key={report.id} className={styles.reportContainer}>
                  <span className={styles.date}>
                    {transformDate(report.createdAt)}
                  </span>
                  <div className={styles.descriptionContainer}>
                    <p>{report.Description}</p>
                  </div>
                  {report.Response ? (
                    <div className={styles.answeredContainer}>
                      <div className={styles.answered}>
                        <BsFillCheckCircleFill />
                        Respondido
                      </div>
                      <span
                        onClick={() => toggleShowAnswer(report.id)}
                        className={styles.viewResponse}
                      >
                        {!showAnswers[report.id] ? (
                          <>
                            Ver respuesta
                            <BiChevronDown />
                          </>
                        ) : (
                          <>
                            Ocultar respuesta
                            <BiChevronUp />
                          </>
                        )}
                      </span>
                      {showAnswers[report.id] && (
                        <div className={styles.responseContainer}>
                          <p>{report.Response}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.sendContainer}>
                      <div
                        onClick={() => toggleShowResponse(report.id)}
                        className={styles.send}
                      >
                        {!showResponse[report.id] ? (
                          <>
                            <BiMessageAdd />
                            <p>Responder</p>
                          </>
                        ) : (
                          <>
                            <ImCancelCircle />
                            <p>Cancelar</p>
                          </>
                        )}
                      </div>
                      {showResponse[report.id] && (
                        <form
                          onSubmit={(event) => handleSubmit(event, report.id)}
                          className={styles.formContainer}
                        >
                          <textarea
                            onChange={(event) =>
                              handleInputChange(event, report.id)
                            }
                            placeholder='Responde al usuario aqui...'
                          ></textarea>
                          <button type='submit'>
                            {!isLoadingResponse ? (
                              'Enviar'
                            ) : (
                              <div>
                                <Oval
                                  height={25}
                                  width={25}
                                  color='#fff'
                                  wrapperStyle={{}}
                                  wrapperClass=''
                                  visible={true}
                                  ariaLabel='oval-loading'
                                  secondaryColor='#eee'
                                  strokeWidth={7}
                                  strokeWidthSecondary={5}
                                />
                              </div>
                            )}
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
