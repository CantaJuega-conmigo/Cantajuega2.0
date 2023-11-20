import { ChangeEvent, useState } from "react";
import styles from "../../styles/register.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es"
import "react-datepicker/dist/react-datepicker.css";


interface IRegisterErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  global?: string;
}
registerLocale('es', es);
export default function StepTwo({
  errors,
  handleInputChange,
}: {
  errors: IRegisterErrors;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <h1 className={"text-center text-xl"}>Datos del niño/a</h1>
      <div className={styles.inputsContainer}>
        <label htmlFor="firstName">Nombre</label>
        <input
          className={`${styles.inputs} ${
            errors.firstName && styles.inputError
          }`}
          onChange={handleInputChange}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Nombre del niño/a..."
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
          onChange={handleInputChange}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Apellido del niño/a..."
        />
        <div className={styles.errorInputsContainer}>
          {errors.lastName && (
            <p className={styles.errorParagraph}>{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.inputsContainer}>
        <label htmlFor="gender">Genero</label>
        <article className="flex w-full">
          <select
            name=""
            id="gender"
            className="  text-center bg-gray-200 w-2/6 p-2">
            <option value="">Niño</option>
            <option value="">Niña</option>
          </select>
        </article>
        <div className={styles.errorInputsContainer}>
          {errors.email && (
            <p className={styles.errorParagraph}>{errors.email}</p>
          )}
        </div>
      </div>

      <div className={' flex flex-col gap-2'}>
        <label htmlFor="birthDate">Fecha de nacimiento:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={"dd/MM/yyyy"}
          locale={"es"}
          id="birthDate"
          className="border border-black rounded-lg"
          placeholderText="dd/mm/yyyy"
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
