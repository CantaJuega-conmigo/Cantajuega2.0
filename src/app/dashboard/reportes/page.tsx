'use client';
import styles from '../../../styles/Reports.module.css';
import { useGetUsersWithReportsQuery } from '@/store/apis/CantajuegaApi';
import Image from 'next/image';
import fakeProfile from '../../../../public/img/fakeProfile.png';
import { useRouter } from 'next/navigation';

export default function Reports() {
  const { data } = useGetUsersWithReportsQuery(null);

  const router = useRouter();
  const navigateUserDetails = (id: string): void => {
    router.push(`reportes/${id}`);
  };

  return (
    <main className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.lejendsContainer}>
            <th className={styles.lejend}>IMG</th>
            <th className={styles.lejend}>Nombre</th>
            <th className={styles.lejend}>Apellido</th>
            <th className={styles.lejend}>Email</th>
            <th className={styles.lejend}>Total de Reportes</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data?.data?.map((user) => (
            <tr className={styles.valuesContainer} key={user.id}>
              <td className={`${styles.value} ${styles.imgContainer}`}>
                <>
                  {typeof user.image === 'string' ? (
                    <img
                      className={styles.realImg}
                      src={user.image}
                      alt={`Imagen de ${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <Image
                      className={styles.fakeImg}
                      src={fakeProfile}
                      alt={`Imagen de ${user.firstName} ${user.lastName}`}
                      width={50}
                      height={50}
                    />
                  )}
                </>
              </td>
              <td className={styles.value}>{user.firstName}</td>
              <td className={styles.value}>{user.lastName}</td>
              <td className={styles.value}>{user.email}</td>
              <td className={styles.value}>
                <div className={styles.reportsContainer}>
                  <span className={styles.reports}>{user.Reports.length}</span>
                  <button
                    className={styles.btnReports}
                    onClick={() => navigateUserDetails(user.id)}
                  >
                    👀
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
