'use client';
import styles from './Report.module.css';
import { IUser } from '@/types';
import Image from 'next/image';
import fakeProfile from '../../../public/img/fakeProfile.png';

interface Props {
  userReport: IUser;
}

export default function Report({ userReport }: Props) {
  return (
    <section className={styles.report}>
      <div className={styles.firstContainer}>
        {typeof user.image === 'string' ? (
          <div>
            <Image
              src={report.User.image}
              alt={`Imagen de ${user.firstName} ${user.lastName}`}
            />
          </div>
        ) : (
          <div>
            <Image
              className={styles.fakeImgContainer}
              src={fakeProfile}
              alt={`Imagen de ${user.firstName} ${report.User.lastName}`}
            />
          </div>
        )}
        <div>
          <h3 className={styles.tittle}>{report.User.firstName}</h3>
          <p className={styles.email}>{report.User.email}</p>
        </div>
      </div>
      <p>{user.Description}</p>
    </section>
  );
}
