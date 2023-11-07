'use client';
import styles from '../../../styles/Reports.module.css';
// import { useGetUsersWithReportsQuery } from '@/store/apis/CantajuegaApi';
import Image from 'next/image';
import fakeProfile from '../../../../public/img/fakeProfile.png';
import { FaRegEye } from 'react-icons/fa';

export default function Reports() {
  // const { data } = useGetUsersWithReportsQuery(null);

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
      
      </table>
    </main>
  );
}
