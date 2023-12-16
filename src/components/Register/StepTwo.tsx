import { ChangeEvent, useState } from "react";
import styles from "../../styles/register.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import { InputChilds, inputErrorChilds } from "@/utils/FormsErrors";

registerLocale("es", es);
export default function StepTwo({
  handleInputChange,
  errorsChild,
  setChildData,
  childData,
}: {
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "user" | "child"
  ) => void;
  errorsChild: inputErrorChilds;
  setChildData: React.Dispatch<React.SetStateAction<InputChilds>>;
  childData: InputChilds;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    const formatDate =
      date?.toISOString().split("T")[0].split("-").reverse().join("/") ?? "";
    setChildData({
      ...childData,
      birthDate: formatDate,
    });
    setSelectedDate(date);
  };

  return (
    <>
      <h1 className="text-center text-xl">Para completar el registro, ingrese los datos de su hijo/a</h1>
      <div className={styles.inputsContainer}>
        <label htmlFor="firstName">Nombre</label>
        <input
          className={`${styles.inputs} ${
            errorsChild.firstName && styles.inputError
          }`}
          onChange={(event) => handleInputChange(event, "child")}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Nombre del niño/a..."
        />
        <div className={styles.errorInputsContainer}>
          {errorsChild.firstName && (
            <p className={styles.errorParagraph}>{errorsChild.firstName}</p>
          )}
        </div>
      </div>

      <div className={styles.inputsContainer}>
        <label htmlFor="lastName">Apellido</label>
        <input
          className={`${styles.inputs} ${
            errorsChild.lastName && styles.inputError
          }`}
          onChange={(event) => handleInputChange(event, "child")}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Apellido del niño/a..."
        />
        <div className={styles.errorInputsContainer}>
          {errorsChild.lastName && (
            <p className={styles.errorParagraph}>{errorsChild.lastName}</p>
          )}
        </div>
      </div>

      <div className={styles.inputsContainer}>
        <label htmlFor="gender">Genero</label>
        <article className="flex w-full">
          <select
            name=""
            id="gender"
            className="  text-center bg-gray-200 w-2/6 p-2"
            onChange={(event) => handleInputChange(event, "child")}>
            <option value="">Niño</option>
            <option value="">Niña</option>
          </select>
        </article>
        <div className={styles.errorInputsContainer}>
          {errorsChild.gender && (
            <p className={styles.errorParagraph}>{errorsChild.gender}</p>
          )}
        </div>
      </div>

      <div className={" flex flex-col gap-2"}>
        <label htmlFor="birthDate">Fecha de nacimiento:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={"dd/MM/yyyy"}
          locale={"es"}
          id="birthDate"
          className="border border-black rounded-lg"
          placeholderText="dd/mm/yyyy"
          name="birthDate"
        />
        <div className={styles.errorInputsContainer}>
          {errorsChild.birthDate && (
            <p className={styles.errorParagraph}>{errorsChild.birthDate}</p>
          )}
        </div>
      </div>
      <section className={styles.sectionButtons}>
        <button className={styles.normalBtn} type="submit" name="next">
          Completar el registro
        </button>
      </section>
    </>
  );
}
