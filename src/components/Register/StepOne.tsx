import styles from "../../styles/register.module.css";
import { ChangeEvent } from "react";
interface IRegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: string;
}
export default function StepOne({
  errors,
  handleInputChange,
}: {
  errors: IRegisterErrors;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>,type:'user' | 'child') => void;
}) {
  return (
    <>
      <h1 className={"text-center text-xl"}>Datos del adulto responsable</h1>
      <div className={styles.inputsContainer}>
        <label htmlFor="firstName">Nombre</label>
        <input
          className={`${styles.inputs} ${
            errors.firstName && styles.inputError
          }`}
          onChange={(event) =>handleInputChange(event,'user')}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Introduce tu nombre..."
        />
        <div className={styles.errorInputsContainer}>
          {errors.firstName && (
            <p className={styles.errorParagraph}>{errors.firstName}</p>
          )}
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <label htmlFor="lastName">Apellido</label>
        <input
          className={`${styles.inputs} ${errors.lastName && styles.inputError}`}
          onChange={(event) =>handleInputChange(event,'user')}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Introduce tu apellido..."
        />
        <div className={styles.errorInputsContainer}>
          {errors.lastName && (
            <p className={styles.errorParagraph}>{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <label htmlFor="email">Correo electronico</label>
        <input
          onChange={(event) =>handleInputChange(event,'user')}
          className={`${styles.inputs} ${errors.email && styles.inputError}`}
          type="text"
          id="email"
          name="email"
          placeholder="Introduce tu correo..."
          autoComplete="on"
        />
        <div className={styles.errorInputsContainer}>
          {errors.email && (
            <p className={styles.errorParagraph}>{errors.email}</p>
          )}
        </div>
      </div>
      <div className={styles.inputsContainer}>
        <label htmlFor="password">Contraseña</label>
        <input
          onChange={(event) =>handleInputChange(event,'user')}
          className={`${styles.inputs} ${styles.inputPassword} ${
            errors.password && styles.inputError
          }`}
          type="password"
          id="password"
          name="password"
          placeholder="Introduce tu contraseña..."
          autoComplete="on"
        />
        <div className={styles.errorInputsContainer}>
          {errors.password && (
            <p className={styles.errorParagraph}>{errors.password}</p>
          )}
        </div>
      </div>
    </>
  );
}
