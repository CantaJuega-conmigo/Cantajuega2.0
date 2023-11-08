'use client';
import { IUser } from '@/types';
import styles from './ReportsUser.module.css';
import Image from 'next/image';
import fakeProfile from '../../../../../public/img/fakeProfile.png';
import { useGetUsersWithReportsQuery } from '@/store/apis/CantajuegaApi';
import { RotatingLines } from 'react-loader-spinner';

interface Props {
  params: { id: string };
}
export default function ReportsUser({ params }: Props) {
  const { id } = params;

  const { data, isLoading } = useGetUsersWithReportsQuery(id);
  const user: IUser | undefined = data?.data && data.data[0];
  console.log(user);

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
          <h2>Reportes de {user.firstName + ' ' + user.lastName}</h2>
          <div className={styles.reportsContainer}>
            {user.Reports.map((report) => {
              return (
                <div key={report.id} className={styles.reportContainer}>
                  <div className={styles.descriptionContainer}>
                    <p>{report.Description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
